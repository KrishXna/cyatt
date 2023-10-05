const navbar = document.getElementById("navbar");
const navmenu = document.getElementById("navmenu");
const icon = document.getElementById("icon");
const logo = document.getElementById("logo");
const text = document.getElementById("text");
const para = document.getElementById("para");
const body = document.getElementById("body");
const menu = document.querySelectorAll(".menu");

const contactForm = document.getElementById("contactForm");
const faq = document.querySelectorAll(".faq");
const faqIcon = document.querySelectorAll(".faq-icon");

const sticky = navbar.offsetTop;
const formsuccessDiv = document.getElementById("formsuccess");

window.onscroll = function () {
  if (window.pageYOffset >= 10) {
    navbar.classList.add("bgwhite");
    logo.classList.remove("active-invert");
    icon.classList.remove("active-invert");
    text.classList.remove("active-invert");
    para.classList.remove("active-invert");
  } else {
    navbar.classList.remove("bgwhite");
    icon.classList.add("active-invert");
    logo.classList.add("active-invert");
    text.classList.add("active-invert");
    para.classList.add("active-invert");
  }
};

icon.addEventListener("click", handleNav);

function handleNav() {
  rotate();
  if (navmenu.classList.contains("hide")) {
    navmenu.classList.remove("hide");
    navmenu.classList.add("show");
    navmenu.classList.add("white");
    navbar.classList.add("bgwhite");
    logo.classList.remove("active-invert");
    icon.classList.remove("active-invert");
    text.classList.remove("active-invert");
    para.classList.remove("active-invert");
    body.classList.add("overflow-hidden");
  } else {
    body.classList.remove("overflow-hidden");
    navmenu.classList.remove("show");
    navmenu.classList.add("hide");
  }
}

for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", handleNav);
}

let rotateElm = true;
function rotate() {
  const line1 = document.querySelector(".line1");
  const line2 = document.querySelector(".line2");
  const line3 = document.querySelector(".line3");

  if (rotateElm) {
    line1.style.transform = "rotate(45deg)";
    line1.style.top = "5px";
    line2.classList.add("linehide");
    line3.style.transform = "rotate(-45deg)";
    line3.style.top = "-2px";
  } else {
    line1.style.transform = "none";
    line1.style.top = "0";
    line2.classList.remove("linehide");
    line3.style.transform = "none";
    line3.style.top = "0";
  }
  rotateElm = !rotateElm;
}

// function changeIcon() {
//   if (icon.classList.contains("fa-bars")) {
//     icon.classList.remove("fa-bars");
//     icon.classList.add("fa-times");
//   } else {
//     icon.classList.remove("fa-times");
//     icon.classList.add("fa-bars");
//   }
// }

