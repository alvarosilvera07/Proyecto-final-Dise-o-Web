document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const calcularBtn = document.getElementById('calcular-btn');
    const calorias = document.getElementById('calorias');
    const objetivo = document.getElementById('objetivo');
    const resultado = document.getElementById('resultado');
    const selectNivel = document.getElementById('nivel');
    const mayusBtn = document.getElementById('mayus-btn');
    const minusBtn = document.getElementById('minus-btn');
    const fechaInicio = document.getElementById('fecha-inicio');
    const fechaFin = document.getElementById('fecha-fin');
    const marcarTodosBtn = document.getElementById('marcar-todos');

    // Impedir salir de campos de texto si están vacíos
    form.addEventListener('focusout', function(event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'text' && event.target.value === '') {
            alert('Este campo no puede estar vacío.');
            event.target.focus();
        }
    });

    // Evitar que las fechas se crucen
    fechaInicio.addEventListener('change', function() {
        fechaFin.min = fechaInicio.value;
    });

    fechaFin.addEventListener('change', function() {
        fechaInicio.max = fechaFin.value;
    });

    // Calcular total de calorías
    calcularBtn.addEventListener('click', function() {
        const total = parseInt(calorias.value) + parseInt(objetivo.value);
        resultado.value = total;
    });

    // Cambiar opciones a mayúsculas
    mayusBtn.addEventListener('click', function() {
        for (let i = 0; i < selectNivel.options.length; i++) {
            selectNivel.options[i].text = selectNivel.options[i].text.toUpperCase();
        }
    });

    // Cambiar opciones a minúsculas
    minusBtn.addEventListener('click', function() {
        for (let i = 0; i < selectNivel.options.length; i++) {
            selectNivel.options[i].text = selectNivel.options[i].text.toLowerCase();
        }
    });

    // Validar el formulario antes de enviar
    form.addEventListener('submit', function(event) {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        const select = form.querySelector('select');
        if (checkboxes.length < 2 || select.value === '') {
            alert('Debes seleccionar al menos dos intereses y un nivel de entrenamiento.');
            event.preventDefault();
        }
    });

    // Botón para marcar todos los checkboxes
    marcarTodosBtn.addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = true);
    });

    // Calcular precio 
    document.getElementById('calcular-btn').addEventListener('click', function () {
        const nivel = document.getElementById('nivel-entrenamiento').value;
        const dias = parseInt(document.getElementById('dias-semana').value);

        if (dias < 2) {
            alert("Debes seleccionar al menos 2 días por semana.");
            return;
        }

        let precioBase = 1000; // Precio base para nivel inicial
        let incrementoNivel = 0; // Incremento por nivel
        switch (nivel) {
            case 'intermedio':
                incrementoNivel = 0.1; // 10% más caro
                break;
            case 'avanzado':
                incrementoNivel = 0.2; // 20% más caro
                break;
        }

        const incrementoDias = (dias - 2) * 0.1; // 10% por cada día adicional
        const precioTotal = precioBase * (1 + incrementoNivel + incrementoDias);

        document.getElementById('precio-total').value = `$${precioTotal.toFixed(2)}`;
    });
});
