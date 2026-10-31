# DFA 1 — A state is the information you keep

## The whole idea

The automatic door on pages 1–3 is the cleanest starting point: the same sensor reading can require different behavior depending on whether the door is already open or closed. **A state stores the relevant situation from before this instant.** The circle is the drawing of that stored situation. It is not the memory concept itself.

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
