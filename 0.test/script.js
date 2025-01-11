/********************************
 *  (1) 우측 슬라이드 패널
 ********************************/
const openBtn = document.getElementById("openPanelBtn");
const closeBtn = document.getElementById("closePanelBtn");
const slidePanel = document.getElementById("slidePanel");

// 우측 패널 열기
openBtn.addEventListener("click", () => {
  slidePanel.classList.add("open");
});
// 우측 패널 닫기
closeBtn.addEventListener("click", () => {
  slidePanel.classList.remove("open");
});

/********************************
 *  (2) 아일랜드 팝업
 ********************************/
const openIslandBtn = document.getElementById("openIslandBtn");
const closeIslandBtn = document.getElementById("closeIslandBtn");
const bottomIsland = document.getElementById("bottomIsland");

// 아일랜드 팝업 열기
openIslandBtn.addEventListener("click", () => {
  bottomIsland.classList.add("open");
});
// 아일랜드 팝업 닫기
closeIslandBtn.addEventListener("click", () => {
  bottomIsland.classList.remove("open");
});

/********************************
 *  (3) 실시간 필터링
 *     (아일랜드 팝업 내부)
 ********************************/
const islandInput = document.querySelector(".island-input"); // 팝업 검색창
const islandParas = document.querySelectorAll(".island-content p"); // 필터 대상 문단들

islandInput.addEventListener("input", () => {
  // 입력값 (소문자로)
  const searchValue = islandInput.value.trim().toLowerCase();

  // 문단들 순회하면서, 검색어 포함 여부에 따라 표시/숨김
  islandParas.forEach((p) => {
    const text = p.textContent.toLowerCase();
    if (!searchValue || text.includes(searchValue)) {
      p.style.display = "";
    } else {
      p.style.display = "none";
    }
  });
});
// 클릭 이벤트로 서브메뉴 표시/숨김 제어
// document.querySelectorAll(".menu-item > a").forEach((menu) => {
//   menu.addEventListener("click", (e) => {
//     e.preventDefault(); // 기본 링크 동작 막기
//     const submenu = menu.nextElementSibling;
//     if (submenu && submenu.classList.contains("submenu")) {
//       submenu.style.display =
//         submenu.style.display === "block" ? "none" : "block";
//     }
//   });
// });

// 클릭 외부 영역에서 서브메뉴 숨기기 (선택 사항)
// document.addEventListener("click", (e) => {
//   if (!e.target.closest(".menu-item")) {
//     document
//       .querySelectorAll(".submenu")
//       .forEach((submenu) => (submenu.style.display = "none"));
//   }
// });
