This lesson reconstructs the **2025 Midterm 2 masking machine** from its prescribed algorithm and diagram. It is a worked example, so count this question as exposed after reading it. Use other questions or fresh variants for a later independent check.

## First translate the exact task

Input has the form `text#mask#`. The text uses a,b; the mask uses 0,1; their lengths are promised equal. Keep a text character if its corresponding mask bit is 1. Append the kept characters after the second #. The problem permits erasing processed text and mask positions and requires at most eleven states excluding reject.

Example: `ab#01#` must append `b`. The a pairs with 0 and is discarded; the b pairs with 1 and is copied. This is not a recognizer checking equal strings; it is a **transducer** computing an output.

## Assign one job to each state

| State | Job / information remembered |
|---|---|
| q₀ | Find the next text character, or finish at the first # |
| q₁ / q₂ | Remember a / b while scanning to the first # |
| q₃ / q₄ | Remember a / b while finding the next unprocessed mask bit |
| q₅ / q₆ | Remember a / b while scanning to the output's end |
| q₇ | Return left through output to the second # |
| q₈ | Return left through the mask area to the first # |
| q₉ | Return left through remaining text to the erased-prefix boundary |
| qₐ | Halt accepting |

Remembering a versus b requires different states while traveling, because the erased source character can't be reread. Return phases can be shared once that remembered symbol has been written or discarded.

## Complete transition table

Each row means current state, read symbol(s), write, move, next. “Same” means keep the scanned symbol. Unlisted pairs go to reject. The promised input format means we do not add a separate format validator.

| Current | Read | Write | Move | Next |
|---|---|---|---|---|
| q₀ | a | ⊔ | R | q₁ |
| q₀ | b | ⊔ | R | q₂ |
| q₀ | # | # | R | qₐ |
| q₁ | a,b | same | R | q₁ |
| q₂ | a,b | same | R | q₂ |
| q₁ | # | # | R | q₃ |
| q₂ | # | # | R | q₄ |
| q₃ | ⊔ | ⊔ | R | q₃ |
| q₄ | ⊔ | ⊔ | R | q₄ |
| q₃ | 0 | ⊔ | L | q₈ |
| q₄ | 0 | ⊔ | L | q₈ |
| q₃ | 1 | ⊔ | R | q₅ |
| q₄ | 1 | ⊔ | R | q₆ |
| q₅ | 0,1,#,a,b | same | R | q₅ |
| q₆ | 0,1,#,a,b | same | R | q₆ |
| q₅ | ⊔ | a | L | q₇ |
| q₆ | ⊔ | b | L | q₇ |
| q₇ | a,b | same | L | q₇ |
| q₇ | # | # | L | q₈ |
| q₈ | 0,1,⊔ | same | L | q₈ |
| q₈ | # | # | L | q₉ |
| q₉ | a,b | same | L | q₉ |
| q₉ | ⊔ | ⊔ | R | q₀ |

To draw the diagram from this table, draw each state once and one arrow for each row. Combine labels only when source, destination, write behavior, and movement agree. qₐ is a halting state; the course uses a labeled single circle for TM halting states. Use its convention.

## Why blank means different things in different phases

At q₃/q₄ a blank is a processed mask bit, so scan right. At q₅/q₆, after the current bit, there are no processed mask blanks ahead: remaining mask bits, separator, then output are nonblank. The first blank is the output end. At q₉, the first blank reached from the right is the processed-text boundary, so turn right. The state tells you which meaning is relevant. Without the phase, the same blank symbol is ambiguous.

<figure class="lab" data-lab="tm"><figcaption>Run the actual transition table. Each step shows the rewritten tape, head and state; reset to try a fresh promised-format input.</figcaption></figure>

## Correctness and halting

After k rounds, the first k text symbols and first k mask bits are erased. The output equals exactly the kept characters among those k positions, in their original order. Remaining text and mask suffixes are unchanged. In round k+1, q₀ remembers the next text character, q₃/q₄ finds the corresponding first unprocessed mask bit, and the branch either appends that character or skips it. The return phases restore the head to the next text symbol. Hence the invariant holds for k+1.

When all text is erased, q₀ reads the first # and accepts. Equal promised lengths ensure all mask positions have also been processed. Each round processes one pair; every scan crosses a finite region to a guaranteed boundary. Therefore the machine halts. The empty case `##` accepts with empty output.

## Fresh variation

Change the task to keeping a character exactly when its mask bit is **0**. Which transitions change? Explain why the rest of the invariant survives.

<details class="solution"><summary>Show the modification</summary><p>Swap the roles of input 0 and 1 at q₃ and q₄. Reading 1 now erases and moves left to q₈; reading 0 erases and moves right to q₅ or q₆. All scanning, appending and return rules stay the same. The invariant changes only from “kept by bit 1” to “kept by bit 0.” State meanings that remember a/b remain unchanged.</p></details>

**Exam habit:** after drawing, simulate the requested input through the actual final halting transition. The past solutions repeatedly require the entire trace, not an ellipsis near the end.
