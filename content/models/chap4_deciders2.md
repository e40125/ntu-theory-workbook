# CFG decision problems: bound the proof or summarize productivity

## The obstacle: a grammar can keep expanding forever

Given a grammar G and a string w, blindly enumerate derivations. A left-recursive rule can keep producing longer sentential forms without finishing. Even if w is not generated, that search may never run out of work. To decide membership, we need a justified finite boundary.

CNF provides one. For a nonempty target of length n, each parse tree has n terminal-producing leaves and n−1 binary splits. Therefore a successful derivation uses exactly 2n−1 rule applications. With finitely many productions, there are finitely many derivations of that length to inspect. ε is handled separately using the protected start's ε rule.

Randomly trying grammar rewrites can get stuck in pointless delegation forever. CNF gives us a size budget for a successful derivation of a specified string length. Now the search has an actual fence around it. We can inspect every candidate inside that fence and justify both yes and no answers.

## Round 1 — CNF finally pays rent · pages 1–2

Naively enumerating arbitrary grammar derivations is dangerous: A→B→A can repeat forever without printing anything. CNF removes those arbitrary unit/ε detours for nonempty derivations. If a generated string has n≥1 terminals, its parse tree has n terminal-producing nodes and n−1 binary-splitting nodes, totaling 2n−1 production applications.

Why n−1 splits? Start with one pending leaf. Each binary split increases the number of pending leaves by one. To end with n leaves requires n−1 increases. Each final leaf then prints one terminal. This is the structural reason for the bound, not an unexplained number to memorize.

Convert G to CNF, then enumerate leftmost derivations of exactly 2n−1 steps and compare outputs to w. Fixing leftmost expansion removes the additional choice of which variable occurrence to expand. If there are q productions, at most q choices per step gives a finite upper bound q^(2n−1); incompatible choices can be discarded. Handle w=ε separately by checking whether the start is nullable or has the allowed ε rule.

This algorithm may be wildly inefficient, but it always finishes. Its purpose here is decidability. The later dynamic-programming algorithm improves the runtime.

## Round 2 — Productive means “can finish some terminal string” · pages 3–5

For grammar emptiness, mark terminals as already finished. Mark a variable A when some rule A→U₁…Uₖ has every right-side symbol marked. Then A can finish by following that rule and finishing each child. An ε rule has no unfinished children, so it marks its left variable immediately.

Repeat until no new variable is marked. The set only grows, and there are finitely many variables. A cycle A→B,B→A without any terminal-producing exit never gets marked: passing work around forever is not completing it.

If the start is unmarked, no complete output exists, so accept the **emptiness** question. If marked, reject emptiness. Soundness follows from the completed derivations behind marks. Completeness follows upward from any finite terminal parse tree: its leaves are marked, then their parents, eventually its root.

## Round 3 — One failed method is not an impossibility proof · page 6

DFA equivalence used intersection and complement to build a disagreement language. CFLs are not closed under arbitrary intersection or complement, so the same construction is unavailable. That alone does not prove CFG equivalence undecidable; it only blocks this proof method. A separate reduction establishes the impossibility result in later theory.

Intersection with a **regular** language is a different statement and is closed for CFLs. “Not closed under intersection” means two arbitrary CFL operands can leave the family. Keep the operand conditions, or a memorized slogan will lead you into the wrong argument.

## Round 4 — A PDA recognizer may loop even though its language is decidable · pages 7–10

A PDA can make infinitely many ε pushes without consuming the next symbol. Simulating it directly therefore may fail to give a halting decision algorithm. The language's decidability does not require every machine recognizing it to halt; it requires at least one decider.

Given a fixed CFL, choose a CFG for it and run the bounded membership procedure above on each input. This produces the needed decider. PDA→CFG conversion is finite, so a supplied PDA's membership can be decided by that route too.

The hierarchy is regular ⊊ context-free ⊊ decidable ⊊ Turing-recognizable. Each inclusion means every language in the inner family belongs to the outer; strictness means some outer languages are missing inside. Examples include equal blocks for the first separation and acceptance problems for the last. A language family classifies accepted sets, while a particular machine may have extra unnecessary loops or cumbersome implementation.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Work the size argument rather than memorize 2n−1

A binary split increases the number of pending leaves by one: replace one variable by two. Starting from one variable, it takes n−1 splits to create n final positions. Each position then uses one terminal rule, contributing n more applications. Total: (n−1)+n.

For a three-symbol word, the tree uses two binary splits and three terminal productions: five applications. The shape can vary, and there may be many candidate trees, but none needs an arbitrarily long chain of unit or ε productions because CNF removed those ordinary rules.

The resulting exhaustive algorithm may be slow. “Finite” establishes decidability, not polynomial efficiency. A later deck states the stronger fact that CFL membership has polynomial-time algorithms.

## Emptiness uses a different summary: can this variable finish?

For \(E_{CFG}\), mark variables capable of producing terminal-only strings. Initially mark variables with terminal-only right-hand sides, including ε. Then mark A if a rule A→α has every variable in α already marked. Terminals in α are already finished output. Repeat to a fixed point.

If the start is marked, some completed word can be generated. If it isn't, the language is empty. For A→BC, B→b, C→c, B and C become marked first, then A. For A→B, B→A with no finishing production, neither ever becomes productive. A cycle alone does not manufacture output.

Why is the test complete? Any finite parse tree has productive terminal leaves, then productive parents, working upward. Why is it sound? Each new mark is justified by combining actual terminal derivations for the rule's children. Finitely many variables guarantee termination.

## Why DFA equivalence doesn't transfer automatically

For DFAs, disagreement was represented by complement, intersection, and union constructions. Context-free languages are not generally closed under complement or intersection, so that route is unavailable for arbitrary CFGs. The deck states that CFG equivalence is undecidable. Failure of this one construction is **not itself** a proof of undecidability; the impossibility claim needs a separate theorem.

This also explains why a PDA with ε loops can recognize a decidable language. We need not use its possibly nonterminating branches as our deciding algorithm. Convert to a CFG and use a terminating membership procedure.

**Keep:** bound successful derivation size for membership; compute productivity for emptiness. Different questions may need different finite summaries.

**One connected check:** Why does a cycle A→B→A not make A productive unless some reachable rule can actually finish in terminals?
