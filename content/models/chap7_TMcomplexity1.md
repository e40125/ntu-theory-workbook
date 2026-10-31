# Simulation cost: equal computability can come with a quadratic bill

## Revisit the one-tape encoding with a stopwatch

We already know one tape can represent k tapes using separated blocks and marked head positions. Now ask how much time that simulation takes. Suppose the multitape machine runs in t(n) steps on inputs of length n, with t(n)≥n and fixed k.

In t steps, each head can visit only O(t) cells, and the original input occupies at most t cells under the assumption. With a fixed number of tapes, the entire encoded configuration therefore has length O(t). This is a bound on how far the simulator may need to scan.

## One simulated step is not one real step

The simulator must sweep to find the marked symbols, remember their tuple, apply the joint transition, move markers, and sometimes insert a blank cell by shifting later data. Each such phase costs O(t) on a representation of length O(t). A fixed number of phases still costs O(t).

There are at most t simulated steps. Multiply: \(O(t)\times t=O(t^2)\). Initialization is absorbed under t≥n. The constants may depend on the fixed simulated machine and number of tapes, not on the input length.

If the simulation at step i has only O(n+i) stored cells, a more detailed sum is \(\sum_{i=1}^{t}O(n+i)\), which is O(nt+t²), hence O(t²) when t≥n. The rough bound and the sum describe the same source of cost.

## What the theorem actually promises

Every such multitape computation has a one-tape simulation with at most quadratic overhead under this construction. It does **not** say every one-tape algorithm for the same language must be quadratically slower. A different direct algorithm might do better. An upper-bound construction isn't a lower-bound impossibility proof.

For example, simulating a linear-time multitape method gives an O(n²) one-tape method. That demonstrates existence of a quadratic method; it does not establish that O(n²) is optimal.

## Why polynomial time survives

If t(n)=nᵈ for a fixed constant d, squaring produces n^{2d}, still a polynomial. This is one reason polynomial time is a robust category across these standard deterministic tape models. A constant number of extra tapes may alter the exponent or practical speed without turning a polynomial computation into an exponential one under this simulation.

By contrast, nondeterministic simulation will involve a tree of alternative configurations, not merely one encoded configuration. The next deck counts how many branches must be explored. Different source of overhead, different bound.

**Keep:** representation length bounds scan cost; scan cost times simulated steps gives total cost. Equal language power doesn't mean equal speed, and an upper bound doesn't prove optimality.

**One connected check:** Which two separate facts contribute the two factors of t in the O(t²) simulation bound?
