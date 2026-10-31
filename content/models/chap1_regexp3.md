# State elimination: compress journeys without losing their labels

## The job: remove a circle, preserve every possible journey

A GNFA is a finite graph whose arrows carry **regular expressions**. One arrow may stand for a whole chunk of input. The point is to summarize longer and longer paths until only a start and an accept state remain. Their connecting expression then describes the language.

Picture a station k that we want to erase. A trip from i to j can either avoid k or enter k, loop there some number of times, and leave. Those are the only two kinds of trip we need to account for at this elimination step.

Call the entry label R₁, loop label R₂, exit label R₃, and existing direct label R₄. The replacement is

\[R_1R_2^*R_3\cup R_4.\]

Read it as a sentence: **enter, do any number of loops, exit; OR use the old route**. This is not a spell to memorize without knowing what each chunk pays for.

## Work the slide example one edge at a time

After state 1 is removed in Example 1.68, the relevant labels include:

| Journey | Label |
|---|---|
| start s → 2 | `a` |
| 2 → 2 | `aa ∪ b` |
| 2 → 3 | `ab` |
| s → 3 | `b` |
| 3 → 2 | `ba ∪ a` |
| 3 → 3 | `bb` |
| 2 → accept | ε |
| 3 → accept | ε |

Now remove state 2. For s → 3, enter on `a`, loop on `(aa ∪ b)*`, exit on `ab`. Keep the direct `b` route too. New label: \(a(aa\cup b)^*ab\cup b\).

For 3 → 3, entering 2 costs `(ba ∪ a)`, its loop is unchanged, and returning to 3 costs `ab`. Keep old `bb`. New loop: \((ba\cup a)(aa\cup b)^*ab\cup bb\).

For s → accept, use `a(aa ∪ b)*ε`, which simplifies to `a(aa ∪ b)*`. For 3 → accept, keep the old ε option as well: \((ba\cup a)(aa\cup b)^*\cup\varepsilon\).

Notice the discipline: each new label is explained by an actual route. We don't rearrange the letters because concatenation is ordered.

## Recombine the remaining routes

To finish, give the four remaining labels short temporary names: P for s→3, T for 3's loop, U for 3→accept, and V for s→accept. Removing state 3 gives **PT*U ∪ V**. Substitute the expressions just calculated if the question requests the full final RE. The giant final formula is only “enter, loop, exit, or go directly” again; its size hides no new operation.

## Two easy places to break the construction

No edge means ∅, not ε. ∅ says “this journey is impossible.” ε says “the journey is possible while consuming nothing.” Replacing a missing edge by ε creates free travel and can change the language.

But a missing **loop** contributes \(\emptyset^*=\{\varepsilon\}\) as a language: take zero loops. Thus an entry and exit can still form a route even if k has no self-loop. Zero visits around the loop is different from a free entrance into k.

Update every remaining ordered pair, including self-loops, using the labels **before** deleting k. Then remove k and its incident edges. Mixing half-updated labels can accidentally account for paths multiple times or produce the wrong expression structure.

**Keep:** eliminate a state by replacing its possible journeys, not by deleting its behavior. The next deck makes this route argument a formal conversion algorithm.

**One connected check:** If i→k is `a`, k has no loop, k→j is `b`, and i→j is `c`, what two kinds of journey must the new label preserve?
