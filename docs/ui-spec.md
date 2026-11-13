# UI Specification (Draft)

Single-page layout:
- Header: project name, import/export project, NC download.
- Left: operation picker and context-sensitive parameter form.
- Right: XY toolpath preview and Z-depth summary.
- Bottom or side panel: validation messages and read-only G-code preview.

Interaction:
- Input changes invalidate the generated path and NC until regenerated.
- Generate button remains disabled on validation errors.
- Rapid and feed motions use distinguishable styles and a legend.
- Download only the current validated generated NC, never stale output.
- All numeric fields display units.


## v0.4 coordinate UI
- Display XY origin marker at lower-left of stock preview, X+ right and Y+ up.
- Show stock top as Z0 and all cut depths as negative Z values.
- Proposed fields: safe height, retract height, total cutting depth, maximum stepdown; include explicit mm units.
- Label clearance defaults as examples requiring user verification, not guaranteed safe values.

## v0.5 facing fields and diagnostics
- Show `safeZ`, `retractZ`, `totalDepth`, `stepDown`, `stepOver`, `feedXY`, `feedZ`, stock W/L/T, tool diameter, and optional spindleRPM.
- Display the **external path envelope** including negative X/Y, plus a confirmation that fixture-free travel and entry are verified; without confirmation, block generation.
- Preview should display X/Y axis, stock rectangle, cutter-center path, rapid vs feed legend and depth-level list.
- Changing any input invalidates preview/NC until regeneration; distinguish geometry errors from machine setup safety warnings.
