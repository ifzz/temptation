import express from 'express'

import Models from '../../../core/models'

const UserModel = Models.user()

const router = express.Router()
  // List
router.get((req, res, next) => {
  UserModel.find(req.query, (err, docs) => {
    if (!err) {
      res.send(docs)
    } else {
      next(err)
    }
  })
})

// Get
router.get('/:id', (req, res, next) => {
  UserModel.findById(req.params.id, (err, user) => {
    if (!err) {
      res.send(user)
    } else {
      next(err)
    }
  })
})

// Create
router.post((req, res, next) => {
  let user = new UserModel(req.body)
  user.save((err) => {
    if (!err) {
      res.statusCode = 201
      res.send(user)
    } else {
      next(err)
    }
  })
})

// Delete
router.delete('/:id', (req, res, next) => {
  UserModel.findByIdAndRemove(req.params.id, (err) => {
    if (!err) {
      res.statusCode = 204
      res.send()
    } else {
      next(err)
    }
  })
})

export default router
