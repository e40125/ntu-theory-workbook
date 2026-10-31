# One tape simulates many: encode the whole situation, then update it

## The job: replace convenient hardware with an encoding

A multitape machine has k tapes and k head positions. A single tape can store their finite used contents as separated blocks, for example `#block₁#block₂#…#blockₖ#`. Use a marked version of a symbol to indicate each simulated head's position. The delimiter and marked symbols are extra members of the simulator's finite tape alphabet.

The representation must retain **both** the data and the head locations. Merely joining the tape contents loses which cell each simulated head reads next. That's the same lesson as configurations: an encoding has to preserve everything needed to determine the next step.

## Simulate one joint step in phases

First sweep across the encoded blocks and read each marked symbol. Remember the k-symbol tuple in the simulator's finite control. This is possible because k and the simulated tape alphabet are fixed for this machine, so there are only finitely many possible tuples.

Use the simulated transition function to determine the new state, writes, and movements. Make another sweep to update each marked cell and move the head marker to its neighbor. Different blocks may move their heads in different directions, but all updates come from the same old snapshot.

For example, if the simulated heads read `(0,1)` and the rule writes `(x,0)` with movements `(R,L)`, the simulator must find those two marked cells, replace their contents, and move the two markers appropriately. It must not let the new x influence the choice of the second write.

## What if a simulated tape needs more room?

If a head moves past its block's currently represented end, insert a blank cell into that block. Shift later encoded cells right to make space. A finite-control carry can move symbols one by one; this is tedious but implementable. The block remains a faithful representation of a tape with additional blank cells available.

The simulation is allowed to use many real steps for one simulated step. Computability asks whether the same answers can be produced at all, not whether the hardware has identical speed.

## The invariant is the proof

At the beginning of each simulated step, the single-tape encoding represents exactly the multitape machine's complete configuration. Initialization establishes this. Reading the stored head tuple and applying the same transition preserves it. Therefore each finite accepting or rejecting computation is reproduced, and an endless simulated computation continues rather than being falsely turned into a halt.

Conversely, a multitape machine can ignore extra tapes and behave like a one-tape machine. The two simulations establish equal recognition and decision power.

## Why this matters later

We can design algorithms using convenient multiple tapes, then know a standard TM can implement them. In complexity theory we revisit this exact construction and count its cost: scanning and shifting a growing representation can turn t simulated steps into roughly quadratic work. Same computability is compatible with different efficiency.

**Keep:** encode complete configurations; preserve them one simulated step at a time. The proof is an invariant plus a way to implement each update.

**One connected check:** What information would be lost if the encoding included tape contents and separators but no marked head positions?
