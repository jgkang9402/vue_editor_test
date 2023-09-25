<template lang="">
  <ul class="custom-list">
    <li v-for="item in fileList" :key="item.name">{{ item.name }}</li>
  </ul>
</template>
<script>
export default {
  name: "ModalFileList",
  props: {
    fileList: Array,
  },
  created() {
    console.log("@@@@@", this.fileList);
  },
  updated() {
    console.log("@@@@@", this.fileList);
  },
};
</script>
<style scoped>
.custom-list {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.custom-list li {
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.custom-list li:last-child {
  border-bottom: none;
}

.custom-list li:hover {
  background-color: #f0f8ff;
  color: #0366d6;
}
</style>
