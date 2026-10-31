# Detailed guided-reading revision — November 1, 2026

This revision applies the learner's supplied prose model: conversational explanations, developed analogies, small coherent rounds, explicit notation, complete mechanisms and reasons, and a checkpoint after a worked piece. It expands all 49 deck guides to 60,439 whitespace-separated words in 169 rounds. Word count measures the artifact, not learning quality or mastery.

## Source coverage

All 493 pages of the 49 current slide text extractions were read in bounded consecutive groups. The updated regexp4 and deciders1 sources were used. All 49 downloaded current PDF hashes match `content/models.json`. New `content/coverage.json` maps each deck's page ranges to the concepts explained and is rendered as expandable source links in every guide and both reading editions. The ranges cover all source pages. This is a conceptual companion, not a verbatim transcription or a claim that every visual detail was audited.

Six source pages were rendered and visually inspected in this revision: NFA2 p4, NFA3 p9, PDA5 p6 and p8, TM2 p4, multitapeTM1 p5. The prior revision's visual checks are recorded separately. Originals and submissions were not modified.

## Pass 1 — source and mathematical reasoning

Started from the source examples and checked the target languages, domains, arrows, quantified choices, empty cases, acceptance conditions and termination arguments.

- Corrected a missing q2-on-b-to-q3 transition in the new NFA draft. Recomputed all eight subset rows and the six reachable subsets. In particular bb reaches {3}, then bbb reaches the empty set.
- Exposed the SUBSET-SUM slide's abbreviated certificate check: value membership alone permits illegal reuse of one input occurrence. Added a counterexample and an indexed bit-mask verifier; polynomial certificate size replaces an unjustified strictly-shorter claim.
- Expanded the PDA cleanup counterexample and one-way cleanup construction, balanced-trip invariant and two-direction CFG/PDA reasoning. Induction for computation segments counts transitions, including epsilon transitions.
- Kept the halving TM's reserved first position, the copying TM's return-phase parity check, and the multiplication TM's positive-block domain explicit.
- Distinguished finite accepting-history verification from existence of any accepting history, acceptance from halting, and looping from rejecting. Fair simulation of a decider must detect frontier exhaustion to reject; endlessly enumerating nonexistent branch addresses is insufficient.
- Added complete derivations, fixed-point reasoning, all-split pumping arguments, little-o quantifiers, finite CNF search with a leftmost expansion convention, and parsing/complexity explanations. Supplementary CFL pumping and CYK material is identified as added explanation, not misattributed to a detailed source proof.

The exact eight-row table and source CNF derivation are now checked from the published content against independent rule specifications. Existing bounded CNF language comparisons cover six grammars through length six. These finite checks supplement the written arguments; they do not prove universal claims.

## Pass 2 — explanation, voice and dependencies

Reworked the conceptual bridge in every guide with a concrete analogy and an explicit mapping: sticky-note memory, a clerk holding candidate bookmarks, pending job tickets, stack obligations, virtual notebooks, computation receipts, reduction adapters and time bills. Slang follows the learner's preference; mathematical conditions and formal exam answers remain precise.

Placed the new rounds before the older compressed worked models. Corrected forward references affected by that reordering. Expanded the current CNF guide with a punctuation legend and a seven-step derivation table showing the rule and reason at each step. Preserved the difference between the slide grammar's nonnullable S and the exam grammar's nullable S. Added conversational bridges to all 19 worked lessons and 23 glossary entries for later concepts and frequently confused distinctions.

The existing research-informed method remains worked example → related attempt → feedback → fresh work → delayed recall. The prose model is a style preference, not a new research result. The HARNESS² passage was used as a writing reference; its paper claims were not researched or copied into the course material. Connected checks remain unanswered. No learner attempt was inferred from reading or acknowledgment.

## Pass 3 — rendered product and request fit

All 24 automated tests passed on build `bdbd831126e4`, including the three new source-map/table/derivation checks. The existing tests still cover guide and lesson routes, practice state, answer exposure, search, machine traces, CNF examples, reading anchors and release-aware offline assets.

In the built-in browser, all 49 model routes were rendered at 320px: no measured whole-page overflow, no KaTeX error nodes, source maps present, and at least two rounds per guide. Visually inspected the settled mobile CNF round. Checked the new nullable glossary search, the original `book.html#09-cnf-worked` route, and the complete 49-guide edition. The two reading editions have respectively 19 and 49 source maps. Local browser showed build `bdbd831126e4`. With the local server stopped, the complete 49-guide edition reloaded with the new CNF table and the NFA3 app route loaded from cache. The live browser then displayed the same build and new round content after reload.

These are three passes by the same assistant, not independent reviewers. Publication and live-byte verification are recorded in RELEASE.md after deployment. No physical-phone/Safari, full accessibility, or print-layout audit was performed. Source corrections and artifact tests do not establish learner retention, independent proof skill, a 90+ score, or the exact Midterm 2 cutoff.
