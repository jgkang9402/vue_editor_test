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
        @onPaste="onPasteEvent"
        @onUpdate="onUpdateEvent"
        placeholder="Write something ..."
        @onTransaction="onTransactionEvent"
        style="height: 100%; overflow-y: auto"
      />
      <!-- @onInit="onInitEvent"
        @onDrop="onDropEvent"
      @onFocus="onFocusEvent"
      @onBlur="onBlurEvent"
      @onPaste="onPasteEvent" -->
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
          style="width: 100%; height: 100%"
        >
          <h1 style="height: 300px; border: 1px dotted blue">
            사진을 올려주세요!
          </h1>
        </div>
      </modal-wrapper>
    </div>
    <button @click="insertImageIntoEditor">asdasd</button>
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

export default {
  components: { ModalWrapper },
  name: "ElTipTap",
  data() {
    return {
      isImgModalOpen: false,
      uploadImg: [],
      extensions: [
        new CustomImage({
          toggleModal: () => this.toggleModal(),
        }),
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }),
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
        new FontSize(),
        new FontType(),
      ],
      content: ``,
      // content: `<img src="https://i.ibb.co/nbRN3S2/undraw-upload-87y9.png" alt="" title="" height="200">`,
    };
  },
  methods: {
    getCurContents() {
      console.log(this.$refs.myEditor.editor.getHTML());
      // this.toggleModal();
    },
    toggleModal() {
      console.log("@@@@@@");
      this.isImgModalOpen = !this.isImgModalOpen;
    },
    onPasteEvent(editor) {
      console.log("🔥paste", editor);
      console.log(this.$refs.myEditor.editor.getHTML());
    },
    onTransactionEvent(editor) {
      console.log("🔥Transaction", editor);
      console.log(this.$refs.myEditor.editor.getHTML());
    },
    onUpdateEvent(props) {
      console.log("🔥update", props);
    },
    insertImageIntoEditor(url) {
      console.log(url);
      const prevText = this.$refs.myEditor.editor.getHTML();
      console.log(prevText);
      const updatedString = `<img src="${url}"`;
      let prev = this.$refs.myEditor.editor.getHTML();
      this.content = prev + updatedString;
      console.log(updatedString);
      this.$refs.myEditor.editor.setContent(this.content);
    },
    async handleImageDrop(event) {
      // console.log(123123123, event);
      event.preventDefault();
      event.stopPropagation();
      const files = [...event.dataTransfer.files].filter((file) =>
        file.type.startsWith("image/")
      );

      // Upload each file to AWS
      const imageURLs = await this.uploadToAWS(files);
      this.uploadImg = imageURLs;
      console.log(this.$refs.myEditor.editor.getHTML());
      console.log(imageURLs);
      imageURLs.forEach((item) => {
        console.log("@@@", item);
        this.insertImageIntoEditor(item);
      });

      if (this.isImgModalOpen) this.toggleModal();
    },

    async uploadToAWS(files) {
      console.log(files);
      const newImgUrls = await fetch("https://cataas.com/api/cats")
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          const awsData = files.map(() => {
            return (
              "https://cataas.com/cat/" +
              response[Math.floor(Math.random() * 10)]._id
            );
          });
          return awsData;
        });
      return newImgUrls;
    },
  },
};
</script>
<style scoped>
.el-tiptap-editor__wrapper {
  height: 100%;
  /* height: 500px; */
}
</style>
