# Nondeterministic time: depth is cheap to define, the whole tree is costly to search

## Name what “time” measures before counting

For a nondeterministic decider, time t(n) is the maximum number of steps along any branch on inputs of length n. It measures the longest branch, not the total number of nodes across the computation tree. Every branch must halt within that bound.

If each step has at most b choices, with b a constant determined by the machine, there can be roughly b^d paths of length d. A depth-t tree can therefore contain exponentially many candidates even though each individual branch is short.

A nondeterministic tree can have short branches and a shitload of branches. Those are different costs. The NTM time bound measures the longest branch; a deterministic search pays to explore alternatives. First count possible branches, then include what it costs to represent and inspect them.

## Round 1 — Nondeterministic time measures one branch, not the whole tree · page 1

For an NTM decider, t(n) bounds the number of transitions on **every** branch for every input of length n. The maximum includes rejecting branches. A machine with one fast accepting branch and another infinite branch is not a polynomial-time NTM decider under this definition.

Let b be a fixed upper bound on the number of transition choices from any local situation. A computation tree of depth t has at most 1+b+…+bᵗ nodes. For b≥2, this is O(bᵗ). If b=1, the machine is deterministic and the tree is a single path; we can still use the looser exponential upper bound by taking max(2,b).

Nondeterministic “parallel” language is a way to describe existential branches, not a promise of exponentially many physical processors running for free. Deterministic simulation must account for exploring the choices.

## Round 2 — Pay for each branch address you inspect · pages 2–4

Use the three-tape breadth-first simulator: original input, current branch simulation, branch address. Each address has length at most t. Resetting/copying the input costs O(n), which is O(t) because t≥n. Following that address costs O(t), and updating/enumerating its next address costs O(t).

Invalid addresses can stop early; they do not exceed the bound. Keeping the bound for all possible addresses is safe even if many do not correspond to real nodes. If an accepting configuration is found, accept. When every relevant branch is exhausted without acceptance, reject. The NTM's all-branches time bound makes this finite.

Thus a direct multitape simulation costs O(bᵗ·t). The factor t is real bookkeeping work; we do not omit it and hope the exponential hides the explanation.

## Round 3 — Why that product becomes 2^{O(t)} · pages 5–6

Rewrite bᵗt as 2^{t log₂b+log₂t}. Since b is fixed, log₂b is a constant. For t≥1, log₂t≤t. Therefore the exponent is at most (log₂b+1)t, giving 2^{O(t)}.

Now convert the three-tape simulator into one tape using the previous quadratic-overhead theorem. If the multitape bound is at most 2^{ct}, its square is 2^{2ct}. Doubling a fixed constant in the exponent still fits 2^{O(t)}. This is why the final single-tape statement has the same broad exponential form.

Do not confuse 2^{O(t)} with O(2ᵗ). The former allows any fixed constant multiple of t in the exponent; the latter only allows a fixed multiplier outside 2ᵗ. That distinction was introduced in Big-O 1 and is doing useful work here.

## Round 4 — What the theorem does and does not settle

For a polynomial-time NTM, this general simulation gives a deterministic exponential-time upper bound. It does not prove exponential time is necessary for that language. A clever deterministic algorithm might avoid enumerating the full tree.

That gap leads to P versus NP: can every polynomially bounded nondeterministic search be replaced by some polynomial deterministic method, perhaps one quite different from brute-force simulation? An expensive generic simulation cannot answer no. To establish a lower bound, we would have to rule out all faster algorithms, not merely analyze this particular one.

The transferable proof pattern is explicit: count candidates, bound work per candidate, multiply, and then account for model-conversion overhead. Each layer needs a bound before the final asymptotic shorthand is justified.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## See the difference on a small tree

With two choices per step and depth three, there can be eight length-three choice sequences: 111,112,121,122,211,212,221,222. Each branch takes three steps. A deterministic simulator that explores all choices may need to inspect all eight branches before concluding that none accepts.

Growing depth from three to thirty doesn't merely multiply the candidate count by ten. It can multiply it from 2³ to 2³⁰. That's the source of the exponential cost; no individual transition became expensive.

## Derive the simulation bound

Enumerate candidate choice sequences up to length t, replay each for at most O(t) steps on a multitape simulator, and check whether any accepts. The number of candidates is bounded by a constant-base exponential in t. Multiplying by a polynomial factor such as t still gives \(2^{O(t)}\).

If b=1 there is no branching and the search is much cheaper, but the exponential expression remains a valid general upper bound. Converting the resulting deterministic multitape simulation to one tape squares its running time. Squaring \(2^{ct}\) gives \(2^{2ct}\), still \(2^{O(t)}\). The constant in the exponent changes; the broad form does not.

## What this says about power and efficiency

Nondeterministic and deterministic TMs decide the same languages because the finite tree can be searched. But the straightforward deterministic simulation may be exponentially slower than the longest nondeterministic branch. Whether every polynomial-time nondeterministic decision problem has some polynomial-time deterministic method is the P versus NP question—not settled by this expensive simulation.

An exponential simulation proves an upper bound that is sufficient for decidability. It does not prove that an exponential slowdown is unavoidable. Again: “our method costs this much” and “every possible method must cost this much” are different claims.

## Connect this to a guessed solution

A nondeterministic branch can guess a short candidate and verify it. The branch length includes both guessing and checking. A deterministic exhaustive search may try every candidate. Later, the certificate definition of NP packages exactly this distinction: a supplied candidate can be easy to check even when finding one efficiently is not known.

**Keep:** nondeterministic time measures branch depth; deterministic search may pay for the whole tree. Do not silently substitute one quantity for the other.

**One connected check:** Why does a polynomial bound on each branch fail, by itself, to give a polynomial bound on the number of branches?
