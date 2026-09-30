import { Router, Request, Response } from 'express';
import { getAllUsers, getUserById, createUser } from '../dal/users.js';

const router = Router();

// TODO: Student implementation - Part 1: User Routes
// GET /users
// GET /users/:id
// POST /users
router.get('/', async (req:Request, res:Response)=>{
    const users = await getAllUsers();
    res.json(users);
});

router.get('/:id', async (req: Request, res: Response)=>{
    const id = Number(req.params.id);
    const userId = await getUserById(id);
    if(!userId){
        res.status(404).json({error: 'User not found.'}); 
        return;
    }
    res.status(200).json(userId);
});

router.post('/', async (req: Request, res: Response)=>{
    const user = await createUser(req.body);
    res.status(201).json(user);

});
export default router;
