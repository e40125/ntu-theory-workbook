# P: algorithms whose work is polynomial in the encoded input length

## The definition is a growth guarantee, not a compliment

P is the class of languages decided by deterministic TMs in polynomial time: for some fixed exponent k, running time is O(nᵏ), where n is input length. The machine must halt on every input and answer correctly. “Polynomial” does not mean instantly practical; n¹⁰⁰ is polynomial and can be absurdly large.

The value of the class is robustness: standard deterministic model changes have polynomial overhead, and useful efficient algorithms often fall inside it. It gives a precise mathematical boundary to investigate, not a guarantee about your laptop's response time.

## PATH: search the graph without enumerating all paths

Given a directed graph G and vertices s,t, ask whether a path from s to t exists. Mark s. Repeatedly inspect outgoing edges from marked vertices and mark their destinations. Stop when t is marked or no new vertex can be marked.

On a graph s→u→t with an extra cycle u→s, marking still progresses safely: revisiting s doesn't create an endless search. A vertex needs to be newly marked only once. At most the number of vertices can be added, and each pass inspects finitely many encoded edges, giving a polynomial bound.

Correctness comes from two directions: each marked vertex has a path from s; every reachable vertex is eventually marked by following a path's edges. Termination comes from finitely many new marks. Enumerating every possible path would waste work on repetitions and cycles.

## Euclid: use a preserved relation and a decreasing quantity

To compute gcd(a,b), repeatedly replace `(a,b)` by `(b, a mod b)` until b=0. The greatest common divisor stays the same because a divisor divides both a and b exactly when it divides both b and the remainder a−qb.

For 18 and 24: `(18,24)→(24,18)→(18,6)→(6,0)`, so the gcd is 6. The remainder is smaller than the divisor, ensuring progress. More sharply, the relevant magnitude shrinks by at least a factor of two within a bounded number of iterations, giving logarithmically many rounds in the numerical magnitude.

The numbers are binary encoded. Their bit length is logarithmic in their value, so a rigorous polynomial-time claim also counts the bit cost of division/remainder operations. Treating arbitrary-size arithmetic as one free step would hide work.

## A familiar language class returns

The deck states that every context-free language is in P. Earlier, CNF gave a finite exhaustive membership algorithm via 2n−1 derivation steps. That particular enumeration can be exponential; it established decidability, not the stronger polynomial result. Polynomial parsing uses shared subproblems instead of separately trying every tree.

This distinction is useful everywhere: a language may admit a slow algorithm and also a fast one. Complexity classes assert the existence of a suitably bounded algorithm, not that every algorithm for the problem is efficient.

**Keep:** find a reusable summary—reachable vertices, a gcd invariant, shared parsing subproblems—and prove both correctness and a bound in encoded input length.

**One connected check:** Why does “at most N iterations” fail to establish polynomial time when the integer N is supplied in binary?
