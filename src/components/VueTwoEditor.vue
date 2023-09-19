<template>
  <div id="app">
    <!-- :customModules="customModulesForEditor" -->
    <vue-editor :editorOptions="editorSettings" v-model="content"> </vue-editor>
    <button @click="getText">click</button>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "VueTwoEditor",
  components: {
    VueEditor,
  },
  data() {
    return {
      content: "<h1>Initial Content</h1>",
      // customModulesForEditor: [
      //   { alias: "imageDrop", module: ImageDrop },
      //   { alias: "imageResize", module: ImageResize },
      // ],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
        },
      },
    };
  },
  methods: {
    getText() {
      console.log(this.content);
    },
  },
};
</script>
