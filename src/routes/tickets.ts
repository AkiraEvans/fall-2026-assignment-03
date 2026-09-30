import { Router, Request, Response } from 'express';
import { getAllTickets, getTicketById, createTicket, updateTicketStatus } from '../dal/tickets.js';
import authMiddleware from '../middleware/auth.js';
import { getTotalHoursForTicket, insertTimeLog } from '../dal/timeLogs.js';

const router = Router();

// TODO: Student implementation - Part 1: Ticket Routes
// GET /tickets
// GET /tickets/:id
// POST /tickets
// PATCH /tickets/:id/status

// TODO: Student implementation - Part 2: Time Log Routes
// POST /tickets/:id/time
// GET /tickets/:id/time

router.get('/', async (req: Request, res: Response)=>{
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);
    const status = req.query.status as string;
    const tickets = await getAllTickets({limit: limit || undefined, offset:offset || undefined, status:status || undefined});
    res.json(tickets)
    });

router.get('/:id', async(req: Request, res: Response)=>{
    const id = Number(req.params.id);
    const ticket = await getTicketById(id);
    if(!ticket){
        res.status(404).json({error: 'Ticket not found'});
        return;
    }
    res.json(ticket);
});

router.post('/', authMiddleware, async(req: Request, res: Response)=>{
    const ticket = await createTicket({creator_id: res.locals.userId, title: req.body.title, description: req.body.description});
    res.status(201).json(ticket);
});

router.patch('/:id/status', authMiddleware, async(req: Request, res: Response)=>{
    const id = Number(req.params.id);
    const ticket = await updateTicketStatus(id, req.body.status);
    if(!ticket){
        res.status(404).json({error: 'Ticket not found'})
        return; 
    }
    res.status(200).json(ticket);
});

router.post('/:id/time', authMiddleware, async(req: Request, res: Response)=>{
    const ticketId = Number(req.params.id);
    const userId = res.locals.userId;
    const hours = req.body.hours;
    const timeLog = await insertTimeLog(ticketId,userId,hours);
    res.status(201).json(timeLog);
});

router.get('/:id/time', async(req: Request, res: Response)=>{
    const ticketId = Number(req.params.id);
    const totalHours = await getTotalHoursForTicket(ticketId);
    res.json({ticket_id:ticketId, total_hours:totalHours});
});
export default router;


