/*
import express from "express";
import { check, validationResult } from 'express-validator';
import refaccionService from "../services/refaccion-service.js"; // Asegúrate de que la ruta del archivo sea correcta
import Refaccion from "../models/refaccion-model.js"; // Asegúrate de que la ruta del archivo sea correcta

const router = express.Router();

// Obtener todas las refacciones
router.get("/refacciones", async (req, res) => {
    try {
        const refacciones = await refaccionService.getAllRefacciones();
        res.json(refacciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una refacción por ID
router.get("/refacciones/:id", async (req, res) => {
    try {
        const refaccion = await refaccionService.getRefaccionById(req.params.id);
        res.json(refaccion);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Agregar una nueva refacción
router.post("/refacciones",
    [
        check('nombreDeLaRefaccion').not().isEmpty().withMessage('El nombre de la refacción es requerido'),
        check('numeroDeParte').not().isEmpty().withMessage('El número de parte es requerido')
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const { nombreDeLaRefaccion, numeroDeParte, marca, precio, condicion } = req.body;
            const newRefaccion = new Refaccion(null, nombreDeLaRefaccion, numeroDeParte, marca, precio, condicion);
            const addedRefaccion = await refaccionService.addRefaccion(newRefaccion);
            res.status(201).json(addedRefaccion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar una refacción existente
router.put("/refacciones/:id", async (req, res) => {
    try {
        const updatedRefaccion = await refaccionService.updateRefaccion(req.params.id, req.body);
        res.json(updatedRefaccion);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar una refacción
router.delete('/refacciones/:id', async (req, res) => {
    try {
        const result = await refaccionService.deleteRefaccion(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;

*/
import express from "express";
import { check, validationResult } from 'express-validator';
import refaccionService from "../services/refaccion-service.js"; // Asegúrate de que la ruta del archivo sea correcta
import Refaccion from "../models/refaccion-model.js"; // Asegúrate de que la ruta del archivo sea correcta
import { verifyToken } from '../middlewares/authMiddleware.js'; // Importa el middleware de autenticación

const router = express.Router();

// Obtener todas las refacciones (ruta protegida)
router.get("/refacciones", verifyToken, async (req, res) => {
    try {
        const refacciones = await refaccionService.getAllRefacciones();
        res.json(refacciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una refacción por ID (ruta protegida)
router.get("/refacciones/:id", verifyToken, async (req, res) => {
    try {
        const refaccion = await refaccionService.getRefaccionById(req.params.id);
        res.json(refaccion);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Agregar una nueva refacción (ruta protegida)
router.post("/refacciones",
    verifyToken,  // Middleware de autenticación
    [
        check('nombreDeLaRefaccion').not().isEmpty().withMessage('El nombre de la refacción es requerido'),
        check('numeroDeParte').not().isEmpty().withMessage('El número de parte es requerido')
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const { nombreDeLaRefaccion, numeroDeParte, marca, precio, condicion } = req.body;
            const newRefaccion = new Refaccion(null, nombreDeLaRefaccion, numeroDeParte, marca, precio, condicion);
            const addedRefaccion = await refaccionService.addRefaccion(newRefaccion);
            res.status(201).json(addedRefaccion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Actualizar una refacción existente (ruta protegida)
router.put("/refacciones/:id", verifyToken, async (req, res) => {
    try {
        const updatedRefaccion = await refaccionService.updateRefaccion(req.params.id, req.body);
        res.json(updatedRefaccion);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar una refacción (ruta protegida)
router.delete('/refacciones/:id', verifyToken, async (req, res) => {
    try {
        const result = await refaccionService.deleteRefaccion(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;


