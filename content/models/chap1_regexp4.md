# GNFA conversion: why the elimination algorithm preserves the language

## The mental model: each arrow is a summary of hidden paths

At the beginning, most labels are single symbols. After states are removed, an arrow summarizes all the ways to travel between its endpoints through the already-removed states. That sentence is the **invariant**: the fact we maintain after every step. It is what makes the final expression trustworthy.

A regular expression on an arrow describes a set of strings, not one action like a DFA's single-symbol move. Traversing an ε-labeled arrow consumes nothing; an ∅ label permits no traversal. A run can split its input into chunks matching its arrow labels.

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
