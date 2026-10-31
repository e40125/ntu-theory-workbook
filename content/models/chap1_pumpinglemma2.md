# A pumping proof: force every legal loop to break the rule

## The job: make the machine's promised loop impossible

We will prove \(L=\{0^n1^n:n\ge0\}\) is not regular. Membership requires two things: all zeros precede all ones, and their counts match. `0011` belongs; `0101` has equal counts but the wrong order; `001` has the right order but wrong counts.

A proof must handle an unknown machine, unknown pumping length, and whichever legal split the theorem might supply. Checking one favorite split won't cut it. The trick is to choose a string that pins **all legal loops** into a useful region.

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
