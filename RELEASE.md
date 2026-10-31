# Mental-model revision — November 1, 2026

Build `bdc9355625ce` is prepared for publication. It adds 49 deck guides, a conceptual map, a complete reading edition, and visible mental models before all 19 worked lessons. The current CNF question now explains the original grammar before its conversion. See [the three-pass review](MENTAL-MODEL-REVIEW.md) for corrections, tests and limits. Twenty-one tests pass; source, explanation and rendered-product review are complete. Live publication will be recorded after verification.

---

# Initial production release — November 1, 2026

[Open the workbook](https://e40125.github.io/ntu-theory-workbook/). Build `a9e10040530d`, compiled October 31 at 17:10 UTC / November 1 at 01:10 Taipei. Production commit `758285326c57cd09627ad664f13b79e720ed8ba9`; application source commit `550f5c9ba19a1edf815dbc83cbda95d6a3fd1426`. Subsequent documentation commits do not change that build.

## Delivered

- Nineteen lessons from language/state/proof foundations through regular pumping, grammars/CNF, PDA/DPDA, both grammar-machine conversions, constrained design, TM construction and variants.
- Seventy-two subparts across six historical papers, linked to original official PDFs and relevant lessons; all forty-nine current slide decks linked.
- Complete examples, proof reasoning, hidden practice solutions, a 100-point mixed practice set, and two interactive machine traces.
- Searchable symbols, local notes and self-reported attempts, answer-exposure records, review dates, JSON export/import, offline first-party reading, dark mode, larger text and a complete printable reading edition.
- Teaching rationale with twelve research/guidance references and three Stanford CS103 teaching references. This is evidence-informed design, not a claim of a universal best method or a score guarantee.

## Verified

GitHub reports Pages built successfully. Every one of the seventy-four live release files was fetched and matched byte-for-byte with the local build. Fifteen automated tests passed. The masking TM was checked on 5,461 promised-format inputs and the palindrome model on 2,047 binary strings. Five CNF examples were compared on all terminal strings through length six and checked for CNF shape. These finite checks supplement the written proofs; they are not universal proofs.

The UI checks cover nineteen lesson routes, main pages, searches, draft persistence, answer-exposure handling, review timing, machine controls, paper counts, skip navigation and cache coverage. Browser checks used the built-in browser at desktop and 320/390/768-pixel viewport widths. Selected long lessons had no whole-page horizontal overflow or math-render errors. The live mobile CNF lesson, deep-link refresh, dark theme, zero-record backup export/import and offline-ready indicator were verified. Cached reload and glossary search worked with the local server stopped. No warning/error console messages appeared in the final live check. The dependency audit reported zero known vulnerabilities at release.

## Limits and next review

Exact Midterm 2 cutoff, duration and room remain unverified; the official page lists November 16. The 120-minute mock timer is an adjustable practice setting. Lesson availability does not establish lecture coverage. Selected official diagrams were visually checked; a complete independent audit of all historical solutions is not claimed.

No physical phone/Safari test, full screen-reader/accessibility audit, or printed-PDF layout audit was completed. The backup round trip used zero attempts; local draft and attempt semantics were tested separately. Offline behavior was exercised on the local origin; the live origin's cache reported ready and its assets matched. External course PDFs need network access. Browser storage can be cleared or evicted; export important work. Progress is local to each browser/device, with manual transfer rather than automatic sync.

No learner outcome was assessed during release. Reading and self-report cannot establish independent proof skill. The next instructional review should inspect actual written work, assistance and prior exposure, then a later fresh attempt.
