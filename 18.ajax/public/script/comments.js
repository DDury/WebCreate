const commentBtn = document.getElementById("load-comments");
const section = document.getElementById("comments");
const saveBtn = document.querySelector("#comments-form form");
const titleinp = document.getElementById("title");
const textnp = document.getElementById("text");

const listarray = (comments) => {
  const cre_ol = document.createElement("ol");
  comments.forEach((comment) => {
    const cre_li = document.createElement("li");
    cre_li.innerHTML = `<article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
            </article>`;
    cre_ol.appendChild(cre_li);
  });
  return cre_ol;
};

async function getcomment() {
  const id = commentBtn.dataset.postid;
  const response = await fetch(`/posts/${id}/comments`);
  const resdata = await response.json();
  console.log(resdata);
  if (resdata.length > 0) {
    const commentlist = listarray(resdata);
    section.innerHTML = "";
    section.appendChild(commentlist);
  } else {
    section.firstElementChild.textContent = "please leave first comment!";
  }
}

async function savecomment(event) {
  event.preventDefault();
  const id = saveBtn.dataset.postid;
  const newcomment = { title: titleinp.value, text: textnp.value };
  const response = await fetch(`/posts/${id}/comments`, {
    method: "post",
    body: JSON.stringify(newcomment),
    headers: { "Content-type": "application/json" },
  });
  const result = await response.json();
  alert(result.message);
  console.log(result.message);
  getcomment();
}

commentBtn.addEventListener("click", getcomment);
saveBtn.addEventListener("submit", savecomment);
