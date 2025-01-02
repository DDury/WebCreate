const pickedimage = document.getElementById("image");
const preview = document.getElementById("preview");

const showpreview = () => {
  const file = pickedimage.files[0];
  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
};

pickedimage.addEventListener("change", showpreview);
