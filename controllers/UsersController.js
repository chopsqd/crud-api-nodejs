import {v4 as uuid} from "uuid";
import fs from 'fs'
let users = []

const loadFromFile = async () => {
    await new Promise((resolve) => {
        fs.readFile(`${process.cwd()}/users.json`, 'utf-8',(err, data) => {
            if (err) {
                return console.warn(err)
            }
            users = JSON.parse(data)
            resolve()
        })
    });
    console.log('Data has been loaded successfully!')
}

const writeInFile = async (content) => {
    await new Promise((resolve) => {
        fs.writeFile(`${process.cwd()}/users.json`, JSON.stringify(content), (err) => {
            if (err) {
                return console.warn(err)
            }
            resolve()
            console.log('The information has been successfully written to the file!')
        })
    });
}

export const getAllUsers = async (req, res) => {
    try {
        await loadFromFile()

        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
}

export const getOneUser = async (req, res) => {
    try {
        await loadFromFile()

        const {id} = req.params
        const foundUser = users.find(user => user.id === id)

        res.send(foundUser)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
}

export const createUser = async (req, res) => {
    try {
        await loadFromFile()

        const user = {...req.body, id: uuid()}
        users.push(user)

        await writeInFile(users)
        res.send(`User ${user.firstName} has been added to the database!`)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
}

export const updateUserInfo = async (req, res) => {
    try {
        await loadFromFile()

        const {id} = req.params
        users = users.map(u => u.id === id ? u = {...u, ...req.body} : u)

        await writeInFile(users)
        res.send(`User info has been updated!`)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await loadFromFile()

        const {id} = req.params
        users = users.filter(user => user.id !== id)

        await writeInFile(users)
        res.send(`User with the id:${id} has been deleted from the database!`)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Some error occurred'
        })
    }
}