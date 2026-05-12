"use strict";

/**
 * Celular para WhatsApp y mismo número como destino para copiar en Yape.
 * Solo dígitos (sin espacios) para clipboard y enlaces wa.me.
 */
const WHATSAPP_NUMBER = "51916963593";

const WHATSAPP_MESSAGE =
  "Hola Santiago, vengo de tu página web y necesito asistencia para mi mascota.";

/** Mensaje sobre el botón Yape después de copiar al portapapeles */
const YAPE_COPY_TOAST_MESSAGE = "¡Número copiado! Pégalo en tu Yape";

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

async function copyDigitsToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fallback */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function initYapeCopyButton() {
  const btn = document.querySelector("[data-yape-copy]");
  const toast = document.getElementById("yape-copy-toast");
  if (!btn || !toast) return;

  let hideTimer;

  btn.addEventListener("click", async () => {
    const ok = await copyDigitsToClipboard(WHATSAPP_NUMBER);
    if (hideTimer) window.clearTimeout(hideTimer);

    if (ok) {
      toast.textContent = YAPE_COPY_TOAST_MESSAGE;
      toast.removeAttribute("hidden");
      toast.classList.add("is-visible");
      btn.classList.add("pay-btn--pulse");
      window.setTimeout(() => btn.classList.remove("pay-btn--pulse"), 420);
      hideTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
        window.setTimeout(() => {
          toast.setAttribute("hidden", "hidden");
          toast.textContent = "";
        }, 240);
      }, 3200);
    } else {
      toast.textContent =
        "No se pudo copiar automáticamente. Tu número para Yape es: " +
        WHATSAPP_NUMBER;
      toast.removeAttribute("hidden");
      toast.classList.add("is-visible");
      hideTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
        window.setTimeout(() => {
          toast.setAttribute("hidden", "hidden");
          toast.textContent = "";
        }, 240);
      }, 5000);
    }
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
  initYapeCopyButton();
  initHeaderScroll();
});
