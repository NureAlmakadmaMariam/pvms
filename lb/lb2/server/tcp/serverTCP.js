const net = require('net');
const server = net.createServer((socket) => {
    console.log('Клієнт підключений');
    socket.on('data', (data) => {
        try {  
            const name = data.toString().trim();  
            console.log(`Отримано ім'я: ${name}`);
            const surname = "Алмакадма"; 
            const fullName = `${name} ${surname}`;
            socket.write(fullName, () => {
                console.log(`Відправлено повне ім'я: ${fullName}`);
                socket.end();
            });
        } catch (err) {
            console.error("Помилка при обробці даних від клієнта:", err.message);
            socket.end();
        }
    });
    socket.on('error', (err) => {
        console.error("Помилка з'єднання:", err.message);
    });

    socket.on('end', () => {
        console.log('Клієнт відключився');
    });
});
server.listen(5000, '0.0.0.0', () => {
    console.log('Сервер працює на порту 5000');
});
