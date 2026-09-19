// Cyber Escape - Koluman Games
// High-Octane Cyberpunk Endless Runner

(function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  // UI Elements
  const hud = document.getElementById('hud');
  const scoreVal = document.getElementById('score-val');
  const distanceVal = document.getElementById('distance-val');
  const multiplierVal = document.getElementById('multiplier-val');
  const shieldVal = document.getElementById('shield-val');
  const muteBtn = document.getElementById('mute-btn');
  const startScreen = document.getElementById('start-screen');
  const startBtn = document.getElementById('start-btn');
  const gameOverScreen = document.getElementById('game-over-screen');
  const restartBtn = document.getElementById('restart-btn');
  const endScore = document.getElementById('end-score');
  const endDistance = document.getElementById('end-distance');
  const endHighScore = document.getElementById('end-high-score');
  const touchControls = document.getElementById('touch-controls');
  const touchLeft = document.getElementById('touch-left');
  const touchRight = document.getElementById('touch-right');
  const touchJump = document.getElementById('touch-jump');

  // Localization
  const translations = {
    tr: {
      score: "SKOR",
      distance: "MESAFE",
      multiplier: "ÇARPAN",
      badge: "NEON SİBER DÜNYA",
      start_desc: "Siber otoyolda bariyerleri aş, çekirdekleri topla ve güvenlik sisteminden kaç!",
      steer: "Yönlendir",
      jump: "Zıpla / Bariyer Aş",
      start_btn: "SÜRÜŞÜ BAŞLAT",
      game_over: "BAĞLANTI KOPTU",
      game_over_sub: "Siber araç hasar gördü!",
      final_score: "Skor",
      final_distance: "Mesafe",
      high_score: "En Yüksek Skor",
      restart_btn: "TEKRAR DENE",
      back_home: "← Koluman Games'e Dön"
    },
    en: {
      score: "SCORE",
      distance: "DISTANCE",
      multiplier: "MULTIPLIER",
      badge: "NEON CYBERWORLD",
      start_desc: "Dodge barriers on the cyber highway, collect cores and escape the security grid!",
      steer: "Steer",
      jump: "Jump / Clear Barriers",
      start_btn: "START ESCAPE",
      game_over: "CONNECTION LOST",
      game_over_sub: "Cyber vehicle destroyed!",
      final_score: "Final Score",
      final_distance: "Distance",
      high_score: "High Score",
      restart_btn: "RETRY ESCAPE",
      back_home: "← Back to Koluman Games"
    }
  };

  let currentLang = 'tr';
  function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setLanguage(btn.dataset.lang);
    });
  });

  // Web Audio Synth
  let audioCtx = null;
  let isMuted = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'pickup') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(1040, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'jump') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'shield') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch (e) {
      // Audio fallback
    }
  }

  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
  });

  // Game Dimensions
  let width = 0;
  let height = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Lanes & Coordinates
  const LANE_COUNT = 3;
  let currentLane = 1; // 0: Left, 1: Center, 2: Right
  let targetX = 0;
  let playerX = 0;
  let playerY = 0;
  let playerZ = 0; // Jump height
  let jumpVel = 0;
  const GRAVITY = 0.85;

  let speed = 7;
  let distance = 0;
  let score = 0;
  let multiplier = 1;
  let shields = 1;
  let isPlaying = false;
  let isGameOver = false;

  let obstacles = [];
  let pickups = [];
  let particles = [];
  let roadLines = [];

  let lastSpawn = 0;

  function getLaneX(laneIndex) {
    const laneWidth = Math.min(width * 0.22, 160);
    const centerX = width / 2;
    return centerX + (laneIndex - 1) * laneWidth;
  }

  function resetGame() {
    currentLane = 1;
    playerX = getLaneX(1);
    targetX = playerX;
    playerY = height - 120;
    playerZ = 0;
    jumpVel = 0;

    speed = 8;
    distance = 0;
    score = 0;
    multiplier = 1;
    shields = 1;
    isGameOver = false;

    obstacles = [];
    pickups = [];
    particles = [];

    // Road scroll marks
    roadLines = [];
    for (let i = 0; i < 20; i++) {
      roadLines.push(i * 50);
    }

    shieldVal.textContent = shields;
    scoreVal.textContent = '0';
    distanceVal.textContent = '0m';
    multiplierVal.textContent = 'x1';
  }

  function startGame() {
    initAudio();
    resetGame();
    isPlaying = true;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    hud.classList.remove('hidden');

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      touchControls.classList.remove('hidden');
    }
  }

  function gameOver() {
    isPlaying = false;
    isGameOver = true;
    playSound('hit');

    // Create explosion particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: playerX,
        y: playerY - playerZ,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.5) * 14,
        color: Math.random() > 0.5 ? '#00f2fe' : '#fe019a',
        size: Math.random() * 6 + 3,
        alpha: 1
      });
    }

    const highScore = Math.max(score, parseInt(localStorage.getItem('koluman_cyber_escape_highscore') || '0', 10));
    localStorage.setItem('koluman_cyber_escape_highscore', highScore.toString());

    setTimeout(() => {
      hud.classList.add('hidden');
      touchControls.classList.add('hidden');
      endScore.textContent = Math.floor(score).toLocaleString();
      endDistance.textContent = Math.floor(distance) + 'm';
      endHighScore.textContent = highScore.toLocaleString();
      gameOverScreen.classList.remove('hidden');
    }, 700);
  }

  // Inputs
  function steerLeft() {
    if (currentLane > 0) {
      currentLane--;
      targetX = getLaneX(currentLane);
    }
  }

  function steerRight() {
    if (currentLane < LANE_COUNT - 1) {
      currentLane++;
      targetX = getLaneX(currentLane);
    }
  }

  function jump() {
    if (playerZ === 0) {
      jumpVel = 16;
      playSound('jump');
    }
  }

  window.addEventListener('keydown', (e) => {
    if (!isPlaying) {
      if (e.code === 'Space' || e.code === 'Enter') {
        if (!startScreen.classList.contains('hidden')) {
          startGame();
        } else if (!gameOverScreen.classList.contains('hidden')) {
          startGame();
        }
      }
      return;
    }

    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      steerLeft();
    } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      steerRight();
    } else if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      jump();
    }
  });

  // Touch handlers
  touchLeft.addEventListener('touchstart', (e) => { e.preventDefault(); steerLeft(); });
  touchRight.addEventListener('touchstart', (e) => { e.preventDefault(); steerRight(); });
  touchJump.addEventListener('touchstart', (e) => { e.preventDefault(); jump(); });

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);

  // Spawn Manager
  function spawnCycle(now) {
    if (now - lastSpawn < Math.max(900 - speed * 30, 450)) return;
    lastSpawn = now;

    const lane = Math.floor(Math.random() * LANE_COUNT);
    const rand = Math.random();

    if (rand < 0.65) {
      // Barrier Obstacle (jumpable or steerable)
      const canJump = Math.random() < 0.5;
      obstacles.push({
        lane: lane,
        y: -50,
        type: canJump ? 'low-laser' : 'drone-wall',
        width: 80,
        height: canJump ? 25 : 60,
        canJump: canJump
      });
    } else if (rand < 0.9) {
      // Cyber Core Pickups
      pickups.push({
        lane: lane,
        y: -50,
        type: 'core',
        size: 16
      });
    } else {
      // Shield Orb
      pickups.push({
        lane: lane,
        y: -50,
        type: 'shield',
        size: 18
      });
    }
  }

  // Update Game Loop
  function update(dt) {
    if (!isPlaying) return;

    // Gradual speed up
    speed = Math.min(8 + (distance / 600), 22);
    distance += speed * 0.1;
    score += (speed * 0.2) * multiplier;

    // Smooth player lane transition
    playerX += (targetX - playerX) * 0.25;

    // Jumping physics
    if (playerZ > 0 || jumpVel > 0) {
      playerZ += jumpVel;
      jumpVel -= GRAVITY;
      if (playerZ <= 0) {
        playerZ = 0;
        jumpVel = 0;
      }
    }

    // Engine thruster particles
    if (Math.random() < 0.8) {
      particles.push({
        x: playerX + (Math.random() - 0.5) * 20,
        y: playerY - playerZ + 25,
        vx: (Math.random() - 0.5) * 2,
        vy: speed * 0.7 + Math.random() * 3,
        color: Math.random() > 0.4 ? '#00f2fe' : '#fe019a',
        size: Math.random() * 4 + 2,
        alpha: 0.9
      });
    }

    // Road lines scroll
    for (let i = 0; i < roadLines.length; i++) {
      roadLines[i] += speed * 1.5;
      if (roadLines[i] > height) {
        roadLines[i] = 0;
      }
    }

    // Update Obstacles
    const playerHitbox = {
      x: playerX - 25,
      y: playerY - 35,
      w: 50,
      h: 55
    };

    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.y += speed * 1.4;
      const obsX = getLaneX(obs.lane);

      // Collision check
      if (
        obs.y + obs.height > playerHitbox.y &&
        obs.y < playerHitbox.y + playerHitbox.h &&
        Math.abs(obsX - playerX) < 40
      ) {
        // If it's a low barrier and player jumped high enough
        if (obs.canJump && playerZ > 25) {
          // Cleared barrier in air! Bonus
          score += 150 * multiplier;
          multiplier = Math.min(multiplier + 0.1, 5);
          playSound('pickup');
          obstacles.splice(i, 1);
          continue;
        }

        // Collision occurred!
        if (shields > 0) {
          shields--;
          shieldVal.textContent = shields;
          playSound('hit');
          obstacles.splice(i, 1);

          // Shield pop flash
          for (let p = 0; p < 20; p++) {
            particles.push({
              x: playerX,
              y: playerY - playerZ,
              vx: (Math.random() - 0.5) * 10,
              vy: (Math.random() - 0.5) * 10,
              color: '#00f2fe',
              size: 4,
              alpha: 1
            });
          }
        } else {
          gameOver();
          return;
        }
      }

      if (obs.y > height + 80) {
        obstacles.splice(i, 1);
        multiplier = Math.min(multiplier + 0.05, 5);
      }
    }

    // Update Pickups
    for (let i = pickups.length - 1; i >= 0; i--) {
      const p = pickups[i];
      p.y += speed * 1.4;
      const pX = getLaneX(p.lane);

      if (
        Math.abs(p.y - (playerY - playerZ)) < 40 &&
        Math.abs(pX - playerX) < 40
      ) {
        if (p.type === 'core') {
          score += 250 * multiplier;
          multiplier = Math.min(multiplier + 0.2, 5);
          playSound('pickup');
        } else if (p.type === 'shield') {
          shields = Math.min(shields + 1, 3);
          shieldVal.textContent = shields;
          playSound('shield');
        }

        // Collect effect
        for (let k = 0; k < 12; k++) {
          particles.push({
            x: pX,
            y: p.y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            color: p.type === 'shield' ? '#00f2fe' : '#ffb703',
            size: 3,
            alpha: 1
          });
        }

        pickups.splice(i, 1);
        continue;
      }

      if (p.y > height + 50) {
        pickups.splice(i, 1);
      }
    }

    // Update HUD
    scoreVal.textContent = Math.floor(score).toLocaleString();
    distanceVal.textContent = Math.floor(distance) + 'm';
    multiplierVal.textContent = 'x' + multiplier.toFixed(1);
  }

  // Draw Game Loop
  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 1. Neon Cyber Grid Background
    const horizon = height * 0.18;
    const roadTopWidth = width * 0.25;
    const roadBottomWidth = Math.min(width * 0.85, 600);

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrad.addColorStop(0, '#05050c');
    skyGrad.addColorStop(1, '#1a0b2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, horizon);

    // Cyber Neon Sun
    ctx.beginPath();
    ctx.arc(width / 2, horizon - 20, 55, 0, Math.PI * 2);
    const sunGrad = ctx.createLinearGradient(0, horizon - 75, 0, horizon + 35);
    sunGrad.addColorStop(0, '#ff007f');
    sunGrad.addColorStop(1, '#ffaa00');
    ctx.fillStyle = sunGrad;
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Road Surface
    const roadGrad = ctx.createLinearGradient(0, horizon, 0, height);
    roadGrad.addColorStop(0, '#0c0d19');
    roadGrad.addColorStop(1, '#05060a');
    ctx.fillStyle = roadGrad;

    ctx.beginPath();
    ctx.moveTo(width / 2 - roadTopWidth / 2, horizon);
    ctx.lineTo(width / 2 + roadTopWidth / 2, horizon);
    ctx.lineTo(width / 2 + roadBottomWidth / 2, height);
    ctx.lineTo(width / 2 - roadBottomWidth / 2, height);
    ctx.closePath();
    ctx.fill();

    // Road Border Neon Glow
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(width / 2 - roadTopWidth / 2, horizon);
    ctx.lineTo(width / 2 - roadBottomWidth / 2, height);
    ctx.moveTo(width / 2 + roadTopWidth / 2, horizon);
    ctx.lineTo(width / 2 + roadBottomWidth / 2, height);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Lane Dividers
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    for (let l = 1; l < LANE_COUNT; l++) {
      const topX = width / 2 - roadTopWidth / 2 + (roadTopWidth / LANE_COUNT) * l;
      const botX = width / 2 - roadBottomWidth / 2 + (roadBottomWidth / LANE_COUNT) * l;
      ctx.beginPath();
      ctx.moveTo(topX, horizon);
      ctx.lineTo(botX, height);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // 2. Obstacles
    for (const obs of obstacles) {
      const obsX = getLaneX(obs.lane);
      ctx.save();

      if (obs.canJump) {
        // Low Laser Barrier
        ctx.shadowColor = '#fe019a';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#fe019a';
        ctx.fillRect(obsX - obs.width / 2, obs.y, obs.width, obs.height);

        // Laser beam center
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(obsX - obs.width / 2 + 5, obs.y + obs.height / 2 - 2, obs.width - 10, 4);

        // Side pylons
        ctx.fillStyle = '#00f2fe';
        ctx.fillRect(obsX - obs.width / 2 - 6, obs.y - 8, 8, obs.height + 16);
        ctx.fillRect(obsX + obs.width / 2 - 2, obs.y - 8, 8, obs.height + 16);
      } else {
        // Security Drone Wall
        ctx.shadowColor = '#ff3366';
        ctx.shadowBlur = 25;
        ctx.fillStyle = 'rgba(255, 51, 102, 0.85)';
        ctx.fillRect(obsX - obs.width / 2, obs.y, obs.width, obs.height);

        // Grid warning stripes
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.strokeRect(obsX - obs.width / 2, obs.y, obs.width, obs.height);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('SECURITY', obsX, obs.y + obs.height / 2 + 4);
      }
      ctx.restore();
    }

    // 3. Pickups
    for (const p of pickups) {
      const pX = getLaneX(p.lane);
      ctx.save();
      if (p.type === 'core') {
        // Cyber Core Diamond
        ctx.shadowColor = '#ffb703';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ffb703';
        ctx.beginPath();
        ctx.moveTo(pX, p.y - p.size);
        ctx.lineTo(pX + p.size, p.y);
        ctx.lineTo(pX, p.y + p.size);
        ctx.lineTo(pX - p.size, p.y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pX, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Shield Orb
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 20;
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pX, p.y, p.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.fill();
      }
      ctx.restore();
    }

    // 4. Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.alpha -= 0.025;

      if (pt.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = pt.alpha;
      ctx.fillStyle = pt.color;
      ctx.shadowColor = pt.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 5. Player Hover Speeder
    if (isPlaying || (!isPlaying && !isGameOver)) {
      const drawY = playerY - playerZ;

      ctx.save();
      // Drop shadow when jumping
      if (playerZ > 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.ellipse(playerX, playerY + 20, 25 * (1 - playerZ / 200), 10 * (1 - playerZ / 200), 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shield Aura
      if (shields > 0) {
        ctx.save();
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 25;
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(playerX, drawY, 40, 48, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Speeder Body
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 20;

      // Cockpit & Aerodynamic Chassis
      const speederGrad = ctx.createLinearGradient(playerX - 25, drawY - 30, playerX + 25, drawY + 30);
      speederGrad.addColorStop(0, '#00f2fe');
      speederGrad.addColorStop(0.5, '#1e293b');
      speederGrad.addColorStop(1, '#fe019a');
      ctx.fillStyle = speederGrad;

      ctx.beginPath();
      ctx.moveTo(playerX, drawY - 32); // Front tip
      ctx.lineTo(playerX + 24, drawY + 16); // Right wing
      ctx.lineTo(playerX + 16, drawY + 28); // Right thruster
      ctx.lineTo(playerX - 16, drawY + 28); // Left thruster
      ctx.lineTo(playerX - 24, drawY + 16); // Left wing
      ctx.closePath();
      ctx.fill();

      // Wing glow edges
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cyber windshield
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(playerX, drawY - 18);
      ctx.lineTo(playerX + 8, drawY);
      ctx.lineTo(playerX - 8, drawY);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  // Animation Loop
  let lastTime = performance.now();
  function loop(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    if (isPlaying) {
      spawnCycle(now);
      update(dt);
    }
    draw();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
  setLanguage(currentLang);
})();
