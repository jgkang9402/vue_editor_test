<template>
  <el-button size="small" :type="isActive ? 'primary' : ''" @click="onClick">
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 512 512"
      focusable="false"
      class="fa-icon"
    >
      <g>
        <path
          d="M464 448h-416c-26.5 0-48-21.5-48-48v-288c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48zM112 120c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56-25.1-56-56-56zM64 384h384v-112l-87.5-87.5c-4.7-4.7-12.3-4.7-17 0l-135.5 135.5-55.5-55.5c-4.7-4.7-12.3-4.7-17 0l-71.5 71.5v48z"
        ></path>
      </g>
    </svg>
  </el-button>
</template>

<script>
export default {
  name: "MenuImgBtn",

  props: ["isActive"],

  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>
<style scoped>
button {
  border: 0;
}
</style>
