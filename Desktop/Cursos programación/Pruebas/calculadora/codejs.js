'use strict'

let pantallaValorAnterior = document.querySelector("#valor_anterior");
let pantallaValorActual = document.querySelector("#valor_actual");
let botonesNumeros = document.querySelectorAll(".numero");
let botonesOperadores = document.querySelectorAll(".operador");


class Calculadora{
    sumar(num1, num2) {
        return num1 + num2;
    }

    restar(num1, num2) {
        return num1 - num2;
    }

    dividir(num1, num2) {
        return num1 / num2;
    }

    multiplicar(num1, num2) {
        return num1 * num2;
    }
};

class Display {
    constructor(pantallaValorAnterior, pantallaValorActual) {
        this.pantallaValorActual = pantallaValorActual;
        this. pantallaValorAnterior = pantallaValorAnterior;
        this.calculadora = new Calculadora();
        this.tipoOperacion = undefined;
        this.valorActual = "";
        this.valorAnterior = "";
        this.signos = {
            sumar: "+",
            restar: "-",
            dividir: "/",
            multiplicar: "X"
        }
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo(){
        this.valorActual = "";
        this.valorAnterior = "";
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    computar(tipo){
        this.tipoOperacion !== "igual" && this.calcular();
        this.tipoOperacion = tipo;
        this.valorAnterior = this.valorActual || this.valorAnterior;
        this.valorActual = "";
        this.imprimirValores();
    }

    agregarNumero(numero){
        if(numero === "." && this.valorActual.includes(".")) return
        this.valorActual = this.valorActual.toString() + numero;
        this.imprimirValores();
    }

    imprimirValores(){
        this.pantallaValorActual.textContent = this.valorActual;
        this.pantallaValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ""}`;
    }

    calcular(){
        let valorAnterior = parseFloat(this.valorAnterior);
        let valorActual = parseFloat(this.valorActual);

        if(isNaN(valorActual) || isNaN(valorAnterior) ) return
        this.valorActual = this.calculadora[this.tipoOperacion](valorAnterior, valorActual);
    }
}

let display = new Display(pantallaValorAnterior, pantallaValorActual);

botonesNumeros.forEach(function(boton){
    boton.addEventListener("click", function(){
        display.agregarNumero(boton.innerHTML);
    });
});

botonesOperadores.forEach(function(boton){
    boton.addEventListener("click", function(){
        display.computar(boton.value)
    });
});
