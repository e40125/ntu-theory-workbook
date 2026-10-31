# CFGs: a variable is unfinished work, a terminal is finished output

## Start with what a grammar is trying to do

A DFA checks a completed string. A grammar **builds** strings. We still care about a language—a set of completed strings—but now ask which ones the construction rules can produce. There is no input head and no accepting circle in a grammar.

The deck's grammar is:

\[A\to0A1\mid B,\qquad B\to\#.\]

A and B are variables: placeholders for unfinished work. `0`, `1`, and `#` are terminals: finished output symbols that stay put. A is the starting variable. The vertical bar means “or,” so A has two alternative rules. The arrow means “you may replace this variable with that right-hand side.”

Aight, we are changing jobs: checking a finished string versus building possible strings. A variable is an unfinished job ticket. A rule replaces that ticket with new work or finished output. Terminals are the printed symbols that stay. Follow one ticket until the entire line contains finished output; that is a derivation.

## Round 1 — A grammar builds; a recognizer checks · pages 1–5

Aight, switch jobs deliberately. A machine starts with an input and checks it. A grammar starts with a pending instruction and builds possible outputs. Its language is the collection of completed outputs. These are two ways to describe which strings belong, not two names for the same physical process.

In the slide grammar A→0A1, A→B, B→#, A and B are **variables**: unfinished jobs. The symbols 0,1,# are **terminals**: finished output that no grammar rule rewrites. Here # is a literal printed symbol, not “number of.” A is the **start variable**.

Take A→0A1 three times: A⇒0A1⇒00A11⇒000A111. Each use adds one zero to the left and one one to the right while leaving one pending A inside. Then A→B and B→# finish the middle, giving 000#111. The **derivation** is the sequence of whole intermediate strings. A **parse tree** records which rule expanded each variable; its terminal leaves, read left to right, give the output. Branch order matters.

Why exactly 0ⁿ#1ⁿ? Every recursive use adds one matched pair; the only exit prints #. Conversely, for any n≥0, use the wrapping rule n times, then the exit. For n=0, A⇒B⇒#; no zeros or ones are needed. Those two directions establish the whole language.

## Round 2 — “Context-free” does not mean “meaningless” · pages 6–9

The noun-phrase example expands labeled phrase slots until only words remain. A variable named `⟨Noun-Phrase⟩` can be a single symbol in the grammar even though its label is long. Angle brackets help distinguish the label from printed English words.

A rule A→w may replace an A wherever it appears; it does not inspect its neighbors before becoming legal. That is the relevant meaning of **context-free**. It says something about the rule's left side, not about whether the generated sentence has real-world meaning.

The four-tuple (V,Σ,R,S) has finite variable set V, finite terminal set Σ, finite production-rule set R, and start S∈V. V and Σ are disjoint: a symbol cannot simultaneously be a rewriteable job and finished output. Each rule has one variable on the left and any finite string of variables/terminals on the right, possibly ε. The role called S may be filled by A, as in the slide. Again, a role name is not a required literal label.

## Round 3 — Read “yields” one replacement at a time · pages 10–11

If A→w is a rule, uAv⇒uwv. Here u and v are the untouched surrounding strings; w is the replacement. They may contain variables too. The arrow ⇒ means one derivation step. The starred arrow ⇒* means zero or more steps. Zero steps permits u⇒*u; it does not mean every variable can disappear.

The language definition {w∈Σ*:S⇒*w} requires two things: w contains only terminals, and a finite derivation from S reaches it. An intermediate string containing A is not yet a language member. An infinite rewrite that never finishes generates no completed string.

## Round 4 — Balanced parentheses require order as well as counts · page 12

For S→aSb|SS|ε, read a as an opening parenthesis and b as closing. aSb wraps one balanced expression; SS concatenates two; ε supplies the empty expression. For `aabbab`, derive S⇒SS⇒aSbS⇒aaSbbS⇒aabbS⇒aabbaSb⇒aabbab. Every replacement changes one selected S; ε removes that selected occurrence only.

Every generated string has equal a/b counts and no prefix with more b than a. `ba` has equal totals but violates the prefix condition, so it is not balanced. For the reverse direction, every nonempty balanced string can be split after the closing b matched to its first a: it has form a u b v with u,v balanced. Use wrapping for u and concatenation for v, recursively. Length decreases in the inner pieces, eventually reaching ε. That's why the rules cover every balanced string, not merely some nice-looking examples.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Run the rules all the way to completion

Begin with A. Choose its wrapping rule three times, then finish:

\[A\Rightarrow0A1\Rightarrow00A11\Rightarrow000A111\Rightarrow000B111\Rightarrow000\#111.\]

At `00A11`, the zeros and ones are already output. A is the one unfinished job between them. Applying A→0A1 replaces **that A**, leaving its surrounding output untouched. We didn't replace the entire line with `0A1`.

Each wrapping adds one zero on the left and one one on the right. Switching to B stops the wrapping; B→# puts a separator in the middle. Therefore the generated language is \(\{0^n\#1^n:n\ge0\}\). n is the number of wraps. With zero wraps, A→B→# gives `#`. ε is not generated: no rule finishes with no terminal at all.

## Why this can do what a DFA cannot

The growing expression stores unfinished structure. Every additional wrap leaves one more `1` waiting on the right. A finite grammar can describe arbitrarily deep nesting because its rules can reuse a variable. The finite **rulebook** does not impose a fixed bound on the size of a derivation.

A parse tree records the same construction as a tree. A node labeled A has children `0`, A, `1` when that rule is used. Read the terminal leaves left to right to recover the completed string. The tree preserves who created whom, which a final string alone does not show.

## Decode the formal package

\(G=(V,\Sigma,R,S)\) names a grammar. V is its finite set of variables; Σ is its finite terminal alphabet; R is its finite rule set; S is the starting variable. In this example S—the formal slot name—is filled by the variable A. The actual start does not have to be called S.

\(uAv\Rightarrow uwv\) says a rule A→w can replace A wherever it appears, with the same surrounding strings u and v retained. “Context-free” means the rule does not inspect those surroundings before permitting replacement. \(\Rightarrow^*\) means zero or more derivation steps.

## The last slide adds two different ways to grow structure

For S→aSb|SS|ε, interpret a as an opening parenthesis and b as a closing one. S→aSb wraps one balanced structure inside a matched pair. S→SS places two balanced structures side by side. S→ε finishes with nothing. For `aabbab`, one derivation is S⇒SS⇒aSbS⇒aaSbbS⇒aabbS⇒aabbaSb⇒aabbab. Each arrow replaces one S.

Equal counts alone are insufficient: `ba` has one of each but closes before anything opens. A balanced-parentheses string must have equal final counts **and** every prefix must contain at least as many openings as closings. Wrapping and concatenation preserve both conditions. Conversely, split a nonempty balanced string after the close matching its first opening: inside that pair and after it are smaller balanced strings, exactly the wrapping and side-by-side jobs. This connects grammar rules to nested structure, the reason stacks will be useful.

## What a correctness proof has to establish

Every derivation here produces matching outer blocks because each wrap adds exactly one of each symbol and the only finishing option inserts #. Conversely, any desired n can be produced by choosing n wraps then finishing. This proves both “no wrong strings” and “every required string.” Merely deriving `000#111` proves only one example.

**Keep:** variables are pending jobs; rules replace one pending job; terminals are finished output. Next we use grammar structure to control arithmetic grouping and identify ambiguity.

**One connected check:** At `00A11`, why can the next step produce `000A111` but not `000A11`?
