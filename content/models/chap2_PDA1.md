# PDA: finite control plus a stack of unfinished obligations

## Why give a machine a stack?

For \(0^n1^n\), after reading n zeros the machine owes n matching ones. A DFA has only finitely many states, so it cannot keep a different state for every possible debt. A PDA adds a stack: a potentially unbounded pile where we can touch only the top. Push one marker per zero; pop one per one. Now the size of the debt is stored outside the finite control.

The state remembers the **phase**—still reading zeros, or already matching ones. The stack remembers the **amount owed**. Mixing those jobs makes diagrams feel random. Separating them makes the arrows follow from the requirement.

Think of each pushed zero as an IOU: “a future `1` must pay for this.” The `$` marker says there are no more IOUs underneath. The control state says whether issuing new IOUs is still allowed. Once payment starts, a new zero isn't “more of the same”; it violates the required block order. That's why we need both the stack **and** the phase state.

## Build the deck's counted-block machine

Use `$` as a fresh bottom marker. It is a stack symbol, not an input symbol. Push it before processing a nonempty candidate. During the zero phase, each input `0` pushes a `0`. The first `1` changes to the matching phase and pops a `0`. Further ones keep popping. When the top becomes `$`, an ε move can remove it and enter accept.

There are no input-consuming transitions for `0` after the matching phase begins: that enforces block order. There is no matching `1` transition when only `$` remains: that prevents too many ones. The original start is accepting to include ε when n=0.

Trace `0011`, writing the stack **top first**:

| Work completed | Stack | Meaning |
|---|---|---|
| initialize | `$` | no zeros owed yet |
| read first `0` | `0$` | owe one `1` |
| read second `0` | `00$` | owe two |
| read first `1` | `0$` | owe one |
| read second `1` | `$` | debt paid |
| finish by ε move | empty | enter accept with input consumed |

`001` leaves an unpaid marker. `00111` has an extra input symbol after the markers run out. `0101` tries to return to the zero phase. All reject, for different clauses of the language.

## Read an arrow without guessing

A label `a, b → c` says: consume input symbol a, pop stack-top b, push c. ε in the input position consumes nothing. ε in the pop position means **do not pop**, not “test that the stack is empty.” ε in the push position means push nothing.

So `0, ε → 0` reads a zero and adds a marker without removing the old top. `1, 0 → ε` reads a one and removes a zero marker. `ε, $ → ε` tests for and removes the actual bottom marker without reading input.

## The formal symbols describe those three jobs

A PDA is \((Q,\Sigma,\Gamma,\delta,q_0,F)\). Q, Σ, q₀, F still mean states, input alphabet, start, accepting states. Γ is the stack alphabet. The transition type

\[\delta:Q\times\Sigma_\varepsilon\times\Gamma_\varepsilon\to\mathcal P(Q\times\Gamma_\varepsilon)\]

takes a state, an input choice, and a pop choice; returns a **set of (next state, push choice) pairs**. The power set \(\mathcal P\) allows zero, one, or several alternatives. It is not an unordered representation of the stack—the stack itself remains ordered.

Acceptance requires some run to consume **all input** and finish in an accepting state. General final-state acceptance does not also require an empty stack; this construction uses `$` to enforce the intended balance before accepting.

**Keep:** state = phase; stack = ordered pending obligations. Next we use nondeterminism when the input does not tell us which obligation to check or where the midpoint lies.

**One connected check:** For `001`, which obligation is still on the stack, and why does entering an accepting state early not magically consume it or the remaining input?
