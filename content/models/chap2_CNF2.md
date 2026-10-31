# CNF as a controlled rewrite: preserve choices at every stage

## The mental model: change the wiring, keep the possible outputs

Every conversion stage should answer the same question: “How can I reconstruct an old derivation from this new one, and a new derivation from an old one?” If you only check that the final grammar **looks** like CNF, you can still have the wrong language. Format and equivalence are separate obligations.

We need an order because one repair can create the next kind of unwanted rule. Removing ε rules can create unit rules, so doing unit removal first would leave new handoffs behind.

A recipe can delegate to another recipe that delegates straight back. If your cleanup keeps chasing that loop, you never finish. So we collect what is reachable, remember what we already found, and stop when nothing new appears. That stopping point is a fixed point; it is bookkeeping with a termination reason.

## Round 1 — Stop playing whack-a-mole with ε rules · pages 1–2, 6–8

The source cycle S→B|ε, B→S|ε shows why naive editing can loop forever. Remove S→ε and B can recreate it; remove B→ε and S can recreate it. The grammar is finite, but an undisciplined procedure can keep repeating the same work.

Compute the **nullable set** first. Initially mark variables with an explicit ε rule. Repeatedly mark X when it has a rule whose entire right side consists of already-marked variables. A terminal blocks that reasoning because it cannot disappear. Stop when a complete pass adds no new variable. This stable result is a **fixed point**. Each productive pass marks something new and there are finitely many variables, so termination is guaranteed.

For the cycle, S and B are both nullable immediately. Add fresh S₀→S and preserve S₀→ε. Generate omission alternatives once, retaining originals, then remove ε rules of nonstart variables. Record handled combinations instead of reintroducing them indefinitely. The original language is only {ε}, so after eliminating unit-only dead ends the final useful CNF grammar can simply be S₀→ε.

## Round 2 — A set of reachable delegates kills unit cycles · pages 3–4

A **unit rule** has exactly one variable on the right, such as A→B. For each X, compute Unit(X), the variables reachable from X using zero or more unit rules. Include X itself: its existing nonunit productions must survive. If X→Y and Y→Z, then Z belongs to Unit(X). If Z→X, you have a cycle, not an instruction to repeat forever.

For every Y in Unit(X), copy each nonunit Y→u as X→u. Then discard unit rules. Page 3's wording says to remove both A→B and B→u; deleting B→u globally would be unsafe when other rules still need B. The intended language-preserving move copies B's work to A and retains B's work. This is a source wording correction, not permission to silently alter the target grammar.

## Round 3 — Make one complicated rule obey the two permitted shapes · page 5

Teaching example: X→aBCd. Introduce U→a and V→d. Replace the rule by X→UBCV, then split it into X→UY₁, Y₁→BY₂, Y₂→CV, using fresh helpers. Expand the helpers and you recover the exact ordered string aBCd.

Do not replace a rule X→a by X→U unnecessarily; that creates a forbidden unit rule. Terminal wrappers are needed when a terminal appears in a right side of length at least two. A right side of three or more variables needs a binary chain. A two-variable right side already has the correct shape.

## Round 4 — Turn the recipe into checks you can actually use

After fresh start, nullable handling, unit handling, terminal isolation and binary splitting, inspect the result against the definition. Every ordinary alternative must be one terminal or two variables. The designated start must not occur on a right side. Its ε rule must be present exactly when the old language included ε.

Also inspect **freshness**: helper labels cannot accidentally collide with old variables. Inspect **order**: BC differs from CB. Inspect **occurrences**: three nullable appearances create up to 2³ choices before duplicates are merged. Duplicate productions do not change a grammar's language, but losing a distinct omission alternative can.

The conversion is systematic because each stage solves one precise violation. If a rule is still illegal at the end, identify which violation remains instead of restarting the whole procedure. The normal form is a tool for later algorithms; there is no claim that it makes the grammar smallest or easiest for a human to read.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
