<template>
  <div id="app">
    <!-- :customModules="customModulesForEditor" -->
    <vue-editor
      id="editor"
      :editorToolbar="customToolbar"
      :editorOptions="editorSettings"
      v-model="content"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
    >
    </vue-editor>
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
      customToolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ color: [] }, { background: [] }],
        ["link", "image", "video", "formula"],
        [{ direction: "rtl" }],
        ["clean"],
      ],
    };
  },
  methods: {
    getText() {
      console.log(this.content);
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log(file);
      console.log(Editor);
      console.log(cursorLocation);
      console.log(resetUploader);
    },
  },
};
/* 
  [{ font: [] }],
  
  [{ header: [false, 1, 2, 3, 4, 5, 6] }],
  
  [{ size: ["small", false, "large", "huge"] }],
  
  ["bold", "italic", "underline", "strike"],

  [
    { align: "" },
    { align: "center" },
    { align: "right" },
    { align: "justify" }
  ],

  [{ header: 1 }, { header: 2 }],

  ["blockquote", "code-block"],

  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],

  [{ script: "sub" }, { script: "super" }],

  [{ indent: "-1" }, { indent: "+1" }],

  [{ color: [] }, { background: [] }],

  ["link", "image", "video", "formula"],

  [{ direction: "rtl" }],
  
  ["clean"]
 */
</script>
