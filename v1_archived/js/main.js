/* ============================================================
   Yarasca & Asociados — JS mínimo del prototipo
   1. Menú móvil
   2. Animación de aparición (IntersectionObserver)
   3. Formulario: solo feedback local, SIN envío real todavía
   ============================================================ */
(function () {
  "use strict";

  /* --- 1. Menú móvil --- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var abierto = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    // Cerrar el menú al elegir un destino (móvil)
    nav.addEventListener("click", function (ev) {
      if (ev.target.closest("a")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- 2. Animación de aparición --- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            io.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    // Navegadores sin IntersectionObserver: mostrar todo directamente
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* --- 2.b Widget de chat flotante (maqueta, sin backend) --- */
  var lanzador = document.getElementById("fw-chat-launcher");
  var panel = document.getElementById("fw-chat-panel");
  var cerrar = document.getElementById("fw-chat-cerrar");

  if (lanzador && panel) {
    var abrirChat = function () {
      panel.hidden = false;
      lanzador.setAttribute("aria-expanded", "true");
    };
    var cerrarChat = function () {
      panel.hidden = true;
      lanzador.setAttribute("aria-expanded", "false");
    };
    lanzador.addEventListener("click", function () {
      if (panel.hidden) { abrirChat(); } else { cerrarChat(); }
    });
    if (cerrar) { cerrar.addEventListener("click", cerrarChat); }
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !panel.hidden) { cerrarChat(); lanzador.focus(); }
    });
  }

  /* --- 2.c Modales de equipo (<dialog> nativo) --- */
  document.querySelectorAll(".team-open").forEach(function (abridor) {
    var dlg = document.getElementById(abridor.dataset.dialog);
    if (!dlg) return;
    abridor.addEventListener("click", function () { dlg.showModal(); });
  });
  // Cierre: botón ×, cualquier elemento con data-close (CTA que navega a #contacto)
  document.querySelectorAll(".team-dialog [data-close]").forEach(function (el) {
    el.addEventListener("click", function (ev) {
      // Si el elemento navega (ancla con href), dejar que el navegador
      // navegue después de cerrar el modal.
      el.closest("dialog").close();
      if (ev.target.closest("a[href^='#']")) return; // el ancla sigue su curso
      ev.preventDefault();
    });
  });

  /* --- 3. Formulario (prototipo, sin backend) --- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // PROTOTIPO: no hay envío real. Mensaje visible para pruebas.
      if (note) {
        note.textContent =
          "Formulario de prueba completado. El envío real se conectará más adelante.";
        note.classList.add("ok");
        note.classList.remove("err");
      }
      form.reset();
    });
  }
})();
