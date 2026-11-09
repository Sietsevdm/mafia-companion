export const cash = n => (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');
export const number = n => Math.round(n).toLocaleString('en-US');
export const pct = n => (n * 100).toFixed(1) + '%';
export const clamp = (n, min, max) => Math.min(max, Math.max(min, Number(n) || 0));
export function rankAt(ranks, xp) {
  const rank = ranks.findLast(r => xp >= r.xp) || ranks[0];
  const step = ranks.at(-1).xp - ranks.at(-2).xp;
  const threshold = count => ranks.at(-1).xp + Math.round(step * 1.185 * (1.185 ** count - 1) / (1.185 - 1));
  let distinctions = 0;
  if (xp >= ranks.at(-1).xp) while (distinctions < 200 && xp >= threshold(distinctions + 1)) distinctions++;
  return { ...rank, distinctions, incomeMultiplier: Math.min(1e6, rank.incomeMultiplier * 1.075 ** distinctions), nextXp: rank.level < 25 ? ranks[rank.level].xp : distinctions < 200 ? threshold(distinctions + 1) : null, nextName: rank.level < 25 ? ranks[rank.level].name : distinctions < 200 ? 'Legacy distinction ' + (distinctions + 1) : 'Maximum distinction' };
}
export function multipliers(ranks, p) {
  const rank = rankAt(ranks, p.xp), calendar = p.sunday ? 1.5 : 1;
  const supporter = Number(p.supporter), marriage = p.married ? 1.05 : 1;
  const common = calendar * supporter * marriage;
  const respect = p.respectPoints === undefined ? p.respect : respectBonus(p.respectPoints);
  const art = p.certifiedOriginals === undefined ? p.art : Math.min(3, Math.floor(p.certifiedOriginals / 3));
  const standing = rank.incomeMultiplier * (1 + respect / 100) * (1 + art / 100);
  const active = p.useCrimeIncome ? 1 + p.crimeIncome / 100 : standing * common * (1 + p.reward / 100);
  const passive = Math.min(1.15, 1 + .075 * Math.log(Math.max(1, standing)) / Math.log(280));
  const rankCrimeXpMultiplier = 1 + .22 * Math.max(0, rank.level - 10) / 15, crimeXpMultiplier = 1.10 ** rank.distinctions;
  return { rank, common, respect, art, active, rankCrimeXpMultiplier, crimeXpMultiplier, business: passive * common, employee: common };
}
export const respectThresholds = [0,5,15,35,75,150,300,600,1200,2500];
export function respectBonus(points) { return Math.max(0, respectThresholds.findLastIndex(n => points >= n)); }
export function crimeQuote(crime, index, ranks, profile) {
  const m = multipliers(ranks, profile), p = Math.min(.95, crime.chance + (m.rank.level - 1) / 24 * .34);
  const ammo = crime.ammo ?? (crime.id === 'car' ? 4 : Math.ceil((index + 1) ** 2 / 4)), supply = ammo * 2500;
  const xpSuccess = Math.floor(crime.xp * m.common * m.rankCrimeXpMultiplier * m.crimeXpMultiplier), xpFail = Math.floor(20 * m.common), xpBig = Math.floor(crime.xp * 3 * m.common * m.rankCrimeXpMultiplier * m.crimeXpMultiplier);
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
  count = Math.floor(clamp(count, 0, 10000)); hours = Math.floor(clamp(hours, 0, 720));
  let wallet = Math.max(0, startingCash), earned = 0, bought = 0; const points = [{ hour: 0, count, wallet, earned }];
  for (let hour = 1; hour <= hours; hour++) {
    const income = count * 1000 * multiplier; wallet += income; earned += income;
    if (reinvest) { const buy = Math.max(0, Math.min(10000 - count, Math.floor((wallet - reserve) / 250000))); count += buy; bought += buy; wallet -= buy * 250000; }
    points.push({ hour, count, wallet, earned });
  }
  return { count, wallet, earned, bought, hourly: count * 1000 * multiplier, points };
}
export function policyMultiplier(policy) {
  return policy === 'launder' ? 2 * (1 - .12 * .8) / (1 + .12 * 2) : policy === 'illegal' ? 1.4 * (1 - .06 * .5) / (1 + .06) : 1;
}
export function businessQuote(asset, owned, multiplier, policy) {
  const cost = asset.price, hourly = asset.income * multiplier * policyMultiplier(policy);
  return { cost, hourly, payback: cost / hourly, yield: hourly / cost };
}
export function tradeQuote({ sale, cost, freight, risk, hours, travel, units = 1 }) {
  const seized = units > 1 ? Math.min(units - 1, Math.max(1, Math.round(units * .25))) / units : .25;
  const revenue = sale * (1 - risk / 100 * (.28 * .04 + .19 * seized + .03));
  const total = cost + freight + travel, expectedProfit = revenue - total;
  return { total, profit: sale - total, expectedProfit, hourly: hours > 0 ? expectedProfit / hours : 0, roi: total > 0 ? expectedProfit / total : 0 };
}
export const rankInvestmentLimit = level => Math.round(250000000 * 500 ** ((Math.max(1, Math.min(25, level)) - 1) / 24) / 1e6) * 1e6;

// Compare fixed-crime scenarios, holding the current profile constant.
export function xpRoutes(quotes, {gap, energy, interval}) {
  return quotes.filter(q => q.available).map(q => {
    const attempts = Math.ceil(Math.max(0, gap) / q.expectedXp);
    const energyRequired = attempts * q.energy;
    const energySeconds = Math.max(0, energyRequired - energy) * interval;
    // The final attempt does not require waiting for its subsequent cooldown.
    const firstEnergySeconds = attempts > 0 ? Math.max(0, q.energy - energy) * interval : 0;
    const cooldownSeconds = firstEnergySeconds + Math.max(0, attempts - 1) * q.waitSeconds;
    return {...q, attempts, energyRequired, ammoCost: attempts * q.supply,
      seconds: Math.max(energySeconds, cooldownSeconds),
      sustainedXpHour: q.expectedXp * 3600 / Math.max(q.waitSeconds, q.energy * interval)};
  }).sort((a,b) => a.seconds - b.seconds || b.xpEnergy - a.xpEnergy);
}
