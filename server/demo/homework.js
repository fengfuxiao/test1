const path = require('path');

const readable = fs.createReadStream(path.resolve(__dirname, './demo1.txt'));
const writable = fs.createWriteStream(path.resolve(__dirname, './demo2.txt'));

readable.on('data', (chunk) => {
  writable.write(chunk);
})

readable.on('end', () => {
  writable.end();
})

// fs.writeFile("./demo1.txt", "World", (err) => {
//     if(err) return console.log("文件写入失败", err)
//     console.log("文件写入成功")
// })
// fs.readFile("./demo1.txt", "utf-8", (err, results) => {
//     if(err) return console.log("读取文件失败", err)
//     console.log("读取文件成功:", results)
// })
