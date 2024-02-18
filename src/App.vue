<template>
  <Nav></Nav>
  <BarBet></BarBet>
</template>

<script setup>
import Nav from './components/Nav.vue'
import BarBet from './components/BarBet.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
#app {
  font-family: 'Roboto';
}

.box {
  display: flex;
  padding-inline: 10vw;
  padding-block: 2vh;
  align-items: center;
  text-align: center;
}

</style>
