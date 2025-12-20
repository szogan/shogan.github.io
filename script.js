document.addEventListener("DOMContentLoaded", () => {
  const barButton = document.getElementById('bar-button');
  const bar = document.querySelector('.bar');

  if (!barButton || !bar) {
    console.error('Missing elements', { barButton, bar });
    return;
  }

  const isSmallScreen = () => window.innerWidth < 768;

  const showBar = () => {
    bar.classList.add('active');
    bar.classList.remove('hidden');
    barButton.classList.add('hidden'); // ukrywa przycisk
  };

  const hideBar = () => {
    bar.classList.remove('active');
    bar.classList.add('hidden');
    barButton.classList.remove('hidden'); // pokazuje przycisk
  };

  barButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!isSmallScreen()) return; // tylko na małych ekranach
    if (bar.classList.contains('active')) {
      hideBar();
    } else {
      showBar();
    }
  });

  document.addEventListener('click', (e) => {
    if (!bar.contains(e.target) && !barButton.contains(e.target) && isSmallScreen()) {
      hideBar();
    }
  });

  window.addEventListener('resize', () => {
    if (!isSmallScreen()) {
      // na dużych ekranach wszystko widać
      bar.classList.remove('active');
      bar.classList.remove('hidden');
      barButton.classList.remove('hidden');
    } else {
      hideBar(); // domyślnie ukryty na małych
    }
  });

  // start: mały ekran → ukryty
  if (isSmallScreen()) hideBar();
});





document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.getElementById("main2");
  const explosion = document.getElementById("explosion");

  if (!emoji) return console.error("error 404");
  if (!explosion) return console.error("error 404");

  emoji.addEventListener("click", () => {
    // Odtwarzanie dźwięku
    const audio = new Audio("web/explode.mp3");
    audio.play().catch(err => console.error("Błąd odtwarzania audio:", err));

    // Pokaż gif
    explosion.style.display = "block";

    // Ukryj gif po 1 sekundzie
    setTimeout(() => {
      explosion.style.display = "none";
    }, 1000);
  });
});

//Info script
const btn = document.getElementById("main2info");
const box = document.getElementById("videoBox");
const video = box.querySelector("video");

btn.onclick = () => {
  box.style.display = "flex";
  video.currentTime = 0;
  video.play();
};
video.onended = () => {
  box.style.display = "none";
};







// Study script
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const segments = ["Ballora", "Chica", "Funtime Foxy", "Freddy Fazbear", "Lolbit", "Mangle", "Nightmare Chica", "Nightmare Mangle", "Nightmarionne", "Rockstar Chica", "Springtrap", "Marionette", "Toy Chica", "Withered Chica"];
const colors = ["#000","#ff00f7"];
let currentAngle = 0;

function drawWheel(angle=0){
    const center = canvas.width/2;
    const radius = center - 10;
    const segAngle = 2*Math.PI / segments.length;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle);

    for(let i=0;i<segments.length;i++){
        ctx.fillStyle = colors[i % 2];
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.arc(0,0,radius,i*segAngle,(i+1)*segAngle);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#ff00f7";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.rotate(i*segAngle + segAngle/2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#7800a7"; 
        ctx.fillStyle = "#fff"; 
        ctx.font = "8px 'Press Start 2P', sans-serif"; 
        ctx.shadowBlur = 5;
        ctx.fillText(segments[i], radius - 10, 0);
        ctx.restore();
    }
    ctx.restore();
}

drawWheel();

function spin(){
    const spinAngle = Math.random()*2*Math.PI + 4*Math.PI;
    const duration = 3000;
    const start = performance.now();

    function animate(now){
        const progress = Math.min((now-start)/duration,1);
        const ease = 1 - Math.pow(1-progress,3);
        drawWheel(currentAngle + spinAngle*ease);
        if(progress<1) requestAnimationFrame(animate);
        else {
            currentAngle += spinAngle;
            const segAngle = 2*Math.PI / segments.length;
            const actualAngle = currentAngle % (2*Math.PI);
            const index = Math.floor((2*Math.PI - actualAngle) / segAngle) % segments.length;
            showResult(`Would you smash ${segments[index]}?`);
        }
    }
    requestAnimationFrame(animate);
}

function showResult(resultText){
    const overlay = document.getElementById('overlay');
    const result = document.getElementById('result');
    const choices = overlay.querySelector('.choices');

    overlay.style.display = 'flex';
    result.textContent = resultText;
    choices.style.display = 'none';

    setTimeout(() => {
        choices.style.display = 'flex';
    }, 1200);
}

document.querySelector('.SpinOption').addEventListener('click', spin);

document.querySelectorAll('.choices button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('result').textContent = '?'; // reset wyniku
        // overlay zostaje, koło gotowe na kolejny spin
    });
});




