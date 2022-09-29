const calculator = {
  a: '',
  b: '',
  screenValue: '0',
  operator: '',
  buttons: ['+', '-', '*', '/', '7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.', 'C', '='],
  init: () => {
    calculator.createScreen();
    calculator.createButtonsContainer();
    calculator.createButtons();
  },

  createScreen: () => {
    const container = document.querySelector('.container');
    const screen = document.createElement('input');
    screen.type = 'text';
    screen.value = calculator.screenValue;
    screen.disabled = true;
    screen.classList.add('screen');
    container.appendChild(screen);
  },

  createButtonsContainer: () => {
    const container = document.querySelector('.container');
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    container.appendChild(buttonsContainer);
  },

  createButtons: () => {
    const buttonsContainer = document.querySelector('.buttons-container');
    for (let i = 0; i < calculator.buttons.length; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      
      if ( isNaN(Number(calculator.buttons[i])) ) {
        if ( calculator.buttons[i] === '+' || calculator.buttons[i] === '-' ) {
          button.textContent = calculator.buttons[i];
          button.classList.add('operator');
        } else if ( calculator.buttons[i] === '.' ) {
          button.textContent = calculator.buttons[i];
          button.classList.add('decimal');
        } else if ( calculator.buttons[i] === 'C' ) {
          button.textContent = calculator.buttons[i];
          button.classList.add('clear');
        } else if ( calculator.buttons[i] === '=' ) {
          button.textContent = calculator.buttons[i];
          button.classList.add('equal');
        } else if ( calculator.buttons[i] === '*' ) {
          button.innerHTML = '&times;';
          button.classList.add('operator');
        } else if ( calculator.buttons[i] === '/' ) {
          button.innerHTML = '&divide;';
          button.classList.add('operator');
        }
      } else {
        button.textContent = calculator.buttons[i];
        button.classList.add('number');
      }

      button.value = calculator.buttons[i];

      button.addEventListener('click', (e) => {
        const v = e.target.value;
        const c = e.target.classList.value;
        if ( c === 'clear') {
          calculator.resetValues();
          calculator.updateScreenDisplay();
        } else if ( calculator.operator === '' ) {
          if ( c === 'number' && calculator.a.length < 15 ) {
            calculator.a += v;
            calculator.screenValue = calculator.a;
            calculator.updateScreenDisplay();
          } else if ( c === 'decimal' && !calculator.a.includes('.') && calculator.a.length < 15 ) {
            calculator.a += v;
            calculator.screenValue = calculator.a;
            calculator.updateScreenDisplay();
          } else if ( c === 'operator' ) {
            calculator.operator = v;
          }
        } else if ( calculator.operator !== '' ) {
          if (calculator.a === '' || calculator.a === '.') {
            calculator.a = '0';
          }
          if ( c === 'operator' ) {
            calculator.operator = v;
          } else if ( c === 'number' && calculator.b.length < 15 ) {
            calculator.b += v;
            calculator.screenValue = calculator.b;
            calculator.updateScreenDisplay();
          } else if ( c === 'decimal' && !calculator.b.includes('.') && calculator.b.length < 15 ) {
            calculator.b += v;
            calculator.screenValue = calculator.b;
            calculator.updateScreenDisplay();
          }
        }
        
        if ( c === 'equal' ) {
          if ( (Number(calculator.a) === 0 || Number(calculator.a)) && (Number(calculator.b) === 0 || Number(calculator.b)) && calculator.operator !== '') {
            calculator.screenValue = calculator.calcul(calculator.a, calculator.b, calculator.operator);
            if ( calculator.screenValue !== 0 ) {
              calculator.a = String(calculator.screenValue);
            } else {
              calculator.a = '';
            }
            calculator.operator = '';
            calculator.b = '';
            calculator.updateScreenDisplay();
          }
        }
      });
      buttonsContainer.appendChild(button);
    }
  },

  updateScreenDisplay: () => {
    const screen = document.querySelector('.screen');
    screen.value = calculator.screenValue;
  },

  calcul: (a = 0, b = 0, operator = '+') => {
    switch (operator) {
      case '+':
        return Number(a) + Number(b);
      case '-':
        return Number(a) - Number(b);
      case '*':
        return Number(a) * Number(b);
      case '/':
        if (b !== '0') return Number(a) / Number(b);
        else {
          calculator.resetValues();
          calculator.updateScreenDisplay();
          // setTimeout(() => alert('You can\'t divide by 0'), 100);
        }

        break;
      default:
        return a;
    }
  },

  resetValues: () => {
    calculator.a = '';
    calculator.b = '';
    calculator.screenValue = '0';
    calculator.operator = '';
  },
};

document.addEventListener('DOMContentLoaded', calculator.init);