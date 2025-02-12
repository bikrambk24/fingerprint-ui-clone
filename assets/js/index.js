function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector(".hamburger");

  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-250px";
    hamburger.classList.remove("active");
  } else {
    sidebar.style.right = "0px";
    hamburger.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
      const header = document.querySelector(".site-header");
      if (window.scrollY > 50) {
          header.classList.add("scrolled");
      } else {
          header.classList.remove("scrolled");
      }
  });
});

// Chart
const ctx = document.getElementById("myChart").getContext("2d");
  const tooltip = document.querySelector(".custom-tooltip");

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({ length: 121 }, (_, i) => i),
      datasets: [
        {
          label: "Fingerprint",
          data: Array.from({ length: 121 }, (_, i) => 22 + Math.sin(i / 5) * 1.5),
          borderColor: "#FF5D22",
          backgroundColor: "#FF5D22",
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
          order: 1,
        },
        {
          label: "Competitors",
          data: Array.from({ length: 121 }, (_, i) => {
            if (i <= 40) return 15 + Math.sin(i / 4) * 0.5;
            return 15 - (i - 40) * 0.5;
          }),
          borderColor: "#907FDA",
          backgroundColor: "#907FDA",
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: false,
          external: function (context) {
            const tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltip.style.display = "none";
              return;
            }
            const { x, y } = tooltipModel;
            const days = tooltipModel.dataPoints[0]?.label;
            const fingerprint = tooltipModel.dataPoints[0]?.raw.toFixed(1);
            const competitors = tooltipModel.dataPoints[1]?.raw.toFixed(1);

            if (
              days !== undefined &&
              fingerprint !== undefined &&
              competitors !== undefined
            ) {
              tooltip.querySelector(".tooltip-days").textContent = `${days} days`;
              tooltip.querySelector(".fingerprint-value").textContent = `${fingerprint}%`;
              tooltip.querySelector(".competitor-value").textContent = `${competitors}%`;

              tooltip.style.left = `${x + 15}px`;
              tooltip.style.top = `${y}px`;
              tooltip.style.display = "block";
            }
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          autoSkip: false,
          ticks: {
            callback: function (value) {
              return [0, 30, 60, 90, 120].includes(value) ? value : "";
            },
            stepSize: 30,
            maxRotation: 0,
            minRotation: 0,
            color: "#c1c1be",
          },
          title: {
            display: true,
            text: ["ACCURACY DROPOFF                                                         DAYS AFTER INITIAL IDENTIFICATION"], // Two lines
            font: { size: 12 },
            padding: { top: 10 },
            color: "#c1c1be",
            align: "center",
          },
        },
        y: {
          grid: { display: false },
          title: {
            display: false,
          },
          ticks: { display: false },
        },
      },
      interaction: { intersect: false, mode: "index" },
    },
  });

// Magnifying glass
document.addEventListener("DOMContentLoaded", function () {
    const dotsContainer = document.querySelector(".dots-container");
    const greyDots = document.querySelector(".grey-dots");
    const magnifyingGlass = document.createElement("div");
    magnifyingGlass.classList.add("magnifying-glass");
  
    dotsContainer.appendChild(magnifyingGlass);
  
    dotsContainer.addEventListener("mousemove", function (e) {
      const rect = dotsContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      magnifyingGlass.style.left = `${x - magnifyingGlass.offsetWidth / 2}px`;
      magnifyingGlass.style.top = `${y - magnifyingGlass.offsetHeight / 2}px`;
      magnifyingGlass.style.display = "block";
  
      const scale = 2;
      const offsetX = (x * scale) - (magnifyingGlass.offsetWidth / 2);
      const offsetY = (y * scale) - (magnifyingGlass.offsetHeight / 2);

      magnifyingGlass.innerHTML = `
        <img src="${greyDots.src}" alt="dots" style="position: absolute; top: ${-offsetY}px; left: ${-offsetX}px; width: ${rect.width * scale}px; height: ${rect.height * scale}px;">
      `;
    });
  
    dotsContainer.addEventListener("mouseleave", function () {
      magnifyingGlass.style.display = "none";
    });

    dotsContainer.addEventListener("mouseenter", function () {
      dotsContainer.style.cursor = "none";
    });
  
    dotsContainer.addEventListener("mouseleave", function () {
      dotsContainer.style.cursor = "default";
    });
  });