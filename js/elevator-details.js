
(() => {
    "use strict";

    const elevatorData = {
        passenger: {
            image: "images/elevator-1.jpg",
            ar: {
                title: "مصاعد الركاب",
                category: "حلول المباني السكنية والتجارية",
                heading: "مصاعد ركاب تجمع بين الراحة والكفاءة",
                description: "نقدم حلول تركيب وصيانة مصاعد الركاب للمباني السكنية والتجارية، مع اختيار المواصفات المناسبة لعدد الطوابق وحركة المستخدمين والمساحات المتاحة. نهتم بكفاءة التشغيل وسهولة الاستخدام ومتطلبات السلامة لتوفير تجربة تنقل مريحة وموثوقة.",
                features: [
                    "تصميمات تناسب المباني المختلفة",
                    "اختيار الحمولة والسرعة المناسبة",
                    "أنظمة تحكم وتشغيل حديثة",
                    "خدمات الصيانة والمتابعة الفنية"
                ]
            },
            en: {
                title: "Passenger Elevators",
                category: "Residential & Commercial Solutions",
                heading: "Passenger Elevators Combining Comfort and Efficiency",
                description: "We provide passenger elevator installation and maintenance solutions for residential and commercial buildings. Specifications are selected according to the number of floors, passenger traffic, and available space, with a focus on reliable operation, user comfort, and safety requirements.",
                features: [
                    "Designs for different building types",
                    "Suitable load capacity and speed",
                    "Modern control and operating systems",
                    "Maintenance and technical support"
                ]
            }
        },

        home: {
            image: "images/elevator-2.jpg",
            ar: {
                title: "المصاعد المنزلية",
                category: "حلول الفلل والمنازل",
                heading: "راحة أكبر داخل منزلك",
                description: "نوفر حلول مصاعد منزلية مناسبة للفلل والمنازل متعددة الطوابق، مع مراعاة المساحات الداخلية والتصميم المعماري للمبنى. نساعدك في اختيار المصعد المناسب لتسهيل الحركة اليومية بين الطوابق، مع الاهتمام بجمال التصميم وسهولة التشغيل.",
                features: [
                    "تصميمات مناسبة للفلل والمنازل",
                    "استغلال المساحات المتاحة",
                    "سهولة الاستخدام والتنقل",
                    "خيارات متنوعة للتشطيبات"
                ]
            },
            en: {
                title: "Home Elevators",
                category: "Villa & Home Solutions",
                heading: "Greater Comfort Inside Your Home",
                description: "We offer home elevator solutions for villas and multi-story houses, considering available interior space and architectural design. Our team helps select the right elevator for convenient daily movement between floors, combining practical operation with attractive finishes.",
                features: [
                    "Designs for villas and homes",
                    "Efficient use of available space",
                    "Convenient movement between floors",
                    "Various interior finishing options"
                ]
            }
        },

        freight: {
            image: "images/elevator-4.jpg",
            ar: {
                title: "مصاعد البضائع",
                category: "حلول المنشآت الصناعية",
                heading: "حلول عملية لنقل البضائع والمعدات",
                description: "نقدم حلول مصاعد البضائع للمستودعات والمصانع والمنشآت التجارية والصناعية. نراعي طبيعة الحمولة وأبعاد المواد المنقولة ومتطلبات التشغيل، للمساعدة في تسهيل عمليات النقل بين الطوابق وتحسين كفاءة العمل.",
                features: [
                    "حمولات تناسب طبيعة الاستخدام",
                    "كبائن وأبواب بأبعاد مناسبة",
                    "حلول للمستودعات والمنشآت",
                    "صيانة وفحص أنظمة التشغيل"
                ]
            },
            en: {
                title: "Freight Elevators",
                category: "Industrial Facility Solutions",
                heading: "Practical Solutions for Moving Goods and Equipment",
                description: "We provide freight elevator solutions for warehouses, factories, and commercial or industrial facilities. Our solutions consider load characteristics, cargo dimensions, and operating requirements to facilitate transportation between floors and improve workflow efficiency.",
                features: [
                    "Load capacities for different needs",
                    "Suitable cabin and door dimensions",
                    "Solutions for warehouses and facilities",
                    "Operating system inspection and maintenance"
                ]
            }
        },

        food: {
            image: "images/elevator-3.jpg",
            ar: {
                title: "مصاعد الطعام",
                category: "حلول للمطاعم والفنادق",
                heading: "سهولة وسرعة في نقل الطعام",
                description: "نوفر حلول مصاعد الطعام للمطاعم والفنادق والمطابخ التجارية، لتسهيل نقل الأطعمة والمشروبات والأدوات بين الطوابق. يتم اختيار الأبعاد والحمولات المناسبة لطبيعة التشغيل والمساحات المتاحة، بما يساعد على تنظيم العمل وتحسين كفاءة الخدمة.",
                features: [
                    "مناسبة للمطاعم والفنادق",
                    "أبعاد مدمجة حسب المساحة",
                    "سهولة نقل الطعام والأدوات",
                    "حلول تشغيل وصيانة مناسبة"
                ]
            },
            en: {
                title: "Food Elevators",
                category: "Restaurant & Hotel Solutions",
                heading: "Easy and Efficient Food Transportation",
                description: "We provide food elevator solutions for restaurants, hotels, and commercial kitchens to facilitate the transportation of meals, beverages, and utensils between floors. Dimensions and load capacities are selected according to operating needs and available space.",
                features: [
                    "Suitable for restaurants and hotels",
                    "Compact dimensions for available spaces",
                    "Convenient transportation of food and utensils",
                    "Suitable operation and maintenance solutions"
                ]
            }
        },

        hospital: {
            image: "images/elevator-5.jpg",
            ar: {
                title: "مصاعد المستشفيات",
                category: "حلول للمرافق الصحية",
                heading: "مصاعد تلبي احتياجات المنشآت الصحية",
                description: "نقدم حلول مصاعد للمستشفيات والمراكز الطبية، مع مراعاة حركة المرضى والأسرة الطبية والمرافقين. نهتم باختيار أبعاد الكبينة وفتحات الأبواب ومتطلبات التشغيل المناسبة لطبيعة المنشأة، بما يسهم في تسهيل التنقل داخل المرافق الصحية.",
                features: [
                    "مساحات مناسبة للأسرة الطبية",
                    "أبواب تسهل حركة المرضى",
                    "تشغيل يلائم طبيعة المرافق الصحية",
                    "خدمات فحص وصيانة دورية"
                ]
            },
            en: {
                title: "Hospital Elevators",
                category: "Healthcare Facility Solutions",
                heading: "Elevators Designed for Healthcare Facilities",
                description: "We provide elevator solutions for hospitals and medical centers, considering the movement of patients, hospital beds, and caregivers. We focus on suitable cabin dimensions, door openings, and operating requirements to support convenient movement throughout healthcare facilities.",
                features: [
                    "Cabin space suitable for hospital beds",
                    "Doors designed for convenient patient movement",
                    "Operation suited to healthcare facilities",
                    "Scheduled inspection and maintenance services"
                ]
            }
        }
    };

    const getLanguage = () => {
        return document.documentElement.lang === "en" ? "en" : "ar";
    };

    const renderElevatorDetails = () => {
        const params = new URLSearchParams(window.location.search);
        const type = params.get("type") || "passenger";
        const elevator = elevatorData[type] || elevatorData.passenger;
        const language = getLanguage();
        const content = elevator[language];

        const setText = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        };

        setText("elevatorBreadcrumbTitle", content.title);
        setText("elevatorCategory", content.category);
        setText("elevatorPageTitle", content.title);
        setText("elevatorMainHeading", content.heading);
        setText("elevatorMainDescription", content.description);

        setText(
            "elevatorFeaturesHeading",
            language === "ar" ? "مميزات الخدمة" : "Service Features"
        );

        setText(
            "elevatorButtonText",
            language === "ar" ? "اطلب عرض سعر" : "Request a Quote"
        );

        setText(
            "elevatorCtaTitle",
            language === "ar"
                ? "تبحث عن المصعد المناسب لمشروعك؟"
                : "Looking for the Right Elevator for Your Project?"
        );

        setText(
            "elevatorCtaDescription",
            language === "ar"
                ? "تواصل مع فريق منظومة الإسناد للحصول على استشارة فنية."
                : "Contact Manzumat Al-Isnad for technical consultation."
        );

        setText(
            "elevatorContactText",
            language === "ar" ? "تواصل معنا" : "Contact Us"
        );

        const image = document.getElementById("elevatorDetailsImage");

        if (image) {
            image.src = elevator.image;
            image.alt = content.title;
        }

        const featuresContainer = document.getElementById("elevatorFeatures");

        if (featuresContainer) {
            featuresContainer.replaceChildren();

            content.features.forEach((feature) => {
                const item = document.createElement("div");
                item.className = "isnad-elevator-feature";

                const icon = document.createElement("i");
                icon.className = "fa-solid fa-circle-check";
                icon.setAttribute("aria-hidden", "true");

                const text = document.createElement("span");
                text.textContent = feature;

                item.append(icon, text);
                featuresContainer.appendChild(item);
            });
        }

        const whatsappButton = document.getElementById("elevatorWhatsappButton");

        if (whatsappButton) {
            const message = language === "ar"
                ? `مرحباً، أرغب في طلب عرض سعر لخدمة ${content.title}.`
                : `Hello, I would like to request a quotation for ${content.title}.`;

            whatsappButton.href =
                `https://wa.me/966531180385?text=${encodeURIComponent(message)}`;
        }

        document.title = language === "ar"
            ? `${content.title} | منظومة الإسناد`
            : `${content.title} | Manzumat Al-Isnad`;
    };

    const init = () => {
        renderElevatorDetails();

        document.addEventListener("languageChanged", renderElevatorDetails);

        const observer = new MutationObserver((mutations) => {
            if (mutations.some((mutation) => mutation.attributeName === "lang")) {
                renderElevatorDetails();
            }
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["lang"]
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
