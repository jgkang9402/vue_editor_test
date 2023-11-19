<template>
  <div style="height: 700px">
    <div
      @drop.prevent="handleImageDrop"
      @dragover.prevent
      @dragenter="dragTestThree"
      class="el-tiptap-editor__wrapper"
    >
      <el-tiptap
        ref="myEditor"
        :extensions="extensions"
        :content="content"
        :spellcheck="false"
        :menu-bubble-options="{ 'keep-in-bounds': false }"
        placeholder="내용을 입력해주세요 ..."
        style="height: 100%; overflow-y: auto"
        @onUpdate="onUpdateEvent"
        @onPaste="onPasteEvent"
        @onTransaction="onTransactionEvent"
      />
    </div>
    <div>
      <modal-wrapper
        v-if="isImgModalOpen"
        :isCloseButtonVisible="true"
        @onCloseModal="toggleModal"
      >
        <div
          @drop.prevent="handleImageDrop"
          @dragover.prevent
          @dragenter="dragTest"
          @dragleave="dragTestTwo"
          class="tt"
          :class="ondraggingClass"
          style="width: 100%; height: 100%"
        >
          <div v-if="originalImgFiles.length === 0">
            <h1>Img Upload</h1>
            <input
              @change="changeFileInput"
              type="file"
              id="input-file"
              style="display: none"
              multiple
            />
            <label for="input-file">
              <file-svg style="cursor: pointer" />
            </label>
          </div>
          <modal-file-list v-else :fileList="originalImgFiles" />
        </div>
      </modal-wrapper>
    </div>
    <button @click="getCurContents">현재컨텐츠</button>
  </div>
</template>

<script>
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  Code,
  Link,
  Image,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  HardBreak,
  HorizontalRule,
  CodeView,
  Fullscreen,
  History,
  TextColor,
  Preview,
  // FontSize,
  FontType,
  ////
  CodeBlock,
  Iframe,
} from "element-tiptap";

import "element-ui/lib/theme-chalk/index.css";
import ModalWrapper from "./ModalWrapper.vue";
import CustomImage from "./CustomImage.js";
import FileSvg from "./FileSvg.vue";
import ModalFileList from "./ModalFileList.vue";

import codemirror from "codemirror";
import "codemirror/lib/codemirror.css"; // import base style
import "codemirror/mode/xml/xml.js"; // language
import "codemirror/addon/selection/active-line.js"; // require active-line.js
import "codemirror/addon/edit/closetag.js"; // autoCloseTags

// import {
//   Doc,
//   Text,
//   Paragraph,
//   Heading,
//   Bold,
//   Underline,
//   Italic,
//   Strike,
//   Code,
//   Link,
//   Image,
//   Blockquote,
//   ListItem,
//   BulletList,
//   OrderedList,
//   TodoItem,
//   TodoList,
//   TextAlign,
//   Indent,
//   HardBreak,
//   HorizontalRule,
//   CodeView,
//   Fullscreen,
//   History,
// } from "element-tiptap";

