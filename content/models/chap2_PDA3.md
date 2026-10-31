# CFG to PDA: run the grammar as a stack of pending output

## The bridge: generating a string and checking a string can cooperate

A grammar chooses how to build output. A PDA can guess those grammar choices while checking them against the supplied input. Its stack means: **this is the sequence still owed by the current derivation**. The next owed symbol belongs on top, so we can deal with it first.

The deck's grammar is \(S\to aTb\mid b\), \(T\to Ta\mid\varepsilon\). S either produces a single `b`, or an `a`, then T's output, then `b`. T can produce any number of a's. So the language consists of `b` and all strings of one or more a's followed by one b.

The stack is the machine's to-do list, with the **next job on top**. Expanding a variable breaks a job into smaller jobs. Matching a terminal checks off finished output against the actual input. Don't let the notation blur those actions together: planning an `a` and reading an `a` are two different damn steps.

## There are only two kinds of work

If the stack top is a **variable**, replace it using a grammar production. This consumes no input, because choosing how to produce a symbol is not the same as matching an actual symbol.

If the top is a **terminal**, it must equal the next input symbol. Consume that input symbol and pop the matching terminal. If they disagree, that branch has no matching move. A terminal cannot be expanded into something more convenient.

Initialize with S above a fresh bottom marker `$`. Finish when the pending work is exhausted, by removing `$` and entering accept. Input must also be fully consumed.

## A complete trace of `aaab`

Write the stack top first; omit `$` in this table only to make the pending work visible.

| Move | Unread input | Pending stack |
|---|---|---|
| initialize | `aaab` | S |
| choose S→aTb | `aaab` | aTb |
| match `a` | `aab` | Tb |
| choose T→Ta | `aab` | Tab |
| choose T→Ta | `aab` | Taab |
| choose T→ε | `aab` | aab |
| match `a` | `ab` | ab |
| match `a` | `b` | b |
| match `b` | ε | empty |

Now `$` can be removed and the run can accept. Notice how T→Ta adds a pending a **after** T. Expanding the variable repeatedly builds more work without consuming input; terminal matching pays it off afterward.

## Why pushes appear reversed on the diagram

To leave `aTb` top-first, physically push b first, then T, then a. The last pushed symbol is on top. That is a consequence of stack order, not a rule that reverses the generated language. If a diagram abbreviates a multi-symbol push, expand it into single pushes in that order using fresh intermediate states.

With a wrong production choice, the machine may get stuck. It can also keep choosing T→Ta forever. Such a branch does not accept. A finite successful derivation supplies a finite successful branch; existence of other bad branches doesn't invalidate it.

## Why the conversion is correct

After matching a prefix of the input, the stack records the ungenerated/unmatched remainder of a chosen leftmost derivation. Variable expansion changes that remainder exactly as a grammar step would. Terminal matching removes the next symbol only when it agrees with the input.

Thus a successful run describes a grammar derivation of the entire input. Conversely, a derivation of the input tells the PDA which productions to choose, giving a successful run. This is the two-way language-equality proof; tracing `aaab` alone is only an illustration.

**Keep:** expand variables without input; match terminals with input. Next we reverse the bridge: describe a PDA's balanced stack behavior with grammar variables.

**One connected check:** Why would consuming an `a` while applying S→aTb, and then consuming another when popping that terminal `a`, be wrong?
