<template>
  <div class="page_main">
    <main>
      <div class="page_content avt">
        <div class="CourseContentBox">
          <div class="title">
            <p>測驗券名稱</p>
            <span>處理中</span>
          </div>
          <ul>
            <li>
              <h3>作答時間</h3>
              <p>開始於 2023/01/01 10:00，完成於 2023/01/01 10:25</p>
            </li>
            <li>
              <h3>花費時間</h3>
              <p>25分鐘</p>
            </li>
            <li>
              <h3>得分/總分</h3>
              <p>90/100</p>
            </li>
            <li>
              <h3>評核內容</h3>
              <div class="tableArea">
                <table>
                  <thead>
                    <tr>
                      <th>題目</th>
                      <th>標準答案</th>
                      <th>你的回答</th>
                      <th>得分</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">
                        題目題目題目題目題目題目題題目題目題目題目題目題目題題目題目題目題目題目題目題題目題目題目題目題目題目題
                      </td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                    <tr>
                      <td data-th="題目">題目題目題目題目題目題目題</td>
                      <td data-th="標準答案">選項內容</td>
                      <td data-th="你的回答">選項內容</td>
                      <td data-th="得分">9/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 25px;
    color: #006699;
  }

  span {
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #006699;
    background: #dfdfdf;
    font-size: 18px;
    border-radius: 100px;
  }
}

ul {
  li {
    h3 {
      position: relative;
      padding-left: 12px;

      &::after {
        display: block;
        content: "";
        position: absolute;
        width: 3px;
        height: 100%;
        background: #ff4646;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }

    p {
      color: #555555;
    }

    .tableArea {
      background: #fff;
      padding: 10px;
      border-radius: 12px;
      box-shadow: 0 6px 18px rgba($color: #000000, $alpha: 0.16);
      max-height: 450px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #c0c0c0;
        border-radius: 15px;
        border: 2px solid #ffffff;
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th {
        background: #5c87b8;
        padding: 10px;
        color: #fff;

        &:first-child {
          border-radius: 12px 0 0 12px;
          width: 50%;
        }

        &:last-child {
          border-radius: 0 12px 12px 0;
          width: 10%;
        }
      }

      td {
        padding: 20px 10px;
        border-bottom: 1px solid #c0c0c0;
      }
    }
  }
}

@media (max-width: 576px) {
  ul {
    li {
      table {
        display: block;

        tr {
          display: block;
          border-bottom: 1px solid #c0c0c0;
        }

        thead {
          display: none;
        }

        td {
          display: block;
          border-bottom: none;
          padding: 10px;
          position: relative;
          padding-left: 70px;

          &::before {
            content: attr(data-th);
            display: block;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 65px;
            height: 100%;
            background: #5c87b8;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
