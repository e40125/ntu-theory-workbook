# Simulation cost: equal computability can come with a quadratic bill

## Revisit the one-tape encoding with a stopwatch

We already know one tape can represent k tapes using separated blocks and marked head positions. Now ask how much time that simulation takes. Suppose the multitape machine runs in t(n) steps on inputs of length n, with t(n)≥n and fixed k.

In t steps, each head can visit only O(t) cells, and the original input occupies at most t cells under the assumption. With a fixed number of tapes, the entire encoded configuration therefore has length O(t). This is a bound on how far the simulator may need to scan.

We already built an interpreter for several virtual tapes on one tape. Now audit its bill: how long is the encoded workspace, how many scans per simulated step, how many steps total? The theorem comes from multiplying those costs with the machine’s fixed number of tapes kept fixed.

## Round 1 — The old simulation proves possibility; now price the work · pages 1–2

The theorem says a k-tape TM running in t(n)≥n time can be simulated by a one-tape TM in O(t(n)²) time. k is fixed for the source machine; it is not an extra parameter growing with the input. This is an upper bound on one general simulation, not a claim that every multitape computation inherently needs that much time on one tape.

The condition t(n)≥n ensures the input length is covered by the runtime bound. More generally the represented span is controlled by n+t(n); using t(n)≥n simplifies that to O(t(n)). Conditions written before a theorem usually pay for some later step like this.

## Round 2 — How long can the encoded tapes get? · pages 3–4

In t steps, a head can move at most t cells from its initial position. Each step writes only one cell per tape. Including the original input, the used span of each tape is O(n+t), hence O(t). With fixed k tapes, the combined delimiter/head-marker encoding has length O(kt)=O(t).

One simulated step scans that encoding to find all marked head symbols, computes the source transition in finite control, and scans to update writes and head marks. If a region must grow, shifting the remaining encoding costs O(t) too. A fixed number of such scans and shifts remains O(t).

The simulator may carry a displaced symbol in its state during a shift, as explained in the earlier conversion. It does not need an unbounded state set because the source alphabet and number of tapes are fixed. The tape stores the growing data; finite control stores a fixed-sized local tuple.

## Round 3 — Multiply the number of rounds by a valid per-round bound · page 5

There are at most t source transitions. Each costs at most C·t simulator transitions for some machine-dependent constant C, after accounting for initialization and encoding. Thus total ≤C·t² plus lower-order setup costs, giving O(t²).

We used the final upper bound t as a ceiling for every intermediate encoding length. That may overestimate early steps, but an upper-bound proof is allowed to overestimate consistently. It must not underestimate an operation, such as ignoring shifts or input copying.

If the multitape algorithm runs in n³ time, this simulation yields a one-tape n⁶ upper bound. The exponent changes, but the result remains polynomial. If it runs in 2ⁿ time, squaring gives 4ⁿ, still exponential. The theorem preserves the broad polynomial/exponential distinction while allowing substantial speed differences.

## Round 4 — What this establishes about P

Because a one-tape machine is a special multitape machine and the reverse simulation has polynomial overhead, polynomial-time decidability is unchanged between these standard fixed-tape models. That is the relevant **robustness** of P.

It does not say hardware choices never matter in practice, or that all conceivable computational models have polynomially equivalent costs. The proof uses specific local tape operations and a fixed finite encoding. If you add an operation that solves an arbitrary hard problem in one step, this simulation theorem no longer justifies treating it as free.

When writing an exam proof, present the memory-span bound, the cost of one simulated step, and the number of simulated steps. “By equivalence of TMs” only proves language power; it omits the runtime accounting the question is asking for.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
