export default function(numbers, hits) {
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

    if (
      undefined !==
      range.find((row) => range.every((column) => checked[row * 5 + column]))
    ) {
      isWonCount++
    }
    if (
      undefined !==
      range.find((column) => range.every((row) => checked[row * 5 + column]))
    ) {
      isWonCount++
    }
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