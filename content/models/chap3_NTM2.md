# Fair simulation: don't let one endless branch hide a short success

## The problem is scheduling, not lucky guessing

To simulate an NTM deterministically, we must eventually inspect every finite candidate computation. A depth-first strategy can get trapped following an infinite branch. Breadth-first search explores all branches to depth 0, then 1, then 2, and so on. A successful branch of depth d is eventually inspected because only finitely many nodes occur at each earlier depth.

The finite branching condition matters: the transition table supplies finitely many choices per step. Without it, “finish this level before the next” might itself require infinite work.

One branch can wander forever while a successful branch sits two steps away. A simulator that follows the wanderer forever is doing a lousy search. Breadth-first exploration shares attention by depth. Every finite successful path eventually gets its turn. That fairness is the mechanism, not an optional implementation flourish.

## Round 1 — Don't let one infinite branch hog the whole damn search · pages 1–3

Depth-first search follows one branch deeply before returning to alternatives. If that branch loops forever, the simulator never visits a short accepting branch next door. Therefore a naive depth-first simulation is not a correct recognizer for an arbitrary NTM.

Breadth-first search examines depth 0, then depth 1, then depth 2, and so on. Every finite accepting computation lies at some finite depth, so it will eventually be reached. This property is **fairness**: no finite branch prefix is permanently starved by another branch's endless work.

The maximum branching factor b is finite because the NTM has finitely many states and tape symbols, each transition offering finitely many choices. The number of nodes at each fixed depth is finite even though the whole tree may be infinite. That lets each breadth-first layer finish.

## Round 2 — The three tapes have three distinct jobs · pages 4–7

Tape 1 preserves the original input. Tape 2 holds a fresh simulation of one branch. Tape 3 holds its **address**, a finite sequence of branch-choice indices. Address `231` means take child 2, then child 3, then child 1; it is not input data or a tape location.

Enumerate addresses in increasing length: empty address, 1,2,…,b, then 11,12,…,bb, and so on. For each address, reset tape 2 from the original input and follow at most that many choices. If an indicated child does not exist, discard the invalid address. If an accepting state appears, accept immediately. Resetting prevents mutations from one simulated branch contaminating the next.

An infinite branch cannot trap this procedure because each candidate address has finite length. The simulator examines a finite prefix and moves on. If no branch accepts and the tree is infinite, continuing forever is allowed for a recognizer. The construction promises discovery of every finite accepting branch, not a decision about absent acceptance in all cases.

A three-tape deterministic TM can perform these operations; the prior multitape theorem then converts it to one tape. Combining simulations is valid because each component has an explicit finite encoding and transition procedure.

## Round 3 — “Every branch halts” needs one more argument · pages 8–9

An NTM **decider** halts on every branch for every input. To conclude that a deterministic breadth-first simulation halts too, we need its computation tree for each fixed input to be finite.

Here is the missing bridge. If a finitely branching rooted tree had infinitely many nodes, at least one child of the root would have infinitely many descendants; finitely many finite descendant sets cannot cover an infinite set. Choose such a child, then repeat the same argument below it. This constructs an infinite branch. Therefore, if no infinite branch exists and branching is finite, the tree must be finite. This is the relevant form of König's lemma.

The simulator should track the live frontier and reject when it becomes empty, after finding no acceptance. Blindly enumerating every imaginable address forever would not by itself detect that the real tree ended. Breadth-first frontier exhaustion supplies the terminating rejection procedure.

Thus deterministic and nondeterministic machines decide the same languages as well as recognize the same languages. The statement is about solvability. Exploring exponentially many branches may be far slower than following one branch, which is exactly why nondeterministic time becomes a separate topic later.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
