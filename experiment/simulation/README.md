# Available Rolling Process Simulation Videos

## Summary
This document lists all available simulation video combinations for the Rolling Process experiment.

## Video Availability Matrix

### ✅ Available Combinations

Currently, **ONLY COLD ROLLING** videos are available. Hot rolling simulations will be added in future updates.

#### Materials Available:
- Aluminium (Al)
- Copper (Cu)
- Ck-45 Steel (Steel)

#### Temperature Available:
- ✅ **Cold** - All combinations available
- ❌ **Hot** - NOT available (will be added later)

#### Friction Coefficients Available (for Cold only):
- Low (zero friction) - All materials ✅
- Medium - Aluminium & Steel only ✅ (Copper ❌)
- High - Aluminium & Steel only ✅ (Copper ❌)

#### Rolling Velocities Available (for Cold only):
- 0.5 mm/sec
- 1 mm/sec
- 1.5 mm/sec

---

## Complete List of Available Videos

### Aluminium + Cold (9 videos)
1. Al + Cold + Low Friction + 0.5 mm/sec ✅
2. Al + Cold + Low Friction + 1 mm/sec ✅
3. Al + Cold + Low Friction + 1.5 mm/sec ✅
4. Al + Cold + Medium Friction + 0.5 mm/sec ✅
5. Al + Cold + Medium Friction + 1 mm/sec ✅
6. Al + Cold + Medium Friction + 1.5 mm/sec ✅
7. Al + Cold + High Friction + 0.5 mm/sec ✅
8. Al + Cold + High Friction + 1 mm/sec ✅
9. Al + Cold + High Friction + 1.5 mm/sec ✅

### Copper + Cold (3 videos) ⚠️ LIMITED
1. Cu + Cold + Low Friction + 0.5 mm/sec ✅
2. Cu + Cold + Low Friction + 1 mm/sec ✅
3. Cu + Cold + Low Friction + 1.5 mm/sec ✅
4. Cu + Cold + Medium Friction + (any velocity) ❌ NOT AVAILABLE
5. Cu + Cold + High Friction + (any velocity) ❌ NOT AVAILABLE

**Note:** Copper videos are only available with LOW friction.

### Steel (Ck-45) + Cold (9 videos)
1. Steel + Cold + Low Friction + 0.5 mm/sec ✅
2. Steel + Cold + Low Friction + 1 mm/sec ✅
3. Steel + Cold + Low Friction + 1.5 mm/sec ✅
4. Steel + Cold + Medium Friction + 0.5 mm/sec ✅
5. Steel + Cold + Medium Friction + 1 mm/sec ✅
6. Steel + Cold + Medium Friction + 1.5 mm/sec ✅
7. Steel + Cold + High Friction + 0.5 mm/sec ✅
8. Steel + Cold + High Friction + 1 mm/sec ✅
9. Steel + Cold + High Friction + 1.5 mm/sec ✅

---

## Total Available Videos: 21

**Breakdown:**
- Aluminium: 9 videos (3 friction × 3 velocities)
- Copper: 3 videos (1 friction × 3 velocities) ⚠️
- Steel: 9 videos (3 friction × 3 velocities)

**Note:** Copper has limited friction options (Low only)

---

## ❌ NOT Available (Future Updates)

### Hot Rolling - All Combinations
- Any material + **Hot** + Any friction + Any velocity ❌

### Copper + Medium/High Friction
- Copper + Cold + **Medium** friction + (any velocity) ❌
- Copper + Cold + **High** friction + (any velocity) ❌

The following combinations will show a warning message asking users to change parameters:
- Aluminium + Hot + (any friction) + (any velocity) ❌
- Copper + Hot + (any friction) + (any velocity) ❌
- Copper + Cold + Medium friction + (any velocity) ❌
- Copper + Cold + High friction + (any velocity) ❌
- Steel + Hot + (any friction) + (any velocity) ❌

---

## Video File Naming Convention

Videos are stored in the `ROLLING/` directory with the following structure:

### Directory Structure:
```
ROLLING/
├── Al_Cold/
│   ├── Rolling_al_f0_vp5.mp4
│   ├── Rolling_al_f0_v1.mp4
│   ├── Rolling_al_f0_v1p5.mp4
│   ├── Rolling_al_fm_vp5.mp4
│   ├── Rolling_al_fm_v1.mp4
│   ├── Rolling_al_fm_v1p5.mp4
│   ├── Rolling_al_fh_vp5.mp4
│   ├── Rolling_al_fh_v1.mp4
│   └── Rolling_al_fh_v1p5.mp4
├── Cu_Cold/
│   ├── Rolling_cu_f0_vp5.mp4
│   ├── Rolling_cu_f0_v1.mp4
│   └── Rolling_cu_f0_v1p5.mp4
│   (Only 3 files - Low friction only)
└── Steel_Cold/
    ├── Rolling_CK45_f0_vp5.mp4
    ├── Rolling_CK45_f0_v1.mp4
    ├── Rolling_CK45_f0_v1p5.mp4
    └── ... (9 files total)
```

### Naming Convention:
- **Material codes:**
  - `al` = Aluminium
  - `cu` = Copper
  - `CK45` = Ck-45 Steel
  
- **Friction codes:**
  - `f0` = Low (zero) friction
  - `fm` = Medium friction
  - `fh` = High friction
  
- **Velocity codes:**
  - `vp5` = 0.5 mm/sec
  - `v1` = 1 mm/sec
  - `v1p5` = 1.5 mm/sec

### Example:
`Rolling_al_fm_v1.mp4` = Aluminium + Medium friction + 1 mm/sec (Cold)

---

## Implementation Notes

The system now includes validation logic that:
1. Checks if the selected parameter combination has an available video
2. Shows a warning modal if the video is NOT available (Hot rolling)
3. Prevents navigation to the result page when video is unavailable
4. Asks users to change their parameters (specifically the Temperature to "Cold")
5. Only navigates to the result page if the video exists

This prevents broken simulations and provides clear feedback to users.
