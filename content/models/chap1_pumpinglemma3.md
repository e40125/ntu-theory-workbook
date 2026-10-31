# Pumping variations: choose a weakness, then design the witness

## The mental model: control the damage, don't memorize one string

Pumping proofs have a fixed negotiation. You assume regularity; the lemma supplies p; you choose a sufficiently long member s; the hypothetical machine gets a legal split; you choose a repetition count that makes membership fail. The order matters. You must beat **every** legal split of your chosen s, not just a convenient one.

Write the plan in ordinary words first: “The loop is trapped in this region. Changing that region destroys this relationship.” Then translate the relationship into counts, positions, or arithmetic.

## Variation 1: a word repeated twice

Let \(L=\{ww:w\in\{0,1\}^*\}\). Here w is any binary string, and ww means two identical copies, in the same order. Choose \(s=0^p1\,0^p1\). This is a member: its two copies are both \(0^p1\).

For every legal split, the bound \(|xy|\le p\) forces \(y=0^k\) with 1≤k≤p. Pump down to get \(0^{p-k}1\,0^p1\).

Why can't this be some **different** word repeated twice? Don't merely say “the original halves differ”—maybe the dividing point moved. There are exactly two `1`s, and the whole string ends in `1`. In a square tt, each identical half must therefore contain one `1` and end in `1`. Each half is a block of zeros followed by one `1`, with the same number of zeros. Our two zero blocks have lengths p−k and p, which differ. No alternate split can save it.

That extra argument closes a real proof gap. A drawing of two unequal old halves would not.

## Variation 2: square lengths

Let \(L=\{1^{n^2}:n\ge0\}\). A string belongs exactly when its length is 0,1,4,9,16,… . Choose \(s=1^{p^2}\). Its length is at least p. Every legal nonempty y has length k with 1≤k≤p.

Pump up once, i=2. The new length is p²+k. It is bigger than p² but smaller than the next square:

\[p^2<p^2+k\le p^2+p<(p+1)^2=p^2+2p+1.\]

There is no square strictly between consecutive squares, so the pumped word is outside L. The argument works for every k in the allowed range. Pumping down is less convenient: for p=1 and k=1 it gives length zero, which is a square. Choosing i=2 avoids that boundary trap.

## What the quantifiers are saying

\(\exists\) means “there exists”; \(\forall\) means “for every.” The lemma says a regular language has **some p** that works for **every long member**, with **some legal split** working for **every repetition count**. To refute it, show that for **every proposed p**, you can find **a bad member** for which **every legal split** has **some failing repetition count**.

Negating the order correctly prevents the classic bullshit proof where you choose a bad split and act as though no good split exists.

**Keep:** control where y lives, then identify a condition that any nonzero change destroys. Pumping is about the language's structure, not just its surface notation.

**One connected check:** In the square-length proof, why do we need the upper bound k≤p, rather than only k>0?
