/* 
1 - игрок 1;
2 - игрок 2;
*/
(function(){
    let rows = 30;

    let columns = 30;
    
    let player = 1;

    const gameField = document.getElementById('gameField');

    const gameTable = document.getElementById('gameTable').getElementsByTagName('tbody')[0];


    //Заполнение таблицы ячейками
    function fillGameTable() {
        for (let i = 0; i < rows; i++){
            let tr = document.createElement('tr');
            for (let j = 0; j < columns; j++){
                let td = document.createElement('td');
                tr.appendChild(td);
            }
            gameTable.appendChild(tr);
        }
    }
    //Функция вставки строки в конец таблицы
    function addRowToTheEnd(){
        for (let j = 0; j < 5; j++){
            let tr = document.createElement('tr');
                for (let j = 0; j < columns; j++){
                    let td = document.createElement('td');
                    tr.appendChild(td);
                }
                gameTable.appendChild(tr);
                rows ++;
        }
    }

    //Функция вставки строки в начало таблицы
    function addRowAfterBeggining(){
        for (let i = 0; i < 5; i++){
            let tr = document.createElement('tr');
            for (let j = 0; j < columns; j++){
                let td = document.createElement('td');
                tr.appendChild(td);
            }
            gameTable.insertAdjacentElement('afterbegin',tr); 
            rows++;
        }
    }

    //Функция вставки столбца в конец таблицы
    function addColumnToTheEnd(){
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < 5; j++){
                let td = document.createElement('td');
                gameTable.rows[i].appendChild(td);
            }
            
        }
        columns += 5;
    }

    //Функция добавления столбца в начало таблицы
    function addColumnAfterBeggining(){
        for (let i = 0; i < rows; i++){
            for (let j = 0; j < 5; j++){
                let td = document.createElement('td');
                gameTable.rows[i].insertAdjacentElement('afterbegin', td);
            }
        }
        columns += 5;
    }

    //Функция расширения таблицы на 5 ячеек во все стороны
    function makeTableWider(rowNumber, columnNumber){
        addColumnAfterBeggining();
        addColumnToTheEnd();
        addRowAfterBeggining();
        addRowToTheEnd();
        if (rowNumber >= 9 && columnNumber <= 5 || rowNumber >= rows - 12 && columnNumber <= 20) {
            window.scrollBy(417, 0);}
        else {window.scrollBy(417, 417);}
    }


    //Проверка на клик в крайние клетки
    const checkCorners = (rowNumber, columnNumber) => 
        rowNumber < 5 || columnNumber < 5 || (rows - 5) <= rowNumber || (columns - 5) <= columnNumber;


    //Проверка на победу
    const checkWin = (rowNumber, columnNumber, player) => 
        horisontalWin(rowNumber, columnNumber, player) 
        || verticalWin(rowNumber, columnNumber, player)
        || leftToRightDiagonal(rowNumber, columnNumber, player)
        || upToDownDiagonal(rowNumber, columnNumber, player);


    //Проверка на победу по горизонтали 
    function horisontalWin(rowNumber, columnNumber, player){
        let combo = 0;
        columnNumber + 5 >= columns ? upperBorder = columns - 1 : upperBorder = columnNumber + 5
        columnNumber - 4 < 0 ? i = 0 : i = columnNumber - 4;
        for (i;i < upperBorder; i++){
            if (gameTable.rows[rowNumber].cells[i].innerText == player) {
                combo++;
                if (combo === 5) return true;
            }
            else combo = 0;
        }
        return false;
    }

    //Проверка на победу по вертикали
    function verticalWin(rowNumber, columnNumber, player){
        let combo = 0;
        rowNumber - 4 < 0 ? i = 0 : i = rowNumber - 4;
        rowNumber + 5 >= rowNumber ? upperBorder = rows - 1 : upperBorder = rowNumber + 5
        for (i ;i <= upperBorder; i++){
            if (gameTable.rows[i].cells[columnNumber].innerText == player) {
                combo++;
                if (combo === 5) return true;
            }
            else combo = 0;
        }
        return false;
    }

    /*Проверка на победу по диагонали вот такой вот 
                    -
                -
            -
        -
    -
    */
    function leftToRightDiagonal(rowNumber, columnNumber, player){
        let combo = 0;
        let i,j;
        (rowNumber - 5 > 0) ? lowerBorder = rowNumber - 5 : lowerBorder = 0;
        columnNumber + 5 >= columns ? columnsBorder = columns - 1 : columnsBorder = columnNumber + 5;
        rowNumber + 4 >= rows ? upperBorder = rows - 1 : upperBorder = rowNumber + 4;
        if (columnNumber - 4 < 0){
            diff = 4 - columnNumber;
            i = rowNumber + 4 - diff;
            j = 0;
        } else {i = rowNumber + 4; j = columnNumber - 4;}
        for (i , j; i > lowerBorder && j < columnsBorder && i <= upperBorder; i--, j++){
            if (gameTable.rows[i].cells[j].innerText == player){
                combo++;
                if (combo === 5) return true;
            }
            else combo = 0;
        }
        return false;
    }

    /*Проверка на победу по диагонали вот такой вот 
     -
        -
            -   
                -
                    -
    */
    function upToDownDiagonal(rowNumber, columnNumber, player){
        let combo = 0;
        let i,j;
        rowNumber + 5 > rows ? upperBorder = rows - 1 : upperBorder = rowNumber + 5;
        columnNumber + 4 > columns ? columnBorder = columns - 1 : columnBorder = columnNumber + 4;
        if (rowNumber - 4 < 0 || columnNumber - 4 < 0){
            diff = 4 - rowNumber >= 4 - columnNumber ? 4 - rowNumber : 4 - columnNumber;
            i = 4 - diff; j = 4 - diff
        } else {
            i = rowNumber - 4; j = columnNumber - 4;
        }
        for (i, j; i < upperBorder && j <= columnBorder; i++, j++){
            if (gameTable.rows[i].cells[j].innerText == player){
                combo++;
                if (combo === 5) return true;
            }
            else combo = 0;
        }
        return false;
    }

    //Клик на ячейку таблицы
    gameTable.onclick = (event) => {
        cell = event.target;
        rowNumber = cell.parentNode.rowIndex;
        columnNumber = cell.cellIndex;
        if (checkCorners(rowNumber, columnNumber)) {makeTableWider(rowNumber, columnNumber);}
        if (player == 1) { //Проверка если первый игрок(крестик)
            if (cell.innerText == ''){
                cell.classList  += 'red-cross';
                cell.innerText = 1;
                if (checkWin(rowNumber, columnNumber, player)){
                    gameField.hidden = true;  // сюда тоже можно бахнуть сет таймаут так-то
                    serviceText.innerText = `${firstPlayer.value} win!`;
                    serviceText.hidden = false;
                    restartButton.hidden = false;
                }
                else 
                    player = 2;
            }
        }
        else { //Проверка если второй игрок(нолик)
            if (cell.innerText == '') {
                cell.classList += 'blue-circle';
                cell.innerText = 2;
                if (checkWin(rowNumber, columnNumber, player)){
                    gameField.hidden = true; 
                    serviceText.innerText = `${secondPlayer.value} win!`;
                    serviceText.hidden = false;  
                    restartButton.hidden = false;
                }
                else 
                    player = 1;
                            
            }
            
        }
    }   
    const firstPlayer = document.getElementById('firstPlayerInput');
    if (firstPlayer.value == "") firstPlayer.value = 'Player1';
    const secondPlayer = document.getElementById('secondPlayerInput');
    if (secondPlayer.value == "") secondPlayer.value = 'Player2';
    const startButton = document.getElementById('startButton');
    const inputLabel = document.getElementById('inputLabel');
    const restartButton = document.getElementById('restartButton');
    const serviceText = document.getElementById('serviceText');
    
    //Нажатие на кнопку старт, создание таблицы, скрытие ненужных элементов
    startButton.addEventListener('click', function(){
        firstPlayer.hidden = true;
        secondPlayer.hidden = true;
        inputLabel.hidden = true;
        startButton.hidden = true;
        gameField.hidden = false;
        fillGameTable();
        window.scrollTo(500,500);
    })

    //Нажатие на кнопку рестарта игры6 очистка таблицы и появление стартовой страницы
    restartButton.addEventListener('click', function(){
        while(gameTable.hasChildNodes()) gameTable.removeChild(gameTable.firstChild);
        firstPlayer.hidden = false;
        secondPlayer.hidden = false;
        inputLabel.hidden = false;
        startButton.hidden = false;
        restartButton.hidden = true;
        serviceText.hidden = true;
        rows = 20;
        columns = 20;
    })
    


})()
