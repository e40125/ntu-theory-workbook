This direction looks scarier because one grammar variable represents an entire **balanced piece of a computation**, not one machine state. The recipe is mechanical once that meaning is clear. It appears on all six inspected Midterm 2 papers.

## First normalize the PDA

The course construction requires: one accepting state; empty stack on acceptance; each transition pushes one symbol or pops one symbol, never both and never neither.

A general final-state PDA doesn't automatically have these properties. Use a fresh bottom marker $ and a new start that pushes it. From each old accepting state, allow an ε move into a new **drain state**. The drain pops working symbols, then pops $ into the sole new accept state. Old accepting states cease to be accepting.

Why a separate drain? If you add free pops to the old states, the machine may throw away stack data and then continue its ordinary input-reading transitions, accepting extra strings. Once in the drain, it must never return to the computation. Entering the drain early cannot accept a longer input because the drain consumes no more real input.

A replace transition a,X→Y becomes a,X→ε into a private intermediate state, then ε,ε→Y into the destination. A no-stack-change transition a,ε→ε becomes a,ε→D followed by ε,D→ε through a private intermediate state, using a permitted dummy symbol D. Respect restrictions on Γ and on extra states; past questions often require reusing available symbols or states. A fresh marker is the safe unrestricted construction, not permission to violate a constrained problem.

## What Aₚq means

For each ordered state pair p,q, make a variable Aₚq. It generates strings that can carry the machine from p to q with no net stack change **while leaving any pre-existing stack below that computation untouched**. Merely returning to the same stack after messing with its old contents is not the intended balanced segment.

The grammar's start is Aₛf, where s is the normalized start and f the sole accept state. If there are four PDA states, there are 4×4=16 variables. **Sixteen variables is not sixteen steps and not a requirement to draw a sixteen-state automaton.** Each variable names a different start/end pair.

## The three families of rules

1. **Do nothing:** Aₚp→ε for every p.
2. **Join two balanced segments:** Aₚq→AₚrAᵣq for every p,q,r.
3. **Wrap a balanced middle with a matching push/pop:** if p —a,ε→t→ r and s —b,t→ε→ q, add

\[A_{pq}\to aA_{rs}b.\]

Read it in time order: push t while consuming a; do a balanced middle from r to s above that t; pop the same t while consuming b. The outer variable uses **p,q**, the whole segment's endpoints. The inner variable uses **r,s**, the states after the push and before the pop.

a or b may be ε; erase that ε when writing the right side. The stack symbol t is not copied into the generated string. The grammar generates the **input labels**, not the stack history.

## Work the actual slide example

PDA 4 pages 7–10 uses start 1, accept 4, and these moves:

```
1 — ε,ε→$ → 2
2 — 0,ε→0 → 2
2 — 1,0→ε → 3
3 — 1,0→ε → 3
3 — ε,$→ε → 4
```

This language is 0ⁿ1ⁿ with n≥1. State 1 is not accepting, and there is no zero-pair shortcut.

For each stack symbol, list **every push × every pop** of that symbol:

| Stack symbol | Push p→r / input a | Pop s→q / input b | Rule |
|---|---|---|---|
| $ | 1→2 / ε | 3→4 / ε | A₁₄→A₂₃ |
| 0 | 2→2 / 0 | 2→3 / 1 | A₂₃→0A₂₂1 |
| 0 | 2→2 / 0 | 3→3 / 1 | A₂₃→0A₂₃1 |

Then include Aₚq→AₚrAᵣq for all 4³=64 triples and Aₚp→ε for all four p. You may specify these families symbolically unless the question demands listing every rule. If it asks only the wrapped rules, supply only that requested family plus the pairing table; don't waste the exam writing 64 unrelated rows.

Trace a derivation: A₁₄⇒A₂₃⇒0A₂₃1⇒00A₂₂11⇒0011. A₂₂→ε closes the innermost balanced segment.

## Why the rule families are sufficient

In a nonempty balanced computation, either the stack returns to its initial level at an intermediate point, splitting the run into two balanced segments, or it first pushes a symbol that stays under the middle until the matching final pop. These are the join and wrap cases. Induction on computation length supplies a derivation. Conversely, each grammar rule combines actual balanced runs, so induction on the derivation yields a valid run. The start/end normalization then makes generated strings exactly accepted inputs.

## Fresh practice

There are push moves 1 —a,ε→X→ 2 and 2 —ε,ε→X→ 3, and pop moves 4 —b,X→ε→ 5 and 3 —ε,X→ε→ 4. List every wrapped rule caused by X.

<details class="solution"><summary>Show the four pairings</summary><p>A₁₅→aA₂₄b; A₁₄→aA₂₃; A₂₅→A₃₄b; A₂₄→A₃₃. Two pushes times two pops gives four pairings. Do not omit a pairing because you can't immediately imagine a successful middle; a variable with no terminal derivation simply contributes no strings.</p></details>
