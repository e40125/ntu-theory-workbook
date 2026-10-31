# PDA branching: one stack per candidate explanation

## The problem: the input may not announce the right plan

Consider \(\{a^ib^jc^k:i,j,k\ge0,\ i=j\text{ or }i=k\}\). Read it carefully: there are three blocks in order, and **either** the a-count matches the b-count **or** it matches the c-count. Both equalities may hold, but both are not required.

A nondeterministic PDA can branch into two plans. Both store the a-count on the stack. One matches it against b's, then scans c's. The other scans b's without spending the stored markers, then matches against c's. Each branch has its own stack history. There is no shared pile that the first branch can damage for the second.

## Follow a concrete case

For `aabcc`, the counts are i=2, j=1, k=2. The a=b branch spends one of its two markers on the sole b and still owes a b when c begins, so that branch fails. The a=c branch ignores the b, spends two markers on the two c's, and succeeds at the end of input. Therefore the NFA-style acceptance rule—**at least one complete successful run**—accepts the string.

A single rejecting branch does not reject the whole input. A branch that reaches an accepting state with unread input also does not accept the whole input. Keep the complete condition intact.

## Another missing boundary: the midpoint of a palindrome

For \(\{ww^R:w\in\{0,1\}^*\}\), \(w^R\) means w reversed. The first half must be matched against its reverse, so a stack's last-in-first-out behavior fits perfectly. Push the first half. At a guessed midpoint, switch by ε to popping and comparing.

Trace `0110`. Push `0`, then `1`, giving stack `10$` top-first. Guess the midpoint. Read the next `1` and pop `1`; read the last `0` and pop `0`; finish at `$` with no input left. The successful guess consumed exactly two symbols before switching.

Why not switch after just the first `0`? The next symbol would be `1`, but the stack expects `0`, so that branch dies. Why not push all four symbols? Then no input remains to discharge the four markers. A bad guess failing is fine; a correct complete path is enough.

## What a node in your trace must contain

A PDA configuration needs three pieces: current state, unread input, and **entire stack**. Two branches at the same state with different stacks are not the same configuration. Merging them as if this were NFA subset construction loses information.

A tree is useful: each node is a full configuration; each edge is one allowed transition. A table is useful too, provided each row retains all three fields. The representation is a tool, not the algorithm's definition. For an exam, label enough that a reader can check the pop condition and input consumption at every step.

## Why this connects to grammars

A grammar also chooses among alternatives, some of which cannot generate the desired terminal string. A PDA can store the grammar's pending work and guess which production to use. That's the next deck: not an unrelated trick, but these same branching obligations applied to derivations.

**Keep:** a PDA branch carries its own state, remaining input, and stack. Nondeterminism guesses a plan; acceptance still demands that the whole plan works.

**One connected check:** If two branches have the same state and unread input but stacks `01$` and `10$`, why can't you combine them into one stack set `{0,1,$}`?
