# Completing a DPDA: make every required choice unambiguous

## Start from the language, then audit the formal definition

The deck revisits the PDA for \(0^n1^n\). Its useful behavior is already clear: initialize a bottom marker, push zeros, pop for ones, and finish when the debt is paid. Now we ask a different question: does its transition table meet the course's strict DPDA definition for **every** state/input/top combination?

A familiar diagram can recognize the correct language yet fail that formal completeness requirement. This is why an exam may ask for a transition table, not just a plausible sketch.

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
