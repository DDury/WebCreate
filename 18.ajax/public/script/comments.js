const commentBtn = document.getElementById("load-comments");

async function getcomment() {
  const id = commentBtn.dataset.postid;
  const response = await fetch(`/posts/${id}/comments`);
  const resdata = await response.json();
  console.log(resdata);
}

commentBtn.addEventListener("click", getcomment);
