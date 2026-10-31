# DFA 1 — A state is the information you keep

## The whole idea

The automatic door on pages 1–3 is the cleanest starting point: the same sensor reading can require different behavior depending on whether the door is already open or closed. **A state stores the relevant situation from before this instant.** The circle is the drawing of that stored situation. It is not the memory concept itself.

Think of the door controller as a tiny employee with a brutally small memory. It does not keep a video of everyone who passed. It remembers whether the door is open or closed. The whole damn design question is: does that remembered fact, plus the next sensor input, tell it what to do?

## Round 1 — The door has memory, but it ain't remembering your life story · pages 1–3

The door example explains **why states exist**. Its input alphabet has four categories: front, rear, both, neither. These are four symbols even though their English names contain several letters. In closed, only front opens the door; rear, both and neither keep it closed. In open, front, rear or both keep it open; neither closes it. The rule avoids swinging the door into someone behind it.

The same input “both” has different results depending on current state. So input alone is insufficient. The controller needs one stored fact: open or closed. One bit can distinguish two possibilities. The idealized model ignores motor speed, sensor noise and physical engineering; it isolates the update logic. **Automaton** is singular, **automata** plural. A model is simplified on purpose so we can prove something about it.

## Round 2 — Work the actual three-state machine all the way through · pages 4–8

This machine has a different job from “ends in 1.” It requires at least one 1 and an even number of zeros after the last 1. Zero zeros counts as even, because 0=2×0.

Give the circles meanings: q₁ means no 1 has appeared; q₂ means a 1 has appeared and the trailing zero count is even; q₃ means a 1 has appeared and that count is odd. From q₁, a 0 changes nothing and a 1 establishes the first 1. From q₂, 0 makes the count odd while 1 resets it to zero. From q₃, 0 makes the count even while 1 again resets it to zero. That's the whole table, derived from meaning rather than guessed arrows.

For `1101`, q₁→q₂→q₂→q₃→q₂. All four symbols have been consumed, and q₂ accepts. For `10`, q₁→q₂→q₃ and the input ends: reject. The visit to q₂ halfway through did not settle the result. For `000`, remain at q₁: no 1 ever appeared. For `100`, finish at q₂: two zeros after the last 1.

## Round 3 — Turn the notation into a form you can fill · pages 6–10

Q is the list of allowed memory situations. Σ, pronounced sigma, is the input-symbol list. δ, delta, is the update table. q₀ names the designated starting state. F is the collection of successful final states. **Finite** constrains Q and Σ to finitely many elements; strings may still be arbitrarily long.

The statement q₀∈Q says the start must be one of the available states. F⊆Q says accepting states come from that same inventory. Neither statement requires a state literally labeled q₀. In the slide q₀=q₁. This is like a form field “manager” filled with a person's name: the role and its occupant are different levels.

`A=L(M)` says the language called A is exactly the collection accepted by machine M. A is not an accepting-state set; F is. In `{w | condition}`, w stands for a whole string and the vertical bar means “such that.” In `|w|`, the pair of bars means length. In “#0,” # means number of zeros. No, these marks don't all do the same job.

The final two-state example needs less memory than the three-state one. Once the next symbol arrives, knowing earlier symbols cannot improve the ends-in-1 decision. That is the design question to keep: **which differences in the past can still change the answer for a future continuation?**

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Build the machine before the notation

A door controller receives a sensor category such as front, rear, both or neither. Its current state plus that reading determines the next state. You do not need the entire history of everyone who walked past. You need the small summary that makes the next decision possible.

A DFA applies the same idea to a string: read one symbol, update the summary, repeat. “Deterministic” means a current state and symbol specify exactly one next state. “Finite” means the list of available summaries is fixed and finite. It cannot invent a new state every time the input gets longer.

Acceptance is checked **after all input is read**. An accepting state may have outgoing arrows because the current prefix might be valid while a longer string is not. Walking through an accepting state halfway through is not an early victory lap.

## Follow the actual slide example

Pages 9–10 ask for strings ending in `1`. What must survive from the past? Only whether the most recently read symbol is `1`. Use q₁ for “no last 1” and q₂ for “last symbol was 1.” Initially q₁: no symbol has been read, and the empty string does not end in 1.

```text
Current summary      Read 0       Read 1
q₁: not ending in 1   q₁           q₂
q₂: ending in 1       q₁           q₂
```

For `1010`, start q₁. Read 1→q₂, 0→q₁, 1→q₂, 0→q₁. End in q₁, so reject. Notice why both rows agree: whatever happened before, a new final `0` makes the current prefix end in zero. The update rule follows from the state's meaning.

## Now decode the five pieces

The tuple (Q,Σ,δ,q₀,F) names the same machine in five fields. Q is the finite set of states; Σ is the input alphabet; δ is the update function; q₀ is the chosen starting state; F is the set of accepting states. In this example Q={q₁,q₂}, Σ={0,1}, q₀=q₁ and F={q₂}. The subscript 0 in q₀ means “designated start,” so its actual label can be q₁. Annoying notation, yes; no mathematical conflict.

δ(q₁,1)=q₂ reads “from q₁, on input 1, go to q₂.” Its type Q×Σ→Q means it consumes a pair and returns one state. It says nothing about how many accepting states are permitted. F may contain several states or none.

## Why this works

After every nonempty prefix, the machine is at q₂ exactly when that prefix ends in 1. Check the first symbol, then notice each update preserves the statement. At the end, F selects exactly the required strings. This statement is the machine's **invariant**: its maintained meaning.

Pages 4–8 use a different three-state language: at least one 1, with an even number of zeros after the last 1. Do not silently reuse the two-state interpretation there. Different target, different information to remember.

**Next connection:** DFA2 turns “remember the relevant summary” into a construction method. **Connected check:** explain why “ends in 1” needs no exact count of all earlier ones, while “exactly one 1” needs a different summary.
