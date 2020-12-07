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
            res.status(404).json({ message: err.message })
        })
    
})



module.exports = router;