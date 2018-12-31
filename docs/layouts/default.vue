<template>
  <div>
    <nuxt />
    <footer>
      <p style="margin-top: 30px; text-align: center;">
        <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 17.32" width="20" height="17.32">
          <path d="M12.309 0L10 4 7.691 0H0l10 17.32L20 0h-7.691z" fill="#4DBA87" />
          <path d="M12.309 0L10 4 7.691 0H4l6 10.392L16 0h-3.691z" fill="#435466" />
        </svg>
        with ❤ by
        <a href="https://stegosource.com">Stegosource</a>
      </p>
    </footer>
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
