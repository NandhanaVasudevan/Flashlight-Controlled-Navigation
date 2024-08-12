document.addEventListener("mousemove", function (event) {
  const flashlight = document.querySelector(".flashlight");
  flashlight.style.left = event.pageX + "px";
  flashlight.style.top = event.pageY + "px";

  const links = document.querySelectorAll("nav.hidden-nav a");
  links.forEach(link => {
      const rect = link.getBoundingClientRect();
      const distance = Math.hypot(rect.x + rect.width / 2 - event.clientX, rect.y + rect.height / 2 - event.clientY);

      if (distance < 100) {
          link.style.opacity = 1;
      } else {
          link.style.opacity = 0;
      }
  });
});