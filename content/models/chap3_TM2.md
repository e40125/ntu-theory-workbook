# Repeated halving: encode a numerical test as marking passes

## Read the language before reading the arrows

The deck's language is \(\{0^{2^n}:n\ge0\}\). The number of zeros must be a power of two: 1, 2, 4, 8, 16, … . This is **not** \(0^{2n}\), which describes even lengths. `000000` has even length six, but six is not a power of two. ε has length zero and is also excluded.

The numerical idea is simple: one is a power of two; a larger odd count isn't; a larger even count is a power of two exactly when its half is. So repeatedly halve an even count until either one remains or an odd count greater than one appears.

The tape is doing the counting for us. The finite controller only needs to remember “keep this one” versus “cross this one out.” So the trick isn't stuffing the number eight or eight billion into a state label; it's leaving the work distributed across the tape and shrinking it by a rule we can justify.

## How a tape implements “halve the count”

Scan the live zeros and mark every other one. States alternate between “keep the next live zero” and “cross out the next live zero.” Marks are ignored on later passes; they are old work, not new zeros. The head returns to the left boundary to start another pass.

The state alternation records parity during one sweep. It does not store the whole count. The surviving unmarked cells carry the reduced count between sweeps. This is a recurring theme: use finite control for a small phase distinction, external memory for an unbounded amount.

## Follow numbers first, then align with the actual diagram

For eight zeros, the conceptual counts go 8→4→2→1, so accept. For six, they go 6→3, so reject on the odd count greater than one. For one zero, accept without demanding an even count. That last exception matters: “reject all odd counts” would reject the successful stopping condition too.

The slide machine has a representation detail: it erases the first zero to make a left marker and treats that reserved contribution as part of the represented count. Consequently, the remaining visible live zeros represent **the current count minus one**. Don't stare at a row with three visible live zeros and conclude the represented count must be three; it may represent four under this convention.

In the diagram, q₂ begins a pass by marking the first remaining live zero, q₃ and q₄ alternate through subsequent live zeros, and q₅ returns left. The one-zero case is detected when the reserved initial zero has no remaining live partner. The conceptual halving test and the diagram are the same algorithm with different bookkeeping.

Here is the physical bookkeeping for input `0000`, at successive pass boundaries:

| Tape's used portion | Live zeros after the left marker | Represented count |
|---|---|---|
| `⊔000` after initialization | 3 | 4 |
| `⊔x0x` after one halving pass | 1 | 2 |
| `⊔xxx` after the next pass | 0 | 1 |

⊔ is the blank used as the left marker, and x means crossed out. On the final scan q₂ finds no remaining live zero and reaches accept. This table is the bridge between the arithmetic 4→2→1 and the marks actually visible in the slide trace.

## Why rejection and halting follow

If an odd represented count greater than one appears, repeated exact division by two cannot lead to one without a fractional step. Reject. If an even represented count appears, halving preserves the property of being a power of two. Every successful nonfinal round strictly decreases a positive integer count, so it cannot continue forever. Each tape pass itself traverses only a finite used region.

That is the proof skeleton: a property preserved by a transformation, a failed condition causing rejection, and a decreasing measure causing termination. These are reusable tools, not facts unique to this TM.

## How to read a dense transition diagram

Annotate each state with its phase before tracing. Record state, head position, and full changed tape—not just the input symbols consumed, because this machine revisits cells. When a trace seems to contradict the high-level plan, check the encoding convention before changing the mathematics.

**Keep:** powers of two are detected by repeated parity checks and halving; the tape stores the shrinking population through marks. Next we formalize a whole machine snapshot and distinguish recognition from guaranteed termination.

**One connected check:** Why is a single even-length check insufficient for this language, and why must length one be treated separately?
