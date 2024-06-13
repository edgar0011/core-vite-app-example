// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`
  },
}
