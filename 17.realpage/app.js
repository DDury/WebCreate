// app.js
const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const router = require("./routes/router");

const app = express();

// MongoDB 연결 설정
const url = "mongodb://127.0.0.1:27017"; // 로컬 DB 예시
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  // useNewUrlParser: true, // 최신 드라이버에서는 기본 내장
});

// Express 바디 파서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// DB 연결 후 서버 구동
async function startServer() {
  try {
    // MongoDB 연결
    await client.connect();
    console.log("MongoDB connected!");

    // 사용할 데이터베이스 선택
    const db = client.db("myStatsDB");

    // Express 앱에서 DB에 접근할 수 있도록 app.locals 에 저장
    app.locals.db = db;

    // 라우터 연결 (라우터에도 DB를 넘겨줄 수 있도록)
    app.use("/", router);

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
