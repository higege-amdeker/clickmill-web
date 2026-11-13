# Decision log — v0.5

## Confirmed
- React + TypeScript; client-side computation; single-screen UI; XY 2D preview and Z-depth summary.
- Initial output is a generic **draft** G-code dialect, not guaranteed to run on arbitrary CNC controllers.
- Workpiece lower-left corner is XY origin, top surface is Z0, X+ right, Y+ toward the back, Z+ upward; mm and G90.
- **Two heights**: `safeZ` (start/end) and `retractZ` (between machining positions), both measured above stock top; require `safeZ >= retractZ > 0`.
- XY rapid allowed at or above **user-verified** `retractZ` only; neither height is inferred to be collision-free.
- **Facing** is the first operation to implement and verify end to end.

## v0.5 algorithm proposals (need approval before real-machine use)
- Facing full rectangular stock top with raster passes parallel to X, alternating X direction.
- Flat end mill, tool center path extends half a tool diameter beyond all four stock edges; external approach envelope must be checked.
- Each depth level is processed as a complete raster; no in-cut rapid repositioning.
- Initial entry is a vertical feed at an XY location outside stock, subject to fixture and stock envelope verification.
- Last depth is exactly the requested depth, with deterministic bounded rounding.

## Open decisions
1. Does facing mean remove a specified thickness from the entire stock top, and may the tool center go outside stock bounds?
2. Does the machine setup allow negative X/Y work coordinates and sufficient external clearance for tool and fixtures?
3. Should first-pass raster start on the near edge (Y negative) and alternate direction on each row?
4. Machine profile: startup/end codes, spindle control, work offsets, tool-length compensation, output extension and safe startup state.
5. Whether to enable actual NC download before a machine profile is validated (recommended: downloadable **unverified** file with explicit warning; never claim machine-ready).

All example dimensions and heights are placeholders, not safe defaults for real machinery.
