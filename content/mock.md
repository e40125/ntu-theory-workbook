This is a **100-point practice set written for this workbook**, based on recurring task types. It is not an official exam or a prediction. Some methods deliberately resemble the lessons; use a historical paper you have not studied for an additional independent check. Set your own time limit; Midterm 2's exact duration is still unverified.

Write your answers on paper with the solutions closed. If you open a hint or worked answer, label that portion assisted. Score against the detailed obligations, not whether your answer looks similar. The suggested rubric is for diagnosis and is not the instructor's grading policy.

## Problem 1 · Grammar and normal form · 25 points

Let Σ={a,b}, V={S,A,B}, and

```
S → AB | A
A → aA | a
B → bB | ε
```

(a) Give a leftmost derivation of `aab`. (4)

(b) Prove this grammar is ambiguous using `aa`. Give two leftmost derivations. (6)

(c) Convert to CNF. Show a new start, ε elimination, unit elimination, and final helper rules. (15)

<details class="solution"><summary>Review Problem 1 after your attempt</summary><p>(a) S⇒AB⇒aAB⇒aaB⇒aabB⇒aab. (b) S⇒A⇒aA⇒aa, and S⇒AB⇒aAB⇒aaB⇒aa. The start choices differ and both derivations are leftmost.</p><p>(c) Add S₀→S. Only B is nullable. Removing B→ε adds S→A (already present) and B→b; the grammar now has S→AB|A, A→aA|a, B→bB|b. Eliminate units S→A and S₀→S: S₀→AB|aA|a; S→AB|aA|a; A→aA|a; B→bB|b. Introduce U→a and W→b: S₀→AB|UA|a; S→AB|UA|a; A→UA|a; B→WB|b; U→a; W→b. No start ε rule is permitted: the original language contains at least one a.</p><p>Rubric: 4 for a valid leftmost derivation; 6 for two distinct leftmost derivations of the same string and the conclusion. CNF: new start 2, correct nullable alternatives and ε removal 4, unit elimination 4, legal final shapes 3, all stages shown 2. A language-changing omission needs correction even if a few strings still derive.</p></details>

## Problem 2 · Build and justify a PDA · 25 points

Construct a PDA for \(L=\{0^m1^n2^n\mid m\geq0,n\geq1\}\) with at most five states and Γ={X,$}. Give its states, start, accepting set, transitions, and a proof of both directions. Trace `01122` through acceptance, and explain why `002` is rejected.

<details class="solution"><summary>Review Problem 2 after your attempt</summary><p>Use Q={s,p,r,t,f}, start s, F={f}, Σ={0,1,2}. Moves: s —ε,ε→$→ p; p —0,ε→ε→ p; p —1,ε→X→ r; r —1,ε→X→ r; r —2,X→ε→ t; t —2,X→ε→ t; t —ε,$→ε→ f. All unspecified δ entries are ∅; each listed PDA output is a singleton pair set.</p><p>Every accepting run consumes only zeros in p, at least one 1 to reach r, and at least one 2 to reach t. X markers count unmatched ones; reaching f requires all removed. Thus every accepted string has the required form and counts. Conversely, every such string can take m zero loops, n pushes, n pops, and the bottom-marker finish.</p><p>Trace: (s,01122,ε)→(p,01122,$)→(p,1122,$)→(r,122,X$)→(r,22,XX$)→(t,2,X$)→(t,ε,$)→(f,ε,ε). For 002, after the zeros the machine remains in p with next symbol 2, for which there is no move. It rejects.</p><p>Rubric: correct construction under constraints 10; formal components and transition types 4; soundness and completeness 6; full accepting trace 3; rejection explanation 2. Recheck ε and inputs with no ones: n≥1 is essential.</p></details>

## Problem 3 · PDA-to-CFG conversion · 20 points

A normalized PDA has states {s,p,r,f}, start s, sole accept f, and transitions:

```
s — ε,ε→$ → p
p — a,ε→X → p
p — b,X→ε → r
r — b,X→ε → r
r — ε,$→ε → f
```

