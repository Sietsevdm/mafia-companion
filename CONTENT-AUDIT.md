# Calculation and content audit — 8 November 2026

Replaces the 2 November audit. Companion starting commit: 7c2613579a47515ee9471549957a9108df083236 (1.0.7). Latest game checked: 1.36.11, commit 74b639548e8f0e851e7ccec8126458dc5ce93058. Both remote heads were read before the audit. No game files or player database were modified.

## Recalculated rules

| Area | Current rule | Authoritative files |
| --- | --- | --- |
| Street Runner | $250,000; $1,000/hour; 10,000 limit; 5,000 Power | city-expansion.js |
| Bookkeeper | $1.5m; $10,000/hour; one maximum; 150-hour base payback | city-expansion.js |
| Underworld Broker | $5m; $25,000/hour; one maximum; 200-hour base payback | city-expansion.js |
| Operations Leaders | $50m; $150,000/hour; six maximum | city-expansion.js |
| Businesses | Flat copy prices; ten copies/type; seven starter types about 240-hour stable base payback; larger types 270–360 hours | catalog.js |
| Business rank factor | min(1.15, 1 + .075 × log(standing) / log(280)); standing includes rank, respect and collection; Godfather alone gives 1.075 | progression.js, game.js |
| Membership | Supporter 7%; Grand Supporter 15%; effective tier shared by paid/referral; no stacking | shop.js, game.js |
| Marriage and Sunday | Marriage 5%; Sunday 50%; passive income applies each effective bonus once, weighted over actual earning intervals | player-systems.js, game.js, city-expansion.js |
| Main rank cash | Soldier 2.52; Capo 12.11; Boss 42.55; Godfather 280; distinctions +7.5% cash each | progression.js |
| Crime XP | Rank-success multiplier rises from 1 at Soldier to 1.22 at Godfather; distinctions ×1.10 each; neither boosts ordinary failure XP | progression.js, game.js |
| Crime catalog | All 20 final exports refreshed, including rank unlocks, XP caps and tripled cash; Car theft uses four rounds | catalog.js, logistics.js |
| Crew missions | All four final exports refreshed; Crown Vault needs 152,600 XP and 45 rounds, costing $120,500 incl. fee | crew-operations.js |
| Daily objectives | Six exports unchanged: $132,500 and 1,560 XP before supported bonuses | daily.js |
| Investments | 6h .04–.06%; 12h .08–.12%; 24h .18–.25%; 48h .38–.52%; 72h .60–.80%; new positions no reward bonus | investments.js |
| Principal limit | Rank-scaled $250m–$125bn total personal active principal | progression.js, investments.js |
| Freight | Conditional inspection outcomes: .50 delay, .28 bribe at 4% value, .19 partial seizure, .03 full seizure; partial crate rounding included | freight-inspections.js |
| Art | Appraisal 2.5% of estimate; direct sale 65% appraised value; auctions use seller/city commission; heist rank and XP changes reviewed | art-market.js |
| Production | Normal ranks 1/5/10/16/21 unlock products; career level improves value | logistics.js |
| Contacts | Three rounds ($7,500), zero energy; online-time cadence | logistics.js, empire.js |
| Beta referrals | $5m starting cash; $15m qualifying-referrer reward | referrals.js |
| Recovered vehicles | Model pool restricted by five-rank bands; condition weights retained | vehicle-catalog.js |

## Strategy implications (ordinary day, no personal bonuses)

- Best employee cash return: Bookkeeper, 0.6667%/hour (one), then Broker, 0.5%/hour (one), then Runner, 0.4%/hour (10,000). Leaders offer Power but lower cash return at 0.3%/hour.
- Starter stable businesses return about 0.4167%/hour. Long-run laundering multiplies business return by 1.458064516, about 0.6075%/hour at rank 1, with variable income/closures. Compare player bonuses and capital before spending.
- Crown Vault averages 4,150 XP per attempt, 118.57 XP/energy, before bonuses at base chance; its shared one-hour cooldown and crew requirements matter.
- At Godfather without distinctions or additional bonuses: Hostage about 44.9734 XP/energy; Harbor and Skyline 44.9607; Overseas 44.56025. These ignore fines and custody, and property unlocks still apply.

## Verification and reproducibility

`node scripts/refresh-balance.mjs <separate-game-checkout> <YYYY-MM-DD>` imports the authoritative final exports and refreshes data.json. Only run against a trusted checkout; importing JS executes its module initialization. The app itself never imports game code or reads live accounts.

`node scripts/verify-game-balance.mjs <separate-game-checkout>` compares every snapshot catalog and 6,748 crime/freight cases with current game exports, including 25 ranks and three distinction states, all membership tiers, marriage and Sunday combinations, supply costs, business prices and investment limits.

29 local regression tests cover numerical values, unlock boundaries, migration, reinvestment, passive bonuses, copied crime income, distinctions and freight rounding. Current MDN Math.floor documentation was consulted for integer rounding behavior. Browser checks cover income, profile tiers, freight crate rounding and current investment rates. GitHub Actions additionally checks actual Nginx startup, health, JavaScript MIME and multi-platform image build.

## Player fields and limitations

Previously audited English field locations were checked in the latest public UI: XP/EXPERIENCE and RESPECT in My profile; WEAPON TIER in Personal armory; crime income in Dashboard → Your standing; CRIME COOLDOWNS in My possessions; Certified unique originals in Art & antiquities. Paid shop product cards still do not prove active tier. Checkout remains unavailable.

Old saved Supporter/Grand Supporter selections migrate to 7%/15%. The obsolete referral-origin checkbox is removed because the effective passive path is now shared. All GitHub source links remain absent from the app.

This is a code-based calculation audit, not a signed-in inspection of deployed player state. Forecasts hold selected bonuses and rank constant; ignore custody, membership expiry, wallet clipping, future prices, recruitment and promotion refills unless stated. Freight profit includes expected cash losses but not random inspection delay in hourly timing. Investment scenarios do not subtract existing locked principal or simulate custody; historical legacy-bonus positions differ. The XP planner remains a fixed-current-rank budget, not an optimal multi-activity schedule. No game balance or bot/Luca code was changed.
