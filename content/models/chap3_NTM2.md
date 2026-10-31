# Fair simulation: don't let one endless branch hide a short success

## The problem is scheduling, not lucky guessing

To simulate an NTM deterministically, we must eventually inspect every finite candidate computation. A depth-first strategy can get trapped following an infinite branch. Breadth-first search explores all branches to depth 0, then 1, then 2, and so on. A successful branch of depth d is eventually inspected because only finitely many nodes occur at each earlier depth.

The finite branching condition matters: the transition table supplies finitely many choices per step. Without it, “finish this level before the next” might itself require infinite work.

## How the three-tape simulation organizes the work

One tape preserves the original input. Another simulates a candidate branch's working tape. A third records an address: a finite sequence of transition-choice numbers. If at most three choices are available, addresses begin 1,2,3,11,12,13,21,… in length order.

To inspect address 213, reset the work tape to the input, choose option 2 on the first step, option 1 on the second, and option 3 on the third. If a requested option doesn't exist, discard that candidate. If accept is reached along the replay, accept. Then move on to the next address. No single replay is allowed to run past the address's finite length.

These addresses describe **choices**, not tape cell positions. Replaying from the original input prevents edits from one branch contaminating another.

## Why every accepting branch is eventually found

Suppose the NTM accepts in d steps along choices c₁…c_d. There are finitely many shorter addresses and finitely many addresses of length d before that one. Each replay takes finitely many steps. Eventually the simulator replays the successful sequence and accepts.

If the NTM never accepts, the simulator never invents acceptance: every replay uses actual legal transitions. It may search forever. That is acceptable when simulating a recognizer, whose no-instances need not halt.

## What changes for a decider?

If every NTM branch halts on a fixed input, and branching is finite, the whole computation tree is finite. The reason is subtler than “each branch is finite, so there are finitely many branches.” If a finitely branching tree had nodes at arbitrarily large depths, one child of the root would have arbitrarily deep descendants; then one child of that child would too; continuing would construct an infinite branch. That contradicts the all-branches-halt assumption.

A breadth-first simulator can therefore maintain the live frontier and reject when no live configuration remains and none accepted. It must actually detect exhaustion; endlessly enumerating meaningless longer addresses without checking completion would not itself be a decider.

## What the theorem does and doesn't establish

Deterministic and nondeterministic TMs recognize the same languages and decide the same languages. This is about eventual answerability. The deterministic search may explore exponentially many branches before finding a witness. The later complexity decks ask whether this cost can always be avoided efficiently—an entirely different question.

**Keep:** bounded-depth replay gives every finite branch a turn. Fairness preserves recognition; finite-tree exhaustion supplies rejection for deciders.

**One connected check:** Why does replaying only a finite prefix of each branch avoid the failure of depth-first search?
