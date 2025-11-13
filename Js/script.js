// --- FORMULARIO DE RESERVA ---
const formReserva = document.getElementById("formReserva");
const mensajeReserva = document.getElementById("mensajeReserva");

if (formReserva) {
  formReserva.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    if (!nombre || !servicio || !fecha || !hora) {
      mensajeReserva.textContent = "Por favor, completá todos los campos.";
      mensajeReserva.style.color = "red";
      return;
    }

    // Guardar en localStorage
    const reserva = { nombre, servicio, fecha, hora };
    localStorage.setItem("reservaFelipa", JSON.stringify(reserva));

    mensajeReserva.textContent = `✨ ¡Gracias ${nombre}! Tu turno de ${servicio} fue reservado para el ${fecha} a las ${hora}.`;
    mensajeReserva.style.color = "green";

    formReserva.reset();
  });
}

// --- LOGIN SIMPLE ---
const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@felipa.com" && password === "1234") {
      mensajeLogin.textContent = "✅ Inicio de sesión exitoso. Redirigiendo...";
      mensajeLogin.style.color = "green";
      setTimeout(() => (window.location.href = "index.html"), 1500);
    } else {
      mensajeLogin.textContent = "❌ Credenciales incorrectas.";
      mensajeLogin.style.color = "red";
    }
  });
}

// --- MOSTRAR CONFIRMACIÓN ---
const detalleTurno = document.getElementById("detalleTurno");

if (detalleTurno) {
  const reservaGuardada = JSON.parse(localStorage.getItem("reservaFelipa"));

  if (reservaGuardada) {
    detalleTurno.innerHTML = `
      <p><strong>Nombre:</strong> ${reservaGuardada.nombre}</p>
      <p><strong>Servicio:</strong> ${reservaGuardada.servicio}</p>
      <p><strong>Fecha:</strong> ${reservaGuardada.fecha}</p>
      <p><strong>Hora:</strong> ${reservaGuardada.hora}</p>
    `;
  } else {
    detalleTurno.innerHTML = `<p>No hay ninguna reserva registrada.</p>`;
  }
}

setTimeout(() => window.location.href = "confirmacion.html", 1000);

// --- EFECTO DE CONFETI ---
function lanzarConfeti() {
  const cantidad = 80;

  for (let i = 0; i < cantidad; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");

    // Colores suaves estilo Felipa
    const colores = ["#d49a89", "#f4c2c2", "#e0a899", "#fff2e5", "#f6d6d6"];
    confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.animationDuration = 2 + Math.random() * 3 + "s";
    confeti.style.opacity = Math.random();
    confeti.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confeti);

    // Eliminar después de la animación
    setTimeout(() => confeti.remove(), 5000);
  }
}

// Si estamos en la página de confirmación, lanzar el confeti
if (document.querySelector(".confirmacion")) {
  lanzarConfeti();
}
