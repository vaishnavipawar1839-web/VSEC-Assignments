export function endDate(p) {
  const d = new Date(p.purchaseDate);
  d.setMonth(d.getMonth() + Number(p.warrantyMonths));
  return d;
}

export function status(p) {
  const days = Math.ceil(
    (endDate(p) - new Date()) / 86400000
  );

  if (days < 0) return "Expired";
  if (days <= 30) return "Expiring Soon";
  return "Active";
}