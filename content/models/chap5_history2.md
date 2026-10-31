# Histories in reductions: finite checks can encode an unbounded existence question

## The apparent paradox

LBA membership is decidable: for one supplied input, search a finite configuration graph. Yet LBA emptiness is undecidable: there is no general algorithm deciding whether it accepts any input. The difference is the quantifier. “Check this candidate” does not give a finite stopping rule for “no candidate of any length works.”

Given ⟨M,w⟩, construct an LBA B whose input is a **claimed accepting computation history of M on w**. B checks its formatting, correct start, legal adjacent steps, and accepting final configuration. It uses the candidate's own length as bounded workspace. It does not simulate M forever hoping that a history eventually appears.

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
