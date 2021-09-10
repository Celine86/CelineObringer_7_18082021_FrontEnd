<template>
  <div id="app">
    <Header></Header>
      <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: "App",
  components: {
    Header, 
    Footer
  }
}

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
* {
  font-family: 'Roboto', sans-serif;
  padding: 0rem;
  margin: 0rem;
  box-sizing: border-box;
}
body {
  background-image: linear-gradient(180deg, rgba(220, 20, 60) 50%, rgba(255, 255, 255) 100%);
  min-height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
}
#app {
  max-width: 100%;
}
h1,h2,h3,h4,h5,h6{
  color: #f2f2f2;
}
p{
  color: #f2f2f2;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
}
.main {
  height: 85vh;
}
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5vh;
}
</style>
