# CFGs: a variable is unfinished work, a terminal is finished output

## Start with what a grammar is trying to do

A DFA checks a completed string. A grammar **builds** strings. We still care about a language—a set of completed strings—but now ask which ones the construction rules can produce. There is no input head and no accepting circle in a grammar.

The deck's grammar is:

\[A\to0A1\mid B,\qquad B\to\#.\]

A and B are variables: placeholders for unfinished work. `0`, `1`, and `#` are terminals: finished output symbols that stay put. A is the starting variable. The vertical bar means “or,” so A has two alternative rules. The arrow means “you may replace this variable with that right-hand side.”

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
