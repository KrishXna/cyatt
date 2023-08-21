var navbar = document.getElementById("navbar");
var navmenu = document.getElementById("navmenu");
var icon = document.getElementById("icon");

var sticky = navbar.offsetTop;

window.onscroll = function () {
  if (window.pageYOffset >= 3) {
    navbar.classList.add("bgwhite");
  } else {
    navbar.classList.remove("bgwhite");
  }
};

navbar.addEventListener("click", function () {
  if (navmenu.classList.contains("hide")) {
    navmenu.classList.remove("hide");
    navmenu.classList.add("show");
    navmenu.classList.add("bgwhite");

    changeIcon();
  } else {
    navmenu.classList.remove("show");
    navmenu.classList.add("hide");
    changeIcon();
  }
});

function changeIcon() {
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}
