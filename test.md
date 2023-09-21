<template>
  <div>
    <!-- <div @drop.prevent="handleImageDrop" @dragover.prevent> -->
    <el-tiptap
      :content="content"
      :extensions="extensions"
      placeholder="Write something ..."
      @onUpdate="onUpdateEvent"
      ref="myEditor"
    />
    <!-- @onInit="onInitEvent"
        @onDrop="onDropEvent"
      @onTransaction="onTransactionEvent"
      @onFocus="onFocusEvent"
      @onBlur="onBlurEvent"
      @onPaste="onPasteEvent" -->
    <!-- style="pointer-events: none" -->
    <button @click="insertImageIntoEditor">asdasd</button>
    <button @click="getCurContents">현재컨텐츠</button>
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
  // TextColor,
  // TextHighlight,
  // Preview,
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

export default {
  name: "ElTipTap",
  data: () => ({
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
      // new CodeView({
      //   codemirror,
      //   codemirrorOptions: {
      //     styleActiveLine: true,
      //     autoCloseTags: true,
      //   },
      // }),
      new History(),
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

    content: `<img src="https://i.ibb.co/nbRN3S2/undraw-upload-87y9.png" alt="" title="" height="200">`,
  }),
  methods: {
    getCurContents() {
      // console.log(this.content);
      console.log(this.$refs.myEditor.editor.getHTML());
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

    onPasteEvent(e, q, w) {
      console.log("🔥paste", e, q, w);
    },

    // onDropEvent(props) {
    //   console.log("🔥drop", props);
    // },
    onDropEvent(props) {
      // 드롭된 내용의 img 태그를 찾습니다.
      console.log("🔥drop", props);
    },

    // async onUpdateEvent(props) {
    //   console.log("🔥update", props);
    //   // const imgTags = props.match(/<img [^>]*src[^>]*>/g) || [];
    //   const imgTags = props.match(/<img [^>]*src="data:[^>]*>/g) || [];

    //   console.log(imgTags);
    //   await imgTags.forEach((tag) => {
    //     // 현재 카운터 값을 증가시키고 이미지 src를 숫자로 교체합니다.
    //     console.log(2);

    //     this.imgCounter += 1;
    //     const newTag = tag.replace(/src="[^"]*"/, `src="${this.imgCounter}"`);
    //     props = props.replace(tag, newTag);
    //   });
    //   console.log(3);

    //   // this.content = props;
    //   this.$refs.myEditor.editor.setContent(props);
    //   this.imgCounter = 0;
    // },
    async onUpdateEvent(props) {
      console.log("🔥update", props);

      const imgTags = props.match(/<img [^>]*src="data:[^>]*>/g) || [];

      const files = []; // 여기에 파일 객체들을 저장할 것입니다.

      await imgTags.forEach((tag) => {
        // Base64 데이터 URL에서 MIME 타입과 실제 Base64 데이터를 추출합니다.
        const match = tag.match(/src="data:([^;]+);base64,([^"]+)"/);
        if (match) {
          const mimeType = match[1]; // 예: 'image/png'
          const base64Data = match[2];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          // Blob 객체를 생성하고 이를 File 객체로 변환합니다.
          const blob = new Blob([byteArray], { type: mimeType });
          const file = new File([blob], `image_${this.imgCounter + 1}.png`, {
            type: mimeType,
            lastModified: Date.now(),
          });
          files.push(file);

          this.imgCounter += 1;
          const newTag = tag.replace(/src="[^"]*"/, `src="${this.imgCounter}"`);
          props = props.replace(tag, newTag);
        }
      });

      console.log(files); // 생성된 파일 객체들을 출력합니다.

      this.$refs.myEditor.editor.setContent(props);
      this.imgCounter = 0;
    },

    insertImageIntoEditor(url) {
      console.log(url);
      // this.content += `<img src="${url}" />`;
    },
    async handleImageDrop(event) {
      console.log(123123123, event);
      // event.preventDefault();
      // event.stopPropagation();
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
