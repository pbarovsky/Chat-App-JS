const express = require('express'); // подключаем ээксперсс
const app = express(); // реультат вызова экспресс
const http =  require('http').createServer(app) // протокол для сокета, соединяем сокет и экспресс
const io = require('socket.io')(http)

// запрос на получение по адресу "слэш"
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// express берет из папки asstets файлы
app.use(express.static(__dirname +'/assets'))

// коннектим сокет
io.on('connection', (socket)=> {
    socket.on('chat message', (data) => {
        // обработка и отправка обратно на фронт
        io.emit('chat message', {
            message: data.message,
            name: data.name
        })
    })
})

// порт 3000. СТАРТ СЕРВЕРА
http.listen(3000, () => {
    console.log('Старт сервера')
})