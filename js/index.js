
(() => {
    "use strict";

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const trackEvent = (eventName, parameters = {}) => {
        if (typeof window.gtag === "function") {
            window.gtag("event", eventName, parameters);
        }

        if (typeof window.fbq === "function") {
            window.fbq("trackCustom", eventName, parameters);
        }
    };

    const initTracking = () => {
        $$("[data-track]").forEach((element) => {
            element.addEventListener("click", () => {
                const action = element.dataset.track;

                if (action === "whatsapp" || action === "phone") {
                    trackEvent(
                        action === "whatsapp"
                            ? "WhatsApp_Click"
                            : "Phone_Click",
                        {
                            event_category: "Contact",
                            event_label: element.href || ""
                        }
                    );
                }
            });
        });
    };

    const initQuoteForm = () => {
        const form = $("#isnadServiceForm");

        if (!form) return;

        const serviceField = $("#isnadServiceType");
        const cityField = $("#isnadCity");
        const countField = $("#isnadElevatorCount");
        const problemField = $("#isnadProblem");
        const errorBox = $("#isnadFormError");
        const charCount = $("#isnadCharCount");

        const updateCharCount = () => {
            if (problemField && charCount) {
                charCount.textContent =
                    `${problemField.value.length} / 1500`;
            }
        };

        const showError = (message) => {
            if (errorBox) {
                errorBox.textContent = message;
                errorBox.style.display = message ? "block" : "none";
            }
        };

        if (problemField) {
            problemField.addEventListener("input", updateCharCount);
            updateCharCount();
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            showError("");

            if (!form.reportValidity()) return;

            if (
                !serviceField ||
                !cityField ||
                !countField ||
                !problemField
            ) {
                showError(
                    "حدث خطأ في النموذج. يرجى تحديث الصفحة والمحاولة مرة أخرى."
                );
                return;
            }

            const service = serviceField.value.trim();
            const city = cityField.value.trim();
            const count = Number(countField.value);
            const problem = problemField.value.trim();

            if (
                !service ||
                !city ||
                !problem ||
                !Number.isInteger(count) ||
                count < 1 ||
                count > 999 ||
                problem.length > 1500
            ) {
                showError(
                    "يرجى التأكد من إدخال جميع البيانات المطلوبة بشكل صحيح."
                );
                return;
            }

            const message = [
                "السلام عليكم ورحمة الله وبركاته",
                "أرغب في طلب خدمة من منظومة الإسناد.",
                "",
                `نوع الخدمة: ${service}`,
                `المدينة: ${city}`,
                `عدد المصاعد: ${count}`,
                `وصف المشكلة أو الطلب: ${problem}`,
                "",
                "نرجو التواصل معي وتوضيح التفاصيل والتكلفة.",
                "شكرًا لكم."
            ].join("\n");

            const whatsappNumber = "966531180385";

            const whatsappUrl =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            const popup = window.open(
                whatsappUrl,
                "_blank"
            );

            if (!popup) {
                showError(
                    "تعذر فتح واتساب. يرجى السماح بالنوافذ المنبثقة والمحاولة مرة أخرى."
                );
                return;
            }

            try {
                popup.opener = null;
            } catch (error) {}

            trackEvent("Quote_Request", {
                event_category: "Lead",
                service_type: service,
                city: city,
                elevator_count: count
            });

            form.reset();
            updateCharCount();
        });
    };

    const initNavbar = () => {
        const mainMenu = $("#mainMenu");

        if (
            !mainMenu ||
            typeof bootstrap === "undefined"
        ) {
            return;
        }

        const menuCollapse =
            bootstrap.Collapse.getOrCreateInstance(
                mainMenu,
                {
                    toggle: false
                }
            );

        const servicesToggle =
            $("#servicesDropdown", mainMenu);

        const languageToggle =
            $("#isnadLanguageDropdown", mainMenu);

        const servicesDropdown = servicesToggle
            ? bootstrap.Dropdown.getOrCreateInstance(
                servicesToggle
            )
            : null;

        const languageDropdown = languageToggle
            ? bootstrap.Dropdown.getOrCreateInstance(
                languageToggle
            )
            : null;

        const closeMobileMenu = () => {
            if (
                window.innerWidth < 992 &&
                mainMenu.classList.contains("show")
            ) {
                menuCollapse.hide();
            }
        };

        $$(
            ".nav-link:not(.dropdown-toggle)",
            mainMenu
        ).forEach((link) => {
            link.addEventListener(
                "click",
                closeMobileMenu
            );
        });

        $$(
            ".services-dropdown .dropdown-item",
            mainMenu
        ).forEach((link) => {
            link.addEventListener("click", () => {
                if (servicesDropdown) {
                    servicesDropdown.hide();
                }

                closeMobileMenu();
            });
        });

        if (servicesToggle) {
            servicesToggle.addEventListener(
                "show.bs.dropdown",
                () => {
                    if (languageDropdown) {
                        languageDropdown.hide();
                    }
                }
            );
        }

        if (languageToggle) {
            languageToggle.addEventListener(
                "show.bs.dropdown",
                () => {
                    if (servicesDropdown) {
                        servicesDropdown.hide();
                    }
                }
            );
        }
    };

    const initProblemsSection = () => {
        const section = $("#problems");

        if (!section) return;

        const image =
            $(".problems-visual img", section);

        const visual =
            $(".problems-visual", section);

        if (image && visual) {
            image.addEventListener(
                "error",
                () => {
                    image.style.display = "none";

                    visual.style.background =
                        "linear-gradient(145deg, #092747, #426781)";
                },
                {
                    once: true
                }
            );
        }
    };

    const initProcessSection = () => {
        const section =
            $(".isnad-process-section");

        if (!section) return;

        const heading =
            $(".isnad-process-heading", section);

        const cards =
            $$(".isnad-process-card", section);

        const bottom =
            $(".isnad-process-bottom", section);

        const elements = [
            heading,
            ...cards,
            bottom
        ].filter(Boolean);

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (
            reduceMotion ||
            !("IntersectionObserver" in window)
        ) {
            return;
        }

        elements.forEach((element) => {
            element.classList.add(
                "isnad-process-reveal"
            );

            const cardIndex =
                cards.indexOf(element);

            if (cardIndex !== -1) {
                element.style.setProperty(
                    "--reveal-delay",
                    `${cardIndex * 130}ms`
                );
            }
        });

        const observer =
            new IntersectionObserver(
                (entries, currentObserver) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        currentObserver.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -35px 0px"
                }
            );

        elements.forEach((element) => {
            observer.observe(element);
        });
    };

    const initElevatorsSection = () => {
        const gallery =
            $(".isnad-elevators-gallery");

        if (!gallery) return;

        const cards =
            $$(".isnad-elevator-card", gallery);

        const activateCard = (activeCard) => {
            cards.forEach((card) => {
                const isActive =
                    card === activeCard;

                card.classList.toggle(
                    "is-active",
                    isActive
                );

                card.setAttribute(
                    "aria-expanded",
                    String(isActive)
                );
            });
        };

        cards.forEach((card) => {
            card.addEventListener(
                "mouseenter",
                () => {
                    activateCard(card);
                }
            );

            card.addEventListener(
                "focusin",
                () => {
                    activateCard(card);
                }
            );

            card.addEventListener(
                "click",
                (event) => {
                    if (
                        event.target.closest("a")
                    ) {
                        return;
                    }

                    activateCard(card);
                }
            );

            card.addEventListener(
                "keydown",
                (event) => {
                    if (event.target !== card) {
                        return;
                    }

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {
                        event.preventDefault();
                        activateCard(card);
                    }
                }
            );
        });

        const defaultCard =
            $(".isnad-elevator-card.is-active", gallery) ||
            cards[0];

        if (defaultCard) {
            activateCard(defaultCard);
        }
    };

    const initStatsSection = () => {
        const section =
            $(".isnad-stats-section");

        if (!section) return;

        const counters =
            $$(".isnad-counter", section);

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        const animateCounter = (counter) => {
            const target =
                Number(counter.dataset.target);

            const duration =
                Number(counter.dataset.duration) ||
                2000;

            if (
                !Number.isFinite(target) ||
                target < 0
            ) {
                return;
            }

            if (reduceMotion) {
                counter.textContent =
                    target.toLocaleString("en-US");
                return;
            }

            const startTime =
                performance.now();

            const update = (currentTime) => {
                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const easedProgress =
                    1 - Math.pow(
                        1 - progress,
                        4
                    );

                const currentValue =
                    Math.floor(
                        easedProgress * target
                    );

                counter.textContent =
                    currentValue.toLocaleString(
                        "en-US"
                    );

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent =
                        target.toLocaleString(
                            "en-US"
                        );
                }
            };

            requestAnimationFrame(update);
        };

        if (
            !("IntersectionObserver" in window)
        ) {
            counters.forEach(
                animateCounter
            );
            return;
        }

        const observer =
            new IntersectionObserver(
                (entries, currentObserver) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        counters.forEach(
                            animateCounter
                        );

                        currentObserver.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.25
                }
            );

        observer.observe(section);
    };

    const initFooter = () => {
        const yearElement =
            $("#isnadFooterYear");

        const backToTop =
            $(".isnad-footer-top");

        if (yearElement) {
            yearElement.textContent =
                new Date().getFullYear();
        }

        if (backToTop) {
            backToTop.addEventListener(
                "click",
                (event) => {
                    const target =
                        $("#home");

                    if (!target) return;

                    event.preventDefault();

                    const reduceMotion =
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches;

                    target.scrollIntoView({
                        behavior: reduceMotion
                            ? "auto"
                            : "smooth",
                        block: "start"
                    });
                }
            );
        }
    };

    const init = () => {
        initTracking();
        initQuoteForm();
        initNavbar();
        initProblemsSection();
        initProcessSection();
        initElevatorsSection();
        initStatsSection();
        initFooter();
    };

    if (
        document.readyState === "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );
    } else {
        init();
    }
})();
