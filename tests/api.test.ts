import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/index.js';

describe('Part 1: API Integration Tests', () => {
    // TODO: Student implementation - Part 1: Integration Testing
    // Test user creation (POST /users)
    // Test ticket creation (POST /tickets)
    // Test auth middleware rejection (401 when X-User-Id is missing or invalid)
    // Test 404 responses for non-existent users and tickets
    // Test pagination and filtering on GET /tickets
      it('should create user', async()=>{
        const response = await request(app).post('/users').send({name: 'John Doe', email: 'johndoe@gmail.com',})
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('John Doe');
        expect(response.body.email).toBe('johndoe@gmail.com');
      });
        
    it('should reject ticket without X-user-id', async()=>{
      const response = await request(app).post('/tickets').send({title: 'Title 1', description: 'Title description',});
      expect(response.status).toBe(401);
    });
    
    it('should return error 404 for nonexistent user', async()=>{
      const response = await request(app).get('/users/0987654')
      expect(response.status).toBe(404);
    });

    it('should return error 404 for nonexistent ticket', async()=>{
      const response = await request(app).get('/tickets/0987654')
      expect(response.status).toBe(404);
    });

    it('should create ticket', async()=>{
      const user = await request(app).post('/users').send({name: 'John Doe', email: 'johndoe@gmail.com'});
      const userId = user.body.id;
      const response = await request(app).post('/tickets').set('X-user-id', String(userId)).send({title: 'Title 1', description: 'Title description',});
      expect(response.status).toBe(201);
      expect(response.body.title).toBe('Title 1');
    });

    it('should assist page navigation for tickets', async()=>{
      const response = await request(app).get('/tickets?limit=1&offset=2');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeLessThanOrEqual(1);
    });
  });
