
// Находим выпадающий список
const themeSelect = document.getElementById('theme-select');
themeSelect.addEventListener('change', (event) => {
  const selectedTheme = event.target.value;
  document.body.setAttribute('data-theme', selectedTheme);
  localStorage.setItem('user-theme', selectedTheme);
});

const savedTheme = localStorage.getItem('user-theme');
if (savedTheme) {
  document.body.setAttribute('data-theme', savedTheme);
  themeSelect.value = savedTheme; // Меняем выбранную опцию в списке
}



// чуть-чуть работа с html и инпутом

document.getElementById("submit").onclick = function(){
    un = document.getElementById("text_input").value;
    document.getElementById("p2").textContent = `пользователь ${un}`;
    console.log(un);
    document.getElementById("H2").textContent = `Привет ${un}`
};



// калькулятор


function calc(){
    // 1. Находим текстовые поля ввода
    let textRa = document.querySelector("#dop_2_1");
    let textRb = document.querySelector("#dop_2_2");
    let textC = document.querySelector("#dop_2_3");
    // 2. Находим новые уникальные селекторы единиц измерения
    let unitRa = document.querySelector("#unit-select-ra");
    let unitRb = document.querySelector("#unit-select-rb");
    let unitC = document.querySelector("#unit-select-c");
    // Читаем числа из полей ввода
    let Ra = parseFloat(textRa.value);
    let Rb = parseFloat(textRb.value);
    let C = parseFloat(textC.value);
    // Если какое-то поле не заполнено, прекращаем расчет
    if (isNaN(Ra) || isNaN(Rb) || isNaN(C)) {
        document.querySelector("#dop_2_label").textContent = "Заполните все поля.";
        return;
    }
    if (Ra <= 0 || Rb <= 0 || C <= 0) {
        document.querySelector("#dop_2_label").textContent = "Резисторы и ёмкость должны быть положительными.";
        return;
    }
    // 3. Переводим резистор Ra в Омы
    if (unitRa.value === "кОм") {
        Ra = Ra * 1000;
    } else if (unitRa.value === "МОм") {
        Ra = Ra * 1000000;
    }
    // 4. Переводим резистор Rb в Омы
    if (unitRb.value === "кОм") {
        Rb = Rb * 1000;
    } else if (unitRb.value === "МОм") {
        Rb = Rb * 1000000;
    }
    // 5. Переводим емкость C в Фарады
    let multiplierC = 1;
    if (unitC.value === "нФ") {
        multiplierC = 1e-9;  
    } else if (unitC.value === "пФ") {
        multiplierC = 1e-12; 
    }
    let C_farads = C * multiplierC;
    // 6. Считаем частоту, R1, R2 по стандартной формуле NE555
    let f = 1.44 / ((Ra + 2 * Rb) * C_farads);
    // Форматируем вывод частоты (если герц очень много, можно перевести в кГц)
    let resultText = "";
    if (f >= 1000) {
        resultText = `${(f / 1000).toFixed(2)} кГц`;
    } else {
        resultText = `${f.toFixed(2)} Гц`;
    }
    
    
    document.querySelector("#dop_2_label").textContent = resultText;
};

