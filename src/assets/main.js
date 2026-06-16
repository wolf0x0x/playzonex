(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const mobileButton = $("[data-menu]");
  const mobileNav = $("[data-mobile-nav]");
  if (mobileButton && mobileNav) {
    mobileButton.addEventListener("click", () => mobileNav.classList.toggle("open"));
  }

  const search = $("[data-search]");
  const suggestions = $("[data-suggestions]");
  if (search && suggestions && window.PlayZoneXSearch) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      if (!q) {
        suggestions.style.display = "none";
        suggestions.innerHTML = "";
        return;
      }
      const hits = window.PlayZoneXSearch.filter((item) =>
        `${item.title} ${item.tags}`.toLowerCase().includes(q)
      ).slice(0, 6);
      suggestions.innerHTML = hits.map((item) =>
        `<a href="${item.url}"><span>${item.title}</span><small>${item.tags}</small></a>`
      ).join("");
      suggestions.style.display = hits.length ? "block" : "none";
    });
  }

  $$("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      $$("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
      $$("[data-game-card]").forEach((card) => {
        card.style.display = category === "all" || card.dataset.category === category ? "" : "none";
      });
    });
  });

  const sort = $("[data-sort]");
  if (sort) {
    sort.addEventListener("change", () => {
      const grid = $("[data-game-grid]");
      const cards = $$("[data-game-card]");
      const sorted = cards.sort((a, b) => {
        if (sort.value === "rating") return Number(b.dataset.rating) - Number(a.dataset.rating);
        if (sort.value === "plays") return parseFloat(b.dataset.plays) - parseFloat(a.dataset.plays);
        return a.dataset.title.localeCompare(b.dataset.title);
      });
      sorted.forEach((card) => grid.appendChild(card));
    });
  }

  $$("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const code = button.dataset.copy;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "已复制";
        setTimeout(() => { button.textContent = "复制"; }, 1400);
      } catch {
        button.textContent = code;
      }
    });
  });

  const reveal = $("[data-reveal-wordle]");
  const answer = $("[data-wordle-answer]");
  if (reveal && answer) {
    reveal.addEventListener("click", () => {
      answer.hidden = false;
      reveal.hidden = true;
    });
  }

  const serverRefresh = $("[data-refresh-servers]");
  if (serverRefresh) {
    serverRefresh.addEventListener("click", () => {
      const stamp = $("[data-server-updated]");
      if (stamp) stamp.textContent = new Date().toLocaleString();
      serverRefresh.textContent = "已刷新";
      setTimeout(() => { serverRefresh.textContent = "刷新状态"; }, 1400);
    });
  }
})();
