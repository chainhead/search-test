
function bayerMooreSearch(pattern, haystack, map) {
  let M = pattern.length;
  let N = haystack.length;
  let skip;
  let res = [];

  for (let j = 0; j < M; j++) {
    map[pattern[j]] = j;
  }

  for (let i = 0; i <= N - M; i += skip) {
    skip = 0;
    for (let j = M - 1; j >= 0; j--) {
      if (pattern[j] != haystack[i + j]) {
        skip = Math.max(1, j - map[haystack[i + j].charCodeAt(0)])
        break;
      }
    }
    if (skip == 0) {
      res.push(i);
      skip++;
    }
  }

  return res
}

module.exports = {
  bayerMooreSearch: bayerMooreSearch
}
