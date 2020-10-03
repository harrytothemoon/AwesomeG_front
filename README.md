# AwesomeG-front

[GitHub Page - Awesome G](https://harry811016.github.io/AwesomeG_front/)

[後端API專案 GitHub](https://github.com/harry811016/AwesomeG)

## 測試用使用者

* 老師身份

email: user0@example.com ~ user5@example.com (共6組)

password: 1234

* 學生身份

email: user6@example.com ~ user11@example.com (共6組)

password: 1234

* 測試用信用卡

信用卡號 4000-2211-1111-1111 

到期日:都可以 

隨機碼:都可以

## 專案setup
```
npm install
npm run serve
```

備註: 專案中Components中以M結尾的是Modal的意思

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 專案說明

#### 專案內容

此專案是一個線上解題平台，主要會有學生和老師兩個身份端：

學生：註冊為學生後，透過購買不同價格的題數包，拍照敘述問題後上傳，等待老師即時解題回饋。

老師：註冊為老師後，透過挑選學生問題卡，並上傳解題照片/敘述解答後可獲得解題費。

#### 專案技術：

前端：以Vue框架搭配Bootstrap實作

後端：Ｎode.js + express

資料庫：MySQL

部署：前端(GitHub Page)、後端(Heroku)

其他技術：

socket.io / mocha test / nyc coverage / travis CI/CD(Heroku) / 藍新金流API / RWD / RestfulAPI

#### Home Page

![Webpicture](/public/Homepage.png)

## User Story

#### Complete

* 使用者可以依據身份註冊/登入/登出網站
* 依據身份權限能進入的頁面老師與學生不同

學生使用者

* 可以依據科目及類別上傳問題及問題照片
* 可以瀏覽自己問過的問題及問題狀態(等待解題、解題中)
* 問題獲得老師解答後可以隨時看到該題的解答
* 若可用題數餘額不足，則無法進行提問
* 可以於個人頁面根據需求購買題數包並可在訂單頁查詢
* 會依據申請的email收到訂單成立的信
* 可經由第三方金流付款後獲得可問題數餘額
* 可於個人頁面瀏覽自己的個人資訊、問過的題數及可問題數餘額

老師使用者

* 可以瀏覽所有學生的問題卡
* 可即時獲取題目，題目則不會繼續出現在問題區上
* 可經由上傳解答敘述及圖片回答問題
* 瀏覽題目時可篩選題目科目
* 可以於個人頁面瀏覽自己個人資訊及回答的題數

#### 2020/10/03 Update User Story

* 後台管理，包含商品、類別和科目等的新增/瀏覽/修改/刪除功能
* 使用者編輯個人資訊功能
* 題目或解答時的即時通知
* 點選圖片放大功能
* 瀏覽老師頁面篩選功能
* 網站一些基本敘述頁面
