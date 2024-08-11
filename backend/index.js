import express from "express"
import cors from "cors"
import  {mongodbConnect} from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config'
import orderRouter from "./routes/orderRoute.js";

const app=express();
const port=process.env.PORT || 5000

app.use(express.json())
app.use(cors());


app.get("/",(req,res)=>{
    res.send("API WORKNG")
})
mongodbConnect()

app.use("/api/food",foodRouter)
app.use("/images",express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use('/api/order',orderRouter)


app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})
