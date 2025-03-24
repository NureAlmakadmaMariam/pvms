import socket
HOST = '192.168.56.1'
PORT = 5000
try:
     with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
         s.connect((HOST, PORT))
         name = input("Введіть своє ім'я: ")
         s.sendall(name.encode())
         data = s.recv(1024)
         print(f'Отримано від сервера: {data.decode()}')
except ConnectionRefusedError:
     print("Не вдалося підключитися до сервера. Переконайтеся, що сервер запущено.")
except Exception as e:
     print(f"Сталася помилка: {e}")
