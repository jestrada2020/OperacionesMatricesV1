// Funciones utilitarias para operaciones con matrices
const MatrixUtils = {
    // Crear matriz con valores iniciales
    createMatrix: function(rows, cols, defaultValue = 1) {
        return Array(rows).fill().map(() => Array(cols).fill(defaultValue));
    },

    // Validar dimensiones de matrices para suma
    validateSumDimensions: function(matrix1, matrix2) {
        return matrix1.length === matrix2.length && 
               matrix1[0].length === matrix2[0].length;
    },

    // Validar dimensiones para multiplicación
    validateMultiplyDimensions: function(matrix1, matrix2) {
        return matrix1[0].length === matrix2.length;
    },

    // Sumar matrices
    addMatrices: function(matrix1, matrix2) {
        if (!this.validateSumDimensions(matrix1, matrix2)) {
            throw new Error("Las dimensiones de las matrices no son compatibles para la suma");
        }
        return matrix1.map((row, i) => 
            row.map((val, j) => val + matrix2[i][j])
        );
    },

    // Multiplicar matriz por escalar
    multiplyByScalar: function(matrix, scalar) {
        return matrix.map(row => 
            row.map(val => val * scalar)
        );
    },

    // Multiplicar matrices
    multiplyMatrices: function(matrix1, matrix2) {
        if (!this.validateMultiplyDimensions(matrix1, matrix2)) {
            throw new Error("Las dimensiones de las matrices no son compatibles para la multiplicación");
        }

        return matrix1.map((row) => {
            return Array(matrix2[0].length).fill().map((_, j) => {
                return row.reduce((sum, val, k) => sum + val * matrix2[k][j], 0);
            });
        });
    },

    // Convertir matriz a formato LaTeX
    matrixToLatex: function(matrix) {
        const rows = matrix.map(row => 
            row.map(val => 
                Number.isInteger(val) ? val.toString() : val.toFixed(2)
            ).join(" & ")
        ).join(" \\\\ ");
        return "\\begin{bmatrix}" + rows + "\\end{bmatrix}";
    },

    // Obtener valores de los inputs de una matriz
    getMatrixFromInputs: function(matrixId) {
        const matrixDiv = document.getElementById(matrixId);
        const rows = matrixDiv.children.length;
        const cols = matrixDiv.children[0].children.length;
        const matrix = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const value = parseFloat(matrixDiv.children[i].children[j].value) || 0;
                row.push(value);
            }
            matrix.push(row);
        }

        return matrix;
    },

    // Crear inputs para una matriz
    createMatrixInputs: function(matrixId, rows, cols) {
        const matrixDiv = document.getElementById(matrixId);
        matrixDiv.innerHTML = '';

        for (let i = 0; i < rows; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'matrix-row';

            for (let j = 0; j < cols; j++) {
                const input = document.createElement('input');
                input.type = 'number';


// Continuación de matrix-utils.js
                input.type = 'number';
                input.className = 'matrix-cell';
                input.value = '1';
                input.step = 'any';
                rowDiv.appendChild(input);
            }
            matrixDiv.appendChild(rowDiv);
        }
    },

    // Verificar todas las dimensiones
    validateAllDimensions: function(matrixA, matrixB, matrixC, matrixD) {
        // Verificar dimensiones para suma B + C
        if (!this.validateSumDimensions(matrixB, matrixC)) {
            throw new Error("Las matrices B y C deben tener las mismas dimensiones para poder sumarse");
        }

        // Verificar dimensiones para multiplicación A(B+C)D
        if (!this.validateMultiplyDimensions(matrixA, matrixB) || 
            !this.validateMultiplyDimensions(matrixB, matrixD)) {
            throw new Error("Las dimensiones no son compatibles para la multiplicación de matrices");
        }

        return true;
    },

    // Formatear el resultado para mostrar
    formatResult: function(name, matrix) {
        return `${name} = $${this.matrixToLatex(matrix)}$`;
    },

    // Reiniciar una matriz a valores por defecto
    resetMatrix: function(matrixId, rows, cols) {
        const matrixDiv = document.getElementById(matrixId);
        const inputs = matrixDiv.getElementsByClassName('matrix-cell');
        Array.from(inputs).forEach(input => {
            input.value = '1';
        });
    }
};