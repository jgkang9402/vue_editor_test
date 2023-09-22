<template>
  <div @mouseenter="handleTooltip" @mouseleave="handleTooltip">
    <div
      enable-tooltip="true"
      class="el-tooltip el-tiptap-editor__command-button"
      aria-describedby="el-tooltip-3529"
      tabindex="0"
      @click="clickIcon"
    >
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
    </div>
    <div
      v-if="isHover"
      role="tooltip"
      id="el-tooltip-1420"
      aria-hidden="false"
      class="el-tooltip__popper is-dark"
      style="
        position: absolute;
        top: 46px;
        left: 30px;
        transform-origin: center bottom;
        z-index: 2019;
      "
      x-placement="bottom"
    >
      이미지 추가
      <div x-arrow="" class="popper__arrow" style="left: 36px"></div>
    </div>
  </div>

  <!-- </el-button> -->
</template>

<script>
export default {
  name: "MenuImgBtn",

  props: ["isActive"],
  data() {
    return {
      // isHover: true,
      isHover: false,
    };
  },
  methods: {
    clickIcon() {
      this.$emit("click");
    },
    handleTooltip() {
      this.isHover = !this.isHover;
    },
  },
};
</script>
