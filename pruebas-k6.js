import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from "k6";
import http from "k6/http";

const baseUrl = "http://localhost:3000/api/v1/pizzas";

export default function () {

    // ID para la pizza utilizada durante la prueba
    const pizzaId = Date.now();

    // --------------------------------------------------
    // POST - Agregar una pizza
    // --------------------------------------------------

    const nuevaPizza = JSON.stringify({
        id: pizzaId,
        nombre: "Pizza K6",
        descripcion: "Pizza creada durante la prueba de K6",
        precio: 150
    });

    const parametros = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const responsePost = http.post(
        baseUrl,
        nuevaPizza,
        parametros
    );

    check(responsePost, {
        "POST pizza status code 201": (r) => r.status === 201
    });


    // --------------------------------------------------
    // GET - Obtener todas las pizzas
    // --------------------------------------------------

    const responseGet = http.get(baseUrl);

    check(responseGet, {
        "GET pizzas status code 200": (r) => r.status === 200
    });


    // --------------------------------------------------
    // PUT - Actualizar la pizza creada
    // --------------------------------------------------

    const pizzaActualizada = JSON.stringify({
        nombre: "Pizza K6 Actualizada",
        descripcion: "Pizza actualizada durante la prueba de K6",
        precio: 180
    });

    const responsePut = http.put(
        `${baseUrl}/${pizzaId}`,
        pizzaActualizada,
        parametros
    );

    check(responsePut, {
        "PUT pizza status code 200": (r) => r.status === 200
    });


    // --------------------------------------------------
    // DELETE - Eliminar la pizza creada
    // --------------------------------------------------

    const responseDelete = http.del(
        `${baseUrl}/${pizzaId}`
    );

    check(responseDelete, {
        "DELETE pizza status code 200": (r) => r.status === 200
    });
}


// Generar reporte HTML
export function handleSummary(data) {
    return {
        "reporte-k6.html": htmlReport(data)
    };
}