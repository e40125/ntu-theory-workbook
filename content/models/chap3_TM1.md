# Turing machines: a finite program with a rewritable workspace

## What changes when the stack isn't enough?

A PDA can only inspect the top of its stack. A Turing machine, or TM, has a tape and a head that moves left or right. It can read a cell, overwrite it, move, and come back later. The finite state still stores the current phase of the program; the tape stores the growing work.

The tape has no fixed upper bound on usable cells. That does not mean infinitely many cells are processed in one move. At every finite point in a computation, only finitely much work has happened. “Unbounded workspace” and “infinite work for free” are completely different claims.

Now the machine gets a writable notebook. It can mark something, walk away, and come back to read the mark. That is a huge change from a stack that only exposes its top. But there is no teleporting: the head still moves cell by cell, and every mark needs a stated meaning.

## Round 1 — The tape is a workspace you can revisit · pages 1–2

Finite automata retain a bounded state summary. A PDA adds an unbounded stack but only exposes its top. A Turing machine adds a tape whose cells can be read, overwritten and revisited by moving left or right. That's the new power: the machine can leave marks and come back to them later.

“Unrestricted memory” on the slide concerns access compared with a stack. A TM still has strict local mechanics: one head reads one cell, one transition writes one symbol and moves one cell. It cannot teleport to an arbitrary address or inspect infinitely many cells at once. The tape is unbounded in the model; each finite computation visits only finitely many cells.

Unlike DFA/PDA acceptance after the full input has been processed, entering q_accept or q_reject halts a TM immediately. A correctly designed TM must inspect what the language requires before choosing either state. The model does not force it to scan every original input cell first.

## Round 2 — Same order is why this job needs revisiting · pages 3–4

The language {w#w:w∈{0,1}*} asks for two identical strings in the same order. For w=01, the accepted input is `01#01`, not `01#10`. A simple push-first-half/pop-second-half strategy naturally compares reverse order, which is the wrong job here.

The TM marks the next unmatched symbol on the left, remembers whether it was 0 or 1 in its finite state, crosses #, finds the next unmatched symbol on the right, compares and marks it, then returns left. Each round matches the corresponding position. Marks x mean “already handled,” not an extra input symbol supplied by the user.

Before accepting, check exactly one separator, legal input symbols, no unmatched left symbols and no extra unmatched right symbols. `#` accepts because w=ε is permitted. `0#` and `#0` reject because lengths differ. `01#00` rejects at the second comparison. These cases explain why merely finding one matching pair is insufficient.

## Round 3 — Every field of the formal machine · pages 5–8

The seven-tuple is (Q,Σ,Γ,δ,q₀,q_accept,q_reject). Γ is the tape alphabet, containing the input alphabet Σ plus blank and any work markers. Blank ⊔ is not an input symbol; it fills cells beyond the input. There is one designated accepting state and a distinct rejecting state.

\[\delta(q,a)=(r,b,L)\]

means: while in state q scanning tape symbol a, overwrite that cell with b, enter state r, and move the head left. The output is a triple. L and R are directions, not symbols written on the tape. The state is held by the control; it is not itself a tape character.

Initially w₁…wₙ occupies cells 1 through n; all later cells are blank; the head scans cell 1. For ε, cell 1 is already blank. This course uses a left-bounded tape: attempting to move left from cell 1 leaves the head there. That boundary convention matters when replacing stay-put moves later.

The displayed transition type includes Q broadly, but accepting/rejecting states have no further executed transitions because halting takes immediate effect. Many formal definitions write the domain with those halting states removed. Both descriptions encode the same intended mechanics when the halting convention is stated.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## One transition does three specific things

\(\delta(q,a)=(r,b,R)\) means: in state q reading tape symbol a, write b in this cell, move the head one cell right, and enter r. With L, move left instead. At the tape's left boundary, the course model keeps the head there when it attempts to move farther left.

A blank is an actual tape symbol. ε is a zero-length string or no-consumption notation in other models. A blank cell is not “no cell,” and writing a blank is a real write operation. Tape symbols may include marks such as x that never appear in the original input alphabet.

## Build the slide's matching idea: `w#w`

The separator `#` tells us where the first copy ends. On input `01#01`, mark the first unprocessed left symbol, remember whether it was `0` or `1` in the finite control, cross the separator, and compare it with the first unprocessed right symbol. Mark that symbol too. Return to the left portion and repeat.

After the first round, marks stand where the two zeros were. After the second, both ones are marked too. Finally verify that no extra unmatched symbol remains on the right. Accept only then.

For `01#00`, the second comparison fails. For `01#010`, the first two comparisons succeed but the final leftover check fails. For malformed input with a missing or extra separator, the machine must reject through its format checks. Matching the examples isn't enough; each clause of the language needs a reason in the program.

## What belongs in the seven-part definition?

\((Q,\Sigma,\Gamma,\delta,q_0,q_{accept},q_{reject})\): states; input alphabet; tape alphabet; transition rule; start; accepting halt state; rejecting halt state. Γ includes the blank and all input symbols. Σ excludes the blank. The accepting and rejecting states are distinct and halt immediately when entered.

This differs from a finite automaton or PDA: visiting their accepting state does not necessarily end the run, and acceptance is evaluated after the input is consumed. A TM's program must arrange its checks **before** entering accept.

## The proof has two separate jobs

Correctness says successful comparisons and the final leftover check establish exactly two equal blocks. Halting says the procedure finishes: each round marks another left input symbol; each sweep crosses a finite occupied region; there are only finitely many unmarked left symbols. A convincing trace of `01#01` proves neither claim for every input, but it makes the invariant visible.

**Keep:** state = program phase; tape = editable memory; head = current location. Next we use repeated marking to test a numerical pattern in the input length.

**One connected check:** Why must the `w#w` machine check for extra right-side symbols after all left-side symbols have been matched?
