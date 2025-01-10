// (1) 우측 슬라이드 패널 관련
const openBtn = document.getElementById("openPanelBtn");
const closeBtn = document.getElementById("closePanelBtn");
const slidePanel = document.getElementById("slidePanel");

// (2) 하단 팝업창 관련
const openBottomPopupBtn = document.getElementById("openBottomPopup");
const closeBottomPopupBtn = document.getElementById("closeBottomPopup");
const bottomPopup = document.getElementById("bottomPopup");

// 팝업 입력창 DOM 요소
const popupInput = document.querySelector(".popup-input");

// 우측 슬라이드 패널 열기/닫기
openBtn.addEventListener("click", () => {
  slidePanel.classList.add("open");
});
closeBtn.addEventListener("click", () => {
  slidePanel.classList.remove("open");
});

// 하단 팝업 열기/닫기
openBottomPopupBtn.addEventListener("click", () => {
  bottomPopup.classList.add("open");
});
closeBottomPopupBtn.addEventListener("click", () => {
  bottomPopup.classList.remove("open");
});

/* 
  (3) 하단 팝업 내 검색 필터 기능:
  입력창에 글자를 입력할 때마다, 
  .popup-content 안의 <p> 태그들을 순회하며
  검색어와 일치하는 문단만 보이도록 처리
*/

// 이벤트 리스너 (실시간 필터링)
popupInput.addEventListener("input", () => {
  const searchValue = popupInput.value.trim().toLowerCase();
  // .popup-content 내부의 모든 <p> 태그 가져오기
  const paragraphs = document.querySelectorAll(".popup-content p");

  // 각 문단을 순회하며, 검색어 포함 여부로 display 설정
  paragraphs.forEach((p) => {
    // 문단 텍스트 소문자 vs 검색어 소문자 비교
    const text = p.textContent.toLowerCase();

    // 검색어가 비어있거나(text가 ""이거나), 문단에 포함되어 있으면 보이기
    if (!searchValue || text.includes(searchValue)) {
      p.style.display = ""; // 기본 표시(보이기)
    } else {
      p.style.display = "none"; // 필터된 문단 숨기기
    }
  });
});
