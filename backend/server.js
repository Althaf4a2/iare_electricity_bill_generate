const express = require('express');
const cors = require('cors');
const db = require('./db');


function randomFixedInteger   (length){
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/get", (req,res)=>{
db.query("SELECT * FROM customers", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

app.get("/api/bill/get", (req,res)=>{
  db.query("SELECT * FROM transactions", (err,result)=>{
      if(err) {
      console.log(err)
      } 
  res.send(result)
  });   });
// Route to get one post
app.get("/api/get/:id", (req,res)=>{

const meterNo = req.params.id;
 db.query(`SELECT * FROM customers WHERE meter_no = ${meterNo}`, 
 (err,result)=>{
    if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      }
          res.status(200).json({
        success: true,
        message: 'Data get successfully',
        data: result,
      });
    });   });

// Route for creating the post
app.post('/api/create', (req,res)=> {

const {
    areaCode,
customerName,
customerPhone,
customerAddress,
meterNo,
category,
connectionType} = req.body;
const sc_no = randomFixedInteger(10);
const usc_no = randomFixedInteger(6);
const ero_no = 316;
const ero_address = "Qutballahpur";


db.query(`INSERT INTO customers (sc_no, usc_no, meter_no, name, address, phone, connection_phase, multiplication_factor, arrears_as_on_date, arrears_after_date, security_deposit, last_paid_date, ero_no, ero_address, ero_code,created_by, updated_by) VALUES (${sc_no},${usc_no},${(meterNo)},"${customerName}","${customerAddress}",${customerPhone},${connectionType},${category},"","",0,"",${ero_no},"${ero_address}",${areaCode},1,1)`, (err,result)=>{
    if (err) {
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error',
        });
      }
      console.log(result);
        res.status(200).json({
        success: true,
        message: 'Data inserted successfully',
        data: result,
      });
});   })

app.post('/api/bill/create', (req,res)=> {

  const {
    meterNo,
    previousUnit,
    presentUnit,
    amount} = req.body;
 
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

  db.query(`INSERT INTO transactions (
    meter_no,
    previous_unit,
    current_unit,
    previous_date,
    present_date,
    energy_charges,
    customer_charges,
    bill_amount,
    net_amount,
    due_date,
    status,
    created_by,
    updated_by,
    bill_no
) VALUES (
    ${meterNo},
    ${previousUnit},
   ${presentUnit},
   "${year}-${month-1}-${day}",
   "${year}-${month}-${day}",
    ${amount},
    0,
    0,
    ${amount},
    "${year}-${month+1}-${day}",
    1,
    1,
    1,
    "BILL001"
)`, (err,result)=>{
      if (err) {
        console.log(err)
          return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
          });
        }
        console.log(result);
          res.status(200).json({
          success: true,
          message: 'Data inserted successfully',
          data: result,
        });
  });   })

// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})