function locoMotiveanimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main "),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main " element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main ", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main ").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
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
      let b = setInterval(() => {
        if (grow == 101) {
          clearInterval(b);
        } else {
          countNo.innerHTML = grow++;
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
    stagger: 0.1,
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

  tl.from(
    "#hero1 ,page2",
    {
      opacity: 0,
    },
    "-=2"
  );
}

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

function videoMouse() {
  let videoCont = document.querySelector("#video-container");
  let videoFile = document.querySelector("#video-container video");

  videoCont.addEventListener("mouseenter", () => {
    videoCont.addEventListener("mousemove", (dets) => {
      gsap.to("#crsr", {
        display: "none",
      });
      gsap.to("#video-crsr", {
        left: dets.x - 400,
        top: dets.y - 195,
      });
    });
  });
  videoCont.addEventListener("mouseleave", function () {
    gsap.to("#crsr", {
      display: "initial",
    });
    gsap.to("#video-crsr", {
      top: "6%",
      left: "80%",
    });
  });

  let flag = 0;
  videoCont.addEventListener("click", () => {
    if (flag == 0) {
      videoFile.play();

      videoFile.style.opacity = 1;
      document.querySelector(
        "#video-crsr"
      ).innerHTML = `<i class="ri-pause-line"></i>`;
      gsap.to("#video-crsr", {
        scale: 0.4,
      });
      flag = 1;
    } else {
      videoFile.pause();

      videoFile.style.opacity = 0;
      document.querySelector(
        "#video-crsr"
      ).innerHTML = `<i class="ri-play-mini-fill"></i>`;
      gsap.to("#video-crsr", {
        scale: 1,
      });
      flag = 0;
    }
  });
}

function sheyAnimation() {
  Shery.imageMasker(".image-effect" /* Element to target.*/, {
    //Parameters are optional.
    mouseFollower: true,
    text: "Project",
    ease: "cubic-bezier(0.23, 0.4, 0.320, 1)",
    duration: 1,
  });

}

locoMotiveanimation();
lodingAnimation();
cursorAnimation();
videoMouse();
sheyAnimation();
