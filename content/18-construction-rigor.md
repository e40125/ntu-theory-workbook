Now stress the design where it can break: empty input, wrong order, leftover obligations, and a branch that guesses at the wrong time. A diagram needs a reason for every accepted case.

The recurring exam move is: give you an unfamiliar count condition, restrict the states or alphabet, and ask you to turn it into a machine. Memorizing “push zeros, pop ones” won't cover all those variations. The useful habit is to translate the condition into **units of stack work**.

## Weighted counts: a complete derivation

2022 Problem 2 uses 0ᵐ1ⁿ with 0.5n≤m≤1.5n, for nonnegative integer m,n. Multiply the condition by 2: n≤2m≤3n. This suggests pushing **two markers per zero**, then popping 1,2,or3 markers for each one. Successful emptying means the total number popped is exactly 2m.

But why can every total in that interval be achieved? Write t=2m. If n≤t≤2n, choose t−n twos and 2n−t ones. These counts are nonnegative, sum to n, and sum in value to t. If 2n≤t≤3n, choose t−2n threes and 3n−t twos; again n choices with total t. This proves the “if the inequality holds, a successful set of choices exists” direction. The other direction follows since n numbers each between 1 and 3 sum to a value between n and 3n. For n=0, the inequality forces m=0 and the empty sum works.

## A seven-state PDA plan

Use states s,p,h,r,u,v,f, input {0,1}, stack {X,$}, accept f. Here X corresponds to the exam's working stack symbol 0; if copying the exact problem, use its required symbol 0.

```
s — ε,ε→$ → p
p — 0,ε→X → h
h — ε,ε→X → p
p — ε,ε→ε → r
r — 1,X→ε → r       pop one
r — 1,X→ε → u       begin pop two or three
u — ε,X→ε → r       finish pop two
u — ε,X→ε → v       begin pop three
v — ε,X→ε → r       finish pop three
r — ε,$→ε → f
```

The p→h→p cycle pushes twice per zero. The r choices consume exactly one 1 while popping one, two or three X's. The phase switch forbids zeros after the first one. The final marker check forces exact total balance. ε is accepted. This is the promised construction plus its reason, not merely a diagram that happens to accept one example.

For `001`, four markers were pushed but one 1 can pop at most three, so all branches fail to finish. For `011`, two markers were pushed; choosing one pop for each 1 empties them and accepts. A requested simulation tree must still show the losing branches.

## State limits: store the right thing in the right place

The 2021 paper asks for a PDA with at most two states recognizing binary strings whose number of ones is divisible by six. A six-state DFA would remember the remainder in its state. A PDA can instead store a remainder symbol 1,…,5 on the stack, keeping remainder 0 as empty stack in an accepting control state. It doesn't need an unbounded counter for this problem; its stack alphabet is an alternate finite storage location.

This illustrates a design choice, not a universal shortcut. If the exam restricts Γ, you cannot invent extra symbols to beat the state limit. Write a small table of **configuration meanings** (control state plus stack top) before drawing arrows.

## A minimality proof for a one-state PDA

In the 2020 language B={0ᵐ1ⁿ | m≥n≥0}, ε must accept. A one-state final-state PDA therefore has its only state accepting. It also must accept 01 by some run starting with an empty stack. That same run can be replayed on another 01, leaving any old stack content underneath: it never needs to pop below the level where its own first run began, and ε in a pop field does not test emptiness. The control state is still the same. Thus it accepts 0101, which violates block order. Contradiction.

The model assumptions matter: this is final-state acceptance and the course's no-pop ε convention. Do not transplant the proof unexamined to a model with empty-stack tests or a different acceptance rule.

## Fresh practice

Design the stack accounting for 0ᵐ1ⁿ satisfying n≤3m≤2n. Give a phase plan and prove why every permitted count pair can be handled.

<details class="solution"><summary>Show the design and existence proof</summary><p>Push three X's per zero, using a three-step chain that consumes one 0. In the one phase, choose to pop one or two X's per consumed 1. Accept by bottom-marker removal. Every successful run has n≤3m≤2n. Conversely, take 3m−n twos and 2n−3m ones. Both counts are nonnegative, they total n, and their weighted sum is 3m. Choose those pop paths to accept. The empty case m=n=0 is covered. Use intermediate states for extra ε pushes/pops and enforce the zero-then-one phase order.</p></details>
