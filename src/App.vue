<template>
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
.app {
  min-height: 100vh;
  background: #fff8b5;
}
</style>