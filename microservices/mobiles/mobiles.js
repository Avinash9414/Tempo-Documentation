const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv").config();
const Mobile = require("./mobile.js");
const { startMetricsServer } = require("./metrics.js");
app.use(bodyParser.json())

const startServer = async () => {
    try {

        await mongoose.connect(process.env.mongo_url).then(() => {
            console.log("Database connected")
        })
        app.get('/', (req, res) => {
            res.send("Hello");

        })

        app.post('/newmobile', async (req, res) => {
            var newMobile = {
                name: req.body.name,
                company: req.body.company,
                price: req.body.price,
            }
            const mobile = new Mobile(newMobile)

            await mobile.save().then(() => {
                console.log('Mobile created sucessfully')
            })

            res.send("Mobile created sucessfully")

        })


        app.get('/allmobiles', async (req, res) => {

            await Mobile.find().then((mobiles) => {
                res.json(mobiles)
            }).catch(error => {
                if (error)
                    throw error;
            })

        });

        app.get('/mobile/:id', async (req, res) => {

            await Mobile.findById(req.params.id).then((mobile) => {

                console.log(mobile)
                if (mobile)
                    res.json(mobile)
                else
                    res.sendStatus(404)
            }).catch(error => {
                res.send('id doesnt exist')
                // console.log(error);
                // if(error)
                // throw error;
            })

        })

        app.delete('/mobile/:id', async (req, res) => {

            await Mobile.findOneAndDelete(req.params.id).then((mobile) => {
                if (mobile != null)
                    res.send("mobile deleted successfully")
                else
                    res.send("No mobile with this id");
            }).catch(error => {
                res.send('problem in deleting mobile')
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