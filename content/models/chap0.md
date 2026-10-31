# Chapter 0 — Know what kind of thing you are talking about

## The whole idea

This deck gives us the grammar for talking precisely about computers. Before proving anything, ask: **what objects are involved, and what exactly am I claiming about them?** A bunch of notation becomes much less cursed once every symbol has a job. Pages 1–9 introduce objects and logic; pages 10–15 show how definitions become reasons in a proof.

Aight, first stop: what kind of thing are we even holding? A shopping bag, a queue and a filled-out form are all collections, but you cannot swap their rules around. Sets, sequences and tuples have the same issue. If we identify the object first, the symbols stop looking like random-ass punctuation.

## Round 1 — Sort the damn objects before manipulating them · pages 1–6

Imagine a contact list, a queue and a form. A **set** behaves like a contact list where the question is “is this person included?” Adding the same person twice does not create a new member. A **sequence** behaves like a queue: who comes first matters, and repeated entries remain. A **tuple** is an ordered record with a fixed number of fields. These are analogies for membership and order, not claims about software implementation.

Now read the symbols as complete sentences. `x∈A` means x is a member of A. `x∉A` means it is not. `A⊆B` means every member of A is also in B; A may equal B. The slides sometimes use `⊂` for subset, so check the intended convention rather than assuming “strictly smaller.” `∅` is a set with no members. `{∅}` has one member: the empty set. An empty box and a box containing an empty box are different objects.

A Cartesian product A×B makes ordered pairs, one choice from each set. The order fixes the fields: (1,x) means number first, letter second. A function f:A→B promises one output in B for each input in A. Its **domain** is A; B is the **codomain** of allowed outputs. It need not use every output, and two inputs may share an output. A relation merely records which combinations satisfy a condition. The scissors-paper-stone table on page 2 is a relation: T means “the row choice beats the column choice.”

For page 3, `∀x` means “for every x”; `⇒` means “implies”; `⇔` means “in both directions.” The three equivalence conditions prevent a grouping rule from behaving inconsistently. Modulo 7 means remainder after division by 7. Thus 2, 9 and 16 belong to one remainder class even though they are different integers.

A graph consists of vertices and edges, not merely circles on paper. **Undirected** edges join unordered endpoints; **directed** edges have a source and destination. A subgraph chooses some vertices and some original edges between chosen vertices. It cannot invent a connection absent from the original or retain an edge whose endpoint was removed. An **induced** subgraph, a stronger condition, must retain every original edge between its chosen vertices; ordinary subgraphs need not.

## Round 2 — Why “if” is such a sneaky little word · pages 7–10

AND, written ∧, requires both statements. OR, written ∨, allows either or both. NOT, written ¬, reverses truth. XOR permits exactly one. In Boolean calculations 0 and 1 mean false and true; elsewhere they may be literal input symbols. Same marks, different jobs.

“If P, then Q” makes a promise about cases where P holds. It is broken only by P=true and Q=false. That explains all four rows of the implication table: false/false and false/true do not break the promise; true/true keeps it; true/false breaks it. This is why P→Q agrees with ¬P∨Q. It does **not** grant the reverse Q→P. Wet ground could come from a sprinkler.

A proof starts with what is granted and earns what is claimed. Direct proof: assume P, derive Q. Contrapositive: assume ¬Q, derive ¬P. Contradiction: assume the claim fails, derive something impossible. The page 10 label is loose; its displayed ¬Q→¬P is specifically the contrapositive. Do not memorize the loose label and carry that confusion into an exam.

## Round 3 — Every missing step in the square-root argument · pages 11–15

A **rational** number can be written m/n with integers m,n and n≠0. “Lowest terms” means cancel all common factors first. An **irrational** number has no such representation. Assume √2=m/n in lowest terms. Squaring gives 2=m²/n², so 2n²=m². Therefore m² is even.

Why does that force m even? Every odd integer has the form 2k+1. Its square is 4k²+4k+1, which is odd. So an even square cannot come from an odd m. Write m=2k, substitute, and obtain 2n²=4k², hence n²=2k². The same reasoning makes n even. Now m and n both contain factor 2, contradicting our lowest-terms choice. The assumption that √2 was rational must fail.

The even-degree argument uses a different engine: count the same quantity from the edges instead of from the vertices. The square-root argument uses a forbidden consequence of the assumption. “Proof” is not one magic sentence pattern; it is a chain in which each step has a reason.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
