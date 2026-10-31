# Theory, worked through

**[Open the published workbook](https://e40125.github.io/ntu-theory-workbook/)** · [Release verification](RELEASE.md)

A static study workbook for NTU Theory of Computation, prepared November 1, 2026. Nineteen original lessons, seventy-two historical exam subparts, a mixed practice set, machine traces, local review records, and teaching references. This is an independent study aid, not an official course publication or grade predictor.

## Develop and verify

- `npm ci --ignore-scripts`
- `npm run build`
- `npm test`
- `npm run serve` (http://127.0.0.1:4173)

Source text lives in `content/`, UI and model code in `src/`. Build output is `dist/`; it is the only web root. The renderer compiles math with KaTeX/MathML and bundles fonts locally. The service worker caches first-party assets, including the complete reading edition. External course PDFs remain online links.

The test suite checks the masking model on 5,461 promised-format inputs, palindrome branches on 2,047 strings, source and subpart integrity, review timing, all app routes, search, answer-exposure reporting, simulation controls, and offline-cache coverage. Finite tests supplement the written correctness arguments; they are not proofs for all inputs. Browser visual checks and publication verification are recorded separately in the release notes.

## Publishing

The production branch contains only compiled site files. The source branch contains this directory, excluding `node_modules/` and `dist/`. Never publish the parent course workspace: it contains private transcripts, grades and coursework. The parent workspace has no remote and is not the Pages repository.

GitHub Pages serves the production branch's root. Hash routes allow direct lesson links without server rewrites. Progress is device-local; JSON export/import transfers it manually. Imported records are self-reports, not authenticated assessment results.

## Content boundaries

The public course page lists Midterm 2 on November 16 but the exact cutoff, duration and room remain unverified. Core lessons cover prerequisites, regular pumping, CFG/CNF, PDA/DPDA, both conversions, TM construction and variants. The full 49-deck library is linked, with later material labeled separately. The course omits detailed CFL pumping in the inspected Chapter 2 decks, so it is not added to the core route.

Historical paper guides identify requirements and approaches; the original PDFs contain the complete official solutions and diagrams. All questions and solution text in the six papers were inspected; selected diagrams were visually checked. This is not a claim that every official solution has received a full independent audit.

No analytics or account backend. No personal grades, chat histories, or submissions are included. Text and diagrams are authored for this workbook; original course sources are linked. KaTeX's license ships with the build. See the research page for evidence and limitations of the teaching design.
