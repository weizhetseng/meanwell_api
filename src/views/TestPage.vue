<template>
  <div class="page_main">
    <main>
      <div class="page_content avt">
        <div class="CourseContentBox">
          <div class="testTitle">測驗券名稱</div>
          <div class="testBox">
            <p>允許作答次數：１：１</p>
            <p>測驗作答終止時間 2023/01/01 00:00</p>
            <p>作答時間限制：30分鐘</p>
            <p class="total">共10題</p>
          </div>
          <div class="btnGroup">
            <RouterLink class="btn" to="/testPage2">開始作答</RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.testTitle {
  font-weight: bold;
  font-size: 25px;
  color: #006699;
  margin-bottom: 20px;
}

.testBox {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba($color: #000000, $alpha: 0.16);
  margin-bottom: 40px;

  p {
    color: #555555;

    &.total {
      font-size: 25px;
      font-weight: bold;
    }
  }
}

.btnGroup {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    display: block;
    margin: auto;
    padding: 12px 30px;
    font-size: 20px;
    color: #fff;
    background: #006699;
    border-radius: 100px;
  }
}
</style>
