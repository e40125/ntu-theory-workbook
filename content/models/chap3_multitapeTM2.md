# One tape simulates many: encode the whole situation, then update it

## The job: replace convenient hardware with an encoding

A multitape machine has k tapes and k head positions. A single tape can store their finite used contents as separated blocks, for example `#block₁#block₂#…#blockₖ#`. Use a marked version of a symbol to indicate each simulated head's position. The delimiter and marked symbols are extra members of the simulator's finite tape alphabet.

The representation must retain **both** the data and the head locations. Merely joining the tape contents loses which cell each simulated head reads next. That's the same lesson as configurations: an encoding has to preserve everything needed to determine the next step.

Put pictures of several notebooks into one long file, with separators between them. Mark one virtual cursor in each picture. The real head scans that file and updates the pictures. That is the simulation: several imagined heads represented by data, maintained by one actual moving head.

## Round 1 — One tape holds a serialized picture of all the tapes · pages 1–3

Imagine putting several short documents into one file separated by dividers. A delimiter # separates virtual tape regions. A dotted version of a symbol marks each virtual head. The encoding in the slide stores three tape contents in sequence, with exactly one head mark per region.

A dotted 0 is a distinct tape symbol whose meaning is “this cell contains 0 and its virtual head is here.” It does not change the simulated data value to some mysterious number. If the original alphabet is finite, adding one marked copy of each symbol and finitely many separators still gives a finite alphabet.

The simulator has one physical head. The other head positions are **data** recorded on its tape. This distinction is the entire trick: it represents the multitape configuration rather than physically possessing those extra heads.

## Round 2 — One virtual step takes several physical sweeps · page 4

First scan the encoding to collect the symbols under the k marked heads. Since k and Γ are fixed for this machine, there are only finitely many possible scanned-symbol tuples; the finite control can remember which tuple it saw. Apply the simulated transition rule to determine the new state, writes and directions.

Then sweep through the regions to rewrite the marked cells and move each marker one position. Preserve separators and all untouched simulated cells. The simulator may use intermediate marker types to distinguish old and updated head positions, so it does not accidentally perform the same virtual update twice.

If a virtual head moves beyond the represented right end, extend that region with a blank cell. That may require shifting later regions right. The original tape is infinite, so extra physical space exists; the simulation still performs a finite number of operations for this one step.

## Round 3 — How can finite control move an arbitrarily long suffix? · page 5

The control need not remember the whole suffix. It carries just one displaced symbol at a time. To open a cell, replace its current symbol with the desired new one and remember the displaced symbol in the state. Move right, write the carried symbol, remember what was displaced there, and repeat. When the end of the finite represented region is reached, write the final carried symbol into spare space.

For the slide's binary shifting illustration, states q₀ and q₁ mean “carrying 0” and “carrying 1.” For a larger finite alphabet, use one carrying state per symbol, including separators and head-marked symbols. The carrying state stores a symbol value, not an unbounded string. That is why the construction remains a finite-state controller.

A delimiter marks region structure; a blank can be legitimate simulated tape content. A robust full encoding keeps track of the represented region's end so shifting does not confuse an internal simulated blank with the end of all data.

## Round 4 — What the simulation proof must preserve

After each completed simulated step, the encoding must describe exactly the original machine's state, every represented tape symbol and every virtual head position. Initially we can construct the encoding from the input and blank auxiliary tapes. Each sweep implements the corresponding old transition, so induction preserves the representation.

If the multitape machine accepts or rejects, the simulator eventually reaches that corresponding halting state. If it runs forever, the simulator keeps producing faithful steps. For a decider, every source computation is finite and every simulated step uses finitely many physical moves, so the simulator also halts. None of this says one virtual step costs one physical step; complexity analysis later counts that overhead.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
