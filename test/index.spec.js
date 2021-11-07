import request from 'supertest';
import {app} from '../src/app';

describe('GET /tasks', () => {
    test('should respond with a 200 status code', async () => {
        const response = await request(app).get('/tasks').send();
        //console.log(response);
        expect(response.statusCode).toBe(200);
    });
    test('should respond with an array', async () => {
        const response = await request(app).get('/tasks').send();
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('POST /tasks', () => {

    describe('given a title and description', () => {
        
        const newTask = {
            title: "Test task",
            description: "Test Description",
        }
        
        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.statusCode).toBe(200);
        });
        test('should respond with a content-type of application/json', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
        test('should respond with a json object containing the new task with on id', async () => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        });
    });

    describe('When title and description is missing', () => {
        test('should respond with a 400 status code', async () => {
            const fields = [
                {},
                {title: 'Test task'},
                {description: 'Test description'},
            ]
            for(const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});