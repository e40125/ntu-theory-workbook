# Nondeterministic TMs: a tree of possible complete computations

## What branches now?

An NTM can have several legal actions for the same state and scanned symbol. Each action creates a possible next **configuration**: state, tape contents, and head position. As choices accumulate, the computation forms a tree. Branches are alternative histories, not multiple heads sharing one mutable tape.

A string accepts if at least one branch reaches accept after finitely many steps. A rejecting branch alone doesn't settle the input. A branch that loops also doesn't accept. The whole existential claim is: is there a finite successful computation somewhere in the tree?

A branch gets its own whole notebook, not just a different mood in the same state. One branch can overwrite a cell while another keeps it unchanged. Acceptance asks whether any legal branch succeeds. There is no probability threshold, and we cannot steal a useful tape mark from a different branch.

## Round 1 — Each branch gets its own whole machine configuration · pages 1–2

An NTM transition returns a set of triples `(state, write symbol, direction)`. Starting from the same state and scanned symbol, different branches may write different data and move in different directions. Each branch therefore needs its own state, tape contents and head position. You cannot merge branches just because their state names match.

Acceptance is existential: if one finite branch reaches q_accept, the input is accepted. Another branch rejecting or running forever does not cancel that success. If no branch accepts, the recognizer does not accept; a simulation may reject after exhausting a finite tree or continue forever when the search remains infinite.

This is mathematical branching, not a probabilistic choice with a success percentage. The definition asks whether an accepting branch exists. How to systematically simulate that existence on a deterministic machine is the next deck's problem.

## Round 2 — Guess a place where aab starts · pages 3–5

The NTM scans right over a and b. Whenever it sees a, it may continue scanning or guess that this is the first a of an aab occurrence. The checking branch then demands another a and then b. On success it immediately accepts, even if more input remains, because finding that substring already proves the language condition.

For `baaba`, a branch guesses the second position, checks a then b, and accepts. A wrong guess later may reject; irrelevant. For `ababa`, every attempted aab check fails, and the continuing scan eventually reaches blank and rejects. All branches in this simple example move right through finite input and halt.

Notice a model difference: an NFA must consume the entire input to accept, so its substring-finding accept state needs loops for the remaining suffix. A TM may halt as soon as the fact “contains aab” has been established. The target language is the same; the acceptance mechanisms differ.

## Round 3 — A witness is a proposed explanation we can check · pages 6–7

The unary compositeness language contains 0ⁿ when n is composite. Composite means n=pq with integers p,q≥2; allowing 1 as a factor would falsely call every positive number composite. Lengths 0 and 1 are not composite, and primes have no permitted factor pair.

The NTM guesses candidate p and q, then checks the multiplication relation using finite tape routines. To make every branch halt, bound the guesses by the input length n. One implementation nondeterministically decides when to stop constructing a candidate, but rejects if the candidate exceeds n. Merely saying “stop at any time” without a bound could introduce an infinite never-stop branch.

For n=6, a branch choosing p=2,q=3 succeeds. A branch choosing 2 and 2 fails. For n=5, every bounded candidate fails. A deterministic machine could enumerate the same finite candidate pairs sequentially; nondeterminism does not make an undecidable problem decidable here.

The slide asks why sequentially trying every pair sounds deterministic. Because it is. The nondeterministic description instead branches over possible witnesses and verifies each branch's candidate. These two descriptions can recognize the same language while distributing the search differently. Later complexity theory distinguishes the length of one branch from the cost of exploring the entire tree.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## A pattern example makes the guessing concrete

To recognize strings containing `aab`, one branch can keep scanning while another guesses “the occurrence starts here.” The checking branch then demands `a`, `a`, `b` in sequence. A wrong guess fails locally; a correct occurrence supplies a successful branch. This is the NFA idea with TM configurations behind it.

The word “guess” is mathematical shorthand for allowing all permitted choices as branches. It is not a probability claim and not a promise that a real computer luckily picks the right one.

## A more useful guess: a factorization witness

For unary compositeness, input `0ⁿ` represents the integer n. Guess integers p and q with 2≤p,q≤n−1, then verify pq=n. For n=6, the branch choosing p=2,q=3 succeeds. Guesses such as 2 and 2 fail their multiplication check. For a prime input, no legal pair succeeds.

The range bound matters. If the machine generates arbitrarily long guesses with no stopping bound, some branches may guess forever. For an NTM **decider**, every branch must halt. Bounding the guesses and using terminating arithmetic checks gives that guarantee. Acceptance can be existential while termination is required branch by branch.

## Why tracing just the states is especially wrong here

Two branches may reach the same control state with different guessed factors on tape. Their later verification differs. You cannot merge them merely because both circles are named q. An NFA's finite state-set method does not directly apply to TMs: tape configurations can be arbitrarily large and there can be infinitely many of them.

A trace tree should show enough of each configuration to distinguish the guesses or edits. When proving correctness, identify what an accepting branch certifies: here, two nontrivial integer factors whose product is exactly the input number.

## The obvious simulation idea has a trap

A deterministic simulator might try the first branch to completion, then the second. But the first can loop forever while the second accepts in ten steps. Waiting for completion would miss an available yes-answer. We need a fair schedule that never lets one infinite branch hog all the attention. That's why the next deck uses breadth-first exploration.

**Keep:** nondeterminism means existence of a successful branch; a branch carries a full configuration; a decider must halt on every branch.

**One connected check:** If one branch rejects, one loops, and one accepts after twenty steps, what determines the NTM's acceptance—and why would depth-first simulation be dangerous?
