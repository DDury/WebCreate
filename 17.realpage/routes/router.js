// routes/router.js
const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");

const router = express.Router();

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

/**
 * 1) 엑셀 파일 업로드 및 DB 저장
 * POST /upload
 */
router.post("/upload", upload.single("excelFile"), async (req, res) => {
  try {
    // app.locals.db를 통해 DB 핸들러 참조
    const db = req.app.locals.db;

    // 1. 업로드된 파일에서 Workbook 객체 생성
    const workbook = XLSX.readFile(req.file.path);
    // 2. 첫 번째 시트를 가져옴
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // 3. 시트 데이터를 JSON으로 변환
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    // 예: [{teamName:'A팀', year:2024, month:1, value:100}, ...]

    // 4. 변환된 JSON 데이터를 MongoDB에 삽입
    //    'stats' 컬렉션이 없으면 자동으로 생성됨
    const result = await db.collection("stats").insertMany(jsonData);

    console.log(`${result.insertedCount}개의 문서가 추가되었습니다.`);
    res
      .status(200)
      .json({
        message: "업로드 및 DB 저장 성공!",
        count: result.insertedCount,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "업로드 실패", error: err.message });
  }
});

/**
 * 2) 필터 조건에 맞는 통계 데이터를 조회
 * GET /stats?teamName=...&year=...&month=...
 */
router.get("/stats", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { teamName, year, month } = req.query;

    // 검색 조건 구성
    const filter = {};
    if (teamName) filter.teamName = teamName;
    if (year) filter.year = parseInt(year);
    if (month) filter.month = parseInt(month);

    // DB에서 filter 조건으로 조회
    const statsData = await db.collection("stats").find(filter).toArray();
    res.status(200).json(statsData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "데이터 조회 실패", error: err.message });
  }
});

module.exports = router;
