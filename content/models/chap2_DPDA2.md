# Completing a DPDA: make every required choice unambiguous

## Start from the language, then audit the formal definition

The deck revisits the PDA for \(0^n1^n\). Its useful behavior is already clear: initialize a bottom marker, push zeros, pop for ones, and finish when the debt is paid. Now we ask a different question: does its transition table meet the course's strict DPDA definition for **every** state/input/top combination?

A familiar diagram can recognize the correct language yet fail that formal completeness requirement. This is why an exam may ask for a transition table, not just a plausible sketch.

We already know the intended workflow: push for zeros, pop for ones, finish when the debt is paid. Now make the table obey the course’s determinism rule in every situation, including bad inputs. Treat it like checking which buttons are enabled at once. A rejected input still needs coherent machine behavior.

## Round 1 — The table is a conflict audit, not a wall of random ∅s · pages 1–3

The original 0ⁿ1ⁿ PDA has a natural deterministic phase structure: install $, push on zeros, pop on ones, then remove $. The task here is to express it under the course's formal exactly-one convention, including rejecting cases.

At q₁, δ(q₁,ε,ε)=(q₂,$) installs the marker regardless of the next input or existing top. Because it is the ignore-both move, every other competing entry in that row must be ∅. Otherwise the first action would be ambiguous. q₁ remains accepting for the empty string under the course's convention.

At q₂, δ(q₂,0,ε)=(q₂,0) reads zero and pushes zero without inspecting the stack. For either possible top, this move already handles next input 0. Therefore the 0-input/top-specific entries and competing ε-input moves must be empty. The zeros in the table header are literal input or stack symbols; ∅ in a cell means undefined action.

## Round 2 — Why the rejecting state becomes necessary · pages 4–5

For next input 1 with top 0, define δ(q₂,1,0)=(q₃,ε): match a zero and switch to the one phase. Its competitors must be empty. Now inspect next input 1 with top $. None of the old successful moves applies: there is no zero to match.

Under an at-most-one definition you could leave that situation stuck. Under the course's exactly-one definition, fill it with δ(q₂,1,$)=(qᵣ,ε). qᵣ is a rejecting state. The slide abbreviates some cells as just qᵣ; the full formal output still needs the pair, including what is pushed. State labels alone are shorthand here, not a new transition type.

You can fill the table systematically: list each actual input/top combination; inspect its four candidate cells; keep the one intended move; force competitors empty; if none exists, supply a rejecting move consistent with all already-fixed cells. Check conflicts after every addition because one ε entry participates in several combinations.

## Round 3 — The one phase forbids going back to zeros · pages 6–8

At q₃, another 1 with top 0 pops it. A zero while unmatched zeros remain goes to rejection because block order has already switched. When $ is exposed, δ(q₃,ε,$)=(q₄,ε) moves to the accepting endpoint and removes the marker. This ε move can occur even while unread input remains; the whole-input acceptance rule still applies.

Trace `011`: q₁ installs $, q₂ reads 0 and pushes it, q₃ reads the first 1 and pops it, then removes $ and enters q₄. There is still one unread 1 and the stack is empty. The only entries that could operate without a top are δ(q₄,1,ε) and δ(q₄,ε,ε); both are empty. The run gets stuck and rejects.

“But q₄ is accepting!” Yes, for a completed input. It is not permission to throw away the final symbol. Also, the defined q₄ rejecting moves requiring an actual stack symbol cannot fire on an empty stack. This example ties together three separate conditions: correct state, all input consumed, and a genuinely enabled move when input remains.

The source's third-row intermediate displays are easier to read through these state meanings than by copying isolated shaded cells. The final behavior follows from the full transition condition. When a table entry is abbreviated, expand it to a complete `(state,push)` pair in your formal answer.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Initialization controls every other possibility

If q₁ has δ(q₁,ε,ε)=(q₂,$), that action is enabled without reading or popping. For any next input a and top x, it already occupies the one allowed choice among the four entries. Thus the other potentially competing entries from q₁ must be empty. The bottom marker is pushed once, then the machine changes phase.

In q₂, zeros are read and pushed. When reading a `1`, the machine must have a zero marker to pop before entering q₃. If the top is `$` instead, there is no owed zero to match; send that required case to rejecting behavior.

## A rejecting completion is part of the machine

Use a rejecting state qᵣ for cases that must be defined but cannot lead to acceptance. Its subsequent actions must also obey the four-way condition and prevent a return to useful accepting computation. It is not enough to scribble “reject” in a table if the formal transition type expects a pair. The deck's shortened qᵣ entries stand for a specified pair such as `(qᵣ,ε)` where appropriate.

Adding reject behavior is safe because it handles situations in which the original partial construction had no successful accepting continuation. It should never steal a case needed by a valid string.

## Trace the subtle `011` case

Read `0`: one zero marker is pushed. Read the first `1`: that marker is popped, leaving `$` in q₃. The ε move on `$` then enters q₄ and removes the marker. But one input `1` remains.

This is **not** acceptance. In the slide construction, the remaining situation has no legal way to consume that final symbol and finish successfully. Reaching q₄ didn't cause a TM-style halt that ignores unread input. The whole-input condition still applies.

Also notice the determinism constraint at q₃ with top `$`. The ε-pop action is already the enabled choice, so an input-consuming action that also competes there must not be added. Otherwise we would break determinism while trying to “complete” the table.

## A reliable way to check your answer

For each state q, each actual input symbol a, and each actual stack symbol x, examine the four entries from the previous deck as one group. Count nonempty entries; under this course definition the count must be exactly one. Separately check that each output is one legal pair, that labels use the stated alphabets, and that the start/accepting states are identified.

Then trace ε, a valid nonempty example, too few ones, too many ones, and an out-of-order zero. Those traces catch different failures. They don't replace a general invariant: zeros create obligations, ones discharge them, and phase changes forbid later zeros.

**Keep:** determinism, completeness, and language correctness are three checks with different jobs. Next, Turing machines replace the stack's top-only access with a rewritable tape and movable head.

**One connected check:** Why can filling an empty table entry with a useful transition accidentally violate determinism even if that cell previously contained ∅?
