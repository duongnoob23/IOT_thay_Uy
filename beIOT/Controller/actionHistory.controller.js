
const actionDataMGDB = require("../Model/action.model");
const actionMGDB = require("../Model/action.model");

const mqtt = require('mqtt');
const IP = '172.20.10.6';
const dbConnect = require("../Config/database");
dbConnect();

const mqttClient = mqtt.connect(`mqtt://${IP}:1996`, {
  username: 'tienduong',
  password: 'b21dcnn590'
});

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('light/status', (err) => {
  console.log('Subscribed to light/status topic');
  });

  mqttClient.subscribe('temperature/status', (err) => {
  console.log('Subscribed to temperature/status topic');
  });

  mqttClient.subscribe('air/status', (err) => {
  console.log('Subscribed to air/status topic');
  });

  mqttClient.subscribe('wind/status', (err) => {
    console.log('Subscribed to wind/status topic');
    });
});

let latestStatus = null; // Biến lưu trữ trạng thái mới nhất

// mosquitto_sub -h localhost -p 1996 -u tienduong -P b21dcnn590 -t newdata

mqttClient.on('message', async (topic, message) => {
  const data = message.toString();
  console.log(`Received data: ${data}`);
  console.log(latestStatus);
  try {
    if(topic ==="light/status"){
      console.log("light in action");
      latestStatus = { type: 'light', message: `${data}` };
    }else if(topic === "temperature/status"){
      console.log("temperature in action");
      latestStatus = { type: 'temperature', message: `${data}` };
    }else if(topic === "air/status"){
      console.log("air in action");
      latestStatus = { type: 'air', message: `${data}` };
    }else if(topic === "wind/status"){
      console.log("wind in action");
      latestStatus = { type: 'wind', message: `${data}` };
    }
    // console.log('Data saved to MongoDB');
  } catch (error) {32
    console.error('Error saving data:', error);
  }
});

module.exports.check = async(req,res) =>{
  try{
    if(latestStatus){
      res.json(latestStatus);
      latestStatus = null;
    }else
      res.json({
        code:400,
        status:"khong nhan dc phan hoi mqtt actionHistory"
      })
  }catch{
    res.json({
      code:400,
      status:"khong truy cap duoc api actionHistory"
    })
  }
}

module.exports.index = async (req,res) => {
    try{
      const query = ({});
      const sort1 = ({
        time:-1,
      })
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1)* limit;  
      const searchKey = req.query.searchKey;
      const searchValue = req.query.searchValue;
      
      if(searchKey !=="time" && searchValue){
        query[searchKey] = searchValue;
      }else if (searchKey === 'time' && searchValue) {
        console.log(searchValue);
        // Nếu searchValue có giây
        if (searchValue.length === 19) {
            query[searchKey] = searchValue; // Tìm kiếm chính xác
        } else {
            // Nếu searchValue không có giây, tìm tất cả trong khoảng từ searchValue đến searchValue + 59 giây
            const startTime = `${searchValue}:00`;
            const endTime = `${searchValue}:59`;
            console.log("2");
            console.log(endTime);
            query[searchKey] = {
                $gte: startTime,
                $lte: endTime,
            };
        }
      }
      const data = await actionDataMGDB.find(query).sort(sort1).skip(skip).limit(limit);
      const total1 = await actionDataMGDB.find(query);
      const totalPages = Math.ceil(total1.length / limit);
  
      console.log(totalPages);
      if(!data){
        return res.status(400).json("không lấy được data actionHistory");
      }else{
        return res.json({
          code:200,
          results:data,
          totalPages:totalPages,
        })
      }
  
    }catch(err)
    {
      return res.json({
        code:404,
        status:"khong truy cap api duoc actionHistory"
      })
    }
  }

 

module.exports.put = async (req,res) => {
    try{
      const option = req.body;
      console.log(option);
      if(!option){
        return res.json({
          code:404,
          status:"khong co option gui len actionHistory"
        })
      }else{
        const stt = await actionDataMGDB.countDocuments({});

        const newAction = new actionDataMGDB({
          stt:stt+1,
          device:option?.device,
          action:option?.action,
          time:option?.time,
        })

        await newAction.save();


        const message = option.action === "On" ? "on" : "off"; // Chọn nội dung tin nhắn tùy theo action
        mqttClient.publish(`${option.turn}`, message, { qos: 1 }, (error) => {
        if (error) {
          console.error('Error publishing to MQTT:', error);
        } else {
          console.log('Message published to MQTT:', message);
        }
        });

        return res.json({
          code:200,
          status:"Da luu action vao csdl ",
        })
    }
    }catch{
      return res.json({
        code:404,
        status:"khong truy cap duoc api actionHistory"
      })
    }
    
};



