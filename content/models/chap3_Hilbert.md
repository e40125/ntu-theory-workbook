# Algorithms and the Church–Turing thesis: what counts as an effective method?

## The whole-course question gets bigger

We've shown that several formal machine designs have the same computability power. Now connect them to the informal word **algorithm**: a finite, mechanical procedure whose individual steps can be carried out effectively. The Church–Turing thesis says that effectively computable procedures are captured by Turing machines.

This is a thesis linking an informal notion to a formal model, not a theorem proved by manipulating two formal definitions. Equivalence between one-tape and multitape TMs is a theorem; the claim that the model captures every effective method has a different logical status.

Searching for a witness is like checking lockers for a missing key. Finding it settles yes. Checking a million empty lockers does not settle no when infinitely many remain. A proved finite search bound changes the job completely: exhaust that bounded region and you can finally justify rejection.

## Round 1 — “Find an algorithm” needs a definition of what counts · pages 1–4

Hilbert's tenth problem asks for a method that takes an integer-coefficient polynomial and decides whether some integer assignment makes it zero. An **integer root** is such an assignment; with several variables it is a tuple of integers. A polynomial is a finite sum of coefficient-times-variable-power terms.

The source example 6x³yz²+3xy²−x³−10 becomes zero at x=5,y=3,z=0: the first term is 0, the second 135, the third −125, and the last −10. Checking one proposed assignment is finite arithmetic. Deciding that no assignment exists is the harder issue.

The Church–Turing thesis identifies effectively executable algorithms with Turing-computable procedures. Because “effectively executable” began as an informal concept, this is not a theorem comparing two independently formalized mathematical definitions. The slide calls it a definition; **thesis** emphasizes the proposed identification supported by equivalent computational models. It is not a theorem that every physical phenomenon can be simulated efficiently.

## Round 2 — Search can recognize without deciding · pages 5–8

For one variable, try 0,1,−1,2,−2,… . If evaluation gives zero, accept. Every integer eventually gets tried, so a root will eventually be found. Without an additional stopping rule, a rootless polynomial makes this search continue forever.

A proven finite root bound changes the job. If every root lies in [−B,B], test only those finitely many integers and reject after they all fail. For the source's 4x³−2x²+x−7, its stated bound gives B=4×7/4=7. Use the absolute value of the leading coefficient when writing a general positive bound; a negative leading coefficient cannot give a negative search radius. Treat the zero polynomial and nonzero constants separately.

Why can a one-variable bound work? Far enough from zero, the highest-degree term dominates the sum of lower-degree terms, so the polynomial cannot cancel to zero. If degree is d, there are k nonzero terms, maximum coefficient magnitude c_max and leading magnitude |c_d|, then for |x|>max(1,k c_max/|c_d|), the leading magnitude exceeds the total lower-degree magnitude. This gives a sufficient finite radius, even if not the tightest one.

The general multivariable problem is undecidable. The slide's “bounds are not possible” should be read as absence of a general computable search bound sufficient for deciding all inputs, not a claim that every particular polynomial lacks bounded solutions. That impossibility is a deep result cited by the deck, not proved by the little enumeration example.

## Round 3 — Three levels of describing the same algorithm · pages 9–10

High-level: say what logical operations are performed, such as compare every pair. Implementation-level: explain tape marking, scans, stored phase and restoration. Formal-level: provide states and transitions. A high-level description is acceptable when its operations are known to be implementable and the required level permits it. The lower layers still exist; we are using justified subroutines rather than pretending the details don't matter.

## Round 4 — Connectivity is reachability from one chosen node · pages 11–13

An undirected graph is connected when every vertex can be reached from every other through edges. Choose one vertex, mark it, then repeatedly mark any vertex adjacent to a marked one. Stop when a complete pass marks no new vertex. Accept if every vertex is marked; otherwise reject.

Why correct? Every newly marked vertex has a path from the chosen start, extending the path to its marked neighbor. Conversely, if a reachable vertex remained unmarked at the fixed point, take a path to it and the first unmarked vertex on that path; its predecessor is marked, so it should have been marked too. Contradiction. Termination follows because each productive pass adds a vertex and the graph is finite.

`⟨G⟩` means an encoding of graph G as a string. Validate that encoding before graph reasoning: node identifiers are distinct and edge endpoints refer to listed nodes. The displayed tuple/list format is one representation, not the graph itself. Mathematical objects become TM inputs only after such a finite encoding is specified.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
