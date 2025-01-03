const commentBtn = document.getElementById("load-comments");
const section = document.getElementById("comments");

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

  const commentlist = listarray(resdata);
  section.innerHTML = "";
  section.appendChild(commentlist);
}

commentBtn.addEventListener("click", getcomment);
