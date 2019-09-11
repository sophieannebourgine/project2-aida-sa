const burger = document.querySelector(".icon.mobile");
const navMobile = document.getElementById("sidebar_main");
console.log(navMobile);

function toggleMobileNav(evt) {
  console.log("click");
  navMobile.classList.toggle("is-active");
}

burger.addEventListener("click", toggleMobileNav);
