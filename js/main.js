let notices = [];

async function loadNotices() {
  const res = await fetch("./data/sample_notices.json");
  notices = await res.json();

  renderNotices(notices);
}

function renderNotices(list) {
  const container = document.getElementById("noticeList");
  container.innerHTML = "";

  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "notice-card";

    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>기관: ${item.agency}</p>
      <p>지역: ${item.region}</p>
      <p>대상: ${item.target}</p>
      <p>마감: ${item.deadline}</p>
      <a href="${item.url}" target="_blank">원문 보기</a>
    `;

    container.appendChild(div);
  });
}

// 검색 기능
document.getElementById("searchInput")
  .addEventListener("input", e => {

    const keyword = e.target.value.toLowerCase();

    const filtered = notices.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.agency.toLowerCase().includes(keyword)
    );

    renderNotices(filtered);
  });

// 시작
loadNotices();