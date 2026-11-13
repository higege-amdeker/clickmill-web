# Architecture v0.3 (Draft)

## Technology
- React + TypeScript (confirmed)
- Vite (proposed)
- SVG for initial 2D preview (proposed)
- Vitest for unit tests (proposed)

## Dependency direction
UI -> application services -> pure CAM domain -> postprocessor -> browser download adapter.
The CAM domain and postprocessor must not depend on React, browser DOM or rendering APIs.

## Modules
- `src/domain/models/`: validated workpiece, tool, operation and machine-profile types.
- `src/domain/validation/`: constraints and actionable diagnostics.
- `src/cam/operations/`: facing, drilling, rectangular-pocket path planners.
- `src/cam/toolpath/`: typed moves, units and invariants.
- `src/postprocessors/generic/`: deterministic toolpath-to-G-code conversion.
- `src/features/editor/`: React parameter editing and operation selection.
- `src/features/preview/`: XY rendering and Z information.
- `src/features/project/`: versioned JSON import/export.
- `src/platform/download/`: local file download.

## Suggested toolpath intermediate representation
A sequence of moves tagged `rapid` or `feed`, with explicit XYZ coordinates and optional feed metadata. Keep spindle and other machine-state commands distinct from geometric moves. Define invariant and clearance rules before implementation.

## Computation workflow
Edit parameters -> validate -> calculate path -> validate path -> render preview -> postprocess -> inspect NC -> download.
Never silently reuse an outdated NC file after inputs change.


## v0.4 calculation boundary
- Store domain depths as positive input magnitudes; convert to negative Z only when producing path levels.
- Keep depth scheduling and path safety validation in pure TypeScript functions, independent of React.
- The postprocessor consumes validated, ordered moves; it must not invent missing safe moves or machine-specific modal commands.

## v0.5 first vertical slice
Implement facing first: form -> validated facing input -> pure raster planner -> independent path safety validator -> 2D SVG preview -> draft generic postprocessor -> download. Keep safety diagnostics separate from geometry errors. Use one canonical toolpath for both preview and NC output. See `copilot-implementation-v0.5.md`.
