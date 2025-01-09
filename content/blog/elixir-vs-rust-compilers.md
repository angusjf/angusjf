---
{
  "title": "Rust Compiler Speed Case Study",
  "img_url": "/images/rust-vs-elixir.webp",
  "img_alt": "Bar chart showing speeds of the rust and elixir compilers",
  "date": "2023-03-01",
  "seo_description": "A comparison of the Elixir and Rust compilers.",
  "summary": "A comparison of the Elixir and Rust compilers",
  "tags": [ "rust", "elixir" ],
  "hidden": false
}
---

# Rust Compiler Speed: A Real World Case Study

## Motivations

One of the most common sentiments I’ll hear from Rust skeptics is that the compiler is slow. This is a hard claim to argue against without data – and the data is not easy to find. Of course, slowness is relative, and should be considered as the cost you pay for the service the compiler provides. Rust is a strongly typed language, compiling to a binary, with a borrow checker. Taking these features into account, compilation time would be more sensibly compared to a language like C or Haskell, and even then it hardly seems fair. Regardless, in this article I will compare Rust’s compiler to that of Elixir - a dynamically typed language that compiles to the Erlang Virtual Machine. As a result, this should not be read as an attempt to pit the two languages against each other, rather you should read the Elixir benchmarks as a point of reference to help you make sense of the data.

## Case Study

At Prima, we have created two web services, both of a similar size, both GraphQL backends: one written for the Spanish market (in Rust) and the other for the British market (in Elixir). How comparable they are is hard to tell, but a naïve metric (and the one I will use) is number of lines of code, excluding test files as they are not compiled in this experiment.

![Lines of code](/images/elixir-vs-rust/lines-of-code.png)

The service written in Rust has about 15% more code in it than the Elixir service. Note that this is not a good measurement of ‘how much code it takes to build a service’ in either language, as both services have different requirements and dependencies.

## Methodology

I ran all the following experiments on both a Linode 8GB RAM / 4 CPU and a 4GB RAM / 2 CPU machine, simply using the `time` UNIX tool (and recording the reported `real` time). I repeated all the experiments 3 times and took the median result.

I initially performed these tests on my personal laptop, which has an M1 Pro processor, which resulted in more favourable results for Rust. I think this was for two reasons: Firstly, the Rust compiler was running on the M1 natively, while the Elixir compiler was emulated via QEMU. Secondly, the M1 has 8 cores, and I found the Rust compiler’s performance to scale slightly better with the number of cores than that of the Elixir compiler.

Note that I am compiling with both optimisation level 0 and 1 for Rust, as it is hard to compare the optimisations performed by the Rust and Elixir compilers.

## Compile ‘From Scratch’

Below are the results of a ‘from scratch recompile’, by which I mean I compiled all the dependencies as well as the ‘application source’ itself. 

```bash
# elixir service (recompiling all libraries)
mix clean --deps
mix compile

# rust service (recompiling all libraries)
cargo clean
cargo build
```

![Time to compile from scratch](/images/elixir-vs-rust/from-scratch.png)

We see here that on a 4 core machine Elixir and Rust are fairly comparable.

## Recompile Project Source Only

Below are the results from recompiling just the application code, which I achieved in cargo but cleaning only the packages in the src folder.

```bash
# elixir service (excluding libraries)
mix clean
mix compile

# rust service (excluding libraries)
ls src | xargs -I % cargo clean -p %
cargo build
```

![Recompiling the project source](/images/elixir-vs-rust/project-source.png)

Elixir wins this one by a huge margin.

## Recompiling After Editing A Single File

For this test (which, it must be said, is the least scientific of them all), I modified a single file and recompiled both the projects. For each service, I chose a selection of files that looked highly-depended-on configuration files and chose the one with the worst results.

```bash
# elixir service (single file)
vim apps/core/config/config.exs
mix compile

# rust service (single file)
vim src/config/src/lib.rs
cargo build
```

![Recompiling a highly coupled file](/images/elixir-vs-rust/highly-coupled.png)

When compared to the previous set of results, these numbers are really compelling. The Elixir compiler takes about the same amount of time to recompile after one file change (when the file has a lot of dependants) as it does to recompile the whole project source. In contrast, the Rust compiler (when run without optimisations) seems to be able to make intelligent time savings in situations like this.

Below, I’ve repeated the experiment for a file that was not as tightly coupled to the rest of the project:

![Recompiling an uncoupled file](/images/elixir-vs-rust/uncoupled.png)

As you can see, the times are much faster, but Elixir performs even better here.

## Running the Formatter

Just for fun, I’ve run the formatter on both projects. Pretty unsurprising but narrow lead for Rust here. 

```bash
# elixir service
mix format

# rust service
cargo fmt
```

![Fomatting the whole project](/images/elixir-vs-rust/formatter.png)

## Conclusions

Most of my personal frustrations with compile times are due to their impact on local development, adding friction to the development cycle. For this reason, I think it’s appropriate to look at the compiler’s performance (without optimisation) after editing a single file, which is the way I would expect developers to work with the compiler most of the time.

It’s impressive to see the Rust compiler remain competitive with the Elixir compiler while providing plenty of extra functionality, and I hope these results are enough to quell any concerns about Rust’s compile times when used for a larger scale project.
