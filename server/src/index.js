const Customer = require("./models/Customer")
const Worker = require("./models/Worker")
const WorkType = require("./models/WorkType")
const Order = require("./models/Order")
const cors = require('cors')
const mongoose = require('mongoose')

const express = require("express")
const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))


mongoose.connect('mongodb://127.0.0.1:27017/workshop');

app.get("/customers", (req, res) => {
    Customer.find(null)
        .then(customers => {
            res.json(customers)
        }).catch(() => {
        res.status(404).json({
            message: "Customers not found"
        })
    })
})

app.get("/workers", (req, res) => {
    Worker.find(null)
        .then(workers => {
            res.json(workers)
        }).catch(() => {
        res.status(404).json({
            message: "Workers not found"
        })
    })
})
app.get("/worktypes", (req, res) => {
    WorkType.find(null)
        .then(worktypes => {
            res.json(worktypes)
        }).catch(() => {
        res.status(404).json({
            message: "WorkTypes not found"
        })
    })
})
app.get("/orders", (req, res) => {
    Order.find(null)
        .populate("customer")
        .populate("worker")
        .populate("work")
        .then(orders => {
            res.json(orders)
        }).catch(() => {
        res.status(404).json({
            message: "Orders not found"
        })
    })
})


app.post("/customers", async (req, res) => {
    const {name, surname, email} = req.body
    const customer = await new Customer({name, surname, email})
    customer.save()
        .then(() => res.send("Customer created"))
        .catch(() => {
            return res.status(400).json({
                message: "Incorrect data"
            })
        })
})

app.post("/workers", async (req, res) => {
    const {name, surname, post, experience} = req.body
    const worker = await new Worker({name, surname, post, experience})
    worker.save()
        .then(() => res.send("Worker created"))
        .catch(() => {
            return res.status(400).json({
                message: "Incorrect data"
            })
        })
})

app.post("/worktypes", async (req, res) => {
    const {name, price} = req.body
    const workType = await new WorkType({name, price})
    workType.save()
        .then(() => res.send("Work type created"))
        .catch(() => {
            return res.status(400).json({
                message: "Incorrect data"
            })
        })
})

app.post("/orders", async (req, res) => {
    const {customerId, workerId, workId} = req.body
    const order = await new Order({customer: customerId, worker: workerId, work: workId})
    order.save()
        .then(() => res.send("Order created"))
        .catch(() => {
            return res.status(400).json({
                message: "Incorrect data"
            })
        })
})


app.delete("/workers/:id", async (req, res) => {
    const {id} = req.params
    const order = await Order.findOne({worker:id})
    if(order) return res.status(403).json({
        message: "Вы не можете удалить исполнителя, потому что у него есть заказ"
    })

    try {
        const worker = await Worker.findByIdAndDelete(id)
        return res.json(worker)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.delete("/worktypes/:id", async (req, res) => {
    const {id} = req.params
    const order = await Order.findOne({work:id})
    if(order) return res.status(403).json({
        message: "Вы не можете удалить вид работы, потому что он уже заказан"
    })
    try {
        const type = await WorkType.findByIdAndDelete(id)
        return res.json(type)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.delete("/customers/:id", async (req, res) => {
    const {id} = req.params
    const order = await Order.findOne({customer:id})
    if(order) return res.status(403).json({
        message: "Вы не можете удалить заказчика, потому что он у него есть заказ"
    })
    try {
        const customer = await Customer.findByIdAndDelete(id)
        return res.json(customer)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.delete("/orders/:id", async (req, res) => {
    const {id} = req.params
    try {
        const order = await Order.findByIdAndDelete(id)
        return res.json(order)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.put("/workers/:id", async (req, res) => {
    const {id} = req.params
    const {name, surname, post, experience} = req.body
    try {
        const worker = await Worker.findByIdAndUpdate({_id:id}, {name, surname, post, experience})
        return res.json(worker)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.put("/worktypes/:id", async (req, res) => {
    const {id} = req.params
    const {name, price} = req.body
    try {
        const type = await WorkType.findByIdAndUpdate({_id:id}, {name, price})
        return res.json(type)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.put("/customers/:id", async (req, res) => {
    const {id} = req.params
    const {name, surname, email} = req.body
    try {
        const customer = await Customer.findByIdAndUpdate({_id:id}, {name, surname, email})
        return res.json(customer)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.put("/orders/:id", async (req, res) => {
    const {id} = req.params
    const {customerId, workerId, workId} = req.body
    try {
        const order = await Order.findByIdAndUpdate({_id:id}, {customer: customerId, worker: workerId, work: workId})
        return res.json(order)
    } catch (e) {
        return res.status(400).json({
            message: "No Worker by this id"
        })
    }
})

app.listen(PORT, () => {
    console.log("Server is starting on port", PORT)
})
