const fs = require('fs')

const natural = require('natural')

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

function getHaystackTokens(filePath) {
  let data = fs.readFileSync(filePath, 'utf-8')
  const tokenizer = new natural.WordTokenizer();
  return tokenizer.tokenize(data)
}

function startExpt(options) {
  const tokensSet = new Set(options.tokens)
  const kwSet = new Set(options.kw)

  let found
  
  for (i = 0; i < options.numIter; i++) {
    console.time(i)
    for (const k of kwSet) {
      found = tokensSet.has(k)
    }
    console.timeEnd(i)
  }
}

function main(args) {
  if (argsCheck(args)) {
    if (fileCheck(args[2])) {
      let tokens = getHaystackTokens(args[2]);
      let kw = getKeywords(tokens, args[3])

      startExpt({
        tokens: tokens,
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
