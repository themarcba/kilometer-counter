<template>
  <div id="app" class="grid-container">
    <!-- <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->

    <div class="header">
        Kilometer App 🚴‍♂️
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
    background: #f5f5f5;
    margin: 0;
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

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px auto;
  grid-template-areas: "." "." ".";
  height: 100vh;
}

.header {
    background: #42b983;
    width: 100%;
    color: #fff;
    font-size: 1.7em;
    font-weight: bold;
    line-height: 70px;
}
.header {
    font-size: 1.7em;
    font-weight: bold;
    line-height: 70px;
}
</style>
