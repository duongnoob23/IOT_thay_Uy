
const express = require('express');
const app = express();
const port = 3003;
const cors = require("cors");
const dbConnect = require("./Config/database");
const mqtt = require('mqtt');
// const IP = '192.168.88.142';
const IP = '172.20.10.6';
dbConnect();
app.use(cors());
app.use(express.json());

const router = require("./Routers/index.router");
router(app);

const dataMGDB = require("./Model/data.model");

const mqttClient = mqtt.connect(`mqtt://${IP}:1996`, {
  username: 'tienduong',
  password: 'b21dcnn590'
});

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('newdata', (err) => {
    if (!err) {
      console.log('Subscribed to newdata topic');
         
    }
  });

});


function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('newdata', (err) => {
    if (!err) {
      console.log('Subscribed to newdata topic');
         
    }
  });

});
// Sử dụng hàm để định dạng thời gian
mqttClient.on('message', async (topic, message) => {
  const data = message.toString();
  console.log(`Received data: ${data}`);

  try {
    if(topic === "newdata"){
      const parsedData = JSON.parse(data); // Phân tích chuỗi JSON

    // Tạo đối tượng mới từ model và lưu vào MongoDB

      const stt = await dataMGDB.countDocuments({});
      const newData = new dataMGDB({
        stt: stt+1, // hoặc một giá trị nào đó
        temperature: parsedData.temperature,
        humidity: parsedData.humidity,
        light: parsedData.light,
        windspeed: parsedData.windspeed,
        time: formatDate(new Date()) // Sử dụng thời gian đã định dạng
        
      });
      await newData.save();
    }
    // console.log('Data saved to MongoDB');
  } catch (error) {
    console.error('Error saving data:', error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.get("/actionHistory/put",async (req,res) =>{

// })

// app.get("/apiOfPhong/findAll",async (req,res) =>{

// })


