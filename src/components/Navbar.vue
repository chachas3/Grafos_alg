<template>
    <nav class="navbar">
        <div class="navbar-left">
            <a class="navbar-brand" href="#">
            <img src="../assets/codemagic-svgrepo-com.svg" alt="Logo" width="30" height="24" class="logo">
            Algoritmos
            </a>
        </div>
        <div class="navbar-right">
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
  padding: 15px 50px;
  width: 100%;
}
.navbar-brand {
  color: white;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}
.navbar-right {
  display: flex;
  gap: 20px;
}
.nav-link {
  color: white !important;
  padding: 0.5rem 1rem !important; 
  margin: 0 0.25rem; 
  border-radius: 0.5rem; 
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-link:hover {
  color: #daca88 !important;
}
</style>