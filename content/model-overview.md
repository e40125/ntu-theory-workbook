## Start with the one job underneath the entire course

Alright. Before another Greek letter lands on your screen, fix the job in your head: **someone gives us a finite input, and we want to determine whether it follows a rule.**

Take `0011`. A rule might say: “zeros first, then exactly the same number of ones.” This input passes. `001` fails because one zero has no matching one. `0101` fails the order requirement even though the counts match. The rule has **two conditions**. Forget either and you solve a different problem.

A **string** is one input sequence. An **alphabet** is the set of symbols allowed in it. A **language** is the set of all strings satisfying the rule. The language is the target; a machine is our proposed checker. A machine can be designed incorrectly. Calling a circle “accept” doesn't make its decisions match the target by magic.

## The course keeps changing one resource: what can the checker remember?

Imagine reading `000…` and then receiving the first `1`. The earlier zeros are behind you. To decide whether enough ones follow, something must preserve the number of unmatched zeros. That's the actual problem. The circles and arrows are our way of specifying the solution—or proving a proposed kind of solution cannot exist.

| Model | What survives from earlier input? | What that buys us |
|---|---|---|
| DFA | One of finitely many state labels | A finite summary: odd/even, the last symbol, remainder modulo 3 |
| NFA | Several possible finite-state runs | Convenient guesses; a DFA can track the set of possibilities |
| PDA | A finite state **and an arbitrarily growing stack** | Store one marker per unmatched obligation; discharge the newest one first |
| Turing machine | A finite state, a writable tape, and a movable head | Write down information, revisit it, change it and compare separated pieces |

A stack is a pile whose top is the only accessible end. A tape is a row of cells you can revisit by moving a head. Those access rules matter as much as the amount of storage. “More memory” is too vague; ask **what can be written, inspected, and retrieved next?**

For `0011`, a PDA pushes two markers while reading the zeros, then pops one per `1`. State labels enforce “no zeros after ones.” The stack handles the count; the state handles the phase. That's how the parts cooperate.

## Grammars approach the same target from the other direction

A checker receives a finished string. A **grammar** starts with an unfinished job and constructs a string using replacement rules.

Consider `S → 0S1 | ε`. `S` is the unfinished job. `→` means “may be replaced by.” The vertical bar separates choices. `ε` means produce no symbols.

```text
S
0S1       add one zero before the unfinished job and one one after it
00S11     repeat that same wrapping move
0011      replace the remaining S by ε
```

Every wrapping adds a matched pair, and every zero is placed before the unfinished middle while every one is placed after it. The rule builds equality **and** order into the structure. The PDA's stored markers are another way to manage those unfinished obligations. Grammar ↔ PDA conversions make that connection exact.

CNF then changes the grammar's internal building blocks while preserving its finished strings. It is like reorganizing a recipe into smaller instructions: the meal must remain the same. We will explain exactly what corresponds, so the analogy doesn't have to carry the proof.

## A proof is the explanation that survives every input

Watching `0011` work tells us about `0011`. To justify the whole PDA, we need a statement that remains true throughout every run: during the matching phase, the stack has one marker for each earlier zero not yet matched by a one. That statement connects the changing machine to the fixed language rule.

To use it, check three things: it starts true; each allowed move preserves it; the final acceptance condition means the rule is satisfied. We also show every valid string has a successful run. This is the bridge from “I can follow the diagram” to “I can prove the diagram works.”

The **pumping lemma** goes the other way: finite memory forces some long runs to repeat a state, creating a reusable loop. If reusing that loop necessarily breaks the target language, no DFA could have been its correct checker. The loop is forced by the resource limit; the contradiction is between the checker's behavior and the target rule.

## Where the later chapters go

Once a tape gives us a general model of an algorithm, we ask a bigger question: **does any algorithm solve this problem and always finish?** Decidability studies that. Reductions show that a solver for one problem would give a solver for another. Complexity then asks how the number of steps grows with input length. “A solution exists,” “it eventually finishes,” and “it finishes quickly” are three different claims.

Use the deck guides in course order or jump to the concept blocking you. Each names the question, builds the mechanism, runs a concrete example, unpacks the notation, and explains the connection forward. The later-chapter guides are available because this is a guide to **every published deck**; their presence does not make them confirmed Midterm 2 scope.

For your current CNF question, start with **CNF 1: preserve the finished strings while changing the recipe**. Work from the meaning of a variable that can finish empty. The deletion rules will then have a reason behind them.
