# GitHub Copilot implementation tasks — v0.7

## Task 1: Types and pure formatting
Read all docs, especially `gcode-spec.md` and `postprocessor-design-v0.7.md`. Add options, motion contracts, strict `formatCoordinate` and `formatFeed`, with Vitest tests NC-001..004 and NC-008. Do not modify UI or generate full NC yet.

## Task 2: Postprocessor validation
Implement machine-start and motion safety validation, quantization rechecks, structured diagnostics, and tests NC-009..014, NC-018, NC-020. No invented machine state.

## Task 3: Generic serializer
Implement deterministic G21/G90/G17, G0/G1, explicit feed, optional S/M3/M5, M2 and newline. Tests NC-005..007, NC-015, NC-017, NC-019. No automatic work offsets or tool changes.

## Task 4: React integration
Connect options and error UI, preview, and guarded `.nc` Blob download. Invalidate output on every input change. Tests NC-016 and integration tests. Always label generic output as not machine-certified.

## Copilot Chat prompt
```
Read `.github/copilot-instructions.md` and all `docs/*v0.7.md`, plus `docs/gcode-spec.md` and `docs/data-model.md`. Implement Task 1 ONLY from `docs/copilot-implementation-v0.7.md`. Keep domain/postprocessor independent of React. Write Vitest tests before integrating. Do not invent controller-specific startup, spindle or tool offset behavior. Show changed files, test results and unresolved safety assumptions; stop before Task 2.
```
