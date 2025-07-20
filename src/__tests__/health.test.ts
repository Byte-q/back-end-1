import request from 'supertest';
import app from '../server/index';
import { describe, it } from 'node:test';
import { expect } from 'vitest';

describe('Health Check Endpoint', () => {
  it('should return 200 and health status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('environment');
  });

  it('should return correct environment', async () => {
    const response = await request(app).get('/health');
    
    expect(response.body.environment).toBe('test');
  });
}); 