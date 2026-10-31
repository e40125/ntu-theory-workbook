# NFA 2 — A transition returns a collection of options

## The whole idea

We need a precise way to write “zero, one, or several possible next states.” **The output of an NFA transition is a set.** The function still gives one answer for each request; that answer is the entire option set. This repairs the informal “δ isn't a function anymore” wording in NFA1.

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
