# Configurations: a complete snapshot, then a precise claim about termination

## A state name alone no longer describes the situation

For a DFA with fixed input position, the state was enough memory. For a TM, two visits to q can have different tape contents and head positions. A **configuration** must record all three: control state, tape, and head location. Otherwise a trace can silently lose the information that determines the next move.

The notation \(u q v\) writes the tape prefix u to the left of the head, inserts state q at the head position, and writes the scanned symbol as the first symbol of v. q is not a tape symbol; it is an annotation in the snapshot.

## Decode one transition completely

Suppose a configuration is `a q bc`: the tape contains `abc`, the head reads `b`, and the state is q. If δ(q,b)=(r,x,R), the new configuration is `ax r c`. The b was overwritten by x; the head moved to c; the state became r.

If instead δ(q,b)=(r,x,L), the result is `r axc`: the head now reads the a to the left. The entire tape is still `axc`; only the placement of the state annotation differs. At the left boundary there is no earlier cell to move into, so that case follows the boundary rule separately.

This is why copying only the state sequence is not a full TM trace. You need the tape edits and head movement too.

## Three possible outcomes, not two

A TM may accept, reject, or keep running forever. A **recognizer** for L must accept every member and must never accept a nonmember. On a nonmember it may reject or loop. A **decider** must halt on every input, accepting members and rejecting nonmembers.

Every decider is a recognizer. Calling a recognizer “an algorithm that answers yes or no” overstates its guarantee: on some no-instances it may never answer. You cannot turn it into a decider by getting impatient after a million steps; a genuine accepting run might take a million and one.

## Read the deck's constructions as phase programs

The `w#w` machine alternates marking, crossing, comparing, and returning. Its return states need different jobs on the two sides of `#`; reaching a marked symbol on the right is not the same as reaching the last processed symbol on the left. State meanings explain why several apparently similar left-moving states exist.

The slide language is \(a^ib^jc^k\) with ij=k and **i,j,k≥1**: all three blocks must be nonempty. Check that format first, then use repeated matching: for each a, traverse the b-block and account for j c-symbols. Restore temporary b-marks before the next a, while keeping track of c-symbols already spent. The a-count controls the number of repetitions, and the b-count controls each repetition's cost. A final check rejects unused or insufficient c's. The slide's positivity condition rejects zero-size blocks at the format check. A variation allowing zero would need different boundary handling; don't silently change the supplied language.

## Reuse the comparison routine on a whole list

Pages 13–14 ask that the binary blocks in `#x₁#x₂…#xₗ` all differ. Compare **every pair**, not only neighbors. For `#0#1#0`, the first and second differ, and the second and third differ, but the first and third are equal. Mark the two selected separators, copy or compare their blocks using the earlier matching routine, then advance to the next pair. With l blocks there are l(l−1)/2 pairs, so a systematic finite pair schedule terminates. The subscripts identify positions in the list, not bits inside one block.

## A high-level solution still owes a proof

For any construction, state the invariant tying the marks to completed work. Then show why acceptance implies the required relation and why a valid input can complete the procedure. Finally show termination using finite scans and a finite number of progressing rounds. “It keeps trying until it works” is not a halting argument.

**Keep:** a configuration is a snapshot; a recognizer may loop on nonmembers; a decider always finishes. Next, multiple tapes make programs easier to organize without changing which languages are computable.

**One connected check:** Why does a repeated control state fail to prove a TM is looping, while a repeated complete configuration of a deterministic TM does prove it?
