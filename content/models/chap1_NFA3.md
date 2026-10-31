# NFA 3 — One DFA state can store the entire candidate set

## The whole idea

The NFA branches, but its set of states is finite. So we can ask a deterministic machine to keep a checklist: **which NFA states are still possible after the input read so far?** Every possible checklist gets one DFA state. That is subset construction. The braces label the contents of one memory record; they do not turn the new DFA into a branching machine.

Here's the mental switch: the DFA is the clerk holding the **whole checklist**, not one of the candidates on it. `{q₁,q₂}` is one clerk's current record. Reading a symbol deterministically produces the next record. That's why a circle with braces can still be one ordinary DFA state.

The NFA has several possible bookmarks; the DFA is one clerk holding the entire bookmark list. Hold up: one list can contain several names while still being one list. That is why {q₁,q₃} names one DFA state. The clerk updates the whole list after each symbol. No guessing remains in that update.

## Round 1 — One clerk holds the entire bookmark list · pages 1–4

The NFA may have many possible current states. The DFA simulation stores their complete set as one summary. Think of one clerk holding a checklist of surviving bookmarks. The clerk itself has one current checklist, not several simultaneous DFA states. That is why a DFA circle may be labeled `{q₁,q₃}` without becoming an NFA.

For three original states there are eight possible lists: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}. The slide abbreviates q₁ as 1 inside set labels; no numeric computation is intended. Some lists never occur. The full power-set construction includes them before optional reachability cleanup.

The easy conversion DFA→NFA keeps the states and wraps each destination in braces: δₙ(q,a)={δᴅ(q,a)}. Set every ε entry to ∅. The difficult direction is NFA→DFA, because the DFA must summarize all alternatives. “Equivalent” means same accepted language; it does not mean same number of states or same diagram.

## Round 2 — Do the three-state example without skipping ε · pages 5–10

Use the previous deck's direct moves. Its start ε-closure is {1,3}, since q₁ can reach q₃ without input. From {1,3} on b, only q₁ has a b move, reaching q₂. q₂ has no ε move, so the next set is {2}. On a, q₂ reaches q₂ and q₃, giving {2,3}. On the next a, q₂ contributes {2,3} and q₃ contributes {1}; ε from q₁ additionally reaches q₃, already included. Final set {1,2,3} accepts because it contains the original accepting q₁. This traces the slide's `baa`.

The complete update table, including initially unreachable subsets, is:

| DFA summary | a | b |
|---|---|---|
| ∅ | ∅ | ∅ |
| {1} | ∅ | {2} |
| {2} | {2,3} | {3} |
| {3} | {1,3} | ∅ |
| {1,2} | {2,3} | {2,3} |
| {1,3} | {1,3} | {2} |
| {2,3} | {1,2,3} | {3} |
| {1,2,3} | {1,2,3} | {2,3} |

From start {1,3}, the reachable lists are {1,3}, {2}, {3}, {2,3}, {1,2,3}, and ∅. For example, `bb` reaches {3} and `bbb` reaches ∅. Removing unreachable states preserves the accepted language because no input run ever visits them. If an exam requests the full prescribed construction first, show it before simplifying.

## Round 3 — Unpack the monster-looking union · pages 11–13

\[\delta'(R,a)=\bigcup_{r\in R}E(\delta(r,a)).\]

R is the current checklist; r is one original NFA state on it; a is the next input symbol. δ(r,a) collects that state's direct a-destinations. E adds all ε-reachable states, including the destinations themselves. The big union combines those collections for every r in R. The prime on δ′ distinguishes the new DFA's function from the original NFA's δ.

The start is E({q₀}). Accepting summaries satisfy R∩F≠∅: the intersection with the old accepting-state set is nonempty. Intersection means members present in both sets. This is exactly “at least one surviving accepting possibility.”

Why it works: initially the checklist contains precisely the NFA's no-input possibilities. If it is correct before a symbol, following every matching move and then all ε moves produces precisely the possibilities afterward. Induction carries that claim through the whole input. The final intersection test then agrees with NFA acceptance. The invariant is the proof; the table is one instance of the construction.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
