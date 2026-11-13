# Facing input fields — v0.6

| UI label | Model path | Unit | Validation | Example |
|---|---|---|---|---|
| Work width | workpiece.width | mm | finite > 0 | 20 |
| Work length | workpiece.length | mm | finite > 0 | 10 |
| Work thickness | workpiece.thickness | mm | finite > 0 | 5 |
| Flat end mill diameter | tool.diameter | mm | finite > 0 | 4 |
| Total facing depth | operation.totalDepth | mm | 0 < value <= thickness | 2.5 |
| Max stepdown | cutting.stepDown | mm | finite > 0 | 1 |
| Max stepover | cutting.stepOver | mm | 0 < value <= tool diameter | 4 |
| XY feed | cutting.feedXY | mm/min | finite > 0 | 300 |
| Z feed | cutting.feedZ | mm/min | finite > 0 | 100 |
| Spindle speed | cutting.spindleRPM | rpm | finite > 0 | 8000 |
| Safe height | setup.safeZ | mm | >= retractZ and > 0 | 10 |
| Retract height | setup.retractZ | mm | > 0 and <= safeZ | 5 |
| External travel verified | setup.externalTravelVerified | boolean | true to generate | false by default |

Example values are test fixtures, NOT safe machining defaults. Initial known tool state and machine/profile clearance requirements remain explicit gating inputs; do not fabricate defaults. UI must show validation per field, warnings about negative XY coordinates, and invalidate generated toolpaths and NC when any input changes. JSON schema versioning required.
