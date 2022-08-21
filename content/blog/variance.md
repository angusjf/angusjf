---
title: "Fixing Dan and Aydın's Pyright Error"
img_url: images/pyright.webp
img_alt: The Pyright Logo on Fire
date: "2022-08-04"
seo_description: "How learning about Variance helped me fix a Pyright error."
summary: "How learning about Variance helped me fix a Pyright error."
tags: ["rust", "variance", "java", "javascript", "typescript"]
hidden: false
---

![Pyright](/images/pyright.webp)

# Fixing Dan and Aydın's Pyright Error

_Note: If you've never heard of Pylance/Pyright don't worry, it's just the TypeScript-ification of Python._
_If that doesn't mean anything to you, this might not be the blog post for you._

## Backstory

A few months ago, my friends Dan and Aydın showed me this strange bug in the project they were working on.

They were using Python with type annotations and Microsoft's Pylance/Pyright type checker - here's (roughly) the problematic snippet:

```python
def send(data: Dict[str, str | None]):
    # ...
    
person: Dict[str, str] = { "name": "Guido", "dob": "1956-01-31" }

send(person)
```

When they ran the type checker on this code, they were presented with the following error:

```python
error: Argument of type "dict[str, str]" cannot be assigned to
parameter "data" of type "Dict[str, str | None]" in function "send"
  TypeVar "_VT@dict" is invariant
    Type "str" cannot be assigned to type "str | None"
      Type cannot be assigned to type "None" (reportGeneralTypeIssues)
```

This is the compiler's way of saying *__"you can't pass a value of type `Dict[str, str]` into a function that expects `Dict[str, str | None]`"__*

This seems wrong - surely any function that can handle a `Dict[str, str | None]` can handle a `Dict[str, str]` - in fact, a `Dict[str, str]` *is* a `Dict[str, str | None]`!

Sure enough, we can check that a `str` is a `str | None`:

```python
name1: str = "Guido"
name2: str | None = name1
```

Pyright has no problems at all with this code.

Surely (to be overly mathematical) if _`x` is a subtype of `y`_ then  _`Dict[a, x]` is a subtype of `Dict[a, y]`_.

Very puzzling...

## Rust for Rustaceans

Crushingly, I could never fix Dan and Aydın's type error. I just shrugged and said Microsoft probably never bothered to implement that rule for `Dict`s.

Then, three months later, I was reading (the fantastic) _Rust for Rustaceans_ (a book about the Rust programming language). It introduced me to the concept of **Variance**, an idea I'd never heard of before.

_(Maybe if I read the full Pyright error the first time I'd've noticed the "`TypeVar "_VT@dict" is invariant`" warning but alas)._

It turns out **Variance** was the culprit all along - but first, let me introduce it with a tour of some popular programming languages.

## Insanely Liberal Variance in TypeScript

TypeScript has never sold itself as a fully type-safe solution, more of a glorified linter.
It helps you catch **some** errors before you see them at runtime.

_Consider the following (valid & compilable) TypeScript program._"

```ts
type Status = "OK" | "PENDING" | "INVALID"

type ValidStatus = "OK" | "PENDING"

const orders: ValidStatus[] = ["OK", "OK", "PENDING"]

const add = (orders: Status[]) => {
    orders.push("INVALID");
}

add(orders)
```

Now orders has an invalid order in it - but it's type (`ValidStatus[]`) would tell you that's impossible!

The issue here is that we are *mutating the list* inside the add function.

If we treat `orders` as a `Status[]` in one place, and refer to it as a `ValidStatus[]` in another, we can cause all kinds of problems.

This can be avoided with the following, **immutable** version of the `add` function:

```ts
// ...

const add = (orders: readonly Status[]): readonly Status[] => {
    return [ ...orders,  "INVALID" ];
}

orders = add(orders)
```

However:
- It's not idiomatic JavaScript
- It's far less efficient than using `push`

It's easy to get caught up evangelising immutable JavaScript as the solutions to these kinds of problems,
but the performance impact can't be understated [(see here for an example)](/js-spread-operator).

## Tyrannical Variance Rules in Java

Java's type system is stronger than TypeScript's, so let's recreate a similar example and see how it fares:

We can defined the ValidStatus __*is-a*__ Status relation:
```java
class Status {}

class ValidStatus extends Status {}
```

```java
void add(List<Status> orders) {
    // ...
}

List<ValidStatus> orders;
    
add(orders);
```

Java gives the following error:

```java
error: incompatible types: List<ValidStatus> cannot be converted to List<Status>
```

Pretty harsh! Java won't let us pass a `List<ValidStatus>` into a `List<Status>` function, for fear we may mutate it.

I suppose that's one way of solving the problem?

## Finally, Understanding Variance in Pyright

With all of this context, let's look back at our original problem:

```python
def send(data: Dict[str, str | None]):
    # ...
    
person: Dict[str, str] = { "name": "Guido", "dob": "1956-01-31" }

send(person)
```

I finally see why Pyright is worried about this code.

How does it know we're not going to change the `_person_` dictionary inside the `_send_` function?

We can't fault Pyright here, it's being as strict as it should be.
But still, the type checker is holding us back. Maybe type systems are rubbish after all?

## Rust Lets Me Down

Despite **Rust**'s role in helping me understand this concept, it takes a Java-eqsue approach to subtyping inside lists.

I was gutted to discover this - I felt Rust had all the right pieces to handle this perfectly but fall at the final hurdle.

It even differentiates between mutable and immutable references in the type system, so it could easily allow subtyping `T` in `&dyn Vec<T>` and forbid it for `&dyn mut Vec<T>`.

As described in the [Rustomicron](https://doc.rust-lang.org/nomicon/subtyping.html#variance), it's actually Rust's choice to abstain from object-orientation that makes this impossible. `&dyn T` isn't really a subtype of `&dyn U`, it's more "castable" to it.

_(I still don't really see why we can't just cast Functors in the same way, if anyone does please let me know)_

## Scala Saves the Day

If you're anything like me, at this stage you might be thinking, _"Does **any** semi-popular modern programming language have robust variance rules?"_

Scala does!

Scala is basically just a "funtional Java", and so it has first class support for both immutable data structures and subtyping.

This makes it perfect for our variance problem!

In Scala there are lots of different types of list, two examples are the immutable `List` and it's mutable brother `ListBuffer`.

Again we define the `ValidStatus` __*is-a*__ `Status` relation:

```scala
class Status {}

class ValidStatus extends Status {}
```

So `List` lets us do this:

```scala
def add(orders: List[Status]) {
    // we can't change list here, just look at it
}

val orders = List[ValidStatus]()
add(orders)
```

While trying the same thing with `ListBuffer`...

```java
def add(orders: ListBuffer[Status]) {
    // we can change orders here!
    orders += new Status()
}

val orders = ListBuffer[ValidStatus]()
add(orders)
```
Gives us the following error:
```java
error: type mismatch;
 found   : scala.collection.mutable.ListBuffer[ValidStatus]
 required: scala.collection.mutable.ListBuffer[Status]
Note: ValidStatus <: Status, but class ListBuffer is invariant in type A.
```

It even describes ListBuffer as `invariant`, making Scala the winner in today's arbitrary programming language contest.

Thanks for reading!
