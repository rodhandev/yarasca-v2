/* ============================================================
   YARASCA-V2 — JS compartido por todas las páginas del módulo
   1. Announcement bar: cierre (X) con memoria de sesión
   2. Menú móvil + dropdowns accesibles
   3. Carrusel de reconocimientos (rota solo cada 4 s)
   4. Animación de aparición (IntersectionObserver)
   5. Modales de equipo (<dialog>)
   6. Chat flotante (maqueta) + formulario prototipo
   ============================================================ */
(function () {
  "use strict";

  /* --- 1. Announcement bar --- */
  var announce = document.getElementById("announce");
  var announceClose = document.getElementById("announce-close");
  if (announce && announceClose) {
    try {
      if (sessionStorage.getItem("yb-announce-off") === "1") {
        announce.classList.add("is-hidden");
      }
    } catch (e) { /* modo privado sin sessionStorage */ }
    announceClose.addEventListener("click", function () {
      announce.classList.add("is-hidden");
      try { sessionStorage.setItem("yb-announce-off", "1"); } catch (e) {}
    });
  }

  /* --- 2. Menú móvil + dropdowns --- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var abierto = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });
    nav.addEventListener("click", function (ev) {
      var link = ev.target.closest("a");
      if (link && window.innerWidth > 860) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      } else if (link) {
        // móvil: cerrar salvo que sea una etiqueta de dropdown
        if (!ev.target.closest(".dd-label")) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  }
  // En móvil, la etiqueta del dropdown abre/cierra su lista (no navega)
  document.querySelectorAll(".dd-label").forEach(function (label) {
    label.addEventListener("click", function () {
      if (window.innerWidth <= 860) {
        label.closest("li").classList.toggle("dd-open");
      }
    });
  });

  /* --- 3. Carrusel de reconocimientos: auto-rotación cada 4 s --- */
  var track = document.querySelector(".recon-track");
  if (track) {
    var items = Array.prototype.slice.call(track.children);
    // duplicar para loop infinito
    items.forEach(function (el) { track.appendChild(el.cloneNode(true)); });
    var index = 0;
    var gap = 24;
    var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function paso() {
      if (!items.length) return;
      index = (index + 1) % items.length;
      var w = items[0].getBoundingClientRect().width;
      track.style.transform = "translateX(-" + (w + gap) * index + "px)";
      if (index === items.length - 1) {
        // reinicio silencioso al llegar al clon final
        setTimeout(function () {
          track.style.transition = "none";
          index = 0;
          track.style.transform = "translateX(0)";
          void track.offsetWidth; // reflow
          track.style.transition = "";
        }, 650);
      }
    }
    if (!reducido) { setInterval(paso, 4000); }
  }

  /* --- 4. Animación de aparición --- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          io.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* --- 5. Modales de equipo (<dialog> nativo) --- */
  document.querySelectorAll(".team-open").forEach(function (abridor) {
    var dlg = document.getElementById(abridor.dataset.dialog);
    if (!dlg) return;
    abridor.addEventListener("click", function () { dlg.showModal(); });
  });
  document.querySelectorAll(".team-dialog [data-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      var dlg = el.closest("dialog");
      if (dlg) dlg.close();
    });
  });

  /* --- 6. Chat flotante (maqueta) --- */
  var lanzador = document.getElementById("fw-chat-launcher");
  var panel = document.getElementById("fw-chat-panel");
  var cerrar = document.getElementById("fw-chat-cerrar");
  if (lanzador && panel) {
    lanzador.addEventListener("click", function () {
      var abrir = panel.hidden;
      panel.hidden = !abrir;
      lanzador.setAttribute("aria-expanded", abrir ? "true" : "false");
    });
    if (cerrar) {
      cerrar.addEventListener("click", function () {
        panel.hidden = true;
        lanzador.setAttribute("aria-expanded", "false");
      });
    }
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !panel.hidden) {
        panel.hidden = true;
        lanzador.setAttribute("aria-expanded", "false");
        lanzador.focus();
      }
    });
  }

  /* --- Formulario (prototipo, sin backend) --- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (note) {
        note.textContent = "Formulario de prueba completado. El envío real se conectará más adelante.";
        note.classList.add("ok");
      }
      form.reset();
    });
  }
})();
