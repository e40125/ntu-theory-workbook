# Pumping lemma: finite memory eventually repeats itself

## The question: when is a finite number of states not enough?

A DFA can remember parity with two states. Could it remember the exact number of leading zeros so it can demand that many ones afterward? For \(\{0^n1^n:n\ge0\}\), the number may be arbitrarily large. “It needs to count” is a useful suspicion, but not yet a proof: plenty of counting tasks only need a remainder. We need a consequence that **every** DFA must obey.

Suppose a DFA has p states. Read p symbols. The computation has visited p+1 state positions: the initial state plus one after each symbol. With only p different states, some state was visited twice. That's the pigeonhole principle: more visits than available distinct places forces a repeat.

## A repeat turns a path into a reusable loop

Split the input into three consecutive pieces. x gets us to the repeated state the first time. y takes us around the loop back to that same state. z finishes the original accepting journey.

Because the state after y is exactly the state before y, the rest of the machine cannot tell whether we took that loop zero times, once, twice, or a hundred times. Following z afterward still reaches accept. The DFA has no secret memory outside its current state. That's the whole damn mechanism.

The notation \(xy^iz\) means x, then i copies of y, then z. With i=0, y disappears; with i=1, it is the original string; with i=2, y is duplicated. We are editing a **substring**, not moving letters around.

## Decode the theorem in its actual order

If L is regular, there exists a pumping length p such that every s in L with length at least p can be split as s=xyz satisfying:

1. \(|y|>0\): the loop consumes at least one symbol.
2. \(|xy|\le p\): the loop fits within the first p symbols.
3. \(xy^iz\in L\) for every integer i≥0: every repetition count still works.

\(|y|\) is the number of symbols in y. \(\in\) means “is a member of.” The theorem promises **at least one** suitable split, not every split. p belongs to the assumed machine; we don't get to declare p=3 because that makes an example convenient.

## Why this helps prove impossibility

To show a language is not regular, assume a DFA exists and receive its unknown p. Choose a legal long string. Then show that **no allowed split** can keep all repetitions in the language. That contradicts the required loop property.

Be careful with the deck's counting examples. Equal numbers of `0` and `1` is not the same requirement as equal numbers of adjacent `01` and `10`. The latter can be tracked using boundary information: in a binary string, changes from 0 to 1 and back alternate. Similar-looking counts can need radically different memory.

**Keep:** pumping is a necessary consequence of finite state memory. It is a tool for ruling regularity out, not a general way to establish regularity. Next we turn the mechanism into a complete quantified proof.

**One connected check:** Why does returning to the same state matter more than merely reading the same symbol twice?
