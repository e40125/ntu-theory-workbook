# NFA 1 — Keep several guesses alive

## The whole idea

A DFA commits to one next state. An NFA may have several legal moves. The useful picture is **a collection of candidate runs**: one candidate can die while another succeeds. The definition says accept if at least one complete run consumes the whole input and ends accepting. It is not a probability, a majority vote, or a machine that magically knows the future.

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
