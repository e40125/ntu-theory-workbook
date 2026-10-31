# RE to NFA: make each piece of the recipe executable

## The whole idea: an expression has a structure; the machine follows it

The deck builds an NFA for \((ab\cup a)^*\). Read that from the outside inward: repeat a block zero or more times; each block is either `ab` or `a`. So the machine needs a place where one block ends and another may begin. That place must also accept, because zero blocks is allowed.

Use q₁ as the start and accepting state, and q₂ as “we consumed the `a` of an `ab` block and still owe a `b`.” Now the arrows have reasons:

| State | Read `a` | Read `b` |
|---|---|---|
| q₁ | {q₁, q₂} | ∅ |
| q₂ | ∅ | {q₁} |

From q₁ on `a`, one branch finishes the single-letter block `a` and returns to q₁. Another branch treats that same `a` as the first half of `ab` and goes to q₂. It is one input symbol consumed along two alternative interpretations. We didn't duplicate the input or require both branches to work.

Now make the recipe run. Each little expression gets a little checker; the construction connects their entrances and exits. The big question is whether those connections consume exactly the chunks the recipe permits. We will trace the slide’s actual chunks, because “just connect the machines” hides the part you need to understand.

## Round 1 — Build the expression from the inside out · pages 1–2

The target `(ab∪a)*` means a sequence of chunks, each either `ab` or `a`. It does not mean any string over a and b. Every b needs an immediately preceding a belonging to the same chunk; a b cannot stand alone. Examples: ε, a, ab, aa, aba, abab. Reject b, ba and abb.

Start with one-arrow machines for a and b. Join the a machine to the b machine with ε to build ab. For the union, add a fresh start whose ε branches choose the ab machine or the separate a machine. For star, add another fresh accepting start and ε restart arrows from the old accepting states. Each level has a different job: concatenate inside a chunk, choose a chunk type, then repeat chunks.

This construction follows the expression's structure mechanically. It can create redundant states because correctness, not minimum size, is its goal. Simplifying afterward is a separate task. On an exam requesting a particular procedure, show the procedure before offering a smaller equivalent machine.

## Round 2 — Why the two-state shortcut works · page 3

The smaller machine starts and accepts at q₁. On a, q₁ offers {q₁,q₂}. Staying at q₁ treats that a as a complete one-symbol chunk. Moving to q₂ treats it as the first half of ab; q₂ then demands b and returns to q₁. No other moves exist.

Trace `aba`: start {q₁}; after a, {q₁,q₂}; after b, {q₁}; after a, {q₁,q₂}. Accept because q₁ survives. For `abb`: after ab the set is {q₁}; the extra b has no matching move, giving ∅ and rejection. For ε, the initial q₁ already accepts.

The table's ε column is entirely ∅. An NFA does not have to use ε transitions. Its nondeterminism can come entirely from multiple same-symbol destinations, as it does here. Conversely, drawing a single start and accept does not make it deterministic; q₁ has two possible a moves.

Proof from the chunks: every return to q₁ consumes either a or ab. Therefore an accepting run spells a concatenation of allowed chunks. Given any allowed chunk list, choose q₁→q₁ for a and q₁→q₂→q₁ for ab. This yields an accepting path. That's the language equivalence, not just a handful of traces.

## Round 3 — Reading a graph backward into a recipe · pages 4–5

The second example starts at state 1, loops there on a, crosses to accepting state 2 on b, and loops there on a or b. Before the crossing: a*. The crossing: b. After it: (a∪b)*. In order, a*b(a∪b)*.

This expression accepts exactly strings with at least one b. The first b provides the crossing, with any earlier symbols necessarily a. For `aa`, no crossing occurs; reject. For `ba`, cross immediately and then loop; accept. For ε, there is no b; reject.

Here the graph has a single clean one-way crossing, so the recipe is visible. With several mutually connected states, guessing the expression gets unreliable. The next deck gives a procedure for replacing each possible journey with an expression, one removed state at a time.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Follow a whole string, including the dead branches

Trace `aba`. Start with `{q₁}`. After the first `a`, candidates are `{q₁,q₂}`. On `b`, q₁ contributes nothing and q₂ contributes q₁, leaving `{q₁}`. On the final `a`, candidates are `{q₁,q₂}` again. q₁ is present, so accept. Its successful interpretation is `ab` followed by `a`.

Trace `abb`. After `ab`, only q₁ remains. It has no `b` arrow, so the set becomes ∅ and the input rejects. An NFA doesn't get to resurrect a dead branch because the remaining letter is inconvenient.

ε accepts immediately at q₁. `b` rejects. `aa` accepts as `a` + `a`. These checks cover different reasons the construction might fail; they are not a proof for every string.

## Where the bigger slide construction comes from

The mechanical conversion can use more states and ε arrows: build `ab`, build `a`, join them by union, then wrap the result in star. Those ε arrows route control without consuming a letter. The compact table above packages the same language more efficiently. Different state counts do not mean different answers; compare **accepted strings**.

To justify correctness, follow completed blocks. Every successful return to q₁ consumes either `a` or `ab`, so an accepting run spells a concatenation of permitted blocks. Conversely, any chosen sequence of those blocks has a path: take the self-return interpretation for `a`, or the q₂ detour for `ab`. That is the two-direction argument: no extras, none missing.

## The reverse problem is coming

An NFA with an `a`-loop before a mandatory `b`, then arbitrary `a` or `b` afterward, has expression \(a^*b(a\cup b)^*\). You can see it by reading the stages. Messier diagrams need a general method: remove a state while preserving the paths that used to go through it. That is the next deck's job.

**Keep:** give every state an unfinished obligation. The arrows become consequences of that meaning instead of random doodles.

**One connected check:** Does `aab` have a successful block decomposition? Identify it before tracing the table.
