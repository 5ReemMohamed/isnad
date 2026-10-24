
(() => {
    "use strict";

    const supportedLanguages = ["ar", "en"];

    const flags = {
        ar: "https://flagcdn.com/w80/sa.png",
        en: "https://flagcdn.com/w80/us.png"
    };

    const getTranslation = (object, path) => {
        return path.split(".").reduce((result, key) => {
            return result && result[key];
        }, object);
    };

    const getInitialLanguage = () => {
        const params = new URLSearchParams(window.location.search);
        const urlLanguage = params.get("lang");

        if (supportedLanguages.includes(urlLanguage)) {
            return urlLanguage;
        }

        try {
            const savedLanguage = localStorage.getItem("siteLanguage");

            if (supportedLanguages.includes(savedLanguage)) {
                return savedLanguage;
            }
        } catch (error) {}

        return "ar";
    };

    let currentLanguage = getInitialLanguage();

    const updateFlag = (language) => {
        const currentFlag = document.querySelector(".isnad-current-flag");

        if (currentFlag) {
            currentFlag.src = flags[language];
            currentFlag.alt = language === "ar" ? "العربية" : "English";
        }

        document.querySelectorAll(".isnad-language-option").forEach((option) => {
            const isActive = option.dataset.lang === language;

            option.classList.toggle("active", isActive);
            option.setAttribute("aria-pressed", String(isActive));
        });
    };

    const applyLanguage = (language, updateUrl = true) => {
        if (!supportedLanguages.includes(language)) {
            language = "ar";
        }

        if (typeof translations === "undefined") {
            console.error("Translations file is not loaded.");
            return;
        }

        const languageData = translations[language];

        if (!languageData) {
            console.error("Translation not found:", language);
            return;
        }

        currentLanguage = language;

        try {
            localStorage.setItem("siteLanguage", currentLanguage);
        } catch (error) {}

        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

        if (document.body) {
            document.body.classList.remove("lang-ar", "lang-en");
            document.body.classList.add("lang-" + currentLanguage);
        }

        if (languageData.page && languageData.page.title) {
            document.title = languageData.page.title;
        }

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const key = element.getAttribute("data-i18n");
            const value = getTranslation(languageData, key);

            if (value !== undefined && value !== null) {
                element.textContent = value;
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach((element) => {
            const key = element.getAttribute("data-i18n-html");
            const value = getTranslation(languageData, key);

            if (value !== undefined && value !== null) {
                element.innerHTML = value;
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
            const key = element.getAttribute("data-i18n-placeholder");
            const value = getTranslation(languageData, key);

            if (value !== undefined && value !== null) {
                element.placeholder = value;
            }
        });

        document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
            const key = element.getAttribute("data-i18n-alt");
            const value = getTranslation(languageData, key);

            if (value !== undefined && value !== null) {
                element.alt = value;
            }
        });

document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria-label");
    const value = getTranslation(languageData, key);

    if (value !== undefined && value !== null) {
        element.setAttribute("aria-label", value);
    }
});

document.querySelectorAll("[data-i18n-data-service]").forEach((element) => {
    const key = element.getAttribute("data-i18n-data-service");
    const value = getTranslation(languageData, key);

    if (typeof value === "string") {
        element.setAttribute("data-service", value);
    }
});

        updateFlag(currentLanguage);

        if (updateUrl) {
            const url = new URL(window.location.href);

            url.searchParams.set("lang", currentLanguage);

            window.history.replaceState(null, "", url.toString());
        }

        window.dispatchEvent(
            new CustomEvent("languageChanged", {
                detail: {
                    language: currentLanguage
                }
            })
        );
    };

    const setupLanguageButtons = () => {
        const buttons = document.querySelectorAll(".isnad-language-option");

        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();

                const selectedLanguage = button.dataset.lang;

                if (!supportedLanguages.includes(selectedLanguage)) {
                    return;
                }

                applyLanguage(selectedLanguage, true);

                const toggle = document.querySelector("#isnadLanguageDropdown");

                if (toggle && typeof bootstrap !== "undefined") {
                    const dropdown = bootstrap.Dropdown.getInstance(toggle);

                    if (dropdown) {
                        dropdown.hide();
                    }
                }
            });
        });
    };

    const initLanguage = () => {
        applyLanguage(currentLanguage, false);
        setupLanguageButtons();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLanguage, {
            once: true
        });
    } else {
        initLanguage();
    }
})();
