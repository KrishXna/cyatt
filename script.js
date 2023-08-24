var navbar = document.getElementById("navbar");
var navmenu = document.getElementById("navmenu");
var icon = document.getElementById("icon");
var contactForm = document.getElementById("contactForm");
var faq = document.querySelectorAll(".faq");
var faqIcon = document.querySelectorAll(".faq-icon");

var sticky = navbar.offsetTop;

window.onscroll = function () {
  if (window.pageYOffset >= 3) {
    navbar.classList.add("bgwhite");
  } else {
    navbar.classList.remove("bgwhite");
  }
};

icon.addEventListener("click", function () {
  if (navmenu.classList.contains("hide")) {
    navmenu.classList.remove("hide");
    navmenu.classList.add("show");
    navmenu.classList.add("bgwhite");
    navbar.classList.add("bgwhite");
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
    faqIcon.classList.toggle("active");
  });
});
