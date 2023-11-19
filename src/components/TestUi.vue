<template>
  <div class="post-checker-container">
    <h3>포스트 체커</h3>
    <div class="keyword-box">
      <h4 style="flex: 20%">수정키워드</h4>
      <div class="table-container" style="flex: 80%">
        <div class="table-header">
          <div class="table-cell table-header-index">순서</div>
          <div class="table-cell table-header-before-keyword">
            변경전 키워드
          </div>
          <div class="table-cell table-header-after-keyword">변경후 키워드</div>
          <div class="table-cell table-header-buttons">추가/삭제</div>
        </div>
        <div
          v-for="(item, index) in postCheckerList"
          :key="index"
          class="table-row"
        >
          <div class="table-cell table-cell-index">{{ index }}</div>
          <div class="table-cell table-cell-before-keyword">
            <input type="text" v-model="item.asIsKeyword" />
          </div>
          <div class="table-cell table-cell-after-keyword">
            <input type="text" v-model="item.toBeKeyword" />
          </div>
          <div class="table-cell table-cell-buttons">
            <button>+</button><button>-</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestUi",
  data() {
    return {
      postCheckerList: [
        {
          asIsKeyword: "필무원,풀미원,풀모원",
          toBeKeyword: "공무원",
        },
        {
          asIsKeyword: "필무원,풀미원,풀모원",
          toBeKeyword: "공무원",
        },
        {
          asIsKeyword: "필무원,풀미원,풀모원",
          toBeKeyword: "공무원",
        },
      ],
    };
  },
};
</script>

<style scoped>
.post-checker-container {
  text-align: left;
}
.keyword-box {
  display: flex;
  width: 100%;
}

.table-container {
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: center;
  box-sizing: border-box;
}

.table-header {
  display: flex;
}

.table-row {
  display: flex;
  align-items: center;
}

.table-cell {
  flex: 1;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.table-header-index,
.table-cell-index {
  flex: 10%;
}
.table-header-before-keyword,
.table-cell-before-keyword {
  flex: 40%;
  padding: 0 20px;
  box-sizing: border-box;
}

.table-header-after-keyword,
.table-cell-after-keyword {
  flex: 30%;
  padding: 0 20px;
  box-sizing: border-box;
}
.table-header-buttons,
.table-cell-buttons {
  flex: 20%;
}
.table-container input {
  display: block;
  width: 100%;
}
</style>
