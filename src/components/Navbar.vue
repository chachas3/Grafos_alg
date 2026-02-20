<template>
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
            <img src="../assets/codemagic-svgrepo-com.svg" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
            Algoritmos
            </a>
        </div>
        <div class="links">
            <router-link class="nav-link" to= "/">Inicio</router-link>
            <router-link class="nav-link" to="/algoritmos">Algoritmos</router-link>
            <router-link class="nav-link" to = "/grafos">Grafos</router-link>
        </div>
    </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #8e44ad;
  padding: 15px 30px;
  color: white;
}
.nav-link {
  padding: 0.5rem 1rem !important; 
  margin: 0 0.25rem; 
  border-radius: 0.5rem; 
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>