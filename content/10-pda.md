The stack remembers the unfinished obligation; the state remembers the phase. Write both meanings first, then build the transitions that maintain them.

A PDA is an NFA with a **stack**. The stack can grow without a fixed bound, but only its top is accessible. Last item pushed is first item popped. That restriction is why it naturally matches nested structures and reversed strings.

## Decode one arrow completely

An arrow labeled `1, 0 → ε` means: consume input `1`; require and remove a `0` at the stack top; push nothing. Three positions, three different jobs.

| Label | Input action | Stack action |
|---|---|---|
| `0, ε → 0` | Read one 0 | Push 0; do not pop |
| `ε, $ → ε` | Read nothing | Require and pop $ |
| `ε, ε → $` | Read nothing | Push $ without checking the top |
| `a, X → Y` | Read a | Pop X, then push Y |
| `ε, ε → ε` | Read nothing | Leave the stack unchanged |

**ε in the pop position means “do not pop,” not “the stack must be empty.”** This is crucial. Otherwise the ordinary push loop would stop after pushing its first symbol. A bottom marker like $ lets you recognize when all the working symbols above it have been removed.

## Build a full machine for 0ⁿ1ⁿ

We use a small teaching variant of the course example, allowing n=0. Name states s (initialize), p (push zeros), r (read ones and pop), f (finish). Start s, accept only f. Stack alphabet Γ={0,$}.

| From | Label | To | Reason |
|---|---|---|---|
| s | ε,ε→$ | p | Put down the bottom marker |
| p | 0,ε→0 | p | Remember one unmatched zero |
| p | ε,ε→ε | r | Guess the zero block has ended |
| r | 1,0→ε | r | Match one earlier zero |
| r | ε,$→ε | f | Finish only after all zeros are matched |

No other transitions exist. In particular, r has no input-0 move. That's how the machine enforces **order**, rather than merely equal counts. It can guess the phase change too early; that branch dies when it cannot read the remaining input. A correct guess exists exactly when the string has the right shape and counts.

Trace `0011`, with stack top written on the **left**:

```
(s, 0011, ε)
(p, 0011, $)      initialize
(p, 011, 0$)     read first 0
(p, 11, 00$)     read second 0
(r, 11, 00$)     switch phase, consume nothing
(r, 1, 0$)       read first 1
(r, ε, $)        read second 1
(f, ε, ε)        pop $, accept
```

The triple is (state, unread input, stack contents). A stack is an **ordered string**, not a set: `01$` and `10$` are different. Course drawings sometimes use braces around stack contents; their written order still matters.

On `001`, one 0 remains after the input ends; the marker isn't on top, so f cannot be reached. On `0101`, after entering r and reading the first 1, there is no move to consume the next 0. On ε, s→p→r→f consumes no symbols and accepts, as n=0 requires.

## Formal definition

\(P=(Q,\Sigma,\Gamma,\delta,s,F)\), where Q={s,p,r,f}, Σ={0,1}, Γ={0,$}, F={f}. The five rows above define δ: for example \(\delta(r,1,0)=\{(r,\varepsilon)\}\). All unspecified entries are ∅.

The type is \(\delta:Q\times\Sigma_\varepsilon\times\Gamma_\varepsilon\to\mathcal P(Q\times\Gamma_\varepsilon)\). An output is a **set of (next state, symbol to push) pairs**. The input tells it what to pop; the output tells it what to push. This is why merely writing `{r}` loses part of the information.

## Why it recognizes exactly the target

Any accepting run first reads only zeros in p and then only ones in r. Each zero adds one marker; each one removes one marker. Reaching f requires all markers removed, so the counts agree. Conversely, for 0ⁿ1ⁿ, push n times, switch, pop n times, then pop $. This is an accepting run, including n=0. Both directions are covered.

## Fresh practice

Modify the machine to recognize 0ⁿ1²ⁿ, n≥0. Each zero must eventually pay for two ones. Give a transition list and explain any new state.

<details class="solution"><summary>Show one construction</summary><p>Keep s,p,r,f and add t. Push one 0 for each zero as before. In r, on input 1 pop 0 and move to t. In t, on input 1 pop nothing and push nothing, return to r. Only r may pop $ and enter f. Each loop r→t→r consumes exactly two ones per stack marker, so a string ending after an odd number of ones cannot finish. The original zero phase and the ε case remain valid. This is a PDA construction, not a claim that it satisfies the later normalization conditions.</p></details>
