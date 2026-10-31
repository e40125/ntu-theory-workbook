# Counting programs and languages: infinity has different sizes

## The question: could every language have a program?

A language is a set of finite strings. A TM is a finite description. Even before constructing a specific impossible problem, we can compare how many descriptions and how many languages there are. If there are more languages than programs, some languages have no recognizing program at all.

“Both collections are infinite” does not settle the comparison. Infinite sets can have different cardinalities—different sizes in the sense of whether their elements can be paired one-to-one.

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
