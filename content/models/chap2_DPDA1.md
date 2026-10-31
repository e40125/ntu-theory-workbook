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
