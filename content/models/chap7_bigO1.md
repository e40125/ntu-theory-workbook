# Big O: a budget on growth, after fixed details stop dominating

## The question changes from “can it finish?” to “how much work?”

A decider halts on every input, but its running time may grow wildly with input length. Complexity studies that growth. Let n be the length of the **encoded input**, and T(n) the worst number of steps among inputs of that length. We want useful comparisons without listing every constant setup cost.

\(f(n)=O(g(n))\) says that beyond some threshold n₀, f stays below a constant multiple c of g. Formally, there exist c>0 and n₀ such that \(f(n)\le c\,g(n)\) for every n≥n₀, for the nonnegative functions under discussion.

The constants must be fixed across all sufficiently large n. You don't get to choose a new c for each n; that would make the claim almost meaningless.

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
