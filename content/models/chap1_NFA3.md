# NFA 3 — One DFA state can store the entire candidate set

## The whole idea

The NFA branches, but its set of states is finite. So we can ask a deterministic machine to keep a checklist: **which NFA states are still possible after the input read so far?** Every possible checklist gets one DFA state. That is subset construction. The braces label the contents of one memory record; they do not turn the new DFA into a branching machine.

Here's the mental switch: the DFA is the clerk holding the **whole checklist**, not one of the candidates on it. `{q₁,q₂}` is one clerk's current record. Reading a symbol deterministically produces the next record. That's why a circle with braces can still be one ordinary DFA state.

## Build the update rule

Suppose the current checklist is R and the next input symbol is a. Look at every state r in R, follow its a-arrows, collect the destinations, then include every state reachable from those destinations by ε moves. That creates one uniquely determined next checklist.

The start checklist is E({q₀}), where E means ε-closure: include q₀ and all states reachable by zero or more ε-arrows. A checklist accepts when it contains at least one NFA accepting state. Nothing more complicated is hidden in the formula R∩F≠∅: intersection keeps members shared by R and F; “not empty” says at least one accepting possibility survives.

## Trace the exact slide example

The three-state NFA on page 3 starts at q₁, which has an ε move to q₃; q₁ is accepting. Therefore the converted start is {q₁,q₃}, already accepting because ε has an accepting run at q₁.

Pages 10–11 give `baa`:

```text
before input       {q₁,q₃}
after b            {q₂}
after ba           {q₂,q₃}
after baa          {q₁,q₂,q₃}
```

The final set contains q₁, so accept. To see one union explicitly, page 6 starts with {q₁,q₂} and reads a: q₁ contributes no destination; q₂ contributes q₂ and q₃. The result is {q₂,q₃}. ∅∪{q₂,q₃}={q₂,q₃}. An empty contribution doesn't create an extra candidate.

## What the empty DFA state means

If the checklist becomes ∅, every NFA candidate has died. Another symbol cannot restart a nonexistent run. Thus ∅→∅ on every symbol in the DFA. This is a real state whose remembered fact is “no candidates remain.” In the old NFA, a missing arrow meant a branch died. Same behavior, different representation.

With three original states there are eight possible subsets. The textbook construction includes all of them; some are unreachable from the start. Here any subset containing q₁ but omitting q₃ is unreachable because closure would immediately include q₃. Remove unreachable states only after satisfying any exam requirement to display the complete prescribed construction.

## Why the proof works for every input

At zero symbols, closure records exactly the possible starts. Assume the checklist is exact after a prefix. Every legal next run must consume the next symbol from one of those states, followed by any ε moves; the update lists exactly those possibilities. No legal run is omitted and no impossible run is invented. Induction gives the exact checklist after every prefix. The final “contains an accepting state” test then agrees with NFA acceptance.

In the formula δ′(R,a)=⋃ᵣ∈ᴿ E(δ(r,a)), the prime marks the **new** transition function and ⋃ means collect the members from all the listed sets. It is the table procedure written compactly.

**Connected check:** explain why starting at {q₁} would already be wrong in this example before processing the first symbol. Then say which start-state property the proof would lose.
