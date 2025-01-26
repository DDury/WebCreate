const Posting = require("../models/post");

const getHome = (req, res) => {
  res.render("welcome", { csrfToken: req.csrfToken() });
};

const getAdmin = async (req, res) => {
  //   if (!res.locals.isAuth) {
  //     return res.status(401).render("401");
  //   }

  // const posts = await db.getDb().collection("posts").find().toArray();
  const posts = await Posting.fetchall("posts");

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: "",
      content: "",
    };
  }

  req.session.inputData = null;

  res.render("admin", {
    posts: posts,
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
};

const savePost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === "" ||
    enteredContent.trim() === ""
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect("/admin");
    return; // or return res.redirect('/admin'); => Has the same effect
  }
  ///class
  const post = new Posting(enteredTitle, enteredContent);
  await post.save("posts");

  res.redirect("/admin");
};

const getsinglepost = async (req, res) => {
  const post = new Posting(null, null, req.params.id);
  await post.fetch("posts");

  if (!post) {
    return res.render("404"); // 404.ejs is missing at this point - it will be added later!
  }

  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      title: post.title,
      content: post.content,
    };
  }

  req.session.inputData = null;

  res.render("single-post", {
    post: post,
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
};

const editpost = async (req, res) => {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredTitle.trim() === "" ||
    enteredContent.trim() === ""
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data.",
      title: enteredTitle,
      content: enteredContent,
    };

    res.redirect(`/posts/${req.params.id}/edit`);
    return;
  }
  ///class
  const post = new Posting(enteredTitle, enteredContent, req.params.id);
  post.save("posts");

  res.redirect("/admin");
};

const delpost = async (req, res) => {
  ///class
  const post = new Posting(null, null, req.params.id);
  post.delete("posts");

  res.redirect("/admin");
};

module.exports = {
  getHome: getHome,
  getAdmin: getAdmin,
  savePost: savePost,
  getsinglepost: getsinglepost,
  editpost: editpost,
  delpost: delpost,
};
