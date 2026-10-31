# Deciding questions about automata: inspect the finite object

## The shift: the input can be a machine description

Until now, a machine usually received a word such as `0011`. It can also receive an encoding of another machine, perhaps together with a word. \(\langle B,w\rangle\) means a finite string describing the pair “machine B and input w.” Angle brackets are encoding notation, not a transition or a set.

For \(A_{DFA}\), the question is whether the encoded DFA B accepts w. A decider checks the encoding, simulates one transition per input symbol, then checks whether the final state is accepting. There are |w| input symbols, so this simulation finishes. Empty w simply asks whether the start state accepts.

## Reuse conversions when they come with termination

For NFA acceptance, convert to a DFA or directly update the finite candidate-state set while reading w. For regular-expression acceptance, compile the expression to an NFA, then use the NFA procedure. These are finite constructions. This is an early example of solving one problem by translating it into another already-solved problem.

The important claim is not “it feels computable.” We can identify each finite step and why the process ends.

## Emptiness is not an infinite list of membership tests

\(E_{DFA}\) asks whether a DFA's language is empty. Trying ε, then all length-one strings, then all length-two strings will find a member if one exists, but may search forever if the language is empty. A decider needs a way to certify that no word works.

Treat the DFA as a finite directed graph. Mark the start. Repeatedly mark every state reachable by one outgoing arrow from a marked state. Stop when no new state is marked. If any accepting state is marked, a path to it spells an accepted string; otherwise none is reachable and the language is empty.

There are finitely many states, so marks can be added only finitely many times. A start state that already accepts makes the language nonempty via ε. That's an easy boundary case to miss if you only inspect arrows.

## Equivalence becomes a search for disagreement

\(EQ_{DFA}\) asks whether two DFAs accept exactly the same strings. Build a product machine that tracks both states. Make a pair accepting exactly when **one** component accepts and the other rejects. This is exclusive-or, not union and not intersection.

For each input w, the product's final pair records both original verdicts. Thus its language consists exactly of disagreement witnesses. If that language is empty, the machines agree on every string; if nonempty, a member proves they differ. Run the finite emptiness algorithm on the product.

A product accepting when both components accept would answer a different question: whether they share a member. Machines may share many members and still disagree elsewhere.

## The reusable reasoning pattern

Membership used a bounded run on one supplied word. Emptiness used reachability over a finite graph. Equivalence converted universal agreement into absence of a counterexample. These are three different reasons termination is available. Learn the reason, not just the conclusion “decidable.”

**Keep:** machine descriptions are finite inputs; finite graph structure can settle infinitely many possible words at once. Next, CFGs need different finite summaries because their derivations can grow without bound.

**One connected check:** Why does checking accepted strings one by one fail to decide DFA emptiness, while marking finitely many states succeeds?
