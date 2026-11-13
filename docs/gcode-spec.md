# Generic G-code output specification — v0.7

## Scope and status
Draft generic profile, **not certified for any CNC controller**. The operator must verify the machine/controller dialect, work offset, tool length compensation, startup position, clamping and clearance before use. Do not claim G-code is universally executable.

## Confirmed formatting
- Output filename: sanitized project basename + `.nc`; UTF-8 text, LF line endings, trailing newline.
- Coordinates X/Y/Z: exactly three digits after decimal point, dot separator, invariant locale, negative zero normalized to `0.000`. Units mm.
- Feed F: three digits after decimal point in mm/min for consistency; spindle S: positive integer rpm.
- Reject NaN, Infinity, out-of-range values, invalid identifiers, or commands that would round into a forbidden geometry/motion. Revalidate *quantized* coordinates, including depth and clearance.
- No comments, line numbers, arc commands, canned cycles, cutter compensation or implicit tool changes in MVP.

## Generic modal initialization
`G21 G90 G17` on first line (metric, absolute, XY plane). Supported motion codes `G0` and `G1` only. Program terminator `M2` is a **proposed generic default** requiring target-controller validation. No implicit `G54`, `G43`, `G28`, `G53`, coolant or tool-change commands.

## Optional spindle
- `outputSpindleCommands` defaults false.
- When false, emit no `S`, `M3`, or `M5`; UI must warn spindle management is external.
- When true, require valid `spindleRpm`, explicit operator confirmation of clockwise spindle mode, and a controller profile that supports `S`, `M3`, `M5`. Emit `S{rpm} M3` before cutting and `M5` after final retraction, before `M2`. No unsupported spindle-wait/dwell assumption.
- Do not assume spindle is running, nor assume `M3` completion means it has reached speed. Machine-specific readiness is outside generic profile.

## Motion serialization
- Accept validated ordered Toolpath IR (absolute work coordinates), not arbitrary user G-code.
- Emit a G0/G1 line for each motion; no modal omission in v0.7. Emit only axes explicitly present, in X Y Z order; use F on every G1 to avoid dependence on inherited feed.
- Disallow simultaneous XY and Z rapid moves. XY rapid allowed only with **known current Z >= retractZ** and verified clearance of the entire travel envelope. Any rapid Z move requires an explicit verified initial state and a validated path; do not assume an unknown machine start position is safe.
- Validate machine limits, stock/fixture clearance, offsets and tool length via explicit setup approvals; absent required information => block machine-ready export. An engineering draft may be previewed with conspicuous warning but must never be labelled safe-to-run.
- End at verified safeZ before M5/M2. Never invent a homing, tool change or initial clearance move.

## Example (illustrative only, not executable setup)
```gcode
G21 G90 G17
S12000 M3
G0 X-2.000 Y-2.000
G1 Z-1.000 F100.000
G1 X22.000 F300.000
G0 Z10.000
M5
M2
```
The example omits prerequisites, including verified initial tool position, offsets, machine limits and clearance. **Do not send it to a CNC.**

## Open controller-profile decisions
M2 versus M30, work offset and tool-length compensation, safe startup sequence, spindle rotation and readiness, feed limits, machine travel bounds, decimal tolerance, and controller-specific syntax. These must be resolved per machine before machine-ready use.
