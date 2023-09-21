<template>
  <!-- <div class="el-tiptap-editor__wrapper"> -->
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
      placeholder="Write something ..."
    >
      <el-button @click="getCurContents(isActive, commands)"> Image </el-button>

      <!-- <template #menubar="{ commands, isActive }">
        <div class="menubar">
          <el-button
            v-for="item in editorMenus"
            :key="item"
            :type="isActive[`${item}`]() ? 'primary' : ''"
            @click="commands[`${item}`]()"
          >
            {{ item }}
          </el-button>

          <el-button @click="getCurContents(isActive, commands)">
            Image
          </el-button>
        </div>
      </template> -->
    </el-tiptap>
    <!-- <el-button
      :type="isActive.bold() ? 'primary' : ''"
      @click="commands.bold"
    >
      Bold
    </el-button>

    <el-button
      :type="isActive.underline() ? 'primary' : ''"
      @click="commands.underline"
    >
      Underline
    </el-button> -->
    <!-- <el-tiptap
      :content="content"
      :extensions="extensions"
      placeholder="Write something ..."
      ref="myEditor"
      @onUpdate="onUpdateEvent"
      @onPaste="onPasteEvent"
    /> -->
    <!-- @onInit="onInitEvent"
        @onDrop="onDropEvent"
      @onTransaction="onTransactionEvent"
      @onFocus="onFocusEvent"
      @onBlur="onBlurEvent"
       -->
    <!-- style="pointer-events: none" -->
    <button @click="insertImageIntoEditor">asdasd</button>
    <button @click="getCurContents">현재컨텐츠</button>
    <modal-wrapper
      v-if="isImgModalOpen"
      :isCloseButtonVisible="true"
      @onCloseModal="getCurContents"
    />
  </div>
  <!-- </div> -->
</template>

<script>
import {
  // all extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Link,
  Image,
  Blockquote,
  ListItem,
  BulletList, // use with ListItem
  OrderedList, // use with ListItem
  TodoItem,
  TodoList, // use with TodoItem
  TextAlign,
  Indent,
  HorizontalRule,
  HardBreak,
  History,
  // LineHeight,
  // Iframe,
  // CodeBlock,
  // TrailingNode,
  // Table, // use with TableHeader, TableCell, TableRow
  // TableHeader,
  // TableCell,
  // TableRow,
  // FormatClear,
  TextColor,
  // TextHighlight,
  Preview,
  // Print,
  Fullscreen,
  // CodeView,
  // SelectAll,
} from "element-tiptap";
// import codemirror from "codemirror";
// import "codemirror/lib/codemirror.css"; // import base style
// import "codemirror/mode/xml/xml.js"; // language
// import "codemirror/addon/selection/active-line.js"; // require active-line.js
// import "codemirror/addon/edit/closetag.js"; // autoCloseTags
import "element-ui/lib/theme-chalk/index.css";
import ModalWrapper from "./ModalWrapper.vue";

export default {
  components: { ModalWrapper },
  name: "ElTipTap",
  data: () => ({
    isImgModalOpen: false,
    imgCounter: 0,
    extensions: [
      new Doc(),
      new Text(),
      new Paragraph(),
      new Heading({ level: 5 }),
      new Bold({ bubble: true }),
      new Underline({ bubble: true }),
      new Italic({ bubble: true }),
      new Strike({ bubble: true }),
      new Link({ bubble: true }),
      new Image(),
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
    ],
    editorProperties: {
      editorProps: {
        // https://prosemirror.net/docs/ref/#view.EditorProps
        handleKeyDown() {
          console.log("🚀EditorProps: Keydown");
        },
        handleTextInput() {
          console.log("🚀EditorProps: TextInput");
        },
      },
    },

    editorMenus: [
      "doc",
      "text",
      "paragraph",
      "heading",
      "bold",
      "underline",
      "italic",
      "strike",
      "blockquote",
      // "textAlign",
      // "listItem",
      // "bulletList",
      // "orderedList",
      // "todoItem",
      // "todoList",
      // "indent",
      // "hardBreak",
      // "horizontalRule",
      // "fullscreen",
      // "history",
      // "textColor",
      // "preview",
    ],

    content: `<img src="https://i.ibb.co/nbRN3S2/undraw-upload-87y9.png" alt="" title="" height="200">`,
  }),
  methods: {
    getCurContents(isActive, commands) {
      console.log("isActive", isActive);
      console.log("commands", commands);
      console.log(this.$refs.myEditor.editor.getHTML());
      this.isImgModalOpen = !this.isImgModalOpen;
    },
    onInitEvent(e, q, w) {
      console.log("🔥init", e, q, w);
    },

    onTransactionEvent(e, q, w) {
      console.log("🔥transaction", e, q, w);
    },

    onFocusEvent(e, q, w) {
      console.log("🔥focus", e, q, w);
    },

    onBlurEvent(e, q, w) {
      console.log("🔥blur", e, q, w);
    },

    onPasteEvent(editor) {
      console.log("🔥paste", editor);

      console.log(this.$refs.myEditor.editor.getHTML());
    },

    // onDropEvent(props) {
    //   console.log("🔥drop", props);
    // },
    onDropEvent(props) {
      // 드롭된 내용의 img 태그를 찾습니다.
      console.log("🔥drop", props);
    },

    onUpdateEvent(props) {
      console.log("🔥update", props);
      // console.log("🔥update", props);
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
      // this.$refs.myEditor.editor.setContent(props);
    },
    insertImageIntoEditor(url) {
      console.log(url);
      // this.content += `<img src="${url}" />`;
    },
    async handleImageDrop(event) {
      console.log(123123123, event);
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
      // Insert each image into the editor
      imageURLs.forEach((url) => {
        // Your logic to insert an image into the editor with the given URL
        this.insertImageIntoEditor(url);
      });
    },

    async uploadToAWS(file) {
      // Use your AWS SDK or other methods to upload the file
      // and return the resulting URL. This is a pseudo-code representation.
      const formData = new FormData();
      formData.append("image", file);
      const returnImg =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGM3_z7nj5RXP9AvIHY_Z7AjqhXJpb2UIXQ&usqp=CAU";
      return returnImg;
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
<style scoped>
/* .el-tiptap-editor .menubar {
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #b3d8ff;
  background: linear-gradient(to right, #b2fefa, #0ed2f7);
  padding: 5px 10px;
} */
</style>
