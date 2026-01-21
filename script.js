const displayEl = document.getElementById('password-display');
const lengthEl = document.getElementById('length');
const lengthVal = document.getElementById('length-val');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    number: '0123456789',
    symbol: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Обновление цифры длины при движении ползунка
lengthEl.addEventListener('input', () => {
    lengthVal.innerText = lengthEl.value;
});

function generatePassword() {
    let characters = '';
    if (uppercaseEl.checked) characters += charSets.upper;
    if (lowercaseEl.checked) characters += charSets.lower;
    if (numbersEl.checked) characters += charSets.number;
    if (symbolsEl.checked) characters += charSets.symbol;

    if (characters === '') return 'Выберите опции';

    let password = '';
    const length = +lengthEl.value;

    // Используем криптографически стойкий генератор случайных чисел
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += characters.charAt(array[i] % characters.length);
    }

    return password;
}

generateBtn.addEventListener('click', () => {
    displayEl.innerText = generatePassword();
});

copyBtn.addEventListener('click', () => {
    const pass = displayEl.innerText;
    if (!pass || pass === 'Нажми "Создать"' || pass === 'Выберите опции') return;
    
    navigator.clipboard.writeText(pass).then(() => {
        alert('Пароль скопирован!');
    });
});