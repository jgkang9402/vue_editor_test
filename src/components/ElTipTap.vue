<template>
  <div>
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
      />
      <!-- @onInit="onInitEvent"
        @onDrop="onDropEvent"
      @onFocus="onFocusEvent"
      @onBlur="onBlurEvent"
      @onPaste="onPasteEvent" -->
    </div>
    <div @drop.prevent="handleImageDrop" @dragover.prevent>
      <modal-wrapper
        v-if="isImgModalOpen"
        :isCloseButtonVisible="true"
        @onCloseModal="toggleModal"
      />
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
      // console.log("🔥update", props);
      // const imgTags = props.match(/<img [^>]*src[^>]*>/g) || [];
      // const imgTags = props.match(/<img [^>]*src="data:[^>]*>/g) || [];

      // console.log(imgTags);
      // imgTags.forEach((tag, idx) => {
      //   // 현재 카운터 값을 증가시키고 이미지 src를 숫자로 교체합니다.
      //   const newTag = tag.replace(/src="[^"]*"/, `src="${idx}"`);
      //   props = props.replace(tag, newTag);
      // });
      // console.log(props);

      // this.content = props;
      // this.$refs.myEditor.editor.setContent(props);
    },
    insertImageIntoEditor(url) {
      console.log(url);
      const prevText = this.$refs.myEditor.editor.getHTML();
      console.log(prevText);
      // const imgTags = props.match(/<img [^>]*src[^>]*>/g) || [];
      // const imgTags = props.match(/<img [^>]*src="data:[^>]*>/g) || [];

      // console.log(imgTags);
      // imgTags.forEach((tag) => {
      //   // 현재 카운터 값을 증가시키고 이미지 src를 숫자로 교체합니다.
      //   this.imgCounter += 1;
      //   const newTag = tag.replace(/src="[^"]*"/, `src="${this.imgCounter}"`);
      //   props = props.replace(tag, newTag);
      // });

      // this.content = props;
      const updatedString = prevText.replace(
        /<img src="[^"]*"/g,
        `<img src="${url}"`
      );
      console.log(updatedString);
      this.$refs.myEditor.editor.setContent(updatedString);

      // this.content += `<img src="${url}" />`;
    },
    async handleImageDrop(event) {
      // console.log(123123123, event);
      event.preventDefault();
      event.stopPropagation();
      const files = [...event.dataTransfer.files].filter((file) =>
        file.type.startsWith("image/")
      );
      console.log(files);

      // Upload each file to AWS
      const imageURLs = await Promise.all(
        files.map((file) => this.uploadToAWS(file))
      );
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          console.log(this.$refs.myEditor.editor.getHTML());
          let prev = this.$refs.myEditor.editor.getHTML();
          const imgTags = prev.match(/<img [^>]*src="data:[^>]*>/g) || [];

          console.log(imgTags);
          imgTags.forEach((tag, idx) => {
            // 현재 카운터 값을 증가시키고 이미지 src를 숫자로 교체합니다.
            const newTag = tag.replace(/src="[^"]*"/, `src="${response[idx]}"`);
            console.log(newTag);
            prev = prev.replace(tag, newTag);
          });
          // imgTags.forEach((tag, idx) => {
          //   // 현재 카운터 값을 증가시키고 이미지 src를 숫자로 교체합니다.
          //   const newTag = tag.replace(
          //     /src="[^"]*"/,
          //     `src="${this.uploadImg[idx]}"`
          //   );
          //   console.log(newTag);
          //   prev = prev.replace(tag, newTag);
          // });
          this.content = prev;
          // this.$refs.myEditor.editor.setContent(prev);
        });

      console.log(imageURLs);
      this.uploadImg = imageURLs;
      // Insert each image into the editor
      // imageURLs.forEach((url) => {
      //   // Your logic to insert an image into the editor with the given URL
      // this.insertImageIntoEditor(url);
      // });
    },

    async uploadToAWS(file) {
      // Use your AWS SDK or other methods to upload the file
      // and return the resulting URL. This is a pseudo-code representation.
      console.log(file);
      const returnImg =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGM3_z7nj5RXP9AvIHY_Z7AjqhXJpb2UIXQ&usqp=CAU";
      return returnImg;

      // const formData = new FormData();
      // formData.append("image", file);
      // const response = await fetch(YOUR_AWS_ENDPOINT, {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      // return data.url;  // Assuming the response contains the image URL
    },
  },
};
</script>
