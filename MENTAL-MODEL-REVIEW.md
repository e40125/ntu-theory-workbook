# Mental-model revision — three review passes

November 1, 2026. These are three review passes by the same assistant, not independent reviewers and not a learner-outcome study.

## Scope and source basis

The revision adds 49 individually written conceptual guides, one per published slide deck (493 source PDF pages), plus a whole-course map. The guides contain approximately 27,900 whitespace-separated words. They explain the objects, purpose, mechanism, examples, notation, correctness arguments and connections; they are conceptual companions rather than a verbatim slide transcript. Later decks remain labeled as later published material with the exam cutoff unconfirmed.

All 49 complete text extractions were read before writing. The current versions of regexp4 and deciders1 were used, rather than silently reverting to older downloaded originals. Every guide carries its source filename, PDF range and current PDF hash in `content/models.json`. Selected diagram checks used the rendered GNFA elimination (regexp3 p4), balanced PDA (PDA4 p7), and halving TM (TM2 p4). This does not constitute visual inspection of every source page.

## Pass 1 — mathematical and source fidelity

Checked the constructions against their actual targets, including input alphabets, empty input, ordering, acceptance conditions, quantified choices, and termination. Revisited the exact source text for the complicated examples and inspected the three diagrams above.

Corrections and distinctions applied:

- The multitape doubling example checks parity during the return phase after copying; the draft's “while copying” wording was corrected.
- The multiplication TM has i,j,k≥1. Its guide now explicitly rejects empty blocks and separates a zero-allowed variation.
- The halving machine's reserved first zero is explained as represented count = remaining live zeros + one; a physical-tape table aligns 4→2→1 with the source.
- NFA transition functions return sets; accepting-state multiplicity is a separate issue. Missing NFA moves, the empty DFA subset, and ε moves have separate meanings.
- The course's exactly-one DPDA convention is preserved. Empty-stack stuck behavior in the `011` example is distinguished from acceptance and TM halting.
- PDA-to-CFG variables represent balanced computations above a protected baseline, rather than arbitrary runs with coincidentally equal endpoint stacks.
- Contraposition versus contradiction, inherent ambiguity of a language versus ambiguity of one grammar, acceptance versus halting, and recognizer nonacceptance versus explicit rejection are separated.
- Nonunit rules copied during CNF unit elimination are retained. The CNF2 wording that could be read as deleting them is identified.
- Compositeness is identified as in P using the original AKS paper. P versus NP remains unsolved according to the Clay Mathematics Institute, checked on the review date.

The added source CNF grammar was checked for final rule shape and terminal-language agreement through length six, alongside the five existing examples. This finite check supplements the derivation-preservation explanation; it is not a proof for all lengths.

## Pass 2 — explanation and dependency review

Read the guides as a chain of ideas, checking where an operation depended on an unexplained object or convention. Each guide starts from a job, develops the mechanism, supplies concrete reasoning, and reconnects to the course. The concluding connected checks remain unanswered rather than being immediately solved as if a response had occurred.

Improvements made in this pass:

- Added explicit analogy mappings: the DFA as the holder of a candidate checklist; a grammar variable as a job ticket; a PDA stack as ordered IOUs or pending output; a balanced PDA segment as a subroutine that protects the underlying stack.
- Expanded repeated nullable occurrences, the distinction between output preservation and derivation-history preservation, and the source of A→S in the 2020 CNF question.
- Added the four p,r,s,q roles and the 16-variable/64-concatenation-rule counts in the PDA conversion.
- Completed the decimal-expression example, balanced-parentheses construction, final GNFA recombination, and pairwise distinctness TM example instead of leaving them as mentions.
- Rewrote the current CNF worked lesson to explain its original grammar and a complete old derivation before editing productions.
- Put a complete relevant mental-model explanation visibly before every existing lesson. All 19 lesson identifiers and practice records remain compatible.
- Connected the design to the existing worked-example, explicit-teaching, concrete/formal representation, proof-explanation and retrieval references. Conversational voice is a preference, not an efficacy claim.

## Pass 3 — rendered product and request fit

Checked that all 49 guides are reachable, source-linked, searchable and connected in deck order. Both complete reading editions have unique fragment anchors. The original `book.html#09-cnf-worked` link now starts with the CNF mental model.

Browser review used the built-in browser. All 49 model routes were rendered at a 320-pixel viewport and measured for whole-page horizontal overflow and math errors: none found. Visual inspection covered the desktop CNF guide, 390-pixel CNF guide and 320-pixel original CNF reading link. The complete 49-guide edition and its collapsed contents/anchor navigation were checked. This is not full screen-reader or physical-phone coverage.

A real upgrade defect was found: a prior offline cache could combine new HTML with old application code. Release-tagged application/content/style requests now bypass a different release's cache while matching the current release offline. A regression test covers this distinction. The guide header was shortened so teaching begins sooner; the 49-item reading-edition contents is collapsed by default so the whole-course model comes first.

Twenty-one automated tests passed, including every model and lesson route, source metadata, stable practice storage, search, unique anchors, existing machine simulations, six finite CNF checks and offline assets. With the local server stopped, the complete guide edition reloaded and the PDA-to-CFG app guide opened from cache. Dependency audit reported zero known vulnerabilities.

## Remaining evidence needed

No new independent learner attempt, delayed recall, or timed transfer was observed. Explanation quality and source checks do not establish a 90+ outcome. Exact Midterm 2 cutoff/logistics remain unconfirmed. Physical phone/Safari, full assistive-technology and print-layout audits remain unperformed. The current release record distinguishes local verification from the subsequent live deployment check.
