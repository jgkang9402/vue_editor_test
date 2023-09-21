<template>
  <div>
    <div class="modal-overlay"></div>
    <div
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      class="modal-container"
    >
      <div :class="['modal-content', { 'no-padding': isWrapperNoPadding }]">
        <div :class="['modal-header', { 'no-title': !modalTitle }]">
          <h2 v-if="modalTitle" class="modal-title">{{ modalTitle }}</h2>
          <button
            v-if="isCloseButtonVisible"
            @click="onCloseModal"
            class="close-button"
          >
            X
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "776px",
    },
    isCloseButtonVisible: {
      type: Boolean,
      default: true,
    },
    modalTitle: String,
    isWrapperNoPadding: Boolean,
  },
  data() {
    return {
      startOutside: false,
    };
  },
  methods: {
    handleMouseDown(e) {
      if (e.target === e.currentTarget) {
        this.startOutside = true;
      }
    },
    handleMouseUp(e) {
      if (e.target === e.currentTarget && this.startOutside) {
        this.onCloseModal();
      }
      this.startOutside = false;
    },
    onCloseModal() {
      this.$emit("onCloseModal");
      // 모달 닫기 로직 구현
    },
  },
  mounted() {
    document.body.style.overflow = "hidden";
  },
  destroyed() {
    document.body.style.overflow = "unset";
    // 필요한 경우 추가 unmount 로직 구현
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}

.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow-y: auto;
  padding: 40px 35px;
  z-index: 99999;
}

.modal-content {
  margin: auto;
  position: relative;
  width: 776px; /* 기본값 */
  min-height: 168px;
  padding: 6px;
  background: white;
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}

.modal-content.no-padding {
  padding: 0;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-header.no-title {
  justify-content: flex-end;
}

.modal-title {
  font-weight: 700;
  font-size: 20px;
  line-height: 23.87px;
  letter-spacing: -2%;
}

.close-button {
  position: relative;
  z-index: 20;
  width: 24px;
  height: 24px;
  color: gray;
  cursor: pointer;
}
</style>