(a) State why the normalization conditions hold. (4)

(b) Define the variables and start variable, give every wrapped rule with a pairing table, and specify the other two rule families. (12)

(c) Derive `aabb` from the start variable. (4)

<details class="solution"><summary>Review Problem 3 after your attempt</summary><p>(a) f is the only accepting state, and its only entrance pops $ after all X markers. Every transition pushes or pops exactly one symbol. (b) Variables Aᵢⱼ for i,j∈{s,p,r,f}; start Aₛf. Pair $ push s→p with pop r→f to get Aₛf→Aₚr. Pair X push p→p on a with pop p→r on b to get Aₚr→aAₚpb; pair it with pop r→r on b to get Aₚr→aAₚrb. Other families: Aᵢⱼ→AᵢₖAₖⱼ for all i,j,k and Aᵢᵢ→ε for all i. (c) Aₛf⇒Aₚr⇒aAₚrb⇒aaAₚpbb⇒aabb.</p><p>Rubric: normalization 4; variables/start 3, three correct pairings 6, two remaining families 3; valid derivation 4. A wrong inner index changes the meaning even if the surrounding terminals look right.</p></details>

## Problem 4 · Turing-machine construction · 20 points

Input is promised to be `w#` followed by blanks, where w is a nonempty binary string. Compute the bitwise complement of w **in place**, leave # unchanged, and halt immediately to the right of #. Use only L/R moves and at most two working states, plus accept and reject. Give a complete transition table over Γ={0,1,#,⊔}, trace `01#`, and justify halting. Explain what changes if the input promise is removed and ε must be rejected.

<details class="solution"><summary>Review Problem 4 after your attempt</summary><p>Under the promise, one working state q suffices: on 0 write 1,R,q; on 1 write 0,R,q; on # write #,R,accept; on blank write blank,R,reject. Trace: q01#⊔⇒1q1#⊔⇒10q#⊔⇒10#q_accept⊔. After k scanned bits, exactly the first k bits are complemented and the remainder unchanged. Each move goes right, so the finite input reaches # and halts.</p><p>Without the promise, specify the desired valid format first. If it must be nonempty binary w followed by exactly one # and then blank, use a separate initial state requiring 0 or 1, and a state after # to check blank. A straightforward strict validator uses three working states: initial, scan, and check-after-separator. This is a construction, not a minimality claim; do not assume the original two-state constraint is automatically retained. The question asks what changes, not to force an unjustified minimal state count.</p><p>Rubric: table with correct writes/head movement 8; entire trace 4; invariant and halting 5; promise/validation distinction 3. The trace alone does not establish correctness for all promised inputs.</p></details>

## Problem 5 · Pumping with a changed boundary · 10 points

Prove \(L=\{0^m1^n\mid m>2n,\ n\geq1\}\) is not regular. Explicitly give the witness string and pumping repetition, and cover every legal split.

<details class="solution"><summary>Review Problem 5 after your attempt</summary><p>Suppose L is regular with pumping length p≥1. Choose s=0²ᵖ⁺¹1ᵖ∈L, of length 3p+1≥p. For every split s=xyz with |xy|≤p and |y|>0, y=0ᵏ for some 1≤k≤p. Choose i=0. Then xy⁰z=0²ᵖ⁺¹⁻ᵏ1ᵖ has at most 2p zeros and p ones, violating m>2n. This contradicts pumping, so L is nonregular.</p><p>Rubric: assumption/arbitrary p 1; valid long witness 2; all-splits argument 3; specific pumping count and failed condition 3; contradiction/conclusion 1. An argument choosing a single convenient split is incomplete, even if its arithmetic is right.</p></details>

## After the mock

Keep the first attempt. Write corrections separately. Record which portions used hints or solutions. Pick one changed problem for each substantive error and retry it later without the answer visible. Use the official papers' requirements for final calibration; this rubric does not override the course's warning that incomplete proofs generally receive no partial credit.
