/* ==========================================
   ALMATIX CREATIVES — ENHANCED SCRIPT
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 0. FULL-SCREEN SERVICE IMAGE VIEWER
    // ==========================================
    const imageViewer = document.querySelector(".image-viewer");
    const imageViewerImage = imageViewer?.querySelector(".image-viewer-image");
    const imageViewerClose = imageViewer?.querySelector(".image-viewer-close");
    const serviceImages = document.querySelectorAll(".service-slider-track .image-item img");

    if (imageViewer && imageViewerImage && imageViewerClose) {
        const openImageViewer = (image) => {
            imageViewerImage.src = image.currentSrc || image.src;
            imageViewerImage.alt = image.alt;
            imageViewer.showModal();
        };

        serviceImages.forEach((image) => {
            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute("aria-label", `View ${image.alt || "image"} full screen`);

            image.addEventListener("click", () => openImageViewer(image));
            image.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openImageViewer(image);
                }
            });
        });

        imageViewerClose.addEventListener("click", () => imageViewer.close());
        imageViewer.addEventListener("click", (event) => {
            if (event.target === imageViewer) {
                imageViewer.close();
            }
        });
    }
    
    // ==========================================
    // 1. MOBILE NAVIGATION TOGGLE & RESIZE HANDLING
    // ==========================================
    const navToggle = document.getElementById("nav-toggle") || document.querySelector(".nav-toggle");
    const navList = document.getElementById("nav-list") || document.querySelector(".nav-list");

    if (navToggle && navList) {
        navToggle.addEventListener("click", () => {
            const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", !isExpanded);
            
            const currentVisible = navList.getAttribute("data-visible") === "true";
            navList.setAttribute("data-visible", !currentVisible);
        });

        // Close menu when clicking a nav link on mobile
        navList.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navToggle.setAttribute("aria-expanded", "false");
                navList.setAttribute("data-visible", "false");
            });
        });

        // Responsiveness: Automatically close mobile menu if window is resized to desktop view
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                navToggle.setAttribute("aria-expanded", "false");
                navList.setAttribute("data-visible", "false");
            }
        });
    }

    // ==========================================
    // 2. HEADER SEARCH FUNCTIONALITY
    // ==========================================
    const searchForm = document.querySelector(".header-search");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = searchForm.querySelector("input[name='q']");
            if (input && input.value.trim() !== "") {
                const query = input.value.toLowerCase().trim();
                const sections = document.querySelectorAll("section");
                let found = false;

                for (const sec of sections) {
                    if (sec.textContent.toLowerCase().includes(query)) {
                        sec.scrollIntoView({ behavior: "smooth" });
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    showToast(`No results found for "${input.value}". Try browsing our services below!`, "error");
                }
            }
        });
    }

    // ==========================================
    // 3. CONTACT FORM SUBMISSION WITH TOAST NOTIFICATION
    // ==========================================
    const contactForm = document.querySelector(".contact-form-container form") || document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Optional: Grab user's name for a personalized notification
            const nameInput = contactForm.querySelector("input[name='fullName']") || contactForm.querySelector("input[id='name']");
            const clientName = nameInput ? nameInput.value.trim() : "there";

            // Trigger success toast
            showToast(`Thank you, ${clientName}! Your message has been sent successfully. We'll reply within 24 hours.`, "success");
            
            // Reset form fields
            contactForm.reset();
        });
    }

    // ==========================================
    // 4. CUSTOM TOAST NOTIFICATION BUILDER
    // ==========================================
    function showToast(message, type = "success") {
        // Remove any existing toast
        const existingToast = document.querySelector(".almatix-toast");
        if (existingToast) existingToast.remove();

        const toast = document.createElement("div");
        toast.className = `almatix-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === "success" ? "✓" : "ℹ"}</span>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(toast);

        // Trigger CSS fade-in
        setTimeout(() => toast.classList.add("show"), 100);

        // Auto-dismiss after 4.5 seconds
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 4500);
    }
});