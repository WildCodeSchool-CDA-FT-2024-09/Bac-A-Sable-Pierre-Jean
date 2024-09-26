import express, {NextFunction, Request, Response} from "express";
import Joi from "joi";

import repos from "../../data/repos.json";
import type { Repo } from "./repo.type";

const repoController = express.Router();

const schema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    isPrivate: Joi.number().min(1).max(2).required()
})

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)

    if(error == null) {
        next()
    } else {
        res.status(422).json(error)
    }
}

repoController.get("/", (_: any, res: Response)=>{
    res.status(200).json(repos)
})

repoController.get("/:id", (req: Request, res: Response) => {
    const repo = repos.find(rep => rep.id === req.params.id) as Repo;
    if (repo) {
        res.status(200).json(repo)        
    }else {
        res.sendStatus(404)
    }
})

repoController.post("/", validateRepo, (req: Request, res: Response) => {
    repos.push(req.body)
    res.status(201).json(req.body)
})



export default repoController;