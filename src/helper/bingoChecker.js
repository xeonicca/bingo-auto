// from https://codesandbox.io/s/rw997woz24?file=/src/index.js
export default function (numbers, hits) {
  let checked = numbers.reduce((all, v, i) => {
    if (hits.indexOf(Number(v)) !== -1) {
      all[i] = true
    } else {
      all[i] = false
    }

    return all
  }, {})

  const isWon = (checked) => {
    const range = [0, 1, 2, 3, 4]
    let isWonCount = 0

    isWonCount += range.reduce(
      (all, row) =>
        (all += range.every((all, column) => checked[row * 5 + column])
          ? 1
          : 0),
      0
    )

    isWonCount += range.reduce(
      (all, column) =>
        (all += range.every((all, row) => checked[row * 5 + column])
          ? 1
          : 0),
      0
    )

    if (range.every((index) => checked[index * 5 + index])) {
      isWonCount++
    }
    if (range.every((index) => checked[index * 5 + 4 - index])) {
      isWonCount++
    }

    return isWonCount
  }

  return isWon(checked)
}
