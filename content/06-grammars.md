Aight, now we build strings. Treat every variable as unfinished work and every terminal as output that stays put. Track the whole intermediate string after each replacement.

A grammar **builds** a string. A machine **reads** a string. We will later convert between them while preserving the language. First, make the building process concrete.

## One course example, every symbol explained

CFG 1, pages 2–5, gives:

\[A\to0A1\mid B,\qquad B\to\#.\]

A and B are **variables**: unfinished work you may replace. `0`, `1`, and `#` are **terminals**: actual symbols in the finished input. Here `#` is literally a separator character, not a counting operator. The start variable is A. The vertical bar means “or”: A may be replaced by 0A1 or by B.

The four-part formal grammar is \(G=(V,\Sigma,R,S)\). V={A,B} is the variable set. Σ={0,1,#} is the terminal alphabet. R is the set of rules above. S=A says that the chosen start variable is A. The formal slot is conventionally called S; the actual symbol occupying it need not be named S.

To generate `00#11`:

\[A\Rightarrow0A1\Rightarrow00A11\Rightarrow00B11\Rightarrow00\#11.\]

At each arrow replace exactly one variable occurrence using a rule. Everything around it stays put. The last line has only terminals, so it is a finished string. \(\Rightarrow\) means one derivation step; \(\Rightarrow^*\) means zero or more steps. A rule arrow \(\to\) states an allowed replacement; a derivation arrow \(\Rightarrow\) applies one inside a whole string.

## Why this language is exactly 0ⁿ#1ⁿ

Each A→0A1 adds a matching outer pair. A→B and B→# end the wrapping with a separator. Any finished derivation therefore gives 0ⁿ#1ⁿ for some n≥0. Conversely, for any n≥0, take n wrapping steps then the two finishing steps. This proves both directions. With n=0, the string is `#`, **not ε**.

The recursive variable keeps the two distant blocks linked. That's the extra power compared with a finite-state memory. The grammar can nest arbitrarily many pending matching pairs.

## Designing a grammar: decide what a rule contributes

Target \(0^n1^n\), n≥0: S→0S1 adds a matched pair, S→ε ends with zero pairs.

Target all strings made of balanced parentheses: S→(S) | SS | ε. The wrap nests one balanced string; SS puts two balanced strings side by side. A string like `()()` needs the concatenation rule. A string like `)(` is excluded even though the counts agree. Count alone doesn't establish correct nesting.

Target \(0^n1^n\cup1^n0^n\): use separate variables A→0A1|ε and B→1B0|ε, then S→A|B. The start chooses which entire pattern to generate. It doesn't mix the two patterns midway.

## Read a bigger grammar from the inside out

The 2023 paper starts with B→bB|ε and D→cD|ε. These generate b* and c*: any nonnegative count. X→aXb|ab generates aⁱbⁱ with i≥1. The base ab excludes ε.

Then Y→aBc|aYc generates aⁱbʲcⁱ with i≥1,j≥0: each wrap adds one a and one c, and B freely chooses the b count. Finally S→XD|Y chooses either equal a/b counts with arbitrary c's, or equal a/c counts with arbitrary b's. Work **bottom-up by variable**, then compose the results. Don't guess the full language from one sample string.

## Fresh practice

Construct and justify a CFG for \(L=\{0^m1^n\mid m\geq n\geq0\}\). Your proof must explain order, inequality, and why every valid pair of counts is possible.

<details class="hint"><summary>Hint: split the zeros into two jobs</summary><p>Some zeros are extra. The remaining zeros each pair with one 1. Use one variable for extra zeros and another for matched pairs, concatenated in that order.</p></details>
<details class="solution"><summary>Show construction and proof</summary><p>Use S→AB, A→0A|ε, B→0B1|ε. A generates 0ᵏ with k≥0 and B generates 0ⁿ1ⁿ, so every resulting string is 0ᵏ⁺ⁿ1ⁿ and satisfies m≥n. Conversely, for any m≥n≥0 choose k=m−n extras from A and n pairs from B. This derives 0ᵐ1ⁿ. Both directions and ε are covered.</p></details>

**Keep:** a rule is a local replacement; a derivation is a sequence of replacements; the language contains only terminal strings reachable from the start.
