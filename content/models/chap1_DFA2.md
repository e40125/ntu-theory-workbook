# DFA 2 — Compress the past without losing the decision

## The whole idea

The design question is: **which differences between input histories can safely be forgotten?** If two histories require the same behavior for every possible continuation, one state may represent both. If some continuation must distinguish them, merging them loses information. This is the reason to design state meanings before drawing arrows.

Say I hide the input you already read. What facts would you need me to leave on a sticky note so you can finish the decision? That sticky note is the state. For “same first and last symbol,” forgetting the first symbol wrecks the job, even if you remember the last one perfectly.

## Round 1 — The first letter stays; the last letter keeps changing · pages 1–4

For strings beginning and ending with the same symbol, one memory slot is not enough. You need to retain the first symbol and update the most recent one. The slide uses a separate start s, then two states for strings starting with a and two for strings starting with b. Only the matching-end state in each branch accepts. A one-letter `a` counts: its first and last symbol are the same occurrence. Empty input has no first symbol, so the start is nonaccepting.

Picture pinning the first character to a clipboard and overwriting a “latest character” field. The pinned field explains why you cannot merge the a-start and b-start branches merely because both currently end in a. A future a may accept one and reject the other.

The proof has two obligations. If the machine accepts, its recorded first and last symbols agree. If a nonempty string's first and last symbols agree, the updates put it in the corresponding accepting state. The first direction forbids false positives; the second forbids missed valid strings. “It worked on `aba`” establishes neither universal direction.

## Round 2 — Modulo is a tiny scoreboard · pages 5–8

The reset example remembers the sum of the current segment **modulo 3**: only remainder 0, 1 or 2. Reading digit d changes remainder r to (r+d) mod 3. This sums digits; it is not interpreting the entire input as a base-three integer. Reading reset discards the old segment and sets remainder to 0.

Trace the slide's `10⟨reset⟩22⟨reset⟩012`: remainders 0→1→1→0→2→1→0→0→1→0. End remainder zero means accept. The reset token is one alphabet symbol. Angle brackets here visually name that token; they are not extra characters to feed the machine.

## Round 3 — The formal run is just a receipt for every step · pages 9–10

Write input w=w₁…wₙ. The subscript identifies a position: w₁ is the first symbol, wₙ the last; n is length. Write r₀…rₙ for the visited states. There are n+1 state entries because we record the starting situation before consuming any symbol.

`r₀=q₀` checks the receipt starts correctly. `δ(rᵢ,wᵢ₊₁)=rᵢ₊₁` checks each update uses the actual table. `rₙ∈F` checks the ending state. The symbol ∃ means “there exists.” In a DFA the valid run is unique, but the formal acceptance statement can still say such a run exists. It is a definition of accepting runs, not a command that every input must accept.

A language is **regular** if some finite automaton recognizes it exactly. “Some” means at least one, not exactly one. Showing your attempted machine fails does not prove no machine exists. Conversely, producing one correct finite machine is enough to establish regularity.

## Round 4 — Remember a useful suffix, not the whole damn string · pages 11–14

For odd numbers of 1s, each 1 toggles even↔odd; 0 preserves the count's parity. **Parity** means evenness or oddness. Empty input has zero ones, so start even and reject it.

For “contains 001,” before finding the pattern retain the longest ending piece that could begin `001`: nothing useful, `0`, or `00`. From `00` on 0, stay at `00`, because the newest two zeros still could start a match. From `0` on 1, return to no useful suffix. From `00` on 1, the match is complete; stay accepting on every later symbol. Once a substring has occurred, later input cannot un-occur it. That is why this accepting state loops forever, whereas the ends-in-1 accepting state did not.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Build the picture from the slide examples

Pages 1–4 recognize nonempty strings whose first and last symbols agree. You need the first symbol permanently, and you update the current last symbol. A separate initial situation handles “nothing read yet.” One symbol such as `a` already has matching first and last symbols; the empty string needs its own decision.

Pages 6–8 keep the sum since the last reset, modulo 3. **Modulo 3** means the remainder after division by 3: 0, 1 or 2. You can throw away the actual sum because adding the next digit affects the final remainder using only the current remainder. A reset overwrites the summary with remainder zero. This is deliberate forgetting, not random loss of memory.

## One complete construction: odd many ones

Pages 11–13 ask for binary strings with an odd number of 1s. “Odd” means 1,3,5,…; “even” means 0,2,4,…. You do not need to distinguish one 1 from a thousand and one. Both require the same future toggles.

Let qₑ mean “even many ones so far,” and qₒ mean “odd many.” Start qₑ because the initial count is zero. Accept at qₒ. Reading 0 changes no count, so each state loops on 0. Reading 1 changes parity, so it switches states.

For `010101`, the summaries after each symbol are even, odd, odd, even, even, odd. Accept. If you append another 1, the answer flips. That is exactly what the rule demands.

## The formal computation page is a run log

On page 9, w=w₁…wₙ names the input symbols. The r₀,…,rₙ names the visited states. **w entries are what we read; r entries are what we remember afterward.** There are n symbols but n+1 recorded states because r₀ records the situation before reading anything.

r₀=q₀ says start correctly. δ(rᵢ,wᵢ₊₁)=rᵢ₊₁ says each adjacent row follows the update rule. rₙ∈F says the final recorded state belongs to the accepting set. “∈” means membership. It is an acceptance test, not a claim that every run must accept.

A language is **regular** if some finite automaton recognizes exactly its strings. That is an existence claim about a checker. A language does not become regular because its English description sounds simple.

## Why this method generalizes

The odd/even invariant holds at the start and survives each symbol. That gives a proof for arbitrarily long inputs. The “contains 001” machine on page 14 uses another summary: how much of the useful suffix `001` has been matched, or whether it was already found. After `000`, the useful suffix is still `00`; an extra zero should not erase both zeros from memory.

The reset, parity and substring examples share one mental move: keep exactly the information needed for later decisions. Their arrows differ because their meanings differ.

**Next connection:** DFA3 keeps two such summaries at once. **Connected check:** for an odd-ones machine, justify the start, 0-arrows, 1-arrows and accepting state from their meanings, without memorizing its drawing.
