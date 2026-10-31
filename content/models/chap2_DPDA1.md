# DPDA: determinism is about competing enabled moves

## One table cell isn't the whole decision

For a DFA, the current state and next input symbol select exactly one move. For a PDA, a move may read input or ε, and may pop the top or ε. Several differently labeled transitions can therefore be enabled at the **same situation**. Determinism must rule out those competing actions, not merely forbid two answers in one cell.

Suppose the machine is in q, the next input is `0`, and the stack top is X. It could potentially use any of these:

| Transition lookup | What it would do |
|---|---|
| δ(q,0,X) | read the zero and pop X |
| δ(q,0,ε) | read the zero without popping |
| δ(q,ε,X) | pop X without reading |
| δ(q,ε,ε) | move without reading or popping |

If two are available, the machine has a choice right now. Different labels do not make that choice disappear.

Imagine two buttons available at once: read the next symbol, or take a free ε move. Each button may have only one destination, but you still have a choice between buttons. Determinism must eliminate that competition too. Counting destinations inside separate table cells does not settle which actions are simultaneously available.

## Round 1 — Determinism means one enabled action, not one arrow per label · pages 1–4

An NFA's nondeterminism can be compiled into a finite checklist because its possible states come from a fixed finite set. A PDA's configurations include arbitrarily long stacks. The analogous collection need not fit into finitely many states with one deterministic stack. The theorem is that deterministic context-free languages form a proper subfamily of context-free languages; this observation motivates it but is not the full separation proof.

The DPDA transition output is one pair `(next state, pushed symbol)` or ∅ for undefined. It no longer returns an arbitrary set of pairs. But that alone does not prevent conflicting moves, because ε moves can compete with symbol-consuming moves.

For current state q, upcoming actual symbol a and actual top x, four table entries could apply: δ(q,a,x), δ(q,a,ε), δ(q,ε,x), δ(q,ε,ε). They correspond to inspect both; read input without inspecting stack; inspect stack without reading input; inspect neither. If two were available, the machine would still have a choice even though each individual cell contained one output.

The course uses an **exactly-one-defined** condition for every q,a,x with a∈Σ and x∈Γ. Other presentations use an at-most-one condition with partial transitions. For the exam, use this course's stated convention. Exactly one is stronger: a situation with all four entries empty needs completion, usually through rejection. Do not swap conventions halfway through a construction.

## Round 2 — ε in a pop slot does not ask whether the stack is empty

This deserves its own sentence because it causes so much trouble: `ε` in the pop slot means **no stack symbol is required or removed**. That move can apply when the stack is nonempty too. Therefore it competes with an x-pop move when x is actually on top. Similarly, an ε-input move may be available while real input remains.

The four-way condition quantifies actual x∈Γ. An empty stack has no actual top x. Only no-pop alternatives can work there; a defined pop transition cannot conjure a symbol out of emptiness. Determinism does not mean every input must successfully finish.

## Round 3 — Two ways the unique run can fail · pages 5–6

First source example: the only defined action is an ε-input move that pops 0. With input `0` and empty stack, it cannot execute because the required 0 is absent. No input gets consumed, and the run is stuck. That rejects the input.

Second example: the only available action consumes ε, pops nothing and pushes 1. It can repeat forever, producing 1,11,111,… on the stack while the input `0` never advances. There is a unique infinite run, but no accepting computation consuming the whole input. This also fails to accept.

For acceptance, retain the course's end-of-input accepting-state condition; for a nonempty input, reaching an accepting state before consuming all symbols is insufficient. A failed or looping path is not transformed into success by the label “deterministic.” Later, when discussing Turing machines, we will distinguish explicitly rejecting from looping. Keep that distinction separate from the language-level fact that both are nonacceptance.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Read the course definition precisely

This course's DPDA definition requires **exactly one** of those four entries to be nonempty, for every state q, input symbol a, and stack symbol x. Each nonempty entry returns one pair `(next state, symbol to push)` rather than a set of alternative pairs.

Some treatments use “at most one” and permit partial transitions. For these slides and exam questions, use the stated exactly-one convention. The next deck completes missing cases with rejecting behavior.

An entry equal to ∅ means there is no transition. A pair such as `(r,ε)` is an actual transition to r that pushes nothing. Those are very different: no action versus a legal action with no push.

## Work one collision

Suppose δ(q,0,ε)=(r,X): read `0`, push X. Also suppose δ(q,ε,X)=(s,ε): pop X without reading. When the next input is `0` and the current top is X, **both** can run. One consumes input and increases the stack; the other consumes nothing and decreases it. Each individual entry has one output, but the machine is nondeterministic.

To repair the design, the state must distinguish the phases in which those actions are allowed, or one of the conflicting moves must be removed while preserving the intended language. Writing the arrows farther apart on the page doesn't fix the collision.

## Deterministic does not mean “will accept or reject quickly”

An ε cycle may keep running without consuming the next input symbol. A configuration may become stuck when the input or stack is empty and its required action is unavailable. The four-way condition is stated over actual alphabet symbols; ε is the no-consumption option, not a real member of the input alphabet.

Acceptance is still about a computation that has consumed the whole input and is in an accepting state. Visiting an accepting state while unread input remains isn't enough. This is unlike a Turing machine's accepting halt state, which will be introduced later.

## The broader connection

Nondeterminism adds no language-recognition power to DFAs versus NFAs, but deterministic PDAs are more restricted than general PDAs. A stack does not make every midpoint guess deterministic. The absence of a visible separator can matter because the machine may not know when to stop pushing and start popping.

**Keep:** check the four entries together for every concrete situation. The source's definition controls the required completeness. Next we apply that test to the counted-block PDA.

**One connected check:** Why can an ε transition conflict with a `0` transition even though ε and `0` are different labels?
