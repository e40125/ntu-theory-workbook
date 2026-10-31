# Deciding questions about automata: inspect the finite object

## The shift: the input can be a machine description

Until now, a machine usually received a word such as `0011`. It can also receive an encoding of another machine, perhaps together with a word. \(\langle B,w\rangle\) means a finite string describing the pair “machine B and input w.” Angle brackets are encoding notation, not a transition or a set.

For \(A_{DFA}\), the question is whether the encoded DFA B accepts w. A decider checks the encoding, simulates one transition per input symbol, then checks whether the final state is accepting. There are |w| input symbols, so this simulation finishes. Empty w simply asks whether the start state accepts.

The input can be a description of another machine. Think of an inspector reading a device’s wiring diagram. The inspector is one machine; the described device is another. “Accept” means the inspector answered its own question correctly, which might be “does this device accept nothing?” Keep those two jobs separate.

## Round 1 — The input now contains a machine description · pages 1–4

A_DFA={⟨B,w⟩:B is a DFA accepting w}. Read the subscript as the kind of machine being inspected. The outer decider is a TM; its input contains a finite encoding of another machine B and a string w. B is data for this run. It is not the outer decider itself.

Validate the encoding: finite state and alphabet lists, a designated start, accepting states from the state set, exactly one destination for each state/symbol pair, and input w over the declared alphabet. Then simulate B one input symbol at a time. After exactly |w| updates, inspect its state and return accept or reject accordingly. Every table lookup and every input step is finite, so this is a decider.

An input such as ⟨B,w⟩ is one encoded string; the angle brackets mean “description of these objects,” not literal mathematical objects somehow stuffed onto a tape. Invalid encodings can be rejected by convention, making the algorithm defined on all input strings.

## Round 2 — Finite conversion plus a decider gives a decider · pages 5–6

For A_NFA, convert the supplied NFA into its subset DFA and use the previous decider. For A_REX, convert the regular expression into an NFA, then a DFA, then simulate. Each conversion terminates because the source structure is finite and the construction creates finitely many objects.

Exponential size is still finite. Decidability asks whether the algorithm always finishes, not whether it is fast enough to enjoy using. Later complexity theory measures the cost that this argument intentionally leaves open.

## Round 3 — Emptiness reverses the final answer you're tempted to give · pages 7–9

E_DFA asks whether the machine accepts **nothing**. Mark the start state, then mark destinations of arrows leaving marked states until a full pass changes nothing. A marked state is exactly a reachable state. At most |Q| states can be newly marked, so the process stops.

If an accepting state is reachable, some input spells a path to it, so the language is nonempty and the emptiness decider must **reject**. If no accepting state is reachable, accept the emptiness question. The outer machine's acceptance answers the problem statement; it does not imitate the inner DFA's acceptance blindly.

If the start itself accepts, ε witnesses nonemptiness immediately. An accepting circle disconnected from the start does not count. The printed reachability example can be read by its actual edge relation; the invariant, rather than the typography of an intermediate mark list, determines the marked set.

## Round 4 — Compare infinite languages by searching for disagreement · pages 10–12

To decide whether L(A)=L(B), build a product DFA C that accepts exactly when one machine accepts and the other rejects. Its accepting pairs satisfy XOR. The language is the **symmetric difference**:

\[(L(A)\cap\overline{L(B)})\cup(\overline{L(A)}\cap L(B)).\]

A bar means complement relative to the common alphabet's Σ*: all strings not in that language. The complements are easy for complete DFAs: swap accepting/nonaccepting states. If alphabets differ, extend to a common alphabet with rejecting sink behavior first.

Now languages agree exactly when C has no accepted disagreement witness. Run the emptiness decider on C. We did not enumerate infinitely many strings; we explored finitely many pairs of states that summarize all possible prefixes. This is the payoff of the finite-state mental model: an infinite language question can collapse to a finite graph question.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
