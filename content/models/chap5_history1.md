# Computation histories: a finished run can be checked locally

## Replace “run the machine” with “inspect a claimed run”

A computation history is a finite sequence of configurations C₁,C₂,…,Cₘ. It claims that C₁ is the starting snapshot, each next snapshot follows legally from the previous one, and Cₘ is an accepting or rejecting halt. It's a transcript of the computation, with tape and head information included.

Checking such a supplied transcript is different from waiting for a machine to produce one. A looping computation has arbitrarily long finite prefixes, but no completed accepting or rejecting history. A finite checker can reject an invalid claimed history without resolving whether some other, longer accepting one exists.

## Three checks make the claim precise

First verify that C₁ is the actual start configuration for the specified input. Then check every adjacent pair: did exactly the allowed write, head movement, and state change occur, with other cells unchanged? Finally check the required terminal condition, such as an accepting halt state in Cₘ.

A string with the right first and last states can still contain a fake middle step. Conversely, a sequence of locally legal steps beginning from the wrong input proves nothing about the intended instance. All three clauses matter.

This is another proof pattern: a long global claim can have a finite certificate with many small consistency checks. Later, NP uses polynomially bounded certificates; here the history can be arbitrarily long.

## Bounded tape makes the configuration space finite

A linear bounded automaton, LBA, is a TM whose available tape is bounded by the input length under the course model. It may revisit and rewrite those cells, but it cannot keep expanding its workspace beyond the allotted region.

For n available cells, q control states, and g tape symbols, there are at most \(q\,n\,g^n\) configurations: q state choices, n head positions, and g choices independently for each cell. The exact boundary convention can change a constant factor; finiteness is the key. Fix the input before counting—n is not one constant for all possible inputs.

## Why membership becomes decidable

For a deterministic LBA, if the same complete configuration repeats before halting, future behavior repeats too, so it will loop. Simulate until accept, reject, or a repeated configuration. Finite configuration space guarantees one of these outcomes.

For a nondeterministic LBA, searching one path is insufficient. Explore the finite directed graph of configurations and ask whether an accepting configuration is reachable. Keep a visited set to avoid revisiting loops forever. This is the DFA reachability idea applied to a much larger finite graph.

## The limit of this result

We have a bound for one fixed input length. It does not automatically settle whether an LBA accepts **some** input of any length. That problem ranges over unbounded n, so no single finite configuration graph covers all candidates. The next deck uses computation histories to show why this distinction matters.

**Keep:** a finite claimed run can be verified; bounded space gives finitely many configurations per input; membership and emptiness quantify over different things.

**One connected check:** Why does the bound qngⁿ decide one-input acceptance without supplying a bound on the shortest accepted input of an arbitrary LBA?
