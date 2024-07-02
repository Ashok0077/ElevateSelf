const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')


//app.use(cors({origin:"http://localhost:5173",credentials:true}))
//app.use(cors({origin:"https://elevate-self-frontend.vercel.app",method: ["POST","GET"], credentials:true}));

const corsConfig = {
    origin: "https://elevate-self-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST"]
};

app.use(cors(corsConfig));
app.use(cors());


//database
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://Ashok:Ashok@cluster0.1nejjcf.mongodb.net/ElevateSelf?retryWrites=true&w=majority")
        console.log("database is connected successfully!")

    }
    catch(err){
        console.log(err)
    }
}

//default route at server
app.get("/",(req,res)=>{
    res.json("hello");
})

app.get('/health', (req, res) => {
    const connectionState = mongoose.connection.readyState;
    res.json({ connected: connectionState === 1 });
});

//middlewares
app.use(express.static('public'));
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)


//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("app is running on port "+process.env.PORT)
})
