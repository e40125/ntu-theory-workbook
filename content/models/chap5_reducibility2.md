# Property reductions: make one acceptance event change the whole language

## The mental model: a behavioral switch

A reduction can construct a TM whose accepted language has one form if M accepts w and another form if M does not. Then a hypothetical property checker distinguishes the cases. The wrapper is fixed code; the language it ends up recognizing depends on the embedded simulation's behavior.

The target here is \(REGULAR_{TM}\): given a TM description, decide whether its accepted language is regular. The input is not a DFA with visibly finite-state behavior. It's an arbitrary TM, and the question is whether **some** DFA recognizes the same language.

Turn the unknown computation into a switch. In one case the constructed machine accepts a familiar regular language; in the other it accepts a known nonregular language. A perfect regularity checker would reveal which case happened. The construction must set up that switch without secretly solving the unknown computation first.

## Round 1 — Make the unknown behavior control a visible language property · pages 1–4

REGULAR_TM asks whether the language accepted by a supplied TM is regular. It does not ask whether the TM's diagram looks like a DFA or whether it uses its tape. A cumbersome TM can recognize a simple regular language.

Given ⟨M,w⟩, build M₂ on input x. First decide whether x has form 0ⁿ1ⁿ. If so, accept immediately. Otherwise simulate M on the fixed w and accept if M accepts. The first branch is decidable because we already know a matching algorithm for equal ordered blocks.

If M accepts w, every x accepts: members of 0ⁿ1ⁿ use the first branch, all other binary strings eventually use the simulation branch. Therefore L(M₂)={0,1}*, which is regular. If M does not accept w, only the first branch contributes accepted strings, so L(M₂)={0ⁿ1ⁿ:n≥0}, which is nonregular. Again, “does not accept” includes looping; the proof must not assume M always halts.

A hypothetical regularity decider for ⟨M₂⟩ would therefore answer whether M accepts w. The outer reduction only constructs M₂ and calls that total decider. It never waits for M itself to finish. That gives the contradiction with A_TM's undecidability.

## Round 2 — Why the order of the two branches matters

If M₂ first simulated M on w and only afterward checked x's equal-block form, then a looping M would prevent even valid 0ⁿ1ⁿ strings from being accepted. The baseline nonregular language would disappear, and the intended two-case analysis would be wrong.

The unconditional baseline branch must happen before the potentially nonterminating simulation, or be fairly interleaved with it. Here doing the easy decidable baseline test first is sufficient. The mechanism is a **property switch**: unknown acceptance toggles the language from a known nonregular set to a known regular set.

You need to prove both language identities, not merely exhibit one accepted string in each case. Regularity concerns the entire accepted set. The same reduction design pattern later works for many other nontrivial language properties, though each theorem has its own hypotheses.

## Round 3 — Equivalence can hide emptiness as a special case · pages 5–6

EQ_TM asks whether two TMs accept exactly the same language. Choose a fixed machine Z that rejects every input, so L(Z)=∅. Then L(M)=L(Z) exactly when L(M)=∅.

If R decided EQ_TM, an emptiness decider could take ⟨M⟩, construct ⟨M,Z⟩, run R and return its answer. This construction preserves yes/no directly; no flip is needed. Since E_TM was just proved undecidable, EQ_TM is undecidable too.

Notice the economy: the second reduction starts from E_TM because equality with an empty-language reference makes the connection immediate. You do not have to reduce from A_TM every time. Choose a previously established hard problem whose question aligns cleanly with the target.

The general proof checklist is source problem, hypothetical target decider, finite construction, exact yes/no relationship, termination of the outer procedure, and contradiction. A paragraph that merely says “similar to the previous proof” omits the actual adapter; spell out the machine behavior that makes the relationship true.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
