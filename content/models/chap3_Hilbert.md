# Algorithms and the Church–Turing thesis: what counts as an effective method?

## The whole-course question gets bigger

We've shown that several formal machine designs have the same computability power. Now connect them to the informal word **algorithm**: a finite, mechanical procedure whose individual steps can be carried out effectively. The Church–Turing thesis says that effectively computable procedures are captured by Turing machines.

This is a thesis linking an informal notion to a formal model, not a theorem proved by manipulating two formal definitions. Equivalence between one-tape and multitape TMs is a theorem; the claim that the model captures every effective method has a different logical status.

## Searching for an integer root: yes can be easier than no

Given a polynomial with integer coefficients, try integer inputs and evaluate it. For one variable, test 0,1,−1,2,−2,… . If an integer root exists, this enumeration eventually finds it. If none exists, an unbounded search alone runs forever. It is a recognizer-style strategy for the yes-instances, not automatically a decider.

For a univariate polynomial of positive degree with nonzero leading coefficient, a computable bound on root magnitude turns this into a finite search. Once every integer within a valid bound has been checked, there are no other possible integer roots to miss. For the slide example \(4x^3-2x^2+x-7\), a bound such as |x|≤7 suffices. Constant and zero polynomials are handled separately rather than dividing by a nonexistent leading term.

The critical extra ingredient is the **stopping certificate** supplied by the bound. “I haven't found a root yet” is not the same information as “I've exhausted every possible root.”

## Why the multivariable result is deeper

For polynomial equations in several integer variables, enumerating all integer tuples still recognizes existence of a solution. Hilbert's tenth problem asked for a general deciding procedure. The negative result says no such algorithm exists for all instances. This does not follow just from the fact that our current brute-force search may loop; a bad algorithm doesn't prove all algorithms impossible. An impossibility theorem needs a reduction or other general argument.

## Three levels of describing a TM

A formal description lists states and transitions. An implementation-level description explains tape layouts, head movements, and marking. A high-level description uses algorithmic steps such as “search the finite graph,” while making those steps effective and termination clear.

For graph connectivity, begin with one marked vertex, repeatedly mark neighbors of marked vertices, and stop when a whole pass adds nothing. A finite graph has only finitely many vertices to add. Accept if all are marked. The algorithm's monotone progress explains termination; the reachability invariant explains correctness.

An input encoding, written with angle brackets such as ⟨G⟩, turns an abstract object into a finite string. Invalid encodings must have specified treatment. The machine reads symbols, not a Platonic graph floating in the void.

**Keep:** distinguish an effective procedure, a formal simulation theorem, and the Church–Turing thesis. Existence search needs a separate reason to stop on no-instances. Next, we ask which questions about encoded machines are decidable.

**One connected check:** What extra fact turns the univariate integer-root enumeration into a decider, and why does “it worked on many examples” not provide that fact?