// Testimonial Slider
const swiper2 = new Swiper(".swiper2", {
  draggable: true,
  freemode: true,
  speed: 3000,
  spaceBetween: 30,

  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  breakpoints: {
    300: {
      slidesPerView: 2,
      slidesPerColumn: 2,
    },
    640: {
      slidesPerView: 3,
      slidesPerColumn: 2,
    },
    1024: {
      slidesPerView: 5,
      slidesPerColumn: 2,
    },
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Form Appwrite Connection
function formValidate() {
  let username = document.getElementById("name").value;
  let trimName = username.trimStart();
  let useremail = document.getElementById("email").value;
  let usercontact = document.getElementById("contact").value;

  let nameErr = document.getElementById("error-name");
  let emailErr = document.getElementById("error-email");
  let contactErr = document.getElementById("error-contact");

  let nameRegex = /^[a-zA-Z\s]{3,}$/;
  const nameR = nameRegex.test(trimName);
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  const emailR = emailRegex.test(useremail);
  let phoneRegex = /^[+0-9]{10,13}$/;
  const phoneR = phoneRegex.test(usercontact);

  if (!username) {
    nameErr.innerText = "Name is required";
  } else if (nameR == false) {
    nameErr.innerText = "Invalid Name ";
  } else {
    nameErr.innerText = "";
  }

  if (!useremail) {
    emailErr.innerText = "Email is required";
  } else if (emailR == false) {
    emailErr.innerText = "Invalid email type";
  } else {
    emailErr.innerText = "";
  }

  if (!usercontact) {
    contactErr.innerText = "Phone Number is required";
  } else if (phoneR == false) {
    contactErr.innerText = "Invalid Phone Number";
  } else {
    contactErr.innerText = "";
  }

  if (nameErr.innerText || emailErr.innerText || contactErr.innerText) {
    return false;
  }

  return true;
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!formValidate()) {
    return;
  }

  const formData = new FormData(this);
  const formDataObj = {};

  formData.forEach(function (value, key) {
    formDataObj[key] = value;
  });

  const { Client, ID, Databases } = Appwrite;
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("64fc06fba3efbe47dbf7"); // Your project ID

  const promise = databases.createDocument(
    "64fc071f07499a09505a", //databaseId
    "64fc072e799e7c3f1c91", //collectionId
    ID.unique(),
    formDataObj
  );
  promise.then(function (response) {
    if (response.$id) {
      if (formsuccessDiv.classList.contains("formsuccesshide")) {
        formsuccessDiv.classList.remove("formsuccesshide");
        setTimeout(() => {
          formsuccessDiv.classList.add("formsuccesshide");
        }, 1500);
      }
      contactForm.reset();
    } else {
      console.log("An error occurred while submitting the form.");
    }
  });
});

// Number Increases on scroll
faq.forEach((e) => {
  var question = e.querySelector(".question");
  var answer = e.querySelector(".answer");
  var faqIcon = e.querySelector(".faq-icon");

  question.addEventListener("click", () => {
    answer.classList.toggle("faq-active");
    if (answer.classList.contains("faq-active")) {
      answer.style.borderColor = "#c9f31d";
    } else {
      answer.style.borderColor = "#000";
    }
    faqIcon.classList.toggle("active");
  });
});

function inVisible(element) {
  //Checking if the element is
  //visible in the viewport
  var WindowTop = $(window).scrollTop();
  var WindowBottom = WindowTop + $(window).height();
  var ElementTop = element.offset().top;
  var ElementBottom = ElementTop + element.height();
  //animating the element if it is
  //visible in the viewport
  if (ElementBottom <= WindowBottom && ElementTop >= WindowTop)
    animate(element);
}
function animate(element) {
  //Animating the element if not animated before
  if (!element.hasClass("ms-animated")) {
    var maxval = element.data("max");
    var html = element.html();
    element.addClass("ms-animated");
    $({
      countNum: element.html(),
    }).animate(
      {
        countNum: maxval,
      },
      {
        //duration 5 seconds
        duration: 5000,
        easing: "linear",
        step: function () {
          element.html(Math.floor(this.countNum) + html);
        },
        complete: function () {
          element.html(this.countNum + html);
        },
      }
    );
  }
}
$(function () {
  $(window).scroll(function () {
    $("[data-max]").each(function () {
      inVisible($(this));
    });
  });
});

// form option Virtual or Office
const virtualOption = document.getElementById("virtualOption");
const inOfficeOption = document.getElementById("inOfficeOption");

const virtualRadio = document.getElementById("virtualRadio");
const inOfficeRadio = document.getElementById("inOfficeRadio");

virtualRadio.addEventListener("change", function () {
  virtualOption.style.backgroundColor = "#c9f31d";
  inOfficeOption.style.backgroundColor = "transparent";
});

inOfficeRadio.addEventListener("change", function () {
  inOfficeOption.style.backgroundColor = "#c9f31d";
  virtualOption.style.backgroundColor = "transparent";
});

// Cursor Pointer
const cursor = document.querySelector(".mousecursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;"
  );
});
document.addEventListener("click", (e) => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

// Testimonial Slider
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const swiper1 = new Swiper(".swiper1", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

const items = document.querySelectorAll(".items");

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    [].forEach.call(items, function (el) {
      el.classList.remove("active");
    });
    items[i].classList.add("active");
  });
}

const basicRadio = document.getElementById("basicRadio");
const standardRadio = document.getElementById("standardRadio");
const premiumRadio = document.getElementById("premiumRadio");

const basicOption = document.getElementById("basicOption");
const standardOption = document.getElementById("standardOption");
const premiumOption = document.getElementById("premiumOption");

const basicPlan = document.getElementById("basicPlan");
basicRadio.addEventListener("change", function () {
  basicOption.style.backgroundColor = "#c9f31d";
  standardOption.style.backgroundColor = "#fff";
  premiumOption.style.backgroundColor = "#fff";
  if (basicPlan.classList.contains("hide")) {
    basicPlan.classList.remove("hide");
    standardPlan.classList.add("hide");
    premiumPlan.classList.add("hide");
  }
});
const standardPlan = document.getElementById("standardPlan");
standardRadio.addEventListener("change", function () {
  standardOption.style.backgroundColor = "#c9f31d";
  basicOption.style.backgroundColor = "#fff";
  premiumOption.style.backgroundColor = "#fff";
  if (standardPlan.classList.contains("hide")) {
    standardPlan.classList.remove("hide");
    ``;
    basicPlan.classList.add("hide");
    premiumPlan.classList.add("hide");
  }
});
const premiumPlan = document.getElementById("premiumPlan");
premiumRadio.addEventListener("change", function () {
  premiumOption.style.backgroundColor = "#c9f31d";
  basicOption.style.backgroundColor = "#fff";
  standardOption.style.backgroundColor = "#fff";
  if (premiumPlan.classList.contains("hide")) {
    premiumPlan.classList.remove("hide");
    standardPlan.classList.add("hide");
    basicPlan.classList.add("hide");
  }
});
