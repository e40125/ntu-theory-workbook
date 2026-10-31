# PDA: finite control plus a stack of unfinished obligations

## Why give a machine a stack?

For \(0^n1^n\), after reading n zeros the machine owes n matching ones. A DFA has only finitely many states, so it cannot keep a different state for every possible debt. A PDA adds a stack: a potentially unbounded pile where we can touch only the top. Push one marker per zero; pop one per one. Now the size of the debt is stored outside the finite control.

The state remembers the **phase**—still reading zeros, or already matching ones. The stack remembers the **amount owed**. Mixing those jobs makes diagrams feel random. Separating them makes the arrows follow from the requirement.

Think of each pushed zero as an IOU: “a future `1` must pay for this.” The `$` marker says there are no more IOUs underneath. The control state says whether issuing new IOUs is still allowed. Once payment starts, a new zero isn't “more of the same”; it violates the required block order. That's why we need both the stack **and** the phase state.

Each zero hands the machine an IOU: “you owe me one matching one later.” The stack keeps the unpaid IOUs. The state remembers whether we are still collecting zeros or already paying with ones. Both jobs matter. A balanced total cannot rescue input whose zeros and ones arrived in the wrong order.

## Round 1 — State remembers the phase; stack remembers the debt · pages 1–3

For 0ⁿ1ⁿ, every zero creates an obligation: a matching one must arrive later. Push one marker for each zero; pop one for each one. The finite state records whether we are still reading zeros or have switched to ones. Both pieces matter. Counts alone would wrongly allow `0101`, and phase alone cannot remember an arbitrarily large count.

A **stack** allows access only at its top: last in, first out. A cafeteria plate pile captures this access rule. It does not mean the stack is physically finite in the mathematical model; its alphabet is finite, but the number of stored symbols has no fixed bound. **Push** adds a top symbol; **pop** removes the top symbol; replacing means pop then push. The model cannot reach into the middle and remove whichever marker is convenient.

## Round 2 — Read every field of an arrow · pages 4–9

An arrow `a,b→c` means consume input a, pop stack symbol b, push c, and move to the arrow's destination state. ε in the input field means consume no input. ε in the pop field means do not inspect or remove the top. ε in the push field means add nothing. These are three independent fields. In particular, ε in the pop field is **not an empty-stack test**.

`0,ε→0` reads a zero and pushes a zero. `1,0→ε` reads a one and removes a matching zero. `ε,ε→$` installs a bottom marker without input. `ε,$→ε` removes that marker when it is exposed. $ is a stack symbol, not an input character. It makes “all unmatched zeros are gone” visible through the top-only interface.

Use a configuration record `(state, unread input, stack)` with top written leftmost. For `0011`:

```text
(q₁, 0011, ε)
(q₂, 0011, $)        install bottom marker
(q₂, 011, 0$)        read first zero
(q₂, 11, 00$)        read second zero
(q₃, 1, 0$)          read first one, switch phase
(q₃, ε, $)           read second one
(q₄, ε, ε)           remove marker, accept
```

For `00011`, one zero marker remains after input ends, so the marker-removal move is unavailable and q₄ cannot be reached. For `00111`, matching the two zeros leaves one unread one; reaching q₄ early does not accept the whole input. For ε, q₁ itself accepts. That explains F={q₁,q₄}, including why there can be two accepting states.

## Round 3 — The huge type is only a three-field lookup · pages 8–11

The PDA tuple adds Γ, the stack alphabet, to the finite-state fields. Its transition type is

\[\delta:Q\times\Sigma_\varepsilon\times\Gamma_\varepsilon\to\mathcal P(Q\times\Gamma_\varepsilon).\]

Input: current state, next-input choice, pop requirement. Output: a set of `(next state, symbol to push)` options. The power set permits multiple options or none. Destination entries are pairs because the transition must specify both movement and stack output.

Here Σₑ={0,1,ε} and Γₑ={0,$,ε}. Three input choices times three pop choices gives nine columns per row. That's why the formal table looks wider than an NFA table. Empty cells mean no option. A table of all nonempty transitions plus “all others ∅” can be a complete specification, provided every displayed entry has the correct pair/set format.

The slide sometimes writes stack contents with braces. Read those as ordered stack displays, not mathematical sets: `[0,0,$]` has two zero markers, and their multiplicity matters. Using a string such as `00$` avoids that notation trap.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
