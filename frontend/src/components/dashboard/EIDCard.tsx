import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { Download } from '@mui/icons-material';
import { eidService, EIDCard as EIDCardType } from '../../services/eidService';

interface Props {
  autoGenerateIfMissing?: boolean;
}

const EIDCard: React.FC<Props> = ({ autoGenerateIfMissing = true }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<EIDCardType | null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      let eid = await eidService.getMyEid();
      if (!eid && autoGenerateIfMissing) {
        setSaving(true);
        eid = await eidService.generateMyEid();
      }
      setCard(eid);
    } catch (e: any) {
      setError(e?.message || 'Failed to load E-ID');
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadPng = async () => {
    if (!svgContainerRef.current || !card) return;
    const svgEl = svgContainerRef.current.querySelector('svg');
    if (!svgEl) return;
    const xml = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 860;
      canvas.height = 540;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const dlUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = dlUrl;
        a.download = 'mcan-eid.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(dlUrl);
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.src = url;
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Digital ID</Typography>
          {saving && <Typography variant="body2" color="text.secondary">Generating…</Typography>}
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : card ? (
          <Box>
            <Box ref={svgContainerRef} sx={{ width: '100%', overflowX: 'auto', borderRadius: 1, border: '1px solid #e0e0e0' }}
              dangerouslySetInnerHTML={{ __html: card.svg_markup }} />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Your MCAN National digital identity card. Keep it safe.
            </Typography>
          </Box>
        ) : (
          <Alert severity="warning">No E-ID available.</Alert>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button startIcon={<Download />} onClick={downloadPng} disabled={!card || loading}>
          Download PNG
        </Button>
      </CardActions>
    </Card>
  );
};

export default EIDCard;


