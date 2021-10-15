<template>
  <div id="app">
    <SaveButton/>
    <Loader/>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SaveButton from './components/SaveButton.vue'
import Loader from './components/Loader.vue'
@Component({
  components: {
    SaveButton,
    Loader
  }
})
export default class Editor extends Vue {}

</script>
<style lang="scss">
@tailwind base;
@layer base {
  h1 {
    @apply text-9xl;
    @apply font-bold;
  }
  h2 {
    @apply text-8xl;
    @apply font-bold;
  }
  h3 {
    @apply text-7xl;
    @apply font-bold;
  }
  h4 {
    @apply text-6xl;
    @apply font-bold;
  }
  h5 {
    @apply text-3xl;
  }
  h6 {
    @apply text-2xl;
  }
}
@tailwind components;
@tailwind utilities;
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
}
body{
  @apply bg-gray-50
}
.bg-gray-def{
  @apply bg-gray-100
}
.bg-red-def{
  @apply bg-red-100
}
.bg-yellow-def{
  @apply bg-yellow-100
}
.bg-green-def{
  @apply bg-green-100
}
.bg-blue-def{
  @apply bg-blue-100
}
.bg-indigo-def{
  @apply bg-indigo-100
}
.bg-purple-def{
  @apply bg-purple-100
}
.bg-pink-def{
  @apply bg-pink-100
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
