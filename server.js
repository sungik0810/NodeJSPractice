const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))

var db
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')

MongoClient.connect(
  'mongodb+srv://adminSungik:aa0953113@cluster0.ffppn.mongodb.net/todoapp?retryWrites=true&w=majority',
  (error, client) => {
    if (error) return console.log(error)

    db = client.db('todoapp')

    app.listen(8080, () => {
      console.log('listening on 8080')
    })
  }
)

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/add', (req, res) => {
  res.send('전송 완료')
  db.collection('post').insertOne(
    { 제목: `${req.body.title}`, 날짜: `${req.body.date}` },
    (error, result) => {
      console.log('저장완료')
    }
  )
})

app.get('/list', (req, res) => {
  db.collection('post')
    .find()
    .toArray(function (error, result) {
      console.log(result)
      res.render('list.ejs', { posts: result })
    })
})
