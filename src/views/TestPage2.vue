<template>
  <div class="page_main">
    <main>
      <div class="page_content avt">
        <div class="CourseContentBox">
          <div class="testTitle">
            <p>測驗券名稱</p>
            <p>1/10題</p>
          </div>
          <div class="testBox">
            <div class="Question">
              <div>01</div>
              <div>
                <p>
                  您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度您對本次活動畫質解析度滿意程度
                </p>
                <p>
                  內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
                </p>
              </div>
              <div>單選</div>
            </div>
            <div class="option">
              <div>
                <input type="radio" name="" id="" />
                <label for="">非常滿意</label>
              </div>
              <div>
                <input type="radio" name="" id="" />
                <label for="">滿意</label>
              </div>
              <div>
                <input type="radio" name="" id="" />
                <label for="">普通</label>
              </div>
              <div>
                <input type="radio" name="" id="" />
                <label for="">不滿意</label>
              </div>
              <div>
                <input type="radio" name="" id="" />
                <label for="">非常不滿意</label>
              </div>
            </div>
          </div>
          <div class="btnGroup">
            <RouterLink class="btn" to="/testPage3">下一題</RouterLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.testTitle {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 25px;
  color: #006699;
  margin-bottom: 20px;
  flex-wrap: wrap;

  p {
    margin: 0;
  }
}

.testBox {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba($color: #000000, $alpha: 0.16);
  margin-bottom: 40px;

  .Question {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    div {
      p {
        margin: 0;

        &:first-child {
          margin-bottom: 20px;
        }
      }

      &:first-child {
        flex-shrink: 0;
        white-space: nowrap;
        width: 26px;
        height: 26px;
        background: #006699;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
      }

      &:last-child {
        flex-shrink: 0;
        white-space: nowrap;
        color: #006699;
        font-weight: bold;
      }
    }
  }

  .option {
    display: flex;
    gap: 20px;

    div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }

  @media (max-width: 768px) {
    .Question {
      flex-wrap: wrap;
    }

    .option {
      flex-direction: column;
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
