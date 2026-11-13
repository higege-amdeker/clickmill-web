# Test Plan (Draft)

## Unit tests
- Numeric parsing, units, bounds, NaN/Infinity and missing inputs.
- Each operation's XY bounds, stepdown count, final depth, retract order and expected path geometry.
- Postprocessor output snapshots and deterministic formatting.
- JSON roundtrip, unknown schema versions and malformed input.

## Integration tests
- Changing a parameter invalidates previous output.
- Validation failures block NC generation and download.
- Preview and G-code derive from the same toolpath representation.

## Acceptance and safety
- Independently inspect generated toolpaths against hand-calculated fixtures.
- Run controller-specific offline simulation and supervised machine dry-run before real machining.
- Document unsupported controller dialects and no guarantee of collision avoidance.


## v0.4 tests
- Coordinate origin: stock lower-left maps to (0,0); stock top maps to Z0.
- Depth schedules: (3,1) => [-1,-2,-3]; (2.5,1) => [-1,-2,-2.5]; (0.4,1) => [-0.4].
- Invalid inputs: zero/negative/nonfinite totalDepth or stepDown, nonpositive clearance heights, safeZ < retractZ.
- Motion safety: reject XY rapid moves below validated clearance; retract before XY repositioning.
- Numeric formatting: last pass reaches requested final depth within documented numeric precision.

## v0.5 facing acceptance tests
- `W=20,L=10,D=4,S=4,totalDepth=2.5,stepDown=1`: X range `[-2,22]`, Y rows `[-2,2,6,10,12]`, depths `[-1,-2,-2.5]`, 15 cutting X sweeps.
- `S > D`, `S <= 0`, `totalDepth > thickness`, `safeZ < retractZ`, `retractZ <= 0`, NaN/Infinity: reject.
- Missing external fixture/travel verification: block toolpath and NC generation.
- Every XY rapid is preceded by an established current Z >= retractZ; no rapid plunge into stock.
- Last pass reaches exactly requested depth; all rows cover entire stock with cutter radius.
- Editing an input invalidates previously generated NC and disables download.
- Same validated toolpath is used for 2D preview and postprocessor.
- Validate a known fixture by manual calculation and independently inspect the output before any real-machine test.

## v0.6 deterministic facing cases
| ID | Input | Expected |
|---|---|---|
| F01 | W20 L10 T5 D4 S4 depth2.5 d1 | X [-2,22], Y [-2,2,6,10,12], Z [-1,-2,-2.5], 15 X sweeps, 12 Y connectors |
| F02 | W20 L10 D4 S3 | Y [-2,1,4,7,10,12]; final spacing 2 <= 3 |
| F03 | depth0.4 d1 | one depth -0.4 |
| F04 | depth2.5 d1 | exactly three depths, final -2.5 |
| F05 | S>D, S<=0, D<=0, depth>T | validation error, no NC download |
| F06 | safeZ<retractZ, retractZ<=0, NaN, Infinity | validation error, no NC download |
| F07 | externalTravelVerified=false | block toolpath and NC generation |
| F08 | unknown initial XYZ or unverified initial access | block motion generation; do not emit initial blind Z rapid |
| F09 | each XY rapid | current Z known >= retractZ and verified corridor |
| F10 | every cutting row transition | G1 at feedXY, no G0 |
| F11 | stepOver tiny / depth huge | bounded row/pass/motion counts; fail safely, no UI hang |
| F12 | near-boundary decimal values | no accidental extra pass; final row/depth matches formatted precision |
| F13 | edit any parameter after generation | preview and NC marked stale, download disabled |
| F14 | repeated same inputs | identical toolpath and G-code output |
| F15 | 2D preview vs NC | same validated motion sequence and coordinates |

No fixture is validated for actual machining until machine-specific offline simulation and supervised dry-run.
