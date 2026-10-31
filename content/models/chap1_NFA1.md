# NFA 1 — Keep several guesses alive

## The whole idea

A DFA commits to one next state. An NFA may have several legal moves. The useful picture is **a collection of candidate runs**: one candidate can die while another succeeds. The definition says accept if at least one complete run consumes the whole input and ends accepting. It is not a probability, a majority vote, or a machine that magically knows the future.

Imagine several bookmarks moving through the same input. One bookmark hits a dead end; another keeps going. We do not declare the whole thing fucked because one attempt failed. At the end, one surviving accepting attempt is enough. Keep “a branch failed” separate from “every possible branch failed.”

## Round 1 — A guess is allowed to fail · pages 1–5

Think of keeping several bookmarks while reading the same input. Each bookmark represents one possible run. On a symbol, a bookmark can split into several destinations, move to one, or die because no matching arrow exists. There is no voting. At the end, one surviving accepting run is sufficient.

An ε arrow moves a bookmark without advancing the input cursor. It is optional for an individual run. When collecting **all possibilities**, include both staying put and every state reachable by any number of ε moves. This resolves “do we have to take ε?”: no single run must take it; the complete possibility set must account for runs that do.

For the slide's first machine, q₁ loops on 0/1, can branch on 1 to q₂, q₂ reaches q₃ on either 0 or ε, q₃ reaches accepting q₄ on 1, and q₄ loops. Trace `010110` as sets: {q₁} → {q₁} → {q₁,q₂,q₃} → {q₁,q₃} → {q₁,q₂,q₃,q₄} → {q₁,q₂,q₃,q₄} → {q₁,q₃,q₄}. Accept because the final set includes q₄. The target is strings containing `11` or `101` as a substring: those are the two ways to get from the branching 1 to the finishing 1.

Page 2 says δ is “not a function” when trying to return one of several states. The later formal definition repairs the output type: δ returns the **set** of all destinations. A set-valued function is still a function. Don't let the informal sentence wreck your mental model.

## Round 2 — Guessing the third-from-last position · pages 6–11

The NFA loops while waiting, guesses a particular 1 is third from the end, then demands exactly two more symbols. Its final state has no outgoing transitions. If more input remains, that guess dies. If fewer than two symbols follow the guessed 1, it never reaches the final state. So the successful guess identifies exactly the required position.

For `0100`, guess the second symbol 1, consume the two zeros, and finish accepting. For `0010`, guessing its 1 leaves only one symbol: reject. Nondeterminism does not let the machine ignore unread input or make a wrong guess magically correct.

The eight-state DFA remembers the last three bits in a sliding window. A state labeled q₀₁₀ means the window is 010. On input 1, drop the oldest bit and append the new one: 010→101. Accept windows beginning with 1. Starting with 000 is safe padding: before three real symbols arrive, the leftmost position is still a fake zero, so short inputs cannot be mistakenly accepted. After three symbols the padding has vanished.

## Round 3 — One added ε can change the whole question · pages 12–13

Allow ε on either of the final two NFA steps. Now, after guessing a 1, the machine can consume zero, one or two further symbols. That means the chosen 1 may be last, second-last or third-last. The language becomes “a 1 occurs among the last three actual symbols.”

In the sliding-window DFA, accept every window except 000. The initial 000 still rejects ε. A short string `1` becomes window 001 and accepts, correctly. Compare the two constructions: same basic memory, changed acceptance condition. Added ε edges are not harmless decorative shortcuts; they alter how much input a path must consume.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Why guessing helps

Pages 6–7 ask whether the third symbol from the end is 1. While reading left to right, you do not yet know where the end will be. An NFA can continue scanning and, whenever it sees a 1, also start a candidate that says, “maybe this is the third-last position.” That candidate must then consume exactly two further symbols and finish.

The diagram has q₁ looping on 0 and 1; q₁ also goes to q₂ on 1; q₂→q₃ and q₃→q₄ each consume either symbol. Only q₄ accepts, with no outgoing moves. Those missing moves are part of the design: if more input remains, that candidate guessed too early and must die.

## Follow the candidates all the way

Use the slide's accepted input `0100`. Begin with candidate set {q₁}. After 0: {q₁}. After 1: {q₁,q₂}, because the run can keep scanning or start its guess. After the next 0: {q₁,q₃}. After the final 0: {q₁,q₄}. One candidate finishes at q₄, so accept.

Now `0010`: after 0,0,1 the set is {q₁,q₂}; after the last 0 it is {q₁,q₃}. No accepting candidate remains. Reject. The 1 was second-last, not third-last. Reaching q₂ was only a hypothesis, not success.

## What ε adds

Pages 2–5 also use ε-arrows. ε means move without consuming an input symbol. If a candidate can follow an ε-arrow, include that possibility while retaining the possibility of taking zero ε-moves. The **ε-closure** collects everything reachable that way. After consuming the next real symbol, take closure again. Old states do not stay merely because you remember seeing them; they stay only if a legal continuation reaches them at the current input position.

The tree is a record of possible paths. A row can collect possibilities at a common input position, including free ε movement. Actual hardware need not create infinitely many parallel workers; this is a mathematical definition of accepted strings.

## Why the DFA can still do this

Pages 8–10 show eight DFA states remembering the latest three bits. That DFA stores enough history to answer at the end without guessing. Leading zeros in the initial q₀₀₀ do not create a false accepting third-last 1 for a short input. Nondeterminism made the design compact; it did not enlarge the regular-language class. Subset construction will prove the general equivalence.

The modified ε version on pages 12–13 asks a different question: is **some** one among the last three symbols a 1? Zero, one or two remaining symbols may finish the guessed path. Changing arrows changes the permitted completion lengths, hence the language.

**Connected check:** explain why giving q₄ a loop on both symbols would destroy the “third from the end” test. Trace one input that reveals the problem.
