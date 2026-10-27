const frm = document.querySelector<HTMLFormElement>('[data-js="form"]');
const nameInput = document.querySelector<HTMLInputElement>(
  '[data-js="name-input"]',
);
const emailInput = document.querySelector<HTMLInputElement>(
  '[data-js="email-input"]',
);
const nameAlert = document.querySelector<HTMLSpanElement>(
  '[data-js="name-alert"]',
);
const emailAlert = document.querySelector<HTMLSpanElement>(
  '[data-js="email-alert"]',
);
const formMessage = document.querySelector<HTMLSpanElement>(
  '[data-js="form-message"]',
);

type MessageType = "alert" | "error" | "success" | null;

function setMessage(
  messageElement: HTMLSpanElement | null,
  message: string,
  messageType: MessageType,
) {
  if (!messageElement) return;

  messageElement.textContent = message;
  messageElement.classList.toggle("alert", messageType === "alert");
  messageElement.classList.toggle("error", messageType === "error");
  messageElement.classList.toggle("success", messageType === "success");
}

function setValidationMessage(
  input: HTMLInputElement | null,
  alert: HTMLSpanElement | null,
  message: string,
  messagetype: "alert" | "error" | null,
) {
  setMessage(alert, message, messagetype);
  input?.setAttribute("aria-invalid", String(messagetype !== null));
}

function nameValidate(value: string) {
  const name = value.trim();

  if (name.length === 0) {
    setValidationMessage(
      nameInput,
      nameAlert,
      "A name must be entered",
      "alert",
    );
    return false;
  }

  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
    setValidationMessage(
      nameInput,
      nameAlert,
      "The name cannot contain numbers or special characters.",
      "error",
    );
    return false;
  }

  setValidationMessage(nameInput, nameAlert, "", null);
  return true;
}

function emailValidate(value: string) {
  const email = value.trim();

  if (email.length === 0) {
    setValidationMessage(
      emailInput,
      emailAlert,
      "An email must be entered",
      "alert",
    );
    return false;
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    setValidationMessage(
      emailInput,
      emailAlert,
      "Email format is invalid",
      "error",
    );
    return false;
  }

  setValidationMessage(emailInput, emailAlert, "", null);
  return true;
}

nameInput?.addEventListener("input", () => {
  nameValidate(nameInput.value);
});

emailInput?.addEventListener("input", () => {
  emailValidate(emailInput.value);
});

let formMessageTimer: number | undefined;

frm?.addEventListener("submit", (e) => {
  e.preventDefault();

  window.clearTimeout(formMessageTimer);
  setMessage(formMessage, "", null);

  const isNameValid = nameValidate(nameInput?.value ?? "");
  const isEmailValid = emailValidate(emailInput?.value ?? "");

  if (!isNameValid) {
    nameInput?.focus();
  } else if (!isEmailValid) {
    emailInput?.focus();
  }

  if (isNameValid && isEmailValid) {
    setMessage(
      formMessage,
      "Subscription completed successfully (Test only; no data was actually sent)",
      "success",
    );
    frm.reset();

    formMessageTimer = window.setTimeout(() => {
      setMessage(formMessage, "", null);
      formMessageTimer = undefined;
    }, 3000);
  }
});

const LOAD_TIMEOUT_MS = 10_000;

const getEmbedUrl = (value: string) => {
  try {
    const url = new URL(value);
    const isGoogleEmbed =
      url.origin === "https://www.google.com" &&
      url.pathname.startsWith("/maps/embed");
    return isGoogleEmbed ? url.href : null;
  } catch {
    return null;
  }
};

document.querySelectorAll<HTMLElement>("[data-map]").forEach((box) => {
  const button = box.querySelector<HTMLButtonElement>("[data-map-load]");
  const status =
    box.parentElement?.querySelector<HTMLElement>("[data-map-status]");
  const fallback = box.parentElement?.querySelector<HTMLElement>(
    "[data-map-fallback]",
  );
  const embedUrl = getEmbedUrl(box.dataset.src ?? "");

  if (!embedUrl) {
    console.error("Map: invalid data-src", box.dataset.src);
    return;
  }
  if (!button) return;

  button.addEventListener(
    "click",
    () => {
      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = box.dataset.title ?? "Map";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.className = "size-full border-0";

      if (fallback) fallback.hidden = true;

      const timer = window.setTimeout(() => {
        if (status)
          status.textContent =
            "The map is taking too long to load. You can open it in Google Maps instead.";
        if (fallback) fallback.hidden = false;
      }, LOAD_TIMEOUT_MS);

      iframe.addEventListener(
        "load",
        () => {
          window.clearTimeout(timer);
          if (status) status.textContent = "";
          if (fallback) fallback.hidden = true;
        },
        { once: true },
      );

      box.replaceChildren(iframe);
      iframe.focus();
    },
    { once: true },
  );
});
