“Deterministic” means there is no choice between simultaneously applicable moves. For PDAs, checking only “one destination per table cell” is not enough: an input move and an ε move in different cells can both be applicable.

## The four-way conflict

Suppose the current state is q, next input symbol is a, and top stack symbol is X. All four kinds of transitions could apply:

\[\delta(q,a,X),\quad\delta(q,a,\varepsilon),\quad\delta(q,\varepsilon,X),\quad\delta(q,\varepsilon,\varepsilon).\]

They respectively read/pop, read/no-pop, no-read/pop, no-read/no-pop. Recall that “no-pop” does not mean “stack empty.” Therefore δ(q,0,ε) and δ(q,ε,$) conflict when the next input is 0 and the stack top is $. Different columns don't save you.

The **course convention**, DPDA 1 page 4, requires exactly one of these four entries to be nonempty for each q,a,X, with a∈Σ and X∈Γ. Entries output a single pair (state,push-symbol), not a set of pairs. Reject-state completion is used for missing combinations. Other texts often use a partial-transition “at most one” formulation; follow this course's table convention on its exams.

## A complete small example

Language: \(B=\{0^m1^n\mid m\geq n\geq0\}\), from 2020 Problem 2. Let q₀ push a 0 on each input 0. On the first 1, pop a 0 and enter q₁. In q₁, each 1 pops a 0. A later 0 must reject because block order would break. Both q₀ and q₁ are accepting: leftover zeros are allowed, and n may be zero.

With stack alphabet Γ={0}, the nonempty DPDA entries are:

| State | Input | Pop | Output |
|---|---|---|---|
| q₀ | 0 | ε | (q₀,0) |
| q₀ | 1 | 0 | (q₁,ε) |
| q₁ | 0 | ε | (qᵣ,ε) |
| q₁ | 1 | 0 | (q₁,ε) |
| qᵣ | ε | ε | (qᵣ,ε) |

All other entries are ∅. For each real input symbol and possible stack top 0, exactly one relevant entry is nonempty. If the stack is actually empty and the next symbol is 1, the pop-0 instruction can't be executed, so the input is rejected. The sink's ε loop is rejection by failing to read the remaining input; qᵣ is never accepting.

For `001`, the run ends in q₁ with one 0 still on the stack. It accepts. **Final-state PDA acceptance does not generally require an empty stack.** We enforce empty-stack finishing in some constructions because that particular language or conversion needs it.

## Why a PDA is not always convertible to an equivalent DPDA

DFA and NFA recognize the same languages. PDA and DPDA do not: deterministic context-free languages form a proper subclass of context-free languages. Subset construction cannot solve this by making each possible stack configuration a finite state; stacks have unbounded length, so there may be infinitely many configurations.

A fixed stack bound is different. If a PDA is guaranteed to use at most m stack cells, there are finitely many stack strings, and an NFA can use states (q,stack). Start (q₀,ε), accept all pairs whose q is accepting, and simulate each legal stack update. This is the idea behind 2022 Problem 4(b). The bound must be uniform over all inputs; saying each individual run uses finitely many cells is not enough.

## Fresh practice

At q, transitions include 0,ε→0 looping to q and ε,$→ε going to an accept state. Explain a concrete configuration where the machine has two applicable choices. Does putting each move into a different table column fix it?

<details class="solution"><summary>Show the reasoning</summary><p>Use configuration (q,0,$). The 0 move can consume the next symbol and push 0 without popping. The ε move can instead pop $. Both are applicable before the same input symbol. The columns are δ(q,0,ε) and δ(q,ε,$); they belong to the same four-way conflict check. Separate columns do not make the computation deterministic. A repair must preserve the language while removing that simultaneous choice, often by changing where empty or zero-only strings are accepted.</p></details>
