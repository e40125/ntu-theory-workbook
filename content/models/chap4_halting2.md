# The acceptance contradiction: build a program that flips its own predicted answer

## Assume the impossible helper precisely

Suppose a decider H answers whether any encoded machine M accepts any input w. H always halts. On a yes-instance it says yes; on a no-instance it says no. “No” includes both M rejecting and M looping forever. H would have to settle both cases correctly.

We are assuming this helper exists to derive a contradiction. We are not claiming we can already implement it, and we are not waiting for a looping machine to finish.

Suppose a perfect predictor tells a program what it will do. Build the program to do the opposite of that prediction when inspecting its own description. Now follow both possible predictions. Each breaks the predictor’s promise. The contradiction needs that exact construction; self-reference alone is not some magic spell.

## Round 1 — There are more languages than programs · pages 1–3

List finite binary strings by increasing length, then lexicographic order within a length: ε,0,1,00,01,… . Every finite string appears at a finite position. TM descriptions are finite strings, so there are only countably many machines, even though there are infinitely many.

A language is an arbitrary subset of that string list. Its **characteristic sequence** writes 1 at position i when string i belongs, otherwise 0. For the language of strings starting with 0, the opening bits are 010110011… under the slide's enumeration. This sequence is infinite because it answers membership for every possible finite input.

Infinite binary sequences are uncountable by diagonal bit-flipping. Each corresponds to one language, so there are uncountably many languages. Each machine recognizes one language, though several machines may recognize the same one. Countably many machines cannot cover the uncountable collection. Thus some languages are not even Turing-recognizable. This counting argument proves existence; it does not yet identify a specific example.

## Round 2 — The hypothetical perfect checker gets asked about itself · pages 4–8

Assume H decides A_TM, so H always halts and answers whether a supplied M accepts its supplied input. Construct D on input ⟨M⟩: run H on ⟨M,⟨M⟩⟩, then output the opposite result. D can do this because machine descriptions are ordinary finite strings and H is assumed total.

Now feed D its own description. If H predicts D accepts ⟨D⟩, D rejects. If H predicts D does not accept ⟨D⟩, D accepts. Either answer contradicts H's promised correctness. Therefore H cannot exist.

The no-case for an arbitrary M is “M does **not accept**,” including rejection or looping. The slide sometimes writes “rejects” where that broader condition is needed. D itself always halts under the assumption that H is a decider, so its self-case has no third looping escape route.

In the diagonal table, row i records what Mᵢ does on each machine description. D differs from row i at its diagonal input ⟨Mᵢ⟩. If D appeared as a row, its own diagonal cell would have to disagree with itself. This is the program version of constructing a missing decimal, with total H supplying the hypothetical answers.

## Round 3 — Why swapping accept and reject does not complement a recognizer · pages 9–12

A recognizer may loop on a nonmember. Swapping its two halting labels leaves that loop unchanged, but the input should now be accepted by a recognizer for the complement. So the swap works for deciders, where every run reaches a halt, but not for arbitrary recognizers.

**Co-recognizable** means the complement has a recognizer. The theorem is: A is decidable iff both A and its complement are recognizable. Forward: a decider recognizes A, and swapping its answers gives a decider—and therefore recognizer—for the complement.

Reverse: run the two recognizers with **dovetailing**, one step of the first, then one step of the second, repeatedly. If the A-recognizer accepts, accept. If the complement-recognizer accepts, reject. Every input belongs to exactly one side, so one of those accepting events eventually happens. A rejection by one recognizer is not needed as the decisive signal; its behavior on nonmembers may include looping.

Since A_TM is recognizable but undecidable, its complement cannot also be recognizable, or the theorem would produce a decider. This provides the explicit nonrecognizable language that the earlier counting proof did not name.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Build the challenger D

On input ⟨M⟩, D asks H about \(\langle M,\langle M\rangle\rangle\): does M accept its own description? If H says yes, D rejects. If H says no, D accepts. Because the assumed H always halts, D also halts.

A machine description can be input data just like any other string. M is a machine; ⟨M⟩ is its encoded description. Feeding code to a program is not mystical self-awareness—it's ordinary data processing.

H is the supposed perfect predictor; D is the deliberately contrary program. D doesn't have to be clever. Its entire move is “whatever H predicts about acceptance, do the opposite.” The contradiction arrives only when the predictor is asked about **that very contrary program on its own code**. Keep those roles fixed before substituting D for M.

## Now give D its own description

Ask what D does on ⟨D⟩.

If H predicts “D accepts ⟨D⟩,” D follows its rule and rejects. The prediction is wrong.

If H predicts “D does not accept ⟨D⟩,” D follows its rule and accepts. Again the prediction is wrong.

These two cases exhaust H's possible answers. Therefore the assumed universal acceptance decider cannot exist. The contradiction is not “D loops somehow.” D was defined to halt using H; it is the correctness of H that becomes impossible.

## Recognition still exists

A universal simulator can recognize A_TM: decode M and w, simulate M on w, and accept if M accepts. If M rejects, reject; if M loops, the simulation may loop. This satisfies recognition but not decision. Undecidable does not mean no useful yes-verifier or simulator exists.

## Why complements expose the missing guarantee

The complement of a language contains exactly the input strings outside it, within the fixed encoding universe. If both L and its complement have recognizers, run the two recognizers in alternating steps on the same input. Exactly one side contains that input, so its recognizer eventually accepts. If L's recognizer accepts, answer yes; if the complement's accepts, answer no. This always terminates and decides L.

For A_TM, a recognizer exists but a decider does not. Therefore its complement cannot also be recognizable. This is a logical consequence of the parallel-recognizer construction.

Why not simply swap accept and reject in an A_TM recognizer? Because loops remain loops. A no-instance that used to loop doesn't become an accepted complement member. Swapping halting verdicts works for deciders, which have no third outcome to worry about.

**Keep:** self-reference creates a specific forced disagreement; recognizers may leave no-instances unanswered; two complementary recognizers together would settle every input.

**One connected check:** Which line of the contradiction would fail if H were merely a recognizer instead of a decider?
