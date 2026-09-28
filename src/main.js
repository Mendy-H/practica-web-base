import './style.css'
import { productos } from './datos.js'

// Elementos del DOM
const catalogo = document.getElementById('catalogo')
const listaPedidoEl = document.getElementById('lista-pedido')
const totalPedidoEl = document.getElementById('total-pedido')
const btnVaciar = document.getElementById('btn-vaciar')
const contenedorFiltros = document.getElementById('filtros')

// Elementos del formulario de cliente (Ejercicio 5)
const formCliente = document.getElementById('form-cliente')
const inputNombre = document.getElementById('nombre')
const inputTelefono = document.getElementById('telefono')
const inputCorreo = document.getElementById('correo')

const errorNombre = document.getElementById('error-nombre')
const errorTelefono = document.getElementById('error-telefono')
const errorCorreo = document.getElementById('error-correo')
const errorPedido = document.getElementById('error-pedido')

// Ejercicio 6: contenedor de pedidos registrados
const contenedorPedidos = document.getElementById('pedidos-registrados')

// Ejercicio 7: contenedor de filtros por estado
const contenedorFiltrosEstado = document.getElementById('filtros-estado')

// Arreglo para guardar los productos seleccionados
let pedido = []

// Ejercicio 6: estados y colores
const ESTADOS = ['Pendiente', 'En preparación', 'Entregado']
const COLORES = {
  'Pendiente': 'bg-yellow-100 border-yellow-400',
  'En preparación': 'bg-blue-100 border-blue-400',
  'Entregado': 'bg-green-100 border-green-400'
}

// Ejercicio 7: localStorage (los pedidos registrados sobreviven al recargar)
function cargarPedidos() {
  try {
    return JSON.parse(localStorage.getItem('pedidosRegistrados')) || []
  } catch {
    return []
  }
}

function guardarPedidos() {
  localStorage.setItem('pedidosRegistrados', JSON.stringify(pedidosRegistrados))
}

// Ejercicio 6 y 7: pedidos registrados (se cargan de localStorage al abrir la página)
const pedidosRegistrados = cargarPedidos()

// Ejercicio 7: filtro de estado seleccionado
let filtroEstado = 'Todos'

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

// Delegación de eventos para eliminar un ítem
listaPedidoEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-eliminar')) {
    const index = Number(e.target.dataset.index)
    pedido.splice(index, 1)
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

// ------------------------------------------------------------
// EJERCICIO 5 — Validación del Formulario de Cliente
// (+ EJERCICIO 6: registrar el pedido cuando es válido)
// ------------------------------------------------------------
formCliente.addEventListener('submit', (evento) => {
  evento.preventDefault();

  let esValido = true;

  const nombreVal = inputNombre.value.trim();
  if (!nombreVal) {
    errorNombre.classList.remove('hidden');
    inputNombre.classList.add('border-red-500');
    esValido = false;
  } else {
    errorNombre.classList.add('hidden');
    inputNombre.classList.remove('border-red-500');
  }

  const telefonoVal = inputTelefono.value.trim();
  if (!/^\d{10}$/.test(telefonoVal)) {
    errorTelefono.classList.remove('hidden');
    inputTelefono.classList.add('border-red-500');
    esValido = false;
  } else {
    errorTelefono.classList.add('hidden');
    inputTelefono.classList.remove('border-red-500');
  }

  const correoVal = inputCorreo.value.trim();
  if (!/^\S+@\S+\.\S+$/.test(correoVal)) {
    errorCorreo.classList.remove('hidden');
    inputCorreo.classList.add('border-red-500');
    esValido = false;
  } else {
    errorCorreo.classList.add('hidden');
    inputCorreo.classList.remove('border-red-500');
  }

  if (pedido.length === 0) {
    errorPedido.classList.remove('hidden');
    esValido = false;
  } else {
    errorPedido.classList.add('hidden');
  }

  if (esValido) {
    // Ejercicio 6: registrar el pedido con una COPIA de los productos
    pedidosRegistrados.push({
      id: Date.now(),
      cliente: {
        nombre: nombreVal,
        telefono: telefonoVal,
        correo: correoVal
      },
      productos: [...pedido],
      total: pedido.reduce((suma, p) => suma + p.precio, 0),
      estado: 'Pendiente'
    });

    // Ejercicio 7: guardar en localStorage
    guardarPedidos();

    // Vaciar el pedido, limpiar el formulario y redibujar
    pedido = [];
    formCliente.reset();
    mostrarPedido();
    mostrarPedidosRegistrados();
  }
});

// ------------------------------------------------------------
// EJERCICIO 7 — Filtros por estado con contador
// ------------------------------------------------------------
function mostrarFiltrosEstado() {
  const opciones = ['Todos', ...ESTADOS]

  contenedorFiltrosEstado.innerHTML = opciones.map(op => {
    const cantidad = op === 'Todos'
      ? pedidosRegistrados.length
      : pedidosRegistrados.filter(p => p.estado === op).length

    const clases = op === filtroEstado
      ? 'bg-blue-600 text-white'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'

    return `<button data-estado="${op}" class="${clases} font-medium py-1 px-3 rounded text-sm transition-colors">${op} (${cantidad})</button>`
  }).join('')
}

contenedorFiltrosEstado.addEventListener('click', (e) => {
  const estado = e.target.dataset.estado
  if (!estado) return
  filtroEstado = estado
  mostrarPedidosRegistrados()
})

// ------------------------------------------------------------
// EJERCICIO 6 — Pedidos registrados con estado
// ------------------------------------------------------------
function mostrarPedidosRegistrados() {
  mostrarFiltrosEstado()

  const visibles = filtroEstado === 'Todos'
    ? pedidosRegistrados
    : pedidosRegistrados.filter(p => p.estado === filtroEstado)

  if (visibles.length === 0) {
    contenedorPedidos.innerHTML = '<p class="text-gray-500 italic">No hay pedidos para mostrar.</p>'
    return
  }

  contenedorPedidos.innerHTML = visibles.map(p => `
    <div class="border-2 rounded-lg p-4 shadow-sm ${COLORES[p.estado]}">
      <p class="font-bold text-gray-800">${p.cliente.nombre}</p>
      <ul class="text-sm text-gray-700 my-2 list-disc list-inside">
        ${p.productos.map(prod => `<li>${prod.nombre}</li>`).join('')}
      </ul>
      <p class="font-semibold text-gray-800">Total: $${p.total}.00</p>
      <p class="text-sm text-gray-700 mt-1">Estado: <strong>${p.estado}</strong></p>
      ${p.estado !== 'Entregado'
        ? `<button data-avanzar="${p.id}" class="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-3 rounded transition-colors">Avanzar estado</button>`
        : ''}
    </div>
  `).join('')
}

// Delegación de eventos: avanzar el estado de un pedido
contenedorPedidos.addEventListener('click', (e) => {
  const id = e.target.dataset.avanzar
  if (!id) return

  const pedidoEncontrado = pedidosRegistrados.find(p => p.id === Number(id))
  if (!pedidoEncontrado) return

  const posicion = ESTADOS.indexOf(pedidoEncontrado.estado)
  if (posicion < ESTADOS.length - 1) {
    pedidoEncontrado.estado = ESTADOS[posicion + 1]
    guardarPedidos()
  }
  mostrarPedidosRegistrados()
})

// Dibujar el estado inicial (incluye los pedidos guardados en localStorage)
mostrarPedidosRegistrados()