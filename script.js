let field = document.createElement('div');
let pointsField = document.createElement('div');
document.body.appendChild(field);
document.body.appendChild(pointsField);
field.classList.add('field');

for (let i=1; i<101; i++) {
    let excel = document.createElement('div');
        field.appendChild(excel);
        excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 10;

for (let i=0; i<excel.length; i++) {
    if (x>10) {
        x=1;
        y--;
    }   
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;  
}

let generateSnake=() => {
    let posX = Math.round(Math.random() * (10-3) +3);
    let posY = Math.round(Math.random() * (10-1) +1);
    return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];

for(let i = 0; i<snakeBody.length; i++) {
    snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let mouse

let createMouse=()=> {
    let generateMouse=()=> {
        let posX = Math.round(Math.random() * (10-1) +1);
        let posY = Math.round(Math.random() * (10-1) +1);
        return [posX, posY];
    }

    let mouseCordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    
    while(mouse.classList.contains('snakeBody')) {
        let mouseCordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCordinates[0] + '"][posY = "' + mouseCordinates[1] + '"]');
    }
    
    mouse.classList.add('mouse');
}

createMouse();

let direction = 'right';
let steps = false;
let points = 0;

let move=()=> {
    steps = true; 

    let snakeCordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();
    
    if (direction == 'right') {
        if (snakeCordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] + 1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCordinates[1] + '"]'));
        }
    }
    else if (direction == 'left') {
        if (snakeCordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] - 1) + '"][posY = "' + snakeCordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCordinates[1] + '"]'));
        }
    }
    else if (direction == 'up') {
        if (snakeCordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0]  + '"][posY = "' + (+snakeCordinates[1] + 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0]  + '"][posY = "1"]'));
        }
    }
    else if (direction == 'down') {
        if (snakeCordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0]  + '"][posY = "' + (snakeCordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCordinates[0]  + '"][posY = "10"]'));
        }
    }
                /*  Поедание мыши */
    if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        points++;
        pointsField.innerHTML = `Очки = ${points}`;
        let a = snakeBody[snakeBody.length - 1 ].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1 ].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
    }
                        /* дописать */
    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert('game over');
        }, 200)
        clearInterval(interval);
    }

    snakeBody[0].classList.add('head');
    for(let i = 0; i<snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }
       

}

let interval = setInterval(move, 300);

window.addEventListener('keydown', e => {
    if(steps){
        if (e.keyCode == 37 && direction!= 'right') {
            direction = 'left';
        }
        else if (e.keyCode == 38 && direction!= 'down') {
            direction = 'up';
        }
        else if (e.keyCode == 39 && direction!= 'left') {
            direction = 'right';
        }
        else if (e.keyCode == 40 && direction!= 'up') {
            direction = 'down';
        }
    }
steps = false;

});
/*
console.log(mouseCordinates);
console.log(snakeBody);
console.log(coordinates);
console.log(coordinates[0]);
console.log(coordinates[1]);
console.log('true');
function
*/

