const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config();
const Customer = require('./customer.js');
const { startMetricsServer } = require("./metrics.js");
app.use(bodyParser.json())

const startServer = async () => {
    try {

        await mongoose.connect(process.env.mongo_url).then(() => {
            console.log("Database connected")
        })
        app.get('/', (req, res) => {
            res.send("Hello")

        })

        app.post('/newcustomer', async (req, res) => {
            var newCust = {
                name: req.body.name,
                age: req.body.age,
                address: req.body.address
            }
            const customer = new Customer(newCust)

            await customer.save().then(() => {
                console.log('customer created sucessfully')

            })

            res.send("Customer created successfully")

        })

        app.get('/customers',async (req, res) => {

            await Customer.find().then((customers) => {

                res.json(customers)
            }).catch(error => {
                if (error)
                    throw error;
            })

        })


        app.get('/customer/:id',async (req, res) => {


            console.log("custid data", req.params.id)
            await Customer.findById(req.params.id).then((customers) => {

                console.log(customers)
                if (customers)
                    res.json(customers)
                else
                    res.sendStatus(404)
            }).catch(error => {
                res.send('id doesnt exist')
                // console.log(error);
                // if(error)
                // throw error;
            })

        })

        app.delete('/customer/:id', async (req, res) => {

            await Customer.findOneAndDelete(req.params.id).then((customers) => {
                res.send("Customer deleted successfully")
            }).catch(error => {
                res.send('problem in deleting customer')
                // console.log(error);
                // if(error)
                // throw error;
            })

        })

        startMetricsServer();

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });

    } catch (err) {
        console.log('Error connecting to mongodb', err);
        process.exit(1);
    }
};

startServer();