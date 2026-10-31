We are checking whether the same finished string has two different structural explanations. Different order of doing the same jobs does not automatically count.

Ambiguity asks whether **one finished string has two different grammatical structures**. It does not ask whether two different strings can be generated. Of course a useful grammar usually generates lots of strings.

## Why “two derivations” alone is too weak

Take S→AB, A→a, B→b. You can expand A before B or B before A. Both routes make `ab`, but they describe the same parse tree: S has children A and B, and those become a and b.

To remove this irrelevant choice of expansion order, require a **leftmost derivation**: at each step replace the leftmost remaining variable. A grammar is ambiguous if some string has two distinct leftmost derivations, equivalently two distinct parse trees. One leftmost and one rightmost derivation do not automatically prove ambiguity.

## A whole example from the 2022 paper

Grammar: H→bCb; C→mC | CbC | ε. Terminals b and m represent bread and meat. The start H is the whole hamburger. The string `bmbmb` can be built in these two leftmost ways:

\[H\Rightarrow bCb\Rightarrow bmCb\Rightarrow bmCbCb\Rightarrow bmbCb\Rightarrow bmbmCb\Rightarrow bmbmb.\]

\[H\Rightarrow bCb\Rightarrow bCbCb\Rightarrow bmCbCb\Rightarrow bmbCb\Rightarrow bmbmCb\Rightarrow bmbmb.\]

In the first route, the outer C first uses mC, then that remaining C splits into CbC. In the second, the outer C splits immediately, and the left child contributes the first meat. These are different structural choices, not merely doing the same independent replacements in another order. Every step shown replaces the leftmost variable, and both routes end at the identical terminal string.

That's a complete ambiguity witness. You don't need to show every string is ambiguous. The definition needs **one** witness.

## Nullable rules can hide ambiguity

If B→BB|b|ε, the variable B can disappear directly or split and have both children disappear. So even a very short terminal string may have multiple parse structures. In the 2024 paper, S→B|BJ and J→jJb|j|ε. The string `j` has:

\[S\Rightarrow BJ\Rightarrow J\Rightarrow j\]

and

\[S\Rightarrow BJ\Rightarrow BBJ\Rightarrow BJ\Rightarrow J\Rightarrow j.\]

The second route has an extra B→BB subtree. Deleting ε from a written string does not delete that historical tree structure. This is why identical-looking intermediate strings can occur in distinct derivations.

## Grammar versus language

“G is ambiguous” is a statement about **this grammar**. It does not prove its language has no unambiguous grammar. A language is **inherently ambiguous** when every CFG for it is ambiguous. That is a stronger claim requiring a different argument. Don't upgrade the conclusion just because the wording sounds similar.

## How to work an ambiguity problem

Identify a string that can be split in two ways, or produced by two alternative start branches, or gets redundant nullable subtrees. Write two complete leftmost derivations. Underline the leftmost variable mentally before each step. Check the final terminal strings match exactly. State that the derivations are distinct and therefore the supplied grammar is ambiguous.

For arithmetic expressions, E→E+E|E×E|a permits different parse grouping of `a+a×a`. A grammar separating expression, term, and factor can impose precedence. It's the grammar structure doing the disambiguation; just writing “multiply first” beside an ambiguous grammar does not change its rules.

## Fresh practice

For S→SS|a, prove ambiguity using `aaa`. Give two leftmost derivations and explain where their structures differ.

<details class="hint"><summary>Hint: choose which child of the root grows</summary><p>After S→SS, one derivation can expand the left S into SS. In the other, finish the left S as a before expanding the right S.</p></details>
<details class="solution"><summary>Show the two derivations</summary><p>S⇒SS⇒SSS⇒aSS⇒aaS⇒aaa, and S⇒SS⇒aS⇒aSS⇒aaS⇒aaa. Both always expand the leftmost variable. The first groups the first two a's under the left child of the root; the second groups the last two under the right child. Thus the grammar is ambiguous.</p></details>
