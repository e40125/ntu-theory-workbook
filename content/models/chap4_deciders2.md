# CFG decision problems: bound the proof or summarize productivity

## The obstacle: a grammar can keep expanding forever

Given a grammar G and a string w, blindly enumerate derivations. A left-recursive rule can keep producing longer sentential forms without finishing. Even if w is not generated, that search may never run out of work. To decide membership, we need a justified finite boundary.

CNF provides one. For a nonempty target of length n, each parse tree has n terminal-producing leaves and n−1 binary splits. Therefore a successful derivation uses exactly 2n−1 rule applications. With finitely many productions, there are finitely many derivations of that length to inspect. ε is handled separately using the protected start's ε rule.

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
