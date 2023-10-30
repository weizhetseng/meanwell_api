<template>
  <div class="page_main">
    <main>
      <div class="page_content avt">
        <div class="CourseContentBox">
          <div class="testTitle">送出成功</div>
          <div class="testBox">
            <img src="../assets/img/success.svg" alt="" />
            <p>
              我們已收到您的回覆<br />
              可於三天後至報名紀錄確認評核結果
            </p>
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
  text-align: center;
}

.testBox {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba($color: #000000, $alpha: 0.16);
  margin-bottom: 40px;

  img {
    display: block;
    margin: auto;
  }

  p {
    text-align: center;
    color: #555555;
    margin: 0;
    margin-top: 20px;
    font-weight: bold;
    line-height: 1.5;
  }
}
</style>
