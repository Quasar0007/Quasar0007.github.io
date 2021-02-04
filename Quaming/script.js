score = 0;
cross = true;

audio =new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() =>{
    audio.play()
},1000)

document.onkeydown = function (e) {
    console.log("Key is", e.code)
    if (e.code == "ArrowUp") {
        dino = document.querySelector('.dino');
        dino.classList.add('actDino');
        setTimeout(() => {
            dino.classList.remove('actDino')
        }, 700);
    }
    if (e.code == "ArrowLeft") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 20 + "px";

    }
    if (e.code == "ArrowRight") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 20 + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obst = document.querySelector('.dragon');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obst, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obst, null).getPropertyValue('top'));

    offsetX = Math.abs(ox - dx);
    offsetY = Math.abs(oy - dy);

    if (offsetX < 160 && offsetY < 100) {
        gameOver.style.visibility = 'visible';
        obst.classList.remove('actDragon');
        audio.pause();
        audiogo.play();
        setTimeout(() =>{
            audiogo.pause()
        },1000)
        cross=false;
    }
    else if (cross && offsetX < 200) {
        score += 1
        updateScore(score)
        cross = false
        setTimeout(() => {
            cross = true
        }, 1000)
        setTimeout(() =>{
            aniDur = parseFloat(window.getComputedStyle(obst, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.01;
            obst.style.animationDuration = newDur + "s";
        },500)
    }
}, 100);


function updateScore(score) {
    scoreCount.innerHTML = `Your score: ${score}`
}