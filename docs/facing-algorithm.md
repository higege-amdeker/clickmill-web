# Facing toolpath — v0.6 (normative for MVP planner)

## Scope
Rectangular stock `[0,W] × [0,L]`, flat end mill diameter `D`, top surface Z0, stock-lower-left XY origin, X-axis raster, bidirectional zigzag. The tool center is allowed outside the stock; no automatic collision avoidance. All lengths mm, feeds mm/min, spindle rpm.

## Inputs and validation
- `W=workpiece.width`, `L=workpiece.length`, `T=workpiece.thickness`, `D=tool.diameter`, `S=cutting.stepOver`, `d=cutting.stepDown`, `depth=operation.totalDepth`, `feedXY`, `feedZ`, `spindleRPM`: finite positive numbers.
- `S <= D`, `depth <= T`, `safeZ >= retractZ > 0`; all finite.
- `setup.externalTravelVerified === true` AND verified free-space/corridors for negative XY, entry plunge, raster and retraction. User confirmation is not physical proof; keep warning in UI.
- Machine coordinate limits, fixture dimensions and safe initial tool state cannot be inferred. For preview/generic export, require explicit `initialState` (known XYZ and valid safe corridor), or block motion generation. Do not invent an initial G0 Z move from an unknown position.
- Cap generated rows, depth passes and motion commands by explicit configurable limits to prevent browser hangs. Reject excessively large or unrepresentable values; never silently truncate.

## Geometry
`r=D/2`; `xMin=-r`, `xMax=W+r`, `yMin=-r`, `yMax=L+r`.
`intervals=ceil((yMax-yMin)/S)`; `rows[j] = (j===intervals ? yMax : yMin+j*S)` for `j=0..intervals`.
`passes=ceil(depth/d)`; `z[i] = (i===passes ? -depth : -min(i*d,depth))` for `i=1..passes`.
Use a documented floating-point tolerance to prevent an extra near-zero interval/pass due to rounding; the final row/depth is exact within G-code precision. Validate that output coordinate rounding does not collapse distinct rows or violate final depth.

## Ordered motions
1. Preconditions: a controller/profile-established initial state with known Z >= safeZ, known collision-free access to start, and known coordinates. No automatic tool change, spindle activation or work-offset selection.
2. At known Z >= safeZ, `G0` XY to `(xMin,yMin)` only if verified corridor exists.
3. For each depth `z`: at `(xMin,yMin)` and Z >= retractZ, `G1` vertical to `z` at `feedZ` (outside-stock entry clearance explicitly verified); for each row `j`, feed X to `xMax` if even, otherwise `xMin` at `feedXY`; between rows feed Y to `rows[j+1]` at current X using `feedXY`.
4. At last row, retract vertically at `feedZ` to `retractZ` (not a rapid); if another depth exists, `G0` XY back to `(xMin,yMin)` only along verified corridor. Then plunge at feedZ.
5. After last pass, retract vertically from `retractZ` to `safeZ` at `feedZ`. No unverified XY moves at the end.

`G0` XY is prohibited unless current known Z >= retractZ and corridor is verified. No downward G0, no engaged XY G0. A planner output is an ordered set of typed motion records, not G-code text. UI and postprocessor consume the same validated path.

## Hand-calculated fixture
`W=20,L=10,T=5,D=4,S=4,depth=2.5,d=1,safeZ=10,retractZ=5` => `x=[-2,22]`, `y=[-2,2,6,10,12]`, `z=[-1,-2,-2.5]`; five X sweeps per depth, 15 total; four Y connectors per depth, 12 total. For each pass, X sweep endpoints alternate: -2→22, 22→-2, -2→22, 22→-2, -2→22. The last row interval is 2 mm. Five X sweeps per depth total 120 mm of X cutting travel; over three depths 360 mm, plus 12 Y feed connectors totaling 42 mm. (This excludes entry, retract and rapid moves.)

## Not included
Corner rounding, material removal simulation, real controller certification, tool radius compensation G41/G42, arcs, automatic fixture collision checks, tool-length offsets, machine-limit verification, spindle/tool initialization.
