
    const emojis = ["✨", "🚀", "🎉", "🍕", "🐱", "🌈", "🤔", "🫥", "😱", "👩🏽‍🚀", "🧟", "🦊","👑","🐣","🐱","🐼","🦁","🦄","🦤","🦜","🍄","🌞","🌊","🥑"];
    let startTimestamp;
    let emoji = document.getElementById("emoji");
    let timeTakenDisplay = document.getElementById("timeTaken");
    let averageTimeDisplay = document.getElementById("averageTime");
    let countdownDisplay = document.getElementById("countdown");
    let startButton = document.getElementById("startButton");
    let emojiSize = 100; 
    let totalTime = 0;
    let roundsPlayed = 0;
    let gameStarted = false;

    startButton.addEventListener("click", startGame);

    function startGame() {
      startButton.style.display = "none";
      let countdown = 3;
      countdownDisplay.textContent = countdown;

      let countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;
        if (countdown === 0) {
          clearInterval(countdownInterval);
          countdownDisplay.style.display = "none";
          gameStarted = true;
          appearAfterDelay(); 
        }
      }, 1000);
    }

    function appearAfterDelay() {
      if (!gameStarted) return; // Don't start until the game is started

      let delay = Math.random() * 2000 + 1000; 
      setTimeout(() => {
        startTimestamp = Date.now();

        let maxX = window.innerWidth - emojiSize;
        let maxY = window.innerHeight - emojiSize;
        emoji.style.left = Math.random() * maxX + "px";
        emoji.style.top = Math.random() * maxY + "px";

        emojiSize = Math.max(emojiSize - 2, 20);
        emoji.style.fontSize = emojiSize + "px";
        emoji.textContent = getRandomEmoji(); 
        emoji.style.display = "block"; 
      }, delay);
    }

    function getRandomEmoji() {
      return emojis[Math.floor(Math.random() * emojis.length)];
    }

    emoji.addEventListener("click", handleEmojiClick);
    emoji.addEventListener("touchstart", handleEmojiClick);

    function handleEmojiClick() {
      let endTimestamp = Date.now();
      let reactionTime = (endTimestamp - startTimestamp) / 1000;
      totalTime += reactionTime;
      roundsPlayed++;
      let averageTime = (totalTime / roundsPlayed).toFixed(3);

      timeTakenDisplay.textContent = "Reaction Time: " + reactionTime + " sec";
      averageTimeDisplay.textContent = "Average Reaction Time: " + averageTime + " sec";

      emoji.style.display = "none"; 
      appearAfterDelay(); 
    }

    let gradientInterval = setInterval(changeBackground, 4000); 

    function changeBackground() {
      const randomAngle = Math.random() * 360;
      const randomColors = [
        [getRandomColor(), getRandomColor()],
        [getRandomColor(), getRandomColor(), getRandomColor()],
        [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()]
      ];

      const randomGradientType = Math.random() < 0.5 ? 'linear-gradient' : 'radial-gradient';

      document.body.style.background = `${randomGradientType}(${randomAngle}deg, ${randomColors[Math.floor(Math.random() * randomColors.length)]})`;
    }

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }