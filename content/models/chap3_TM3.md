# Configurations: a complete snapshot, then a precise claim about termination

## A state name alone no longer describes the situation

For a DFA with fixed input position, the state was enough memory. For a TM, two visits to q can have different tape contents and head positions. A **configuration** must record all three: control state, tape, and head location. Otherwise a trace can silently lose the information that determines the next move.

The notation \(u q v\) writes the tape prefix u to the left of the head, inserts state q at the head position, and writes the scanned symbol as the first symbol of v. q is not a tape symbol; it is an annotation in the snapshot.

A state name alone is like saying “Marcus is checking” without saying what document is open or where he is pointing. A configuration supplies the whole situation: state, tape, head position. Then one transition changes that situation locally. We will unpack the compact notation into those three pieces.

## Round 1 — A configuration is a screenshot of the whole machine · pages 1–5

`uqv` encodes tape contents uv, current state q, and the head scanning the first symbol of v. u and v are strings; q is inserted notation, not stored tape content. If v is empty in an abbreviated display, the head scans the next blank.

For `ua qᵢ bv`, the scanned symbol is b, while a is immediately to its left. If δ(qᵢ,b)=(qⱼ,c,L), write c where b was and move left: `u qⱼ acv`. For a right move, obtain `uac qⱼ v`. Separate the write action from the head movement; doing only one produces the wrong configuration.

A finite sequence of legal configurations from q₀w to an accepting configuration proves that M accepts w. A **recognizer** must eventually accept members, but on nonmembers it may reject or loop. A **decider** must halt on every input, accepting members and rejecting nonmembers. “Hasn't accepted yet” cannot tell you whether a recognizer will reject later or run forever.

## Round 2 — The copy-checker's two leftward phases are different jobs · pages 6–10

For w#w, q₁ selects and marks the next left-half bit. The 0 branch uses q₂ then q₄ to cross the separator and demand a matching right-half 0. The 1 branch uses q₃ then q₅ and demands 1. The state remembers which bit was selected while the head travels.

After marking the right bit, q₆ travels left through the right half toward #. q₇ then travels through the remaining unmarked left bits until finding the marked left prefix, and moves right to the next work position. They cannot be merged: x means “keep going left” in the right half, but “turn around here” at the left prefix boundary. Same scanned symbol, different phase, different action.

For `01#01`, the completed marking rounds are `01#01` → `x1#x1` → `xx#xx`. q₈ verifies there are only x's in the remainder of the right half, then accepts at blank. Missing rejecting edges in the slide diagram are shorthand for rejection, not permission to improvise a transition.

## Round 3 — Multiplication is repeated complete matching · pages 11–12

The source language is {aⁱbʲcᵏ:ij=k, i,j,k≥1}. First check nonempty blocks in that exact order. For each a, traverse all b's and cancel one previously uncancelled c per b. Restore the b markers after that round so the next a can use the full b count again. Mark that a as completed.

For `aabbcccc`, two a-rounds each cancel two c's, totaling four. For `aabbccc`, the second round runs out of c's; reject. For `aabbccccc`, all rounds finish but one c remains; reject. Empty blocks reject because the source specifies positive exponents.

A **subroutine** is a previously explained finite-state/tape procedure used as part of a larger machine, such as returning to a marker or matching a selected symbol. A high-level description is justified when these operations are implementable with the allowed head moves and finite work alphabet. It cannot hide an impossible instruction such as “instantly know whether this computation will ever stop.”

## Round 4 — Pairwise means every different pair, not just neighbors · pages 13–14

The distinct-block language requires xᵢ≠xⱼ whenever i≠j. Adjacent comparisons alone miss duplicates in positions 1 and 3. Mark the two selected separators, compare their following blocks, restore temporary work, and advance through pairs (1,2),(1,3),…,(2,3),… . There are ℓ(ℓ−1)/2 pairs for ℓ blocks.

Blocks may be empty because each xᵢ belongs to {0,1}*. Two empty blocks are duplicates. Their delimiters still identify their positions. The slide suggests copying the selected blocks to spare tape and using a same-order comparison there; preserve the originals or restore them before later comparisons.

Correctness: reject when a checked pair is equal; accept only after every pair was checked and found different. Termination: finitely many pairs, finite-length comparisons, and a pair index that advances. The proof must account for both exhaustive coverage and finite progress.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
