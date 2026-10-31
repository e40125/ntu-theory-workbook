The first pumping proof teaches the structure. Exam rigor means recognizing what changes when the language changes. This lesson uses the course's square-length example and the 2021 paper's variations. The explanations are newly written; use the linked paper for its exact wording.

## Square lengths: don't confuse a string with a number

\(D=\{1^{n^2}\mid n\geq0\}\) contains ε, `1`, `1111`, nine ones, sixteen ones, and so on. The string is made only of ones. The **length** must be a perfect square. `111` is out because three is not a square.

Assume regularity and get p≥1. Choose s=1ᵖ². It is long enough because p²≥p. Every legal y is 1ᵏ with 1≤k≤p. With i=2, the new length is p²+k, so

\[p^2<p^2+k\leq p^2+p<(p+1)^2.\]

There is no square strictly between two consecutive squares. Thus the pumped string is outside D for **every** legal k. That completes the contradiction.

Why choose p²? We need a member of D. Choosing 1ᵖ would fail when p isn't a square. Why use an inequality? It covers all possible loop lengths simultaneously.

## The 2021 variation: can i=3 work?

Yes. Three copies replace the original one copy, so the increase is **2k**, not 3k:

\[p^2<p^2+2k\leq p^2+2p=(p+1)^2-1<(p+1)^2.\]

Still trapped between adjacent squares. Same strategy; a changed calculation.

With i=0 and the same s, the length is p²−k. For p≥2,

\[(p-1)^2<p^2-p\leq p^2-k<p^2.\]

But when p=1, deleting y leaves ε. For n≥0, ε belongs to D, so this particular i=0 argument has a hole. If the problem changes the language to n≥1, ε is excluded and that last case works too. If a question fixes s or asks you to adapt the lecture proof, follow that restriction instead of silently replacing the setup.

## Inequalities: choose a string on the boundary

2021 Problem 3(b) asks about \(L=\{0^h1^k\mid h>5k,\ h,k>0\}\). The target has a strict inequality. Pick the nearest valid boundary: s=0⁵ᵖ⁺¹1ᵖ. Every legal y=0ᵗ for 1≤t≤p. Deleting y leaves h=5p+1−t≤5p=5k, violating h>5k. The original s is in L and long enough; every split is covered. Therefore L is not regular.

A random string with a huge excess of zeros might survive deletion of a short y. Choosing the boundary makes the smallest legal deletion fatal. That's how to **discover** s instead of memorizing it.

## Ratios: turn words into counts

2021 Problem 3(a) uses nonempty binary strings with proportion of ones at most 0.9. Choose s=1⁹ᵖ0ᵖ, exactly on the allowed boundary. Any legal y=1ᵗ, 1≤t≤p. Pumping with i=2 gives proportion

\[\frac{9p+t}{10p+t}>\frac9{10},\]

because multiplying by the positive denominators reduces this to 90p+10t>90p+9t, which holds since t>0. The length remains nonzero. Thus every legal split can be broken and the language is nonregular.

## Logic behind the theorem

The pumping conclusion has the pattern “there exists p, for every long member s, there exists a legal split, for every i the pumped string stays in L.” To contradict it: for every proposed p, exhibit a long member s for which every legal split has some failing i.

In the 2021 truth-table question, \(\neg(A\land B\land C)\) is equivalent to \((A\land B)\Rightarrow\neg C\). Both are false only when A,B,C are all true. If asked for a detailed truth table, that verbal argument is not the requested deliverable: write all eight rows.

## Fresh practice

For nonempty binary strings whose proportion of ones is at most 2/3, give a complete pumping proof of nonregularity.

<details class="hint"><summary>Hint: pick an exact boundary ratio</summary><p>Try two blocks whose lengths have ratio 2:1, with the ones first. Pumping up adds ones only. Compare the new ratio with 2/3 by cross multiplication.</p></details>
<details class="solution"><summary>Show the complete proof</summary><p>Suppose regular with pumping length p≥1. Choose s=1²ᵖ0ᵖ; it is nonempty, has length 3p≥p, and proportion 2/3. Any legal split has y=1ᵗ for 1≤t≤p. With i=2 the proportion is (2p+t)/(3p+t)>2/3, since 3(2p+t)>2(3p+t) is equivalent to t>0. This contradicts pumping, so the language is nonregular.</p></details>

**Proof hygiene:** bounds must include the endpoints. The legal loop bound is 1≤|y|≤p. Some printed solution lines use strict inequalities where these inclusive bounds are required; use the mathematically correct bounds.
