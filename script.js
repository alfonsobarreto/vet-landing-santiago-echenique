"use strict";

/**
 * Número de WhatsApp en formato internacional (sin + ni espacios).
 * Ejemplo Perú: 51 + 9 dígitos del celular.
 * IMPORTANTE: reemplaza por el número real antes de publicar.
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

function initDonationDemo() {
  document.querySelectorAll("[data-donation-sim]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("pay-btn--pulse");
      window.setTimeout(() => button.classList.remove("pay-btn--pulse"), 400);
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
  initDonationDemo();
  initHeaderScroll();
});
