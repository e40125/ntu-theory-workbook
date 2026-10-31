# Pumping lemma: finite memory eventually repeats itself

## The question: when is a finite number of states not enough?

A DFA can remember parity with two states. Could it remember the exact number of leading zeros so it can demand that many ones afterward? For \(\{0^n1^n:n\ge0\}\), the number may be arbitrarily large. “It needs to count” is a useful suspicion, but not yet a proof: plenty of counting tasks only need a remainder. We need a consequence that **every** DFA must obey.

Suppose a DFA has p states. Read p symbols. The computation has visited p+1 state positions: the initial state plus one after each symbol. With only p different states, some state was visited twice. That's the pigeonhole principle: more visits than available distinct places forces a repeat.

A finite-state checker eventually has to reuse a memory situation on a long enough accepted input. Reusing a state creates a loop. Now we can replay that loop and ask whether the language’s rule survives. That is the whole engine; the theorem’s alphabet soup tells us exactly when we are allowed to use it.

## Round 1 — “It needs to count” is a suspicion, not a proof · pages 1–2

For 0ⁿ1ⁿ, the machine must match an arbitrarily large number of leading zeros with trailing ones. Finite memory sounds inadequate, but the exam needs an argument ruling out every possible DFA design. Saying “I can't draw one” only reports your own failed design attempt.

The adjacent-pattern example shows why intuition can screw you over. C requires equally many individual 0s and 1s. D requires equally many adjacent `01` and `10` occurrences. An occurrence is an adjacent pair; overlaps count. In `01010`, there are two 01s and two 10s, but three zeros and two ones.

Every 01 is a switch into the 1-region, and every 10 switches back. For a nonempty binary string, the two counts balance exactly when first and last symbols agree. If it starts 0 and ends 1, there is one extra 01; reverse endpoints give one extra 10. ε has both counts zero too. So D is regular: remember the first and current last symbol, with ε accepted. Individual counts C do not collapse into that bounded endpoint summary.

## Round 2 — Who chooses what in the theorem? · pages 3–4

The statement is: if A is regular, there is an integer p≥1 such that **every** accepted string s with length at least p has **some** split s=xyz satisfying three requirements. y is nonempty; x and y together fit within the first p symbols; repeating y any number i≥0 keeps the string in A.

p is a threshold, not a chosen example string. x is the prefix before the loop, y the loop's consumed substring, z the suffix after it. Concatenation xyz means those exact three pieces in that order. y⁰=ε deletes y; y¹=y leaves it once; y²=yy doubles it. x and z stay fixed.

The quantifier order matters: ∃p, then ∀s, then ∃x,y,z, then ∀i. “For every” means all allowed choices; “there exists” means at least one suitable choice. The split can depend on s. Once selected, it must work for every i. A different successful split for every i is not what the theorem says.

This is a **necessary condition** for regularity. Regularity guarantees it. Showing a few strings pump does not establish regularity. To use the lemma against regularity, we must show the promised condition cannot hold.

## Round 3 — The loop is forced by too many visits and too few rooms · pages 5–9

Assume a DFA for A has p states. Reading the first p symbols records p+1 visits, including the starting state before any input. Pigeonhole principle: placing more visits than available states forces two visits to the same state. Choose their positions j<l in the slide's q₁,…,qₙ₊₁ numbering.

The characters before the first visit form x=s₁…sⱼ₋₁. Those between the visits form y=sⱼ…sₗ₋₁. The rest form z=sₗ…sₙ. The two visits are distinct positions, so l−j>0 and y is nonempty. Both are among the first p+1 visits, so l−1≤p and |xy|≤p.

At the end of x the machine is at the loop state. Reading y returns to that same state. Reading it twice returns there twice; skipping it leaves the machine there already. In every case the unchanged z starts from the same state and reaches the old accepting endpoint. That's the mechanism behind “for all i.”

If A has no strings as long as p, the conditional promise about long members has no counterexample. This is called **vacuous truth**. The lemma does not insist every regular language contain long strings. A finite language is regular and may satisfy the threshold condition simply because there are no eligible strings.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## A repeat turns a path into a reusable loop

Split the input into three consecutive pieces. x gets us to the repeated state the first time. y takes us around the loop back to that same state. z finishes the original accepting journey.

Because the state after y is exactly the state before y, the rest of the machine cannot tell whether we took that loop zero times, once, twice, or a hundred times. Following z afterward still reaches accept. The DFA has no secret memory outside its current state. That's the whole damn mechanism.

The notation \(xy^iz\) means x, then i copies of y, then z. With i=0, y disappears; with i=1, it is the original string; with i=2, y is duplicated. We are editing a **substring**, not moving letters around.

## Decode the theorem in its actual order

If L is regular, there exists a pumping length p such that every s in L with length at least p can be split as s=xyz satisfying:

1. \(|y|>0\): the loop consumes at least one symbol.
2. \(|xy|\le p\): the loop fits within the first p symbols.
3. \(xy^iz\in L\) for every integer i≥0: every repetition count still works.

\(|y|\) is the number of symbols in y. \(\in\) means “is a member of.” The theorem promises **at least one** suitable split, not every split. p belongs to the assumed machine; we don't get to declare p=3 because that makes an example convenient.

## Why this helps prove impossibility

To show a language is not regular, assume a DFA exists and receive its unknown p. Choose a legal long string. Then show that **no allowed split** can keep all repetitions in the language. That contradicts the required loop property.

Be careful with the deck's counting examples. Equal numbers of `0` and `1` is not the same requirement as equal numbers of adjacent `01` and `10`. The latter can be tracked using boundary information: in a binary string, changes from 0 to 1 and back alternate. Similar-looking counts can need radically different memory.

**Keep:** pumping is a necessary consequence of finite state memory. It is a tool for ruling regularity out, not a general way to establish regularity. Next we turn the mechanism into a complete quantified proof.

**One connected check:** Why does returning to the same state matter more than merely reading the same symbol twice?
