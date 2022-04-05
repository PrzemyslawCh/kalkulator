//variables
const digits = document.querySelectorAll('.digit')
const operators = document.querySelectorAll('.operator')
const clean = document.querySelector('.clean')
const del = document.querySelector('.delete')
const equals = document.querySelector('.equals')
const result = document.querySelector('.result')
const resultCurrent = document.querySelector('.current-operation')
const resultPrevious = document.querySelector('.previous-operation')

let currentOperation =''
let previousOperation =''
let operation 



const calculate = () => {
    let calculation
    if(!previousOperation || !currentOperation) {
      return
    }
  
    const previous = parseFloat(previousOperation)
    const current = parseFloat(currentOperation)
  
    if(isNaN(previous) || isNaN(current)) {
      return
    }
  
    switch (operation) {
        case '+':
        calculation = previous + current
        break
        case '-':
          calculation = previous - current
        break
        case '*':
          calculation = previous * current
        break
        case '/':
        if(current === 0) 
        {
          cleanResult()
          return
        }
          calculation = previous / current
        break   
      default:
        return
    }
    currentOperation = calculation
    operation = undefined
    previousOperation = ''
  }

const chooseOperation = (operator) => {
    if(currentOperation === ''){
        return
    }
    if(previousOperation !== ''){
        const previous = resultPrevious.innerText
        if(currentOperation.toString() === '0' && previous[previous.length - 1] === '/'){
            cleanResult()
            return
        }
        calculate()
    }
    operation = operator
    previousOperation = currentOperation
    currentOperation = ''
}

const updateResult = () => {
    resultCurrent.innerText = currentOperation

    if(operation != null){
        resultPrevious.innerText = previousOperation + operation
    }
    else{
        resultPrevious.innerText = ''
    }
}

const cleanResult = () => {
    currentOperation = ''
    operation = undefined
    previousOperation = ''
}

const addNumber = (digit) => {   
    if(digit === '.' && currentOperation.includes('.')){ 
        return
    }
    currentOperation = currentOperation.toString() + digit.toString()
}

const deletedigit = () => {
    currentOperation = currentOperation.toString().slice(0, -1)
}

digits.forEach((digit) =>{
    digit.addEventListener('click', () =>{
        addNumber(digit.innerText)
        updateResult()
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click' , () => {
        chooseOperation(operator.innerText)
        updateResult()
    })
})
// deletes last digit
del.addEventListener('click', () =>{
    deletedigit()
    updateResult()
})
// calculates 
equals.addEventListener('click', () =>{
    calculate()
    updateResult()
})
// 
clean.addEventListener('click', () =>{
    cleanResult()
    updateResult()
})

