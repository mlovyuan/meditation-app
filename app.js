const app = () => {
  const video = document.querySelector(".vid- container video");
  const sounds = document.querySelectorAll(".sound-picker button");
  const outline = document.querySelector(".moving-outline circle");
  const outlineLength = outline.getTotalLength();

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  const play = document.querySelector(".play");
  const song = document.querySelector(".song");
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  const checkPlaying = (playedSong) => {
    if (playedSong.pause) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  let fakeDuration = 600;
  const timeSelect = document.querySelectorAll(".time select button");
  timeSelect.forEach((timeButton) => {
    timeButton.addEventListener("click", () => {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  const timeDisplay = document.querySelector(".time-display");
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    timeDisplay.textContent = `${minutes}:${seconds}`;
  };
};

app();
