# Copilot Chat prompt — Task 01 only

You are implementing Web ClickMILL, a browser-only React + TypeScript CAM prototype. First read `.github/copilot-instructions.md` and all documents under `docs/`, especially `requirements.md`, `architecture.md`, `facing-algorithm.md`, `gcode-spec.md`, `test-plan.md`, and `implementation-plan.md`. Treat existing v0.7 normative safety constraints as authoritative. If specs conflict, report the conflict instead of inventing a rule.

**Task 01: Bootstrap only.**
- Initialize Vite with the `react-ts` template in this repository (do not overwrite existing docs or `.github`). Use npm.
- Configure Vitest for pure TypeScript unit tests and add a minimal passing smoke test.
- Add ESLint using a compatible current configuration and scripts: `dev`, `build`, `test`, `test:watch`, `lint`, `typecheck`.
- Create `src/domain/`, `src/postprocessors/`, `src/components/`, `src/services/`, and `tests/` directories, using tracked placeholder files only if needed.
- Keep UI minimal: title `Web ClickMILL` and a visible note `Prototype — generated NC requires machine-specific validation`.
- No CAM algorithms, no G-code output, no download, no mocked safe machine state in this task.
- Keep TypeScript strict and do not add backend services.

**Acceptance criteria**
1. `npm install` completes.
2. `npm run typecheck`, `npm run lint`, `npm test -- --run`, and `npm run build` succeed.
3. Existing docs and `.github/copilot-instructions.md` are preserved.
4. Report changed files, exact test commands/results, and unresolved decisions. STOP after Task 01; ask for approval before Task 02.
