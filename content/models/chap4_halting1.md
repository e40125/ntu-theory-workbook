# Counting programs and languages: infinity has different sizes

## The question: could every language have a program?

A language is a set of finite strings. A TM is a finite description. Even before constructing a specific impossible problem, we can compare how many descriptions and how many languages there are. If there are more languages than programs, some languages have no recognizing program at all.

“Both collections are infinite” does not settle the comparison. Infinite sets can have different cardinalities—different sizes in the sense of whether their elements can be paired one-to-one.

“I have not seen it accept yet” could mean rejection, or a loop, or acceptance much later. That is the nasty part. The problem asks for a checker that handles every supplied program and input, always halts itself, and gets the answer right. We need to understand that promise before attacking it.

## Round 1 — Acceptance and halting are related, but ain't identical · pages 1–2

A_TM asks whether M accepts w. HALT_TM asks whether M halts on w, either accepting or rejecting. The deck informally calls its A_TM discussion the halting problem; keep the displayed acceptance definition precise. A machine that immediately rejects halts, but does not accept.

A_TM is recognizable: simulate M on w and accept if it accepts. If M rejects, reject; if M loops, the simulation loops. The missing ability is a universally terminating no-answer for all nonaccepting computations. A long runtime is not evidence of an infinite loop, and a finite timeout cannot decide this for arbitrary programs.

## Round 2 — Infinite size is measured by pairing, not by how crowded a list looks · pages 3–8

A function is **injective**, or one-to-one, when different inputs have different outputs. It is **surjective**, or onto, when every codomain element is hit. A **bijection** has both properties, pairing the sets without collisions or leftovers.

For f(x)=x² on real inputs, outputs never go below zero. With codomain all reals it is not onto; with codomain nonnegative reals it is onto. It is not one-to-one in either version because x and −x share a square. By contrast x³ is a bijection from reals to reals.

The map n→2n pairs positive integers with positive even integers. An infinite proper subset can therefore have the same cardinality as its parent. **Cardinality** means size in this pairing sense. The sets are not equal as collections—1 belongs to one but not the other—even though their cardinalities agree. The slide's wording “two sets are equal if paired” concerns size, not membership equality.

A set is **countable** if finite or bijective with the natural numbers. Informally, its members can be placed in a list where every member eventually appears. The list may never end, but no particular member is postponed forever.

## Round 3 — Why row-by-row enumeration fails for fractions · pages 9–10

Put positive fractions m/n in a grid. Reading the first infinite row completely would never reach the second row. Instead traverse finite diagonals of increasing m+n. Every positive pair lies on some finite diagonal, so every fraction appears eventually. Skip repetitions such as 2/2 after 1/1 has appeared; reduced fractions give unique representatives.

To include all rational numbers rather than only the positive ones, add 0 and interleave positive and negative fractions. This illustrates the difference between an infinite search that is fair and one that starves later possibilities—the same issue as NTM branch simulation.

## Round 4 — Construct a number that dodges every proposed row · pages 11–12

Assume a list r₁,r₂,… contains all reals in (0,1). Construct x one decimal place at a time. At position n, choose digit 1 if rₙ's nth digit is not 1, otherwise choose 2. Then x differs from rₙ at digit n for every n. Digits only 1 and 2 avoid the 0.999…=1.000… representation ambiguity.

Since x is a real in (0,1), the allegedly complete list must contain it at some row k. But its kth digit differs from row k. Contradiction. We did not need to locate a missing number before seeing the list; the construction works against **any** proposed complete list.

The diagonal uses one carefully chosen disagreement per row. It does not claim x differs from every row at every digit. That distinction is what makes the construction possible and sufficient.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Countable means listable, not finite

A set is countably infinite when its elements can be listed as first, second, third, and so on without missing any. All finite strings over a finite alphabet can be listed by increasing length, and within each length in a fixed order. Every particular string eventually appears.

TM descriptions are some of those finite strings. We can enumerate candidate encodings and discard malformed ones. Thus there are only countably many TMs. Program length has no fixed maximum, but every individual program is finite.

A bijection pairs each element on one side with exactly one on the other, using every element of both. Equal cardinality does not mean the sets contain the same objects. Integers and finite machine encodings are not literally the same set.

## Diagonalization shows that some collections cannot be listed

Suppose someone lists infinite binary sequences as rows. Build a new sequence whose nth bit differs from the nth bit of row n. It differs from row 1 in position 1, row 2 in position 2, and so on. Therefore it is absent from the supposedly complete list.

The construction defeats every row for a specific reason, not by vaguely saying “there must be another one.” In the real-number version, choosing safe decimal digits avoids the ambiguity of two decimal representations such as a trailing sequence of 9s. The logical engine is the same: disagreement on the diagonal.

## Connect the counting argument to languages

List all finite input strings as s₁,s₂,s₃,… . A language determines an infinite membership sequence: bit i is 1 if sᵢ belongs, 0 otherwise. Conversely, each such sequence defines a language. Since these infinite sequences cannot all be listed, neither can all languages.

Countably many programs cannot cover uncountably many languages. Some languages are not even recognizable. This is an existence result; it does not yet tell us a particular familiar language with no algorithm.

## Keep the named problems distinct

\(A_{TM}\) consists of pairs ⟨M,w⟩ where M **accepts** w. \(HALT_{TM}\) asks whether M halts on w, either accepting or rejecting. These are different languages, although both are undecidable. If M rejects w, that is a no-instance of acceptance and a yes-instance of halting.

The next deck gives an explicit contradiction for A_TM, then uses recognizability and complement to sharpen the picture. Counting proves there are impossible tasks; diagonal self-reference identifies one.

**Keep:** finite programs are listable; arbitrary languages correspond to unlistable infinite bit sequences. “Infinite” alone is not a size comparison.

**One connected check:** For a machine that halts and rejects w, how do its A_TM and HALT_TM membership answers differ?
