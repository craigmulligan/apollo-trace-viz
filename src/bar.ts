const { bgWhite } = require('chalk')

export default class Bar {
  constructor({ total }) {
    this.total = total
    this.maxWidth = process.stdout.columns - 30
  }

  draw({ duration, startOffset, path }) {
    const width = duration / this.total
    const offSet = startOffset / this.total

    const fillLength = (width * this.maxWidth).toFixed(0)
    const fillOffset = (offSet * this.maxWidth).toFixed(0)

    const filledBar = this.getBar(fillLength, ' ', bgWhite)

    process.stdout.cursorTo(parseInt(fillOffset))
    process.stdout.write(
      `${filledBar} - ${path.join('.')} - ${this.printDuration(duration)}\n`,
    )
  }

  private printDuration(nanoSeconds) {
    const microSeconds = Math.round(nanoSeconds / 1000)
    if (microSeconds > 1000) {
      const ms = Math.round(microSeconds / 1000)
      return `${ms} ms`
    }
    return `${microSeconds} µs`
  }

  getBar(length, char, color = a => a) {
    let str = ' '
    if (length === 0) {
      str += char
    }
    for (let i = 0; i < length; i++) {
      str += char
    }
    return color(str)
  }
}
