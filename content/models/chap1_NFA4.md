# NFA 4 — Use free handoffs to assemble whole-language machines

## The whole idea

Union, concatenation and star are instructions about **whole accepted pieces**. We want machine wiring that respects those instructions. ε-arrows let us hand control from one component to another without secretly adding an extra character. That is their job here. They are not decorative buffers.

You have two working checkers. Now we need plumbing that joins their jobs without secretly eating a symbol or restarting the input. ε is the free handoff: change where the checking continues, keep the unread input where it is. The tricky shit is deciding which handoffs are legal and when.

## Round 1 — ε hands off control without stealing a character · pages 1–7

For union, imagine a reception desk with two doors to two departments. The desk chooses which checker to enter; it does not consume part of the customer's document. That is why the fresh start has ε arrows to both original starts and no 0/1 arrows of its own. If the alphabet is a/b, the same reasoning applies. The dispatch mechanism is independent of the input symbols.

Before joining machines, rename states so their state sets are disjoint. Otherwise both could contain a q₁ and you might accidentally merge unrelated rooms. Keep all old transitions. Accept in either machine's original accepting states. A successful new path chooses one department and then follows its old checker on the entire input. Conversely, any successful old path remains available through its ε entrance. That's both directions of the union proof.

The piecewise δ definition is a dispatch table: if q belongs to Q₁ use δ₁; if q belongs to Q₂ use δ₂; at the new start on ε return {q₁,q₂}; at the new start on a real symbol return ∅. A missing last case would leave the formal function incompletely specified.

## Round 2 — Concatenation must choose where the first job ends · pages 8–11

For A₁◦A₂, start in machine 1. From each of its accepting states, add an ε handoff to machine 2's start. Keep its old arrows too: a valid first piece may be short or long, so different runs may hand off at different times. Only machine 2's accepting states are final for the combined machine.

The expression Q₁\F₁ means “states in Q₁ except its accepting states.” The special F₁ case adds the new ε destination to the old ones using union; it does not overwrite the old ε moves. For real-symbol moves, retain δ₁ unchanged.

Any accepting combined path consumes some prefix x before handoff and a suffix y afterward. The first checkpoint guarantees x∈A₁; the final checkpoint guarantees y∈A₂; therefore xy∈A₁◦A₂. Conversely, if such an x/y split exists, follow its two accepting runs and the connecting ε. Empty x or y is allowed exactly when the corresponding original language contains ε.

## Round 3 — Star means complete another chunk, not restart whenever · pages 12–16

Star needs zero or more complete A-chunks. Add a **fresh accepting start** with an ε arrow to the original start. Keep old accepting states accepting, and add ε arrows from them back to the old start. Each loop around completes one more valid chunk. Zero chunks accepts at the fresh start.

Why not simply make the old start accepting? Suppose the old machine has a 0 loop at its nonaccepting start and a 1 arrow to its accepting state, with no other arrows. Its language is 0*1. Relabeling the old start accepting would accept `0`, although `0` cannot be assembled from complete 0*1 chunks. A fresh start accepts ε without blessing every nonempty path that returns to the old start. This is a teaching counterexample, separate from the unlabeled slide diagram.

The fresh start has no incoming arrows in this construction. It does not “loop to itself” merely because it accepts. Accepting is a final-state property, not an arrow. The alphabet still consists of the original real input symbols; ε is a free control move. Those three facts prevent the exact confusion that makes star diagrams look like arbitrary bullshit.

To prove correctness, divide an accepting run at each added restart arrow. Each consumed chunk belongs to A. Conversely, concatenate accepting old runs for any finite list of A-members and connect them with the ε restarts. The fresh accepting start handles the list with no chunks.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Derive the three constructions

For union, the complete input may belong to either language. Add a fresh start with ε-arrows to both old starts. Preserve both components' accepting states. One successful component is enough.

For concatenation, the input must be a valid first piece followed by a valid second piece. Add ε-arrows from each first-component accept to the second start. Keep only second-component accepts as final accepts. A candidate may guess a boundary at any successful first-piece endpoint; another candidate may keep reading in the first component. A successful run must eventually finish both obligations.

For star, the input is zero or more complete pieces from one language. Add a **fresh accepting start** to handle zero pieces, with an ε-arrow into the old start. From old accepting states, add ε-arrows back to the old start so another piece may begin. Keep the old accepting states accepting too: you may finish after a complete positive number of pieces.

## Follow one stable example

Use A={01} throughout this example. Its NFA has S→T on 0 and T→U on 1, with S starting and U accepting. Other symbol moves are absent. For A*, add accepting start Z, Z→S on ε, and U→S on ε.

The input `0101` has a successful run:

```text
Z --ε--> S --0--> T --1--> U --ε--> S --0--> T --1--> U
```

All four symbols are consumed and U accepts. The empty string accepts at Z. Input `001` fails: after its first zero the candidate is at T, which has no zero move. “Repeat pieces” does not mean you may repeat arbitrary fragments of a piece. `001` cannot be cut into complete `01` blocks.

## Why the extra start matters

The slides' pages 13–14 warn against simply making the old start accepting. A different original machine might return to its start after a nonempty string that it previously rejected. Changing that state's status would newly accept the string, even if it is not a concatenation of valid old pieces.

Here is a separate counterexample, with its changed target stated explicitly: an NFA for 0*1 has old start S looping on 0, then S→T on 1, with T accepting. Making S accepting would accept `0`. But (0*1)* contains no nonempty all-zero string, since every nonempty piece ends in 1. A fresh accepting start avoids that bug. It provides exactly the zero-piece option without changing the meaning of visits to old S.

## Read the case definition as “whose state is this?”

The piecewise δ table preserves an old state's old moves except at the handoff points. Set union adds the new ε destination without deleting existing ε destinations. The fresh start has no ordinary input moves; its ε moves enter components. Q is the combined state set; F separately specifies where a completed input may accept. Rename overlapping component state labels first so they really are distinct states.

A correctness argument cuts an accepting run at the handoffs to recover valid pieces. In reverse, join accepting runs for valid pieces using those handoffs. That's why the construction recognizes **exactly** the combined language.

**Next connection:** regular expressions describe these same three operations as formulas. **Connected check:** for concatenation, explain what would go wrong if first-component accepting states remained accepting even when the second language does not contain ε.
