# Repeated halving: encode a numerical test as marking passes

## Read the language before reading the arrows

The deck's language is \(\{0^{2^n}:n\ge0\}\). The number of zeros must be a power of two: 1, 2, 4, 8, 16, … . This is **not** \(0^{2n}\), which describes even lengths. `000000` has even length six, but six is not a power of two. ε has length zero and is also excluded.

The numerical idea is simple: one is a power of two; a larger odd count isn't; a larger even count is a power of two exactly when its half is. So repeatedly halve an even count until either one remains or an odd count greater than one appears.

The tape is doing the counting for us. The finite controller only needs to remember “keep this one” versus “cross this one out.” So the trick isn't stuffing the number eight or eight billion into a state label; it's leaving the work distributed across the tape and shrinking it by a rule we can justify.

Crossing a zero out does not physically remove its tape cell. The notebook still contains the crossed-out mess, and the head still travels across it. This machine also reserves the first position. We have to distinguish what you literally see on tape from the count that this encoding represents.

## Round 1 — We are testing the input's length, not its binary value · pages 1–3

The language {0^(2ⁿ):n≥0} contains strings with 1,2,4,8,… zeros. n is the exponent; 2ⁿ is the number of input symbols. Empty input is not included because 2ⁿ is never zero. A string `0000` represents length four, not the integer zero written four times.

A positive integer is a power of two exactly when repeatedly halving it reaches 1 without encountering an odd number greater than 1. For length 8: 8→4→2→1. For length 6: 6→3, then reject. Length 1 accepts immediately. That's the mathematical job the tape operations implement.

Crossed-out x symbols remain physically on the tape. “Remaining zeros” means unmarked zeros, not the total number of occupied tape cells. The head skips x without treating it as a new input zero. Forgetting that representation makes the source trace look like the tape length is mysteriously changing.

## Round 2 — The first zero is reserved, so count it correctly · pages 4–5

The actual slide machine overwrites the first 0 with blank as a left marker. That reserved position represents the final one zero that would remain at the end. During the algorithm, the represented count is **one plus the number of live zeros to its right**.

For input `0000`, after initialization the physical tape is `⊔000`. That still represents four. One pass marks the first live zero and then alternates keeping/marking, producing `⊔x0x`, representing two. The next pass gives `⊔xxx`, representing one. A subsequent scan finds no live zero and accepts. The blank at the left is not evidence that the original input had an empty first symbol.

For `000`, initialization leaves `⊔00`. After marking the first live zero, there is an unmatched leftover zero when the scan ends. The represented count was three, which is odd and greater than one, so reject. The finite control's alternating states detect this parity.

## Round 3 — Assign each state a purpose before tracing arrows · pages 6–8

q₁ establishes the left boundary and rejects an input that does not begin with 0. q₂ skips x looking for the next live zero; seeing right-end blank means only the reserved one remains, so accept. Finding a zero marks it and begins the pairing scan.

q₃ and q₄ alternate over live zeros, ignoring crossed-out x. Their phase tells whether the count has the required parity when the right blank arrives. q₅ returns left over 0 and x until the boundary blank, then moves right to q₂ for another pass. The state carries the phase; the tape carries which symbols remain live.

An edge labeled `0→R` abbreviates `0→0,R`: keep the symbol and move right. `0→x,R` changes it. q_accept and q_reject have no executed outgoing rows. When you read a configuration like `⊔xq₃00`, q₃ marks the control state and the scanned position, not a literal q₃ symbol on the tape.

## Round 4 — Correctness and termination are separate promises

The invariant is that the tape encoding represents the current positive candidate count. A successful pass on an even count divides it by two; an odd count greater than one rejects; count one accepts. Powers of two repeatedly reach one; any other positive integer eventually reaches an odd factor greater than one. Each successful pass decreases the represented count, and each sweep crosses a finite used tape region. Therefore the machine halts on every input.

The numerical reasoning proves the algorithm. Matching each state/marking rule to that encoding explains why this particular diagram implements it. You need both layers; “it halves things” alone leaves the implementation unaccounted for.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
