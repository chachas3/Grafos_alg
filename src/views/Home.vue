<template>
  <section class="hero">
    <div class="hero-container">
      <div class="hero-image">
        <img src="../assets/UCBlogo.svg" alt="Algoritmos">
      </div>
      <div class="hero-text">
        <h1>Análisis de<br>Algoritmos</h1>
        <p>
          Explora conceptos fundamentales de algoritmos y crea
          grafos interactivos.
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  background-color: #fff9c4;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-container {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
}

.hero-image img {
  width: 450px;
  max-width: 100%;
}

.hero-text {
  max-width: 500px;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
}

.hero-text p {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
}
</style>