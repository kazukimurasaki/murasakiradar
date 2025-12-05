(function() {
  const screenButton = document.getElementById("screen");
  const screenContent = document.getElementById("screen-content");
  const sonarAudio = document.getElementById("sonar-sound");
  const dokodemoAudio = document.getElementById("dokodemo-sound");

  const RADAR_GIF = "assets/img/radar.gif";
  const FOUND_IMG = "assets/img/foundhisass.png";

  // Only five working result pages now
  const RESULT_PAGES = [
    "assets/results/fighting.html",
    "assets/results/kensetsu.html",
    "assets/results/sweetraveparty.html",
    "assets/results/helpinghand.html",
    "assets/results/pain.html"
  ];

  const SONAR_DURATION = 9966; // 9.966 seconds
  const FOUND_WAIT = 3000;     // 3 seconds before redirect

  let active = false;

  function showOnScreen(src, alt, fade = true) {
    screenContent.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    if (fade) img.className = "fade-in";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    screenContent.appendChild(img);
  }

  async function activateRadar() {
    if (active) return;
    active = true;

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

      showOnScreen(FOUND_IMG, "Murasaki Located", false);

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
