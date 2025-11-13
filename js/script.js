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
