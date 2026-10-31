# Verifiers and guessing machines: two descriptions of the same resource

## Turn a certificate verifier into a nondeterministic machine

If a language has polynomially bounded certificates and a polynomial-time verifier, an NTM can guess a certificate of the allowed length, then run the verifier. A yes-instance has at least one successful guessed certificate, so at least one branch accepts. A no-instance has none, so every branch rejects.

The guess must be bounded. “Guess any finite string” with no length limit could produce arbitrarily long or nonterminating branches, destroying the polynomial-time guarantee. Guessing itself consumes time; it isn't free magic.

A short certificate is a script telling the verifier which successful possibility to inspect. An accepting branch is that same script played out as choices. The bound matters: unlimited guessing can wander forever and wreck the time promise. We will connect the two descriptions one direction at a time.

## Round 1 — A certificate and an accepting branch encode the same witness · pages 1–3

Suppose V verifies a language in polynomial time with polynomially bounded certificates. An NTM guesses a certificate of at most that bounded length, then runs V. Every branch terminates in polynomial time. If w belongs, some certificate makes a branch accept; if not, every branch rejects.

The length bound must be enforced during guessing. “Guess any finite string, then verify” would allow arbitrarily long branches and would not establish a polynomial bound. Include a counter or a fixed polynomial-sized guessing workspace.

Conversely, suppose an NTM decides the language in p(n) time on every branch. A certificate can list the branch choices for a proposed accepting run. The branching factor is fixed, so each choice uses only a constant number of bits and the certificate has O(p(n)) length. A deterministic verifier simulates those choices, rejects nonexistent transitions or malformed certificates, and accepts only if the recorded branch legally reaches acceptance within the bound.

This proves both directions. The certificate need not magically contain the correct answer; it contains a checkable reason. “Some accepting branch” corresponds exactly to “some accepted certificate.”

## Round 2 — A subset chooses occurrences, not unlimited copies · pages 4–6

SUBSET-SUM gives numbers x₁,…,xₖ and target t, asking whether some selection sums to t. The slide permits repeated values in the input, such as two occurrences of 11. Treat the input as an indexed list or multiset: each occurrence can be chosen at most once.

A safe certificate is a k-bit mask. Bit i=1 means include occurrence xᵢ; bit i=0 means omit it. For {4,11,16,21,27} and target 25, mask 10010 chooses 4 and 21. Verify mask length and bits, sum selected values using binary arithmetic, and compare with t.

The slide's bare check “each cᵢ belongs to s” is not sufficient when the certificate lists values. With input list [4,11] and target 8, certificate [4,4] passes value-membership and sum checks but illegally reuses the only 4. A mask or distinct valid indices enforces multiplicity. If the input really contained [4,4,11], selecting both 4 occurrences would be legal.

The certificate size is at most polynomial in the input length; it need not be strictly shorter than the input, contrary to a loose slide inequality. Summing k binary integers increases bit length by at most a logarithmic factor in k, so verification remains polynomial. Guess-and-verify proves membership in NP, not by itself NP-completeness.

## Round 3 — The open question is whether finding can always be as efficient as checking · pages 7–8

P has polynomial deterministic decision algorithms. NP has polynomially checkable, polynomial-sized yes-certificates. We know P⊆NP; whether equality holds remains open. “Most people believe unequal” is an opinion about the conjecture, not evidence you may use as a theorem.

A language B is **NP-hard** when every language in NP reduces to B by a polynomial-time many-one reduction: a polynomially computed transformation f with x∈A iff f(x)∈B. It is **NP-complete** when it is NP-hard and also belongs to NP. These are two separate requirements.

If one NP-complete problem had a polynomial algorithm, compose that algorithm with each polynomial reduction and every NP language would be in P. If one NP-complete problem were proved outside P, then P≠NP. A failed search for a fast algorithm, a slow brute-force method or a list of difficult instances does not prove that lower bound.

Reductions now have a **polynomial-time** requirement, stronger than the merely computable reductions used for undecidability. Same dependency idea, stricter cost constraint. That's the connection between the earlier impossibility proofs and this final complexity story.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
