# PDA normalization: make completion safe before converting

## The hidden issue: accepting state does not mean the stack is empty

Our general PDA accepts when a run consumes all input and finishes in an accepting state. It may still have stack contents. But the PDA→CFG construction summarizes balanced empty-to-empty runs. We therefore need an equivalent PDA that finishes with an empty stack at one designated accepting state.

This is a change of representation, not permission to change which strings accept. A cleanup gadget is correct only if it cannot help the original machine do extra input processing that used to be impossible.

Cleanup sounds harmless until the machine dumps its stack and strolls back into ordinary computation with evidence erased. That can accept new strings and fuck up the language. We need a one-way exit into cleanup. The source counterexample shows exactly what goes wrong when that boundary is missing.

## Round 1 — Why “just pop the leftovers” can break the language · pages 1–6

The tempting cleanup edit adds pop-anything loops directly to each old accepting state. The slide gives a counterexample because that lets the machine clean the stack **and then resume old computation**. It may expose a symbol the original machine could never access at that point.

In the source example, ε moves push a and then b, producing top-left `ba`. The next real input a requires top a, but b blocks it, so the old machine does not accept `a`. With an added cleanup pop at an old accepting state, the machine can remove b, return to an original transition, consume a while popping a, and accept. The transformed machine has invented a new accepting behavior. Same intended goal, wrong implementation.

This is why correctness review must trace a counterexample, not merely admire that the diagram “clears the stack.” An added arrow changes the set of possible computations everywhere it can be taken.

## Round 2 — Cleanup must be a one-way commitment · pages 7–8

Add a fresh start that pushes a fresh bottom marker $ before entering the old start. From every old accepting state, allow an ε move into one separate cleanup state q_pop. In q_pop, consume no input and pop ordinary stack symbols until $ is exposed; then pop $ and enter the unique new accept state. The old accepting states stop being accepting in the transformed machine.

There is no arrow from cleanup back into the old computation. A branch may enter cleanup while input remains, but it can never consume that remainder and therefore cannot accept the whole input. So we do not need a magical “input is finished” sensor. The no-return structure plus the acceptance definition enforces the condition.

If the old machine has a valid accepting run, enter cleanup afterward and finish. If the new machine accepts, its pre-cleanup part was a legal old run ending in an old accepting state after consuming all input. That proves equivalence in both directions.

## Round 3 — Make every transition change stack height by exactly one · page 9

For a replace move `a,b→c`, first consume a and pop b into a fresh helper state; then consume ε and push c into the destination. For a no-change move `a,ε→ε`, first consume a and push a fresh dummy marker; then consume ε and pop that dummy into the destination. Each helper has only its designated outgoing continuation.

The dummy is temporary bookkeeping, not a terminal and not an original stack symbol with hidden meaning. Make it fresh so no original operation confuses it with its own markers. A push-only or pop-only move already has the required form. The splitting preserves consumed input and stack effect while making the balanced-trip grammar proof applicable.

## Round 4 — Where the language families fit · pages 10–11

A DFA is simulated by a PDA that ignores its stack: on each symbol, make the DFA state update with no pop and no push. Since every PDA language is context-free, every regular language is context-free. The inclusion is strict because 0ⁿ1ⁿ is context-free and not regular. “More powerful” here means a larger family of recognizable languages, not automatically faster execution.

The final slide mentions non-context-free languages but omits their proof. A useful extra boundary example is {aⁿbⁿcⁿ:n≥0}. Its standard proof needs the **context-free pumping lemma**, a different theorem from the regular pumping lemma. It says sufficiently long members split as uvxyz with |vxy|≤p, |vy|>0, and uvⁱxyⁱz staying in the language for every i≥0.

For aᵖbᵖcᵖ, the short middle window vxy cannot reach all three blocks. Deleting v and y removes at least one symbol, affects at most two block types, and leaves at least one block's count p unchanged. The three counts cannot remain equal, contradicting the lemma. This is a supplementary application of that theorem, whose own parse-tree proof is outside these slides. A regular pumping argument alone would only show nonregularity, not non-context-freeness.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
