<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
    <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
    </nav>
  <router-view />
</template>

<style>
* {
  padding: 0.1rem;
  margin: 0rem;
}
h1,h2,h3,h4,h5,h6{
  color: #000;
}
</style>
