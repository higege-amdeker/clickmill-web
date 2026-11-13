# Web ClickMILL — Requirements v0.3 (Draft)

## 1. Purpose
Provide a browser-only, single-page 2.5-axis CAM application that converts user-entered machining parameters into downloadable generic G-code for CNC milling machines.

## 2. Confirmed scope
- React + TypeScript frontend; toolpath and NC generation entirely in the browser.
- Single-screen user interface with 2D XY toolpath preview and Z-depth information.
- Generic G-code output; no machine communication.
- No CAD import in MVP.

## 3. Proposed MVP functional requirements
| ID | Requirement | Acceptance criterion |
|---|---|---|
| FR-001 | Operation selection | Select facing, drilling, or rectangular pocketing. |
| FR-002 | Parameters | Enter workpiece dimensions, operation geometry, tool diameter, feeds, spindle speed, stepdown and stepover. |
| FR-003 | Validation | Reject invalid, nonfinite, or physically incompatible values before generating output. |
| FR-004 | Toolpath | Generate explicit, ordered XYZ moves with rapid/cutting classification. |
| FR-005 | Preview | Display XY path with distinct rapid and cutting moves, plus Z-depth information. |
| FR-006 | Postprocessing | Generate deterministic generic G-code according to gcode-spec.md. |
| FR-007 | Download | Save NC text as a local file. |
| FR-008 | Project JSON | Export and import versioned parameter JSON with validation. |

## 4. Nonfunctional requirements
- No machining data sent to a server during calculation.
- Calculations are independent of React and covered by automated unit tests.
- Units, origin and sign conventions are explicit and consistent.
- UI must remain responsive; consider a Web Worker if computations become expensive.
- User must review output and verify controller-specific compatibility before machine execution.

## 5. Out of scope for MVP
- Direct machine control, CAD import, 3D stock simulation, collision guarantees, automatic tool changes, cutter compensation G41/G42, and arc interpolation G2/G3.

## 6. Decisions still open
- Machine coordinate convention, work offset, stock origin, and Z zero.
- Tool entry/exit and clearance strategy; fixtures and safe travel envelope.
- Exact first release operation and algorithms, including pocket strategy and edge allowances.
- Feed and spindle output policy, supported M codes, output extension and line formatting.
- Unit selection (initial recommendation: mm only).

## 7. Safety acceptance gate
No NC output for invalid parameters. Preview is not a collision simulation. Require controller-specific review, simulation, dry-run and safe machine setup before real cutting.


## 8. Confirmed coordinate system (v0.4)
- XY origin: lower-left corner of stock as viewed from above.
- X increases to the right; Y increases toward the back/top of the XY view.
- Z zero: top of stock; Z increases away from stock, cutting depth is negative Z.
- Right-handed XYZ; toolpath coordinates represent the tool center/reference tip point as defined in the setup.
- Initial units: millimeters, absolute work coordinates (`G21`, `G90`).
- The controller work offset and actual tool-length reference must be verified before machining.

## 9. Proposed clearance and depth semantics (awaiting approval)
- `safeZ`: initial/final high clearance height above stock top (suggested UI default +10 mm, not a certified safe value).
- `retractZ`: clearance between operations/locations (suggested UI default +5 mm, not a certified safe value).
- `totalDepth`: positive distance below top surface (example 3 mm).
- `stepDown`: positive maximum vertical depth increment per pass (example 1 mm).
- Require `safeZ >= retractZ > 0`, `totalDepth > 0`, `stepDown > 0`; validate machine travel separately.
- The suggested defaults do not account for fixtures, clamps, tool geometry, or machine limits.

## 10. Pending toolpath decisions
- Whether to support both safeZ and retractZ in MVP or one shared clearance height.
- Whether all XY rapid moves must occur at safeZ or may occur at retractZ after user-confirmed clearance.
- Whether Z descent is always G1 at plunge feed, with no rapid motion toward stock.
- Whether the first operation should be drilling, facing, or rectangular pocketing; specific entry/exit strategies and step-over rules remain undefined.
- Whether the first NC profile emits spindle commands or omits them pending machine profile selection.

## v0.5 confirmed decisions and MVP sequence
- Two Z clearances: `safeZ` for start/end and `retractZ` for moves between machining locations, with `safeZ >= retractZ > 0`.
- XY rapid is allowed only at a Z >= `retractZ` **and** when the clearance envelope has been verified by the user; heights alone do not certify collision freedom.
- Facing is the first end-to-end operation. Drilling and rectangular pocketing remain planned MVP scope, but are not in the first implementation slice.
- Facing path behavior is specified in `facing-algorithm.md` and requires explicit verification of travel beyond the stock boundary.
- Earlier text that labels XY/Z origin, clearance strategy or first operation as undecided is superseded by `decisions-v0.5.md`.

## v0.6 facing additions
- Facing supports out-of-stock tool-center coordinates and X-direction bidirectional zigzag.
- Input contract: see `docs/facing-inputs-v0.6.md`; deterministic geometry and motion rules: `docs/facing-algorithm.md`.
- Known initial machine/tool state and verified access/corridors are required before emitting motion commands; the app must not fabricate a safe startup.
- Output and preview use the same validated typed toolpath; all edits invalidate the prior output.


## v0.7 confirmed NC export requirements
Coordinates must be formatted to 3 decimal places; filename extension `.nc`; S/M3/M5 spindle commands are optional and OFF by default. See `gcode-spec.md` for validation, controller-profile limitations and safety gates.
