# Reductions: turn a hypothetical solver into an impossible solver

## The direction is the whole game

To prove a new problem B undecidable, start with a known undecidable problem A. Show how a solver for B would let you decide A. In words: **hard input in, translate it, call the supposed B solver, translate its answer back**. If that worked, it would contradict A's known impossibility.

The arrow goes from the known hard problem toward the target problem. Showing that B can be solved using an A oracle says little about B's impossibility; easy problems can also wastefully call a hard oracle.

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
