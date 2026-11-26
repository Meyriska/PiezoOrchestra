
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





let n = 10;
let amp = 80; // было 40 -> увеличили в 2 раза
let dutyCycle = 0.5;
let slider;

function setup() {
  // Увеличили размер холста в 2 раза (было 500, 260)
  let canvas = createCanvas(1000, 520);
  canvas.parent('pwm-canvas');
  
  strokeWeight(3);
  slider = createSlider(0, 100, 50);
  slider.parent('pwm-slider');
  slider.style('width', '400px'); // ползунок тоже стал в 2 раза шире
  slider.style('margin-bottom', '20px');
}

function draw() {
  background(27, 27, 27); 
  dutyCycle = slider.value() / 100;
  
  push(); 
  let originX = 30; // отступ слева в 2 раза больше
  let originY = height / 2 + amp;

  // Сетка
  stroke(255, 255, 255, 30);
  strokeWeight(1);
  for (let x = originX; x < width; x += (width - 60) / n) {
    line(x, 0, x, height);
  }
  
  // Оси и стрелки
  stroke(0, 150, 255);
  strokeWeight(4);
  line(originX, originY, width - 30, originY);
  triangle(width - 30, originY - 8, width - 30, originY + 8, width - 15, originY);
  line(originX, originY, originX, 30);
  triangle(originX - 8, 30, originX + 8, 30, originX, 15);
  pop();

  let period = (width - 60) / n;
  let pulseWidth = period * dutyCycle;
  
  // График ШИМ
  push();
  translate(30, height / 2);
  stroke(0, 255, 200);
  strokeWeight(3);
  noFill();
  beginShape();
  let x = 0;
  for (let i = 0; i < n; i++) {
    vertex(x, -amp);
    x += pulseWidth;
    vertex(x, -amp);
    vertex(x, amp);
    x += (period - pulseWidth);
    vertex(x, amp);
    if (i < n - 1) {
      vertex(x, -amp);
    }
  }
  endShape();
  pop();
  
  // Текст и индикатор яркости (увеличены в 2 раза)
  noStroke();
  fill(255);
  textSize(32); // было 18
  textAlign(CENTER);
  text("Duty Cycle: " + nf(dutyCycle * 100, 0, 1) + "%", width / 2, height - 85);

  fill(255, 0, 255, dutyCycle * 255);
  stroke(138, 43, 226);
  strokeWeight(3);
  ellipse(width / 2, height - 35, 50); // было 28
}

