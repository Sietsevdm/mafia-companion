export function parseNumericInput(value) {
  let text = String(value).trim().replace(/[\s\u00a0]/g, '');
  if (!text) return null;
  if (/^[+-]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(text)) text = text.replaceAll(',', '');
  else if (/^[+-]?\d{1,3}(\.\d{3})+,\d+$/.test(text)) text = text.replaceAll('.', '').replace(',', '.');
  else if (/^[+-]?\d+(,\d+)$/.test(text)) text = text.replace(',', '.');
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(text)) return null;
  const result = Number(text);
  return Number.isFinite(result) ? result : null;
}
