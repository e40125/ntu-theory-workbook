# Computation histories: a finished run can be checked locally

## Replace “run the machine” with “inspect a claimed run”

A computation history is a finite sequence of configurations C₁,C₂,…,Cₘ. It claims that C₁ is the starting snapshot, each next snapshot follows legally from the previous one, and Cₘ is an accepting or rejecting halt. It's a transcript of the computation, with tape and head information included.

Checking such a supplied transcript is different from waiting for a machine to produce one. A looping computation has arbitrarily long finite prefixes, but no completed accepting or rejecting history. A finite checker can reject an invalid claimed history without resolving whether some other, longer accepting one exists.

A program can leave a receipt listing every configuration it visited. Checking a supplied receipt is local: right start, legal neighboring steps, right finish. Finding out whether any successful receipt exists is a different job. Keep the finite audit separate from the potentially unbounded search for something to audit.

## Round 1 — A history is a receipt for a completed computation · pages 1–3

A computation history lists configurations C₁,…,Cℓ. To be an **accepting** history, it must start at the correct input configuration, end in an accepting configuration, and make one legal transition between every neighboring pair. A rejecting history ends in rejection instead.

These histories are finite by definition. A looping computation has arbitrarily long finite prefixes but no completed accepting/rejecting history. A deterministic machine has at most one complete halting computation on a fixed input; an NTM may have several because different choices produce different runs.

Think of auditing a transaction log: the first balance must be right, each update must follow the rules, and the final status must meet the required outcome. A plausible final line alone cannot certify a valid history. The analogy concerns local consistency and endpoints, not financial semantics.

Checking a supplied finite receipt can be manageable even when deciding whether any successful receipt exists is impossible. The next deck exploits that distinction in reductions.

## Round 2 — Linear bounded means memory grows with this input · pages 4–7

An LBA is a TM constrained to a tape region whose size is bounded by a constant times the input length. The slide's exact-window version uses the input cells themselves, with end markers preventing escape. It is not a finite automaton: input length n can be arbitrarily large, so its available memory is not one fixed constant for all inputs.

The markers may not be overwritten, and the head may not move beyond them. A constant-factor larger workspace can be encoded using multiple tracks per cell, enlarging the finite tape alphabet. That is why common linear-space variants have equivalent language power. A finite alphabet can encode a fixed number of tracks, not an input-dependent unbounded number.

The slide lists finite-automaton and grammar decision tasks as examples that fit this kind of bounded storage; it does not derive those implementations here. Do not confuse “the algorithm terminates” with “it uses only linear space.” The latter needs its own storage accounting.

## Round 3 — Count complete configurations, not just control states · pages 8–9

For q states, n available head positions and g tape symbols, there are at most q·n·gⁿ configurations. The three factors represent state choice, head-position choice and all n-cell tape contents. gⁿ arises because each cell independently has g options. Protected-marker conventions may forbid some combinations, so this is a sufficient upper bound even when not every combination is legal.

For illustration, q=3,n=2,g=2 gives 3×2×4=24 possibilities. Revisiting the same state alone does not force a loop: tape or head position may differ. Revisiting the same **entire configuration** in a deterministic machine forces identical future behavior.

## Round 4 — A finite configuration graph gives a halting algorithm · page 10

For a deterministic LBA on a fixed input, simulate until it accepts, rejects, or repeats a complete configuration. Repetition means a loop, so reject the acceptance question. Equivalently, use the configuration bound to know when repetition must have occurred. Handle empty input separately according to the machine's boundary convention rather than substituting n=0 blindly into a zero bound.

For a nondeterministic LBA, one repeated configuration on one branch is not enough to reject everything. Explore the finite configuration graph with a visited set and accept iff an accepting configuration is reachable. The graph is finite for this fixed input, so the search terminates.

Thus A_LBA is decidable. The input length supplies the finite bound. Asking whether the same LBA accepts **some input of any length** removes that fixed n, which is why the emptiness problem in the next deck can be undecidable without contradicting this result.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
