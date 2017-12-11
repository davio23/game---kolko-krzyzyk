var game = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var turn = false; //true -x/ false - o
//  new Array(3),
//  new Array(3)
// new Array(3),
//definicja wartości
// null
// 1 - x
// 2 - O 

redraw();

function redraw() {
    render();
    renderPlayerName();
    addEvents();
}

function render() {
    var container = document.querySelector("#container");
    //nadpisujemy kod w środku container'a pustym stringiem
    container.innerHTML = "";
    // iterowanie po kolejnych liniach
    for (var i = 0; i < game.length; i++) {
        //pobieraie nowej lini
        var currentLine = game[i];
        //tworzenie lini w kodzie html
        var lineContainer = document.createElement("div");
        lineContainer.className = "line";
        for (var j = 0; j < currentLine.length; j++) {
            var currentElement = currentLine[j];
            var div = document.createElement("div");
            div.setAttribute("data-i", i);
            div.setAttribute("data-j", j);
            div.className = "field";

            switch (currentElement) {
                case 1:
                    //narysuj plus
                    div.innerText = "+";
                    break;
                case 2:
                    //narysuj kółko
                    div.innerText = "o";
                    break;
                default:
                    //narysuj nic
                    break;

            }
            lineContainer.appendChild(div);
        }
        container.appendChild(lineContainer);
    }
}

function renderPlayerName() {
    var name = document.querySelector("#name");
    name.innerText = (turn ? "x" : "o");
}

function addEvents() {
    var fields = document.querySelectorAll(".field");
    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", onClick);
    }
}
function onClick() {
    console.log(this);
    //pobierz i, j
    var i = this.getAttribute("data-i");
    var j = this.getAttribute("data-j");
    console.log(i, j, game[i][j]);

    if (game[i][j] == null) {
        game[i][j] = (turn ? 1 : 2); //if turn ===> 1 lub 2.
        // warunek ? "Jeżeli true": "Jeżeli false"
        //if (turn) {
        //game[i][j]}

        turn = !turn;
        checkWhoWin();
        redraw();
    } else {
        alert("nie wolno!!!");
    }
}
function winMessage(whoWin) {
    alert(whoWin == 1 ? "Wygrał X!" : "Wygrał O!");
}
function checkWhoWin() {
    var checkTable = [
        checkLineWin(),
        checkColWin(),
        checkCrossWin(),
        checkSecondCrossWin()
    ];
    for (var i = 0; i < checkTable.length; i++){
        var el = checkTable[i];
        if (el) {
            winMessage(el);
            resetGame();
            return el;
        }
    }


    if (checkIfDraw()) {
        alert("Remis");
        resetGame();
        return "draw";
    }
}
function resetGame () {
    game = [new Array(3), new Array(3), new Array(3)];
    redraw();
}



function whoWin() {
    console.log(checkLineWin());
}

function checkLineWin() {
    var whoWin = false;
    for (var i = 0; i < game.length; i++) {
        var first = game[i][0];
        for (var j = 0; j < game[i].length; j++) {
            var element = game[i][j];
            if (element == null || first != element) {
                whoWin = false;
                break;
            } else {
                whoWin = game[i][j];
            }

        }
        if (whoWin) {
            break;
        }
    }
    return whoWin;
}
function checkColWin() {
    var whoWin = false;
    for (var i = 0; i < game.length; i++) {
        var first = game[0][i];
        for (var j = 0; j < game[i].length; j++) {
            var element = game[j][i];
            if (element == null || first != element) {
                whoWin = false;
                break;
            } else {
                whoWin = game[j][i];
            }

        }
        if (whoWin) {
            break;
        }
    }
    return whoWin;
}
function checkCrossWin() {
    var first = game[0][0];
    var whoWin = false;
    for (var i = 0; i < game.length; i++) {
        var element = game[i][i];
        if (element == null || first != element) {
            whoWin = false;
            break;
        } else {
            whoWin = game[i][i];
        }
    }
    return whoWin;
}
function checkSecondCrossWin() {
    var lastId = game.length -1;
    var first = game[0][lastId];
    var whoWin = false;
    for (var i = 0; i < game.length; i++) {
        var element = game[i][lastId - i];
        if (element == null || first != element) {
            whoWin = false;
            break;
        } else {
            whoWin = game[i][lastId - i];
        }
    }
    return whoWin;
}

function checkIfDraw () {
    for (var i = 0; i < game.length; i++){
        for (var j = 0; j < game[i].length; j++) {
            if (game[i][j] == null) {
                return false;
            }
        }
    }
    return true;
}