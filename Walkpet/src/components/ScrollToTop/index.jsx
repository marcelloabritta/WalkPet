import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Isso vai rolar a página para o topo
  }, [pathname]);

  return null; // Não renderiza nada, apenas executa o efeito
};

export default ScrollToTop;