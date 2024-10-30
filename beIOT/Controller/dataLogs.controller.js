const dataMGDB = require("../Model/data.model");



module.exports.index = async(req,res) => {
    try{
      
      console.log(req.query);
      const query ={};
      const  sort1 = {
        time: -1,
      };
      const searchKey = req.query.searchKey;
      const searchValue = req.query.searchValue;
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1)* limit;   
      const sortKey = req.query.sortKey;
      const sortValue = req.query.sortValue;
      // const startTime = req.query.startTime;
      // const endTime = req.query.endTime;
  
      if(sortValue === 'asc'){
        sort1[sortKey] = 1;
      }else if(sortValue === 'desc'){
        sort1[sortKey] = -1;
      }
  
      
      if(searchKey !=="time"  && searchValue){
        query[searchKey]=searchValue;
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

      

      console.log(query);
      const data = await dataMGDB.find(query).sort(sort1).skip(skip).limit(limit);
      // const data = await dataMGDB.find({});
      const total1 = await dataMGDB.find(query);
      let totalPages = Math.ceil(total1.length / limit);
      console.log(totalPages);
      if(!data){
        return res.status(400).json("không lấy được data");
      }else{
        return res.json({
          code:200,
          results:data,
          totalPages:totalPages,
        })
      }
    }catch(err){
      return res.status(404).json("Không truy cập vào api đc");
    }
  }

module.exports.linechart = async (req,res) => {
    try{
      const data = await dataMGDB.find({}).limit(10).sort({time : -1 });
      const count = await dataMGDB.countDocuments({ windspeed: { $gt: 70 } } );
      if(!data){
        return res.json({
          code:404,
          status:"khong co data tra ve",
        })
      }else{
        return res.json({
          code:200,
          results:data,
          count:count,
        })
      }
    }catch(err){
      return res.json({
        code:404,
        status:"Khong truy cap duoc api"
      })
    }
  };
module.exports.count = async(req,res) => {
  try{
    const data = await dataMGDB.countDocuments({ windspeed: { $gt: 60 } });
    return res.json({
      code:200,
      count:data,
    })
  }catch{
    return res.json({
      code:404,
      status:"khong truy cap duoc api"
    })
  }
}
