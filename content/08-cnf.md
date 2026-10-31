**Chomsky normal form (CNF)** is a standardized shape for grammar rules. The language should stay the same; the grammar's internal machinery changes. This is a repeat procedure on all six inspected Midterm 2 papers.

## The destination

Each rule must have one of these shapes:

- A→BC: exactly two variables on the right.
- A→a: exactly one terminal on the right.
- The start variable alone may have S₀→ε, if ε is in the language.

The start variable must not occur on the right of any rule. A→B is a **unit rule** and is not CNF. A→aB is not CNF because the two-symbol right side contains a terminal. A→BCD is not CNF because it has three variables. A→a is already fine; don't “fix” it into a unit rule.

## Step 1: protect the start

Add a fresh start S₀ and S₀→S. “Fresh” means a symbol not already used. Keep S as an ordinary variable if needed. This lets us preserve ε using only S₀→ε and prevents the actual start symbol from being on a right side.

## Step 2: eliminate ε rules without losing their choices

A variable is **nullable** if it can derive ε, possibly through other variables. Find them to a fixed point: first direct ε rules, then rules whose entire right side consists of nullable variables. Repeat until no new variable qualifies. Terminals never disappear this way.

For every right side, retain the original and add alternatives omitting each possible collection of nullable **occurrences**. Then remove ordinary ε rules; keep S₀→ε exactly when the original language contains ε.

The word “occurrences” is doing work. If A is nullable and a rule is S→ABA, the left A and right A are separate positions. Omitting one or both yields BA, AB, B, besides ABA. If B is nullable too, also AA, A, and ε are possible; duplicates count once. Keep ε only under the permitted start rule in the finished grammar.

**The earlier gap, explicitly:** for S→ABC with nullable A and B but nonnullable C, the alternatives are ABC, BC, AC, C. A stays/B disappears gives AC. Both disappear gives C. The C never disappears because no rule says it can.

## Step 3: remove unit rules

A→B means A delegates to B without adding any terminal. Replace this delegation by B's non-unit alternatives. **Keep B's productions** for other uses of B. For chains and cycles, compute everything reachable by unit steps, then copy non-unit right sides from every reachable variable. This avoids looping on A→B→A.

Example: A→B, B→C|b, C→A|c. Each of A,B,C reaches all three through unit steps, so each receives alternatives b|c. Delete the unit links. The grammar becomes A→b|c, B→b|c, C→b|c.

The wording on CNF 2 page 3 can misleadingly suggest deleting the target variable's productions. That is not the language-preserving procedure. The worked examples and historical solutions retain productions needed by other variables. We implement the correct construction here.

## Step 4: split long right sides and isolate terminals

For A→BCD, introduce X→CD and replace the original by A→BX. For A→aBb, introduce terminal helpers U→a,V→b, then use A→UX and X→BV. A prescribed exam order may split before replacing terminals; follow the requested stages and names. The final shape alone is not all the requested work.

## A small complete conversion

Start with S→aSb|ε. Add S₀→S. Nullable S means add S→ab and S₀→ε; remove S→ε. Now:

```
S₀ → S | ε
S  → aSb | ab
```

Remove the unit S₀→S by copying S's non-unit alternatives:

```
S₀ → aSb | ab | ε
S  → aSb | ab
```

Introduce U→a,V→b,X→SV:

```
S₀ → UX | UV | ε
S  → UX | UV
X  → SV
U  → a
V  → b
```

Every rule now passes the shape test; S₀ never appears on the right. The UV base handles one pair; UX recurses; S₀→ε handles zero pairs.

## Fresh practice

Convert S→AB, A→aA|ε, B→b into CNF, showing all stages. Does the start get an ε rule?

<details class="solution"><summary>Show every stage</summary><p>Add S₀→S. A is nullable, but B is not, so S is not nullable. Remove A→ε and add A→a and S→B, keeping S→AB. Eliminate S→B and S₀→S (and any induced unit links): S₀→AB|b; S→AB|b; A→aA|a; B→b. Replace the terminal in aA with U→a. Final: S₀→AB|b; S→AB|b; A→UA|a; B→b; U→a. There is no S₀→ε because every original string contains b.</p></details>

**Exam check:** new start; all nullable-occurrence combinations; unit closure; no ordinary ε; only two variables or one terminal; intermediate stages in the requested order.
