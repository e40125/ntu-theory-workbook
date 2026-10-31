# Nondeterministic TMs: a tree of possible complete computations

## What branches now?

An NTM can have several legal actions for the same state and scanned symbol. Each action creates a possible next **configuration**: state, tape contents, and head position. As choices accumulate, the computation forms a tree. Branches are alternative histories, not multiple heads sharing one mutable tape.

A string accepts if at least one branch reaches accept after finitely many steps. A rejecting branch alone doesn't settle the input. A branch that loops also doesn't accept. The whole existential claim is: is there a finite successful computation somewhere in the tree?

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
