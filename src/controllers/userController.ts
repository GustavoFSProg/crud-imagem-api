import userModelLast from '../models/userModel'
import { Request, Response } from 'express'
import md5 from 'md5'
import { config } from 'dotenv'

config()

async function register(req: Request, res: Response) {
  try {
    await userModelLast.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
    })

    return res.status(201).send({ msg: 'User created!!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!' })
  }
}

async function updateOne(req: Request, res: Response) {
  try {
    await userModelLast.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
      },
    })

    return res.status(201).send({ msg: 'User Edictated!!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!' })
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const data = await userModelLast.find()

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!' })
  }
}

async function remover(req: Request, res: Response) {
  try {
    await userModelLast.findByIdAndDelete(req.params.id)

    return res.status(200).json({ msg: 'USER DELETED!!' })
  } catch (error) {
    return res.status(400).json({ msg: 'ERROR!!' })
  }
}

export default { register, getAll, remover, updateOne }
