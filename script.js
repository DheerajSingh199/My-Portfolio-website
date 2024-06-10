function lodingAnimation() {
  let tl = gsap.timeline();
  tl.from(".textHeading h1", {
    y: 150,
    stagger: 0.3,
    duration: 0.9,
    delay: 0.2,
  });

  tl.from("#textHeading-part1, .textHeading h2", {
    opacity: 0,
    onStart: function () {
      let countNo = document.querySelector("#textHeading-part1 h5");
      let grow = 0;
      setInterval(() => {
        if (grow < 100) {
          countNo.innerHTML = grow++;
        } else {
          countNo.innerHTML = grow;
        }
      }, 20);
    },
  });

  tl.from(".textHeading2 h4", {
    stagger: 0.1,
    opacity: 0,
  });

  tl.to("#loader", {
    opacity: 0,
    delay: 2,
    duration: 0.4,
  });

  tl.from("#page1", {
    delay: 0.2,
    y: 1000,
  });
  tl.to("#loader", {
    display: "none",
  });

  tl.from("#hero1 h1,#hero2 h1, #hero3 h2,#hero4 h1", {
    y: 140,
    stagger: 0.2,
  });

   tl.from("#nav", {
    y: -50,
    opacity: 0,
    stagger: 0.2,
  });

  tl.from("#nav-2 h4", {
    y: -50,
    opacity: 0,
    stagger: 0.2,
  });
}
lodingAnimation();

function cursorAnimation() {
  document.addEventListener("mousemove", (moment) => {
    gsap.to("#crsr", {
      left: moment.x,
      top: moment.y,
    });
  });

  Shery.makeMagnet(".textHeading2 h4", {
    ease: "cubic-bezier(0.23, 1, 0.320,1)",
    duration: 1,
  });
  Shery.makeMagnet("#nav svg", {
    ease: "cubic-bezier(0.23, 1, 0.320,1)",
    duration: 1,
  });
  
  
  Shery.makeMagnet("#nav-2 h4", {});
}
cursorAnimation();


