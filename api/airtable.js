export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return res.status(500).json({ error: 'Token not configured' });

  const { tableId, filter, fields, offset } = req.query;
  const base = 'appcr2VDa4y17bcwm';

  const params = new URLSearchParams();
  if (filter) params.set('filterByFormula', filter);
  if (offset) params.set('offset', offset);
  params.set('pageSize', '100');
  if (fields) {
    fields.split(',').forEach(f => params.append('fields[]', f));
  }

  const url = `https://api.airtable.com/v0/${base}/${tableId}?${params}`;
  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await resp.json();
  res.status(resp.status).json(data);
}
