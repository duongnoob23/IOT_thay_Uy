const dataRouter = require("../Routers/dataLogs.router");
const actionRouter = require("../Routers/actionHistory.router");
module.exports = (app) =>{
    
    app.use("/actionhistory",actionRouter);

    app.use("/datalogs",dataRouter);
}