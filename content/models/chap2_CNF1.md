# CNF: turn every big job into two smaller jobs or one finished symbol

## Why the hell are we rewriting the grammar?

A rule can currently do several things at once: print terminals, create three pending jobs, hand off to one other variable, or produce nothing. That flexibility is convenient for writing a grammar, but awkward for algorithms that must reason about every derivation.

Chomsky normal form, **CNF**, limits a rule to one of two ordinary shapes:

\[A\to BC\qquad\text{or}\qquad A\to a.\]

The first splits one pending job into **two** pending jobs. The second finishes one job by printing **one** terminal. Capital letters here stand for variables, lowercase a for a terminal. They are shape examples, not the only letters allowed.

If ε belongs to the language, the new start may also have a rule to ε; that start must not appear on a right-hand side. CNF is a format for a grammar. It does not mean the language becomes regular, deterministic, or unambiguous.

Picture a job ticket. “Print a” completes it. “Do B, then C” tears it into two ordered subtickets. A variable is the ticket's label, not output printed on the page. This analogy maps only the pending-work structure: it does not introduce a real worker, time cost, or a rule that jobs must take equal time. CNF makes every ticket use one of those two shapes.

Aight, imagine a messy kitchen where a recipe step can do six jobs, delegate to another recipe, or produce nothing. CNF makes every ordinary instruction do one of two things: split into two jobs, or print one finished symbol. Same possible finished strings. Cleaner instructions. The hard part is preserving every choice while we clean this shit up.

## Round 1 — Standardize the jobs without changing the outputs · pages 1–4

Think of converting a messy instruction manual into two permitted instruction types: “do these two subtasks, in order” or “print this one symbol.” That is the whole CNF project. We preserve the completed terminal strings. We do not promise to preserve every old intermediate string, tree shape or number of derivation steps.

A→BC has two variables on the right. A→a has one terminal. A→B is a pure handoff and forbidden; A→ab prints two terminals and is forbidden; A→aB mixes types and is forbidden. Only the start may have an ε rule, if empty input belongs to the language. The start must not appear on any right side. These are shape conditions, not claims about which letters you must use.

Read the grammar punctuation before using it. In `S→ASA|aB`, the arrow means “S may be replaced by”; the vertical bar means **or**, separating two alternatives. It does not print a bar into the output. `ASA` means three consecutive jobs, in that order. `ε` is the empty string: no printed symbol. A **production** is one such replacement rule. In a derivation, ⇒ records one actual replacement, while ⇒* means zero or more replacements.

The slide begins with S→ASA|aB, A→B|S, B→b|ε. Add a fresh S₀→S because the old S appears inside ASA and therefore cannot remain the designated CNF start. S₀ is a new label with a special role; it does not automatically gain ε. Since the old S always eventually prints at least one a, this particular grammar does not generate ε.

## Round 2 — Follow the disappearing work through its parents · pages 5–6

A variable is **nullable** when it can derive ε, directly or through other rules. B→ε means a B job may contribute nothing. In S→aB, preserving that choice requires S→a. In A→B, preserving it gives A→ε, so A becomes nullable too. B→b stays: the choice to print b is still valid.

Now each A occurrence in ASA can contribute nothing independently. Keep ASA and add AS, SA and S. The middle S stays because it cannot derive ε. The generated rule S→S makes no progress and will be removed in the unit phase. An ε-production's effect is preserved at places that use its variable; it is not a license to delete arbitrary surrounding symbols.

See a complete old derivation: S⇒ASA⇒BSA⇒SA⇒aBA⇒aA⇒aB⇒ab. Here is the same run with the missing reasons filled in:

| Current work | Rule used | Result | What changed |
|---|---|---|---|
| S | S→ASA | ASA | Split the initial job into three ordered jobs. |
| ASA | A→B | BSA | Replace only the left A occurrence. |
| BSA | B→ε | SA | That B prints nothing; S and A stay. |
| SA | S→aB | aBA | S prints an a and leaves a B job. |
| aBA | B→ε | aA | This B also contributes nothing. |
| aA | A→B | aB | The remaining A delegates to B. |
| aB | B→b | ab | Finish the last job by printing b. |

Both disappearing choices were legitimate B→ε uses; the final B used B→b instead. A nullable variable can disappear on one occurrence and print something on another. Treating “nullable” as “always empty” would lose valid outputs.

