// const express=require('express')
// const app=express()
// const mongoose=require('mongoose')
// const dotenv=require('dotenv')
// const cors=require('cors')
// const multer=require('multer')
// const path=require("path")
// const cookieParser=require('cookie-parser')
// const authRoute=require('./routes/auth')
// const userRoute=require('./routes/users')
// const postRoute=require('./routes/posts')
// const commentRoute=require('./routes/comments')


// app.use(cors({origin:"https://elevate-self.vercel.app",credentials:true}));
// //app.use(cors({origin:"https://elevate-self-frontend.vercel.app",method: ["POST","GET"], credentials:true}));

// // const corsConfig = {
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //     methods: ["GET", "POST"]
// // };

// // app.use(cors(corsConfig));
// // app.use(cors());


// //database
// const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://Ashok:1234@cluster0.1nejjcf.mongodb.net/ElevateSelf?retryWrites=true&w=majority&appName=Cluster0");
//         console.log("Database is connected successfully!");
//         return { message: "Connection successful" };
//     } catch (err) {
//         console.log(err);
//         return { message: "Connection failed" };
//     }
// };

// //default route at server
// app.get("/", async (req, res) => {
//     const status = await connectDB();
//     res.status(status.message === "Connection successful" ? 200 : 500).json(status);
// });

// app.get('/health', (req, res) => {
//     const connectionState = mongoose.connection.readyState;
//     res.json({ connected: connectionState === 1 });
// });

// //middlewares
// //app.use(express.urlencoded({extended : false}));  for parsing form data
// app.use(express.static('public'));
// dotenv.config()
// app.use(express.json())
// app.use("/images",express.static(path.join(__dirname,"/images")))
// app.use(cookieParser())
// app.use("/api/auth",authRoute)
// app.use("/api/users",userRoute)
// app.use("/api/posts",postRoute)
// app.use("/api/comments",commentRoute)


// //image upload
// const storage=multer.diskStorage({
//     destination:(req,file,fn)=>{
//          fn(null,"images") //here we have to mention the destination of folder in which file should go
//     },
//     filename:(req,file,fn)=>{
//          fn(null,req.body.img)
//         // fn(null,"image1.jpg")
//     }
// });

// //for uploding image
// const upload=multer({storage:storage})
// app.post("/api/upload",upload.single("file"),(req,res)=>{
//      console.log(req.body)
//     res.status(200).json("Image has been uploaded successfully!")
// })

// connectDB()
// app.listen(process.env.PORT,()=>{
//     console.log("app is running on port "+process.env.PORT)
// })


// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const multer = require('multer');
// const path = require("path");
// const cookieParser = require('cookie-parser');
// const authRoute = require('./routes/auth');
// const userRoute = require('./routes/users');
// const postRoute = require('./routes/posts');
// const commentRoute = require('./routes/comments');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const { GridFSBucket, ObjectID } = require('mongodb');

// app.use(cors({origin: "https://elevate-self.vercel.app", credentials: true}));

// dotenv.config()

// //database
// let gfs;

// const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://Ashok:1234@cluster0.1nejjcf.mongodb.net/ElevateSelf?retryWrites=true&w=majority&appName=Cluster0");
//         console.log("Database is connected successfully!");
//         gfs = Grid(mongoose.connection.db, mongoose.mongo);
//         gfs.collection('uploads');
//         return { message: "Connection successful" };
//     } catch (err) {
//         console.log(err);
//         return { message: "Connection failed" };
//     }
// };
// connectDB();

// // Create storage engine
// const storage = new GridFsStorage({
//     url: "mongodb+srv://Ashok:1234@cluster0.1nejjcf.mongodb.net/ElevateSelf?retryWrites=true&w=majority&appName=Cluster0",
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         return {
//             filename: req.body.img || Date.now() + path.extname(file.originalname),
//             bucketName: 'uploads'
//         };
//     }
// });
// const upload = multer({ storage });

// //default route at server
// app.get("/", async (req, res) => {
//     const status = await connectDB();
//     res.status(status.message === "Connection successful" ? 200 : 500).json(status);
// });

// app.get('/health', async(req, res) => {
//     await connectDB();
//     const connectionState = mongoose.connection.readyState;
//     res.json({ connected: connectionState === 1 });
// });

// //middlewares
// app.use(express.static('public'));
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/comments", commentRoute);

// // for uploading image
// app.post("/api/upload", upload.single("file"), (req, res) => {
//     console.log(req.body);
//     res.status(200).json("Image has been uploaded successfully!");
// });

// // Route to retrieve image
// app.get('/api/file/:filename', async (req, res) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename });

//         if (!file || file.length === 0) {
//             return res.status(404).json({ err: 'No file exists' });
//         }

//         // Check if image (adjust as per your expected content types)
//         if (file.contentType.startsWith('image/')) {
//             // Read output to browser
//             console.log("before read stream");
//             const readstream = gfs.createReadStream({ _id: new ObjectID(file._id) });
//             console.log("after read stream");
//             readstream.pipe(res);
//         } else {
//             res.status(404).json({ err: 'Not an image' });
//         }
//     } catch (err) {
//         console.error("Error finding file:", err);
//         res.status(500).json({ err: 'Error finding file'});
//     }
// });


// // Route to get all files
// app.get('/api/files', async (req, res) => {
//     try {
//         const files = await gfs.files.find().toArray();
//         if (!files || files.length === 0) {
//             return res.status(404).json({ err: 'No files exist' });
//         }
//         return res.json(files);
//     } catch (err) {
//         console.error("Error fetching files:", err);
//         res.status(500).json({ err: 'Error fetching files' });
//     }
// });


// app.listen(process.env.PORT, () => {
//     console.log("app is running on port " + process.env.PORT);
// });

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require("path");
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const { GridFSBucket, ObjectID } = require('mongodb');

dotenv.config();

// Database connection
mongoose.connect("mongodb+srv://Ashok:1234@cluster0.1nejjcf.mongodb.net/ElevateSelf?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Database connected successfully");
    initGFS();
})
.catch(err => console.error("Database connection error:", err));

const db = mongoose.connection;

// Check MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connection established'));

// GridFS setup
let gfs;

function initGFS() {
    gfs = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'uploads'
    });
}

// Multer storage engine for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads'); // Adjust as needed
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://elevate-self.vercel.app", credentials: true }));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Route to handle file uploads
app.post("/api/upload", upload.single("file"), async (req, res) => {
    res.status(200).json({ message: "File uploaded successfully!" });
});

// Route to retrieve an image by filename
app.get('/api/file/:filename', async (req, res) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }

        // Check if image (adjust content type as per your files)
        if (file[0].contentType.startsWith('image/')) {
            gfs.openDownloadStreamByName(req.params.filename).pipe(res);
        } else {
            res.status(404).json({ err: 'Not an image' });
        }
    } catch (err) {
        console.error("Error finding file:", err);
        res.status(500).json({ err: 'Error finding file' });
    }
});

// Route to fetch all files metadata
app.get('/api/files', async (req, res) => {
    try {
        if (!gfs) {
            throw new Error('GridFSBucket is not initialized');
        }

        const files = await gfs.find().toArray();

        if (!files || files.length === 0) {
            return res.status(404).json({ err: 'No files exist' });
        }

        return res.json(files);
    } catch (err) {
        console.error("Error fetching files:", err);
        res.status(500).json({ err: 'Error fetching files' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
