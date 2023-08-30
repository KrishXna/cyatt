var navbar = document.getElementById("navbar");
var navmenu = document.getElementById("navmenu");
var icon = document.getElementById("icon");
var logo = document.getElementById("logo");
var text = document.getElementById("text");
var para = document.getElementById("para");
var body = document.getElementById("body");

var contactForm = document.getElementById("contactForm");
var faq = document.querySelectorAll(".faq");
var faqIcon = document.querySelectorAll(".faq-icon");

var sticky = navbar.offsetTop;

window.onscroll = function () {
  if (window.pageYOffset >= 10) {
    navbar.classList.add("bgwhite");
    icon.classList.remove("active-invert");
    logo.classList.remove("active-invert");
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
    changeIcon();
  } else {
    body.classList.remove("overflow-hidden");
    navmenu.classList.remove("show");
    navmenu.classList.add("hide");
    // icon.classList.add("active-invert");
    // logo.classList.add("active-invert");
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
        alert("Data submitted successfully.");
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
