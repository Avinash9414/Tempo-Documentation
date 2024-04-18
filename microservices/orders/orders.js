const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const axios = require("axios")
const dotenv = require("dotenv").config();
const Order = require("./order");
const { startMetricsServer } = require("./metrics")
app.use(bodyParser.json())

const startServer = async () => {
    try {

        await mongoose.connect(process.env.mongo_url).then(() => {
            console.log("Database connected")

        })
        app.get('/', (req, res) => {
            res.send("this is our main route")

        })

        app.post('/neworder', async (req, res) => {
            const newOrder = {
                CustomerID: req.body.CustomerID,
                mobileID: req.body.mobileID,
                initialDate: req.body.initialDate,
                deliveryDate: req.body.deliveryDate
            }
            const order = new Order(newOrder)

            await order.save().then(() => {
                console.log('order created sucessfully')

            })

            res.send("order created successfully");

        })

        app.get('/orders', async (req, res) => {

            await Order.find().then((orders) => {

                res.json(orders)
            }).catch(error => {
                if (error)
                    throw error;
            })

        })

        app.get('/order/:id', async (req, res) => {

            await Order.findById(req.params.id).then((order) => {

                console.log(order)
                if (order) {

                    //console.log("http://ip_address:5555/customer/"+orders.CustomerID);
                    // res.json(orders);

                    axios.get("http://localhost:4550/customer/" + order.CustomerID).then((response) => {

                        console.log("response from then", response.data);
                        const combinedData = {
                            order: order,
                            customer: response.data
                        };
                        res.json(combinedData);

                        // axios.get("http://localhost:4550/customer/" + orders.CustomerID).then((response) => {


                        // })
                    })
                }
                // res.send("quick resposne")
                //res.json(orders)
                else
                    res.sendStatus(404)
            }).catch(error => {
                res.send('id doesnt exist')
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