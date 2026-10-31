# Nondeterministic time: depth is cheap to define, the whole tree is costly to search

## Name what “time” measures before counting

For a nondeterministic decider, time t(n) is the maximum number of steps along any branch on inputs of length n. It measures the longest branch, not the total number of nodes across the computation tree. Every branch must halt within that bound.

If each step has at most b choices, with b a constant determined by the machine, there can be roughly b^d paths of length d. A depth-t tree can therefore contain exponentially many candidates even though each individual branch is short.

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
