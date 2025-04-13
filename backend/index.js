const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config(); 

const app = express();
const port = 4040;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("MongoDB error:", err))
;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{ type: String }],
    address: String,
    phoneNumber: { type: String },
    role: { type: String, default: "user" }
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true }, // e.g. "clothing", "electronics"
  price: { type: Number, required: true },
  brand: String,
  images: [String],
  inStock: { type: Boolean, default: true },
  details: { type: mongoose.Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model("User",userSchema);
const Product = mongoose.model("Product",productSchema);

app.get("/verifyToken", (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing or malformed" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({
        message: "Token is valid",
        user: decoded
      });
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password} = req.body;
  
    try {
        const existingUser = await User.findOne({email});

        if(existingUser) {
              return res.status(409).json({ message: "User already exists" });
          }
  
      const newUser = new User({
        name,
        email,
        password,
      });
  
      await newUser.save();
  
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET
      );
  
      res.status(201).json({
        message: "User registered successfully",
        token,
        role : "user"
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Server error" });
    }
});

app.post("/login", async (req, res) => {
    const { email,password } = req.body;
    console.log(email);
    try {
      if (!password || !email) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      const user = await User.findOne({
          email: email ,
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if(password === user.password)
      {
        const token = jwt.sign(
            {email: user.email, role: user.role },
            process.env.JWT_SECRET
        );
        return res.status(200).json({message : "Login Sussecc",token,role : user.role});
      }
      else res.status(401).json({message : "Invalid Password"});

  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
});
  

app.get("/",async (req,res)=>{
    const data = await User.findOne({email : "karanprajapat824@gmail.com"});
    data.role = "admin";
    await data.save();
    res.json(data);
})



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});