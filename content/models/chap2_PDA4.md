# PDA to CFG: name a balanced stretch of computation

## What the sixteen variables are actually for

With four PDA states, the standard conversion introduces one variable Aₚᵩ for each ordered pair of states p,q: 4×4=16 variables. That does **not** mean the PDA suddenly has sixteen states. We are building a grammar whose variables summarize different kinds of journey through the original machine.

Aₚᵩ means: strings consumed by a run that starts in p with an empty stack and ends in q with an empty stack. The same run pattern can sit above a protected existing stack: it may build and clear extra work but never pop below that baseline. Merely having the same stack at both endpoints is not enough if the run disturbed the protected contents in between.

The PDA first needs a single accepting state, empty-stack completion, and transitions that each push or pop one symbol. The next deck explains that normalization carefully.

Think of a balanced segment as a subroutine that promises: “Whatever stack was underneath me, I'll leave it alone and clean up everything I add.” Aₚᵩ names that contract together with its entry and exit states. The grammar doesn't store a stack snapshot. It describes strings that can be read while honoring that contract.

## Two ways a balanced journey can be built

A balanced journey can consist of two balanced journeys in sequence. If r is the intermediate state, add

\[A_{pq}\to A_{pr}A_{rq}.\]

The right side says: do p→r work, then r→q work. For each p,q,r, this is a possible decomposition. It doesn't say every input takes every route.

Or the journey pushes a symbol t, performs some balanced work above it, then pops that same t. If a push transition goes p→r while consuming a, and a matching pop goes s→q while consuming b, add

\[A_{pq}\to aA_{rs}b.\]

a and b may be ε. The inner variable covers the part between the push and its matching pop. The pushed symbol's identity must match; a push of `0` cannot be paired with a pop of `$` just because the state arrows line up.

Finally Aₚₚ→ε permits doing nothing: same start and end state, no stack change, no input consumed.

## Work the deck's four-state example

The normalized machine for positive \(0^n1^n\) pushes `$` from state 1 to 2, pushes zeros in state 2, begins popping zeros on the move to state 3, continues popping there, and pops `$` from 3 to accepting 4.

Pair the outside `$` push and pop: \(A_{14}\to A_{23}\). Their input labels are both ε, so nothing is printed around the inner variable.

Pair a zero push 2→2 with the zero pop 3→3: \(A_{23}\to0A_{23}1\). Pair that push with the first zero pop 2→3: \(A_{23}\to0A_{22}1\). Use A₂₂→ε to finish the smallest balanced interior.

Now derive `0011`:

\[A_{14}\Rightarrow A_{23}\Rightarrow0A_{23}1\Rightarrow00A_{22}11\Rightarrow0011.\]

Every rule is tied to an actual push/pop pair. The matching grammar nesting reflects matching stack lifetimes.

## Decode the four subscripts by their jobs

| Letter | Where it sits in the wrapped run |
|---|---|
| p | before the outside push |
| r | immediately after that push |
| s | immediately before its matching pop |
| q | after that pop |

So Aₚᵩ names the **whole** wrapped journey, while Aᵣₛ names just the **inside**. The source's table lists p,r,s,q in this order to keep those roles visible. The p and q in one rule are allowed to coincide with other listed states; these letters name roles, not necessarily four distinct circles.

With four states, the full construction also lists 4³=64 concatenation rules, one for each choice of p,q,r, and four Aₚₚ→ε rules. An exam may require the complete construction even if most variables later prove useless. Counts come from choices of endpoints and middle states, not from new PDA states appearing out of nowhere.

## Why the general construction needs concatenation too

A run may return to its baseline halfway through, then start a new balanced section. That isn't one push wrapped around the entire run. The concatenation rules capture these side-by-side sections. If a nonempty balanced run has no intermediate return to baseline, its first push must be matched by its final pop, which gives the wrapping case. This decomposition supports an induction on run length.

The reverse direction follows the grammar: empty rule does nothing; concatenation joins two valid runs; wrapping adds a matching push and pop around a valid inner run. That establishes exact correspondence, not just a few example strings.

**Keep:** Aₚᵩ is a name for balanced work between states. Four states give sixteen such names because both endpoints matter.

**One connected check:** In Aₚᵩ→aAᵣₛb, which two transitions determine p,r,s,q, and why must their stack symbols agree?
