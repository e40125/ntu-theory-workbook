# Chapter 0 — Know what kind of thing you are talking about

## The whole idea

This deck gives us the grammar for talking precisely about computers. Before proving anything, ask: **what objects are involved, and what exactly am I claiming about them?** A bunch of notation becomes much less cursed once every symbol has a job. Pages 1–9 introduce objects and logic; pages 10–15 show how definitions become reasons in a proof.

## Build the objects from scratch

A **set** is a collection where membership matters. `{0,1}` and `{1,0,1}` name the same set. A **sequence** preserves order and repetitions: `01` differs from `10`, and `11` differs from `1`. A **tuple** is a fixed-length sequence of entries. A machine's five-tuple is therefore a record with five different fields, not five arbitrary decorations.

A **function** gives exactly one output for every allowed input. Its output may itself be a set. That is how an NFA transition can be a perfectly valid function even though the machine has several possible next states. A **relation** records which pairs satisfy a condition; it need not select a single partner.

The **Cartesian product** lists ordered choices from two sets. If A={1,2} and B={x,y}, then A×B contains (1,x), (1,y), (2,x), (2,y). Later, “state × symbol” simply means “give me those two pieces of information together.”

## Watch a definition do useful work

Pages 3–4 use “same remainder modulo 7.” Two integers are related when their difference is a multiple of 7. Why is this an equivalence relation—a way of grouping genuinely interchangeable cases?

An integer differs from itself by zero, so it relates to itself (**reflexive**). If i−j=7a, then j−i=7(−a), so reversing the pair preserves the relation (**symmetric**). If i−j=7a and j−k=7b, adding gives i−k=7(a+b), so the relationship passes through the middle number (**transitive**). Each fancy word has just become a checkable property.

## How a proof grows out of the picture

Page 11 asks why an undirected graph's total degree is even. A **vertex** is a node; an **edge** joins endpoints; a vertex's **degree** counts incident edge-ends. Look at one edge. It contributes one end at each endpoint, so two contributions overall. Repeat that accounting for every edge: total degree = twice the number of edges. Twice an integer is even. Done. We counted a generic contribution, so the argument covers every finite graph, not just the drawn example. A self-loop, if allowed, contributes two to its vertex's degree.

An implication “P implies Q” says there cannot be a case with P true and Q false. It does not say Q happens only because of P. “Rain implies wet ground” allows wet ground from a sprinkler. To disprove a universal implication, find one case satisfying P but violating Q.

**Source wording to separate:** page 10 writes the contrapositive ¬Q→¬P under a contradiction heading. Contraposition proves that equivalent implication. Contradiction assumes the original claim fails and derives an impossibility. Pages 13–15 use contradiction: write √2=m/n in lowest terms; its square forces m even, then n even, contradicting lowest terms. Those methods are related but their opening assumptions differ.

## Carry this into the next deck

A state diagram will use sets, functions and a graph to define a checker. Proofs will connect its behavior to a claim about all inputs. Your job is to track **object, condition, reason** before worrying about polished wording.

**Connected check:** explain why showing three graphs with even degree sums is weaker than the “two ends per edge” argument. Use the distinction between examples and all graphs.
