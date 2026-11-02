# Content and field-location audit — 2 November 2026

Verified against Mafia revision `0d6677ff6ebc6aec7aca2630f164a2805f6b6307`. This audit uses the game's English source strings and server calculations; it is not a signed-in inspection of an individual player's deployed account. Translated menus and older deployments may differ.

## Correct field locations

| Ledger input | Mafia readout | Authoritative UI file |
| --- | --- | --- |
| XP | Header XP, or My character → My profile → EXPERIENCE | public/app.js, public/profile-ui.js |
| Respect | My character → My profile → RESPECT; alternatively Player respect, received count | public/profile-ui.js, public/underworld-ui.js |
| Weapon tier | My empire → Weapons & ammunition → Personal armory → WEAPON TIER (number before / 3) | public/navigation.js, public/logistics-ui.js |
| Supporter / Grand Supporter | Title on the diamond beside the player's name | public/name-badges.js |
| crime income (%) | Dashboard → Your standing → crime income | public/premium.js, dashboard() |
| CRIME COOLDOWNS (%) | My empire → My possessions → CRIME COOLDOWNS | public/premium.js, inventory() |
| Certified unique originals | Crimes & missions → Art & antiquities → Your private collection → Certified unique originals | public/art-market-ui.js |
| Marriage | My character → Marriage, active marriage | public/navigation.js, public/player-systems-ui.js |
| Ownership categories | My empire → Businesses, Cars, Real estate, Helicopters, Private jets, Yachts | public/navigation.js |

Correction: **crime income is not displayed in My possessions**. Its summary is on Dashboard. CRIME COOLDOWNS is displayed in My possessions. These locations must not be conflated.

The Premium shop has a Supporter memberships section, but the current API sets both membership cards to owned whenever any membership is active. Therefore a Membership active product card does not reliably identify the active tier. The diamond title uses the actual tier. The shop currently reports checkoutEnabled=false and PayPal coming later; the guide no longer implies checkout is available.

## Calculations and content checked

- Crime order, names, unlock XP, energy, rewards, XP, ordinary chances, supply formula, Big Scores, failure XP and per-crime cooldown rules.
- Main-rank thresholds, legacy distinctions, rank cash factors and 16× passive rank-factor cap.
- Employee prices, hourly income, limits and flat hiring costs.
- Business final prices, 10% copy escalation, ten-copy limit, policy seizures and closed hours.
- All six daily objectives, overlaps, cash, XP and UTC reset; total rewards now sum individually rounded claims.
- All four crew missions, per-player fees, rounds, energy, XP, chance, Power boost and shared hourly cooldown.
- Investment terms, quoted rates, limit, maturity, principal return and custody reduction.
- Respect thresholds, collection-original count thresholds and marriage bonus/cost.
- Vehicle conditions, value factors, warehouse capacity, pending-vehicle sale and 80% purchased-car resale.
- Production terms, career unlocks, storage/slot constraints, risk-adjusted route comparison and absence of direct normal-XP awards.
- Achievement XP tiers, referral rewards and eligibility, separate racing/breakout XP.

Catalog crime data, rank data and relevant business numeric values matched the previous companion snapshot. The snapshot revision has been updated to the audited revision. The guide's spelling, punctuation, names and explanatory grammar were reviewed across all chapters, tutorial steps, field hints and calculator copy.

## Membership correction

The general reward factor uses the effective active membership. The separate passive helper uses paid/staff-granted membership only. A referral-only membership therefore receives its general reward bonus, but not the additional paid passive-helper factor. The profile now has an explicit referral-origin checkbox, and calculation tests cover ordinary and Sunday/marriage cases.

If paid and referral membership overlap, the Ledger does not model distinct tiers simultaneously. Use the effective badge tier and leave the referral-only checkbox off; treat passive estimates as approximate if a different paid tier is also active. Unknown membership origin should not be guessed.

## Scope and limits

No live game-account data is imported. Calculators remain scenarios: custody, wallet clipping, membership/calendar transitions, changing market quotes and recruitment time are not fully simulated. The copied Dashboard crime income is a combined displayed value; it replaces the calculated crime factor instead of stacking the same bonuses again.

The sidebar Source button was removed as requested. Small per-topic verification links remain as references; they are separate from that button.
