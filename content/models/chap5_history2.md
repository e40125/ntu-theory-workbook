# Histories in reductions: finite checks can encode an unbounded existence question

## The apparent paradox

LBA membership is decidable: for one supplied input, search a finite configuration graph. Yet LBA emptiness is undecidable: there is no general algorithm deciding whether it accepts any input. The difference is the quantifier. “Check this candidate” does not give a finite stopping rule for “no candidate of any length works.”

Given ⟨M,w⟩, construct an LBA B whose input is a **claimed accepting computation history of M on w**. B checks its formatting, correct start, legal adjacent steps, and accepting final configuration. It uses the candidate's own length as bounded workspace. It does not simulate M forever hoping that a history eventually appears.

The checker receives the entire proposed history as its input. That long receipt supplies the space for its own audit. So a bounded-tape machine can check a huge computation history without simulating that whole computation on the tiny original input. The input changed; that is where the workspace comes from.

## Round 1 — Give the bounded machine a long enough receipt · pages 1–6

Given ⟨M,w⟩, build an LBA B that accepts exactly encoded accepting histories of M on w. Its input x is a proposed history, not the original w. x may be enormously longer than w, and B's available workspace scales with |x|. That resolves the apparent contradiction: B does not simulate an arbitrary unbounded computation using only |w| cells; it audits a history already supplied as input.

The history format is #C₁#C₂#…#Cℓ#. Validate separators, configuration syntax, exactly one state/head marker per configuration, the correct initial configuration for w, an accepting last configuration, and every adjacent transition. Neighboring configurations agree away from the old/new head neighborhood; a legal TM step changes only the scanned symbol, state and head position. Marking and zigzag comparison can check those local conditions inside a linear-sized work representation.

If extra constant-factor workspace is convenient, use fixed tracks or a padded input convention as the slide suggests. The encoding must be specified consistently. It cannot quietly demand an input-dependent superlinear amount of new tape while still claiming an LBA.

If M accepts w, at least one finite accepting history exists, so L(B) is nonempty. If M does not accept w, including looping, no such history exists and L(B)=∅. A hypothetical E_LBA decider would answer emptiness, and flipping its answer would decide A_TM. The finite construction of B hardcodes M and w; it does not first wait for the history to exist.

## Round 2 — For CFG universality, accept every bad receipt · pages 7–10

ALL_CFG asks whether L(G)=Σ*. The reduction wants G to generate every string **except** valid accepting histories of M on w, using a carefully chosen history encoding. If M never accepts, no excluded history exists and G generates everything. If M accepts, at least one history is excluded and the grammar is not universal.

A history is valid when its format is correct AND its start is correct AND its end accepts AND every neighboring pair is legal. Negating that conjunction gives an OR: malformed format, wrong start, wrong end, or at least one invalid adjacent step. This is De Morgan's law. The “at least one” is what makes a nondeterministic witness-of-error checker useful.

An error detector can choose which defect to demonstrate. If one actual defect exists, a branch can find it. On a completely valid history, no branch may falsely claim a defect. This is existential acceptance applied to **invalidity**, not a magical PDA that verifies an arbitrary full TM computation.

## Round 3 — Reverse alternating configurations so the stack lines up · pages 11–13

A stack pops its stored block backward. If neighboring configurations were both written left-to-right, pushing the first and popping while reading the second would compare opposite ends. Encode instead

\[\#C_1\#C_2^R\#C_3\#C_4^R\#\cdots.\]

R denotes reversal. For an odd/even neighboring pair, pushing Cᵢ lets the PDA compare with the reversed next configuration from right to left. For an even/odd pair, pushing Cᵢᴿ makes popping present Cᵢ forward, matching the next forward block. Finite control remembers parity and the constant-sized local transition neighborhood.

The PDA guesses an adjacent pair, stores one block, and checks the next for a mismatch outside the permitted local update or an incorrect local update itself. It also checks unequal lengths or boundary conventions consistently with the encoding. The start/end/format error branches need only finite-state checks for the fixed M,w and regular configuration syntax. Converting this PDA to a CFG gives G.

The construction is subtle: it recognizes the **union of error witnesses**. It does not use a false claim that CFLs are closed under complement. The complement-like language is built directly through a PDA capable of finding one defect. A universality decider for that G would then decide the original acceptance question, giving the contradiction.

## Reconnect the pieces in the worked model

Now put the mechanism back together. The worked model below revisits the key example and compresses the reasoning into something you can reconstruct.

## Analyze the two cases

If M accepts w, its finite accepting run can be written as a history. That string passes B's checks, so L(B) is nonempty.

If M does not accept w, no valid accepting history exists. Every candidate fails at least one check, so L(B) is empty.

A decider for LBA emptiness would distinguish these cases and decide A_TM, contradiction. Each individual history check terminates, yet the existence question over histories of unbounded length remains undecidable. No contradiction at all once the two questions are separated.

## Why reversed configurations show up in the CFG argument

For the CFG universality problem \(ALL_{CFG}\), the construction uses a PDA for **bad histories**. A bad history has some defect: malformed syntax, wrong start, wrong finish, or an illegal adjacent step. Nondeterminism can guess a defect to check. Acceptance means at least one real defect is found.

To compare neighboring configurations using a stack, encode alternating configurations in reverse order. Pushing one configuration and reading the reversed next one brings corresponding positions together under last-in-first-out access. Without that reversal, the stack would present the first configuration backward while the next arrived forward, and the local comparison would not line up.

The PDA needs to verify a local illegal transition, including unchanged regions and the small region affected by the head. This is a construction argument; the phrase “just check the pair” stands for specific stack work, not an unlimited random-access comparison.

## Why “bad histories” produces universality

If M never accepts w, every string is either malformed or fails to describe a valid accepting history. The bad-history language is then all strings over the encoding alphabet, Σ*.

If M accepts w, at least one valid accepting history exists. That string has no defect, so it is excluded. The bad-history language is not universal.

Convert the PDA to a CFG. A hypothetical CFG-universality decider would reveal whether M accepts w by checking whether the resulting grammar generates all strings. The construction must include malformed strings among the bad ones; otherwise the no-acceptance case might still omit them and fail to be Σ*.

## How the earlier topics cooperate

The proof uses configurations from TM theory, stack reversal from PDA design, PDA→CFG equivalence, and the two-case structure of reductions. This is why disconnected formula memorization collapses here: the pieces have jobs in one larger argument.

**Keep:** a finite checker can verify candidates while existence over unbounded candidates remains hard. Bad-certificate recognition turns a missing valid history into universality.

**One connected check:** Why must the bad-history PDA accept malformed encodings as well as well-formed histories with an illegal step?
