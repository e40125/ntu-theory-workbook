# Regular expressions: a recipe for a whole set of strings

## The job: describe patterns without drawing every state

A machine reads a string and gives a verdict. A regular expression describes which strings belong. Same target, different tool: a checker versus a compact recipe. Don't read a regular expression as one giant literal word. Its operations build **sets of possible words**.

Start with the slide expression \((0\cup1)0^*\). The first parentheses say “choose `0` or `1`.” The final part says “append zero or more copies of `0`.” That generates `0`, `1`, `00`, `10`, `000`, `100`, and so on. It cannot generate `101`: after the first position, only zeros are permitted. It cannot generate the empty string: the first choice still owes us one symbol.

Treat an expression as a recipe for possible strings. A choice picks a recipe, concatenation cooks one part then the next, and star repeats a whole recipe some finite number of times. Zero repetitions makes nothing: ε. First identify the chunk under the star, or you will repeat the wrong damn thing.

## Round 1 — An expression is a recipe; its language is the food it can make · pages 1–5

`0` is an expression describing the one-string language {0}. `0*` describes ε,0,00,… . `01` uses concatenation: a zero followed by a one. The expression itself is a finite piece of notation; its described language may contain infinitely many strings. Keep the recipe and its outputs separate.

The six definition cases are three building blocks and three ways to combine them. The blocks are a symbol a∈Σ, ε, and ∅. The combinations are union, concatenation and star of already-valid expressions. **Inductive definition** means you start from the blocks and repeatedly apply these formation rules. An expression must have a finite construction history; you cannot introduce a new operation and declare it regular because it looks convenient.

The usual precedence is star first, concatenation second, union last. Thus `0∪10*` means either a single 0 or a 1 followed by zeros. Parentheses override grouping. In `(0∪1)0*`, first choose exactly one bit, then append any number of zeros. In `(0∪1)*`, repeat the bit-choice operation any number of times. Moving the star changes the whole damn language.

ε is the **empty string**, so concatenating it changes nothing: Rε=R. ∅ is the **empty language**, so there is no string available for concatenation: R∅=∅. Union with ∅ changes nothing; union with ε adds the option of empty input if it was absent. Star always permits zero repetitions, hence ∅* describes {ε}. The mathematical notation sometimes writes an expression and its language interchangeably; mentally keep their types separate.

The grep example searches for a matching substring inside a line. That explains the surrounding Σ* in the formal line language. A mathematical RE describes whole strings unless substring matching is explicitly part of the task. Practical programming regex engines can have extra features; use the course's six operations for theoretical claims.

## Round 2 — Decode the decimal example one requirement at a time · pages 6–7

D means a choice of digit from 0 through 9; DD* means at least one digit. The initial `(+∪−∪ε)` chooses a plus sign, minus sign, or no sign. Then the expression offers three alternatives:

- DD*: integer-looking strings such as `72`.
- DD*.D*: at least one digit before the literal decimal point; possibly none after it, such as `2.1` or `7.`.
- D*.DD*: possibly no digits before the point, but at least one after it, such as `.01`.

The period is a literal terminal here, not a wildcard. `-.01` combines the minus option with the third alternative. Why not simply D*.D*? Both digit groups could be empty, accepting `.`. The two asymmetric alternatives enforce “at least one digit somewhere.” This is the core design skill: each piece pays for a specific clause of the target format.

## Round 3 — Why checking six cases proves the whole theorem · pages 8–13

We want: every language described by an RE has a finite automaton. For symbol a, use a two-state NFA with one a-arrow from start to accept; every other transition is empty. For ε, use one accepting start with no moves. For ∅, use one nonaccepting start with no moves.

Now assume the smaller expressions already have equivalent NFAs. Their union, concatenation and star have NFAs by the constructions just proved. Those are all the ways an RE can be formed, so every finite expression is covered. This is **structural induction**: the induction follows the recipe tree rather than counting integers. The reverse theorem, automaton→RE, still needs its own argument. One direction of “if and only if” never buys you the other for free.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Three building blocks, three operations

A literal `a` describes the one-element language `{a}`. The expression ε describes `{ε}`, a set containing one string of length zero. The expression ∅ describes the empty language: **no choices at all**. Those last two are different as hell: an order containing a zero-length item versus no available item.

| Operation | What you actually do | Example |
|---|---|---|
| Union \(R\cup S\) | Choose a string from either recipe | `0 ∪ 1` gives `0` or `1` |
| Concatenation \(RS\) | Choose from R, then from S; join in that order | `(0 ∪ 1)1` gives `01` or `11` |
| Star \(R^*\) | Choose zero, one, or more R-strings and join them | `(01)*` gives ε, `01`, `0101`, … |

Star repeats its **whole operand**. `01*` means a mandatory `0` followed by any number of ones. `(01)*` repeats pairs. Parentheses are doing actual work here.

The language of an expression R is written \(L(R)\). So \(L(1)=\{1\}\), while \(L(1^*)=\{\varepsilon,1,11,111,\ldots\}\). A language name such as A or E does not secretly add a star.

## Build one from the requirement

“Exactly one `1`” gives us three jobs: any zeros before it, the one mandatory `1`, any zeros after it. Therefore \(0^*10^*\). For `00100`, choose two zeros, then `1`, then two zeros. For `00110`, no choice can account for the second `1`. That explains both inclusion and exclusion.

“Even length” becomes \(((0\cup1)(0\cup1))^*\): each repetition contributes two symbols. Zero repetitions contributes length zero, which is even. If the question requires **positive** even length, one pair must be mandatory. Check the boundary before celebrating.

## Why machines and expressions match

For each basic expression, draw a tiny NFA. For union, concatenate, or star, use the corresponding ε-handoff construction. A complicated expression is assembled from smaller expressions; its NFA is assembled in the same shape. This is **structural induction**: prove the base pieces, then prove each assembly operation preserves the claim. You aren't checking infinitely many expressions one by one.

## The decimal-number example, assembled from its requirements

Let D stand for a decimal digit choice, 0 through 9. The slide expression is

\[(+\cup-\cup\varepsilon)(DD^*\cup DD^*.D^*\cup D^*.DD^*).\]

The first parentheses choose a plus sign, a minus sign, or no sign. The three body alternatives cover an integer such as `72`; digits followed by a dot and optional more digits such as `2.1` or `7.`; or optional digits, a dot, then at least one digit such as `.01`. Here the dot is a **literal decimal point**, not a wildcard. DD* means at least one digit because its first D is mandatory.

Why not simply D*.D*? Both starred parts could choose zero digits, accepting `.` by itself. The mandatory D in each decimal alternative prevents that. For `-.01`, choose minus, then the third body alternative with zero digits before the dot and two afterward. Every chunk now has a reason.

**Keep:** expression operators manipulate languages; concatenation preserves order; star includes zero repetitions. Next we actually assemble an NFA from a recipe.

**One connected check:** In `(0 ∪ 1)0*`, which exact part prevents ε, and which exact part prevents `11`?
