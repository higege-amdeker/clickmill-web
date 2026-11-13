# G-code and postprocessor test cases — v0.7

Use Vitest. Test pure functions and exact string fixtures.

| ID | Test | Expected |
|---|---|---|
| NC-001 | 1.2, -2, 0 coordinates | `1.200`, `-2.000`, `0.000` |
| NC-002 | -0 and -0.0001 | `0.000` |
| NC-003 | locale fr-FR / ja-JP | identical dot-decimal output |
| NC-004 | output name `part` | `part.nc` |
| NC-005 | spindle OFF | no S, M3, M5 |
| NC-006 | spindle ON, verified 12000 rpm | S12000 M3 before cutting, M5 after retraction |
| NC-007 | spindle ON without rpm/approval | reject |
| NC-008 | NaN / Infinity coordinates | reject |
| NC-009 | XY rapid with current Z below retractZ | reject |
| NC-010 | unknown start Z | reject rapid safety assumption |
| NC-011 | unsafe negative XY fixture clearance | reject machine-ready output |
| NC-012 | rounded depth/stepOver violates tolerance | reject |
| NC-013 | malformed feed <= 0 | reject |
| NC-014 | final state not at safeZ | reject |
| NC-015 | same input twice | byte-identical UTF-8 NC text |
| NC-016 | changed input after generation | disable old download |
| NC-017 | modal header | first line `G21 G90 G17` |
| NC-018 | no implicit offset/tool-length/home commands | no G54/G43/G28/G53 |
| NC-019 | end | `M2` after optional M5, trailing LF |
| NC-020 | XY+Z simultaneous rapid | reject |

Golden fixtures should document the *verified initial state* separately; never assert that a generic NC file is safe on actual hardware.
