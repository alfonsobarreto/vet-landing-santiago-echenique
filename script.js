"use strict";

/**
 * Celular completo para WhatsApp (internacional, sin +).
 */
const WHATSAPP_NUMBER = "51916963593";

const WHATSAPP_MESSAGE =
  "Hola Santiago, vengo de tu página web y necesito asistencia para mi mascota.";

function buildWhatsAppHref() {
  const params = new URLSearchParams({ text: WHATSAPP_MESSAGE });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}

function initWhatsApp() {
  const fab = document.getElementById("whatsapp-fab");
  const cta = document.getElementById("cta-whatsapp");
  const url = buildWhatsAppHref();

  [fab, cta].forEach((el) => {
    if (!el) return;
    el.href = url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
}

function initYapeQrDialog() {
  const openBtns = document.querySelectorAll("[data-yape-qr-open]");
  const dialog = document.getElementById("yape-qr-dialog");
  const closeBtn = document.querySelector("[data-yape-qr-close]");

  if (!openBtns.length || !dialog || typeof dialog.showModal !== "function") return;

  const closeDialog = () => {
    if (dialog.open) dialog.close();
  };

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      dialog.showModal();
    });
  });

  closeBtn?.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeDialog();
  });
}

function initServicesAccordion() {
  const cards = document.querySelectorAll(".service-card");
  cards.forEach((card) => {
    const btn = card.querySelector(".service-card__toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const willOpen = !card.classList.contains("is-open");
      cards.forEach((c) => {
        c.classList.remove("is-open");
        const b = c.querySelector(".service-card__toggle");
        const p = c.querySelector(".service-card__panel");
        if (b) b.setAttribute("aria-expanded", "false");
        if (p) p.setAttribute("aria-hidden", "true");
      });
      if (willOpen) {
        card.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        const panel = card.querySelector(".service-card__panel");
        if (panel) panel.setAttribute("aria-hidden", "false");
      }
    });
  });
}

function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const update = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("is-scrolled", y > 28);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsApp();
  initServicesAccordion();
  initYapeQrDialog();
  initHeaderScroll();
});
