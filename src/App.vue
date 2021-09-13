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
  background-image: url("./assets/groupomaniabackground.jpg");
  min-height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
}
#app {
  max-width: 100%;
}
h1,h2,h3,h4,h5,h6{
  color: #000080;
}
p{
  color: #000080;
}
main {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 100%;
}
.card {
  border: 0.2rem solid #dc143c;
  background: #f2f2f2;
  padding: 2rem;
  margin: 2rem;
  max-width: 50rem;
}
.card:hover {
  text-decoration: none;
  border: 0.2rem solid #000080;
}
.card__child {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0rem;
    padding: 0.5rem 0rem;
}
.card__btn {
    border: none;
    padding: 0.4rem 0.4rem;
    margin: 0.2rem 0.4rem;
    cursor: pointer;
    background-color: #000080;
    color: #f2f2f2;
    font-weight: bold;
    font-size: 1rem;
}
.card__btn--disabled {
    background: #dc143c;
    color: #f2f2f2;
}
.card__btn--disabled:hover {
    cursor: not-allowed;
    background: #f2f2f2;
    color: #dc143c;
}
.card__input {
    color: #000080;
    font-weight: bold;
}
.card__author {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 1rem;
}
.card a {
  text-decoration: none;
}
.card__postimage {
  width: 100%;
  height: auto;
}
.card__avatarimage {
  width: 100%;
  max-width: 35px;
  height: auto;
  margin: 0 1rem;
}
</style>
