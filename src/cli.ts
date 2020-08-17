import * as path from 'path'
import * as fs from 'fs-extra'
import * as sass from 'sass'

const [ , , src, dist ] = process.argv

let option = {
  data: '',
  includePaths: [
    path.dirname(src)
  ]
}

try {
  (async () => {
    console.log('Read File...')
    const readfile = await fs.readFile(src)
    console.log('Compile Sass...')
    option.data = readfile.toString()
    const sassData = sass.renderSync(option)
    console.log('Output File...')
    fs.outputFile(dist, sassData.css, err => {
      if (err) throw err
    })
    console.log('Completed!!')
  })()
} catch (error) {
  console.error(error)
}