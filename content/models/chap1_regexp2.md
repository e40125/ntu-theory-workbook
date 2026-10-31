# RE to NFA: make each piece of the recipe executable

## The whole idea: an expression has a structure; the machine follows it

The deck builds an NFA for \((ab\cup a)^*\). Read that from the outside inward: repeat a block zero or more times; each block is either `ab` or `a`. So the machine needs a place where one block ends and another may begin. That place must also accept, because zero blocks is allowed.

Use q₁ as the start and accepting state, and q₂ as “we consumed the `a` of an `ab` block and still owe a `b`.” Now the arrows have reasons:

| State | Read `a` | Read `b` |
|---|---|---|
| q₁ | {q₁, q₂} | ∅ |
| q₂ | ∅ | {q₁} |

From q₁ on `a`, one branch finishes the single-letter block `a` and returns to q₁. Another branch treats that same `a` as the first half of `ab` and goes to q₂. It is one input symbol consumed along two alternative interpretations. We didn't duplicate the input or require both branches to work.

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
