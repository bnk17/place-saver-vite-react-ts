import { Hono } from 'hono';

const api = new Hono();

// Example endpoint - get all items
api.get('/items', (c) => {
  return c.json({
    success: true,
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]
  });
});

// Example endpoint - get single item
api.get('/items/:id', (c) => {
  const id = c.req.param('id');
  return c.json({
    success: true,
    data: { id, name: `Item ${id}` }
  });
});

// Example endpoint - create item
api.post('/items', async (c) => {
  const body = await c.req.json();
  return c.json({
    success: true,
    data: { id: 3, ...body }
  }, 201);
});

// Example endpoint - update item
api.put('/items/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  return c.json({
    success: true,
    data: { id, ...body }
  });
});

// Example endpoint - delete item
api.delete('/items/:id', (c) => {
  const id = c.req.param('id');
  return c.json({
    success: true,
    message: `Item ${id} deleted`
  });
});

export default api;
