A PDA's live situation is **state + unread input + full ordered stack**. Two branches at the same state can have different stacks and futures. Combining them into one state-only set throws away the very memory the machine uses.

## One path versus the whole tree

For an NFA or PDA, one complete accepting path proves acceptance. To prove rejection by tracing, every possible path must fail. When the question specifically requests a **simulation tree**, draw the branching even if you already see a winning path. The 2020 and 2022 solutions explicitly penalize replacing the requested tree with a single path. The 2025 comment-parser question, in contrast, explicitly asks only for an accepting path. Read the deliverable.

## Worked branching example: even palindromes

Target: \(\{ww^R\mid w\in\{0,1\}^*\}\), where wᴿ is w reversed. Use start s, push state p, compare state r, accept f. Initialize $; in p, read 0 or 1 and push that same symbol. At any point take ε,ε→ε to r. In r read 0 only while popping 0, or read 1 only while popping 1. Pop $ with ε to reach f.

The guess is the middle. For input `0110`, the useful guesses are:

| Symbols pushed before switching | Stack just after switch | What happens |
|---:|---|---|
| 0 | $ | Can't consume the first 0 in r; an early f has unread input |
| 1 | 0$ | Next input is 1, but top is 0; branch dies |
| 2 | 10$ | Read 1, then 0, then pop $; accepts |
| 3 | 110$ | Next input is 0, top is 1; branch dies |
| 4 | 0110$ | Input is exhausted with working symbols still stacked; cannot reach f |

The stack `10$` means 1 on top of 0. It is not the integer ten and not a set. The accepting branch is

```
(s,0110,ε) → (p,0110,$) → (p,110,0$)
→ (p,10,10$) → (r,10,10$)
→ (r,0,0$) → (r,ε,$) → (f,ε,ε).
```

<figure class="lab" data-lab="pda"><figcaption>Trace the same palindrome PDA. Every listed branch comes from a different midpoint guess.</figcaption></figure>

## Turn this into a tree on paper

Write the initial configuration. Add every applicable ε move at that input position, each as its own child. For each current branch, consume the next symbol along every compatible transition, including its stack update. Continue its ε moves. Mark dead ends where no compatible move exists. Keep input position explicit so ε moves don't accidentally consume a character.

For this particular machine, pushing then guessing creates a finite tree with at most one switch point per prefix. General PDAs may have ε loops or unbounded ε pushes; blind “keep taking ε until done” may not terminate. A finite simulator cutoff then means **inconclusive**, not rejection.

## Reading a language from a diagram

Explain phases, not just nodes. Which input block is read before the transition to the next phase? What is pushed? What later pops it? Does a mandatory arrow require at least one symbol? What must be on top to reach the final state? Then combine the resulting count and order constraints.

For example, if a zero pushes two markers and each later one nondeterministically pops one, two, or three, successful emptying says 2m=c₁+⋯+cₙ with cᵢ∈{1,2,3}. Hence n≤2m≤3n. To prove the reverse direction, you must also show that every integer in that range can be expressed by n choices. The 2022 paper asks for that proof separately; don't skip it.

## Fresh practice

Trace all midpoint guesses for `010` in the palindrome machine. Then explain why changing the target to **all** palindromes needs a new option.

<details class="solution"><summary>Show the answer</summary><p>Switching after 0 pushed symbols cannot consume the first 0; after 1, the next 1 mismatches top 0; after 2, the next 0 mismatches top 1; after 3, the input ends with working stack symbols remaining. No accepting run exists. This machine recognizes even palindromes only. To include odd palindromes, add p→r moves that consume one middle symbol without changing the stack (0,ε→ε and 1,ε→ε). The central symbol has no partner. The original ε switch handles the even case.</p></details>

**Keep:** acceptance is existential, a requested tree is still a tree, and an accepting state reached before the input ends is not yet acceptance of the full string.
