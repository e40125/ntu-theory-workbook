# Little o and algorithm cost: distinguish smaller growth from the same scale

## “At most a constant multiple” versus “eventually a tiny fraction”

Big O allows comparable growth: 6n³ is O(n³). Little o is stronger. \(f(n)=o(g(n))\) means that for **every** positive constant c, f(n)≤c g(n) eventually. The threshold may depend on c. When the ratio is defined appropriately, this is equivalent to f(n)/g(n)→0.

For √n versus n, the ratio is 1/√n, which tends to zero. Thus √n=o(n). For 6n³ versus n³, the ratio is always 6, so it is not little o. It cannot eventually fit below 0.01 times n³. The difference is the order of the quantifiers: some fixed multiplier versus every arbitrarily small multiplier.

Throwing half the live items away sounds cheap until you notice they still occupy crossed-out tape cells. Your head keeps walking over them. Count rounds and price each real scan separately. If you charge only for the remaining live symbols, you are giving the machine a shortcut it does not have.

## Round 1 — Little-o means the ratio actually dies away · pages 1–4

Big-O permits some fixed multiplier c. Little-o must eventually fit beneath **every** positive multiplier, however tiny. Formally f=o(g) means f(n)/g(n)→0, assuming g is eventually positive and the relevant functions are nonnegative.

For √n versus n, the ratio is 1/√n. Given any c>0, choose n₀>1/c²; afterward the ratio is below c. For n versus n, the ratio is always 1, so choosing c=1/2 defeats little-o. Thus n=O(n) but n≠o(n). “Smaller” means asymptotically negligible relative to g, not merely f(n)<g(n) for some inputs.

The threshold may depend on c. That is what ∀c∃n₀ allows. One threshold that works for all positive c simultaneously would be a much stronger and generally wrong requirement.

## Round 2 — Count the scans, including returns · pages 5–7

For the basic 0ᵏ1ᵏ algorithm on total input length n, format checking and returning left each cost O(n). Each round matches one zero and one one and may scan O(n) cells. At most n/2 matching rounds yield O(n²), plus linear final checking. This proves an upper bound for this algorithm, not a lower bound for all algorithms.

TIME(t(n)) is the family of languages decided by some deterministic TM in O(t(n)) time under the stated model. A language may belong to several nested TIME classes. Giving a faster algorithm improves the known upper bound; it does not erase the existence of the slower one.

## Round 3 — Halve the two counts while checking the discarded bits · pages 8–11

After validating 0*1*, repeatedly compare the parity of the live zero count and live one count, then replace each by its floor-half by crossing off alternating symbols in each block. Equal parities are equivalent to an even total count. If parities differ, reject. If both counts reach zero, accept.

Why does this detect inequality? For counts a,b, matching parity says their lowest binary digits agree. Floor-halving discards that digit. Repeating compares every remaining binary digit. If a=b, every comparison agrees; if a≠b, some digit eventually differs. This supplies the reasoning behind the slide's repeated even-total check.

For counts 5,5: 5,5→2,2→1,1→0,0, accept. For 4,2: both initially even, but halving gives 2,1; total is odd, reject. Checking parity only once would miss this case.

There are O(log n) rounds because the live counts halve. Each sweep still crosses a physical region of length O(n): crossed-out symbols occupy cells. Therefore total time is O(n log n), not a geometric-sum O(n). Physically compacting the surviving symbols has a cost too; a naive one-tape repeated-copy procedure can be quadratic. Don't price an expensive rearrangement at zero.

The source cites a lower-bound theorem: a language decided in o(n log n) on this deterministic one-tape model is regular. Since equal blocks are not regular, that rules out such a faster bound here. The theorem itself is not proved in the deck; its model assumptions matter.

## Round 4 — Two tapes change the movement cost · page 12

Copy zeros onto tape 2 while scanning the initial zero block. Then match each one against one stored zero, moving the heads locally. Reject extra ones or leftover zeros; reject bad block order. Only a fixed number of linear passes is needed, so time is O(n). Same decidable language, different machine model, different efficient implementation. Computational power and runtime are separate comparisons.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

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
