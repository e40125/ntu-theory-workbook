# P: algorithms whose work is polynomial in the encoded input length

## The definition is a growth guarantee, not a compliment

P is the class of languages decided by deterministic TMs in polynomial time: for some fixed exponent k, running time is O(nᵏ), where n is input length. The machine must halt on every input and answer correctly. “Polynomial” does not mean instantly practical; n¹⁰⁰ is polynomial and can be absurdly large.

The value of the class is robustness: standard deterministic model changes have polynomial overhead, and useful efficient algorithms often fall inside it. It gives a precise mathematical boundary to investigate, not a guarantee about your laptop's response time.

The good algorithms stop paying for the same work repeatedly. Reachability marks what is already discovered. Euclid preserves the common divisors while shrinking the numbers. Parsing saves answers for substrings. We will identify that reusable fact, show why the updates preserve it, and count the resulting work.

## Round 1 — Polynomial is a mathematical class, not a stopwatch guarantee · pages 1–2

P contains languages decided by deterministic TMs in O(nᵏ) time for some fixed k. The union over k means the exponent may differ between languages/algorithms, but it cannot grow with n within one claimed polynomial bound. n³ is polynomial; nⁿ is not.

At n=1000, n³ is 10⁹ while 2ⁿ is about 10³⁰¹. That illustrates the growth gap. Nevertheless a polynomial with a huge exponent or constant can be impractical, and an exponential algorithm may work on small inputs. P captures a robust theoretical notion of efficient solvability, not a universal practical cutoff.

## Round 2 — PATH avoids enumerating paths · pages 3–5

PATH asks whether a directed graph contains a route from s to t. A route with repeated vertices can have its cycles removed, so a reachable target has a simple path using at most m vertices. Brute-force enumeration of candidate vertex sequences is finite but exponential.

Instead mark s, repeatedly scan edges and mark b whenever an edge a→b has marked a, then stop when no new vertex is marked. At most m productive passes occur. A simple directed graph has at most m² edges, and each marking/check can be implemented in polynomial time in the graph encoding. Thus total time is polynomial.

Correctness uses the reachability invariant from earlier decks: every mark has a path justification, and at a fixed point no reachable vertex can remain unmarked. Complexity adds a new obligation: bound passes and cost per pass. A correct decider without that accounting has not yet proved membership in P.

## Round 3 — Euclid preserves the common divisors · pages 6–11

The greatest common divisor gcd(x,y) is the largest positive integer dividing both. Two positive integers are relatively prime iff their gcd is 1. The update is (x,y)→(y,x mod y), continuing until y=0, then returning x.

Why preserve gcd? Write x=qy+r. Any common divisor of x and y divides r=x−qy. Conversely, any common divisor of y and r divides x=qy+r. The common-divisor sets are identical, hence their largest member is identical. At y=0, every divisor of x also divides 0, so gcd(x,0)=x.

Trace (24,18)→(18,6)→(6,0), returning 6. If x<y initially, the first remainder is x and the swap fixes their order. For x>y>0, x mod y<x/2 or at most x/2 by splitting into y≤x/2 and y>x/2. Across successive iterations the positive operands shrink rapidly, giving O(log x+log y) iterations.

Those logarithms are proportional to binary input length. Long division/remainder on n-bit numbers uses polynomially many bit operations; swapping stored values is polynomial too. Therefore the whole algorithm is polynomial in encoded length, not merely in the enormous numeric values.

## Round 4 — The omitted CFL-in-P proof: reuse solved substrings · page 12

For a fixed CNF grammar and input w of length n, let T[i,j] be the set of variables that generate substring wᵢ…wⱼ. Initialize length-one intervals from rules A→wᵢ. For longer intervals, consider each split k and each rule A→BC; put A in T[i,j] when B∈T[i,k] and C∈T[k+1,j]. Process shorter intervals before longer ones. Accept iff the start variable belongs to T[1,n]; handle ε separately.

There are O(n²) intervals and O(n) splits per interval, with finitely many grammar rules to check. This gives O(|R|n³) rule checks. The invariant follows the binary root split of a CNF parse tree. **Dynamic programming** means storing answers to repeated smaller subproblems so they are not recomputed exponentially. This is a supplementary proof of the theorem the slide states without proof.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
