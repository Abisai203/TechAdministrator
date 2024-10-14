import fs from 'fs-extra';
import Refaccion from '../models/refaccion-model.js'; // Asegúrate de que la ruta del archivo sea correcta

const filePath = './refacciones.json'; // Cambia el nombre del archivo si es necesario

async function getRefacciones() {
    try {
        const data = await fs.readJson(filePath);
        return data.map(refaccion => new Refaccion(
            refaccion.id,
            refaccion['nombreDeLaRefaccion'], // Nombre de la refacción
            refaccion['numeroDeParte'], // Número de parte
            refaccion.marca, // Marca
            refaccion.precio, // Precio
            refaccion.condicion // Condición
        ));
    } catch (error) {
        console.error(error);
    }
}

async function saveRefacciones(refacciones) {
    try {
        await fs.writeJson(filePath, refacciones);
    } catch (error) {
        console.error(error);
    }
}

export default {
    getRefacciones,
    saveRefacciones
};
