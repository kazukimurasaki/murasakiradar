(function() {
  const screenButton = document.getElementById("screen");
  const screenContent = document.getElementById("screen-content");
  const sonarAudio = document.getElementById("sonar-sound");
  const dokodemoAudio = document.getElementById("dokodemo-sound");

  const RADAR_GIF = "assets/img/radar.gif";
  const FOUND_IMG = "assets/img/foundhisass.png";

  const RESULT_PAGES = [
    "assets/results/fighting.html",
    "assets/results/kensetsu.html",
    "assets/results/sweetraveparty.html",
    "assets/results/helpinghand.html",
    "assets/results/pain.html"
  ];

  const SONAR_DURATION = 9966; // 9.966 seconds
  const FOUND_WAIT = 3000;

  let active = false;

  function showOnScreen(src, alt) {
    screenContent.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";

    // force exact centering and disable any animation
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = "92%";
    img.style.height = "auto";
    img.style.objectFit = "contain";
    img.style.display = "block";
    img.style.pointerEvents = "none";
    img.style.animation = "none";
    img.style.opacity = "1";

    screenContent.appendChild(img);
  }

  async function activateRadar() {
    if (active) return;
    active = true;

    // instantly show radar
    showOnScreen(RADAR_GIF, "Radar scanning");

    try {
      sonarAudio.currentTime = 0;
      await sonarAudio.play();
    } catch (err) {
      console.warn("Audio playback issue:", err);
    }

    setTimeout(() => {
      try {
        sonarAudio.pause();
        sonarAudio.currentTime = 0;
      } catch (_) {}

      // instantly show "Murasaki Located"
      showOnScreen(FOUND_IMG, "Murasaki Located");

      try {
        dokodemoAudio.currentTime = 0;
        dokodemoAudio.play().catch(() => {});
      } catch (_) {}

      setTimeout(() => {
        const idx = Math.floor(Math.random() * RESULT_PAGES.length);
        window.location.href = RESULT_PAGES[idx];
      }, FOUND_WAIT);
    }, SONAR_DURATION);
  }

  screenButton.addEventListener("click", activateRadar);
  screenButton.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      activateRadar();
    }
  });
})();
