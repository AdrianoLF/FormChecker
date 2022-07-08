//Função para trasnformar a string que vai vir do CPF em array,
// limitar o tamanho do array, remover 2 ultimos valores
function fazendoSlice(cpf) {
    const cpfLimpo = cpf.replace(/[^\d]+/g,'');
    const cpf11 = cpfLimpo.split('')
    const cpf9 = cpf11.slice(0, -2)
    return cpf9;
}

//Transformando a string inicial para array de 9 números
function array9num(cpf) {
    const cpfLimpo = cpf.replace(/[^\d]+/g,'');
    const cpf11 = cpfLimpo.split('')
    const cpf9 = cpf11.slice(0, -2)
    const array9string = cpf9.join('');
    const array9num = [];

    for (let i = 0; i <= cpf9.length - 1; i++) {
        let cada = Number(array9string[i]);
        array9num.push(cada)
    }
    return array9num;
}

//Função que multiplica todos valores do array 1,
//Multiplicarei o array 'multiplicarA1' pelo array que vou obter da captação da string cpf
function multiplicarA1(v1) {
    const multiplicarA1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];//Const com valores fixos, onde cada index vai multiplicar cada index do outro array
    const arrayMultiplicacaoDigit1 = []
    for (let i = 0; i <= 8; i++) {
        let valor = v1[i] * multiplicarA1[i];
        arrayMultiplicacaoDigit1.push(valor);//Cada valor desse produto será inserido em um array chamado 'arrayMultiplicacaoDigit1'
    }
    return arrayMultiplicacaoDigit1;
}

//Multiplicação para o segundo array (captção do dígito 2)
function multiplicarA2(v2) {
    const multiplicarA2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    const arrayMultiplicacaoDigit2 = []
    for (let i = 0; i <= 9; i++) {
        let valor = v2[i] * multiplicarA2[i];
        arrayMultiplicacaoDigit2.push(valor);
    }
    return arrayMultiplicacaoDigit2;
}

//Fórmula matemática do próprio problema, onde a soma de todos os produtos
//deve ser multiplicada por 10, e com esse valor retirar o módulo por 11
function valorFormulaMatematica(soma) {
    const valor = ((Number(soma) * 10) % 11);
    if (valor > 9) return valor = '0';//Se o resultado da fórmula maior que 9, retorne '0'
    const valorString = valor.toString()
    return (valorString);
}

function sequenciaNumeros(cpf){
    return(cpf.charAt(0).repeat(11) === cpf);
    
}

//Função principal de validação de CPF
function validaCpf(cpf) {
    const div = document.querySelector('.answer');//Selecionando DIV que mostrará resultado
    
    const cpfLimpo = cpf.replace(/[^\d]+/g,'');//Removendo todo caractere que não é um número

    
    if (cpfLimpo.length !== 11) return false; //Se o comprimento de 'cpfLimpo' = 11, limpar o input e dar return

    if (typeof Number(cpfLimpo) !== 'number') return false;//Se 'cpfLimpo' diferente de Number, dar return
    
    //Verificação para números repetidos
    if(sequenciaNumeros(cpfLimpo, div) !== false) return false;
    
    
    const arrayComNumerosColetados = cpfLimpo.split('')//Transformando string do cpf para array, onde cada numero é um índice
    const arrayComNumMultiplicados1 = multiplicarA1(array9num(cpf));//Const 'arrayComNumMultiplicados1' recebe um Array com 
    //o conteúdo do parâmetro 'cpf' que está sendo executado por 'array9num' e o valor que for retornado passa por 'multiplicarA1'

    const somaaArrayComNumMultiplicados1 = arrayComNumMultiplicados1.reduce(function (acumulador, valor) {
        acumulador = acumulador + valor;//Somando todos os valores do array 'arrayComNumMultiplicados1' e jogando na const 'somaaArrayComNumMultiplicados1'
        return acumulador;
    });

    const valorFormula1 = valorFormulaMatematica(somaaArrayComNumMultiplicados1);//Valor do dígito 1

    const arrayNewTest = [...fazendoSlice(cpf), valorFormula1.toString()];/*Criando array que será  usado como comparador ao final do processo vou comparar os 
    valores coletados pela string, e os valores que o programa me retorna como dígito*/

    const primeiroDigitCpf = arrayComNumerosColetados[9]//Capta o valor do index 9 da string inicial
    
    if (primeiroDigitCpf !== valorFormula1) return false; /*Se o valor do index 9 da string inicial é diferente
    do valor que o programa me retornou como dígito 1, return*/

    const arrayComMultiplicacados2 = (multiplicarA2(arrayNewTest));/* Captando os valores que serão multiplicados do array que está com o dígito 1 e os 9 demais
    números e jogando na cosnt 'arrayComMultiplicacados2' (array) */
    const somaaArrayComNumMultiplicados2 = arrayComMultiplicacados2.reduce(function (acumulador, valor) {
        acumulador = acumulador + valor;//Somando todos valores dentro do array 'arrayComMultiplicacados2'
        return acumulador;
    });

    

    const valorFormula2 = valorFormulaMatematica(somaaArrayComNumMultiplicados2);//Dígito 2

    const segundoDigitCpf = arrayComNumerosColetados[10]//Captando valor do index 10 do string inicial

    if (segundoDigitCpf !== valorFormula2) return false;/* Se o valor do index 10 do string inicial é diferente
    do dígito 2 que o programa me retornou, return */

    return true; 
}
