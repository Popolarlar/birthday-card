const hero = document.querySelector(".hero");
const eyes = hero.querySelector("#eyes");
const rightEye = eyes.querySelector(".right");
const leftEye = eyes.querySelector(".left");
const xMaxWalk = 15;
const yMaxWalk = 6;
hero.addEventListener("mousemove", debounce(handleMouseMove));

function handleMouseMove(e) {
  const { offsetWidth: width, offsetHeight: height } = hero;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + e.target.getBoundingClientRect().left;
    y = y + e.target.getBoundingClientRect().top;
  }

  const xWalk = Math.round((x / width) * xMaxWalk - xMaxWalk);
  const yWalk = Math.round((y / height) * yMaxWalk);

  rightEye.setAttribute("transform", `translate(${xWalk}, ${yWalk})`);
  leftEye.setAttribute("transform", `translate(${xWalk}, ${yWalk})`);
}

function debounce(func, wait = 5, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const giftboxes = document.querySelectorAll(".giftbox");
giftboxes.forEach((giftbox) => {
  giftbox.addEventListener("click", revealGift);
});

function revealGift(e) {
  e.target.closest(".option").classList.add("show");
}

const gifts = document.querySelectorAll(".gift");
const modal = document.querySelector(".modal");
gifts.forEach((gift) => {
  gift.addEventListener("click", toggleModal);
});

function toggleModal(e) {
  const index = e.target.closest(".option").dataset.index;
  if (index != 1) {
    modal
      .querySelector(".modal__coupon img")
      .setAttribute("src", `images/coupon${index}.png`);
    modal.classList.add("open");
  } else {
    modal.classList.add("open-photos");
  }
}

modal.addEventListener("click", () => {
  modal.classList.remove("open", "open-photos");
});
