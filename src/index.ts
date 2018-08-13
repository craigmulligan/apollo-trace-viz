const { bgWhite } = require('chalk')
// const data = require('./data.json')
const data = require('../data.json')
import Bar from './bar'
const randomColor = require('randomcolor')

const getTotal = ({ extensions }) => {
  const { duration } = extensions.tracing

  return duration
}

const printData = () => {
  process.stdout.cursorTo(0)
  const total = getTotal(data)
  const bar = new Bar({ total })
  const tracing = data.extensions.tracing

  const {
    execution: { resolvers },
  } = tracing

  bar.draw({ duration: total, startOffset: 0, path: ['total'], color: randomColor() })

  resolvers.map(r => bar.draw({...r, color:  randomColor()}))
}

printData()
