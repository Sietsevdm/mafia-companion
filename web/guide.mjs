export const chapters = [
 {id:'start', category:'GETTING STARTED', title:'Build income. Then buy speed.', summary:'A sustainable route from your first attempts to a mature empire.', source:'city-expansion.js', blocks:[
  ['The core loop','Keep enough cash for ammunition and release fees. Invest surplus in Street Runners, use that income to fund activities that earn normal XP, and reinvest between sessions. A high displayed payout is only useful after costs.'],
  ['Your first steps','Check your armory and cash. Give respect after spending energy, use affordable crimes, sell recovered vehicles, and claim earned achievements. At 500 normal XP, The Velvet Handoff becomes available if every crew member also meets its requirements. Join a suitable open family for cooperation and the first-family achievement.'],
  ['Spend in this order','Operating reserve → Street Runners → supplies for efficient XP → useful energy upgrades → expensive property unlocks. Change the balance if your immediate goal is XP rather than wealth.'],
  ['Before logging off','Claim completed daily objectives before 00:00 UTC, resolve recovered vehicles, reinvest surplus and avoid an unnecessary risky final attempt that leaves your income suspended.']
 ]},
 {id:'xp',category:'PROGRESSION',title:'Five progress bars. One main rank.',summary:'Know which rewards actually advance your normal rank.',source:'empire.js',blocks:[
  ['Normal XP','Crimes, team missions, daily claims, achievement claims and successful art heists increase normal XP. Main rank improves crime cash and success chance and adds energy capacity. Rank income multipliers do not multiply crime XP.'],
  ['Career XP','Drugs & gun shipments increase their separate career XP totals. Breakouts increase breakout XP. Midnight Circuit races increase driver XP. These do not directly increase normal XP; associated daily objectives and achievements may do so.'],
  ['Later ranks matter','Soldier starts at 152,600 XP with 2.52× base active income; Capo at 413,100 with 16.73×; Boss at 855,600 with 65.11×; The Godfather at 2,444,000 with 500×. Legacy distinctions continue afterward, with increasingly large XP gaps.'],
  ['Use the XP planner','Enter your normal XP in the player profile. Compare expected XP per energy, not only successful XP. Your live game quote remains authoritative for availability and rewards.']
 ]},
 {id:'runners',category:'MONEY',title:'Put your money to work.',summary:'Street Runners provide the strongest repeatable baseline passive return.',source:'city-expansion.js',blocks:[
  ['The numbers','$100,000 buys one Street Runner producing $2,800 per earning hour before bonuses: 2.8% of hiring cost per hour and a 35.7-hour payback. The game does not deduct recurring wages. Hiring prices stay flat, with a one-billion Runner limit.'],
  ['Other employees','Bookkeeper: $1.5m / $41,667 hourly, one maximum. Underworld Broker: $5m / $138,889 hourly, one maximum. Operations Leaders: $50m / $1,388,889 hourly, six maximum, plus Power. These return approximately 2.78% hourly before bonuses.'],
  ['What rank changes','Employee income does not receive the rank passive multiplier. Businesses use the square root of your combined rank, respect and collection income multipliers, capped at 16× before other bonuses. Business copies cost 10% more each and are limited to ten per type. Private luxuries have no passive rental income in this snapshot.'],
  ['Collection and interruptions','The server schedules automatic personal-income collection every two hours. An uncollected cycle accrues at most 24 active hours. Custody suspends earnings. Reinvestment requires manually hiring more employees; the calculator does not automate the game.'],
  ['Bonus detail','In this snapshot, employee income receives the paid or staff-granted membership bonus and the Sunday bonus twice, while the marriage bonus applies once. Referral-only membership receives its general reward bonus once. Select your active tier and tick Membership earned through Beta referrals only when referrals are your sole active membership source.']
 ]},
 {id:'crimes',category:'PROGRESSION',title:'Read the cost behind the payout.',summary:'Choose crimes for your money, energy, success chance and unlocks.',source:'game.js',blocks:[
  ['Ammunition is expensive','Every round costs $2,500. Every valid crime attempt consumes rounds, including failures. Invalid or blocked attempts do not consume supplies. Smuggling uses 16 ($40,000), Harbor cargo 49 ($122,500), Overseas 81 ($202,500), Casino vault 100 ($250,000). Weapons are an additional one-time purchase.'],
  ['Early progression','At 100 XP, Smuggling offers stronger XP efficiency but is costly. At 250, Chop shop improves XP without a property requirement. At 500, a business unlocks Private syndicate deal. At 1,000, Harbor cargo is an option. Unlocking something is not proof it is affordable or profitable.'],
  ['Late-game XP','At The Godfather rank and default bonuses, Overseas commission averages about 47 XP per energy; Skyline extraction about 43.8; Liquidation about 43.4; Casino vault about 42.8. These exclude detention downtime. Overseas needs a jet and Skyline needs a helicopter.'],
  ['Big Scores and failures','A 5% Big Score guarantees success and triples the payout and success XP. Otherwise ordinary chance applies. A failed ordinary crime awards base 20 XP before supported bonuses and can cause a fine, detention or health loss. Expected-value calculators include Big Scores but exclude fines and detention costs.'],
  ['Rotate cooldowns','Success sets a fixed three-minute cooldown for that crime. Failure uses the adjusted catalog cooldown. A shorter failure cooldown does not shorten successful attempts. Rotate crime types when energy and supplies permit.'],
  ['Liquidation rounds','The Liquidation contract accepts extra rounds to raise success chance. Our comparison uses minimum rounds. More ammunition costs money: evaluate the additional chance against extra rounds and the risk of detention.']
 ]},
 {id:'vehicles',category:'MONEY',title:'Turn recovered cars into cash.',summary:'A successful theft pays in a vehicle, not ordinary crime cash.',source:'vehicles.js',blocks:[
  ['Sell the reward','Open My empire → Warehouses after a successful theft and sell the pending car for cash. Resolve it before attempting another theft. Selling a pending car does not require buying a warehouse.'],
  ['Condition changes everything','Recovered conditions are Worn (55% of rolls, 35% value), Used (25%, 55% value), Good (13%, 75% value), Perfect (6%, full value), and Pristine (1%, 135% value). Model rarity, city and hourly quote also matter. A Big Score triples recovered value.'],
  ['Storage and transport','Vehicle warehouses hold 20 recovered vehicles each, up to five warehouses. Purchased cars use separate six-bay private garages. Ship a recovered car only when risk-adjusted destination proceeds minus freight exceed the local sale quote and justify waiting.'],
  ['Purchased vehicles','Purchased cars resell for 80% of their paid purchase price. Buying and immediately selling a car is not an income strategy. Auction prices depend on real bids.']
 ]},
 {id:'teams',category:'PROGRESSION',title:'A dependable crew is an XP advantage.',summary:'Hourly team missions offer excellent normal XP per energy.',source:'crew-operations.js',blocks:[
  ['Each player is paid','Mission XP is awarded individually, not divided among participants. Failed missions award 15% of the listed success XP. Combined Power can add up to five percentage points to base success chance, capped at 95%.'],
  ['The shared limit','All team missions share a one-hour cooldown per participant. Recruit exactly the required number of eligible players. Each needs sufficient normal XP, energy, cash, rounds and weapon tier at launch.'],
  ['Crown Vault example','Five players, 8,000 normal XP minimum, 35 energy, 200 rounds and an $8,000 fee each. At base 80% chance it averages 4,150 normal XP per attempt, or 118.6 XP per energy, before bonuses. Consumable cost is $508,000 each.'],
  ['Choose your crew’s level','Use the highest mission everyone can qualify for and fund. Waiting hours for an unavailable crew can be worse than completing an accessible mission now.']
 ]},
 {id:'energy',category:'PROGRESSION',title:'Make every promotion count.',summary:'Main-rank promotions restore energy and extend your session.',source:'game.js',blocks:[
  ['Time earned claims','If an achievement or daily claim will cross a rank threshold, spend useful energy first when you can do so without crossing it. Then claim and use the restored energy. Never delay a claim past reset.'],
  ['Capacity versus speed','Natural regeneration starts at one energy every 30 seconds. Home perks can improve speed, with a five-second minimum interval. Normal capacity is capped at 1,000 after ownership and rank benefits. Capacity stores energy between visits; speed supports sustained activity.'],
  ['Daily respect energy','Give respect to five different players per UTC day. Each gift provides up to 10 energy, capped by available space, plus $1,000 base cash. Spend energy before giving respect to avoid wasting the refill.'],
  ['No fixed leveling promise','XP per energy ignores detention, team recruitment, supply affordability and cooldowns. Promotion refills add energy; time estimates without those state changes are planning scenarios rather than guaranteed completion times.']
 ]},
 {id:'daily',category:'DAILY ROUTINE',title:'Collect the rewards you already earned.',summary:'Objectives overlap; achievements add normal XP.',source:'daily.js',blocks:[
  ['Daily total','All six objectives provide $132,500 and 1,560 normal XP before supported bonuses. Complete five crime attempts with three successes, three shipment attempts, three respect gifts and one accepted contact attempt. Three shipments also complete the single-shipment objective.'],
  ['Reset time','Daily objectives reset at 00:00 UTC: 01:00 Amsterdam in winter and 02:00 in summer. Claim before reset. The companion checklist resets by UTC date, but does not verify or claim anything in the game.'],
  ['Achievements','Intro achievements award base 500 XP, ordinary achievements 1,000, themed achievements 2,000. Useful early milestones include your first crime, joining a family, your first business, crime counts and holding $1m in cash plus bank. Claim them in the game.'],
  ['Do not buy every reward','Completing an objective can cost more than its cash reward. Treat the XP as a separate benefit and avoid expensive collection purchases solely for small achievement rewards.']
 ]},
 {id:'trade',category:'MONEY',title:'Trade on live quotes, not a permanent route.',summary:'Production and freight returns change with markets and territory perks.',source:'logistics.js',blocks:[
  ['Production setup','Buy production storage before starting. Each warehouse holds 1,000 unsold crates, with up to five warehouses. There are five local batch slots and a 1,000-unsold-crate limit per drug type. Terms are 6, 12 and 24 hours, adjusted by applicable perks.'],
  ['Compare total cost','Use sale proceeds × (1 − interception risk) − production cost − transport cost − required travel. Compare both profit per hour and profit per dollar committed. Selling locally may beat a higher overseas quote.'],
  ['Drug careers unlock products','Cannabis begins at drugs level 1; Hashish at 3; Ecstasy at 5; Cocaine at 8; Methamphetamine at 11. Shipments advance the career; production itself does not directly award normal XP.'],
  ['Use current offers','Production, freight and sale quotes vary hourly. Territory perks and your account affect prices. Enter the actual quote in the calculator; it does not fetch live game markets.']
 ]},
 {id:'art',category:'MONEY',title:'An appraisal is not a buyer.',summary:'Art can hold enormous value, but cash requires an auction sale.',source:'art-market.js',blocks:[
  ['Costs and uncertainty','Heists require a fee, energy, ammunition and weapon tier. Successful recovery can be a reproduction. Appraisal costs 4% of catalog value and is required before listing. Default auction commission is 8%, subject to city benefits.'],
  ['Liquidity matters','An auction without bids returns the artwork to your collection. Do not budget the estimated value as spendable money or assume a high catalog value means an immediate sale.'],
  ['Collection bonus','Every three distinct authentic, appraised works held in the collection add 1% to the relevant income standing calculation, capped at 3%. Selling the collection can remove the bonus. Art is not an efficient default XP farm.']
 ]},
 {id:'bonuses',category:'BONUSES',title:'Stack the bonuses you can justify.',summary:'Sunday, marriage, paid membership and referral rewards.',source:'calendar-events.js',blocks:[
  ['Sunday','Sunday is defined in UTC. Supported reward calculations use a 1.5× Sunday factor. Normal crime XP, team XP and daily claims use the common reward helper. Not every system uses exactly the same bonus path.'],
  ['Marriage','Marriage costs $50m and provides a 10% bonus to supported rewards. Both players need at least 500 normal XP. Build enough income before sacrificing a large share of your capital.'],
  ['Supporter memberships','Supporter uses a 1.10× factor and Grand Supporter 1.25×. Premium shop lists the proposed products and rewards, but checkout is not configured in this snapshot. Memberships can be granted or earned through Beta referrals; do not assume you can buy them immediately.'],
  ['Beta referrals','The snapshot offers $25m starting cash when a new player registers with a referrer; the referrer receives $50m when the player reaches rank 5 and three distinct active days, subject to checks. Five and ten qualified referrals unlock membership time. Existing accounts cannot retroactively claim the registration reward.']
 ]},
 {id:'risk',category:'RISK & LIMITS',title:'Protect your earning time.',summary:'Detention can erase the benefit of a larger payout.',source:'underworld.js',blocks:[
  ['Release decision','Compare the live release cost with passive income and useful play time lost while waiting. A large employee base makes interruption expensive. Keep a cash reserve so release does not force you to stop playing.'],
  ['Contact missions','Zero energy does not mean free: contact missions consume 50 rounds ($125,000). Check the offered payout and consider failure and detention risk. Their daily objective awards normal XP separately.'],
  ['Other systems','Investments return principal at maturity but offer slower base earnings than Runners. PvP depends on targets, defenses and retaliation. Racing develops driver XP. Casino and speculative crypto outcomes vary. Family assets and season prizes belong to shared family wealth.'],
  ['Balance snapshot and account access','This app reads no game account, sends no game requests and performs no actions. Calculations assume unconstrained wallet space and sufficient resources unless explicitly filtered. Owner settings, future updates, clipping and account-specific states can change results.']
 ]}
];
