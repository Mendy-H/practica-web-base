import './style.css'
import { productos } from './datos.js'

// Elemento donde se dibujan las tarjetas
const catalogo = document.getElementById('catalogo')

// ------------------------------------------------------------
// EJERCICIO 2 — mostrarProductos(lista)
// ------------------------------------------------------------
function mostrarProductos(lista) {
  catalogo.innerHTML = lista.map(p => `
    <div class="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h3 class="font-bold text-lg text-gray-800">${p.nombre}</h3>
        <p class="text-gray-600 mb-4">$${p.precio}.00</p>
      </div>
      <button 
        data-id="${p.id}" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
        Agregar
      </button>
    </div>
  `).join('')
}

mostrarProductos(productos)

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// ------------------------------------------------------------
const pedido = []

// Escribe aquí tu código del Ejercicio 3 cuando pases al siguiente ejercicio

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// ------------------------------------------------------------
// Escribe aquí tu código del Ejercicio 4