<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-size: 18px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  color: #34495e;
}

.container {
  min-height: 100vh;
  max-width: 900px;
  margin: 50px auto;
}

h1,
h2 {
  font-weight: 400;
}

h1 {
  font-size: 100px;
  letter-spacing: 1px;
  text-align: center;
}

h2 {
  font-size: 42px;
  word-spacing: 5px;
  text-align: center;
}

pre {
  padding: 15px;
  background: #34495e;
  color: white;
  overflow: auto;
}

.list-unstyled {
  padding-left: 0;
  list-style-type: none;
}
</style>
