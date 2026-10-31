# Verifiers and guessing machines: two descriptions of the same resource

## Turn a certificate verifier into a nondeterministic machine

If a language has polynomially bounded certificates and a polynomial-time verifier, an NTM can guess a certificate of the allowed length, then run the verifier. A yes-instance has at least one successful guessed certificate, so at least one branch accepts. A no-instance has none, so every branch rejects.

The guess must be bounded. “Guess any finite string” with no length limit could produce arbitrarily long or nonterminating branches, destroying the polynomial-time guarantee. Guessing itself consumes time; it isn't free magic.

## Reverse the construction

If an NTM decides a language in polynomial time, an accepting branch has polynomially many steps. Record its transition choices as a certificate. A deterministic verifier follows those choices, checks that each is legal, and confirms an accepting halt within the bound.

Because the fixed machine has only finitely many choices per step, each choice needs only a constant number of bits. A polynomial number of choices gives a polynomial-size certificate. The verifier doesn't search all branches; the certificate identifies one candidate branch to check.

That proves the equivalence: polynomial nondeterministic time and polynomially verifiable certificates describe the same class NP.

## SUBSET-SUM: make the witness concrete

The deck uses numbers such as `{4,11,16,21,27}` and a target. For target 25, selecting 4 and 21 works. A certificate can be a bit vector `10010`, with one bit per listed entry: 1 means select that occurrence, 0 means skip it. Add the selected numbers and compare with the target.

The input is a list of entries; repeated equal values, if present, are distinct positions. You may use each occurrence at most once in ordinary SUBSET-SUM. A certificate that reuses one index repeatedly would be solving a different problem. Check certificate length, valid entries, and the sum.

Binary arithmetic takes time proportional to bit lengths, but summing at most the listed number of integers of bounded input size remains polynomial. Exhaustively trying every subset has 2ᵐ candidates for m entries. A fast verification procedure does not by itself provide a fast search over all candidates.

## Where P versus NP actually stands

P asks for a deterministic polynomial-time decision algorithm. NP asks for polynomially checkable yes-certificates, equivalently polynomial-time nondeterministic decision. P⊆NP. Whether P=NP remains unresolved; the [Clay Mathematics Institute lists P versus NP as unsolved](https://www.claymath.org/millennium/p-vs-np/) (checked November 1, 2026).

NP-complete means a problem is in NP and every NP problem can be transformed into it by a polynomial-time reduction. It is a special kind of completeness, not a synonym for NP. If one NP-complete problem had a polynomial-time algorithm, all NP problems would. No known polynomial algorithm is not the same as a proof that none exists.

## The course's final connection

We began by asking what a machine must remember. We moved to what it can compute at all, then what it can compute within a time budget. The same habits keep paying off: specify the object, preserve its meaning through a construction, prove both directions, and account for termination or cost separately.

**Keep:** bounded guesses are certificates; checking one branch differs from searching the whole tree; the major separation questions remain open.

**One connected check:** In the verifier-to-NTM construction, why are both the certificate-length bound and the verifier-time bound necessary?
