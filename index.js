require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { readDb, writeDb } = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Swagger Options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Top Notch Africa API',
            version: '1.0.0',
            description: 'API documentation for the Top Notch Africa web application',
            contact: {
                name: 'Top Notch Africa Dev Team',
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local Development Server',
            },
        ],
    },
    apis: ['./index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check route
 *     description: Returns a welcome message.
 *     responses:
 *       200:
 *         description: Welcome message
 */
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Top Notch Africa API' });
});

// Helper function to create standard CRUD routes
const createCrudRoutes = (resourceName) => {
    /**
     * @swagger
     * /api/${resourceName}:
     *   get:
     *     summary: Get all items
     *     responses:
     *       200:
     *         description: List of items
     *   post:
     *     summary: Create new item
     *     responses:
     *       201:
     *         description: Item created
     */
    app.get(`/api/${resourceName}`, (req, res) => {
        const db = readDb();
        res.json(db[resourceName] || []);
    });

    app.post(`/api/${resourceName}`, (req, res) => {
        try {
            const db = readDb();
            const newItem = { id: Date.now(), ...req.body, date: new Date().toISOString() };
            if (!db[resourceName]) db[resourceName] = [];
            db[resourceName].push(newItem);
            writeDb(db);
            res.status(201).json(newItem);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save item' });
        }
    });

    app.get(`/api/${resourceName}/:id`, (req, res) => {
        const db = readDb();
        const items = db[resourceName] || [];
        const rawId = req.params.id;
        const item = items.find(i => String(i.id) === String(rawId));
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    });

    app.delete(`/api/${resourceName}/:id`, (req, res) => {
        try {
            const db = readDb();
            const rawId = req.params.id;
            if (db[resourceName]) {
                db[resourceName] = db[resourceName].filter(item => String(item.id) !== String(rawId));
                writeDb(db);
            }
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete item' });
        }
    });
};

// Initialize routes for all content types
['news', 'videos', 'gallery', 'artists', 'awards', 'culture', 'innovation', 'lifestyle', 'featured'].forEach(resource => {
    createCrudRoutes(resource);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
