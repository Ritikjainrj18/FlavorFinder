import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const MongoClient = mongodb.MongoClient
const port= process.env.PORT || 8000
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
let URL="mongodb+srv://ritikjainrj18:6232547429@cluster0.xrzcv7u.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
MongoClient.connect(
    URL
    // process.env.RESTREVIEWS_DB_URI,
)
.then(async client=>{
    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})
.catch(err=>{
    console.error(err.stack)
    process.exit(1)
})