# CNF as a controlled rewrite: preserve choices at every stage

## The mental model: change the wiring, keep the possible outputs

Every conversion stage should answer the same question: “How can I reconstruct an old derivation from this new one, and a new derivation from an old one?” If you only check that the final grammar **looks** like CNF, you can still have the wrong language. Format and equivalence are separate obligations.

We need an order because one repair can create the next kind of unwanted rule. Removing ε rules can create unit rules, so doing unit removal first would leave new handoffs behind.

## Step 1: protect the start and find all nullable variables

Create S₀→S, with fresh S₀ appearing on no right-hand side. If the original grammar can generate ε, only this protected start will keep that ability in the final CNF.

Find nullable variables by repeated marking. First mark variables with a direct ε rule. Then mark A whenever it has a rule whose entire right-hand side consists of already-nullable variables. A terminal blocks this: a printed `a` cannot disappear. Repeat until a full pass adds nothing. This is a **fixed point**: further application changes nothing.

Why repeat? In A→B, B→C, C→ε, A is nullable indirectly. One left-to-right scan could miss it depending on rule order. With finitely many variables, each productive pass adds a mark and the process eventually stops.

## Step 2: replace disappearing subtrees with explicit choices

For each rule, choose independently which nullable **occurrences** to omit. Keep the original rule too. For X→ABA with A nullable and B not nullable, the possibilities are ABA, AB, BA, B. The two As share a variable name but represent separate positions in a derivation.

Do not retain an ordinary empty right-hand side after this stage. Preserve S₀→ε exactly when the original start was nullable. Then remove the original ε rules from other variables.

Cycles need no special magic. With S→B|ε and B→S|ε, both variables are nullable; the language is just `{ε}`. The protected start may generate ε, but there is no terminal-producing work to invent. A conversion that manufactures `a` from this grammar is obviously wrong.

Here's the bit that makes the omission rule click. In an old derivation, a nullable variable might spend five steps becoming ε. In the new grammar, its parent can choose an alternative that leaves that position out immediately. Same finished word; fewer internal moves. We preserve the **possible output**, not the exact history of how it got printed.

## Step 3: follow unit reachability, then copy real work

A unit rule has exactly one variable on its right, such as A→B. For each A, find every B reachable by zero or more unit rules. Copy every **nonunit** B-production onto A. Then remove unit rules.

Example: A→B, B→C, C→a|DE. A needs A→a|DE, and B needs B→a|DE. C keeps its original alternatives. The slides' CNF2 page 3 wording about removing B→u should not be read as deleting the nonunit production being copied; doing that can destroy valid outputs. Retain the useful nonunit rules.

## Step 4: make terminal leaves and binary splits explicit

For X→aBCd, use U→a and V→d, then X→UBCV. Break the four-variable sequence into a chain, for example X→UH₁, H₁→BH₂, H₂→CV. Reading the leaves still gives a, then B's output, then C's, then d. Fresh helpers prevent collisions with existing variable meanings.

A rule X→a is already valid. Do not replace it by X→U unless you also remove the new unit rule afterward. The goal is standard shape, not maximum helper count.

## A final audit you can actually perform

Check every right-hand side's shape; ensure only the protected start may produce ε; ensure that start never occurs on a right-hand side; inspect repeated nullable positions; inspect unit chains and cycles; compare a few boundary strings to catch errors. Finite examples can expose a mistake, but the stage-by-stage derivation argument establishes equivalence for all strings.

**Keep:** compute closures first, then rewrite from the complete information. Next, a PDA will execute pending grammatical work using a stack.

**One connected check:** Why can removing ε rules create unit rules, and why does that determine the order of the conversion stages?
