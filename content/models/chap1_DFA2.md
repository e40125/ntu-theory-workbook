# DFA 2 — Compress the past without losing the decision

## The whole idea

The design question is: **which differences between input histories can safely be forgotten?** If two histories require the same behavior for every possible continuation, one state may represent both. If some continuation must distinguish them, merging them loses information. This is the reason to design state meanings before drawing arrows.

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
