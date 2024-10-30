const dbConnect = require("../Config/database");
const data = require("../DBload/data");
const dataMD = require("../Model/data.model");

const dbLoad = async () =>{
    dbConnect();
    for(var item of data){
        try{
            const m = new dataMD({
                stt:item?.stt,
                temperature:item?.temperature,
                humidity:item?.humidity,
                light:item?.light,
                windspeed:item?.windspeed,
                time:item?.time,
            })

            await m.save();
        }catch(err){
            console.log(err);
            console.log("không đẩy được data lên mongoDB");
        }
    }
}

dbLoad()

// const chair = require("../data/MovieChair");
// const chairDB = require("../model/mvchair.model");
// const dbLoad =async () => {
//     dbConnect()
//     for(var item of chair) {
//         try{
//             const m = new chairDB({
//                 title: item?.title,
//                 price:item?.price,
//                 status:item?.status,
//                 user_id:item?.user_id,
//             })
    
//             await m.save();
            

//         }
//         catch(err){
//             console.log(err);
//         }
//     }
// }


