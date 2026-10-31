Aight, put the pieces back into one story: what information is needed, how the chosen model stores it, and which argument connects its behavior to the target.

This page connects the whole map. Use it after the worked lessons, or jump to a missing definition from another lesson. It is a summary with proof ideas, not a replacement for producing the constructions yourself.

## Three levels of memory

**Finite automata:** finite state only. DFA, NFA, and regular expressions describe the regular languages. An NFA can branch but does not gain language-recognition power over a DFA.

**Pushdown automata:** finite control plus one unbounded stack. Nondeterministic PDAs and CFGs describe the context-free languages. Every regular language is context-free: a PDA can simulate a DFA while ignoring its stack. Some context-free languages, such as 0ⁿ1ⁿ, are not regular. DPDAs recognize a proper subclass of CFLs.

**Turing machines:** rewritable tape with a moving head. Multitape and nondeterministic variants have the same recognition power as ordinary deterministic TMs. Deciders halt on every input; recognizers may loop on nonmembers. The ability to simulate another model establishes containment; separating examples establish that a containment is strict.

The published course explicitly omits the detailed non-context-free-language discussion at the end of PDA 5. CFL pumping was absent as a direct task in the six inspected Midterm 2 papers. It is not part of this site's core practice route unless current class information adds it. Regular-language pumping is a separate theorem and must not be used to prove a language is not context-free.

## Regular-language closure: what “closed” means

A class is **closed under an operation** if applying that operation to languages in the class always produces another language in the class. “Open” is not the usual opposite term here; say “not closed.” One result being regular does not establish closure of the whole class.

| Inputs regular | Result | Construction / proof idea |
|---|---|---|
| A,B | A∪B regular | NFA with fresh ε-branching start |
| A,B | A∩B regular | Product DFA tracks both states; accept when both accept |
| A,B | AB regular | NFA ε-links from A's finals to B's start |
| A | A* regular | Fresh accepting start; enter A and repeat from its finals |
| A | Complement regular | In a complete DFA over fixed Σ, swap accepting and rejecting states |
| A,B | A−B regular | Intersect A with complement of B |

For the product, after reading w the state is (state of M_A after w, state of M_B after w). This invariant holds initially and is preserved by each paired transition. The accepting pair condition therefore implements intersection exactly. For union, accept if either component accepts. Same transitions, changed final set.

Do not complement an NFA by flipping circles: existential acceptance does not become universal rejection that way. Convert to a complete DFA first.

## Regular expressions and GNFA elimination

RE operations are union, concatenation and star. ε denotes the language {ε}; ∅ denotes the empty language. Therefore Rε=R, R∅=∅, R∪∅=R, and ∅*=ε. Concatenation order matters.

Both DFA→GNFA and NFA→GNFA can be done **directly**. Add a new start with an ε edge to the old start, a new sole accept reached by ε from old finals, union parallel edges, and label missing edges ∅. An NFA's symbol and ε labels are already regular expressions. Subset construction is not required for this route.

When removing state k, update each remaining i→j label to

\[R_{ij}\ \cup\ R_{ik}(R_{kk})^*R_{kj}.\]

The old edge handles paths bypassing k. The new term enters k, loops there zero or more times, then leaves. This explains the star and the order. Update from the old labels for that elimination step, not labels partly overwritten during the same step.

## A proof template that travels

For any conversion, write: what does a state/variable/configuration represent; why is that true at the start; how is it preserved by each move/rule; why does the ending condition correspond to membership? For a decider, add why the process halts. For equivalence, cover both directions. For impossibility, identify a property forced by every candidate machine and construct an input that violates it.

The Church–Turing thesis connects the informal notion of an effective algorithm with Turing computation. It is a thesis about that informal notion, not a mathematical theorem proved by checking a few programs. The course's Hilbert deck uses integer-root search to contrast a recognizer with a bounded terminating decision procedure.

## Fresh practice

Someone claims: “A and B are nonregular, so A∪B must be nonregular.” Disprove this using a language L and its complement over the same alphabet, and explain why both can be nonregular.

<details class="solution"><summary>Show the counterexample</summary><p>Take L={0ⁿ1ⁿ | n≥0}, which is nonregular, and its complement over {0,1}*. The complement is also nonregular: if it were regular, closure of regular languages under complement would make L regular, a contradiction. Yet their union is {0,1}*, which is regular. Closure promises concern inputs inside the class; they do not give this claimed rule for nonregular inputs.</p></details>

## Repair the star example without changing its language

Keep the base language fixed as A={01}. Its NFA is u —0→ v —1→ w, with u starting and w accepting. To recognize A*, add a **fresh accepting** start s, an ε arrow s→u, and an ε arrow w→u. Keep w accepting. No other arrows exist.

| State | 0 | 1 | ε | Accepting? |
|---|---|---|---|---|
| s | ∅ | ∅ | {u} | Yes |
| u | {v} | ∅ | ∅ | No |
| v | ∅ | {w} | ∅ | No |
| w | ∅ | ∅ | {u} | Yes |

The fresh s accepts ε. A completed `01` finishes at w and may begin another complete copy through u. The strings `01` and `0101` accept; `001` and `01001` reject. There is **no zero self-loop** here. Adding a zero self-loop at u would make `001` possible; that would change the language and break this construction. The accepting new start does not grant arbitrary extra input a free pass: some path still has to consume the entire input.
