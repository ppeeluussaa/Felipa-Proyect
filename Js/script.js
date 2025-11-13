// --- HORARIOS DISPONIBLES ---
const horariosDisponibles = {
  "2025-11-13": ["10:00", "11:00", "12:00", "15:00"],
  "2025-11-14": ["09:00", "10:00", "13:00", "16:00"],
  "2025-11-15": ["09:00", "10:30", "11:30", "14:00"],
};

// --- FUNCIONES AUXILIARES ---
function obtenerReservas() {
  return JSON.parse(localStorage.getItem("reservasFelipa")) || [];
}

function guardarReservas(reservas) {
  localStorage.setItem("reservasFelipa", JSON.stringify(reservas));
}

// --- FORMULARIO DE RESERVA ---
const formReserva = document.getElementById("formReserva");
const mensajeReserva = document.getElementById("mensajeReserva");

if (formReserva) {
  const fechaInput = document.getElementById("fecha");
  const horaInput = document.getElementById("hora");

  // Mostrar solo horarios disponibles
  fechaInput.addEventListener("change", () => {
    const fecha = fechaInput.value;
    horaInput.innerHTML = "";

    if (horariosDisponibles[fecha]) {
      const reservas = obtenerReservas().filter(r => r.fecha === fecha);
      const ocupadas = reservas.map(r => r.hora);

      horariosDisponibles[fecha].forEach(hora => {
        if (!ocupadas.includes(hora)) {
          const option = document.createElement("option");
          option.value = hora;
          option.textContent = hora;
          horaInput.appendChild(option);
        }
      });

      if (horaInput.options.length === 0) {
        const option = document.createElement("option");
        option.textContent = "No hay horarios disponibles";
        option.disabled = true;
        horaInput.appendChild(option);
      }
    } else {
      const option = document.createElement("option");
      option.textContent = "No hay horarios configurados para ese día";
      option.disabled = true;
      horaInput.appendChild(option);
    }
  });

  formReserva.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = fechaInput.value;
    const hora = horaInput.value;

    if (!nombre || !telefono || !servicio || !fecha || !hora) {
      mensajeReserva.textContent = "Por favor, completá todos los campos.";
      mensajeReserva.style.color = "red";
      return;
    }

    const reservas = obtenerReservas();
    const existe = reservas.some(r => r.fecha === fecha && r.hora === hora);
    if (existe) {
      mensajeReserva.textContent = "⚠️ Ese horario ya está reservado.";
      mensajeReserva.style.color = "red";
      return;
    }

    const nuevaReserva = { nombre, telefono, servicio, fecha, hora, realizado: false };
    reservas.push(nuevaReserva);
    guardarReservas(reservas);

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

// --- PANEL ADMIN ---
const listaTurnos = document.getElementById("listaTurnos");
const logoutBtn = document.getElementById("logoutBtn");

if (listaTurnos) {
  const user = localStorage.getItem("usuarioActual");
  if (user !== "admin@felipa.com") {
    alert("Acceso denegado. Solo el administrador puede ingresar.");
    window.location.href = "login.html";
  }

  let reservas = obtenerReservas();

  const renderTurnos = () => {
    listaTurnos.innerHTML = "";

    if (reservas.length === 0) {
      listaTurnos.innerHTML = "<p>No hay turnos reservados.</p>";
      return;
    }

    // Agrupar por fecha
    const fechas = [...new Set(reservas.map(r => r.fecha))].sort();
    fechas.forEach(fecha => {
      const divFecha = document.createElement("div");
      divFecha.classList.add("fecha-grupo");
      const titulo = document.createElement("h3");
      titulo.textContent = fecha;
      divFecha.appendChild(titulo);

      reservas.filter(r => r.fecha === fecha).forEach((t, index) => {
        const div = document.createElement("div");
        div.classList.add("turno-card");
        div.innerHTML = `
          <p><strong>Cliente:</strong> ${t.nombre}</p>
          <p><strong>Teléfono:</strong> ${t.telefono}</p>
          <p><strong>Servicio:</strong> ${t.servicio}</p>
          <p><strong>Hora:</strong> ${t.hora}</p>
          <p><strong>Estado:</strong> ${t.realizado ? "✅ Realizado" : "🕐 Pendiente"}</p>
          <div class="acciones">
            <button class="btn-realizado" data-index="${reservas.indexOf(t)}">Marcar realizado</button>
            <button class="btn-cancelar" data-index="${reservas.indexOf(t)}">Cancelar</button>
            <button class="btn-eliminar" data-index="${reservas.indexOf(t)}">Eliminar</button>
          </div>
        `;
        divFecha.appendChild(div);
      });

      listaTurnos.appendChild(divFecha);
    });
  };

  renderTurnos();

  listaTurnos.addEventListener("click", (e) => {
    const i = e.target.dataset.index;
    if (e.target.classList.contains("btn-realizado")) {
      reservas[i].realizado = true;
    } else if (e.target.classList.contains("btn-cancelar") || e.target.classList.contains("btn-eliminar")) {
      reservas.splice(i, 1);
    }
    guardarReservas(reservas);
    renderTurnos();
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioActual");
    window.location.href = "login.html";
  });
}

// --- EFECTO DE CONFETI ---
function lanzarConfeti() {
  const cantidad = 80;
  for (let i = 0; i < cantidad; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");
    const colores = ["#d49a89", "#f4c2c2", "#e0a899", "#fff2e5", "#f6d6d6"];
    confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style.animationDuration = 2 + Math.random() * 3 + "s";
    confeti.style.opacity = Math.random();
    confeti.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(confeti);
    setTimeout(() => confeti.remove(), 5000);
  }
}

if (document.querySelector(".confirmacion")) {
  lanzarConfeti();
}
