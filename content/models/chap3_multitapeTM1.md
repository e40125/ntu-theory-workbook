# Multiple tapes: give each part of the job its own workspace

## The mental model: several work surfaces, one finite controller

A multitape TM has several tapes, each with its own head. It can keep the input on one tape and scratch work on another. This can make a program much easier to describe. It does not mean separate independent machines are voting on an answer: one control state selects a joint transition from the symbols currently under **all** heads.

For k tapes, a transition reads a k-tuple of symbols and returns a new state, k replacement symbols, and k movement choices. A tuple is ordered. The first entry belongs to tape 1, the second to tape 2, and so on. Swapping the entries can change the computation.

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
