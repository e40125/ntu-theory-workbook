# Regular expressions: a recipe for a whole set of strings

## The job: describe patterns without drawing every state

A machine reads a string and gives a verdict. A regular expression describes which strings belong. Same target, different tool: a checker versus a compact recipe. Don't read a regular expression as one giant literal word. Its operations build **sets of possible words**.

Start with the slide expression \((0\cup1)0^*\). The first parentheses say “choose `0` or `1`.” The final part says “append zero or more copies of `0`.” That generates `0`, `1`, `00`, `10`, `000`, `100`, and so on. It cannot generate `101`: after the first position, only zeros are permitted. It cannot generate the empty string: the first choice still owes us one symbol.

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
