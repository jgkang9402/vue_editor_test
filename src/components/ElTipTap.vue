<template>
  <div style="height: 700px">
    <div
      @drop.prevent="handleImageDrop"
      @dragover.prevent
      class="el-tiptap-editor__wrapper"
    >
      <el-tiptap
        ref="myEditor"
        :extensions="extensions"
        :content="content"
        @onUpdate="onUpdateEvent"
        placeholder="내용을 입력해주세요 ..."
        @onTransaction="onTransactionEvent"
        style="height: 100%; overflow-y: auto"
      />
      <div v-if="originalImgFiles.length !== 0" class="bg-test">
        <div class="loading-container">
          <div class="loading-spinner"></div>
        </div>
      </div>
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
  Italic,
  Strike,
  Underline,
  Link,
  Blockquote,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextAlign,
  Indent,
  HorizontalRule,
  HardBreak,
  History,
  TextColor,
  Preview,
  Fullscreen,
  FontSize,
  FontType,
} from "element-tiptap";
import "element-ui/lib/theme-chalk/index.css";
import ModalWrapper from "./ModalWrapper.vue";
import CustomImage from "./CustomImage.js";
import FileSvg from "./FileSvg.vue";
import ModalFileList from "./ModalFileList.vue";

export default {
  components: { ModalWrapper, FileSvg, ModalFileList },
  name: "ElTipTap",
  data() {
    return {
      ondraggingClass: "",
      // isImgModalOpen: true,
      isImgModalOpen: false,
      originalImgFiles: [],
      uploadImg: [],
      extensions: [
        new Bold({ bubble: true }),
        new CustomImage({
          toggleModal: () => this.toggleModal(),
        }),
        new Doc(),
        new Underline({ bubble: true }),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
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
        new FontSize(),
        new FontType(),
      ],
      // content: ``,
      content: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGM3_z7nj5RXP9AvIHY_Z7AjqhXJpb2UIXQ&usqp=CAU" alt="" title="" height="200">`,
    };
  },
  methods: {
    getCurContents() {
      console.log(this.$refs.myEditor.editor.getHTML());
    },
    toggleModal() {
      this.isImgModalOpen = !this.isImgModalOpen;
    },
    onTransactionEvent(editor) {
      // console.log("🔥Transaction", editor);
      // console.log(this.$refs.myEditor.editor.getHTML());
      editor;
    },
    onUpdateEvent(props) {
      console.log("🔥update");
      props;
      // console.log("🔥update", props);
    },
    insertImageIntoEditor(url) {
      console.log(url);
      const updatedString = `<img src="${url}"`;
      const prevTxt = this.$refs.myEditor.editor.getHTML();
      this.content = prevTxt + updatedString;
      // this.$refs.myEditor.editor.setContent(this.content);
    },
    async handleImageDrop(event) {
      console.log(123123123, event);
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
      return await fetch("https://cataas.com/api/cats")
        .then((response) => response.json())
        .then((response) =>
          files.map(
            () =>
              "https://cataas.com/cat/" +
              response[Math.floor(Math.random() * 10)]._id
          )
        );
    },
    dragTest(e) {
      e.preventDefault();
      this.ondraggingClass = "on-dragging";
      // e.preventDefault();
      // e.type === "dragenter"
      //   ? (this.ondraggingClass = "on-dragging")
      //   : (this.ondraggingClass = "");
    },
    dragTestTwo(e) {
      e.preventDefault();
      if (e.target.className === "tt on-dragging") {
        this.ondraggingClass = "";
      }
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
</style>
