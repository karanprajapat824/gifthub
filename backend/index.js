const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const port = 4040;
const secret = "nikitakiapp"
const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "12345678",
    database : "gifthub"
});


database.connect((error)=>{
    if(error) console.log(error);
    else console.log("Database Connect sussefully");
});


app.post("/register",async (req,res)=>{
    
    try{
        const {name,password,email} = req.body;
        if(!name || !password || !email)
        {
            return res.status(400).json({message : "All field are requered"});
        }
    
        const query = `SELECT email FROM user WHERE email = ?`;
    
        database.query(query,[email],(error,result)=>{
            if(error)
            {
                return res.status(400).json({message : error});
            } 
            if(result.length > 0)
            {
                return res.status(400).json({message : "User already exist",result});
            }

            const newUser = `INSERT INTO user(name,email,password) values(?,?,?)`;
            database.query(newUser,[name,email,password],(error,result)=>{
                if(error)
                {
                        return res.json({message : error});
                } 
                if(result){
                    const token = jwt.sign({email},secret);
                    return res.status(200).json({message : "User register successfully",token});
                }  
            });
        });
    }catch(e)
    {
        console.log(e);
    }
});

app.post("/verifyToken",(req,res)=>{
    try{
        const {token}  = req.body;
        if(!token)
        {
            return res.status(400).json({message : "Token required"});
        }
        jwt.verify(token,secret,(error,result)=>{
        if(error)
        {
            return res.status(400).json({message : "Invalid token"});
        }
        return res.status(200).json({message : "Token verified",result});
        });
    }catch(e)
    {
        console.log(e);
    }
    
});

app.post("/login",(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({message : "All field are required"});
        }
        const query = `SELECT * FROM user WHERE email = ? AND password = ?`;
    
        database.query(query,[email,password],(error,result)=>{
            if(error)
            {
                return res.status(400).json({message : error});
            }
            if(result.length > 0)
            {
                const token = jwt.sign({email},secret);
                return res.status(200).json({message : "Login success",token});
            }
            else{
                return res.status(401).json({message : "Invalid email or password"});
            }
        })
    }catch(e)
    {
        console.log(e);
    }
});

app.post("/addproduct",(req,res)=>{
    try{
        const {name,description,price,url,category,product} = req.body;
        if(!name || !description || !price || !url || !category || !product)
        {
            return res.status(400).json({message : "All fields are requered"});
        }
        

        const query = `INSERT INTO product(product_name,product_description,product_price,product_category,image_url,product) values(?,?,?,?,?,?)`;

        database.query(query,[name,description,price,category,url,product],(error,result)=>{
            if(error) {
                console.log(error);
                return res.status(400).json({message : error});
            }
            else {
                return res.status(200).json({message : "product add susseffully"});
            }
        })
    }catch(e)
    {
        console.log(e);
    }
    
    

});

app.get("/getproduct/:name/:category",(req,res)=>{
    const {name,category} = req.params;
    if(!name || !category)
    {
        return res.status(400).json({message : "All fields are requered"});
    }

    const query = `SELECT * FROM product WHERE product = ? AND product_category = ?`;

    database.query(query,[name,category],(error,result)=>{
        if(error) return res.status(400).json({message : error});
        else {
            return res.status(200).json({data : result});
        }
    })
})

app.get("/checktable",(req,res)=>{
    const query = `delete from product where product_name = 'FOGG'`

    database.query(query,(error,result)=>{
        if(error) return res.json({message : error});
        else 
        {
            return res.json({result});
        }
    })
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

