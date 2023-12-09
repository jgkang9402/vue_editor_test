<template>
  <ModalWrapper
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
          <FileSvg style="cursor: pointer" />
        </label>
      </div>
      <ModalFileList v-else :fileList="originalImgFiles" />
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "./ModalWrapper.vue";
import FileSvg from "./FileSvg.vue";
import ModalFileList from "./ModalFileList.vue";

export default {
  name: "ImgUploadModal",
  props: {
    isImgModalOpen: Boolean,
    originalImgFiles: Array,
  },
  components: { ModalWrapper, FileSvg, ModalFileList },
  data() {
    return {
      ondraggingClass: "",
    };
  },
  methods: {
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

      // this.originalImgFiles = [];
      this.ondraggingClass = "";
      if (this.isImgModalOpen) this.toggleModal();
    },
    toggleModal() {
      this.$emit("toggleModal");
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
<style></style>
