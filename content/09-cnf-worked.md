This is a guided reconstruction of **2020 Midterm 2, Problem 4**. The grammar and requested stages are from that paper. The explanations are ours. Open the linked official PDF when you want to compare the original solution.

**We are now changing examples.** The slide grammar above had S→ASA|aB, so its S could not disappear. This exam has different rules: S→A and A→ε, so **here S can disappear**. A variable's name does not determine its behavior; its rules do. Carry over the conversion method, then recompute the nullable variables from this problem's grammar.

## What the problem asks

Given S→A|0A and A→SAS|ε, convert to CNF. Show the new start, ε elimination, unit elimination, and final rule shapes. It is not asking you to invent a different grammar that merely looks plausible.

## Before moving rules: what the original grammar is saying

S and A are **unfinished jobs**, not machine states. `0` is finished output. A rule replaces one occurrence of its left-hand variable. The vertical bar separates choices. ε means finish with no output.

So S→A means “hand S's job to A.” S→0A means “print one zero, then do A's job.” A→SAS means “replace this A by three ordered jobs: S, then A, then S.” A→ε means “this A can finish by contributing nothing.” Choosing A→ε on one occasion does not force every A in every derivation to disappear.

Here is one complete old derivation:

\[S\Rightarrow0A\Rightarrow0SAS\Rightarrow00AAS\Rightarrow00AS\Rightarrow00S\Rightarrow00A\Rightarrow00.\]

At each step, only one variable is replaced. The two zeros stay where they were printed. There are several possible derivations of `00`; we only need one to see how the rulebook works. The grammar also generates ε by S⇒A⇒ε.

CNF asks us to preserve **all these completed outputs**, while making each ordinary rule either “split into two variables” or “print one terminal.” Think of rewriting a messy set of instructions into small standard instructions. Same possible results, different instruction sizes.

## Why disappearing jobs require extra alternatives

Both A and S are nullable: A⇒ε directly, and S⇒A⇒ε indirectly. “Nullable” means *can* finish with nothing. It does not mean *must* finish with nothing.

Look at A→SAS as three positions:

```text
position 1     position 2     position 3
    S              A              S
```

Each position can disappear independently. If we computed all nullable choices at once, the nonempty possibilities would be `SAS`, `SA`, `SS`, `AS`, `S`, `A` (with duplicate `S` results merged). The all-omitted case produces ε, which the final grammar must reserve for its fresh start. An `A→A` alternative makes no progress and may be removed.

The official staged method below removes A's ε rule first, then S's. That is a bookkeeping sequence for preserving the same choices. When A disappears from SAS, it leaves SS. When either S later disappears from that SS, it leaves S. **That's where A→S comes from.** Don't pull it out of thin air or delete a variable just because it's uppercase.

## Add the start and remove nullable rules

Begin:

```
S₀ → S
S  → A | 0A
A  → SAS | ε
```

Remove A→ε. Each occurrence of A elsewhere may disappear. S→A creates S→ε; S→0A creates S→0; A→SAS creates A→SS. Keep the original right sides:

```
S₀ → S
S  → A | 0A | ε | 0
A  → SAS | SS
```

Now remove S→ε. The start can become empty, so add S₀→ε. In SAS the two S positions are separately nullable: keeping neither produces A; keeping only the left produces SA; keeping only the right produces AS. In SS, deleting one S leaves S. The self-rule A→A adds no language and can be discarded. Do not reintroduce the already-eliminated ordinary ε rule. We get:

```
S₀ → S | ε
S  → A | 0A | 0
A  → SAS | SS | AS | SA | S
```

Pause on A→S: it comes from **SS**, not from deleting A in SAS again. This is the kind of bookkeeping that loses marks when you do it all mentally.

## Unit rules: copy, then remove the delegation

The remaining S→A and A→S are pure handoffs. Going around S⇒A⇒S forever produces no finished word. What matters is which *real work* either variable can eventually choose. A unit closure is simply the list of destinations reachable through these handoffs; it lets us bypass an entire finite chain at once.


S and A reach each other using unit rules. Their combined non-unit alternatives are

```
0A | 0 | SAS | SS | AS | SA
```

S₀ reaches them through S, and also keeps its ε. After eliminating unit rules:

```
S₀ → 0A | 0 | SAS | SS | AS | SA | ε
S  → 0A | 0 | SAS | SS | AS | SA
A  → 0A | 0 | SAS | SS | AS | SA
```

If the exam asks each removal separately, expand this closure computation into the required sequence, like the official solution. Do not treat a shortcut explanation as a substitute for requested intermediate grammars.

## Finish the shapes

We now fix instruction size. In `SAS`, there are three pending jobs; CNF allows two. Package the last two, `AS`, under a fresh helper B. Then `SB` means “do S, then unpack B into AS,” recovering the original order `SAS`. In `0A`, the zero is a terminal mixed with a variable, so give that zero its own finishing job U→0 and write `UA`. A lone `0` already has the allowed one-terminal shape.


Replace SAS by SB with B→AS. Isolate the terminal in 0A using U→0. The single terminal rule →0 remains as it is.

```
S₀ → UA | 0 | SB | SS | AS | SA | ε
S  → UA | 0 | SB | SS | AS | SA
A  → UA | 0 | SB | SS | AS | SA
B  → AS
U  → 0
```

Check every right side. UA, SB, SS, AS, SA are pairs of variables. 0 is a single terminal. Only S₀ has ε, and S₀ appears nowhere on the right. Done.

## Why the transformations preserve the language

For ε elimination, each omitted occurrence represents a subtree that previously derived ε. A derivation in the new grammar can restore those omitted ε subtrees; an old derivation can remove them. For unit elimination, copied rules compress a finite chain of unit steps; expand the chain to recover the old derivation. Helpers merely group a long right side or name a terminal. Their expansion returns the original string in the original order.

These are explanations for arbitrary derivations. Testing short strings can catch a mistake, but it cannot prove grammar equality for all lengths.

## Fresh practice: the 2021 grammar

Convert S→CS|ε and C→SCS|CS|1. Work through the same stages before revealing the solution.

<details class="hint"><summary>Hint: only S is nullable</summary><p>In C→SCS, delete either S occurrence separately or both. You get CS, SC, C in addition to SCS. C cannot derive ε because every terminating C derivation includes a terminal 1.</p></details>
<details class="solution"><summary>Show a complete staged answer</summary><p>Add S₀→S. After ε removal: S₀→S|ε; S→CS|C; C→SCS|CS|1|C|SC. Remove C→C. Remove S→C by copying C's non-unit rules, then S₀→S: S₀→CS|SCS|1|SC|ε; S→CS|SCS|1|SC; C→SCS|CS|1|SC. Introduce B→CS and replace SCS with SB. Final: S₀→CS|SB|1|SC|ε; S→CS|SB|1|SC; C→SB|CS|1|SC; B→CS. All rules meet CNF.</p></details>

**Carry forward:** CNF rewriting and CFG-to-PDA conversion both depend on tracking exact right-side strings. Read them as ordered sequences, not unordered sets.
