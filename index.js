import express from "express"
import cors from "cors"

import {
  obtenerTodasLasPizzasAsync,
  obtenerPizzaPorIdAsync,
  agregarPizzaAsync,
  actualizarPizzaAsync,
  eliminarPizzaAsync
} from "./repositorios/pizza.repositorio.js"

const app = express()

app.use(cors())

const PORT = 3000

// Configuración para usar el body en métodos POST y PUT
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Obtener todas las pizzas
app.get("/api/v1/pizzas", async (req, res) => {
  const pizzas = await obtenerTodasLasPizzasAsync()

  return res.status(200).json(pizzas)
})


// Obtener una pizza por su id
app.get("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id

  const pizza = await obtenerPizzaPorIdAsync(id)

  return res.status(200).json(pizza)
})


// Agregar una nueva pizza
app.post("/api/v1/pizzas", async (req, res) => {
  const pizza = req.body

  const resultado = await agregarPizzaAsync(pizza)

  return res.status(201).json(resultado)
})


// Actualizar una pizza
app.put("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id
  const pizza = req.body

  const resultado = await actualizarPizzaAsync(id, pizza)

  return res.status(200).json(resultado)
})


// Eliminar una pizza
app.delete("/api/v1/pizzas/:id", async (req, res) => {
  const id = req.params.id

  const resultado = await eliminarPizzaAsync(id)

  return res.status(200).json(resultado)
})


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(
    `Servidor Express escuchando en el puerto http://localhost:${PORT}`
  )
})