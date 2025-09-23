import db from '../config/database';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

interface EIDCardRecord {
  id: string;
  user_id: string;
  svg_markup: string;
  version: string;
  created_at: Date;
  updated_at: Date;
}

export const eidService = {
  async ensureTable(): Promise<void> {
    const has = await db.schema.hasTable('eid_cards');
    if (!has) {
      await db.schema.createTable('eid_cards', (table) => {
        table.uuid('id').primary().defaultTo(db.raw('uuid_generate_v4()'));
        table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.text('svg_markup').notNullable();
        table.string('version', 20).notNullable().defaultTo('v1');
        table.timestamps(true, true);
      });
    }
  },

  async getByUserId(userId: string): Promise<EIDCardRecord | null> {
    const row = await db<EIDCardRecord>('eid_cards').where({ user_id: userId }).first();
    return row || null;
  },

  async generateForUser(user: User): Promise<EIDCardRecord> {
    const existing = await this.getByUserId(user.id);
    if (existing) return existing;

    const svg = this.buildSvg(user);
    const [inserted] = await db<EIDCardRecord>('eid_cards')
      .insert({
        id: uuidv4(),
        user_id: user.id,
        svg_markup: svg,
        version: 'v1',
      })
      .returning(['id', 'user_id', 'svg_markup', 'version', 'created_at', 'updated_at']);

    return inserted as EIDCardRecord;
  },

  buildSvg(user: User): string {
    const fullName = user.fullName || 'Member Name';
    const stateCode = user.stateCode || 'STATE/CODE';
    const stateBranch = user.deploymentState || 'Your State';
    const postHeld = user.role?.replace('_', ' ') || 'MEMBER';
    const idShort = user.id.slice(0, 8).toUpperCase();

    // Simple, clean SVG inspired by MCAN Lagos digital ID, but distinct
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="860" height="540" viewBox="0 0 860 540">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0E7C66" />
      <stop offset="100%" stop-color="#0ABF9E" />
    </linearGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000" flood-opacity="0.2" />
    </filter>
  </defs>
  <rect width="860" height="540" fill="#f7faf9"/>
  <rect x="24" y="24" rx="20" ry="20" width="812" height="492" fill="white" filter="url(#shadow)"/>
  <rect x="24" y="24" rx="20" ry="20" width="812" height="160" fill="url(#bg)"/>

  <text x="56" y="90" fill="#E7FFF8" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="600">Muslim Corpers' Association of Nigeria (MCAN)</text>
  <text x="56" y="126" fill="#FFFFFF" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="800">National Membership Digital Identity Card</text>

  <circle cx="730" cy="104" r="44" fill="#FFFFFF" opacity="0.15"/>
  <circle cx="730" cy="104" r="30" fill="#FFFFFF" opacity="0.25"/>

  <rect x="56" y="220" width="180" height="220" rx="16" fill="#eef7f5" stroke="#cfe9e3"/>
  <text x="146" y="340" text-anchor="middle" fill="#0E7C66" font-family="Inter, Arial" font-size="14">ID Photo</text>

  <text x="260" y="250" fill="#0E7C66" font-family="Inter, Arial" font-size="14" font-weight="700">Full Name</text>
  <text x="260" y="278" fill="#1A1C1B" font-family="Inter, Arial" font-size="24" font-weight="800">${fullName}</text>

  <text x="260" y="316" fill="#0E7C66" font-family="Inter, Arial" font-size="14" font-weight="700">State Code</text>
  <text x="260" y="342" fill="#1A1C1B" font-family="Inter, Arial" font-size="18" font-weight="700">${stateCode}</text>

  <text x="260" y="380" fill="#0E7C66" font-family="Inter, Arial" font-size="14" font-weight="700">State Branch</text>
  <text x="260" y="406" fill="#1A1C1B" font-family="Inter, Arial" font-size="18" font-weight="700">${stateBranch}</text>

  <text x="260" y="444" fill="#0E7C66" font-family="Inter, Arial" font-size="14" font-weight="700">Post Held</text>
  <text x="260" y="470" fill="#1A1C1B" font-family="Inter, Arial" font-size="18" font-weight="700">${postHeld}</text>

  <text x="56" y="470" fill="#6b7f7a" font-family="Inter, Arial" font-size="12">This is an official digital identity card of MCAN</text>

  <rect x="620" y="420" rx="10" ry="10" width="190" height="48" fill="#0E7C66"/>
  <text x="715" y="450" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Arial" font-size="16" font-weight="700">ID: ${idShort}</text>
</svg>`;
  },
};

export default eidService;

import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database';
import cloudinary from '../utils/cloudinary';

export const eidService = {
  async generate(memberId: string): Promise<{ id: string; cardNumber: string; downloadUrl?: string }> {
    const cardNumber = `MCAN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const payload = { memberId, cardNumber };
    const qrDataUrl = await QRCode.toDataURL(JSON.stringify(payload));

    // Optional: upload QR image to Cloudinary
    let qrUrl: string | undefined;
    try {
      const upload = await cloudinary.uploader.upload(qrDataUrl, { folder: 'mcan/eid', public_id: cardNumber });
      qrUrl = upload.secure_url;
    } catch {
      // fallback: store data URL directly
      qrUrl = qrDataUrl;
    }

    const id = uuidv4();
    const issue = new Date();
    const expiry = new Date(issue);
    expiry.setFullYear(expiry.getFullYear() + 1);

    await db('eid_cards').insert({
      id,
      member_id: memberId,
      card_number: cardNumber,
      qr_code: qrUrl,
      issue_date: issue,
      expiry_date: expiry,
      status: 'ACTIVE',
      created_at: issue,
      updated_at: issue,
    });

    return { id, cardNumber, downloadUrl: qrUrl };
  },
};

export default eidService;


