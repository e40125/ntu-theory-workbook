# DFA 3 — Combine rules by remembering both summaries

## The whole idea

You already have two working checkers. Can you combine their languages without reinventing everything? Pages 1–4 define the language operations; pages 5–10 prove one combination works. **Closure means an operation never takes you outside the class when you start inside it.** It is a statement about all suitable languages, not a “closed” state in a diagram.

Two bouncers check the same guest: one checks rule A, one checks rule B. The combined machine keeps both reports. Now the boss chooses the admission policy: either report says yes, or both say yes. Same remembered pair, different acceptance rule. That is the product construction doing its actual job.

## Round 1 — Three operations, three different jobs · pages 1–5

Union A∪B is a choice of whole strings: accept something belonging to A or B or both. Concatenation A◦B glues one complete member of A before one complete member of B. It preserves order. With A={good,bad} and B={boy,girl}, you get goodboy, goodgirl, badboy, badgirl. You do not get boygood unless the sets or order change.

Star A* glues any finite number of A-members, including zero members. “Zero members” produces ε, the length-zero string. Thus goodbad and badgood both belong to A*: each block is chosen independently, but the order within a chosen block stays intact. The empty language ∅ has no block to choose; nevertheless ∅*={ε}, because choosing zero blocks is still permitted.

**Closed under** is a property of a family under an operation. “Regular languages are closed under union” means taking two regular languages never takes you outside the regular-language family. It does not say their union equals either original language, or that a language is “open” in some geometric sense. The multiplication example on positive integers is the same idea at a different level: valid inputs to the operation produce another member of the family.

## Round 2 — Two scoreboards, one input stream · pages 6–9

The product state (r₁,r₂) records where machine 1 and machine 2 would be after the same prefix. It is one state in the new machine, with two fields. You are not feeding the first half to one machine and the second half to the other. Every next symbol goes to both.

For odd ones OR odd zeros, the four summaries are (even,even), (even,odd), (odd,even), (odd,odd). The first coordinate counts ones' parity; the second counts zeros' parity. Read 1: toggle the first. Read 0: toggle the second. Start (even,even). For union, every summary except (even,even) accepts. For intersection, only (odd,odd) accepts. The arrows stay the same; the final condition changes.

The transition formula δ((r₁,r₂),a)=(δ₁(r₁,a),δ₂(r₂,a)) literally says “update both fields with their own tables.” If the alphabets originally differ, use their union as a common alphabet and send missing-symbol moves to rejecting sink states. That preserves the original languages while making the parallel update defined everywhere.

## Round 3 — Induction is checking the starting setup and the update · page 10

The invariant is: after any prefix w, the product's two coordinates equal the two original machines' states after w. **Base case:** for ε, each machine is at its start, and the product starts at their pair. **Inductive step:** assume the claim holds after a prefix. Read one new symbol a. The product rule applies exactly the two original updates, so the claim still holds after wa. Every finite string can be built from ε by adding symbols; therefore the invariant holds for every input.

Now apply the accepting-state definition: either coordinate accepts exactly when w belongs to at least one original language. That connects the mechanical invariant to the promised language. Induction did not require guessing the final number of input symbols.

Why not use this same construction for concatenation? Because concatenation asks for a split w=xy, with x checked by machine 1 and y by machine 2. The split can depend on the input. The product above gives both machines the entire string and answers a different question. Nondeterminism gives us a way to keep possible split points alive. That's the next move.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
