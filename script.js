const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
  mobileMenu.setAttribute("aria-hidden", !isOpen);
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
});

document.addEventListener("click", event => {
  if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
    mobileMenu.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
    mobileMenu.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuButton.focus();
  }
});

const tattooGrid = document.querySelector(".tattoo-grid");
const studioSection = document.getElementById("studio");
const aboutSection = document.getElementById("about");

if (studioSection && aboutSection) {
  aboutSection.insertAdjacentElement("afterend", studioSection);
}

if (tattooGrid) {
  tattooGrid.insertAdjacentHTML("beforeend", `
    <figure class="tattoo-card tattoo-card--wide">
      <img src="tatuaje/minimal.png" alt="Tatuaje minimalista en tinta negra" loading="lazy">
      <figcaption>Minimal / 05</figcaption>
    </figure>
    <figure class="tattoo-card">
      <img src="tatuaje/sombras.jpg" alt="Tatuaje de sombras en tinta negra" loading="lazy">
      <figcaption>Sombras / 06</figcaption>
    </figure>
  `);

  tattooGrid.insertAdjacentHTML("beforebegin", `
    <div class="instagram-tabs" role="tablist" aria-label="Galería de publicaciones">
      <button class="instagram-tab is-active" type="button" data-gallery-filter="all" role="tab" aria-selected="true"><span aria-hidden="true">▦</span> Todo</button>
      <button class="instagram-tab" type="button" data-gallery-filter="photos" role="tab" aria-selected="false"><span aria-hidden="true">▧</span> Fotos</button>
    </div>
  `);

  document.querySelectorAll(".instagram-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".instagram-tab").forEach(item => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", active);
      });
    });
  });

  const galleryModal = document.createElement("dialog");
  galleryModal.className = "gallery-modal";
  galleryModal.innerHTML = '<button class="gallery-close" type="button" aria-label="Cerrar imagen">×</button><img src="" alt="">';
  document.body.append(galleryModal);

  const modalImage = galleryModal.querySelector("img");
  tattooGrid.querySelectorAll(".tattoo-card").forEach((card, index) => {
    const image = card.querySelector("img");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Ampliar trabajo ${index + 1}`);

    const openImage = () => {
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt;
      galleryModal.showModal();
    };

    card.addEventListener("click", openImage);
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openImage();
      }
    });
  });

  galleryModal.querySelector(".gallery-close").addEventListener("click", () => galleryModal.close());
  galleryModal.addEventListener("click", event => {
    if (event.target === galleryModal) galleryModal.close();
  });
}
