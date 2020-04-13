var fs = require('fs');
var source = fs.readFileSync('./wasm/classes.wasm');
var typedArray = new Uint8Array(source);

const env = {
  memoryBase: 0,
  tableBase: 0,
  memory: new WebAssembly.Memory({
    initial: 256
  }),
  table: new WebAssembly.Table({
    initial: 0,
    element: 'anyfunc'
  })
}

WebAssembly.instantiate(typedArray, {
  env: env
  }).then(result => {
    result = result.instance.exports.thePurposeOfLife();
    console.log(result);
  }).catch(e => {
  // error caught
  console.log(e);
});