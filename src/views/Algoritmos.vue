<template>
    <section class="algoritmos">
        <div class="header">
            <h1>Conceptos de Algoritmos</h1>
        </div>
        <div class="card">
            <h2>¿Qué es un algoritmo?</h2>
                <p>
                    Un algoritmo es una secuencia ordenada y finita de instrucciones para realizar un cálculo, 
                    desarrollar una tarea o resolver un problema específico. Cada paso en un algoritmo está bien 
                    definido y puede ser ejecutado para producir un resultado, que puede tratarse de un proceso sencillo,
                    como una operación aritmética, o de una compleja serie de operaciones utilizadas en 
                    machine learning para analizar grandes conjuntos de datos y hacer predicciones.
                    Los algoritmos son la base de la programación y se utilizan para diseñar programas que 
                    ejecuten tareas específicas.
                </p>
        </div>
        <div class="card">
            <h2>Características</h2>
            <ul>
                <li><strong>Preciso:</strong>Cada paso está claramente definido.</li>
                <li><strong>Finito: </strong> Debe terminar en un número determinado de pasos.</li>
                <li><strong>Definido: </strong> el mismo resultado con la misma entrada.</li>
                <li><strong>Ordenado: </strong> Sigue una secuencia lógica.</li>
                <li><strong>General: </strong> Puede aplicarse a múltiples casos similares.</li>
            </ul>
        </div>
            
        <div class="image-container">
            <img src="../assets/algoritmo.jpg">
        </div>
        
        <div class="card">
            <h2>Aplicaciones de Algoritmos</h2>
                <p>
                    Los algoritmos se encuentran presentes en diversos campos, ya que tienen diferentes usos
                    en los sistemas tecnológicos modernos.
                </p>
            <ul>
                <li><strong>Procesamiento de datos: </strong> Los algoritmos permiten 
                    organizar y analizar grandes volúmenes de información de manera eficiente.</li>
                <li><strong>Inteligencia artificial y aprendizaje automático: </strong> Gracias a ellos, 
                    las máquinas aprenden patrones y predicen comportamientos futuros.</li>
                <li><strong>Redes y comunicaciones: </strong> Se utilizan para reducir la cantidad de datos que
                    necesitan ser transmitidos por internet sin sacrificar la calidad.</li>
                <li><strong>Automatización: </strong> Controlan el comportamiento de los robots y 
                    permiten automatizar tareas repetitivas y rutinarias.</li>
                <li><strong>Optimización de recursos: </strong> Ayudan a mejorar el uso de recursos, como 
                    en la programación de rutas de transporte, o de sistemas como centrales 
                    eléctricas o cadenas de suministro.</li>
                </ul>
        </div>
            
        <div class="videos-section">
            <h2>Videos recomendados</h2>
            <div class="videos-grid">
                <iframe 
                    src="https://www.youtube.com/embed/U3CGMyjzlvM"
                    title="Video 1"
                    frameborder="0"
                    allowfullscreen>
                </iframe>

                <iframe 
                    src="https://www.youtube.com/embed/RSJrBEhdZxw"
                    title="Video 2"
                    frameborder="0"
                    allowfullscreen>
                </iframe>

                <iframe 
                    src="https://www.youtube.com/embed/EkObhToiseo"
                    title="Video 3"
                    frameborder="0"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    </section>
</template>

<style scoped>
.algoritmos {
  padding: 4rem 2rem;
  background-color: #fff9c4;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}
.card {
  padding: 2rem;
  margin-bottom: 2.5rem;
  border-radius: 16px;
  background-color: #e5dea1;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.card h2 {
  margin-bottom: 1rem;
  color: #111111;
}

.card ul {
  padding-left: 1.5rem;
}
.card li {
  margin-bottom: 0.5rem;
}
.image-container {
  text-align: center;
  margin: 2rem 0;
}
.videos-section {
  margin-top: 3rem;
}

.videos-section h2 {
  text-align: center;
  margin-bottom: 2rem;
}
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.videos-grid iframe {
  width: 100%;
  height: 250px;
  border-radius: 12px;
}
.card,
.header,
.videos-section,
.image-container {
  width: 100%;
  max-width: 1000px;
}
</style>