<template>
  <div id="app">
    <!-- <ElTiptap /> -->
    <!-- <VueTwoEditor /> -->
    <div style="width: 80%; margin: 0 auto">
      <ElTipTap />
    </div>
  </div>
</template>

<script>
// import ElTiptap from "./components/ElementTiptap.vue";
// import VueTwoEditor from "./components/VueTwoEditor.vue";
import ElTipTap from "./components/ElTipTap.vue";

export default {
  name: "App",
  components: {
    // VueTwoEditor,
    // ElTiptap,
    ElTipTap,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
