# Introduction

This project evaluates three options for searching a number of strings in a given corpus. The aim is to find out the fastest time to return a search result i.e. found or not found.

- [Introduction](#introduction)
  - [Experiments](#experiments)
  - [Installation](#installation)
  - [Results](#results)
    - [Experiment 1](#experiment-1)
    - [Experiment 2](#experiment-2)
    - [Experiment 3](#experiment-3)
  - [Conclusion](#conclusion)

## Experiments

The three options for searching are as follows:

1. Using [`Set`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) as described in this [SO answer](https://stackoverflow.com/a/63187134/919480). See [`exp1`](exp1/README.md) for more details.
2. Using Bayer Moore algorithm as described in the article [The algorithm behind Ctrl + F](https://dev.to/akhilpokle/the-algorithm-behind-ctrl-f-3hgh). See [`exp2`](exp2/README.md) for more details.
3. Using [`Tries`](https://github.com/NaturalNode/natural#tries) in the `npm` module `natural`. See [`exp3`](exp3/README.md) for more details.

For all of these experiments, a [`lorem ipsum` generator](https://www.lipsum.com/) was used to create the `data/haystack.txt` file.

## Installation

To launch the experiments, clone this project with `git clone https://github.com/chainhead/search-test.git` and run the following commands to set-up the project.

```bash
cd search-test
cd exp1/js
npm i
cd exp2/js
npm i
cd exp3/js
npm i
```

## Results

Run the following commands after installation.

```bash
/bin/bash scripts/expt.sh
```

The following results are seen.

### Experiment 1

| Exp # | # keywords | # iterations | Mean (ms) | Min (ms) | Max (ms) |
| :---: | ---------: | -----------: | --------: | -------: | -------: |
|   1   |          5 |          100 |    0.0064 |    0.003 |    0.259 |
|   1   |         10 |          100 |    0.0062 |    0.003 |    0.245 |
|   1   |         50 |          100 |   0.01934 |    0.007 |    0.394 |
|   1   |        100 |          100 |   0.01715 |    0.012 |    0.257 |

### Experiment 2

| Exp # | # keywords | # iterations | Mean (ms) | Min (ms) | Max (ms) |
| :---: | ---------: | -----------: | --------: | -------: | -------: |
|   2   |          5 |          100 |   26.3577 |   24.986 |   62.912 |
|   2   |         10 |          100 |    84.889 |   83.355 |  126.031 |
|   2   |         50 |          100 |   267.448 |  252.889 |  367.714 |
|   2   |        100 |          100 |   580.853 |  534.779 |  774.368 |

### Experiment 3

| Exp # | # keywords | # iterations | Mean (ms) | Min (ms) | Max (ms) |
| :---: | ---------: | -----------: | --------: | -------: | -------: |
|   3   |          5 |          100 |   0.01216 |    0.006 |    0.494 |
|   3   |         10 |          100 |   0.01243 |    0.005 |    0.473 |
|   3   |         50 |          100 |   0.03082 |    0.021 |    0.543 |
|   3   |        100 |          100 |   0.02438 |    0.007 |    0.363 |

## Conclusion

**Clearly, Experiment 1, with `Set`s is the fastest.** However, a trade-off in speed can be made with the `natural` module given that, `natural` is meant for text processing.
