# GNFA conversion: why the elimination algorithm preserves the language

## The mental model: each arrow is a summary of hidden paths

At the beginning, most labels are single symbols. After states are removed, an arrow summarizes all the ways to travel between its endpoints through the already-removed states. That sentence is the **invariant**: the fact we maintain after every step. It is what makes the final expression trustworthy.

A regular expression on an arrow describes a set of strings, not one action like a DFA's single-symbol move. Traversing an ε-labeled arrow consumes nothing; an ∅ label permits no traversal. A run can split its input into chunks matching its arrow labels.

Hold up: the same δ symbol is doing a different job now. In a GNFA, give it two stations and it tells you the expression labeling travel between them. It is not being asked for “the next state after this letter.” Once the input and output types are clear, the formula has somewhere to live.

## Round 1 — δ has changed jobs again · pages 1–2

For a DFA, δ takes a state and input symbol and returns the next state. For an NFA, it returns a set of possible next states. For a GNFA, δ takes **two endpoint states** and returns the regular expression labeling their connection. Do not read every delta in this course as the same damn function.

\[\delta:(Q-\{q_{accept}\})\times(Q-\{q_{start}\})\to\mathcal R.\]

Q minus a singleton means all states except that one. The first coordinate cannot be the accept state because no arrows leave it. The second cannot be the start because no arrows enter it. R, written here as calligraphic ℛ, is the set of regular expressions over Σ. The output can be ∅, so the formal table can have an entry for every allowed pair even when no physical arrow is drawn.

There is exactly one designated start and one designated accept. That is why the tuple contains q_start and q_accept rather than F. Add them fresh, connect start to the old start by ε, and old accept states to the new accept by ε. Merge parallel arrows by union. Keep existing loops. Missing arrows get ∅. This normalization makes the elimination procedure uniform.

## Round 2 — Read the four-label rule in the right order · pages 3–5

Choose an internal state k to remove. For remaining endpoints i and j, name i→k as R₁, k→k as R₂, k→j as R₃, and i→j as R₄. The new edge is R₁R₂*R₃∪R₄. Entry, any number of loops, exit, OR the old bypass.

“All pairs” includes i=j. If you skip self-pairs, you can lose loops created by a detour through k. Use the old labels for the whole removal round. Compute a new table separately, then replace the old table; otherwise a halfway-updated edge can sneak newly summarized journeys into the wrong calculation.

For a small teaching instance, suppose entry=a, loop=b, exit=c and bypass=d. The result ab*c∪d accepts ac, abc, abbc,… and d. It does not accept a alone, because entering without leaving does not reach j. If entry is ∅, the detour is impossible regardless of the loop. If only the loop is ∅, the detour still allows ac. These are different cases.

## Round 3 — Recursion is a smaller copy of the same job · page 6

`convert(G)` asks for an expression describing normalized graph G. If G has two states, return the label from start to accept. Otherwise remove one internal state, forming G′, and call convert(G′). **Base case** is the two-state graph. **Recursive step** reduces the number of states by one. A finite graph cannot keep losing states forever, so the algorithm terminates.

The correctness proof follows that reduction: removal preserves the language, and the two-state graph's single usable start-to-accept label describes exactly its accepted strings. Different removal orders may produce different-looking expressions with the same language; syntactic equality is not required.

The final slide asks whether starting from an NFA is okay. Yes: its ordinary labels and ε labels are already regular expressions. Normalize its start/final states, union parallel labels, and eliminate states directly. Subset construction is needed when the required output is a DFA. NFA→RE via GNFA does not require first creating the potentially much larger DFA.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## First put the graph in the required shape

Add a fresh start s with an ε arrow to the old start. Add a fresh sole accept f; put ε arrows from each old accepting state to f. Old accepting states become ordinary states. Now no arrow needs to enter s, and no arrow needs to leave f. The fresh endpoints prevent us from accidentally deleting the boundary of an accepting computation.

If two arrows share endpoints, combine labels by union. Fill missing permitted connections with ∅. This gives a label for every ordered pair whose source is not f and whose destination is not s.

The formal line

\[\delta:(Q-\{f\})\times(Q-\{s\})\to\mathcal R\]

says: choose a source state other than f and a destination other than s; receive a regular expression. Here Q is the state set; `−` removes the named element; `×` forms ordered pairs; \(\mathcal R\) means the collection of regular expressions. Unlike a DFA transition table, the second input to this δ is a **destination state**, not an alphabet symbol.

## DFA and NFA use the same preparation

A DFA already has single-symbol labels. An NFA may have parallel arrows and ε arrows. Both can be put into the GNFA shape directly. NFA→GNFA does **not** require subset construction first: the GNFA still allows alternative paths. Subset construction solves a different job—making a deterministic one-symbol-at-a-time machine.

For example, if an NFA has both `0` and ε arrows from p to q, the GNFA label is `0 ∪ ε`. It means either consume one zero or consume nothing on that connection. It does not mean consume both.

## Why one elimination is valid

Remove k. Any old path between surviving states can be split at its encounters with surviving states. A segment through k consists of entry, zero or more k-loops, and exit. The replacement expression records exactly those segments. Conversely, any string chosen from a replacement label can be expanded back into an old path. Both directions matter: preserving old paths alone would still permit accidentally adding new ones.

Each step removes one state. Since the graph began finite, eventually just s and f remain. Their edge describes exactly the original accepting paths. That proves termination and correctness for different reasons: **fewer states** gives termination; **preserved path language** gives correctness.

**Keep:** DFA/NFA→GNFA→RE compresses paths. NFA→DFA tracks candidate states. Different destination objects, different construction.

**One connected check:** Why would adding a fresh accepting state with a `1` arrow, instead of ε, change the language?
