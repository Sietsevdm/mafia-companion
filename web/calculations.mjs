export const cash = n => (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');
export const number = n => Math.round(n).toLocaleString('en-US');
export const pct = n => (n * 100).toFixed(1) + '%';
export const clamp = (n, min, max) => Math.min(max, Math.max(min, Number(n) || 0));
export function rankAt(ranks, xp) {
  const rank = ranks.findLast(r => xp >= r.xp) || ranks[0];
  const step = ranks.at(-1).xp - ranks.at(-2).xp;
  const threshold = count => ranks.at(-1).xp + Math.round(step * 1.185 * (1.185 ** count - 1) / .185);
  let distinctions = 0;
  if (xp >= ranks.at(-1).xp) while (distinctions < 200 && xp >= threshold(distinctions + 1)) distinctions++;
  return { ...rank, distinctions, incomeMultiplier: Math.min(1e6, rank.incomeMultiplier * 1.075 ** distinctions), nextXp: rank.level < 25 ? ranks[rank.level].xp : distinctions < 200 ? threshold(distinctions + 1) : null, nextName: rank.level < 25 ? ranks[rank.level].name : distinctions < 200 ? 'Legacy distinction ' + (distinctions + 1) : 'Maximum distinction' };
}
export function multipliers(ranks, p) {
  const rank = rankAt(ranks, p.xp), calendar = p.sunday ? 1.5 : 1;
  const supporter = Number(p.supporter), passiveSupporter = p.referralMembership ? 1 : supporter, marriage = p.married ? 1.1 : 1;
  const common = calendar * supporter * marriage;
  const respect = p.respectPoints === undefined ? p.respect : respectBonus(p.respectPoints);
  const art = p.certifiedOriginals === undefined ? p.art : Math.min(3, Math.floor(p.certifiedOriginals / 3));
  const standing = rank.incomeMultiplier * (1 + respect / 100) * (1 + art / 100);
  const active = p.useCrimeIncome ? 1 + p.crimeIncome / 100 : standing * common * (1 + p.reward / 100);
  return { rank, common, respect, art, active, business: Math.min(16, Math.sqrt(Math.max(1, standing))) * marriage * calendar * passiveSupporter, employee: common * calendar * passiveSupporter };
}
export const respectThresholds = [0,5,15,35,75,150,300,600,1200,2500];
export function respectBonus(points) { return Math.max(0, respectThresholds.findLastIndex(n => points >= n)); }
export function crimeQuote(crime, index, ranks, profile) {
  const m = multipliers(ranks, profile), p = Math.min(.95, crime.chance + (m.rank.level - 1) / 24 * .34);
  const ammo = Math.ceil((index + 1) ** 2 / 4), supply = ammo * 2500;
  const xpSuccess = Math.floor(crime.xp * m.common), xpFail = Math.floor(20 * m.common), xpBig = Math.floor(crime.xp * 3 * m.common);
  const expectedXp = .95 * (p * xpSuccess + (1 - p) * xpFail) + .05 * xpBig;
  const factor = m.active * profile.server;
  const baseMin = Math.floor(crime.reward * factor), baseMax = Math.floor(crime.reward * 1.4 * factor);
  const bonusMin = Math.max(1, Math.floor(crime.reward * .05 * factor)), bonusMax = Math.max(bonusMin, Math.floor(crime.reward * .25 * factor));
  const baseMean = (baseMin + baseMax) / 2, bonusMean = (bonusMin + bonusMax) / 2;
  const gross = crime.id === 'car' ? .95 * (1 - p) * bonusMean : .95 * (p * baseMean + bonusMean) + .15 * (baseMean + bonusMean);
  const success = .05 + .95 * p;
  const waitSeconds = success * 180 + (1 - success) * crime.cooldown / 1000 * (1 - profile.cooldown / 100);
  return { ...crime, ammo, tier: index < 7 ? 1 : index < 14 ? 2 : 3, supply, chance: p, success, xpSuccess, expectedXp, xpEnergy: expectedXp / crime.energy, gross, net: gross - supply, waitSeconds, available: profile.xp >= crime.requiredXp && (!crime.requires || profile.owns.includes(crime.requires)) && profile.weapon >= (index < 7 ? 1 : index < 14 ? 2 : 3) };
}
export function runnerProjection({ count, hours, multiplier = 1, reinvest = false, reserve = 0, startingCash = 0 }) {
  count = Math.floor(clamp(count, 0, 1e9)); hours = Math.floor(clamp(hours, 0, 720));
  let wallet = Math.max(0, startingCash), earned = 0, bought = 0; const points = [{ hour: 0, count, wallet, earned }];
  for (let hour = 1; hour <= hours; hour++) {
    const income = count * 2800 * multiplier; wallet += income; earned += income;
    if (reinvest) { const buy = Math.max(0, Math.min(1e9 - count, Math.floor((wallet - reserve) / 100000))); count += buy; bought += buy; wallet -= buy * 100000; }
    points.push({ hour, count, wallet, earned });
  }
  return { count, wallet, earned, bought, hourly: count * 2800 * multiplier, points };
}
export function policyMultiplier(policy) {
  return policy === 'launder' ? 2 * (1 - .12 * .8) / (1 + .12 * 2) : policy === 'illegal' ? 1.4 * (1 - .06 * .5) / (1 + .06) : 1;
}
export function businessQuote(asset, owned, multiplier, policy) {
  const cost = Math.min(1e12, Math.ceil(asset.price * 1.1 ** owned)), hourly = asset.income * multiplier * policyMultiplier(policy);
  return { cost, hourly, payback: cost / hourly, yield: hourly / cost };
}
export function tradeQuote({ sale, cost, freight, risk, hours, travel }) {
  const total = cost + freight + travel, expectedProfit = sale * (1 - risk / 100) - total;
  return { total, profit: sale - total, expectedProfit, hourly: hours > 0 ? expectedProfit / hours : 0, roi: total > 0 ? expectedProfit / total : 0 };
}
