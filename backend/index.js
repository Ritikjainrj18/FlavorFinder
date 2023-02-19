import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient
const port= process.env.PORT || 8000
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        // poolSize: 50,
        // wtimeoutMS:2500,
        // useNewUrlParse: true  
    }
)
.catch(err=>{
    console.error(err.stack)
    process.exit(1)
})
.then(async client=>{
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})