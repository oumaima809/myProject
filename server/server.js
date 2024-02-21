//require('dotenv').config()

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express()
const morgan = require("morgan");



//Creating a middleware
/*
using the package morgan
    app.use(morgan("dev"));
/*
custom middlware
    app.use((req,res,next)=>{
        res.status(404).json

    });
*/
app.use(cors());
app.use(express.json());




//Get all Restaurants
app.get("/api/v1/restaurants",async(req,res)=>{
    
    try {
        const results = await db.query("SELECT * FROM restaurants");
        //console.log(results);
        res.status(200).json({
            status :"success",
            results: results.rows.length,
            data: {
                restaurants :results.rows,
            },
        

    });

    }catch(err) {
        console.log(err);

    }
     

});


//Get a Restaurant

app.get("/api/v1/restaurants/:id",async(req,res)=>{
    //console.log(req.params.id);
    try{
        //const results = await db.query(`SELECT * FROM restaurants WHERE id= ${req.params.id}`//using string interpolation is really bad );
        const results = await db.query("SELECT * FROM restaurants WHERE id= $1",[req.params.id]);//this method is called paramaterized querry
        //console.log(results.rows[0]);    
        res.status(200).json({
        status :"success",
        data: {
            restaurant : results.rows[0],
        },
        

    });
    }catch(err){
        console.log(err);
    }


});


//Create a Restaurant

app.post("/api/v1/restaurants",async(req,res)=>{
    console.log(req.body); 
    try{
        const results = await db.query("INSERT INTO restaurants(name,location,price_range) VALUES ($1,$2,$3) returning *",[req.body.name
        ,req.body.location,req.body.price_range]);
       // console.log(results);
        res.status(200).json({
        status :"success",
        data: {
            restaurant :results.rows[0],
        },
        

    });

    }catch(error){
       console.log(error);
    }
    
});


//Update Restaurants

app.put("/api/v1/restaurants/:id",async(req,res)=>{
    try{
        const results = await db.query("UPDATE restaurants SET name=$1,location=$2 where id=$3 returning *",[req.body.name,req.body.location,req.params.id]);
        //console.log(results);
        res.status(200).json({
        status :"success",
        data: {
            restaurant :results.rows[0],
        },
        

    });

    }catch(err){
        console.log(err);
    }
    //console.log(req.params.id);
    //console.log(req.body);
 
});


//Delete a Restaurant

app.delete("/api/v1/restaurants/:id",async(req,res)=>{
    try{
        const results = await db.query("DELETE FROM restaurants WHERE id = $1",[req.params.id]);
        res.status(204).json({
        status :"success",

        

    });

    }catch(err){
        console.log(err);
    }
    
});












//const port = process.env.port || 3001;
const port = 3000;

app.listen(port,()=>{
    console.log(`server is up and listening on port ${port}`);
})