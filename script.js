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

function init(){

render();
}

function render() {
    let tableHTML = '<table class="ticTacToe">';

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

    document.getElementById('content').innerHTML = tableHTML;
}

function handleClick(index, tdElement) {
    if (fields[index] !== null) return; // Sicherheit

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

    // Spieler wechseln
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
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
