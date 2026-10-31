# Property reductions: make one acceptance event change the whole language

## The mental model: a behavioral switch

A reduction can construct a TM whose accepted language has one form if M accepts w and another form if M does not. Then a hypothetical property checker distinguishes the cases. The wrapper is fixed code; the language it ends up recognizing depends on the embedded simulation's behavior.

The target here is \(REGULAR_{TM}\): given a TM description, decide whether its accepted language is regular. The input is not a DFA with visibly finite-state behavior. It's an arbitrary TM, and the question is whether **some** DFA recognizes the same language.

## Build the two cases into one machine

Given ⟨M,w⟩, construct M₂. On input x:

1. If x is in \(K=\{0^n1^n:n\ge0\}\), accept immediately. K has a terminating membership test, even though it is not regular.
2. Otherwise simulate M on w, accepting x if that simulation accepts.

If M rejects w, M₂ may reject on that second branch; if M loops, M₂ loops there. Either way, those x's are not accepted.

## Identify the two languages exactly

If M accepts w, every x in K is accepted by step 1 and every x outside K is eventually accepted by step 2. Thus \(L(M_2)=\Sigma^*\), which is regular.

If M does not accept w, only step 1 contributes accepted strings. Thus \(L(M_2)=K\), which is nonregular by the pumping proof.

A REGULAR_TM decider would therefore answer yes exactly when M accepts w. That would decide A_TM, contradiction. This time the answer is not flipped. Decide the direction from the case analysis, not from a memorized rule that “reductions negate the answer.”

## Why the nonregular base language is doing real work

K supplies a known no-instance of the target property, while Σ* supplies a known yes-instance. The simulation switches between them. If both cases produced regular languages, the target checker could not reveal the source answer. If the wrapper accepted extra strings in the no-case, you would need to re-prove the resulting language nonregular; hand-waving about “mostly K” is not enough.

Also distinguish “nonregular” from “undecidable.” K is nonregular but decidable. That is why step 1 can be an ordinary finite algorithm. The target property of arbitrary TM languages is the undecidable task.

## Equivalence gives another route

\(EQ_{TM}\) asks whether two TMs accept the same language. Compare an arbitrary M against a fixed machine that rejects every input. Their languages are equal exactly when L(M) is empty. So an equivalence decider would give an emptiness decider, which the previous deck ruled out.

Again, the reduction handles accepted languages, not identical running times or identical step-by-step behavior. Two machines can recognize the same language while one rejects a nonmember and the other loops on it.

**Keep:** construct a clear property switch; prove exactly what language appears in both cases; then read off the contradiction.

**One connected check:** Why is it valid for the wrapper to decide membership in a nonregular language K, and why would that not be valid if K had no decider?
