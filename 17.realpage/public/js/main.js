// public/js/main.js

/**
 * /stats 로부터 데이터를 가져오는 함수
 * @param {Object} params - { teamName: '', year: '', month: '' }
 */
async function fetchStats(params = {}) {
  // GET /stats?teamName=...&year=...&month=...
  const query = new URLSearchParams(params).toString();
  const url = `/stats?${query}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

/**
 * 드롭다운(팀/연도/월) 옵션을 채우는 함수
 */
async function populateFilters() {
  const allData = await fetchStats(); // 전체 데이터 조회

  // 중복 제거를 위한 Set
  const teamSet = new Set();
  const yearSet = new Set();
  const monthSet = new Set();

  allData.forEach((item) => {
    if (item.teamName) teamSet.add(item.teamName);
    if (item.year) yearSet.add(item.year);
    if (item.month) monthSet.add(item.month);
  });

  const teamFilter = document.getElementById("teamFilter");
  const yearFilter = document.getElementById("yearFilter");
  const monthFilter = document.getElementById("monthFilter");

  // 기존 옵션 초기화
  teamFilter.innerHTML = `<option value="">팀 선택</option>`;
  yearFilter.innerHTML = `<option value="">연도 선택</option>`;
  monthFilter.innerHTML = `<option value="">월 선택</option>`;

  // 새로운 옵션 추가
  teamSet.forEach((team) => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });

  yearSet.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });

  monthSet.forEach((month) => {
    const option = document.createElement("option");
    option.value = month;
    option.textContent = month;
    monthFilter.appendChild(option);
  });
}

// Chart.js 차트 객체 전역 변수
let myChart;

/**
 * 드롭다운 값에 따라 차트를 업데이트
 */
async function updateChart() {
  const team = document.getElementById("teamFilter").value;
  const year = document.getElementById("yearFilter").value;
  const month = document.getElementById("monthFilter").value;

  const params = {};
  if (team) params.teamName = team;
  if (year) params.year = year;
  if (month) params.month = month;

  const filteredData = await fetchStats(params);

  // 예: x축: 연도-월, y축: value
  const labels = filteredData.map((d) => `${d.year}-${d.month}`);
  const values = filteredData.map((d) => d.value);

  const ctx = document.getElementById("myChart").getContext("2d");

  // 기존 차트 있으면 파괴
  if (myChart) {
    myChart.destroy();
  }

  // 새 차트 생성
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "실적 수치",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

/**
 * 초기화 로직
 */
document.addEventListener("DOMContentLoaded", async () => {
  await populateFilters();
  await updateChart();

  // 필터 버튼
  document.getElementById("filterBtn").addEventListener("click", updateChart);

  // 업로드 폼
  const uploadForm = document.getElementById("uploadForm");
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert(result.message);

      // 업로드 후 필터/차트 갱신
      await populateFilters();
      await updateChart();
    } catch (err) {
      console.error(err);
      alert("업로드 중 오류가 발생했습니다");
    }
  });
});
