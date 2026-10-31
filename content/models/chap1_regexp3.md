# State elimination: compress journeys without losing their labels

## The job: remove a circle, preserve every possible journey

A GNFA is a finite graph whose arrows carry **regular expressions**. One arrow may stand for a whole chunk of input. The point is to summarize longer and longer paths until only a start and an accept state remain. Their connecting expression then describes the language.

Picture a station k that we want to erase. A trip from i to j can either avoid k or enter k, loop there some number of times, and leave. Those are the only two kinds of trip we need to account for at this elimination step.

Call the entry label R₁, loop label R₂, exit label R₃, and existing direct label R₄. The replacement is

\[R_1R_2^*R_3\cup R_4.\]

Read it as a sentence: **enter, do any number of loops, exit; OR use the old route**. This is not a spell to memorize without knowing what each chunk pays for.

Imagine closing a station on a rail map while preserving every possible journey label. You must replace routes through that station with direct connections, including any number of laps around its loop. Deleting the station first would delete valid trips. The scary formula is bookkeeping for those missing journeys.

## Round 1 — We are compressing paths, not erasing their behavior · pages 1–3

The original three-state DFA starts at 1; states 2 and 3 accept. Its transitions are: 1 on a→2, on b→3; 2 on a→1, on b→2; 3 on a→2, on b→1. State 1 has no loop. Before manipulating the giant expression, keep that little road network clear.

Add a new start s with an ε arrow to 1. Add a new final state f, with ε arrows from old accepting 2 and 3 to f. The old states stop serving as final endpoints; the ε exits preserve their old acceptance choices. Empty input remains rejected because there is no ε-only path from s to f.

A **GNFA**, generalized nondeterministic finite automaton, allows a whole regular expression on an arrow. Traversing it consumes a string described by that label. A label `ab∪c` means consume ab or consume c. It does not mean arbitrarily reading a, b or c one symbol at a time along that arrow.

## Round 2 — Remove state 1 and pay for every route through it · pages 4–5

For the new 3→2 edge, there was already an a route. Going through 1 contributes b then a, or ba. So the replacement is ba∪a. The order matters: ab would describe a different route.

For 2→2, the old b loop remains, and the detour 2→1→2 contributes aa, giving aa∪b. For 2→3, the detour contributes ab. For 3→3, the detour contributes bb. From s, the ε entrance followed by 1→2 contributes a; followed by 1→3 contributes b. Old ε exits to f remain.

No loop at 1 means we may traverse it once without circling. Formally its loop label is ∅ and ∅*=ε. Multiplying an entrance by ε and an exit concatenates just entrance and exit. Confusing absent edge ∅ with free edge ε is exactly how a plausible-looking answer starts accepting extra strings.

## Round 3 — Remove state 2; the star is doing real work now · pages 6–9

Now 2 has loop aa∪b. An arbitrary stay at 2 consumes any finite sequence of aa-blocks and b-blocks, including none. That is `(aa∪b)*`. Thus s→3 becomes `a(aa∪b)*ab ∪ b`: enter 2 on a, stay there as long as desired, exit on ab, or use the direct b route.

Keep four temporary names instead of trying to remember the whole mess: P is the new s→3 label; T is 3's new loop; U is 3→f; V is s→f. The worked table and calculations below spell out all four labels. Removing 3 then gives PT*U∪V. Temporary names shorten the bookkeeping without changing the actual expressions.

## Round 4 — What the final formula is claiming · page 10

The final answer is

\[
\bigl(a(aa\cup b)^*ab\cup b\bigr)
\bigl((ba\cup a)(aa\cup b)^*ab\cup bb\bigr)^*
\bigl((ba\cup a)(aa\cup b)^*\cup\varepsilon\bigr)
\cup a(aa\cup b)^*.
\]

Read the three large factors as enter 3, loop there, exit; read the last union alternative as bypass 3. No new operation appeared just because the line became ugly as hell. Every factor is still concatenation, union or star.

The preservation claim at each removal is: paths whose internal states have been eliminated are represented by the current edge labels. A path either avoids the newly removed state or enters it, loops finitely often and exits. Conversely, every chosen piece of the replacement expression expands into such an old path. Applying that argument repeatedly preserves the language through the final two-state graph. Tests can catch an incorrect label, but this route argument explains arbitrary input lengths.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
