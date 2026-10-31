# A pumping proof: force every legal loop to break the rule

## The job: make the machine's promised loop impossible

We will prove \(L=\{0^n1^n:n\ge0\}\) is not regular. Membership requires two things: all zeros precede all ones, and their counts match. `0011` belongs; `0101` has equal counts but the wrong order; `001` has the right order but wrong counts.

A proof must handle an unknown machine, unknown pumping length, and whichever legal split the theorem might supply. Checking one favorite split won't cut it. The trick is to choose a string that pins **all legal loops** into a useful region.

This proof is a game with strict ownership rules. The alleged machine supplies its memory bound; we choose a long input; the loop can be any legal one; then we choose how many times to repeat it. If we cherry-pick a convenient loop, the proof is bullshit. We have to defeat every legal loop.

## Round 1 — Build a proof from the promise you are attacking · pages 1–2

Assume B={0ⁿ1ⁿ:n≥0} is regular. The lemma then supplies a pumping length p. We do not choose p=5 and pretend we handled all possibilities. We choose the witness **in response to an arbitrary p**: s=0ᵖ1ᵖ. It belongs to B and has length 2p≥p.

Now take any split s=xyz satisfying |y|>0 and |xy|≤p. The first p symbols are all zero, so y=0ᵏ for some integer k with 1≤k≤p. Pump i=2. The result has p+k zeros and p ones, so it is outside B. This defeats every legal split, contradicting the promised existence of a successful one. Therefore B is not regular.

Read the logic as a challenge: “Give me whatever p your alleged DFA provides. I'll hand you a long accepted string for which none of the legal loop choices can keep the promise.” The opponent analogy only represents quantifier order; no machine is actually playing a game.

## Round 2 — Why the slides also discuss splits beyond the first block · pages 3–5

The deck gives a stronger case analysis that does not need the |xy|≤p restriction for this particular B. A nonempty contiguous y in 0ᵖ1ᵖ can contain only zeros, only ones, or cross the boundary from zeros to ones.

Only zeros: doubling increases zeros only. Only ones: doubling increases ones only. Crossing: y=0ᵃ1ᵇ with a,b>0, so yy contains a 1 followed later by a 0. The pumped string no longer has all zeros before all ones. Every case violates B. Notice that the third case attacks **order**, while the first two attack **counts**.

You may use the shorter prefix-bound proof on an exam unless the question demands the slide's particular argument. Both are rigorous. But you must know what the extra case analysis buys and which condition each contradiction uses.

## Round 3 — Change the language, and that old reason may stop working · pages 6–9

Now C={w:#0(w)=#1(w)} permits any order. Reuse the witness 0ᵖ1ᵖ, but do not reuse “a zero appears after a one, therefore reject.” In C, `0101` is perfectly valid. The membership rule changed.

Without the prefix bound, the split x=ε, y=0ᵖ1ᵖ, z=ε can be repeated forever while keeping equal counts. This is why we use |xy|≤p to confine y to zeros. Then pumping changes one count and not the other, which genuinely violates C. The bound is doing essential logical work, not filling a checklist for decoration.

Why is one chosen witness enough when the theorem says every long member? Because a universal promise fails when even one eligible member fails. But you still must defeat every allowed split of that witness. “One bad string” and “one bad split” sit under different quantifiers. Mixing them is the classic proof-killer.

The clean exam paragraph should include: assumption of regularity, arbitrary pumping length, witness membership and length, arbitrary legal split, forced form of y, chosen i, exact violated language condition, contradiction. Each sentence pays for one obligation. None needs fancy prose.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## One complete proof, with the reasons exposed

Assume L is regular. Then it has a pumping length p≥1. Choose \(s=0^p1^p\). This choice depends on p: whatever finite memory the supposed machine has, we give it that many zeros followed by that many ones. s is in L, and its length 2p is at least p, so the lemma applies.

Take **any** split s=xyz satisfying \(|xy|\le p\) and \(|y|>0\). The first p symbols of s are all zeros. Since x together with y ends within those first p positions, y contains only zeros. Since it is nonempty, \(y=0^k\) for some k with 1≤k≤p.

Choose i=0. The pumped string is \(xz=0^{p-k}1^p\). It has fewer zeros than ones because k≥1. Therefore xz is not in L. But the pumping lemma promised that every repetition count, including zero, remains in L. Contradiction. Thus L is not regular.

## Where the proof actually earns its conclusion

The phrase “take any split” is backed by the argument about the first p positions. We never selected x or y ourselves. If someone gives us a different legal x and y, its y still consists of k≥1 zeros, and the same failure still happens.

For a concrete illustration, let p=4 and s=`00001111`. Maybe y is the first zero; maybe it is the middle two zeros; maybe it is all four. Deleting it always leaves fewer than four zeros and still four ones. The illustration helps you see the mechanism; the variable-k argument proves all p and all legal splits.

## Why the exact language matters

The slide discussion also considers strings with equal numbers of zeros and ones **in any order**. If a proof says “pumping creates a `0` after a `1`, so reject,” that only works for the ordered-block language. It fails for the unordered equal-count language: order is allowed there.

The prefix-bound proof above still works for that second language. Choose the same witness, force y to contain only zeros, and break the counts. Notice the repair: we used a condition that actually defines the target language.

## What to write under exam conditions

State the assumption; introduce the unknown p; choose and validate s; describe **every** legal y; choose i; show a precise failed membership condition; conclude contradiction. Those are logical obligations, not decorative sentences.

**Keep:** the witness is your choice; the decomposition is not. Use the prefix bound to control every decomposition. Next we adapt this strategy when the failed condition is duplication or a square length.

**One connected check:** If the target language were all strings containing at least one `1`, which line of this proof would stop giving a contradiction?
