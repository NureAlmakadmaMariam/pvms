import socket

HOST = '192.168.56.1'
PORT = 5001

try:
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    name = input("Введіть своє ім'я: ")
    client_socket.sendto(name.encode(), (HOST, PORT))

    data, server = client_socket.recvfrom(1024)
    print(f"Отримано від сервера: {data.decode()}")

except socket.error as e:
    print(f"Помилка клієнта: {e}")

finally:
    client_socket.close()