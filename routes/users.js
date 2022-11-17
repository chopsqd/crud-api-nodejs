import express from 'express'
import {v4 as uuid} from 'uuid'


const router = express.Router()

let users = [

]

// --> /users/
router.get('/', (req, res) => {
    res.send(users)
})

router.post('/', (req, res) => {
    const user = {...req.body, id: uuid()}
    users.push(user)

    res.send(`User ${user.firstName} added to the database!`)
})

export default router