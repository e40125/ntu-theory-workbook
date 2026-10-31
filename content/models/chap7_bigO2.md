# Little o and algorithm cost: distinguish smaller growth from the same scale

## “At most a constant multiple” versus “eventually a tiny fraction”

Big O allows comparable growth: 6n³ is O(n³). Little o is stronger. \(f(n)=o(g(n))\) means that for **every** positive constant c, f(n)≤c g(n) eventually. The threshold may depend on c. When the ratio is defined appropriately, this is equivalent to f(n)/g(n)→0.

For √n versus n, the ratio is 1/√n, which tends to zero. Thus √n=o(n). For 6n³ versus n³, the ratio is always 6, so it is not little o. It cannot eventually fit below 0.01 times n³. The difference is the order of the quantifiers: some fixed multiplier versus every arbitrarily small multiplier.

## Return to a familiar language and count actual work

To decide \(\{0^k1^k:k\ge0\}\) on a single tape, first check block order. A straightforward machine crosses off one zero and one one per round, repeatedly traveling across a region of length O(n). There are O(n) rounds, so the time is O(n²).

The reason isn't just “two loops.” It is the combination of how many obligations are discharged per round and how far the head travels to discharge them. Tape movement is part of the cost.

## Why repeated halving can improve the bound

Instead of matching one pair at a time, compare the parity of the two remaining counts, then retain roughly half of each for another round. Equal counts have equal low-order binary bits; after removing that bit by halving, their quotients must still match. If parities differ in some round, reject. Boundary cases with no surviving symbols must be handled explicitly.

The number of rounds is O(log n), since each successful round roughly halves the live populations. But the old crossed-out cells still occupy physical tape positions. A pass may still travel across O(n) cells even when few live symbols remain. Therefore the time is O(n log n), not automatically O(n) from imagining the tape physically shrinks.

That distinction—logical population versus physical span—is exactly the kind of detail that separates a plausible story from a correct time analysis.

## Multiple tapes can change the movement cost

With a second tape, copy the first block and compare it against the second in coordinated scans. Each relevant symbol needs only a constant amount of local work, so a linear-time method is possible on that model. This does not contradict the one-tape analysis: the storage layout and allowed head movements changed.

The language is the same, the yes/no condition is the same, and computability power is the same. The number of physical steps can differ. Complexity claims must name the model under which they are measured.

## How to structure a time proof

Identify the input length n. Divide the algorithm into phases. For each phase, bound the number of repetitions and the cost per repetition, including resets and scans over marked cells. Sum the bounds, then simplify using Big O. If claiming little o, show the ratio or quantify over every positive multiplier; an ordinary upper bound is insufficient.

**Keep:** little o means vanishing relative growth. For algorithms, count physical work, not just useful-looking edits.

**One connected check:** Why can halving the number of live symbols leave the cost of one tape sweep proportional to the original input length?
