<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Karla|Lato&display=swap");
body {
  margin: 0;
  padding: 0;
  font-family: "Avenir Next W01", "Lato", "Karla", "Proxima Nova W01", "Rubik",
    -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
    Arial, sans-serif;
}

.shadow{
  animation-name: startSuavized;
  animation-duration: 500ms;
}
.validateError{
  animation: nono 300ms;
}

.vanish{
  animation: colapse 300ms;
}
@keyframes colapse {
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
}
@keyframes nono {
  0%{
    transform: translateX(0%);
  }
  35%{
    transform: translateX(-15%);
  }
  75%{
    transform: translateX(15%);
  }
  100%{
    transform: translateX(0%);
  }
}

@keyframes startSuavized {
  from{
    opacity: 0;
    transform: scale(0.9);
    // transform: translateY(35%);
  }
  to{
    opacity: 1;
    transform: scale(1);
    // transform: translateY(0%);

  }
}
.rounded{
  border-radius:0.8rem !important;
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
    font-family:  "Avenir Next W01","Lato", "Karla" ,"Proxima Nova W01", "Rubik",
      -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue",
      Arial, sans-serif;
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
