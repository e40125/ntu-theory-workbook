The finite-state machine has to reuse a memory situation. Pumping turns that forced reuse against the language rule. Keep the machine promise and the language requirement side by side.

**Question:** how do we prove that no DFA, however cleverly designed, can recognize a language? Showing that your own three-state attempt fails isn't enough. Some other design might work. We need a restriction shared by **every** finite-state machine.

## Why a loop is unavoidable

Suppose a DFA has p states. Reading its first p symbols visits p+1 states when you include the start. There are more visits than available states, so two visits must be to the same state. This is the **pigeonhole principle**: p boxes cannot hold p+1 objects with at most one in each.

Split an accepted input into x, y, z. x gets to the repeated state; y goes around the loop and returns; z is the rest of the input leading to acceptance. The loop consumes at least one symbol because the two visits occur at different times. It finishes within the first p input symbols.

<div class="machine-diagram" data-diagram="pump"></div>

Take a concrete conditional example: `00 [0] 111`. Suppose the bracketed `0` loops back to the same state. Doing that loop twice gives `00 [00] 111`; doing it zero times gives `00 [] 111`, or `00111`. All three computations reach the same state before the final `111`, so the same suffix leads to acceptance. Yet only `000111` has equal numbers of zeros and ones. This explains the mechanism. It does not claim every DFA has its loop at this exact position.

## The theorem, translated before use

If A is regular, there exists an integer p≥1 such that **every** s in A with |s|≥p has a split s=xyz satisfying:

\[|y|>0,\qquad |xy|\leq p,\qquad xy^iz\in A\text{ for every integer }i\geq0.\]

- p: the pumping length; the hypothetical machine supplies it.
- s: one sufficiently long accepted string.
- x: prefix before the loop; may be empty.
- y: the nonempty loop's input.
- z: suffix after the loop; may be empty.
- i: number of copies of y. i=0 deletes y; i=1 leaves the input alone; i=2 duplicates y.

The condition is **necessary** for regularity. A failed attempt to break pumping does not prove a language regular. To prove regular, construct a DFA, NFA, regular expression, or use a valid closure argument.

## A complete exam proof

Claim: \(A=\{0^n1^n\mid n\geq0\}\) is not regular.

> Suppose A is regular, and let p≥1 be a pumping length. Choose s=0ᵖ1ᵖ. Then s∈A and |s|=2p≥p. Consider any split s=xyz with |xy|≤p and |y|>0. Because the first p symbols of s are zeros, y=0ᵏ for some 1≤k≤p. Set i=0. Then xy⁰z=0ᵖ⁻ᵏ1ᵖ has fewer zeros than ones, so it is not in A. This contradicts the pumping property. Therefore A is not regular.

Why each line earns its place:

| Line | Obligation it handles |
|---|---|
| Assume regular; get p | Makes the theorem applicable |
| Choose s=0ᵖ1ᵖ | Valid member, long enough, tailored to p |
| Consider any legal split | Covers the theorem's possible choice of split |
| y=0ᵏ, 1≤k≤p | Uses the location and nonempty conditions |
| Choose i=0 | Supplies a specific repetition count |
| Unequal counts | Shows failure of the actual language rule |
| Contradiction | Connects the failure back to the assumption |

## The choice order is the whole damn game

For a nonregularity proof: **arbitrary p → choose s → every legal split → choose i**. You do not get to choose a convenient y and ignore other legal choices. You can name y=0ᵏ because **all** legal y have that form. The repetition i may depend on the split; it need not always be 0 or 2.

## Practice: change the counts

Prove \(B=\{0^n1^{2n}\mid n\geq0\}\) is not regular. Before opening the answer, identify s, the forced form of y, i, and the condition broken.

<details class="hint"><summary>Hint: keep the loop in the zero block</summary><p>Choose s=0ᵖ1²ᵖ. Deleting k zeros leaves the ones unchanged. For a valid string, how many ones would p−k zeros require?</p></details>
<details class="solution"><summary>Show the complete proof</summary><p>Suppose B is regular with pumping length p≥1. Let s=0ᵖ1²ᵖ∈B; its length is 3p≥p. For any legal split, y=0ᵏ with 1≤k≤p. Pump down with i=0 to obtain 0ᵖ⁻ᵏ1²ᵖ. It would need 2(p−k) ones to belong to B, but has 2p and k>0. Thus it is outside B, contradicting the lemma. Hence B is not regular.</p></details>

**Retain:** the loop preserves the machine's decision; we choose a language member for which changing that loop breaks the language's rule.
