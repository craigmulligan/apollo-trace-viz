import Bar from './bar'
const randomColor = require('randomcolor')

const printViz = res => {
  const tracing = res.extensions.tracing

  if (!tracing) {
    console.log('No trace data')
    return
  }
  const { duration: total } = tracing

  const bar = new Bar({ total })

  const {
    execution: { resolvers },
  } = tracing

  // draw total
  bar.draw({
    duration: total,
    startOffset: 0,
    path: ['total'],
    color: randomColor(),
  })

  // draw all resolvers
  resolvers.map(r => bar.draw({ ...r, color: randomColor() }))

  return res
}

module.exports = printViz
export default printViz
