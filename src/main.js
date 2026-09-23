import './style.css'
import { productos } from './datos.js'

// Elementos del DOM
const catalogo = document.getElementById('catalogo')
const listaPedidoEl = document.getElementById('lista-pedido')
const totalPedidoEl = document.getElementById('total-pedido')
const btnVaciar = document.getElementById('btn-vaciar')

// Arreglo para guardar los productos seleccionados
let pedido = []

// ------------------------------------------------------------
// EJERCICIO 2 — Mostrar Catálogo
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
        class="btn-agregar bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
        Agregar
      </button>
    </div>
  `).join('')
}

mostrarProductos(productos)

// ------------------------------------------------------------
// EJERCICIO 3 — Armar el pedido
// ------------------------------------------------------------

// Renderiza el pedido y calcula el total con reduce
function mostrarPedido() {
  if (pedido.length === 0) {
    listaPedidoEl.innerHTML = '<li class="py-2 text-gray-500 italic">El pedido está vacío</li>'
    totalPedidoEl.textContent = '0'
    return
  }

  // Dibujar lista de items agregados
  listaPedidoEl.innerHTML = pedido.map(p => `
    <li class="py-2 flex justify-between items-center text-gray-700">
      <span>${p.nombre}</span>
      <span class="font-semibold">$${p.precio}.00</span>
    </li>
  `).join('')

  // Calcular total usando .reduce()
  const total = pedido.reduce((suma, p) => suma + p.precio, 0)
  totalPedidoEl.textContent = total
}

// Delegación de eventos para agregar productos al hacer clic en el botón
catalogo.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-agregar')) {
    const id = Number(e.target.dataset.id)
    const productoEncontrado = productos.find(p => p.id === id)
    
    if (productoEncontrado) {
      pedido.push(productoEncontrado)
      mostrarPedido()
    }
  }
})

// Botón para vaciar el pedido
btnVaciar.addEventListener('click', () => {
  pedido = []
  mostrarPedido()
})