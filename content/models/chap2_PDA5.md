# PDA normalization: make completion safe before converting

## The hidden issue: accepting state does not mean the stack is empty

Our general PDA accepts when a run consumes all input and finishes in an accepting state. It may still have stack contents. But the PDA→CFG construction summarizes balanced empty-to-empty runs. We therefore need an equivalent PDA that finishes with an empty stack at one designated accepting state.

This is a change of representation, not permission to change which strings accept. A cleanup gadget is correct only if it cannot help the original machine do extra input processing that used to be impossible.

## Why “just add pop loops” is broken

Suppose an old accepting state has stack `ba$`, top first, and a future input transition needs to pop `a`. In the original machine that transition is blocked by the top `b`. If we add arbitrary ε-pop loops directly to this state, it can discard `b`, expose `a`, and resume the original transition. We have handed the machine a new way to process unread input. Shit—that changes behavior before completion, not just afterward.

The deck illustrates precisely this danger: cleanup mixed into the old control can accept a string the original PDA rejects. A final-state label is not a magical barrier against later transitions.

## The safe gadget is a one-way exit

Add a fresh bottom marker under the original stack contents. Add a fresh **drain state**. From each old accepting state, allow an ε handoff into this drain. There, pop original stack symbols using ε transitions. When the fresh bottom marker appears, pop it and enter the sole new accepting state.

There is no way back to the old machine and no input-consuming transition in the drain. If a branch guesses completion too early, unread input remains forever, so it cannot accept. If an old accepting run has actually consumed the whole input, it can safely drain and finish. Those two observations establish the language-preserving role of the gadget.

The marker must be fresh: an old computation must not confuse it with one of its legitimate stack symbols. It marks the baseline that the old machine cannot cross.

## Normalize individual transitions too

The grammar construction wants each transition to perform exactly one push or one pop. For a transition that both pops b and pushes c, use a fresh intermediate state: first perform the pop (and any input consumption), then perform an ε push of c. The intermediate state has only the intended continuation, so no other old transition can interrupt the halfway state.

For a transition that changes state but neither pushes nor pops, insert a push of a fresh temporary symbol followed by its pop. This creates a balanced two-step version of the same action. Consume the input only once across the two steps.

Fresh states and symbols are not decoration. Reusing an old state could create extra exits; reusing a marker carelessly could allow a wrong pop to match.

## How this closes the CFG/PDA connection

CFG→PDA stores pending derivation work. Normalized PDA→CFG summarizes balanced runs. Together they show that context-free languages are exactly the languages recognized by PDAs. A DFA can be simulated by a PDA that ignores its stack, so every regular language is context-free. The reverse inclusion fails: the stack can handle \(0^n1^n\), which the pumping argument ruled out for DFAs.

**Keep:** cleanup must be an irreversible commitment to stop reading. Normalize safely, then apply the balanced-run grammar recipe.

**One connected check:** Why is an early jump to the fresh drain harmless, while early popping at an old accepting state can be harmful?
