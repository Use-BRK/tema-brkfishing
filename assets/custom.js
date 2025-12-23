window.addEventListener("DOMContentLoaded", function () {
  console.log("Carregando script da página de politica de envio");

  // Lógica para abrir/fechar as seções
  function toggleAccordion(id) {
    const item = document.getElementById(id);
    const content = item.querySelector(".accordion-content");

    // Verifica se está aberto (altura > 0)
    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
      content.style.maxHeight = "0px"; // Fecha
    } else {
      closeAll(); // Fecha os outros (efeito sanfona única)
      content.style.maxHeight = content.scrollHeight + "px"; // Abre
    }
  }

  // Fecha todos os painéis
  function closeAll() {
    const contents = document.querySelectorAll(".accordion-content");
    contents.forEach((c) => (c.style.maxHeight = "0px"));
  }

  // Abre seção específica pelo menu
  function openSection(id) {
    closeAll();
    const item = document.getElementById(id);
    const content = item.querySelector(".accordion-content");

    content.style.maxHeight = content.scrollHeight + "px";
    item.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Inicialização: Abre o primeiro item (Correios) ao carregar
  window.onload = function () {
    const first = document.getElementById("correios");
    const content = first.querySelector(".accordion-content");
    content.style.maxHeight = content.scrollHeight + "px";
  };
});
