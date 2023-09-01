const navbar = document.getElementById("navbar");
const navmenu = document.getElementById("navmenu");
const icon = document.getElementById("icon");
const logo = document.getElementById("logo");
const text = document.getElementById("text");
const para = document.getElementById("para");
const body = document.getElementById("body");

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

navbar.addEventListener("click", function () {
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
    // changeIcon();
  } else {
    body.classList.remove("overflow-hidden");
    navmenu.classList.remove("show");
    navmenu.classList.add("hide");
    // icon.classList.add("active-invert");
    // logo.classList.add("active-invert");
    // changeIcon();
  }
});

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
const swiper = new Swiper(".swiper", {
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
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  const formDataObj = {};

  formData.forEach(function (value, key) {
    formDataObj[key] = value;
  });

  // Validate form fields
  const { name, email, contact, services, Preferredoption } = formDataObj;
  console.log(formDataObj);

  if (!name || !email || !services || !contact || !Preferredoption) {
    alert("Please fill  all required fields.");
    return;
  }

  const { Client, ID, Databases } = Appwrite;
  const client = new Client();
  const databases = new Databases(client);

  client
    .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    .setProject("64ba1b7466f6731fb61e"); // Your project ID

  const promise = databases.createDocument(
    "64ba4ae247cd5174dd91", //databaseId
    "64e5a0031d0afb07bac9", //collectionId
    ID.unique(),
    formDataObj
  );

  promise.then(
    function (response) {
      if (response.$id) {
        if (formsuccessDiv.classList.contains("formsuccesshide")) {
          formsuccessDiv.classList.remove("formsuccesshide");
          setTimeout(() => {
            formsuccessDiv.classList.add("formsuccesshide");
          }, 1500);
        }
        // alert("Data submitted successfully.");
        contactForm.reset();
      } else {
        alert("An error occurred while submitting the form.");
      }
    },
    function (error) {
      console.log({ error }); // Log the error for debugging
      if (error && error.message) {
        alert("An error occurred: " + error.message);
      } else {
        alert("An error occurred while submitting the form.");
      }
    }
  );
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
