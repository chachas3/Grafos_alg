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

      <button @click="deleteMode = !deleteMode"
              :class="{ active: deleteMode }">
        Eliminar
      </button>

      <button @click="clearAll">
        Limpiar todo
      </button>
    </div>

    <div class="canvas"
         @dblclick="createNode"
         @click="handleCanvasClick">

      <svg ref="svgRef" width="100%" height="600">

        <!-- ARISTAS -->
        <g v-for="(edge, index) in edges" :key="edge.id">
          <path
            :d="getEdgePath(edge)"
            stroke="#5e3370"
            stroke-width="2"
            fill="none"
            @click.stop="deleteElement(edge, 'edge')"
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
        <g v-for="node in nodes" :key="node.id">
          <circle
            :cx="node.x"
            :cy="node.y"
            r="25"
            fill="#fff"
            stroke="#8e44ad"
            stroke-width="3"
            @click.stop="selectNode(node)"
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
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const nodes = ref([])
const edges = ref([])
const selectedNode = ref(null)
const directed = ref(false)
const deleteMode = ref(false)
const svgRef = ref(null)

let nodeCount = 0
let edgeCount = 0

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

// Selección para crear arista
function selectNode(node) {
  if (deleteMode.value) {
    deleteElement(node, 'node')
    return
  }

  if (!selectedNode.value) {
    selectedNode.value = node
  } else {
    const weight = prompt("Peso de la arista:", "1")
    if (weight !== null) {
      edges.value.push({
        id: edgeCount++,
        from: selectedNode.value,
        to: node,
        weight,
        directed: directed.value
      })
    }
    selectedNode.value = null
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

// Limpiar todo
function clearAll() {
  nodes.value = []
  edges.value = []
}

// Calcular curva para múltiples aristas
function getEdgePath(edge) {
  const { from, to } = edge

  if (from === to) {
    // Bucle
    return `
      M ${from.x} ${from.y - 25}
      C ${from.x + 40} ${from.y - 60},
        ${from.x - 40} ${from.y - 60},
        ${from.x} ${from.y - 25}
    `
  }

  const dx = to.x - from.x
  const dy = to.y - from.y
  const dr = Math.sqrt(dx * dx + dy * dy)

  const offset = getParallelOffset(edge)

  return `
    M ${from.x} ${from.y}
    Q ${(from.x + to.x) / 2 + offset}
      ${(from.y + to.y) / 2 - offset}
      ${to.x} ${to.y}
  `
}

// Evitar superposición
function getParallelOffset(edge) {
  const sameEdges = edges.value.filter(
    e => e.from === edge.from && e.to === edge.to
  )
  const index = sameEdges.indexOf(edge)
  return index * 20
}

// Posición del peso
function getWeightPosition(edge) {
  const { from, to } = edge
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - 10
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
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

svg {
  cursor: crosshair;
}

</style>