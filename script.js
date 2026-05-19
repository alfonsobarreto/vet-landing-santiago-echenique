"use strict";

/**
 * Celular completo para WhatsApp (internacional, sin +).
 */
const WHATSAPP_NUMBER = "51916963593";

const WHATSAPP_MESSAGE =
  "Hola Santiago, vengo de tu página web y necesito asistencia para mi mascota.";

/** Imagen del código QR para Yape (donaciones). */
const YAPE_QR_IMAGE_URL =
  "https://card-social-api.azurewebsites.net/uploads/1779165760071_f738eaca-2050-4e75-9c15-76f3b701bdfb.jpg";

/** Nombre sugerido al descargar el QR. */
const YAPE_QR_DOWNLOAD_FILENAME = "yape-qr-santiago-echenique.jpg";

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

async function downloadYapeQrImage() {
  const url = YAPE_QR_IMAGE_URL;
  const filename = YAPE_QR_DOWNLOAD_FILENAME;

  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("bad response");
    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
    return;
  } catch {
    /* CORS u otro fallo: intentar enlace directo (el navegador puede abrir pestaña). */
  }

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function initYapeQrDialog() {
  const openBtn = document.querySelector("[data-yape-qr-open]");
  const dialog = document.getElementById("yape-qr-dialog");
  const closeBtn = document.querySelector("[data-yape-qr-close]");
  const downloadBtn = document.querySelector("[data-yape-qr-download]");

  if (!openBtn || !dialog || typeof dialog.showModal !== "function") return;

  const closeDialog = () => {
    if (dialog.open) dialog.close();
  };

  openBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  closeBtn?.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeDialog();
  });

  downloadBtn?.addEventListener("click", () => {
    void downloadYapeQrImage();
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
