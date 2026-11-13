# Postprocessor design — v0.7

## Architecture
`FacingInput -> validate -> facing planner -> Toolpath IR -> validate motions -> GenericGCodePostProcessor -> quantize and validate -> NC text -> .nc download`

The planner and IR must be React-independent. The postprocessor is a deterministic pure function with no browser APIs, no mutable global machine state and no file I/O. The UI handles Blob download only after a successful validated result.

## Suggested TypeScript contracts
```ts
export type Motion =
  | { kind: 'rapid'; x?: number; y?: number; z?: number }
  | { kind: 'feed'; x?: number; y?: number; z?: number; feedRate: number };

export interface MachineStartState {
  known: boolean;
  x?: number;
  y?: number;
  z?: number;
  workOffsetVerified: boolean;
  toolLengthVerified: boolean;
  clearanceEnvelopeVerified: boolean;
}

export interface GenericGCodeOptions {
  coordinateDecimals: 3;
  fileExtension: '.nc';
  outputSpindleCommands: boolean;
  spindleRpm?: number;
  clockwiseSpindleConfirmed?: boolean;
  controllerSpindleCommandsVerified?: boolean;
}

export type PostResult =
  | { ok: true; ncText: string; warnings: string[] }
  | { ok: false; errors: string[] };
```

The actual project types must reconcile with existing `data-model.md` rather than creating competing definitions.

## Validation stages
1. Domain: finite positive dimensions, depth, feeds, stepOver <= toolDiameter, safeZ >= retractZ > 0.
2. IR: ordered moves, known starting state, valid feeds, no XY rapid under retractZ, no unverified fixture-envelope traversal, verified external negative XY reach.
3. Quantization: round to three decimals, normalize -0, reject moves collapsed by rounding when this changes cutting coverage or depth, recheck clearances and travel bounds.
4. Spindle: optional mode checks and output ordering.
5. Serialize deterministically; avoid locale-dependent formatting.
6. Mark generated output as generic draft unless the explicit machine profile and external review requirements are satisfied.

## Separation of concerns
- `domain/`: operation and motion types.
- `cam/`: facing planner.
- `postprocessors/generic/`: validation, formatting, serialization.
- `ui/`: options, preview, warnings and download.
- `tests/`: pure unit tests and golden NC fixtures.

## Error policy
Never silently repair unsafe motions or infer missing setup values. Return structured errors; no NC download on errors. When any input changes, invalidate the previously generated output.
