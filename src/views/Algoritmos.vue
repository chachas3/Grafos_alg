<template>
    <section class="algoritmos">
        <div class="header">
            <h1>Conceptos de Algoritmos</h1>
        </div>
        <section class="concept-section">
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
            <h2>Características</h2>
            <ul>
                <li><strong>Preciso:</strong>Cada paso está claramente definido.</li>
                <li><strong>Finito: </strong> Debe terminar en un número determinado de pasos.</li>
                <li><strong>Definido: </strong> el mismo resultado con la misma entrada.</li>
                <li><strong>Ordenado: </strong> Sigue una secuencia lógica.</li>
                <li><strong>General: </strong> Puede aplicarse a múltiples casos similares.</li>
            </ul>
            <div class="image-container">
                <img src="../assets/algoritmo.jpg">
            </div>
            <h2>Aplicaciones de Algoritmos</h2>
            <p>
                Los algoritmos se encuentran presentes en diversos campos, ya que tienen diferentes usos
                en los sistemas tecnológicos modernos.
            </p>
            <ul>
                <li><strong>Procesamiento de datos: </strong> los algoritmos permiten 
                    organizar y analizar grandes volúmenes de información de manera eficiente.</li>
                <li>Inteligencia artificial y aprendizaje automático: gracias a ellos, 
                    las máquinas aprenden patrones y predicen comportamientos futuros.</li>
                <li>Redes y comunicaciones: se utilizan para reducir la cantidad de datos que
                    necesitan ser transmitidos por internet sin sacrificar la calidad.</li>
                <li>Automatización: controlan el comportamiento de los robots y 
                    permiten automatizar tareas repetitivas y rutinarias.</li>
                <li>Optimización de recursos: ayudan a mejorar el uso de recursos, como 
                    en la programación de rutas de transporte, o de sistemas como centrales 
                    eléctricas o cadenas de suministro.</li>
            </ul>
            <div class="videos-section">
                <h2>Videos recomendados</h2>
                <div class="videos-grid">
                    <iframe 
                        src="https://www.youtube.com/watch?v=U3CGMyjzlvM"
                        title="Video 1"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>

                    <iframe 
                        src="https://www.youtube.com/watch?v=RSJrBEhdZxw"
                        title="Video 2"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>

                    <iframe 
                        src="https://www.youtube.com/watch?v=EkObhToiseo"
                        title="Video 3"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>
            </div>
            </div>
            
        </section>
    </section>
</template>

<style scoped>
.algoritmos {
  padding: 3rem 2rem;
  max-width: 1000px;
  margin: auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}
.concept-section{
    text-align: left;
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
  color: #8e44ad;
}
.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.videos-grid iframe {
  width: 100%;
  height: 200px;
  border-radius: 12px;
}
</style>