const express = require('express')

const router = express.Router()
const Account = require('./account-model')

router.get('/', (req, res) => {
    Account.getAll()
        .then(account => {
            res.json(account)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Account.getById(id)
        .then(account => {
           res.status(200).json(account)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: err.message })
        })
    
})

const validatePost = (req, res, next) => next()

router.post('/', validatePost, (req, res) => {
    account = req.body
    Account.create(account)
        .then(account => {
            res.json(account)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Account.update(id, changes)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: err.message })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Account.delete(id)
        .then(account => {
            res.json({ message: `account with id ${id} was deleted`})
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })

})


module.exports = router;