export default {
  components: { ModalWrapper, FileSvg, ModalFileList },
  name: "ElTipTap",
  data() {
    return {
      toggleMenuTest: false,

      ondraggingClass: "",
      // isImgModalOpen: true,
      isImgModalOpen: false,
      originalImgFiles: [],
      uploadImg: [],
      // extensions: [
      //   new Doc(),
      //   new Text(),
      //   new Paragraph(),
      //   new Heading({ level: 5 }),
      //   new Bold({ bubble: true }),
      //   new Underline({ bubble: true }),
      //   new Italic({ bubble: true }),
      //   new Strike({ bubble: true }),
      //   new Code(),
      //   new Link({ bubble: true }),
      //   new Image(),
      //   new Blockquote(),
      //   new TextAlign(),
      //   new ListItem(),
      //   new BulletList({ bubble: true }),
      //   new OrderedList({ bubble: true }),
      //   new TodoItem(),
      //   new TodoList(),
      //   new Indent(),
      //   new HardBreak(),
      //   new HorizontalRule({ bubble: true }),
      //   new CodeView({
      //     codemirror,
      //     codemirrorOptions: {
      //       styleActiveLine: true,
      //       autoCloseTags: true,
      //     },
      //   }),
      //   new Fullscreen(),
      //   new History(),
      // ],
      extensions: [
        new Bold({ bubble: true }),
        new CustomImage({
          toggleModal: () => this.toggleModal(),
        }),
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }),
        new Code(),
        new Underline({ bubble: true }),
        new Italic({ bubble: true }),
        new Strike({ bubble: true }),
        new Link({ bubble: true }),
        new Blockquote(),
        new TextAlign(),
        new ListItem(),
        new BulletList({ bubble: true }),
        new OrderedList({ bubble: true }),
        new TodoItem(),
        new TodoList(),
        new Indent(),
        new HardBreak(),
        new HorizontalRule({ bubble: true }),
        new Fullscreen(),
        new History(),
        new TextColor(),
        new Preview(),
        // new FontSize(),
        new FontType(),
        new Image(),
        // new Image({
        //   urlPattern:
        //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/, // 添加图片链接的正则校验
        //   uploadRequest: "함수들어가면될듯", // 图片的上传方法，返回一个 Promise<url>
        // }),
        ////
        new CodeView({
          codemirror,
          codemirrorOptions: {
            styleActiveLine: true,
            autoCloseTags: true,
          },
        }),
        new CodeBlock(),
        new Iframe(),
      ],

      content: ``,
      // content: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGM3_z7nj5RXP9AvIHY_Z7AjqhXJpb2UIXQ&usqp=CAU" alt="" title="" height="200">`,
    };
  },
  methods: {
    getCurContents() {
      console.log(this.$refs.myEditor.editor.getHTML());
      const tt = document.querySelector(
        "#app > div > div > div.el-tiptap-editor__wrapper > div > div.el-tiptap-editor__menu-bar.border-top-radius"
      );
      if (this.toggleMenuTest) {
        // tt.classList.add("toggle-menu-test");
        tt.style.height = "100px";
        tt.style.overflow = "hidden";
      } else {
        // tt.classList.remove("toggle-menu-test");
      }
      this.toggleMenuTest = !this.toggleMenuTest;
    },
    toggleModal() {
      this.isImgModalOpen = !this.isImgModalOpen;
    },
    onTransactionEvent(editor) {
      // console.log("🔥Transaction", editor);
      // console.log(this.$refs.myEditor.editor.getHTML());
      editor;
    },
    onPasteEvent(props) {
      console.log("🔥paste", props);
    },
    onUpdateEvent(props) {
      console.log("🔥update");
      props;
      // console.log("🔥update", props);
    },
    insertImageIntoEditor(url) {
      console.log(url);
      // const updatedString = `<img src="${url}"`;
      // const prevTxt = this.$refs.myEditor.editor.getHTML();
      // this.content = prevTxt + updatedString;
      console.log(url);
      const updatedString = `<img src="${url}"`;
      const prevTxt = this.$refs.myEditor.editor.getHTML();
      this.content = prevTxt + updatedString;
      this.$refs.myEditor.editor.setContent(this.content);
    },
    async handleImageDrop(event) {
      console.log("Drop 이벤트", event);
      // console.log("Drop 이벤트파일", event.target.files);
      // this.$refs.myEditor.editor.focus();
      // event.preventDefault();
      // event.stopPropagation();
      const files = [...event.dataTransfer.files].filter((file) =>
        file.type.startsWith("image/")
      );
      console.log(this.$refs.myEditor.editor.getHTML());
      const imageURLs = await this.uploadToAWS(files);
      console.log(imageURLs);
      this.uploadImg = imageURLs;
      imageURLs.forEach((item) => {
        console.log("@@@", item);
        this.insertImageIntoEditor(item);
      });
      this.uploadImg = [];
      this.originalImgFiles = [];
      this.ondraggingClass = "";
      if (this.isImgModalOpen) this.toggleModal();
    },
    async changeFileInput(e) {
      // handleImageDrop와 로직동일 나중에 합칠것
      const imageURLs = await this.uploadToAWS([...e.target.files]);
      this.uploadImg = imageURLs;
      console.log(this.$refs.myEditor.editor.getHTML());
      console.log(imageURLs);
      imageURLs.forEach((item) => {
        console.log("@@@", item);
        this.insertImageIntoEditor(item);
      });
      this.uploadImg = [];
      this.originalImgFiles = [];
      this.ondraggingClass = "";
      if (this.isImgModalOpen) this.toggleModal();
    },

    async uploadToAWS(files) {
      console.log(files);
      this.originalImgFiles = files;
      // return await fetch("https://cataas.com/api/cats")
      //   .then((response) => response.json())
      //   .then((response) =>
      //     files.map(
      //       () =>
      //         "https://cataas.com/cat/" +
      //         response[Math.floor(Math.random() * 10)]._id
      //     )
      //   );
    },
    dragTest(e) {
      e.preventDefault();
      console.log(123123);
      this.ondraggingClass = "on-dragging";
      // e.preventDefault();
      // e.type === "dragenter"
      //   ? (this.ondraggingClass = "on-dragging")
      //   : (this.ondraggingClass = "");
    },
    dragTestTwo(e) {
      e.preventDefault();
      console.log(123123);
      if (e.target.className === "tt on-dragging") {
        this.ondraggingClass = "";
      }
    },
    dragTestThree(e) {
      e.preventDefault();
      console.log(e);
      console.log(this.$refs.myEditor);
      this.$refs.myEditor.editor.focus();
    },
  },
};
</script>
<style scoped>
.el-tiptap-editor__wrapper {
  position: relative;
  height: 100%;
  /* height: 500px; */
}
.on-dragging {
  border: 3px dashed;
  box-sizing: border-box;
}
.bg-test {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: #999;
  opacity: 50%;
}
.loading-container {
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Apply styles to the loading spinner */
.loading-spinner {
  width: 64px;
  height: 64px;
  background-image: url("https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif");
  background-size: cover;
}

.toggle-menu-test {
  height: 100px;
  overflow: hidden;
}
</style>
