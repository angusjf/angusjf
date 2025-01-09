---
{
  "title": "Simple Haskell Memoization",
  "img_url": "/images/fib100.png",
  "img_alt": "Generating the 100th fibonacci number",
  "date": "2023-12-12",
  "seo_description": "Python @functools.cache style Memoization in Haskell",
  "summary": "<code>@functools.cache</code>-style Memoization in Haskell",
  "tags": [ "code", "functional programming" ],
  "hidden": false
}
---

# `@functools.cache`-style Memoization in Haskell

If you've ever attempted [Advent of Code](https://adventofcode.com/) in Haskell, you have probably had to memoize a function to complete a challenge. Looking though submissions, you'll find yourself seething with jealousy at how Python users can simply add the `@functools.cache` decorator to their functions to magically memoize them.

A similar level of magic (though admittedly not quite as ergonomic) can be achived in Haskell, without any external libraries, just the builtin `Data.Map` `Control.Monad.State`.

_Note: This is not the most efficient memoization possible, just 'good enough' to solve AOC problems._

The first step is to ensure your function is _unary_, meaning it takes only one argument. If it takes more than one, for example:

```haskell
f :: Int -> Int -> Int
```

Pass them in as a tuple:

```haskell
f :: (Int, Int) -> Int
```

The argument to the function will be stored in the map as the key.

Next, define these two functions:

_(I've used the type variables `x` & `y` to represent the input and output of the function f :: x -> y respectively)_

```haskell
import qualified Data.Map as M
import Control.Monad.State

memoized :: Ord x => (x -> State (M.Map x y) y) -> x -> State (M.Map x y) y
memoized f x = do
    cache <- get                     -- get the 'cache' from the state monad
    case M.lookup x cache of         -- check if the key `x` exists in the cache
        Just hit -> return hit       -- if it exists, return it
        Nothing -> do
            res <- f x               -- else, call f(x)
            modify (M.insert x res)  -- set cache[x] = f(x)
            return res               -- return f(x)

runMemoized :: (x -> State (M.Map x y) y) -> x -> y
runMemoized f x = evalState (f x) M.empty
```

Now, you must replace all recursive calls to the function you wish to memoize.

For example, given a function `f`:

```haskell
f :: Int -> Int
f 0 = 1
f 1 = 1
f x = f (x - 1) + f (x - 2)
```

Convert all the base cases to `return` the value, and replace recusive calls to `f` with `memoized f`.

```haskell
-- (M.Map Int Int) is the type of our cache
f :: Int -> State (M.Map Int Int) Int
f 0 = return 1
f 1 = return 1
f x =
  do
    a <- memoized f (x - 1)
    b <- memoized f (x - 2)
    return (a + b)
```

Now, to run the function call:

```haskell
ghci> runMemoized f 100
1298777728820984005
```

Happy memoizing!
