# NFA 2 — A transition returns a collection of options

## The whole idea

We need a precise way to write “zero, one, or several possible next states.” **The output of an NFA transition is a set.** The function still gives one answer for each request; that answer is the entire option set. This repairs the informal “δ isn't a function anymore” wording in NFA1.

A move can hand back no destination, one destination, or several. So we need a container that handles all three cases: a set. The braces are doing a real job. The empty set means the container has no destinations; ε means a move consumes no input. Those two are not interchangeable.

## Round 1 — Counting by walking around a cycle · pages 1–3

A **unary alphabet** has exactly one symbol. With Σ={0}, the only way strings differ is their length. A two-state cycle returns to its accepting starting point after 0,2,4,… zeros. A three-state cycle does so after 0,3,6,… zeros. An ε branch chooses either cycle without consuming a zero, so their union accepts lengths divisible by 2 or 3.

Here 0ᵏ means k copies of symbol 0, not the arithmetic number zero raised to a power. k=0 gives ε. Zero is divisible by 2 and 3, so the initial ε-accessible cycle starts must account for empty input. A branch accepting does not require the other branch to accept too.

## Round 2 — The braces are the type of the answer · pages 4–9

Take the three-state a/b example. Its direct moves are: q₁ on b→q₂ and on ε→q₃; q₂ on a→q₂ or q₃ and on b→q₃; q₃ on a→q₁. All other direct moves are absent. q₁ is both start and accepting. Therefore ε accepts immediately, and `a` accepts by q₁→εq₃→aq₁. `baba` has an accepting route; `babba` does not.

Now the formal function:

\[\delta:Q\times\Sigma_\varepsilon\to\mathcal P(Q),\qquad\Sigma_\varepsilon=\Sigma\cup\{\varepsilon\}.\]

The colon announces a function's type. × groups input fields. The arrow points from input type to output type. Σₑ adds ε as an allowed transition label, not as an ordinary character of Σ. P(Q), the **power set**, is the collection of every subset of Q.

If Q={q₁,q₂}, then P(Q)={∅,{q₁},{q₂},{q₁,q₂}}. There are four possible destination sets because each of two states is either included or excluded: 2×2=2². With n states, the count is 2ⁿ. Each transition returns exactly one of these sets. That set can contain zero, one or several states.

Why is q₂ instead of {q₂} wrong in an NFA table? Because the required output is a collection. q₂ is one state; {q₂} is the singleton collection containing it. A single address and a one-item mailing list have different formats. This distinction concerns transition outputs, not the number of accepting states. Both DFA and NFA may have many accepting states.

An empty table entry should mean ∅, not an unnamed new state. When no path survives, the possible-state set is ∅. Unioning ∅ with {q₂} returns {q₂}: the empty collection contributes no destination. Do not insert ∅ as if it were a member alongside q₂.

## Round 3 — Why the formal run may have more steps than input symbols · page 10

An input can be written w=y₁…yₘ with each yᵢ either an input symbol or ε. For input `a`, a valid factorization is ε·a. It still spells `a`; ε contributes length zero. That lets the state sequence record ε moves too.

The rule rᵢ₊₁∈δ(rᵢ,yᵢ₊₁) says the next state must be **one member** of the offered destination set. It replaces the DFA's equality with membership. Start at q₀, make legal moves spelling the entire input, and finish in F. Existence of one such finite path establishes acceptance. A branch stuck early establishes failure of that branch, not necessarily rejection of the entire NFA.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Build the types before reading the formula

For a DFA, asking “from q on 1?” returns one state, say r. For an NFA it may return {r,s}, {r}, or ∅. Braces say “a set containing these states.” ∅ says “there are no options.” The accepting set F is a separate object listing states where a fully consumed run may finish.

The **power set** 𝒫(Q) is the collection of all subsets of Q. If Q={a,b}, its possible output sets are ∅, {a}, {b}, {a,b}. Each state has an in/out choice, hence 2×2=4 subsets. With three states there are 2³=8. The power set is where the function's answers live; it is not a new kind of accepting state.

Σ names actual input symbols. Σε means Σ∪{ε}, allowing the table to ask about a no-input move as well. Thus δ:Q×Σε→𝒫(Q) reads: **state plus a symbol-or-ε request goes in; a set of possible destinations comes out**.

## Work the slide's actual table

Pages 8–9 have four states. From q₁ on 1 the answer is {q₁,q₂}. From q₂ on ε it is {q₃}. From q₃ on 1 it is {q₄}, and q₄ accepts.

Trace `11`. Start {q₁}. The first 1 reaches q₁ and q₂; the free q₂→q₃ move adds q₃. Current possibilities are {q₁,q₂,q₃}. On the second 1, q₁ contributes {q₁,q₂}; q₂ contributes ∅; q₃ contributes {q₄}. Combine those destinations, then close under ε: {q₁,q₂,q₃,q₄}. Accept because q₄ is possible after the whole string.

Notice the empty contribution from q₂. Union with ∅ adds nothing. We do **not** insert an object called ∅ into the set of NFA states. “No candidate from this branch” is different from “a candidate at a state named empty set.” The latter becomes a useful name only in the converted DFA.

## Why the formal run can be longer than the string

Page 10 allows w=y₁…yₘ with each yᵢ either a real symbol or ε. For input `11`, one accepting path can be labeled 1,ε,1. Concatenating those labels still gives `11`: the ε contributes zero characters. The state sequence has a step for every move, so m need not equal the number of input characters.

The condition rᵢ₊₁∈δ(rᵢ,yᵢ₊₁) says the chosen next state must be one of the legal options. A run chooses one option each time; the acceptance definition asks whether any suitable run exists.

**Next connection:** NFA3 makes the whole current option set into one DFA state. **Connected check:** distinguish δ(q₁,1)={q₁,q₂} from F={q₄}: what question does each set answer?
