<template>
  <div id="app">
    <!-- <ElTiptap /> -->
    <div style="border: 1px solid red; width: 80%; margin: 0 auto">
      <VueTwoEditor />
    </div>
    <!-- <div style="border: 1px solid red">
      <test-ui />
    </div> -->
    <paste-test />
    <div style="width: 80%; margin: 0 auto">
      <ElTipTap />
    </div>
    <!-- <div>
      <DnDTest />
    </div> -->
  </div>
</template>

<script>
import VueTwoEditor from "./components/VueTwoEditor.vue";
// import DnDTest from "./components/DnDTest.vue";
// // import ElTiptap from "./components/ElementTiptap.vue";
import ElTipTap from "./components/ElTipTap.vue";
// import PasteTest from "./components/PasteTest.vue";
// import TestUi from "./components/TestUi.vue";

export default {
  name: "App",
  components: {
    VueTwoEditor,
    // ElTiptap,
    ElTipTap,
    // PasteTest,
    // DnDTest,
    // TestUi,
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
