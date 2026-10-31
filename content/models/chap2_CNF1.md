# CNF: turn every big job into two smaller jobs or one finished symbol

## Why the hell are we rewriting the grammar?

A rule can currently do several things at once: print terminals, create three pending jobs, hand off to one other variable, or produce nothing. That flexibility is convenient for writing a grammar, but awkward for algorithms that must reason about every derivation.

Chomsky normal form, **CNF**, limits a rule to one of two ordinary shapes:

\[A\to BC\qquad\text{or}\qquad A\to a.\]

The first splits one pending job into **two** pending jobs. The second finishes one job by printing **one** terminal. Capital letters here stand for variables, lowercase a for a terminal. They are shape examples, not the only letters allowed.

If ε belongs to the language, the new start may also have a rule to ε; that start must not appear on a right-hand side. CNF is a format for a grammar. It does not mean the language becomes regular, deterministic, or unambiguous.

Picture a job ticket. “Print a” completes it. “Do B, then C” tears it into two ordered subtickets. A variable is the ticket's label, not output printed on the page. This analogy maps only the pending-work structure: it does not introduce a real worker, time cost, or a rule that jobs must take equal time. CNF makes every ticket use one of those two shapes.

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
