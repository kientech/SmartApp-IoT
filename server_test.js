const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });

server.on("connection", (socket) => {
  console.log("A new client connected");
  socket.on("message", (message) => {
    setInterval(() => {
      const temperature = Math.floor(Math.random() * (40 - 20 + 1)) + 20; // Giả lập nhiệt độ từ 20°C đến 40°C
      const humidity = Math.floor(Math.random() * (80 - 50 + 1)) + 50; // Giả lập độ ẩm từ 50% đến 80%
      const co2 = Math.floor(Math.random() * (800 - 400 + 1)) + 400; // Giả lập CO2 từ 400 ppm đến 800 ppm
      socket.send("sensorData", { temperature, humidity, co2 });
      console.log(
        `Temperature: ${temperature} - Humidity: ${humidity} - CO2: ${co2}`
      );
    }, 2000); // Cứ mỗi 2 giây gửi dữ liệu mới về client
    console.log("Received:", message.toString());
  

    // Kiểm tra và xử lý dữ liệu nhận được từ client
    if (message.toString() === "on") {
      // Gửi tin nhắn "on" cho client
      socket.send("on");
    } else if (message.toString() === "off") {
      // Gửi tin nhắn "off" cho client
      socket.send("off");
    } else {
      // Gửi tin nhắn phản hồi nếu lệnh không hợp lệ
      socket.send("Invalid command");
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });



  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

console.log(`Server is running on port ${PORT}`);
