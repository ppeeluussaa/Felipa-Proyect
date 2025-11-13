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
      localStorage.setItem("usuarioActual", email);
      setTimeout(() => (window.location.href = "admin.html"), 1500);
    } else {
      mensajeLogin.textContent = "❌ Credenciales incorrectas.";
      mensajeLogin.style.color = "red";
    }
  });
}

// --- OLVIDÉ MI CONTRASEÑA ---
const forgotBtn = document.getElementById("forgotPasswordBtn");
const formRecuperar = document.getElementById("formRecuperar");

if (forgotBtn) {
  forgotBtn.addEventListener("click", () => {
    formRecuperar.classList.toggle("hidden");
  });
}

if (formRecuperar) {
  formRecuperar.addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("recuperarEmail").value;
    mensajeLogin.textContent = `📩 Si ${correo} está registrado, te enviaremos un enlace para recuperar tu contraseña.`;
    mensajeLogin.style.color = "green";
    formRecuperar.reset();
  });
}

// ==========================
// RESERVA DE TURNOS CON HORARIOS
// ==========================
const formReserva = document.getElementById("formReserva");
const mensajeReserva = document.getElementById("mensajeReserva");
const fechaInput = document.getElementById("fecha");
const horaSelect = document.getElementById("hora"); // para compatibilidad
let horarioSeleccionado = null;

// Horarios fijos
const horariosDisponibles = ["08:00", "10:00", "14:00", "17:00", "19:00"];

// Crear contenedor de botones debajo del input de fecha
const horariosContainer = document.createElement("div");
horariosContainer.id = "horariosContainer";
horariosContainer.style.display = "flex";
horariosContainer.style.flexWrap = "wrap";
horariosContainer.style.gap = "10px";
fechaInput.parentNode.insertBefore(horariosContainer, horaSelect.nextSibling);

// Ocultar el select original
horaSelect.style.display = "none";

// Al cambiar la fecha, mostrar los horarios
fechaInput.addEventListener("change", () => {
  horariosContainer.innerHTML = ""; // limpiar

  horariosDisponibles.forEach(hora => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = hora;
    btn.className = "horario-btn";

    btn.addEventListener("click", () => {
      document.querySelectorAll(".horario-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      horarioSeleccionado = hora;
    });

    horariosContainer.appendChild(btn);
  });
});

if (formReserva) {
  formReserva.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!horarioSeleccionado) {
      mensajeReserva.textContent = "❌ Por favor, seleccioná un horario.";
      mensajeReserva.style.color = "red";
      return;
    }

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const servicio = document.getElementById("servicio").value;
    const fecha = fechaInput.value;

    mensajeReserva.textContent = `✅ Turno reservado para ${nombre} el ${fecha} a las ${horarioSeleccionado} para ${servicio}.`;
    mensajeReserva.style.color = "green";

    // Limpiar
    formReserva.reset();
    horariosContainer.innerHTML = "";
    horarioSeleccionado = null;
  });
}
