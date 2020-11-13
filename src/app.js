const express = require('express')
const app = new express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const multer = require('multer')
const { json } = require('express')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/image/')
    },
    filename: function(req, file, cb) {
        var singfileArray = file.originalname.split('.');
        var fileExtension = singfileArray[singfileArray.length - 1];
        cb(null, singfileArray[0] + '-' + Date.now() + "." + fileExtension);
    }
})

var upload = multer({
        storage: storage
    })
    //处理静态资源
app.use(express.static('public'))
    //处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//设置允许跨域访问该服务器
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'PUT,GET,DELETE,OPTIONS');
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header("Access-Control-Allow-Headers", 'Content-Type');
    next();
});

//图片上传
app.post('/upload', upload.single('upload'), function(req, res, next) {
    let data = {
        fileName: req.file.filename
    }
    res.send(data)
});
//第一个板块
app.post('/editOrder', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ych1999320',
        database: 'fu'
    })
    let sql = `UPDATE goodManage SET orderName = ${JSON.stringify(req.body.orderName)},price = ${req.body.price},type=${JSON.stringify(req.body.type)},message = ${JSON.stringify(req.body.message)} WHERE orderNumber =${JSON.stringify(req.body.orderNumber)}`
    connection.connect()
    connection.query(sql, (err, res2) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(res2)
    })
    connection.end()
})
app.post('/delOrder', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ych1999320',
        database: 'fu'
    })
    let sql = `delete from goodManage where orderNumber=${JSON.stringify(req.body.orderNumber)}`
    connection.connect()
    connection.query(sql, (err, res2) => {
        res.send(res2)
    })
    connection.end()
})
app.post('/addGood', (req, res) => {
        var date = new Date();
        var orderId = date.getTime()
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ych1999320',
            database: 'fu'
        })
        let sql = `INSERT INTO goodManage(orderNumber,orderName,price,type,message,imageUrl) 
		VALUES(${JSON.stringify(orderId)},${JSON.stringify(req.body.orderName)},${(req.body.price)},${JSON.stringify(req.body.type)},${JSON.stringify(req.body.message)},${JSON.stringify(req.body.imageUrl)})`
        connection.connect();
        connection.query(sql, (err, res2) => {
            console.log(res2);
            if (err) {
                console.log(err);
                return;
            }
        })
        connection.end()
        res.send('新增成功')
    })
    // 商品管理获取
app.post('/goodInfoManage', (req, res) => {
        let list = [];
        let total = 0
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ych1999320',
            database: 'fu'
        })
        connection.connect();

        if (req.body.orderName !== "") {
            // var sql = `select * from  dishmanage where dishName like ${JSON.stringify('%' + req.body.dishName + '%')}`
            var sql = `select * from goodManage  where  orderName like ${JSON.stringify('%' + req.body.orderName + '%')} limit ${req.body.pageNum * req.body.pageSize} offset ${(req.body.pageNum - 1) * req.body.pageSize}`;
        } else if (req.body.orderName == "") {
            var sql = `select * from goodManage limit ${req.body.pageNum * req.body.pageSize} offset ${(req.body.pageNum-1)*req.body.pageSize}`;
        }
        var total2 = `select count(*) as total from goodManage where orderName like ${JSON.stringify('%'+req.body.orderName+'%')}`;
        connection.query(sql, (err, res2) => {
            list = res2
        })
        connection.query(total2, (err, res3) => {
            total = res3
            let data = {
                list: list,
                total: total
            }
            res.send(data)
        })
        connection.end()
    })
    // 第二个板块
