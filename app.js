const fs = require('fs');
const express = require('express')
const multer = require('multer')
const app = express()
const port = 3000

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now());
    }
});

// const upload = multer({ dest: 'upload/' }); //定义文件的保存路径
const upload = multer({ storage: storage }) //自定文件保存路径

app.get('/', (req, res) => {
    res.send('上传测试')
})
// 单图上传
// app.post('/upload', upload.single('logo'), function (req, res, next) {
//     var file = req.file;

//     console.log('文件类型：%s', file.mimetype);
//     console.log('原始文件名：%s', file.originalname);
//     console.log('文件大小：%s', file.size);
//     console.log('文件保存路径：%s', file.path);

//     res.send({ ret_code: '200', message: `${file.originalname}上传成功` });
// });

// 多图上传
app.post('/upload', upload.array('logo', 999), function (req, res, next) {
    console.log(req.files);

    // let data = [];
    // req.forEach(element => {
    //     let url = 'http://localhost:3000/' + element.path
    //     data.push(url)
    // });

    res.send({ ret_code: '0' });
});

app.get('/form', function (req, res, next) {
    var form = fs.readFileSync('./form.html', { encoding: 'utf8' });
    res.send(form);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
