document.addEventListener("DOMContentLoaded", function () {
  // Função para fechar todos os painéis
  function closeAllAccordions() {
    var contents = document.querySelectorAll(".accordion-content");
    contents.forEach(function (content) {
      content.style.maxHeight = "0px";
    });
  }

  // Função para abrir um painel específico
  function openAccordion(targetId) {
    var targetItem = document.getElementById(targetId);
    if (targetItem) {
      var content = targetItem.querySelector(".accordion-content");
      if (content) {
        closeAllAccordions(); // Efeito sanfona (fecha os outros)
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }
  }

  // 1. Configurar cliques nos Cabeçalhos (Accordion)
  var accButtons = document.querySelectorAll(".js-accordion-btn");
  accButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = this.getAttribute("data-target");
      var targetItem = document.getElementById(targetId);
      var content = targetItem.querySelector(".accordion-content");

      // Se já estiver aberto, fecha. Se fechado, abre.
      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
      } else {
        openAccordion(targetId);
      }
    });
  });

  // 2. Configurar cliques no Menu de Navegação (Scroll)
  var navButtons = document.querySelectorAll(".js-scroll-btn");
  navButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = this.getAttribute("data-target");
      openAccordion(targetId); // Abre a seção

      // Rola até a seção
      var element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // 3. Inicialização: Abre o primeiro item (Correios) automaticamente
  // Pequeno delay para garantir que o CSS carregou
  setTimeout(function () {
    openAccordion("correios");
  }, 100);
});
