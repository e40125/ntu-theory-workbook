# The acceptance contradiction: build a program that flips its own predicted answer

## Assume the impossible helper precisely

Suppose a decider H answers whether any encoded machine M accepts any input w. H always halts. On a yes-instance it says yes; on a no-instance it says no. “No” includes both M rejecting and M looping forever. H would have to settle both cases correctly.

We are assuming this helper exists to derive a contradiction. We are not claiming we can already implement it, and we are not waiting for a looping machine to finish.

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
