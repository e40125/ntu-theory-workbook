# Multiple tapes: give each part of the job its own workspace

## The mental model: several work surfaces, one finite controller

A multitape TM has several tapes, each with its own head. It can keep the input on one tape and scratch work on another. This can make a program much easier to describe. It does not mean separate independent machines are voting on an answer: one control state selects a joint transition from the symbols currently under **all** heads.

For k tapes, a transition reads a k-tuple of symbols and returns a new state, k replacement symbols, and k movement choices. A tuple is ordered. The first entry belongs to tape 1, the second to tape 2, and so on. Swapping the entries can change the computation.

Give the worker a second notebook and copying becomes a lot less annoying. That convenience can save movement, but it does not automatically mean new problems become solvable. The claim is that one tape can simulate the extra notebooks. First understand the convenient algorithm; then we price and build its simulation.

## Round 1 — More convenient machinery need not recognize more languages · pages 1–3

**Equivalent computational power** means the same languages can be recognized or decided. It does not mean equal speed, equal number of states or equally pleasant diagrams. A multitape machine is a convenient workbench; a later simulation shows one tape can do its work with extra bookkeeping.

A stay-put instruction writes a symbol but leaves the head in place. To simulate it using only L/R, write and move right into a fresh helper state, then preserve whichever symbol is there and move left into the intended destination state. Right then left works even at the tape's left boundary. Left then right would fail there because the first left move gets clamped in place.

For k tapes, δ receives the current state and k scanned symbols. It returns one next state, k symbols to write and k head directions. Γᵏ means an ordered k-tuple of tape symbols; {L,S,R}ᵏ means one direction choice per tape. The transition reads the old scanned symbols together, then performs the indicated updates. It does not read tape 2 only after already modifying tape 1.

## Round 2 — This example produces output as well as accepting · pages 4–7

The input promise is w=0^(2n) with n≥1: a positive even number of zeros. The job is to produce ww on tape 1, doubling the input string. This is not the power-of-two language from the previous one-tape example. `000000` is permitted here because its length six is even.

The machine reserves a blank boundary on tape 2, copies the input zeros there, returns the second head toward the beginning while checking parity, and then copies the stored zeros onto the end of tape 1. Tape 1 retains the original half; tape 2 preserves a copy of what must be appended.

The parity check occurs during the return phase q₂↔q₃. The first head zigzags near tape 1's right end while the second head moves left across the copied zeros. Reaching tape 2's boundary in the required state confirms evenness. q₄ then appends the copy. Changing which phase checks parity would describe a different implementation, even if it could solve the same abstract job.

## Round 3 — Trace the resources, not just a list of state names · pages 8–9

For input `0000`, tape 2 eventually holds its reserved blank followed by four zeros. The return scan confirms even length, and the append phase produces eight zeros on tape 1. For `000`, the parity phase reaches the boundary in the wrong state, so reject instead of treating a six-zero output as successful completion.

Empty input and a single zero reject under n≥1. The output requirement alone is insufficient: a machine that doubles every unary input would fail the specified domain check. Formal construction questions often bundle **validation** and **transformation**; state both obligations before drawing arrows.

The transition table must also cover unexpected scanned-symbol combinations. With two tapes, a row indexed by state q can have pairs (0,0),(0,⊔),(⊔,0),(⊔,⊔), plus any additional tape symbols. The slide sends unspecified cases to rejection. One two-tape arrow label represents both tape actions together, not two nondeterministic choices.

The proof separates three invariants: copy phase preserves a faithful second copy; return phase correctly tracks parity; append phase transfers exactly that copy once. Each sweep traverses a finite region and each phase advances toward completion. That's how the polished final tape earns the claim that the algorithm actually worked.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## One step uses one shared snapshot

Suppose two heads currently read `(0, blank)`. A transition may write `(x,0)` and move `(R,R)`. Both decisions are based on the original pair. Do not write x on tape 1 and then use some half-updated situation to choose tape 2's action. The transition is one joint instruction.

A stay-put movement S is a convenient extension. It can be simulated in a left/right-only model using a right move followed by a left move, with an intermediate state preserving the required control information. The order matters at the left boundary: left then right would not restore the original position there.

## The slide example: even positive unary input

The deck works with input \(0^{2n}\), n≥1, and constructs a machine that doubles it. This is an even-positive-length requirement, not the earlier powers-of-two language \(0^{2^n}\). `000000` meets the input pattern here even though its length is not a power of two.

The machine uses the second tape as stored work, a boundary marker to find the beginning again, and control states to check parity while returning across the stored copy after copying. Once this check verifies the required form, the stored copy can be used in producing the doubled output. For four input zeros, the required result is eight zeros. A correct trace must show where each head sits during copying, resetting, and extending the output, not just write “4 becomes 8.”

The useful separation is: tape contents store the actual block; a small state distinction tracks odd/even position; a marker gives a reliable return point. Each part solves a different bookkeeping problem.

## What an exam trace should record

Write one row per joint step: current state, each tape's contents with its head marked, and the transition used. Preserve unchanged cells. A blank symbol in the read tuple is a condition on that tape's scanned cell; it isn't permission to ignore that tape.

When designing rather than tracing, first assign a purpose to each tape and each phase. Only then translate phases into transitions. Otherwise you end up memorizing a pile of arrows with no way to reconstruct them under exam pressure.

## The next question is about power

Extra workspace organization might look like a stronger model. The next deck shows how one tape can encode all the tapes and head positions, then simulate their joint steps. That establishes equal computability. It does not promise equal running time; organizing work differently can save a lot of movement.

**Keep:** multiple tapes are several ordered workspaces controlled by one joint rule. Snapshot first, simultaneous updates second.

**One connected check:** Why must a simulation remember all the scanned symbols before it starts applying the simulated writes?
