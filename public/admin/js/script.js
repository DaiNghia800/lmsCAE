document.querySelectorAll(".nav-menu").forEach((menu) => {
    menu.addEventListener("click", function (e) {
        // Close all menu are having class "active"
        document.querySelectorAll(".nav-menu.active").forEach((activeMenu) => {
            if (activeMenu !== this) {
                activeMenu.classList.remove("active");
                const sibling = activeMenu.nextElementSibling;
                if (sibling && sibling.classList.contains("nav-menu-item")) {
                    sibling.classList.remove("active");
                }
            }
        });
        // Toggle menu present
        this.classList.toggle("active");
        const nextMenuItem = this.nextElementSibling;
        if (nextMenuItem && nextMenuItem.classList.contains("nav-menu-item")) {
            nextMenuItem.classList.toggle("active");
        }
    });
});
