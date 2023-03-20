/*Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;*/
const playButton = document.getElementById("play-button")

playButton.addEventListener("click", play);



function play() {
    const difficultySelector = document.querySelector("select");
    const grid = document.querySelector(".grid");
    const infoText = document.getElementById("info-text");
    function generateBombs(bombsNum, squareNumbers) {//Funzione che genera un array di TOT numeri diversi tra loro
        const bombs = [];//Dichiara array
        while (bombs.length < bombsNum) {//Finchè l'array non è composto dal quantitativo di numeri voluto
            const bomb = getRndNumber(1, squareNumbers);//Genera un numero
            if (!bombs.includes(bomb)) {//Se non è già presente all'interno dell'array
                bombs.push(bomb);//Aggiungilo all'array
            }
        }
        return bombs;//Ritorna l'array completo
    }

    let points = 0;
    const startAudio = new Audio("effects/start.mp3");
    startAudio.play();
    infoText.innerHTML = `<span class="text-success fw-bold">I tuoi punti: 0</span>`;//Aggiungi d-none al testo pre-game
    grid.innerHTML = "";//Svuota griglia se è stata già fatta una partita
    let squareNumbers = setMode(difficultySelector.value);//Prendi info su quanti cicli fare
    let squarePerRow = Math.sqrt(squareNumbers);// Radice quadrata per sapere quanti quadrati inserire per riga
    const NUM_BOMBS = 16;
    const bombs = generateBombs(NUM_BOMBS, squareNumbers);
    const MAX_SCORE = squareNumbers - NUM_BOMBS//Punteggio per la vittoria
    drawGrid(squareNumbers, squarePerRow, bombs);//Disegna griglia



    function setMode(difficulty) {//Imposta difficoltà
        let squareNumbers;
        switch (difficulty) {//Dipendentemente dal valore di difficoltà che riceve, ritornerà un int differente di cicli da fare
            case "easy":
                return squareNumbers = 100;
            case "medium":
                return squareNumbers = 81;
            case "hard":
                return squareNumbers = 49;
        }
    }

    function drawSquare(index, numSquares) {
        const square = document.createElement("div");//Crea un div
        square.classList.add("square", "unchecked");//Assegna la classe square ed unchecked
        square.style.width = `calc(100% / ${numSquares})`;//Dagli larghezza 100% / numero di quadratini che saranno creati al termine del ciclo
        square.style.height = square.style.width;//La larghezza è uguale all'altezza (quadrato)
        square.innerHTML = `<span>${index}</span>`;
        return square;//Ritorna il quadratino 
    }

    function drawGrid(squareNumbers, squarePerRow, bombs) {//Cicla la creazione degli square in base a quanti ne servono
        for (let i = 1; i <= squareNumbers; i++) {
            const square = drawSquare(i, squarePerRow);
            square.hasMine = false;
            if (bombs.includes(parseInt(square.innerText))) {//Se nelle bombe c'è il n segnato dal valore del suo testo
                square.hasMine = true;//Cambiato modo di segnalare square con le bombe (con una classe html era troppo facile capire da ispeziona elemento quali fossero le bombe)

                square.addEventListener("click", endGame);//Aggiunge l'event listener per le bombe (fine gioco) su ogni quadratino

            }
            else {
                square.addEventListener("click", checkSquare);//Altrimenti aggiunge il check normale
            }
            grid.appendChild(square);//Inserisci il quadratino nella griglia
        }


    }

    function checkSquare() {
        const goodAudio = new Audio("effects/good.mp3")



        this.classList.remove("unchecked");//Toglie unchecked
        this.classList.add("checked");//Mette checked
        this.removeEventListener("click", checkSquare);//Rimuovi event listener per evitare di permettere l'aumento di points ricliccando su un quadrato già checkato

        points++;//Aumenta di un punto il punteggio
        if (points == MAX_SCORE) {//Se hai raggiunto il punteggio per la vittoria, vinci
            const winEffect = new Audio("effects/win.mp3")
            winEffect.play();
            infoText.innerHTML = `<span class="text-success fw-bold">HAI VINTO!!!</span>`
            showMines();
            removeListenrs();
        }
        else {
            infoText.innerHTML = `<span class="text-success fw-bold">I tuoi punti: ${points}</span>`//Renderizza di nuovo il punteggio
            goodAudio.play();
        }
    }

    function showMines() {
        const squaresBox = document.querySelectorAll(".square");//Seleziona HTMLCOLLECTION delle bombe dalla loro classe specifica
        for (box of squaresBox) {//Appena cliccata una bomba itera i quadrati
            if (box.hasMine) {//Se hanno una mina, aggiungi la classe relativa
                box.classList.remove("unchecked");
                box.classList.add("bomb");
                box.innerHTML = `<img class="minibomb" src="img/mine.png" alt="">`
            }

        }
    }

    function removeListenrs() {
        const squares = document.querySelectorAll(".square");//Adesso rimuovi tutti gli event listener inseriti in precedenza sugli square
        for (onesquare of squares) {
            onesquare.removeEventListener("click", checkSquare);
            onesquare.removeEventListener("click", endGame);

        }
    }

    function endGame() {
        const endAudio = new Audio("effects/end.mp3")
        showMines();
        removeListenrs();
        lost = document.createElement("p");//Aggiungi info hai perso 
        lost.classList.add("text-danger", "fw-bold", "m-0")
        lost.innerHTML = `Hai perso, riprova.`;
        infoText.append(lost);
        points = 0;//Reset punteggio
        endAudio.play();
    }



    //CHEAT 

    const cheatButton = document.getElementById("cheat");
    cheatButton.addEventListener("click", showMines);



}

