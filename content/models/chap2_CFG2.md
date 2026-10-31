# Grammar structure: the same string can carry different meanings

## The question: who belongs together?

The characters in `a+a×a` do not visibly say which operation groups first. A grammar can encode that structure. In the deck's layered grammar,

\[E\to E+T\mid T,\quad T\to T\times F\mid F,\quad F\to(E)\mid a,\]

E means an expression built from terms, T a multiplication-level term, and F an atomic factor: a single `a` or a parenthesized expression. These names are helpful meanings assigned to variables; the rules do the enforcing.

## Build the example and see why precedence emerges

A leftmost derivation always expands the leftmost remaining variable:

\[E\Rightarrow E+T\Rightarrow T+T\Rightarrow F+T\Rightarrow a+T\Rightarrow a+T\times F\Rightarrow a+F\times F\Rightarrow a+a\times F\Rightarrow a+a\times a.\]

The final top-level split is E+T. The multiplication lives inside the right T. A factor can contain a whole addition only by using F→(E), which prints parentheses. That's why `(a+a)×a` has a different structure and different visible parentheses. The grammar is not calculating a numerical answer; it determines the syntactic grouping first.

## Ambiguity means two trees, not two scheduling choices

Now use the flatter grammar \(E\to E+E\mid E\times E\mid(E)\mid a\). It can build `a+a×a` with the root operation `+`, or with the root operation `×`. The root-`+` tree groups `a+(a×a)`; the root-`×` tree groups `(a+a)×a`, even though the generated string has no parentheses.

Two corresponding leftmost derivations are:

\[E\Rightarrow E+E\Rightarrow a+E\Rightarrow a+E\times E\Rightarrow a+a\times E\Rightarrow a+a\times a,\]

\[E\Rightarrow E\times E\Rightarrow E+E\times E\Rightarrow a+E\times E\Rightarrow a+a\times E\Rightarrow a+a\times a.\]

That is a complete ambiguity witness: **same terminal string, different parse structures**, certified here by different leftmost derivations. If you merely expand independent left and right children in a different order, you may still get the same tree. That's scheduling, not ambiguity.

A grammar can be ambiguous even if another grammar for the same language is unambiguous. An **inherently ambiguous language** is stronger: every CFG generating it is ambiguous. Keep the object straight—one rulebook versus the whole language.

## Designing a grammar by splitting the job

For \(\{0^n1^n\}\cup\{1^n0^n\}\), a new start chooses which subgrammar to run. One wraps zeros around ones; the other wraps ones around zeros. Union means either branch may generate the string; neither branch has to satisfy both descriptions.

A DFA can also become a grammar. Give each state qᵢ a variable Rᵢ. For an arrow qᵢ—`a`→qⱼ, add Rᵢ→aRⱼ. For each accepting state, add Rᵢ→ε, allowing generation to finish there. A derivation now writes exactly the labels of a successful machine path. This connects checking to building.

**Keep:** grammar rules encode structure, not just a bag of output strings. Next, CNF standardizes the shape of those rules while preserving the language.

**One connected check:** Why do two different leftmost derivations give stronger evidence of ambiguity than two derivations with unrestricted expansion order?
