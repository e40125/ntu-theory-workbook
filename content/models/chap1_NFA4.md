# NFA 4 — Use free handoffs to assemble whole-language machines

## The whole idea

Union, concatenation and star are instructions about **whole accepted pieces**. We want machine wiring that respects those instructions. ε-arrows let us hand control from one component to another without secretly adding an extra character. That is their job here. They are not decorative buffers.

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
