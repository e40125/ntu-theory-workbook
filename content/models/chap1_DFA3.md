# DFA 3 — Combine rules by remembering both summaries

## The whole idea

You already have two working checkers. Can you combine their languages without reinventing everything? Pages 1–4 define the language operations; pages 5–10 prove one combination works. **Closure means an operation never takes you outside the class when you start inside it.** It is a statement about all suitable languages, not a “closed” state in a diagram.

## First distinguish the three jobs

Union A∪B means the whole input belongs to A or B, possibly both. Concatenation A◦B means the input can be split into a first piece from A and a second piece from B, in that order. Star A* means concatenate zero or more pieces from A. Zero pieces produce ε, the empty string.

The slide's A={good,bad}, B={boy,girl} makes the roles visible. `goodgirl` is in A◦B; `girlgood` is not. `goodbadgood` is in A*, because each piece belongs to A. You may choose the sequence of pieces, but you do not shuffle characters inside a chosen piece. The star counts repetitions of whole members, not necessarily single symbols.

## Build the union machine from first principles

The slide combines “odd many 1s” with “odd many 0s.” After a prefix, the first machine knows one parity and the second knows the other. Store **the ordered pair of their states**. Four combinations are possible: (even,even), (even,odd), (odd,even), (odd,odd).

Start (even,even). Reading 1 flips the first coordinate and leaves the second alone. Reading 0 flips the second and leaves the first alone. For `10`, the run is (even,even)→(odd,even)→(odd,odd). Union accepts because at least one coordinate is odd. Input `11` ends (even,even) and rejects: it has two ones and zero zeros, both even.

Each pair is **one state of the new DFA**, with two pieces of information in its label. No branching is happening. It still has one next state per symbol.

## Read the formula as a sentence

Q₁×Q₂ is the set of all state pairs. The new update is

\[\delta((r_1,r_2),a)=(\delta_1(r_1,a),\delta_2(r_2,a)).\]

“Feed the same input symbol a to both old machines and store both new answers.” Subscripts identify which component's update function is used. For union, the new pair accepts when its first coordinate belongs to F₁ **or** its second belongs to F₂. For intersection, use **and** instead; the transitions stay the same.

## Why the construction proves closure

At the start, both coordinates are the component start states. If a pair correctly records both runs after a prefix, the formula makes it record both runs after one more symbol. Therefore it is correct after every finite input. The final or-test matches union membership exactly. This is induction: start true, preserve it one step at a time, conclude it for every length.

Concatenation exposes a new difficulty: a streaming checker may not know when the first piece finishes. Running both machines from the beginning does not solve that cut-position problem. That's why the next deck introduces nondeterminism.

**Connected check:** keep the four-state product above but accept only (odd,odd). Explain which language this new final test describes and why the arrows need no change.
