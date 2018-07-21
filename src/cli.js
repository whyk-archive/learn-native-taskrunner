const fs   = require('fs-extra');
const sass = require('node-sass');
const path = require('path');

const args = process.argv;

let src  = args[2];
let dist = args[3];


let option = {
  // sassのimport時の相対パスの起点を、import元のsassファイルのディレクトリにする
  includePaths: [path.dirname(src)]
}

const loadFile = async () => {
  return new Promise((resolve, reject) => {
    console.log('Read File...');

    fs.readFile(src, (err, data) => {
      if (err) reject(new Error(err))
      else resolve(data)
    });
  });
};

const compileSass = async () => {
  return new Promise((resolve, reject) => {
    console.log('Compile Sass...');

    option.data = data.toString();

    sass.render(option, (err, data) => {
      if (err) reject(new Error(err))
      else resolve(data)
    });
  });
}

const stream = async () => {};


Promise.resolve()
  .then(() => {
    return new Promise((resolve, reject) => {
      console.log('Read File...')

      fs.readFile(src, (err, data) => {
        if (err) reject(new Error(err))
        else resolve(data)
      })
    })
  }).then((data) => {
    return new Promise((resolve, reject) => {
      console.log('Compile Sass...')

      option.data = data.toString()

      sass.render(option, (err, data) => {
        if (err) reject(new Error(err))
        else resolve(data)
      })
    })
  }).then((data) => {
    return new Promise((resolve, reject) => {
      console.log('Output...')

      fs.outputFile(dist, data.css, (err) => {
        if (err) reject(new Error(err))
        else resolve()
      })
    })
  }).then(() => {
    console.log('Completed!')
  })
  .catch((error) => {
    console.error(error)
  });