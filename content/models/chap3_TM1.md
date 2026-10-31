# Turing machines: a finite program with a rewritable workspace

## What changes when the stack isn't enough?

A PDA can only inspect the top of its stack. A Turing machine, or TM, has a tape and a head that moves left or right. It can read a cell, overwrite it, move, and come back later. The finite state still stores the current phase of the program; the tape stores the growing work.

The tape has no fixed upper bound on usable cells. That does not mean infinitely many cells are processed in one move. At every finite point in a computation, only finitely much work has happened. “Unbounded workspace” and “infinite work for free” are completely different claims.

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
