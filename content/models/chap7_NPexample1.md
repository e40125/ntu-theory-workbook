# NP: a yes-answer has a short certificate that can be checked quickly

## Start with checking, not with a mysterious acronym

Suppose someone hands you a proposed Hamiltonian path in a graph: an ordered list of vertices. You can check that it starts and ends where required, visits every vertex exactly once, and uses an actual graph edge between each adjacent pair. The list may have been hard to find, but checking a supplied list is a concrete finite job.

A **certificate** is that extra proposed evidence. A **verifier** is a deterministic algorithm that checks the original input together with the certificate. NP consists of decision languages where yes-instances have certificates of polynomially bounded length that can be verified in polynomial time.

For no-instances, every permitted certificate must fail. A verifier that accepts some bogus witness would certify the wrong language.

Think “show me the route and I'll check it.” The certificate supplies the route; the verifier checks the graph's actual edges and the once-per-vertex requirement. It doesn't trust the person who supplied it. A pretty-looking list gets no free pass. This is the concrete meaning of verification before the acronym starts sounding like wizard shit.

## Work the HAMPATH certificate

For a graph with vertices `{s,a,b,t}`, a candidate `[s,b,a,t]` claims a path using all four exactly once. Check its endpoints, count and uniqueness of vertices, and edges s→b, b→a, a→t. If any edge is missing, reject this certificate. That does not by itself prove the graph has no Hamiltonian path; another ordering may work.

The certificate length grows with the graph encoding size. Trying all vertex orderings may take huge time, but the verifier processes one supplied ordering. Keep the quantifiers straight: **some** certificate for a yes-instance; **no** certificate for a no-instance.

## NP does not mean “non-polynomial”

The name refers to nondeterministic polynomial time, which the next deck connects to certificates. Problems already in P are also in NP: a verifier can simply run the polynomial decider and ignore the certificate. Therefore membership in NP does not establish hardness or rule out an efficient deterministic algorithm.

The deck uses compositeness as a verification example. A nontrivial factor certifies that an integer is composite: check the factor bounds and divisibility. But compositeness is also in P, because primality has an unconditional deterministic polynomial-time algorithm. The [Agrawal–Kayal–Saxena paper](https://www.cse.iitk.ac.in/users/manindra/algebra/primality_v6.pdf) establishes that prime/composite decision result. Finding a full factorization is a different task; don't slide from one claim to the other.

## What about certifying a no-answer?

A Hamiltonian path is a compact witness that a path exists. The absence of one particular candidate is not a witness that no candidate exists. The complement class coNP concerns languages whose no-answers, viewed as yes-answers to the complement, have polynomial certificates.

It is not established that NP and coNP differ. So say “we have this yes-certificate” rather than “there can never be a short no-certificate.” A lack of a known method is not an impossibility theorem.

## Connect to earlier proof practice

An ambiguity witness gave one string and two derivations. A computation history gave a finite run. A counterexample refuted a universal claim. These are all evidence objects, but NP adds quantitative requirements: certificate length and verification time must be polynomial in the original input length.

**Keep:** NP is about polynomially checkable yes-evidence. It includes easy problems and does not itself mean NP-complete.

**One connected check:** Why does rejecting `[s,b,a,t]` fail to decide that a graph has no Hamiltonian path?
