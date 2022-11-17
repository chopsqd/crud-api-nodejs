import express from 'express'
import {v4 as uuid} from 'uuid'


const router = express.Router()

let users = [

]

// --> /users/
router.get('/', (req, res) => {
    try {
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
})

router.get('/:id', (req, res) => {
    try {
        const {id} = req.params
        const foundUser = users.find(user => user.id === id)

        res.send(foundUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
})

router.post('/', (req, res) => {
    try {
        const user = {...req.body, id: uuid()}
        users.push(user)

        res.send(`User ${user.firstName} added to the database!`)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
})

router.delete('/:id', (req, res) => {
    try {
        const {id} = req.params
        users = users.filter(user => user.id !== id)

        res.send(`User with the id:${id} deleted from the database!`)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
})

export default router