let initialCards = [
  (card0 = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  }),
  (card1 = {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  }),
  (card2 = {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  }),
  (card3 = {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  }),
  (card4 = {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  }),
  (card5 = {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }),
];

let modal = document.querySelector(".modal");
document
  .querySelector(".profile__edit")
  .addEventListener("click", function (event) {
    modal.classList.add("modal_opened");
  });

let modalCloseButton = modal.querySelector(".modal__close");
modalCloseButton.addEventListener("click", function (event) {
  modal.classList.remove("modal_opened");
});
