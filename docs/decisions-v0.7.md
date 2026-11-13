# Decisions — v0.7

Confirmed: React + TypeScript, browser-only NC generation, one-screen UI, 2D preview, generic G-code, .nc, 3 decimals for coordinates, optional spindle commands, stock lower-left XY origin, stock-top Z0, safeZ/retractZ dual heights, XY rapid only above validated clearance, facing with external overtravel and zigzag raster.

Proposed defaults pending target-controller verification: `G21 G90 G17`, `G0/G1`, `M2`, `S/M3/M5` on opt-in; spindle option defaults OFF. Not yet confirmed: machine profile, work offset, tool length compensation, startup state, machine travel limits, safe motion envelope, spindle readiness, and whether draft export should be blocked until all are verified.
