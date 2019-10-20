class Calculadora{
    constructor(operacaoAnteriorTextElement,operacaoAtualTextElement){
    this.operacaoAnteriorTextElement = operacaoAnteriorTextElement
    this.operacaoAtualTextElement = operacaoAtualTextElement
    this.limpar()
    }

    limpar(){
        this.operacaoAtual = ''
        this.operacaoAnterior = ''
        this.operacao = undefined
    }

    apagar(){
        this.operacaoAtual = this.operacaoAtual.toString().slice(0, -1)
    }

    acrescentarNumero(numero){
        if(numero ===',' && this.operacaoAtual.includes(','))return
        this.operacaoAtual = this.operacaoAtual.toString() + numero.toString()
    }

    escolherOperacao(operacao){
        if(this.operacaoAtual === '')return
        if(this.operacaoAnterior !== ''){
            this.calculo()
        }
        this.operacao = operacao
        this.operacaoAnterior = this.operacaoAtual
        this.operacaoAtual = ''
    }

    calculo(){
        let computation
        const anterior = parseFloat(this.operacaoAnterior)
        const atual = parseFloat(this.operacaoAtual)
        if(isNaN(anterior) || isNaN(atual)) return
        switch(this.operacao){
            case '+':
                computation = anterior + atual;
                break;
            case '-':
                computation = anterior - atual;
                break;
            case 'x':
                computation = anterior * atual;
                break;
            case '÷':
                computation = anterior / atual;
                break;
            default:
                return
        }
        this.operacaoAtual = computation
        this.operacao = undefined
        this. operacaoAnterior = ''
    }

    getDisplayNumber(numero){
        const stringNumber = numero.toString()
        const integerDigits = parseFloat(stringNumber.split(',')[0])
        const decimalDigits = stringNumber.split(',')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('pt-BR',{
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    atualizarDisplay(){
        this.operacaoAtualTextElement.innerText = this.getDisplayNumber(this.operacaoAtual)
        if(this.operacao != null){
            this.operacaoAnteriorTextElement.innerText = `${this.getDisplayNumber(this.operacaoAnterior)} ${this.operacao}`
        } else {
            this.operacaoAnteriorTextElement.innerText = ''
        }
    }
}


const botoesNumeros = document.querySelectorAll('[data-numero]')
const botoesOperacao = document.querySelectorAll('[data-operacao]')
const botaoIgual = document.querySelector('[data-igual]')
const botaoApagar = document.querySelector('[data-apagar]')
const botaoLimpar = document.querySelector('[data-limpar]')
const operacaoAnteriorTextElement = document.querySelector('[data-operacao-anterior]')
const operacaoAtualTextElement = document.querySelector('[data-operacao-atual]')

const calculadora = new Calculadora(operacaoAnteriorTextElement, operacaoAtualTextElement)

botoesNumeros.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.acrescentarNumero(button.innerText)
        calculadora.atualizarDisplay()
    })
})

botoesOperacao.forEach(button => {
    button.addEventListener('click', () => {
        calculadora.escolherOperacao(button.innerText)
        calculadora.atualizarDisplay()
    })
})

botaoIgual.addEventListener('click', button => {
    calculadora.calculo()
    calculadora.atualizarDisplay()
})

botaoLimpar.addEventListener('click', button => {
    calculadora.limpar()
    calculadora.atualizarDisplay()
})

botaoApagar.addEventListener('click', button => {
    calculadora.apagar()
    calculadora.atualizarDisplay()
})