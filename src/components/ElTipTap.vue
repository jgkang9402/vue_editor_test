<template>
  <div style="height: 700px">
    <div
      @drop.prevent="handleImageDrop"
      @dragover.prevent
      class="el-tiptap-editor__wrapper"
    >
      <!-- :content="content" -->
      <!-- :extensions="extensions" -->
      <el-tiptap
        ref="myEditor"
        :extensions="extensions"
        v-model="content"
        @onUpdate="onUpdateEvent"
        placeholder="내용을 입력해주세요 ...2"
        @onTransaction="onTransactionEvent"
        @onPaste="onPasteEvent"
        style="height: 100%; overflow-y: auto"
        :charCounterCount="false"
        @onInit="onInitEvent"
      >
        <!-- ({ editor }) => {
        editor.focus();
        
      } -->
      </el-tiptap>
      <!-- <el-tiptap
        ref="myEditor"
        :extensions="extensions"
        :content="content"
        @onUpdate="onUpdateEvent"
        placeholder="내용을 입력해주세요 ..."
        @onTransaction="onTransactionEvent"
        style="height: 100%; overflow-y: auto"
        :charCounterCount="false"
        @onInit="({ editor }) => editor.focus()"
      /> -->
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
            <h1>Img Uploadㅇㅇ</h1>
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
    <button @click="changeExtentsions">메뉴바</button>
    <button @click="getCurContents">현재컨텐츠</button>
    <button @click="getCursorCoordinate">현재좌표</button>
    <button @click="base64ToFile">base64</button>
    <button @click="copyText">카피텍스트</button>
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
  TextHighlight,
  FormatClear,
  CodeView,
  // Image,
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
        // new Image({
        //   urlPattern:
        //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
        //   uploadRequest: (file) => {
        //     return this.imageUpload(file);
        //   },
        // }),
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
        new TextHighlight(),
        new Preview(),
        // new FontSize({
        //   fontSizes: ["2", "8", "10"],
        // }),
        new FormatClear(),
        new FontSize(),

        new FontType({
          // defaultFontType: "MyCustomFont", // 기본 폰트 설정
          fontType: {
            Arial: "Arial",
            "Arial Black": "Arial Black",
            Georgia: "Georgia",
            Impact: "Impact",
            qweqwe: "qweqwe",
          },
        }),
        new CodeView({
          codemirror,
          codemirrorOptions: {
            styleActiveLine: true,
            autoCloseTags: true,
          },
        }),
        // new FontSize(),
      ],
      isExtensionsClose: false,
      content: ``,
      // content: `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGM3_z7nj5RXP9AvIHY_Z7AjqhXJpb2UIXQ&usqp=CAU" alt="" title="" height="200">`,
    };
  },
  methods: {
    getCurContents() {
      console.log(this.$refs.myEditor.editor.getHTML());
    },
    toggleModal() {
      this.isImgModalOpen = !this.isImgModalOpen;
    },
    changeExtentsions() {
      // this.isExtensionsClose = !this.isExtensionsClose;
      const editorMenuBar = document.querySelector(
        "#app > div > div > div.el-tiptap-editor__wrapper > div > div.el-tiptap-editor__menu-bar.border-top-radius"
      );
      if (this.isExtensionsClose) {
        // editorMenuBar.style.height = "168px";
        editorMenuBar.style.height = "";
        this.isExtensionsClose = false;
        // editorMenuBar.style.overflow = "hidden";
        console.log(editorMenuBar);
      } else {
        this.isExtensionsClose = true;
        editorMenuBar.style.height = "56px";
      }
    },
    onTransactionEvent({ editor }) {
      // 마우스 포인터클릭만해도 동작하고 수정,삭제등 모든이벤트에 발생함, 포인터 커서 어디에있는지 알아보던가 해도될듯
      console.log("🔥Transaction", editor);
      // if (!editor.view.hasFocus()) {
      //   editor.view.focus();
      // }
      const editorElement = this.$refs.myEditor.$el;
      this.$refs.myEditor.$el.addEventListener("click", (clickEvent) => {
        // 클릭한 요소가 에디터 내부인지 확인합니다.
        if (editorElement.contains(clickEvent.target)) {
          // 에디터의 포커스 상태를 확인합니다.
          if (!this.$refs.myEditor.editor.view.focused) {
            // 에디터에 포커스를 줍니다.
            this.$refs.myEditor.editor.view.focus();
          }
        }
      });
    },
    onUpdateEvent(html, editorObj) {
      console.log("🔥update html", html);
      console.log("🔥update editorObj", editorObj);

      // 이미지 태그의 src가 data URL을 포함하는지 확인
      const hasDataUrl = html.includes('<img src="data');

      if (hasDataUrl) {
        const newHtml = html.replace(
          /<img src="data[^"]*"/g,
          '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGM3_z7nj5RXP9AvIHY_Z7AjqhXJpb2UIXQ&usqp=CAU"'
        );
        console.log(newHtml);
        this.content = newHtml;
        this.$refs.myEditor.editor.setContent(this.content);
      }
    },

    onInitEvent({ editor }) {
      console.log(editor);
      editor.focus();

      this.$nextTick(() => {
        const editorMenuBar = document.querySelector(
          "#app > div > div > div.el-tiptap-editor__wrapper > div > div.el-tiptap-editor__menu-bar.border-top-radius"
        );
        if (editorMenuBar) {
          // editorMenuBar.style.height = "168px";
          this.isExtensionsClose = true;
          editorMenuBar.style.height = "52px";
          editorMenuBar.style.overflow = "hidden";
          const svgElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          svgElement.setAttribute("width", "24");
          svgElement.setAttribute("height", "24");
          // svgElement.setAttribute("click", this.changeExtentsions);
          svgElement.addEventListener("click", this.changeExtentsions);

          // 스타일 적용 (position과 right 속성)
          svgElement.style.position = "absolute";
          svgElement.style.cursor = "pointer";
          svgElement.style.top = "16px";
          svgElement.style.right = "3px";

          // 각 원을 SVG에 추가
          ["6", "12", "18"].forEach((cxValue) => {
            const circle = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "circle"
            );
            circle.setAttribute("cx", cxValue);
            circle.setAttribute("cy", "12");
            circle.setAttribute("r", "2");
            circle.setAttribute("fill", "black");
            svgElement.appendChild(circle);
          });

          // SVG를 editorMenuBar 요소의 하위로 추가
          editorMenuBar.appendChild(svgElement);
        } else {
          console.warn("Element not found.");
        }
      });
    },
    onPasteEvent() {
      // ClipboardEvent 객체를 가져옵니다.
      // const clipboardData = event.clipboardData || window.clipboardData;

      // // 클립보드에서 가져온 데이터를 텍스트로 변환합니다.
      // const pastedText = clipboardData.getData("text/plain");

      // // 가져온 텍스트를 에디터에 붙여넣습니다.
      // this.$refs.myEditor.editor.commands("paste", { content: pastedText });

      // // 이벤트를 중지하여 기본 붙여넣기 동작을 방지합니다.
      // event.preventDefault();
      console.log("on");
      const regex = /<[^>]*>/g;

      // HTML 태그를 제거하고 텍스트만 추출
      const plainText = this.content.replace(regex, "");
      console.log(plainText);
      this.content = plainText;
    },
    imageUpload(file) {
      // console.log("@#@$@$@", file);
      file;
    },
    insertImageIntoEditor(url) {
      console.log(url);
      const updatedString = `<img src="${url}"`;
      const prevTxt = this.$refs.myEditor.editor.getHTML();
      this.content = prevTxt + updatedString;
      this.$refs.myEditor.editor.setContent(this.content);
    },
    async handleImageDrop(event) {
      console.log(123123123, event);
      event.preventDefault();
      event.stopPropagation();
      const files = [...event.dataTransfer.files].filter((file) =>
        file.type.startsWith("image/")
      );
      console.log(files);
      // const imageURLs = await this.uploadToAWS(files);
      // console.log(imageURLs);
      // this.uploadImg = imageURLs;
      // imageURLs.forEach((item) => {
      //   console.log("@@@", item);
      //   this.insertImageIntoEditor(item);
      // });
      // this.uploadImg = [];
      // this.originalImgFiles = [];
      // this.ondraggingClass = "";
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
    getCursorCoordinate() {
      const editorView = this.$refs.myEditor.editor.view; // element-tiptap 에디터 뷰 가져오기
      const cursorPos = editorView.state.selection.head; // 커서 위치 가져오기
      const tr = editorView.state.tr;
      const schema = this.$refs.myEditor.editor.schema;

      // 이미지 태그를 생성하여 삽입
      const imageNode = schema.node("image", {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGM3_z7nj5RXP9AvIHY_Z7AjqhXJpb2UIXQ&usqp=CAU",
        alt: "이주빈",
      });

      tr.insert(cursorPos, imageNode);
      editorView.dispatch(tr);
    },
    base64ToFile() {
      // base64ToFile(base64String, fileName) {
      // Base64 문자열을 ArrayBuffer로 변환
      const binaryString = atob(this.base());
      // console.log(binaryString);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // ArrayBuffer에서 Blob을 생성
      const blob = new Blob([bytes], { type: "application/octet-stream" });

      // Blob에서 파일 객체 생성
      const file = new File([blob], "test", {
        type: "application/octet-stream",
      });
      const imageUrl = URL.createObjectURL(file);

      // 이미지 URL 콘솔에 출력
      console.log("Image URL:", imageUrl);
      this.insertImageIntoEditor(imageUrl);

      return file;
    },
    base() {
      const tt = "base64";
      return tt;
    },
    stripHtmlTags(html) {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    },
    removeHtmlTags(html) {
      // HTML 태그를 제거하기 위한 정규식
      const regex = /<[^>]*>/g;

      // HTML 태그를 제거하고 텍스트만 추출
      const plainText = html.replace(regex, "");

      return plainText;
    },
    // copyText() {
    //   // const textToCopy = this.$refs.myEditor.editor;
    //   const textToCopy = this.removeHtmlTags(this.content);

    //   // Clipboard API를 사용하여 텍스트 복사
    //   navigator.clipboard.writeText(textToCopy);

    //   navigator.clipboard
    //     .readText()
    //     .then((text) => {
    //       console.log("클립보드에서 읽은 텍스트:", text);
    //     })
    //     .catch((error) => {
    //       console.error("클립보드 읽기 실패:", error);
    //     });
    //   navigator.clipboard
    //     .writeText(textToCopy)
    //     .then(() => {
    //       // 복사가 성공했을 때 처리
    //       alert("Text copied to clipboard!");
    //     })
    //     .catch((error) => {
    //       // 복사 실패 시 처리
    //       console.error("Copy failed: ", error);
    //     });
    // },
    copyText() {
      this.$refs.myEditor.$el.focus();

      // 전체 내용 선택
      document.execCommand("selectAll", false, null);

      // 복사 명령 실행
      document.execCommand("copy");

      // alert("에디터의 내용이 복사되었습니다!");
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
