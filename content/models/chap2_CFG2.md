# Grammar structure: the same string can carry different meanings

## The question: who belongs together?

The characters in `a+a×a` do not visibly say which operation groups first. A grammar can encode that structure. In the deck's layered grammar,

\[E\to E+T\mid T,\quad T\to T\times F\mid F,\quad F\to(E)\mid a,\]

E means an expression built from terms, T a multiplication-level term, and F an atomic factor: a single `a` or a parenthesized expression. These names are helpful meanings assigned to variables; the rules do the enforcing.

The expression can have one spelling and two different structures underneath. Think of “add first” versus “multiply first”: same visible ingredients, different grouping. The grammar has to tell us which groups belong together. Merely changing the order in which you expand independent jobs does not create a new structure.

## Round 1 — The grammar can enforce which operation binds first · pages 1–3

An **expression** may contain additions. A **term** may contain multiplications but no unparenthesized addition at its own level. A **factor** is either the terminal a or a parenthesized expression. The rules put those three jobs at different levels:

\[E\to E+T\mid T,\quad T\to T\times F\mid F,\quad F\to(E)\mid a.\]

These E,T,F abbreviate the slide's long variable labels. They are variables, while +,×,(,) and a are terminals. The grammar describes syntactic structure; a is a placeholder operand, not a variable we rewrite with arithmetic values.

For `a+a×a`, the top split is E+T. The left E finishes as a; the right T splits as T×F and finishes as a×a. Thus the multiplication forms one subtree inside the addition. For `(a+a)×a`, the top split is T×F; the left factor uses (E), allowing the addition inside parentheses. Parentheses explicitly create a factor containing an entire expression. That's how the hierarchy encodes **precedence**.

## Round 2 — Build bigger grammars from understood smaller jobs · pages 4–6

To generate 0ⁿ1ⁿ or 1ⁿ0ⁿ, use separate variables S₁ and S₂ for the two languages, then S→S₁|S₂. Choose one whole branch, not arbitrary alternating rules from both jobs. Rename variables before combining grammars if their old names collide.

A DFA can also become a grammar. Create variable Rᵢ for state qᵢ. For transition δ(qᵢ,a)=qⱼ add Rᵢ→aRⱼ. For accepting qᵢ add Rᵢ→ε. Start at the variable corresponding to the DFA start. A derivation prints precisely the labels of a path and may finish precisely at an accepting state.

Such a rule is **right-linear**: at most one variable remains, at the right end. General CFG rules can leave work on both sides, such as Rᵢ→aRⱼb. That pending b is an obligation the DFA's simple path rule cannot directly express. “A regular CFG” informally means a CFG whose generated language happens to be regular; regularity is a property of the language, not a guarantee from the letters used.

## Round 3 — Different schedules are not necessarily different structures · pages 7–12

The loose grammar E→E+E|E×E|(E)|a permits two trees for `a+a×a`. One makes + the root, representing a+(a×a); the other makes × the root, representing (a+a)×a. Those parenthesized descriptions explain the trees; they are not extra terminals inserted into the original string.

To prove ambiguity using derivations, force a common schedule: always expand the **leftmost remaining variable**. Two distinct leftmost derivations of one terminal string establish two different trees. For the loose grammar:

```text
E ⇒ E+E ⇒ a+E ⇒ a+E×E ⇒ a+a×E ⇒ a+a×a
E ⇒ E×E ⇒ E+E×E ⇒ a+E×E ⇒ a+a×E ⇒ a+a×a
```

The second line's first E is expanded before the later E. Both are leftmost; their top-level rules differ. By contrast, expanding the right child before the left child of one fixed tree changes the work schedule, not its parse structure. That's why “two arbitrary derivations” is too weak a definition.

A grammar is **ambiguous** when at least one string has two parse trees. A language is **inherently ambiguous** when every CFG generating it is ambiguous. The slide's final wording loosely says “a CFG is inherently ambiguous”; the property being described belongs to the language. One bad grammar does not prove inherent ambiguity, because a different grammar may remove the ambiguity, as the E/T/F hierarchy does here.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
