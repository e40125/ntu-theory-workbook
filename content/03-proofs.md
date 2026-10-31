A proof is a chain of reasons that covers **every case claimed**. Examples help you discover an argument. They don't magically turn a claim about infinitely many inputs into something settled.

## Start with the target, not fancy wording

Suppose the claim is: “If a DFA reaches the same state after strings u and v, then appending the same suffix z produces the same acceptance decision.”

What are you given? A deterministic machine, two runs ending at the same state, and one common remaining input z. What must you show? The final acceptance decisions agree. We don't need to remember the earlier strings; the current state plus the next symbol determines the next move.

**Complete proof:** Let q be the state reached after both u and v. The two remaining computations start at q and read the same string z. At each step, their current states and next input symbols are equal, so determinism gives equal next states. Hence their final states are equal. Since acceptance depends on whether that final state is in F, the decisions agree.

This is the engine behind the pumping lemma. Once you're back in the same state, the machine has no secret counter remembering how many laps you took. The circle is the memory. That's it.

## Make the repeated-step reasoning explicit: induction

**Induction** proves a claim for every nonnegative integer by covering a starting case and a repeatable step. Think of a rule that lets you extend a correct run by one more symbol.

Claim: after k symbols of the common suffix above, the two machines are in the same state.

- **Base, k=0:** neither suffix symbol has been read. Both states are q by assumption.
- **Induction hypothesis:** assume the states agree after k symbols.
- **Step:** if another symbol exists, both next symbols are the same symbol a. Apply δ to the same pair (state,a); the resulting states agree after k+1 symbols.
- **Conclusion:** the states agree after all |z| symbols, including when |z|=0.

The hypothesis is a temporary assumption used to prove the next case. It is not permission to assume the final claim with no work. This pattern also proves a machine invariant: describe exactly what each state or stack represents after any processed prefix, verify the start, then verify every possible update.

## Equality needs two directions

To prove a grammar generates exactly L, show:

1. **Soundness:** every string the grammar generates is in L. No extra garbage gets through.
2. **Completeness:** every string in L has a derivation. No valid input is excluded.

Worked example: \(S\to0S1\mid\varepsilon\) generates exactly \(\{0^n1^n\mid n\geq0\}\).

**Soundness:** A terminating derivation uses the wrapping rule some k≥0 times and then S→ε. Each wrap adds one 0 on the left and one 1 on the right, so the result is 0ᵏ1ᵏ.

**Completeness:** Take any 0ⁿ1ⁿ with n≥0. Apply S→0S1 exactly n times, then S→ε. This derives the chosen string. The two inclusions prove equality.

## Contradiction and counterexamples

To prove L is not regular, assume it is regular and show this forces a statement incompatible with that assumption. You must name the contradiction. “This is impossible” is not a reason by itself.

To disprove “every binary string with equal counts is zeros-then-ones,” one counterexample suffices: `0101` has equal counts but is not in block order. You do **not** need to show that all equal-count strings fail. Which side says “every” matters.

\(\forall\) means “for every”; \(\exists\) means “there exists.” Negating “every input is accepted” gives “some input is not accepted.” Negating “some input is accepted” gives “every input is not accepted.” Swap the quantifier and negate its claim. For \(P\Rightarrow Q\), only P true and Q false is a counterexample.

## How to discover a proof

Write the assumption and desired conclusion in ordinary English. Expand the relevant definition. Look at a tiny example to find what stays true. Then replace its particular numbers with arbitrary variables and justify the general step. Finally attack your own proof with boundary cases: zero, empty string, smallest permitted length, and a condition changed by one.

A **construction proof** supplies the required object and checks it. For example, to show every integer t between n and 2n is a sum of n numbers each 1 or 2: choose t−n copies of 2 and 2n−t copies of 1. The counts are nonnegative, sum to n, and their weighted sum is 2(t−n)+(2n−t)=t. Saying “clearly every value is possible” would skip exactly the part to prove.

## Fresh practice

Prove that \(S\to aSb\mid ab\) generates exactly \(\{a^nb^n\mid n\geq1\}\). Explain the change from the ε-base grammar.

<details class="hint"><summary>Hint: count wraps, then account for the base</summary><p>After k wraps, the final ab contributes one additional a and one additional b. For the reverse direction, how many wraps produce a target with n of each?</p></details>
<details class="solution"><summary>Show the complete proof</summary><p>Every terminating derivation uses k≥0 wrapping steps and then S→ab, giving aᵏ(ab)bᵏ=aᵏ⁺¹bᵏ⁺¹. Thus every generated string belongs to the target. Conversely, for any n≥1, use n−1 wrapping steps and then S→ab, obtaining aⁿbⁿ. The base generates one matched pair, so ε is excluded. Both directions are established.</p></details>

**Proof check before moving on:** are the variables introduced, all cases covered, and every “there exists” backed by an actual object or argument? The formal proof should use clear English sentences, not a wall of symbols.