function calc2(){
    let text_2_f = document.querySelector("#dop_2-2-1");
    let text_2_d = document.querySelector("#dop_2-2-2");
    let text_2_c = document.querySelector("#dop_2-2-3");

    let unit_2_f = document.querySelector("#unit-select_2_-f");
    let unit_2_c = document.querySelector("#unit-select_2_-c");

    let f2 = parseFloat(text_2_f.value);
    let d2 = parseFloat(text_2_d.value);
    let c2 = parseFloat(text_2_c.value);

    if (isNaN(f2) || isNaN(d2) || isNaN(c2)) {
        document.querySelector("#dop_2_label-2").textContent = "Заполните все поля.";
        document.querySelector("#dop_2_label-2_2").textContent = "Заполните все поля.";
        return;
    }
    if (f2 <= 0 || d2 <= 0 || c2 <= 0) {
        document.querySelector("#dop_2_label-2").textContent = "Частота, скважность, ёмкость должны быть положительными.";
        document.querySelector("#dop_2_label-2_2").textContent = "Частота, скважность, ёмкость должны быть положительными.";
        return;
    }
    if (d2 <= 50 || d2 >= 100) {
        document.querySelector("#dop_2_label-2").textContent = "Скважность должна быть больше 50%.";
        document.querySelector("#dop_2_label-2_2").textContent = "Скважность должна быть больше 50%.";
        return;
    }
    // Переводим резистор f в Гц
    if (unit_2_f.value === "кГц") {
        f2 = f2 * 1000;
    } else if (unit_2_f.value === "МГц") {
        f2 = f2 * 1000000;
    }
    // Переводим емкость C в Фарады
    let multiplierC2 = 1;
    if (unit_2_c.value === "нФ") {
        multiplierC2 = 1e-9;  
    } else if (unit_2_c.value === "пФ") {
        multiplierC2 = 1e-12; 
    }
    let C2 = c2 * multiplierC2;
    // Считаем частоту, R1, R2 по стандартной формуле NE555
    let R1 = 1.44 * (2 * d2 / 100 - 1) / (f2 * C2);
    let R2 = 1.44 * (1 - d2 / 100) / (f2 * C2);
    // Форматируем вывод 
    let resultText1 = "";
    if (R1 >= 1000) {
        resultText1 = `${(R1 / 1000).toFixed(2)} кОм`;
    } else {
        resultText1 = `${R1.toFixed(2)} Ом`;
    }
    let resultText2 = "";
    if (R2 >= 1000) {
        resultText2 = `${(R2 / 1000).toFixed(2)} кОм`;
    } else {
        resultText2 = `${R2.toFixed(2)} Ом`;
    }
        
    document.querySelector("#dop_2_label-2").textContent = resultText1;
    document.querySelector("#dop_2_label-2_2").textContent = resultText2;
};

function calc3(){
    let text_2_R1 = document.querySelector("#dop_2-3-1");
    let text_2_R2 = document.querySelector("#dop_2-3-2");

    let unit_2_R1 = document.querySelector("#unit-select_2_-r1");
    let unit_2_R2 = document.querySelector("#unit-select_2_-r2");

    let R12 = parseFloat(text_2_R1.value);
    let R22 = parseFloat(text_2_R2.value);

    if (isNaN(R12) || isNaN(R22)) {
        document.querySelector("#dop_2_label-3").textContent = "Заполните все поля.";
        return;
    }
    if ((R12 <= 0) || (R22 <= 0)) {
        document.querySelector("#dop_2_label-3").textContent = "Резисторы должны быть положительными.";
        return;
    }
    // Переводим резистор R1 в Омы
    if (unit_2_R1.value === "кОм") {
        R12 = R12 * 1000;
    } else if (unit_2_R1.value === "МОм") {
        R12 = R12 * 1000000;
    }
    // Переводим резистор R2 в Омы
    if (unit_2_R2.value === "кОм") {
        R22 = R22 * 1000;
    } else if (unit_2_R2.value === "МОм") {
        R22 = R22 * 1000000;
    }
    // Считаем D по стандартной формуле NE555
    let D = (R12 + R22) / (R12 + 2 * R22) * 100;
    // Форматируем вывод 
    let resultText = "";
    resultText = `${D.toFixed(2)} %`;
       
    document.querySelector("#dop_2_label-3").textContent = resultText;
};


const calcSelect = document.getElementById('calc-select');

//
function updateCalcVisibility(selectedCalc) {
    const blocks = [
    { id: 'frequency', element: document.getElementById('calc-block-frequency') },
    { id: 'resistors', element: document.getElementById('calc-block-resistors') },
    { id: 'dutyCycle', element: document.getElementById('calc-block-dutyCycle') }
];
    blocks.forEach(block => {
        if (block.element) {
            if (block.id === selectedCalc) {
                block.element.style.display = 'block';
            } else {
                block.element.style.display = 'none';
            }
        }
    });
}
// Запускаем инициализацию только ПОСЛЕ полной загрузки HTML-страницы
document.addEventListener('DOMContentLoaded', () => {
    const calcSelect = document.getElementById('calc-select');
    
    if (!calcSelect) return;
calcSelect.addEventListener('change', (event) => {
  const selectedCalc = event.target.value;
  document.body.setAttribute('data-calc', selectedCalc);
  localStorage.setItem('user-calc', selectedCalc);
  updateCalcVisibility(selectedCalc);
});
const savedCalc = localStorage.getItem('user-calc');
if (savedCalc) {
  document.body.setAttribute('data-calc', savedCalc);
  calcSelect.value = savedCalc; // Меняем выбранную опцию в списке
  updateCalcVisibility(savedCalc);
}
else {
    updateCalcVisibility(calcSelect.value);
};
});
