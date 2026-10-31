# Reductions: turn a hypothetical solver into an impossible solver

## The direction is the whole game

To prove a new problem B undecidable, start with a known undecidable problem A. Show how a solver for B would let you decide A. In words: **hard input in, translate it, call the supposed B solver, translate its answer back**. If that worked, it would contradict A's known impossibility.

The arrow goes from the known hard problem toward the target problem. Showing that B can be solved using an A oracle says little about B's impossibility; easy problems can also wastefully call a hard oracle.

You are building an adapter: plug the old impossible question into the proposed new solver, then translate its answer back. If that adapter worked, the new solver would solve the old impossible job. So the new solver cannot exist. The damn direction matters; an adapter pointed backward proves something else.

## Round 1 — Borrow a solver for B to solve A · pages 1–3

“A reduces to B” means a procedure for B would let us solve A through an effective construction and finite surrounding computation. The direction is easy to reverse by accident. To prove a new target B hard, start with an already hard problem A and show how a B-solver would solve it.

Think of a socket adapter: you already know the task requiring plug A is impossible to power with the available universal setup. If a purported B outlet plus a finite adapter would power A, that B outlet cannot exist under the assumptions either. The analogy represents dependency; the actual proof must specify the adapter algorithm and its answer correspondence.

The logical form is B decidable ⇒ A decidable. Its contrapositive is A undecidable ⇒ B undecidable. A reduction from an easy A to B proves no hardness for B. A reduction that itself calls an undecidable oracle without justification is not a valid finite adapter.

## Round 2 — Turn one acceptance question into an emptiness question · pages 4–7

Given ⟨M,w⟩, construct the description of a new machine M₁. On its own input x, M₁ rejects if x≠w. If x=w, it simulates M on w and accepts if M accepts. The fixed w is stored in M₁'s program description.

We can write this description in finite time without discovering whether M will accept. That's crucial. **Constructing a simulator** is not the same as **running the simulated computation to completion**. The reduction creates code; the hypothetical emptiness decider must inspect its language behavior.

There are two language cases. If M accepts w, M₁ accepts exactly w, so L(M₁)={w}. If M does not accept w—whether it rejects or loops—M₁ accepts no input, so L(M₁)=∅. A looping run on x=w contributes no accepted member. This repairs the slide's occasional shorthand “rejects” in the no-case.

Assume R decides E_TM, the set of TM descriptions whose language is empty. Run R on ⟨M₁⟩. If R says empty, reject the original acceptance question. If R says nonempty, accept it. R always halts by assumption, and constructing M₁ is finite, so the resulting outer procedure would decide A_TM. Contradiction.

## Round 3 — Audit the proof by asking what each machine receives

M is the original machine; w is its fixed test input. M₁ is the constructed machine; x is its arbitrary future input. R is the hypothetical emptiness decider; it receives the description ⟨M₁⟩, not x. S, the outer decider we derive for contradiction, receives ⟨M,w⟩.

These are different levels. If you silently replace x with w everywhere, you can lose the proof that all other inputs are rejected and therefore fail to characterize L(M₁). If you run M inside S before calling R, S may loop and the contradiction collapses.

The result also does not say every particular TM has an unknowable language. Many individual machines are trivially empty or nonempty. It rules out one algorithm that correctly decides emptiness for **every** encoded TM.

The construction maps acceptance to **nonemptiness**, so the final Boolean answer is flipped. When later distinguishing many-one reductions from more general decision-procedure reductions, preserve that polarity explicitly instead of claiming a yes-preserving mapping to E_TM without the flip.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## The deck's target: is a TM's language empty?

\(E_{TM}=\{\langle M\rangle:L(M)=\emptyset\}\). This asks whether M accepts **no input at all**. A machine that loops on every input has an empty accepted language. “Empty” refers to the set of accepted strings, not whether the program runs or the tape starts blank.

Assume a decider R for E_TM exists. Given an acceptance instance ⟨M,w⟩, construct a new machine M₁:

1. On input x, if x≠w, reject.
2. If x=w, simulate M on w.
3. Accept if that simulation accepts; if it rejects, reject; if it loops, keep simulating.

M and w are hardcoded into M₁'s description. Constructing that description is finite; we do **not** need to run M first to decide which code to write.

The wrapper is a booby-trapped test case for the supposed emptiness checker: the single candidate w gets through **only if** the embedded simulation accepts. Every other candidate is rejected at the door. That is the mechanism linking one execution question to a property of an entire language. The code is easy to write; knowing which behavior eventually happens is the hard part the hypothetical checker would have to solve.

## Work both cases before deciding the answer flip

If M accepts w, M₁ accepts exactly w, so \(L(M_1)=\{w\}\), which is nonempty—even if w happens to be ε.

If M does not accept w, M₁ accepts nothing, so \(L(M_1)=\emptyset\). For x≠w it rejects immediately; for x=w it rejects or loops. Neither outcome is acceptance.

Thus R's “empty” answer means the original acceptance answer is no; R's “nonempty” answer means yes. We flip R's emptiness verdict to decide A_TM, a contradiction.

## Why this isn't circular

M₁ may loop. That's allowed: R was assumed to decide a property of **any** encoded TM, including looping ones. Our overall hypothetical A_TM decider does not execute M₁ to completion; it gives M₁'s finite description to R, which is assumed to halt.

The reduction itself must be effective and terminating. Writing a wrapper program around ⟨M,w⟩ satisfies that. “Wait to see whether M accepts, then output one of two machines” would not: it might wait forever and fail to produce the transformed instance.

## What a rigorous reduction answer contains

Name the assumed target decider, define the constructed machine for every input, analyze the source yes-case and no-case, show how the target answer yields the source answer, and explain why the construction and oracle use would terminate. The two-case table is the bridge between intuition and proof.

**Keep:** you don't solve the hard instance while constructing the wrapper. You encode its eventual behavior into a property the hypothetical solver is supposed to decide.

**One connected check:** Why does M looping on w still make M₁'s language empty rather than leave the mathematical set L(M₁) “unknown”?
