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

//Para crear arista
function selectNode(node) {
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
  const r = 25 // radio nodo

  if (from.id === to.id) {

    const loopRadius = 40
    const startX = from.x
    const startY = from.y - r

    return `
      M ${startX} ${startY}
      a ${loopRadius} ${loopRadius} 0 1 1 1 0
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
      x: from.x + 45,
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

</style>