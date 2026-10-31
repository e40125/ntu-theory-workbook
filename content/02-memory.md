Now make the memory earn its place. Give each state a sentence explaining what it knows; then each arrow becomes an update to that sentence instead of a guess.

A state is the machine's **current memory summary**. The circle is how we draw it. The name inside could be S, q₀, or 17; the name itself does not do the work. The transitions and accepting labels do.

## A complete DFA for exactly `1`

Target: \(E=\{1\}\), input alphabet \(\{0,1\}\). We need to accept exactly one input. Ask what information matters after each prefix:

- **S:** nothing has been read yet.
- **A:** the entire prefix read so far is exactly `1`.
- **D:** the prefix cannot possibly be completed into exactly `1`.

| Current state | Read 0 | Read 1 | Accept if input ends here? |
|---|---|---|---|
| S | D | A | No |
| A | D | D | Yes |
| D | D | D | No |

<div class="machine-diagram" data-diagram="exact-one"></div>

Read `11`: start at S; first `1` takes you to A; second `1` takes you to D. You reject **where you finish**, not because you happened to pass through an accept state. The dead state loops on both symbols because extra input cannot fix an already-too-long string.

For `ε`, there are no moves and the machine stays at S, so it rejects. The start state matters even when nothing happens.

## The five-part definition, with actual objects

\(M=(Q,\Sigma,\delta,q_0,F)\):

1. Q = {S,A,D}: all the states.
2. Σ = {0,1}: input symbols.
3. δ: the transition function, here given by the table.
4. q₀ = S: one designated start state.
5. F = {A}: the set of accepting states.

A DFA can have **many accepting states**. “One next state” describes each transition's output, not how many states can be in F. Formally \(\delta:Q\times\Sigma\to Q\): give it one current state and one symbol; get one next state. A start state is one element of Q; that element can itself have a set-shaped label after a conversion. The label `{q₀,q₁}` can name **one** DFA state.

## NFA: several possible runs

An NFA transition returns a **set** of possible next states. Its type is \(\delta:Q\times\Sigma_\varepsilon\to\mathcal P(Q)\). Here \(\Sigma_\varepsilon=\Sigma\cup\{\varepsilon\}\); an ε move consumes no input. \(\mathcal P(Q)\) means all subsets of Q, including the empty set. For Q={u,v}, these are ∅, {u}, {v}, {u,v}.

So an entry `{v}` says “the available destinations form the set containing v.” Writing just v has the wrong type for this table. ∅ says that branch has no matching move. It does **not** add a mysterious extra NFA state called “null.”

Acceptance means at least one run reads **the whole input** and finishes accepting, with ε moves allowed. A dead branch doesn't kill the other branches. An ε arrow is optional; it does not force the machine to ignore a symbol arrow.

## Subset construction, from scratch

Take the NFA with start u, accept v, and only arrow u —1→ v. The DFA tracks a set of current NFA possibilities. From {u}, `1` reaches {v}; `0` reaches ∅. From {v}, either symbol reaches ∅. From ∅, either symbol stays ∅.

| Set naming a DFA state | 0 | 1 | Accepting? |
|---|---|---|---|
| {u} | ∅ | {v} | No |
| {v} | ∅ | ∅ | Yes |
| {u,v} | ∅ | {v} | Yes |
| ∅ | ∅ | ∅ | No |

The full power-set construction has four states. {u,v} is unreachable from {u}, so deleting it gives our three-state DFA. If a question requires the full prescribed construction, show all subsets first and then explain deletion. Reachable-only exploration is an efficient computation method, but it doesn't replace an explicitly requested four-state diagram.

With ε arrows, define **ε-closure** E(S): include S and everything reachable using only ε moves, repeatedly. Start at E({q₀}). For each real symbol, collect matching destinations from every current state, then take closure. Don't retain old states merely because they were there before.

## Why this is the foundation for Midterm 2

A DFA has only finitely many memory summaries. A PDA adds a stack. A TM adds a rewritable tape and a head. The pumping argument asks what must happen when finitely many states face a sufficiently long input. Machine conversion asks how another representation can preserve the same decisions. Same game, different memory.

**Fresh task:** change the target to “all strings ending in 1.” Give state meanings and a complete table. Explain why `11` now accepts.

<details class="solution"><summary>Show the worked answer</summary><p>Use N: empty or ends in 0, and Y: ends in 1. Start N; accept Y. From either state, 0 goes to N and 1 goes to Y. On 11 the run is N→Y→Y. This language is different from {1}: it allows arbitrary earlier symbols. The table has exactly one destination for each state/symbol pair.</p></details>
