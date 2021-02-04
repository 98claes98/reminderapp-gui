<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap");
body {
  font-family: "Gloria Hallelujah", Helvetica, Arial, sans-serif;
  font-weight: 600;
  background: url("./assets/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.vdatetime {
  input {
    width: 100%;
    border: 1px solid #ced4da;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    text-align: center;
  }
}
</style>
