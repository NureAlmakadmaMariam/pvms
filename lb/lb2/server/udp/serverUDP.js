const dgram = require('dgram');

const server = dgram.createSocket('udp4');
const SURNAME = "Алмакадма"; 

server.on('message', (msg, rinfo) => {
    const name = msg.toString().trim();
    console.log(`Отримано ім'я: ${name}`);

    const fullName = `${name} ${SURNAME}`;
    const response = Buffer.from(fullName);

    // Відправлення назад клієнту
    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error('Помилка надсилання відповіді:', err);
        } else {
            console.log(`Відповідь відправлено: ${fullName}`);
        }
    });
});

server.on('error', (err) => {
    console.error('Помилка сервера:', err);
    server.close();
});

server.bind(5001, '0.0.0.0', () => {
    console.log('UDP-сервер працює на порту 5001');
});
