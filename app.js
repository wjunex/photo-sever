const fs = require('fs');
const express = require('express')
const multer = require('multer')
const app = express()
const port = 3000

/* 开启静态资源访问 */
app.use(express.static('upload'));

// 配置文件上传
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './upload/image/')
	},
	filename: function (req, file, cb) {
		let { originalname } = file;
		const after = originalname.split('.')[1] ? '.' + originalname.split('.')[1] : '';
		cb(null, Date.now() + after);
	}
});
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
	res.send('上传测试')
})

// 多图上传
app.post('/uploadFile', upload.array('logo', 999), function (req, res, next) {
	console.log(req.files);
	let url = `http://localhost:3000/image/${req.files[0].filename}`
	res.send({ code: '200', url });
});


// 前端上传页面
app.get('/form', function (req, res, next) {
	var form = fs.readFileSync('./form.html', { encoding: 'utf8' });
	res.send(form);
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
