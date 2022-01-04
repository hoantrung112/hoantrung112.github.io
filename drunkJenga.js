// 25 drink : 1 (5 reverse)
// 23 dare : 2 (4 reverse)
// 6 truth : 3 (1 reverse)
// 54 total

const pieceCount = 54;
const drinkCount = 20;
const reverseDrinkCount = 5;
const dareCount = 19;
const reverseDareCount = 4;
const truthCount = 5;
const reverseTruthCount = 1;
const key = [];
const order = [];


const partitionCount = [
    drinkCount,
    reverseDrinkCount,
    dareCount,
    reverseDareCount,
    truthCount,
    reverseTruthCount
];
const code = [
    1,
    -1,
    2,
    -2,
    3,
    -3
]

function allocate(partitionCount, code) {
    reset();
    for (let j = 0; j < partitionCount.length; j++) {
        for (let i = 0; i < partitionCount[j]; i++) {
            const n = Math.floor(Math.random() * key.length);
            order[key[n]] = code[j];
            key.splice(n, 1);
        }
    }
}
function reset() {
    for (let i = 0; i < pieceCount; i++) {
        order[i] = 0;
        key[i] = i;
    }
}
const res = document.querySelector('#id');
const randBtn = document.querySelector('#randButton');
const slotHolder = document.querySelector('#slotHolder');

for (let i = 0; i < pieceCount; i++) {
    let tag = '';
    if (i < 9) {
        tag += '0';
    }
    tag += i + 1;
    slotHolder.innerHTML += `
    <button id="no${i + 1}" 
    type="button" 
    class="cardBtn my-3 mx-3 slot btn btn-info">
    ${tag}
    </button>
    `;
}

for (let i = 0; i < pieceCount; i++) {
    const card = document.querySelector(`#no${i + 1}`);
    card.addEventListener('click', () => {
        const res = msgRender(order[i]);
        if (res == '') {
            alert('Hit randomize button first!');
        }
        else {
            alert(`Card #${i + 1} is ${res} =)) good luck!`);
        }
    })
}

function msgRender(code) {
    switch (code) {
        case 1:
            return "DRINK"
        case -1:
            return "REVERSE DRINK"
        case 2:
            return "DARE"
        case -2:
            return "REVERSE DARE"
        case 3:
            return "TRUTH"
        case -3:
            return "REVERSE TRUTH"
        default:
            return '';
    }
}

randBtn.addEventListener('click', () => {
    allocate(partitionCount, code);
    randBtn.disabled = true;
    alert('Randomize successfully!');
})