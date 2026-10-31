# Big O: a budget on growth, after fixed details stop dominating

## The question changes from “can it finish?” to “how much work?”

A decider halts on every input, but its running time may grow wildly with input length. Complexity studies that growth. Let n be the length of the **encoded input**, and T(n) the worst number of steps among inputs of that length. We want useful comparisons without listing every constant setup cost.

\(f(n)=O(g(n))\) says that beyond some threshold n₀, f stays below a constant multiple c of g. Formally, there exist c>0 and n₀ such that \(f(n)\le c\,g(n)\) for every n≥n₀, for the nonnegative functions under discussion.

The constants must be fixed across all sufficiently large n. You don't get to choose a new c for each n; that would make the claim almost meaningless.

Aight, now we stop asking “can it finish?” and ask “how does the bill grow?” Count steps against input length, then look at the eventual growth. A fixed multiplier can absorb some overhead. It cannot grow whenever the input gets inconvenient. That fixed-versus-growing distinction is the whole damn point.

## Round 1 — “Eventually finishes” and “finishes this century” are different jobs · pages 1–3

A decider always halts. Complexity asks how its resource use grows with input length. Let T(w) be the number of transitions on one input w; worst-case time f(n) is the maximum T(w) over inputs of length n. Average-case time would require a probability distribution over inputs; “average” is not defined by wishful thinking.

n counts encoded input symbols, not necessarily the numeric value represented by them. A binary integer of value about 2ⁿ needs about n bits. This distinction later separates polynomial time from algorithms that are fast only in the numeric value.

The one-tape equal-block procedure repeatedly crosses the input to match a zero and a one. To analyze it, count rounds and cost per round. State diagrams show behavior; runtime analysis accounts for how often that behavior repeats.

## Round 2 — Big-O is an eventual ceiling with a fixed multiplier · pages 4–8

For eventually nonnegative functions, f(n)=O(g(n)) means there exist constants c>0 and n₀ such that for every n≥n₀, f(n)≤c g(n). c is a fixed scaling allowance; n₀ lets us ignore a finite initial region. Neither may keep changing with n after the proof chooses them.

For 6n³+5, choose c=7,n₀=2. Since n³≥8 there, 5≤n³, giving 6n³+5≤7n³. It is also O(n⁴), a looser ceiling. Big-O does not claim a tight equality or fastest possible algorithm. The equals sign in f=O(g) is conventional membership shorthand: f belongs to the collection of functions eventually bounded by a constant multiple of g.

To prove it is not O(n²), take any proposed c,n₀ and choose an integer n≥n₀ with n>c. Then 6n³+5>c n². You have defeated every possible fixed ceiling, not merely shown one numerical counterexample. The negation is ∀c>0,∀n₀,∃n≥n₀ with f(n)>c g(n). Quantifiers are doing the same careful work they did in pumping proofs.

## Round 3 — A logarithm counts how many multiplicative growth steps · pages 9–11

log₂n is the exponent needed to make 2 to that power equal n. For powers of two, it counts repeated halving steps back to 1. The base-change identity log_b n=log₂n/log₂b holds for fixed b>1. Changing between such fixed bases changes only a constant factor, so O(n log n) does not need a specified base.

For 3n log₂n+5n log₂log₂n, use n≥2 so the nested logarithm is defined. Then log₂n≤n, and taking log₂ gives log₂log₂n≤log₂n. Thus the expression is at most 8n log₂n. The slide's n≥1 wording overlooks the undefined log₂log₂1; choosing a valid eventual threshold repairs that without changing the asymptotic result.

## Round 4 — Add costs and keep the actual quantifier obligations · pages 12–15

If f≤c₁n² after n₁ and g≤c₂n after n₂, take n₀=max(n₁,n₂,1). Then f+g≤c₁n²+c₂n≤(c₁+c₂)n². Both bounds are now simultaneously valid. That's the proof behind O(n²)+O(n)=O(n²).

O(1) means bounded by a constant independent of n, not exactly one operation. 2^{O(n)} means bounded by 2^{cn} eventually for some fixed c; the O occurs in the exponent. It is different from O(2ⁿ): 4ⁿ=2^{2n} belongs to 2^{O(n)} but is not O(2ⁿ). A finite initial collection of exceptions can be covered by enlarging a constant, provided the function is finite on those inputs.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Work a bound from the definition

Take f(n)=6n³+5. For n≥2, 5≤n³, so \(6n^3+5\le7n^3\). Choose c=7 and n₀=2. That proves f=O(n³). The lower-order extra 5 is absorbed into a fixed multiplier once n is large enough.

Why isn't f=O(n²)? If \(6n^3+5\le cn^2\) eventually held, dividing by n² would give \(6n+5/n^2\le c\). But 6n exceeds any fixed c when n is large enough. No fixed constant can contain that growth.

O(n³) is an upper bound, not necessarily a tight one. The same f is also O(n⁴). A statement can be correct and still less informative. Do not read the equals sign in `f=O(g)` as ordinary equality of two numerical functions; it is conventional membership-in-a-growth-class notation.

## How bounds combine

For sequential phases, add costs. If one is at most c₁g(n) after n₁ and another at most c₂g(n) after n₂, their sum is at most (c₁+c₂)g(n) after max(n₁,n₂). The maximum threshold ensures both bounds are valid at once.

For a nested loop, count how often the inner work runs and its cost each time. n passes each taking O(n) steps give O(n²). But check whether the pass length shrinks; mindlessly multiplying every visible loop by n can miss a stronger bound.

## Input representation is part of the problem

An integer N written in binary takes about log₂N bits; unary `0ᴺ` takes N symbols. An algorithm using N iterations is linear in unary length but exponential in the binary length. Saying “linear in the number” without specifying encoding can hide the entire difficulty.

Also distinguish \(2^{O(n)}\) from \(O(2^n)\). The former allows an unspecified constant multiplier in the exponent, such as 2^{3n}; the latter permits only a fixed multiplier outside 2ⁿ. Those are not interchangeable.

**Keep:** Big O is a quantified eventual upper bound on growth. Name the input-size measure and machine model before counting steps.

**One connected check:** In the proof that 6n³+5 is O(n³), what jobs do c=7 and n₀=2 each perform?