app.post('/getOrder', (req, res) => {
    let list = [];
    let total = 0
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ych1999320',
        database: 'fu'
    })
    connection.connect();

    if (req.body.orderNumber !== "") {
        // var sql = `select * from  dishmanage where dishName like ${JSON.stringify('%' + req.body.dishName + '%')}`
        var sql = `select * from orderManage  where  orderNumber like ${JSON.stringify('%' + req.body.orderNumber + '%')} limit ${req.body.pageNum * req.body.pageSize} offset ${(req.body.pageNum - 1) * req.body.pageSize}`;
    } else if (req.body.orderNumber == "") {
        var sql = `select * from orderManage limit ${req.body.pageNum * req.body.pageSize} offset ${(req.body.pageNum-1)*req.body.pageSize}`;
    }
    var total2 = `select count(*) as total from orderManage where orderNumber like ${JSON.stringify('%'+req.body.orderNumber+'%')}`;
    connection.query(sql, (err, res2) => {
        list = res2
    })
    connection.query(total2, (err, res3) => {
        total = res3
        let data = {
            list: list,
            total: total
        }
        res.send(data)
    })
    connection.end()
})
app.post('/deleteOrder', (req, res) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ych1999320',
            database: 'fu'
        })
        let sql = `delete from orderManage where orderNumber=${JSON.stringify(req.body.orderNumber)}`
        connection.connect()
        connection.query(sql, (err, res2) => {
            res.send(res2)
        })
        connection.end()
    })
    // 第三个板块
app.post('/getFeedback', (req, res) => {
    let list = [];
    let total = 0
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ych1999320',
        database: 'fu'
    })
    connection.connect();

    if (req.body.userName !== "") {
        // var sql = `select * from  dishmanage where dishName like ${JSON.stringify('%' + req.body.dishName + '%')}`
        var sql = `select * from feedback  where  userName like ${JSON.stringify('%' + req.body.userName + '%')} limit ${req.body.pageNum * req.body.pageSize} offset ${(req.body.pageNum - 1) * req.body.pageSize}`;
    } else if (req.body.userName == "") {
        var sql = `select * from feedback limit ${req.body.pageNum * req.body.pageSize} offset ${(req.body.pageNum-1)*req.body.pageSize}`;
    }
    var total2 = `select count(*) as total from feedback where userName like ${JSON.stringify('%'+req.body.userName+'%')}`;
    connection.query(sql, (err, res2) => {
        list = res2
    })
    connection.query(total2, (err, res3) => {
        total = res3
        let data = {
            list: list,
            total: total
        }
        res.send(data)
    })
    connection.end()
})
app.post('/deleteFeedback', (req, res) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ych1999320',
            database: 'fu'
        })
        let sql = `delete from feedback where orderNumber=${JSON.stringify(req.body.orderNumber)}`
        connection.connect()
        connection.query(sql, (err, res2) => {
            res.send(res2)
        })
        connection.end()
    })
    // 第四板块
app.post('/register', (req, res) => {
        console.log(req.body);
        var date = new Date();
        var orderId = date.getTime()
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'ych1999320',
            database: 'fu'
        })
        let sql = `INSERT INTO manage(name,password,phone) 
		VALUES(${JSON.stringify(req.body.name)},${JSON.stringify(req.body.password)},${parseInt(req.body.phone)})`
        connection.connect();
        connection.query(sql, (err, res2) => {
            console.log(res2);
            if (err) {
                console.log(err);
                return;
            }
        })
        connection.end()
        res.send('新增成功')
    })
    // 登录验证
app.post('/login', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ych1999320',
        database: 'fu'
    })
    connection.connect();
    var sql = `select * from manage where name=${JSON.stringify(req.body.name)} and password=${JSON.stringify(req.body.password)}`;
    connection.query(sql, function(err, res2) {
        if (res2.length == 0) {
            res.send(res2)
            return
        } else {
            res.send(res2)
            return
        }
    })
    connection.end();
})
app.post('/infoEdit', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ych1999320',
        database: 'fu'
    })
    var sql = `select * from manage where name=${JSON.stringify(req.body.name)} and password=${JSON.stringify(req.body.oldPassword)}`;
    connection.query(sql, function(err, res2) {
        if (res2.length == 0) {
            res.send('0')
            connection.end();

            return
        } else {
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'ych1999320',
                database: 'fu'
            })
            var sql2 = `UPDATE manage SET name=${JSON.stringify(req.body.name)},password=${JSON.stringify(req.body.newPassword)} WHERE name=${JSON.stringify(req.body.name)} and password=${JSON.stringify(req.body.oldPassword)}`

            connection.query(sql2, (err, res3) => {
                res.send(res3)
                if (err) {
                    console.log(err);
                }
                connection.end();

            })
        }
    })
})

app.listen(3005, () => {
    console.log('run........');
})