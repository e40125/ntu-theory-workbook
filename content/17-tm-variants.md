Changing the machine model changes how we organize the work. We will show how the extra convenience can be encoded back into ordinary tape operations.

Different machine models can look wildly different and still recognize exactly the same languages. “Equivalent” concerns **what can be computed**, not whether the diagrams, running time, or number of states are identical.

## Two tapes: one simultaneous move

A k-tape transition reads k symbols, writes k symbols, and moves k heads, while changing one shared control state. For two tapes,

\[\delta(q,a,b)=(r,c,d,R,L)\]

reads a on tape 1 and b on tape 2, writes c,d respectively, moves head 1 right and head 2 left, and enters r. Do not run the tape-1 line as one machine step and the tape-2 line as another. They are one joint instruction.

The course allows a stay move S for multitape machines. The input starts on tape 1; all other tapes are blank. Any extra left marker you want must be a permitted symbol, and its initialization must be part of the construction.

## A concrete copy routine

Suppose the tape alphabet permits a marker $. First write $ at the beginning of tape 2 and move its head right, leaving tape 1 at the first input character. For each a∈{0,1}, read a on tape 1 and blank on tape 2; write a on tape 2 and move both heads right. At tape-1 blank, the copy is complete. Move tape-2 head left over copied symbols until $, then right. Now tape 2 is positioned at the copy's first symbol.

This illustrates initialization, simultaneous updates, and boundary detection. It is not a substitute for a past question that restricts Γ={0,1,#,⊔} and forbids $. Under such a restriction you must use the permitted marking strategy or boundary behavior.

## Simulating many tapes with one

Encode each tape's used region as a block separated by #. Mark the scanned cell in each block using a dotted version of its symbol. A one-tape simulator scans the blocks to learn the k scanned symbols, remembers that finite tuple in its control, then scans again to perform the prescribed writes and move the marks. If a simulated head needs a fresh cell, insert a blank in that block and shift later material right.

For fixed k and finite Γ, the tuple of scanned symbols has finitely many possibilities, so finite control can remember it. Each simulated step takes finitely many scans. This proves simulation of arbitrary computations, not just a sample trace. The reverse direction is immediate: a one-tape machine is a special case of a multitape machine.

A stay move can also be simulated: write the requested symbol, move right into an intermediate state, then move left while preserving that next cell. Choosing right then left avoids problems at the left boundary.

## Nondeterministic TM: why breadth-first matters

An NTM accepts if at least one branch accepts. A depth-first simulator may follow one infinite branch forever while another branch accepts after five steps. So enumerate the tree fairly, by depth: all paths of length 0, then 1, then 2, and so on. Each layer is finite because each configuration has finitely many next moves.

If an accepting branch exists, it has a finite length d, and the breadth-first simulator eventually visits it. Thus a deterministic TM can recognize the same language. This is **not** NFA subset construction into finitely many control states; TM configurations include arbitrarily long tape contents.

If every branch halts on every input, finite branching implies the computation tree for a fixed input is finite (the relevant consequence of König's lemma). Then exhaustive breadth-first simulation can also reject after all branches finish. This establishes equivalence for deciders too. “Every branch is finite” alone would not imply a finite tree if infinite branching were allowed; finite branching is essential.

## Fresh practice

An NTM's left branch loops forever; its right branch accepts after three steps. Describe what a depth-first simulator and a breadth-first simulator might do, and whether the NTM accepts.

<details class="solution"><summary>Show the answer</summary><p>The NTM accepts because its right branch accepts. A depth-first simulator choosing the left branch first can loop forever and never discover this. Breadth-first explores all finite depths fairly, so it eventually reaches the right branch's accepting configuration at depth three. This explains recognizer equivalence; it does not make the original NTM a decider, because one branch fails to halt.</p></details>
