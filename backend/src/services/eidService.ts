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


