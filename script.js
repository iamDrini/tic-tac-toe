let fields = [
    null, 
    null, 
    null,
    null, 
    null, 
    null,
    null, 
    null, 
    null 
]

let currentPlayer = 'circle';
let gameOver = false;

function init(){

render();
}

function render() {
    let tableHTML = '<div class="board-wrapper" style="position: relative;">';
        tableHTML = '<table class="ticTacToe">';

    for (let row = 0; row < 3; row++) {
        tableHTML += '<tr>';

        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            const value = fields[index];

            let symbol = '';
            if (value === 'circle') symbol = generateCircleSVG();
            if (value === 'cross') symbol = generateCrossSVG();

             const clickHandler = value === null ? `onclick="handleClick(${index}, this)"` : '';

            tableHTML += `<td ${clickHandler}>${symbol}</td>`;
        }

        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
        tableHTML += `<svg id="win-line" width="210" height="210"
                      style="position:absolute; pointer-events:none;"></svg>`;
    tableHTML += '</div>';

    document.getElementById('content').innerHTML = tableHTML;
}

function resetGame(){
    fields=[  null, 
    null, 
    null,
    null, 
    null, 
    null,
    null, 
    null, 
    null ];
    gameOver = false;
    currentPlayer='circle';
    render();
}

function handleClick(index, tdElement) {
    if (fields[index] !== null || gameOver) return; // Sicherheit

    // Spieler setzen
    fields[index] = currentPlayer;

    // SVG einfügen
    if (currentPlayer === 'circle') {
        tdElement.innerHTML = generateCircleSVG();
    } else {
        tdElement.innerHTML = generateCrossSVG();
    }

    // Klick deaktivieren
    tdElement.removeAttribute('onclick');

        const winningCombo = checkWinner();

    if (winningCombo) {
        gameOver = true;
        drawWinningLine(winningCombo);
        return;
    }

    // Spieler wechseln
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function checkWinner() {
    const combinations = [
        [0,1,2],  // top row
        [3,4,5],  // middle row
        [6,7,8],  // bottom row
        [0,3,6],  // left column
        [1,4,7],  // middle column
        [2,5,8],  // right column
        [0,4,8],  // main diagonal
        [2,4,6]   // secondary diagonal
    ];

    for (let combo of combinations) {
        const [a, b, c] = combo;

        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combo; // Gewinner gefunden
        }
    }

    return null; // kein Gewinner
}

function drawWinningLine(combo) {
    const winLine = document.getElementById('win-line');
    winLine.innerHTML = '';

    const cellCenters = [
        {x:0,  y:0},   {x:105, y:0},   {x:210, y:0},
        {x:0,  y:105},  {x:105, y:105},  {x:210, y:105},
        {x:0,  y:210},  {x:105, y:210},  {x:210, y:210},
    ];

    const p1 = cellCenters[combo[0]];
    const p2 = cellCenters[combo[2]];

    const line = `
        <line 
            x1="${p1.x}" y1="${p1.y}" 
            x2="${p1.x}" y2="${p1.y}"
            stroke="white"
            stroke-width="8"
            stroke-linecap="round"
        >
            <animate
                attributeName="x2"
                from="${p1.x}"
                to="${p2.x}"
                dur="0.2s"
                fill="freeze"
            />
            <animate
                attributeName="y2"
                from="${p1.y}"
                to="${p2.y}"
                dur="0.2s"
                fill="freeze"
            />
        </line>
    `;

    winLine.innerHTML = line;
}



function generateCircleSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <circle 
                cx="35" 
                cy="35" 
                r="30" 
                fill="none" 
                stroke="#00B0EF" 
                stroke-width="5"
                stroke-dasharray="188.4"
                stroke-dashoffset="188.4"
            >
                <animate 
                    attributeName="stroke-dashoffset"
                    from="188.4" 
                    to="0" 
                    dur="0.125s" 
                    fill="freeze"
                />
            </circle>
        </svg>
    `;
    return svg;
}

function generateCrossSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70">
            <!-- Linie 1 -->
            <line 
                x1="15" y1="15" 
                x2="55" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.6"
                stroke-dashoffset="56.6"
            >
                <animate 
                    attributeName="stroke-dashoffset"
                    from="56.6"
                    to="0"
                    dur="0.125s"
                    fill="freeze"
                />
            </line>

            <!-- Linie 2 -->
            <line 
                x1="55" y1="15" 
                x2="15" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.6"
                stroke-dashoffset="56.6"
            >
                <animate 
                    attributeName="stroke-dashoffset"
                    from="56.6"
                    to="0"
                    dur="0.125s"
                    begin="0.125s"
                    fill="freeze"
                />
            </line>
        </svg>
    `;
    return svg;
}
