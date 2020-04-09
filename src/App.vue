<template>
  <router-view />
</template>



<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla|Lato&display=swap");
body {
  margin: 0;
  padding: 0;
}

.title_primary {
  border-bottom: 1px solid #cdd2d8;
  width: 100%;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  h1,
  h1,
  h3,
  h4,
  h5,
  h6 {
    width: 100%;
    padding: 0;
    margin: 0;
    margin-bottom: 0;
  }
  .f_primary {
    font-weight: 300;
    color: #222;
    font-family: "Lato", "Karla", "Avenir Next W01", "Proxima Nova W01", "Rubik",
      -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
      Arial, sans-serif;
  }
  .f_secundary {
    font-weight: 600;
    font-family: "Karla", "Lato", "Avenir Next W01", "Proxima Nova W01", "Rubik",
      -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    color: #444;
  }
  .text {
    border-bottom: 3px solid #cdd2d8;
  }
}
</style>
