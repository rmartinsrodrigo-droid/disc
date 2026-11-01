// Exporta os cadastros em CSV (padrão) ou JSON.
// Uso: /api/leads?key=SUA_CHAVE   ou   /api/leads?key=SUA_CHAVE&format=json
import { list, get } from '@vercel/blob';
import { timingSafeEqual } from 'node:crypto';

function authorized(given) {
  const expected = process.env.ADMIN_KEY || '';
  if (!expected || typeof given !== 'string') return false;
  const a = Buffer.from(given), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function readAll(prefix) {
  const out = [];
  let cursor;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    for (const blob of page.blobs) {
      const r = await get(blob.pathname, { access: 'private', useCache: false });
      if (!r || r.statusCode !== 200) continue;
      try { out.push(JSON.parse(await new Response(r.stream).text())); } catch { /* ignora arquivo inválido */ }
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return out;
}

const csvCell = (v) => {
  const s = v == null ? '' : String(v);
  return /[";\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!authorized(req.query?.key)) return res.status(401).json({ error: 'unauthorized' });

  try {
    const [leads, results] = await Promise.all([readAll('leads/'), readAll('results/')]);
    const byId = new Map(results.map((r) => [r.id, r]));
    const rows = leads
      .map((l) => ({ ...l, done: byId.get(l.id) || null }))
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));

    if (req.query?.format === 'json') return res.status(200).json({ total: rows.length, leads: rows });

    const head = ['data_cadastro', 'nome', 'email', 'concluiu', 'data_conclusao', 'talento', 'similaridade',
      'perfil_natural', 'perfil_atual', 'D', 'I', 'S', 'C', 'confiabilidade', 'minutos', 'versao'];
    const lines = rows.map((r) => {
      const d = r.done?.result || {};
      const e = d.estrutural || {};
      return [r.createdAt, r.nome, r.email, r.done ? 'sim' : 'não', r.done?.finishedAt, d.talento, d.similaridade,
        d.natural, d.atual, e.D, e.I, e.S, e.C, d.confiabilidade, d.minutos, r.version].map(csvCell).join(';');
    });
    const csv = '﻿' + [head.join(';'), ...lines].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="leads-disc-${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.status(200).send(csv);
  } catch (err) {
    console.error('export_failed', err?.message);
    return res.status(500).json({ error: 'export_failed' });
  }
}
