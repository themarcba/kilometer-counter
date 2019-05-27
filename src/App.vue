<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

    <h1 id="title" >Kilometerzähler</h1>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
    background: #f5f5f5;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
input {
    color: #2c3e50;
}
</style>
