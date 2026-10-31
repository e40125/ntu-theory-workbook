# PDA branching: one stack per candidate explanation

## The problem: the input may not announce the right plan

Consider \(\{a^ib^jc^k:i,j,k\ge0,\ i=j\text{ or }i=k\}\). Read it carefully: there are three blocks in order, and **either** the a-count matches the b-count **or** it matches the c-count. Both equalities may hold, but both are not required.

A nondeterministic PDA can branch into two plans. Both store the a-count on the stack. One matches it against b's, then scans c's. The other scans b's without spending the stored markers, then matches against c's. Each branch has its own stack history. There is no shared pile that the first branch can damage for the second.

Two branches can stand in the same state with different stacks. Same room, different backpacks. If you merge them by room number, you lose the exact obligations they carry, and your trace starts accepting nonsense. Keep the state, unread input and ordered stack together as one whole situation.

## Round 1 — OR means one full check can succeed · pages 1–5

The language {aⁱbʲcᵏ:i=j or i=k} requires block order a's, then b's, then c's. The equality is an OR, so either equality suffices; both may hold. The PDA stores one a marker per leading a and nondeterministically chooses which equality to verify.

In the upper branch it pops an a for each b, demands all a markers be exhausted, then reads any c suffix. In the lower branch it reads b's without changing the stored a count, then pops an a per c. States enforce block order in both branches. Arbitrarily matching any later symbols would solve a different language.

The slide's a²bc² is `aabcc`: i=2,j=1,k=2. The upper branch matches its one b against one a and still owes one a match; it cannot complete the i=j check. The lower branch keeps two a markers while reading b, then pops one for each c and reaches acceptance. One failed branch and one successful branch means accept.

A PDA's branch identity must include the **entire stack** as well as the state and input position. Two branches at q with stacks `a$` and `aa$` are not equivalent. Merging them into just `{q}` loses the count that future input needs. This is why the finite-state subset trick does not directly turn every PDA into a DPDA: the number of possible stacks is unbounded.

The ε moves choose phases without consuming symbols. A branch may guess too early or too late and die. Wrong guesses are permitted; a successful path still has to consume the whole input and meet the actual stack requirements.

## Round 2 — Reverse comes from stack order · pages 6–7

wᴿ means the symbols of w in reverse order. For w=`01`, wᴿ=`10`, so wwᴿ=`0110`. For w=`001`, wwᴿ=`001100`. This language contains even-length palindromes, including ε; it does not include odd-length `010` in this particular construction.

Push each first-half symbol, then guess the midpoint using an ε move. After the switch, read each input symbol only if it matches the top and pop it. If the first half was 01, the stack top-to-bottom is 10$: the reversal is already supplied by last-in-first-out storage. You do not separately reverse the input.

Trace the successful branch of `0110`: install $, push 0 giving 0$, push 1 giving 10$, switch without input, read 1 and pop 1, read 0 and pop 0, remove $, finish in accept with no unread input. A branch switching after the first 0 tries to match the next 1 against top 0 and dies. A branch never switching cannot finish the required matching phase.

## Round 3 — Why a delimiter changes the design problem

With a promised midpoint marker, such as language {w#wᴿ}, the input itself tells the machine when to switch from pushing to popping. Without it, this NFA-style PDA guesses. This comparison explains what nondeterminism contributes; it is not by itself a proof that no deterministic PDA can recognize the unmarked language. Claims about all possible machines need a separate impossibility argument.

Both examples combine finite phase memory with unbounded structured memory. The stack handles the obligation; the state says what kind of work is currently legal. Keeping those roles separate makes the arrows far less arbitrary.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
