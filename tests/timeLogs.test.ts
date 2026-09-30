import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/index.js';

describe('Part 2: Time Logs Tests', () => {
    // TODO: Student implementation - Part 2: Time Logging Tests
    // Log hours for a ticket (POST /tickets/:id/time)
    // Fetch total hours for a ticket (GET /tickets/:id/time)
    // Verify aggregation math
  it('should add time logs and return total hours', async()=>{
    const user = await request(app).post('/users').send({name: 'John Doe', email: 'johndoe@gmail.com',});
    const userId = user.body.id;
    const ticket = await request(app).post('/tickets').set('x-user-id', String(userId)).send({title: 'Time log', description: 'The time logs'});
    const ticketId = ticket.body.id;
    await request(app).post(`/tickets/${ticketId}/time`).set('x-user-id', String(userId)).send({hours: 2})
    await request(app).post(`/tickets/${ticketId}/time`).set('x-user-id', String(userId)).send({hours: 3})
    const response = await request(app).get(`/tickets/${ticketId}/time`);
    expect(response.status).toBe(200);
    expect(response.body.ticket_id).toBe(ticketId);
    expect(response.body.total_hours).toBe(5);
  });
  });
