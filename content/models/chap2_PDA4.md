# PDA to CFG: name a balanced stretch of computation

## What the sixteen variables are actually for

With four PDA states, the standard conversion introduces one variable Aₚᵩ for each ordered pair of states p,q: 4×4=16 variables. That does **not** mean the PDA suddenly has sixteen states. We are building a grammar whose variables summarize different kinds of journey through the original machine.

Aₚᵩ means: strings consumed by a run that starts in p with an empty stack and ends in q with an empty stack. The same run pattern can sit above a protected existing stack: it may build and clear extra work but never pop below that baseline. Merely having the same stack at both endpoints is not enough if the run disturbed the protected contents in between.

The PDA first needs a single accepting state, empty-stack completion, and transitions that each push or pop one symbol. The next deck explains that normalization carefully.

Think of a balanced segment as a subroutine that promises: “Whatever stack was underneath me, I'll leave it alone and clean up everything I add.” Aₚᵩ names that contract together with its entry and exit states. The grammar doesn't store a stack snapshot. It describes strings that can be read while honoring that contract.

Those subscripts name the start and finish of a whole trip. Imagine borrowing some workspace, doing a subroutine, then returning with the old workspace untouched. Aₚq names the input consumed by such a trip from p to q. It does not name one arrow. That distinction makes the 16 variables make sense.

## Round 1 — Aₚq describes a whole balanced trip · pages 1–3

A variable Aₚq is one grammar variable whose label contains two state names. It describes input strings consumed by a computation that starts in p, ends in q, and leaves the underlying stack untouched. During the trip, temporary symbols may be pushed and popped, but the computation must never pop below its starting stack height. That's the **protected baseline** condition.

Picture a subroutine borrowing desk space above a sealed folder. It can stack temporary papers and remove them, but must leave the sealed folder intact. Merely ending with a folder that looks the same is not enough if it opened and used the original during the trip. Likewise, equal endpoint stack strings alone do not express the needed condition.

Normalize the PDA to one accepting state, empty stack at acceptance, and transitions that each push or pop one symbol. The next deck explains those modifications. Then A_start,accept describes exactly the complete accepting computations, so it becomes the grammar's start variable.

## Round 2 — The three rule families describe three shapes of trip · pages 3–6

**Do two balanced trips:** Aₚq→AₚrAᵣq. First go p→r while restoring the baseline; then go r→q while restoring it again. The concatenated input spells the whole journey. The intermediate r ranges over every state.

**Wrap a balanced trip in a matching push and pop:** suppose a move p→r consumes a and pushes t, and a move s→q consumes b and pops that same t. Add Aₚq→aAᵣs b. The inner trip r→s operates above the newly pushed t and returns without consuming it. Then the outer pop removes it. a or b may be ε, contributing no terminal.

The four labels have roles: p is before the push; r after it; s before the matching pop; q after it. r and s need not be adjacent states or equal. Pairing a push with every pop of the same stack symbol generates candidate productions; impossible inner trips simply cannot derive terminal strings.

**Do nothing:** Aₚp→ε. With zero moves, start and finish at p with unchanged stack and empty consumed input. It does not imply Aₚq→ε for arbitrary different endpoints.

## Round 3 — The “16 states” confusion is really 16 variables · pages 7–10

The example PDA has four states. Ordered endpoint pairs give 4×4=16 grammar variables A₁₁,…,A₄₄. These are not 16 states of a new PDA. Concatenation rules use triples p,r,q: 4³=64 generated rules before simplification. The formula is compact because listing every one is repetitive; each still has a concrete endpoint meaning.

The bottom-marker push 1→2 and pop 3→4 yield A₁₄→A₂₃, because both consume ε. Pair the zero-push loop at 2 with either zero-pop move, obtaining A₂₃→0A₂₂1 and A₂₃→0A₂₃1. With A₂₂→ε, a derivation is A₁₄⇒A₂₃⇒0A₂₃1⇒00A₂₂11⇒0011. The outer $ pair wraps the whole computation; each inner 0/1 pair matches one pushed zero.

The language here uses n≥1, unlike the earlier n≥0 example: original q₁ is no longer accepting. Reused circle labels do not mean the acceptance condition stayed the same.

## Round 4 — Why those three shapes cover every balanced computation

For soundness, induct on a finite derivation tree. Empty rules do nothing; concatenation joins two valid balanced trips; wrapping performs a matching push, a valid inner trip and its matching pop. Thus each generated string corresponds to a valid computation.

For completeness, induct on the number of transitions in a balanced computation. Zero transitions uses Aₚp→ε. If the stack returns to baseline at an intermediate point, split there and use a concatenation rule on the two shorter trips. If it never returns early, its first push is matched by the last pop; the middle is a shorter balanced trip above that symbol, so use a wrapping rule. Inducting on transitions, rather than input length, matters because ε moves can add transitions without adding characters.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
