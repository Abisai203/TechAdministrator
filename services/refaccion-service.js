
import fs from 'fs-extra'; // Asegúrate de importar fs-extra
import refaccionRepository from '../repositories/refaccion-repository.js'; // Asegúrate de que la ruta del archivo sea correcta

const filePath = './refacciones.json'; // Cambia esta ruta a la ubicación de tu archivo JSON

/*
async function getAllRefacciones() {
    try {
        return await refaccionRepository.getRefacciones();
    } catch (error) {
        throw new Error('Error al obtener las refacciones: ' + error.message);
    }
}
*/
async function getAllRefacciones() {
    try {
        const refacciones = await refaccionRepository.getRefacciones(); // Asegúrate de que esté devolviendo todos los campos
        return refacciones; // Asegúrate de que este array contenga todas las propiedades, no solo el ID
    } catch (error) {
        throw new Error('Error al obtener las refacciones: ' + error.message);
    }
}

async function addRefaccion(refaccion) {
    // Validar la refacción
    if (!refaccion.nombreDeLaRefaccion || !refaccion.numeroDeParte) {
        throw new Error("La refacción debe tener un nombre y un número de parte.");
    }

    try {
        const refacciones = await refaccionRepository.getRefacciones();
        const newId = refacciones.length > 0 ? Math.max(...refacciones.map(r => r.id)) + 1 : 1;

        const newRefaccion = { ...refaccion, id: newId };
        refacciones.push(newRefaccion);
        await refaccionRepository.saveRefacciones(refacciones);
        
        return newRefaccion;
    } catch (error) {
        throw new Error('Error al agregar la refacción: ' + error.message);
    }
}

async function updateRefaccion(id, updatedRefaccion) {
    try {
        const refacciones = await refaccionRepository.getRefacciones();
        const index = refacciones.findIndex(refaccion => refaccion.id === parseInt(id));

        if (index === -1) {
            throw new Error('Refacción no encontrada');
        }

        delete updatedRefaccion.id; // Asegúrate de no sobrescribir el ID
        refacciones[index] = { ...refacciones[index], ...updatedRefaccion };

        await refaccionRepository.saveRefacciones(refacciones);
        return refacciones[index];
    } catch (error) {
        throw new Error('Error al actualizar la refacción: ' + error.message);
    }
}

async function deleteRefaccion(id) {
    try {
        const refacciones = await refaccionRepository.getRefacciones();
        const index = refacciones.findIndex(refaccion => refaccion.id === parseInt(id));

        if (index === -1) {
            throw new Error('Refacción no encontrada');
        }

        const filteredRefacciones = refacciones.filter(refaccion => refaccion.id !== parseInt(id));
        await refaccionRepository.saveRefacciones(filteredRefacciones);
        return { message: 'Refacción eliminada' };
    } catch (error) {
        throw new Error('Error al eliminar la refacción: ' + error.message);
    }
}

// Función para obtener una refacción por ID
async function getRefaccionById(id) {
    try {
        const refacciones = await refaccionRepository.getRefacciones(); // Asegúrate de que getRefacciones regrese todos los datos
        const refaccion = refacciones.find(refaccion => refaccion.id === parseInt(id)); // Busca por ID
        if (!refaccion) {
            throw new Error('Refacción no encontrada');
        }
        return refaccion;
    } catch (error) {
        throw new Error('Error al obtener la refacción: ' + error.message);
    }
}



// Exporta todas las funciones necesarias
export default {
    getAllRefacciones,
    addRefaccion,
    updateRefaccion,
    deleteRefaccion,
    getRefaccionById // Asegúrate de exportar esta función
};

  
