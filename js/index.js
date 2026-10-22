
const quoteForm = document.getElementById("quoteForm");

function trackEvent(eventName, parameters = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, parameters);
  }
}

document.querySelectorAll("[data-track]").forEach((element) => {
  element.addEventListener("click", () => {
    const action = element.dataset.track;

    if (action === "whatsapp") {
      trackEvent("WhatsApp_Click", {
        event_category: "Contact",
        event_label: element.href
      });
    }

    if (action === "phone") {
      trackEvent("Phone_Click", {
        event_category: "Contact"
      });
    }
  });
});

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!quoteForm.reportValidity()) {
      return;
    }

    const service = document.getElementById("serviceType").value;
    const city = document.getElementById("city").value;
    const count = document.getElementById("elevatorCount").value;
    const brand = document.getElementById("brand").value.trim();
    const problem = document.getElementById("problem").value.trim();

    const message = [
      "السلام عليكم، أرغب في طلب عرض سعر من منظومة الإسناد.",
      "",
      `نوع الخدمة: ${service}`,
      `المدينة: ${city}`,
      `عدد المصاعد: ${count}`,
      `ماركة المصعد: ${brand || "غير محددة"}`,
      `وصف المشكلة: ${problem}`
    ].join("\n");

    trackEvent("Quote_Request", {
      event_category: "Lead",
      service_type: service,
      city: city,
      elevator_count: Number(count)
    });

    const whatsappUrl =
      "https://wa.me/966531180385?text=" +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

document.querySelectorAll("#mainMenu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("mainMenu");
    const instance = bootstrap.Collapse.getInstance(menu);

    if (instance && window.innerWidth < 992) {
      instance.hide();
    }
  });
      const section = document.querySelector("#problems");

    if (!section) return;

    const image = section.querySelector(".problems-visual img");

    if (image) {
        image.addEventListener("error", () => {
            image.style.display = "none";
            section.querySelector(".problems-visual").style.background =
                "linear-gradient(145deg, #092747, #426781)";
        }, { once: true });
    }

    section.querySelectorAll('[data-track="whatsapp"]').forEach((link) => {
        link.addEventListener("click", () => {
            if (typeof window.gtag === "function") {
                window.gtag("event", "whatsapp_click", {
                    event_category: "Customer Problems",
                    event_label: "طلب فحص مصعدك"
                });
            }

            if (typeof window.fbq === "function") {
                window.fbq("trackCustom", "WhatsAppClick", {
                    service_name: "طلب فحص مصعدك",
                    section: "customer_problems"
                });
            }
        });
    });
  const mainMenu = document.getElementById("mainMenu");

    if (!mainMenu || typeof bootstrap === "undefined") {
        return;
    }

    const menuCollapse = bootstrap.Collapse.getOrCreateInstance(
        mainMenu,
        { toggle: false }
    );

    mainMenu.querySelectorAll(".nav-link:not(.dropdown-toggle), .dropdown-item").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 992 && mainMenu.classList.contains("show")) {
                menuCollapse.hide();
            }
        });
    });

    mainMenu.querySelectorAll(".dropdown-item").forEach((link) => {
        link.addEventListener("click", () => {
            const dropdownToggle = mainMenu.querySelector("#servicesDropdown");

            if (dropdownToggle && window.innerWidth < 992) {
                bootstrap.Dropdown.getOrCreateInstance(dropdownToggle).hide();
            }
        });
    });
        const yearElement = document.getElementById("isnadFooterYear");
    const backToTop = document.querySelector(".isnad-footer-top");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (backToTop) {
        backToTop.addEventListener("click", (event) => {
            const target = document.querySelector("#home");

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                        ? "auto"
                        : "smooth",
                    block: "start"
                });
            }
        });
    }

});
