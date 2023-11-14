<template>
  <div id="app">
    <!-- <ElTiptap /> -->
    <!-- <VueTwoEditor /> -->
    <div style="width: 80%; margin: 0 auto; margin-bottom: 5rem">
      <ElTipTap />
    </div>
    <!-- <div style="border: 1px solid red; margin: 0 auto">
      <TestReact :test="test" />
    </div> -->
    <div>
      <UploadFile />
    </div>
  </div>
</template>

<script>
// import ElTiptap from "./components/ElementTiptap.vue";
// import VueTwoEditor from "./components/VueTwoEditor.vue";
import ElTipTap from "./components/ElTipTap.vue";
// import TestReact from "./components/TestReact";
import UploadFile from "./components/UploadFile.vue";

export default {
  name: "App",
  components: {
    // VueTwoEditor,
    // ElTiptap,
    ElTipTap,
    // TestReact,
    UploadFile,
  },
  data() {
    return {
      test: "123",
    };
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
