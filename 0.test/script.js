// DOM 요소 참조
const openBtn = document.getElementById("openPanelBtn");
const closeBtn = document.getElementById("closePanelBtn");
const slidePanel = document.getElementById("slidePanel");

// 패널 열기
openBtn.addEventListener("click", () => {
  slidePanel.classList.add("open");
});

// 패널 닫기
closeBtn.addEventListener("click", () => {
  slidePanel.classList.remove("open");
});
