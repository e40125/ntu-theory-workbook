# Pumping variations: choose a weakness, then design the witness

## The mental model: control the damage, don't memorize one string

Pumping proofs have a fixed negotiation. You assume regularity; the lemma supplies p; you choose a sufficiently long member s; the hypothetical machine gets a legal split; you choose a repetition count that makes membership fail. The order matters. You must beat **every** legal split of your chosen s, not just a convenient one.

Write the plan in ordinary words first: “The loop is trapped in this region. Changing that region destroys this relationship.” Then translate the relationship into counts, positions, or arithmetic.

“Every option fails” and “one option fails” are wildly different promises. Think of testing keys: one bad key does not prove the door cannot be opened. Pumping proofs live or die on that distinction. We will put each choice in the right person’s hands before touching the witness string.

## Round 1 — Negation reverses who has to supply the evidence · pages 1–7

“For every n, a formula holds” is disproved by finding one n where it fails. “There exists a successful choice” is disproved by showing every allowed choice fails. That is why ∀ and ∃ swap when negated. The condition itself must be negated too.

For pumping, failure of the promise reads: for every p≥1, choose an s∈A of length at least p; for every legal split s=xyz with y nonempty and |xy|≤p, find an i≥0 making xyⁱz∉A. The order permits s to depend on p, and i to depend on the split. It does not permit choosing p conveniently after seeing the string or choosing only the easiest split.

The slide writes legal-split conditions as the premise of an implication. Why? Splits that are illegal need no counterattack. If y is empty or x/y extend beyond the permitted prefix, the lemma never offered that split as a valid witness. The logical identity ¬(A∧B)≡(A→¬B) explains this packaging: if the legal conditions hold, the pumping property must fail. Here A and B are temporary propositions, not languages named in earlier examples.

## Round 2 — Why doubling an early zero breaks ww · pages 8–9

The language is F={ww:w∈{0,1}*}. This means two identical halves, not a string followed by its reverse. Choose s=0ᵖ10ᵖ1, which is w repeated with w=0ᵖ1. Any legal y lies in the first zero block, so y=0ᵏ with k>0. Pumping i=2 produces 0ᵖ⁺ᵏ10ᵖ1.

Now justify “not ww” instead of waving at unequal-looking blocks. The pumped string contains exactly two ones. If it were vv, each half v would contain exactly one 1. Because the complete string ends in 1, each identical half would end in 1. That forces the halves to be precisely the two zero-block-plus-1 pieces. Their zero counts differ, so they cannot be identical. This also covers k values that shift the numerical midpoint; we never assumed the old midpoint stayed fixed.

i=3 works too: it adds 2k zeros to the first block. You need one failing repetition count per split, not a special sacred value of 2. Choose the count that gives the cleanest contradiction.

## Round 3 — Square lengths leave a gap too wide for the loop · pages 10–12

D={1ⁿ²:n≥0} is unary. The strings have lengths 0,1,4,9,16,… . For an arbitrary pumping length p, choose s=1ᵖ². It is in D and p²≥p because p≥1. A legal loop has length k with 1≤k≤p.

Pump twice. New length=p²+k, so

\[p^2<p^2+k\le p^2+p<(p+1)^2.\]

The last inequality follows because (p+1)²=p²+2p+1 and p<2p+1. There is no integer square strictly between consecutive squares p² and (p+1)². Therefore the pumped length is invalid. The symbol ≤ allows equality; < does not. Each boundary in this chain has a reason.

Why not always delete y? For p=1 the only string is `1`, and deleting its one-symbol loop gives ε, whose length 0 is a square. That does not contradict membership. For p≥2, the lower-gap argument works, but then you need a separate p=1 case. Pumping upward works uniformly and avoids the extra mess.

The proof strategy is to trap the pumped length in an impossible interval. Later proofs reuse the same move: identify a structural gap and force every permitted local modification into it. Understanding that mechanism is more useful than memorizing this particular sequence of symbols.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
