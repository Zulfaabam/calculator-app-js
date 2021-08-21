// variables
const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const sumBtn = document.querySelector('[data-sum]')
const deleteBtn = document.querySelector('[data-delete]')
const resetBtn = document.querySelector('[data-reset]')
const historyOutputEl = document.querySelector('[data-output-history]')
const currentOutputEl = document.querySelector('[data-output-current]')

// class
class Calculator {
  constructor(historyOutputEl, currentOutputEl) {
    this.historyOutputEl = historyOutputEl
    this.currentOutputEl = currentOutputEl
    this.clear()
  }

  clear() {
    this.historyOutput = ''
    this.currentOutput = ''
    this.operation = undefined
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1)
  }

  appendNum(number) {
    if (number === '.' && this.currentOutput.includes('.')) return
    this.currentOutput = this.currentOutput.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOutput === '') return
    if (this.historyOutput !== '') {
      this.compute()
    }
    this.operation = operation
    this.historyOutput = this.currentOutput
    this.currentOutput = ''
  }

  compute() {
    let computation
    const history = parseFloat(this.historyOutput)
    const current = parseFloat(this.currentOutput)
    if (isNaN(history) || isNaN(current)) return

    switch (this.operation) {
      case '+':
        computation = history + current
        break
      case '-':
        computation = history - current
        break
      case 'x':
        computation = history * current
        break
      case '/':
        computation = history / current
        break
      default:
        return
    }

    this.currentOutput = computation
    this.operation = undefined
    this.historyOutput = ''
  }

  getDisplayNum(number) {
    const stringNum = number.toString()
    const integerDigits = parseFloat(stringNum.split('.')[0])
    const decimalDigits = stringNum.split('.')[1]
    let integerDisplay

    // check integer digits
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }

    // check is there is any decimal
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOutputEl.innerText = this.getDisplayNum(this.currentOutput)
    if (this.operation != null) {
      this.historyOutputEl.innerText = `
        ${this.getDisplayNum(this.historyOutput)} ${this.operation}
      `
    } else {
      this.historyOutputEl.innerText = ''
    }
  }
}

const calculator = new Calculator(historyOutputEl, currentOutputEl)

numberBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerText)
    calculator.updateDisplay()
  })
})

operationBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

sumBtn.addEventListener('click', (button) => {
  calculator.compute()
  calculator.updateDisplay()
})

resetBtn.addEventListener('click', (button) => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteBtn.addEventListener('click', (button) => {
  calculator.delete()
  calculator.updateDisplay()
})
