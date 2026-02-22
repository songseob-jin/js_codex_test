let notices = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* 공고 불러오기 */
async function loadNotices() {
  const res = await fetch("./data/sample_notices.json");
  notices = await res.json();

  renderNotices(notices);
}

/* 화면 출력 */
function renderNotices(list) {
  const container = document.getElementById("noticeList");
  container.innerHTML = "";

  list.forEach(item => {

    const isFav = favorites.includes(item.id);

    const div = document.createElement("div");
    div.className = "notice-card";

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>기관: ${item.agency}</p>
      <p>지역: ${item.region}</p>
      <p>대상: ${item.target}</p>
      <p>마감: ${item.deadline}</p>

      <button class="fav-btn" data-id="${item.id}">
        ${isFav ? "★ 찜됨" : "☆ 찜하기"}
      </button>

      <br/><br/>
      <a href="${item.url}" target="_blank">원문 보기</a>
    `;

    container.appendChild(div);
  });

  /* 버튼 이벤트 연결 */
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", toggleFavorite);
  });
}

/* 즐겨찾기 토글 */
function toggleFavorite(e) {
  const id = Number(e.target.dataset.id);

  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  renderNotices(notices);
}

/* 검색 */
document.getElementById("searchInput")
  .addEventListener("input", e => {

    const keyword = e.target.value.toLowerCase();

    const filtered = notices.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.agency.toLowerCase().includes(keyword)
    );

    renderNotices(filtered);
  });

/* 즐겨찾기만 보기 */
document.getElementById("showFavoritesBtn")
  .addEventListener("click", () => {

    if (favorites.length === 0) {
      alert("즐겨찾기한 공고가 없습니다.");
      return;
    }

    const favList = notices.filter(n =>
      favorites.includes(n.id)
    );

    renderNotices(favList);
  });

/* 시작 */
loadNotices();