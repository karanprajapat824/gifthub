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
  category: { type: String, required: true },
  price: { type: Number, required: true },
  brand: String,
  for : {type : String,default : "all"},
  images: [String],
  inStock: { type: Boolean, default: true },
  details: { type: mongoose.Schema.Types.Mixed, required: false },
  createdAt: { type: Date, default: Date.now }
});

const filterOptionSchema = new mongoose.Schema({
  heading: String,
  options: [String],       
}, { _id: false });

const categorySchema = new mongoose.Schema({
   category : {type : String,required : true},
   filter : [filterOptionSchema],
   min : {type : Number},
   max : {type : Number}
});

const User = mongoose.model("User",userSchema);
const Product = mongoose.model("Product",productSchema);
const Filter = mongoose.model("filter",categorySchema);


const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

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

app.get("/getProduct/:category/:for",async (req, res) => {
  try {
    const { category, for: targetFor } = req.params;

    const query = {
      category: category.toLowerCase(),
      for: targetFor.toLowerCase(),
    };

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addProduct",verify,async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied! Only admin can access" });
    }

    const {
      productName,
      category,
      price,
      brand,
      for: productFor = "all",
      images = [],
      inStock = true,
      details = {},
    } = req.body;

    if (!productName || !category || !price) {
      return res.status(400).json({ message: "productName, category and price are required." });
    }

    const newProduct = new Product({
      productName,
      category,
      price,
      brand,
      for: productFor,
      images,
      inStock,
      details
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/seedProduct", async (req, res) => {
  try {
    const {products} = req.body;
    console.log(products);
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Please provide an array of products." });
    }

    for (const product of products) {
      if (!product.productName || !product.category || !product.price) {
        return res.status(400).json({ message: "Each product must include productName, category, and price." });
      }
    }

    const insertedProducts = await Product.insertMany(products);

    res.status(201).json({
      message: `${insertedProducts.length} product(s) seeded successfully.`,
      products: insertedProducts
    });
  } catch (error) {
    console.error("Error seeding products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getAllCategory/:gender",async (req, res) => {
  try {
    let { gender } = req.params;
    gender = gender.toLowerCase();
    const matchStage = gender ? { for: gender } : {};

    const categoryProducts = await Product.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$category",
          product: { $first: "$$ROOT" } 
        }
      },
      {
        $replaceRoot: { newRoot: "$product" } 
      }
    ]);

    res.status(200).json(categoryProducts);
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    res.status(500).json({ message: "Failed to fetch category products." });
  }
});

app.get("/getFilter/:category",async (req,res)=>{
   try{
      const {category} = req.params;
      const data = await Filter.findOne({category});
      res.status(200).json(data);
   }catch(error)  
   {
    console.error("Failed to get filter:", error);
    res.status(500).json({ message: "Failed to get filter." });
   }
})

app.post("/updateFilter",async (req, res) => {
  try {
    const { category, heading, options,min,max} = req.body;
    let item = await Filter.findOne({ category });
    const newFilter = { heading, options };

    if (!item) {
      const created = new Filter({
        category,
        filter: [newFilter],
        min,
        max
      });

      await created.save();
      return res.status(200).json({ message: "Filter created successfully." });
    } else {
      item.filter.push(newFilter);
      await item.save();
      return res.status(200).json({ message: "Filter updated successfully." });
    }

  } catch (error) {
    console.error("Failed to update filter:", error);
    res.status(500).json({ message: "Failed to update filter information." });
  }
});

app.get('/getProductById/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



app.get("/", async (req, res) => {
  try {
    let data = await Product.find({});
    res.json(data);
  } catch (error) {
    console.error("Error updating products:", error);
    res.status(500).json({ error: "Server error" });
  }
});




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});