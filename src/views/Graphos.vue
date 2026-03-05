<template>
  <section class="grafos">
    <div class="header">
      <h1>Grafos</h1>
      <p>Doble clic para crear nodo • Click en dos nodos para arista</p>
    </div>

    <div class="controls">
      <label>
        <input type="checkbox" v-model="directed" />
        Dirigido
      </label>

      <button @click="toggleDelete"
              :class="{ active: deleteMode }">
        Eliminar
      </button>

      <button @click="toggleEdit"
              :class="{ active: editMode }">
        Editar
      </button>

      <button @click="clearAll">
        Limpiar todo
      </button>

      <button @click="exportGraph">
        Exportar
      </button>

      <button @click="triggerImport">
        Importar
      </button>

      <input
        type="file"
        ref="fileInput"
        accept=".json"
        style="display:none"
        @change="importGraph"
      />

    </div>

    <div class="canvas"
         @dblclick="createNode"
         @click="handleCanvasClick">

      <svg ref="svgRef" width="100%" height="600">
        <defs>
            <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="10"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
            >
                <path d="M0,0 L0,6 L9,3 z" fill="#5e3370" />
            </marker>
        </defs>

        <!-- ARISTAS -->
        <g v-for="(edge, index) in edges" :key="edge.id">
          <path
            :d="getEdgePath(edge)"
            stroke="#111111"
            stroke-width="2"
            fill="none"
            :marker-end="edge.directed ? 'url(#arrow)': null"
            @click.stop="handleEdgeClick(edge)"
          />

          <!-- peso -->
          <text
            :x="getWeightPosition(edge).x"
            :y="getWeightPosition(edge).y"
            fill="#000"
            font-size="14"
          >
            {{ edge.weight }}
          </text>
        </g>

        <!-- NODOS -->
        <g v-for="node in nodes" :key="node.id" @click.stop="selectNode(node)" style="cursor: pointer">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="25"
            fill="#fff"
            stroke="#111111"
            stroke-width="3"
          />

          <text
            :x="node.x"
            :y="node.y + 5"
            text-anchor="middle"
            font-weight="bold"
          >
            {{ node.label }}
          </text>
        </g>

      </svg>
      <div v-if="directed && adjacencyData" class="matrix-section">

        <h2><strong>Matriz de Adyacencia</strong></h2>

        <table>
          <thead>
            <tr>
              <th></th>
              <th v-for="node in nodes" :key="node.id">
                {{ node.label }}
              </th>
              <th>Σ fila</th>
              <th>Salidas</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(row, i) in adjacencyData.matrix" :key="i">
              <th>{{ nodes[i].label }}</th>

              <td v-for="(value, j) in row" :key="j">
                {{ value }}
              </td>

              <td>{{ adjacencyData.rowSums[i] }}</td>
              <td>{{ adjacencyData.outDegree[i] }}</td>
            </tr>

            <tr>
              <th>Σ columna</th>
              <td v-for="(sum, j) in adjacencyData.colSums" :key="j">
                {{ sum }}
              </td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <th>Entradas</th>
              <td v-for="(deg, j) in adjacencyData.inDegree" :key="j">
                {{ deg }}
              </td>
              <td></td>
              <td></td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const nodes = ref([])
const edges = ref([])
const selectedNode = ref(null)
const directed = ref(false)
const deleteMode = ref(false)
const editMode = ref(false)
const fileInput = ref(null)
const svgRef = ref(null)

let nodeCount = 0
let edgeCount = 0

// MATRIZ
const adjacencyData = computed(() => {

  if (!directed.value) return null

  const n = nodes.value.length
  const matrix = Array.from({ length: n }, () =>
    Array(n).fill(0)
  )

  const inDegree = Array(n).fill(0)
  const outDegree = Array(n).fill(0)

  // mapa id - índice
  const indexMap = {}
  nodes.value.forEach((node, index) => {
    indexMap[node.id] = index
  })

  // recorrer aristas
  edges.value.forEach(edge => {
    if (!edge.directed) return

    const i = indexMap[edge.from.id]
    const j = indexMap[edge.to.id]

    matrix[i][j] += edge.weight
    outDegree[i] += 1
    inDegree[j] += 1
  })

  const rowSums = matrix.map(row =>
    row.reduce((a, b) => a + b, 0)
  )

  const colSums = Array(n).fill(0)
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      colSums[j] += matrix[i][j]
    }
  }

  return {
    matrix,
    rowSums,
    colSums,
    inDegree,
    outDegree
  }
})

// Crear nodo
function createNode(event) {
  if (deleteMode.value) return

  const rect = svgRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const label = prompt("Nombre del nodo:")
  if (!label) return

  nodes.value.push({
    id: nodeCount++,
    x,
    y,
    label
  })
}

//Para crear arista
function selectNode(node) {
  if (editMode.value) {
    const newName = prompt("Nuevo nombre del nodo:", node.label)

    if (newName) {
      node.label = newName
    }
    return
  }

  if (deleteMode.value) {
    deleteElement(node, 'node')
    return
  }

  if (!selectedNode.value) {
    selectedNode.value = node
  } else {
    if (selectedNode.value.id === node.id) {
      // permite bucle
    }

    let weight = prompt("Peso (solo números):", "1")
    if (weight === null) {
      selectedNode.value = null
      return
    }

    weight = Number(weight)

    if (isNaN(weight)) {
      alert("Solo se permiten números.")
      selectedNode.value = null
      return
    }

    edges.value.push({
      id: edgeCount++,
      from: selectedNode.value,
      to: node,
      weight,
      directed: directed.value
    })

    selectedNode.value = null
  }
}

