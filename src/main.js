import './style.css'
import { productos } from './datos.js'

// Elementos del DOM
const catalogo = document.getElementById('catalogo')
const listaPedidoEl = document.getElementById('lista-pedido')
const totalPedidoEl = document.getElementById('total-pedido')
const btnVaciar = document.getElementById('btn-vaciar')
const contenedorFiltros = document.getElementById('filtros')

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
// EJERCICIO 3 Y EXTRA — Armar el pedido y eliminar ítems
// ------------------------------------------------------------
function mostrarPedido() {
  if (pedido.length === 0) {
    listaPedidoEl.innerHTML = '<li class="py-2 text-gray-500 italic">El pedido está vacío</li>'
    totalPedidoEl.textContent = '0'
    return
  }

  // Renderiza cada ítem con un botón de eliminar individual (EXTRA)
  listaPedidoEl.innerHTML = pedido.map((p, index) => `
    <li class="py-2 flex justify-between items-center text-gray-700 border-b border-gray-100 last:border-none">
      <div>
        <span class="font-medium">${p.nombre}</span>
        <span class="text-sm text-gray-500 ml-2">$${p.precio}.00</span>
      </div>
      <button 
        data-index="${index}" 
        class="btn-eliminar text-red-500 hover:text-red-700 font-semibold text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors">
        Quitar
      </button>
    </li>
  `).join('')

  const total = pedido.reduce((suma, p) => suma + p.precio, 0)
  totalPedidoEl.textContent = total
}

// Agregar producto al pedido
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

// EXTRA: Delegación de eventos para eliminar un ítem individual del pedido
listaPedidoEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    const index = Number(e.target.dataset.index)
    pedido.splice(index, 1) // Remueve el elemento seleccionado en la posición 'index'
    mostrarPedido()
  }
})

// Botón para vaciar todo el pedido
btnVaciar.addEventListener('click', () => {
  pedido = []
  mostrarPedido()
})

// ------------------------------------------------------------
// EJERCICIO 4 — Filtrar por categoría
// ------------------------------------------------------------
contenedorFiltros.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-filtro')) {
    const categoria = e.target.dataset.categoria

    document.querySelectorAll('.btn-filtro').forEach(btn => {
      btn.className = 'btn-filtro bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium py-1 px-3 rounded text-sm transition-colors'
    })
    e.target.className = 'btn-filtro bg-blue-600 text-white font-medium py-1 px-3 rounded text-sm transition-colors'

    if (categoria === 'Todos') {
      mostrarProductos(productos)
    } else {
      const productosFiltrados = productos.filter(p => p.categoria === categoria)
      mostrarProductos(productosFiltrados)
    }
  }
})