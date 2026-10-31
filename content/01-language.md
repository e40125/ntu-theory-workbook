Aight, before we build a machine, we need to know exactly which inputs are supposed to pass. Read the rule like a contract: every condition matters, and the symbols are just a compact way of stating it.

The whole job of this course is to describe **which inputs belong**, then build a machine or a proof that gets that decision right. Before the machinery, we need to know what the objects are. Otherwise every formula turns into alphabet soup.

## Symbols, strings, and languages

An **alphabet**, written \(\Sigma\) (“sigma”), is the finite set of symbols inputs may use. For \(\Sigma=\{0,1\}\), the symbols are `0` and `1`. A **string** is a finite ordered sequence of these symbols: `101` is one string. Its length is \(|101|=3\). The bars mean **length**, not membership or absolute value here.

A **language** is a set of strings. In \(E=\{1\}\), the language has exactly one member: the one-symbol string `1`. So `1` belongs; `11` does not. The letter E is just the name someone picked. Rename it A and the language stays the same. Braces collect members; they do not mean “repeat.”

Compare three different objects:

| Expression | What it is | What it contains |
|---|---|---|
| `1` | A string | One symbol |
| `{1}` | A language | One string, namely `1` |
| `1*` as a regular expression | A description of a language | Zero or more consecutive `1`s |

The empty string, \(\varepsilon\), has zero symbols. The empty set, \(\emptyset\), has zero members. Thus \(\{\varepsilon\}\) has **one** member, a string of length zero. It's an empty package versus no package. Keep the analogy limited: the package corresponds to a member of a set.

## Read a real slide's language

Pumping Lemma 1, page 1, uses

\[A=\{0^n1^n\mid n\geq0\}.\]

Read it as: “A is the set of strings made of n zeros followed by n ones, for any integer n at least zero.”

- \(0^n\): n copies of `0`, not the arithmetic number zero to a power.
- Writing \(0^n1^n\) side by side means **concatenate**: put the second string after the first.
- The vertical bar inside the braces means **such that**. It plays a different role from the two length bars in \(|w|\).
- The same n appears twice, so the two counts must agree.

Substitute n=0 to get ε. Substitute n=1 to get `01`. Substitute n=2 to get `0011`. `0101` has the same number of zeros and ones, but is not in A: the zeros must all come first. The order condition is doing real work.

Now change the rule to \(C=\{w\in\{0,1\}^*\mid \#_0(w)=\#_1(w)\}\). Here \(\#_0(w)\) counts zeros and \(\#_1(w)\) counts ones. `0101` **is** in C. This is a changed language, not a new way to spell A.

## Decode the glue

\(w\in A\) means “w is a member of A.” \(A\subseteq B\) means every member of A is also in B. The first compares a string with a language; the second compares two languages. \(A\cup B\) is union: strings in either language. \(A\cap B\) is intersection: strings in both.

\(AB=\{xy\mid x\in A,y\in B\}\) means choose a string from A and then one from B, in that order. If A={0,11} and B={1}, then AB={01,111}; BA={10,111}. No, concatenation is not a free-for-all shuffle.

\(A^*\) means concatenate **zero or more** members of A. Zero choices produce ε, so ε always belongs to A*. For A={01}, A*={ε,01,0101,…}; `001` is not included. For A={0,1}, A* is every finite binary string. The base language changed, so the result changed.

## What to write on an exam

> For A={0ⁿ1ⁿ | n≥0}, a string belongs exactly when it consists of a block of zeros followed by a block of ones of the same length. The empty string is included by choosing n=0.

Notice that this sentence states both **order** and **count**, and handles the boundary n=0. That's the habit: unpack the rule into conditions before you draw anything.

## A connected practice task

For \(B=\{0^m1^n\mid m\geq n\geq0\}\), classify ε, `0`, `001`, `011`, and `010`. For each rejection, name the condition it violates. Then explain how B differs from A above.

<details class="hint"><summary>Hint: find the two separate checks</summary><p>First check whether the string is zeros-then-ones. Only after that compare the number of zeros with the number of ones. Zero-length blocks are allowed.</p></details>
<details class="solution"><summary>Show the worked answer</summary><p>ε: yes (m=n=0). 0: yes (m=1,n=0). 001: yes (m=2,n=1). 011: no (1 is less than 2). 010: no (a zero occurs after a one). B permits extra zeros; A requires equality. Both require block order. A is a subset of B.</p></details>

**Keep:** alphabet = allowed symbols; string = one ordered input; language = set of inputs. Membership depends on every condition in the definition.
