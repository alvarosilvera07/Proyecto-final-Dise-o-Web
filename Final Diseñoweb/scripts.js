// --- Título Dinamico con Animación ---
const title = document.querySelector('header h1');

// Función para aplicar la animación de desvanecimiento y desplazamiento al título
function applyAnimation() {
    title.style.animation = 'fadeInUp 2s ease-in-out';
}

// Ejecutar la animación cuando se hace clic en el menú o al cambiar la sección
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function () {
        const section = link.getAttribute('href').substring(1);
        title.textContent = `Sección: ${section.charAt(0).toUpperCase() + section.slice(1)}`;
        applyAnimation();
    });
});

// --- Menu Dinámico ---
const nav = document.querySelector('nav ul');
const toggleMenu = document.getElementById('toggleMenu');

// Agrega un listener solo si toggleMenu existe
if (toggleMenu) {
    toggleMenu.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'none' ? 'flex' : 'none';
    });
}

// Ocultar menú en pantallas móviles
function checkWindowSize() {
    if (window.innerWidth < 768) {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
}
checkWindowSize();
window.addEventListener('resize', checkWindowSize);

// Resaltar elemento del menú al pasar el ratón
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('mouseover', function () {
        link.style.backgroundColor = '#FF5733';
        link.style.color = '#fff';
    });

    link.addEventListener('mouseout', function () {
        link.style.backgroundColor = '';
        link.style.color = '#fff';
    });
});

// --- Validaciones de Formulario ---
document.querySelectorAll('#registroForm input[type="text"]').forEach(input => {
    input.addEventListener('blur', function () {
        if (!this.value.trim()) {
            this.style.borderColor = 'red';
            this.setAttribute('placeholder', 'Este campo es obligatorio');
        } else {
            this.style.borderColor = '';
        }
    });
});

const fechaInicio = document.getElementById('fechaInicio');
const fechaFin = document.getElementById('fechaFin');

// Validar fechas cruzadas
function validateDates() {
    if (fechaInicio.value && fechaFin.value) {
        if (fechaInicio.value > fechaFin.value) {
            alert('La fecha de inicio no puede ser después de la fecha de fin.');
            fechaInicio.value = '';
        }
    }
}
fechaInicio.addEventListener('change', validateDates);
fechaFin.addEventListener('change', validateDates);

// Cálculo aritmético
document.getElementById('calcular').addEventListener('click', function () {
    const num1 = parseFloat(document.getElementById('numero1').value);
    const num2 = parseFloat(document.getElementById('numero2').value);
    if (!isNaN(num1) && !isNaN(num2)) {
        document.getElementById('resultado').value = num1 + num2;
    } else {
        alert('Ingrese valores válidos para la operación');
    }
});

// Marcar todos los checkboxes
document.getElementById('marcarTodos').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('input[name="intereses"]');
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    checkboxes.forEach(checkbox => checkbox.checked = !allChecked);
});

// Cambiar texto a mayúsculas/minúsculas
document.getElementById('mayusculas').addEventListener('click', function () {
    document.querySelectorAll('#opciones option').forEach(option => {
        option.text = option.text.toUpperCase();
    });
});

document.getElementById('minusculas').addEventListener('click', function () {
    document.querySelectorAll('#opciones option').forEach(option => {
        option.text = option.text.toLowerCase();
    });
});

// Validación de formulario antes del envío
document.getElementById('registroForm').addEventListener('submit', function (e) {
    const checkboxes = document.querySelectorAll('input[name="intereses"]:checked');
    if (checkboxes.length < 2) {
        alert('Selecciona al menos dos opciones en los intereses.');
        e.preventDefault();
    }

    const select = document.getElementById('opciones');
    if (select.value === "") {
        alert('Selecciona una opción en la lista desplegable.');
        e.preventDefault();
    }
});
