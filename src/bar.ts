import * as chalk from 'chalk'

const SYMBOLS = {
  Empty: '',
  Full: '█',
  SevenEighths: '▉',
  ThreeQuarters: '▊',
  FiveEighths: '▋',
  Half: '▌',
  ThreeEighths: '▍',
  Quarter: '▎',
  Eighth: '▏',
}

const getSymbolNormal = value => {
  if (value <= 0) {
    return SYMBOLS.Empty
  } else if (value <= 1 / 8) {
    return SYMBOLS.Eighth
  } else if (value <= 1 / 4) {
    return SYMBOLS.Quarter
  } else if (value <= 3 / 8) {
    return SYMBOLS.ThreeEighths
  } else if (value <= 1 / 2) {
    return SYMBOLS.Half
  } else if (value <= 5 / 8) {
    return SYMBOLS.FiveEighths
  } else if (value <= 3 / 4) {
    return SYMBOLS.ThreeQuarters
  } else if (value <= 7 / 8) {
    return SYMBOLS.SevenEighths
  } else {
    return SYMBOLS.Full
  }
}

// win32 systems support only half-block symbol and no corners 😭
if (process.platform === 'win32') {
  Object.assign(SYMBOLS, {
    LeftCorner: '',
    RightCorner: '',
    Full: '█',
    SevenEighths: '█',
    ThreeQuarters: '█',
    FiveEighths: '█',
    Half: '▌',
    ThreeEighths: '▌',
    Quarter: '▌',
    Eighth: '▌',
  })
}

const splitNumber = (value = 0) => {
  const [int, rest = '0'] = value.toString().split('.')
  return [parseInt(int, 10), parseInt(rest, 10) / Math.pow(10, rest.length)]
}

export default class Bar {
  constructor({ total }) {
    this.total = total
    this.maxWidth = process.stdout.columns - 30
  }

  draw({ duration, startOffset, path, color }) {
    const width = duration / this.total
    const offSet = startOffset / this.total

    const fillLength = width * this.maxWidth
    const fillOffset = offSet * this.maxWidth

    const [int, rest] = splitNumber(fillLength)

    // shamelessly taken from
    // https://github.com/gribnoysup/wunderbar/blob/b42565b9af92addc82c53bea6e4512339822578d/lib/bars.js
    const string =
      int < 0
        ? ''
        : getSymbolNormal(int).repeat(int) +
          // We are handling zero value as a special case
          // to print at least something on the screen
          getSymbolNormal(int === 0 && rest === 0 ? 0.001 : rest)

    const filledBar = chalk.hex(color)(string)

    process.stdout.cursorTo(Math.floor(fillOffset))
    process.stdout.write(
      `${filledBar} - ${path.join('.')} - ${this.printDuration(duration)}\n`,
    )
    process.stdout.cursorTo(0)
  }

  private printDuration(nanoSeconds) {
    const microSeconds = Math.round(nanoSeconds / 1000)
    if (microSeconds > 1000) {
      const ms = Math.round(microSeconds / 1000)
      return `${ms} ms`
    }
    return `${microSeconds} µs`
  }
}