function toggleEdit(){

  editMode.value = !editMode.value

  if(editMode.value){
    deleteMode.value = false
  }
}
function toggleDelete(){

  deleteMode.value = !deleteMode.value

  if(deleteMode.value){
    editMode.value = false
  }
}

function handleEdgeClick(edge) {

  if (deleteMode.value) {
    deleteElement(edge, 'edge')
    return
  }

  if (editMode.value) {

    let newWeight = prompt("Nuevo peso:", edge.weight)

    if (newWeight === null) return

    newWeight = Number(newWeight)

    if (isNaN(newWeight)) {
      alert("Solo números")
      return
    }

    edge.weight = newWeight
  }
}

// Eliminar nodo o arista
function deleteElement(element, type) {
  if (!deleteMode.value) return

  if (type === 'node') {
    edges.value = edges.value.filter(
      e => e.from !== element && e.to !== element
    )
    nodes.value = nodes.value.filter(n => n !== element)
  }

  if (type === 'edge') {
    edges.value = edges.value.filter(e => e !== element)
  }
}

async function exportGraph() {

  const data = {
    nodes: nodes.value,
    edges: edges.value.map(e => ({
      id: e.id,
      from: e.from.id,
      to: e.to.id,
      weight: e.weight,
      directed: e.directed
    })),
    directed: directed.value
  }

  const json = JSON.stringify(data, null, 2)
  if ('showSaveFilePicker' in window) {

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "grafo.json",
        types: [
          {
            description: "Archivo de grafo",
            accept: { "application/json": [".json"] }
          }
        ]
      })
      const writable = await handle.createWritable()

      await writable.write(json)

      await writable.close()

    } catch (err) {
      console.log("Guardado cancelado")
    }
  }else {

    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "grafo.json"

    a.click()

    URL.revokeObjectURL(url)
  }
  
}

function triggerImport() {
  fileInput.value.click()
}

function importGraph(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {

    const data = JSON.parse(e.target.result)

    clearAll()

    nodes.value = data.nodes
    directed.value = data.directed

    const nodeMap = {}

    nodes.value.forEach(node => {
      nodeMap[node.id] = node
    })

    edges.value = data.edges.map(e => ({
      id: e.id,
      from: nodeMap[e.from],
      to: nodeMap[e.to],
      weight: e.weight,
      directed: e.directed
    }))

    nodeCount = Math.max(...nodes.value.map(n => n.id)) + 1
    edgeCount = Math.max(...edges.value.map(e => e.id)) + 1
  }

  reader.readAsText(file)
  event.target.value = ""
}

// Limpiar todo
function clearAll() {
  nodes.value = []
  edges.value = []

  selectedNode.value = null
  deleteMode.value = false
  editMode.value = false

  nodeCount = 0
  edgeCount = 0
}

// Calcular curva para múltiples aristas
function getEdgePath(edge) {
  const { from, to } = edge
  const r = 25 // radio nodo

  if (from.id === to.id) {

    const loopRadius = 28
    const startX = from.x
    const startY = from.y - r

    const endX = from.x + 1
    const endY = from.y - r

    return `
      M ${startX} ${startY}
      C ${from.x + 50} ${from.y - 60},
        ${from.x - 50} ${from.y - 60},
        ${endX} ${endY}
    `
  }

  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  const normX = dx / distance
  const normY = dy / distance

  // recortar inicio y fin en el borde del nodo
  const startX = from.x + normX * r
  const startY = from.y + normY * r
  const endX = to.x - normX * r
  const endY = to.y - normY * r

  const offset = 40
  const controlX = (startX + endX) / 2 - normY * offset
  const controlY = (startY + endY) / 2 + normX * offset

  return `
    M ${startX} ${startY}
    Q ${controlX} ${controlY}
      ${endX} ${endY}
  `
}

// Posición del peso
function getWeightPosition(edge) {
  const { from, to } = edge
  const r = 25

  if (from.id === to.id) {
    return {
      x: from.x + 35,
      y: from.y - 45
    }
  }

  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  const normX = dx / distance
  const normY = dy / distance

  const startX = from.x + normX * r
  const startY = from.y + normY * r
  const endX = to.x - normX * r
  const endY = to.y - normY * r

  const offset = 40

  return {
    x: (startX + endX) / 2 - normY * offset,
    y: (startY + endY) / 2 + normX * offset
  }
}

function handleCanvasClick() {
  selectedNode.value = null
}
</script>

<style scoped>

.grafos {
  width: 100%;
  min-height: 100vh;
  background: #fff8b5;
  padding: 2rem;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

button {
  background: #8e44ad;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

button.active {
  background: #c0392b;
}

.canvas {
  width: 100%;
  height: 70vh;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

svg {
  cursor: crosshair;
}

.matrix-section {
  background: rgb(200, 239, 141);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

table {
  border-collapse: collapse;
  margin: auto;
}

th, td {
  border: 1px solid #444;
  padding: 6px 10px;
  text-align: center;
}

th {
  background: #eee;
}

</style>