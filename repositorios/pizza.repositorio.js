// Esta es la capa donde se persisten los datos

import { MongoClient } from "mongodb"

// Cadena de conexión a MongoDB
const cadenaConexion = "mongodb://localhost:27017"

// Cliente de MongoDB
const cliente = new MongoClient(cadenaConexion)

// Base de datos y colección que utilizaremos
const baseDatos = cliente.db("pizzeria")
const coleccionPizzas = baseDatos.collection("pizzas")

/**
 * Obtiene todas las pizzas almacenadas en MongoDB.
 *
 * No recibe parámetros.
 *
 * @returns {Array} Devuelve una lista con todas las pizzas.
 */
export async function obtenerTodasLasPizzasAsync() {
    const pizzas = await coleccionPizzas.find({}).toArray()

    return pizzas
}

/**
 * Busca una pizza utilizando su identificador.
 *
 * @param {number} id - Identificador de la pizza que se desea buscar.
 * @returns {Object|null} Devuelve la pizza encontrada o null
 * si no existe una pizza con el id indicado.
 */
export async function obtenerPizzaPorIdAsync(id) {
    const pizza = await coleccionPizzas.findOne({ id: Number(id) })

    return pizza
}

/**
 * Agrega una nueva pizza a MongoDB.
 *
 * @param {Object} pizza - Objeto que contiene la información
 * de la pizza que se desea agregar.
 * @returns {Object} Devuelve el resultado de la inserción.
 */
export async function agregarPizzaAsync(pizza) {
    const resultado = await coleccionPizzas.insertOne(pizza)

    return resultado
}

/**
 * Actualiza los datos de una pizza existente utilizando su identificador.
 *
 * @param {number} id - Identificador de la pizza que se desea actualizar.
 * @param {Object} pizza - Objeto con los nuevos datos de la pizza.
 * @returns {Object} Devuelve el resultado de la actualización.
 */
export async function actualizarPizzaAsync(id, pizza) {
    const resultado = await coleccionPizzas.updateOne(
        { id: Number(id) },
        { $set: pizza }
    )

    return resultado
}

/**
 * Elimina una pizza utilizando su identificador.
 *
 * @param {number} id - Identificador de la pizza que se desea eliminar.
 * @returns {Object} Devuelve el resultado de la eliminación.
 */
export async function eliminarPizzaAsync(id) {
    const resultado = await coleccionPizzas.deleteOne({
        id: Number(id)
    })

    return resultado
}