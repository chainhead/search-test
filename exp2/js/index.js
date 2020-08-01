const fs = require('fs')

const _ = require('lodash')
const natural = require('natural')

const bm = require('./bm')

function argsCheck(args) {
  let a = args.slice(2)
  if (a.length < 3) {
    console.log(`Insufficient arguments. ${a.length}`)
    return false
  } else {
    if (isNaN(a[1]) || isNaN(a[2])) {
      console.log(`Non-numeric values. ${a[1]} ${a[2]}`)
      return false
    } else {
      return true
    }
  }
}

function fileCheck(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist. ${filePath}`)
    return false
  } else {
    return true
  }
}

function getKeywords(tokens, count) {
  let kw = []
  let max = tokens.length
  let min = 0

  let idx = []
  for (j = 0; j < count; j++) {
    idx.push(Math.round(Math.random() * (max - min) + min))
  }
  
  for (k = 0; k < count; k++) {
    kw.push(tokens[idx[k]])
  }

  return kw
}

function getHaystack(filePath) {
  let data = fs.readFileSync(filePath, 'utf-8')
  return data
}

function getHaystackTokens(filePath) {
  let data = fs.readFileSync(filePath, 'utf-8')
  const tokenizer = new natural.WordTokenizer();
  return tokenizer.tokenize(data)
}

function startExpt(options) {
  let found

  let map = new Array(256);
  for (let c = 0; c < 256; c++) {
    map[c] = -1;
  }

  for (i = 0; i < options.numIter; i++) {
    console.time(i)
    _.forEach(options.kw, (k) => {
      found = bm.bayerMooreSearch(k, options.haystack, map)
    })
    console.timeEnd(i)
  }
}

function main(args) {
  if (argsCheck(args)) {
    if (fileCheck(args[2])) {
      let haystack = getHaystack(args[2])
      let tokens = getHaystackTokens(args[2]);
      let kw = getKeywords(tokens, args[3])

      startExpt({
        haystack: haystack,
        kw: kw,
        numIter: args[4]
      })
    } else {
      process.exit(1)
    }
  } else {
    process.exit(1)
  }
}

main(process.argv)
