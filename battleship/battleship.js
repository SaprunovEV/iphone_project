let location1 = Math.floor(5 * Math.random());
let location2 = location1 + 1;
let location3 = location2 + 1;
// let location1 = 3;
// let location2 = 4;
// let location3 = 5;

let field = [];

let guess;
let guesses = 0;
let hits = 0;
let isSunk = false;

do {
    guess = +prompt("Введите координату выстрела", "");
    if(guess < 0 || guess > 6){
        alert("Вы стреляете в молоко");
    } else {
        guesses++;
        if(field.includes(guess)) {
            alert("Вы уже сюда стриляли");
            continue;
        }
        field.push(guess);
        if(guess === location1 || guess === location2 || guess === location3){
            hits++;
            alert("Поподание");
        } else {
            alert("Прамазал!")
        }
        if(hits == 3) {
            isSunk = true;
            alert("Противник потоплен!");
        }
    }
} while (!isSunk);

alert("Количество выстрелов = " + guesses);