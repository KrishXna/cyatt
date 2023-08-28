var navbar = document.getElementById("navbar");
var navmenu = document.getElementById("navmenu");
var icon = document.getElementById("icon");
var logo = document.getElementById("logo");
var text = document.getElementById("text");
var para = document.getElementById("para");

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
    // navbar.classList.remove("bgwhite");
    // icon.classList.add("active-invert");
    // logo.classList.add("active-invert");
    // text.classList.add("active-invert");
    // para.classList.add("active-invert");
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

// Testimonial Slider
const swiper = new Swiper(".swiper", {
  slidesPerView: 5,
  slidesPerColumn: 2,
  spaceBetween: 30,
  centeredSlides: true,
  // cssMode: true,

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
  // breakpoints: {
  //   300: {
  //     slidesPerView: 2,
  //     slidesPerColumn: 2,
  //   },
  //   640: {
  //     slidesPerView: 3,
  //     slidesPerColumn: 2,
  //   },
  //   1024: {
  //     slidesPerView: 5,
  //     slidesPerColumn: 2,
  //   },
  // },

  // And if we need scrollbar
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
  const { name, email, contact, message } = formDataObj;

  if (!name || !email || !message || !contact) {
    alert("Please fill in all required fields.");
    return;
  }
  // alert("Data submitted successfully.");
  this.reset();

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
      // console.log({ response }); // Success
    },
    function (error) {
      console.log({ error }); // Failure
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
//When the document is ready
$(function () {
  //This is triggered when the
  //user scrolls the page
  $(window).scroll(function () {
    //Checking if each items to animate are
    //visible in the viewport
    $("h2[data-max]").each(function () {
      inVisible($(this));
    });
  });
});