## Round 3 — A unit rule delegates; copy the actual work · pages 7–9

S→S changes nothing, so remove it. S₀→S says the new start may do whatever S can do; copy S's nonunit alternatives to S₀. A→B supplies A→b. A→S supplies A with S's nonunit alternatives. Keep the original S and B alternatives too, because other productions still refer to those variables.

For each unit chain X⇒*Y consisting only of variable-to-variable steps, let X inherit Y's nonunit alternatives. This includes chains longer than one link and cycles. A finite reachable-variable set is safer than repeatedly rewriting the same unit cycle forever.

## Round 4 — Helpers are packaging, not a new language · page 10

For aB, introduce U→a and use UB. For ASA, introduce A₁→SA and use AA₁. Expanding AA₁ restores ASA exactly; expanding UB restores aB. No letters are reordered or discarded. A₁ is a fresh variable label, not A multiplied by 1.

The complete final grammar is displayed in the worked model below; it follows the slide. Check each alternative individually: AA₁, UB, AS and SA are two variables; a and b are one terminal. The designated start S₀ occurs only on left sides. There are no unit or unwanted ε rules. That is the shape check.

The language check has two directions. Every omitted nullable occurrence can be restored by its old ε derivation; every copied unit alternative can be preceded by its old unit chain; every helper can be expanded back. Conversely, compress those old ε subtrees, unit chains and long right sides into the new productions. Each local change preserves terminal outputs, so the whole conversion does too. A pretty final grammar with no such reasoning is only half the job.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## First understand what “can disappear” means

Use the slide grammar:

\[S\to ASA\mid aB,\quad A\to B\mid S,\quad B\to b\mid\varepsilon.\]

B can finish with nothing via B→ε, so B is **nullable**. A can disappear too: A→B→ε. S cannot: every completed S derivation eventually uses an `aB`, so at least one `a` remains.

Nullable does not mean “delete this variable everywhere.” B can also produce `b`. Removing that possibility would mutilate the language. Nullable means we must preserve **both** choices: it may contribute something, or contribute nothing.

## The crucial example: two A occurrences are two independent jobs

In S→ASA, the left A and right A are separate occurrences. Each may disappear. So retain these four right-hand sides:

| Left A | Right A | Result |
|---|---|---|
| keep | keep | ASA |
| keep | omit | AS |
| omit | keep | SA |
| omit | omit | S |

The middle S stays: it is not nullable. Do not omit it just because its letter looks like another variable. The choices are based on derivability of ε, not typography.

S→aB additionally supplies S→a when B disappears. We are replacing the effect of an ε-producing subtree with a shorter parent rule. That is why deleting ε rules **after adding alternatives** preserves nonempty strings.

## Remove handoffs, then package large right-hand sides

A unit rule A→B only delegates to another variable without printing anything. Replace it by B's possible nonunit work. For chains, follow all reachable unit links. For cycles, collect reachable variables once; looping around forever contributes no completed terminal output.

Then `aB` must become two variables: introduce U→a and replace it by UB. `ASA` has three variables; introduce A₁→SA and replace it by AA₁. The helper is a package for the last two jobs. It does not reorder them.

With a fresh start S₀ and the slide's simplifications, a final CNF grammar is:

\[
\begin{aligned}
S_0&\to AA_1\mid UB\mid a\mid AS\mid SA\\
S&\to AA_1\mid UB\mid a\mid AS\mid SA\\
A&\to b\mid AA_1\mid UB\mid a\mid AS\mid SA\\
A_1&\to SA\qquad U\to a\qquad B\to b.
\end{aligned}
\]

Each ordinary right-hand side is two variables or one terminal. There is no S₀→ε because the original language did not contain ε.

## What the normal form buys us

For a nonempty string of length n, a CNF parse tree has n terminal-producing leaves and n−1 binary splits: 2n−1 rule applications. The grammar may still have many possible trees, but each tree's size is now tied to the input length. Later, this gives finite algorithms for membership.

**Keep:** nullable removal preserves disappearing jobs; unit removal bypasses pure handoffs; helpers preserve ordered work while standardizing its size. Next we make these operations systematic enough to survive cycles and repeated variables.

**One connected check:** Why does replacing ASA only by AS lose a possibility, even though AS is one correct alternative?
