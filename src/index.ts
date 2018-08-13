const { bgWhite } = require('chalk')
const data = require('./data.json')
import Bar from './bar'

const getTotal = ({ extensions }) => {
  const { duration } = extensions.tracing

  return duration
}

const printData = () => {
  process.stdout.cursorTo(0)
  const total = getTotal(data)
  const bar = new Bar({ total })

  const {
    execution: { resolvers },
  } = data.extensions.tracing

  bar.draw({ duration: total, startOffset: 0, path: ['total'] })

  resolvers.map(r => bar.draw(r))
}

printData()
