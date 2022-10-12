const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // Adiciona digito para a tela da calculadora 
    addDigit(digit) {
        console.log(digit)
        // checa se a operação atual ja tem um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    //processar todas as operações da calculadora
    processOperation(operation) {
        // checa se o valor autal estar vazio
        if(this.currentOperationText.innerText === "" && operation !== 'C'){
            // muda a operação
          if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation)
          }
          return 
        }

        // obter valor atual e anterior
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break
            case "DEL":
                this.processDelOperator()
                break
            case "CE":
                this.processClear()
                break
            case "C":
                this.processC()
                break
            case "=":
                this.processEqual()
                break
            default:
                return
        }
    }

    // muda valores da tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ) {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            // checa se o valor é 0 , se for apenas adicionar o valor atual
            if(previous == 0 ) {
                operationValue = current
            }

            // adicionar valor atual ao anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }
    // mudar a  matematica da operação
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];
    
        if (!mathOperations.includes(operation)) {
          return;
        }
    
        this.previousOperationText.innerText =
          this.previousOperationText.innerText.slice(0, -1) + operation;
      }
//deleta o digito
      processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
      }

 // limpa a operação atual
      processClear() {
        this.currentOperationText.innerText = ""
      }

// limpa a operação geral
    processC() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""
    }

// =
processEqual() {
    const operation = previousOperationText.innerHTML.split(" ")[1]

    this.processOperation(operation)
}

 
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText

        if(+value >= 0 || value === ".") {
            calc.addDigit(value)
        }else{
            calc.processOperation(value)
        }
    })
})