The grammar hands the machine a to-do list. The stack keeps its next job on top, so pushing in reverse order is what preserves the intended output order.

A CFG-to-PDA conversion makes the stack a **to-do list for generating the input**. The top item is what must be dealt with next. A variable means “expand this using a grammar rule.” A terminal means “match this against the next input symbol.”

## Use the exact slide example

PDA 3 gives S→aTb|b and T→Ta|ε. The grammar generates b, ab, aab, aaab, and so on. We'll convert its actual productions rather than inventing a replacement language.

Initialize by pushing $ and then S. In the main state q, the stack starts `S$`, top at left. To use S→aTb, replace the top S with aTb, so the resulting stack is `aTb$`.

But if each transition pushes only one symbol, the push order is **b, then T, then a**. Last pushed becomes top. Pushing a,T,b would put b on top and force the wrong input order. That's the entire reason for “reverse the right side.”

## Every transition, including the boring ones

States: s (start), d (after bottom marker), q (main), u,v (long S rule), t (T rule), f (accept). F={f}. Stack alphabet Γ={a,b,S,T,$}; input alphabet Σ={a,b}.

| From | Label | To | Job |
|---|---|---|---|
| s | ε,ε→$ | d | Bottom marker |
| d | ε,ε→S | q | Start variable |
| q | ε,S→b | u | Begin S→aTb |
| u | ε,ε→T | v | Push middle T |
| v | ε,ε→a | q | Push first terminal a |
| q | ε,S→b | q | S→b alternative |
| q | ε,T→a | t | Begin T→Ta |
| t | ε,ε→T | q | Put T above a |
| q | ε,T→ε | q | T→ε |
| q | a,a→ε | q | Match terminal a |
| q | b,b→ε | q | Match terminal b |
| q | ε,$→ε | f | Finish |

The two moves from q labeled ε,S→b have different destinations and represent different grammar choices. This is allowed in a PDA. Intermediate states force a long production to finish its pushes before returning to q; they prevent arbitrary interleaving of unfinished replacements.

## Follow `aab` all the way

After initialization, stack S$. Choose S→aTb, yielding aTb$. Match the first a, leaving Tb$ and unread input `ab`. Expand T→Ta, yielding Tab$. Now choose T→ε, leaving ab$. Match a then b, leaving $. Pop $ and reach f with no unread input: accept.

Written as macro steps, this used two-symbol pushes; the table above expands each macro into legal single-symbol transitions. On an exam asking for the procedure's diagram, show those intermediate nodes unless the question explicitly permits a string-push abbreviation.

## Why conversion preserves the language

At q, the stack records the remaining symbols of a guessed leftmost derivation, above $. Expanding a variable follows an actual grammar rule; matching a terminal consumes the identical input symbol. A derivation of w gives a successful sequence of these moves, so every generated string is accepted. Conversely, any accepting run must have used valid productions and matched every terminal, with no unfinished stack symbols or unread input. Reading those production choices gives a derivation of w. Both directions matter.

## How to handle a state limit

First build the correct chains. Then look for identical **remaining push sequences** that can share a suffix of intermediate states. Do not merge merely because two circles look similar; merging must preserve which pushes remain. The 2025 paper explicitly asks for shared chains in its fixed draft. Check that shared exits cannot assemble a right side not in the grammar.

## Fresh practice

For S→0S1|ε, list the stack replacement for each production and expand the long replacement into single-symbol moves. Include input matching and the finish check.

<details class="solution"><summary>Show the construction</summary><p>Initialize $ then S. In main q, S→0S1 is q —ε,S→1→ u —ε,ε→S→ v —ε,ε→0→ q. The other rule is q —ε,S→ε→ q. Add loops 0,0→ε and 1,1→ε to consume the input. Add q —ε,$→ε→ f, with f the only accept state and no outgoing moves. The resulting stack after the long production is 0S1 followed by the old stack remainder. Match all input and empty the to-do list before acceptance.</p></details>
