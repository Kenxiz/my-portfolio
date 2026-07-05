const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".work-card");
const mediaButtons = document.querySelectorAll(".media-button");
const previewVideos = document.querySelectorAll(".media-button video");
const lightbox = document.querySelector("#lightbox");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxStage = document.querySelector("#lightbox-stage");
const closeButton = document.querySelector(".close-button");
const discordButtons = document.querySelectorAll(".copy-discord");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    cards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

previewVideos.forEach((video) => {
  video.addEventListener("mouseenter", () => video.play().catch(() => {}));
  video.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
});

mediaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { src, title, kind } = button.dataset;
    lightboxTitle.textContent = title;
    lightboxStage.replaceChildren(createPreviewElement(src, title, kind));
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeButton.focus();
  });
});

closeButton.addEventListener("click", closeLightbox);

discordButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = "Copied: scriptedzyko.";
      window.setTimeout(() => {
        button.textContent = originalText;
      }, 1600);
    } catch {
      button.textContent = "Discord: scriptedzyko.";
    }
  });
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

function createPreviewElement(src, title, kind) {
  if (kind === "video") {
    const video = document.createElement("video");
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    return video;
  }

  const image = document.createElement("img");
  image.src = src;
  image.alt = title;
  return image;
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxStage.replaceChildren();
}
