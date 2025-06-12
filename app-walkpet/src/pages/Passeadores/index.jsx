import React, { useEffect, useState } from "react";
import "../Passeadores/style.css";
import Card from "../../components/Card";
import GetWalkers from "../../Hook/GetWalkers";
import { Link } from "react-router-dom";
import passeador1 from "../../assets/passeador1.png";
import passeador2 from "../../assets/passeador2.png";
import { useLocation } from "react-router-dom";

const Passeadores = () => {
  const location = useLocation();
  const [walkers, setWalkers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWalkers = async () => {
      setLoading(true);
      try {
        const fetchedWalkers = await GetWalkers();
        // Os dados já vêm com mediaEstrelas e totalAvaliacoes calculados pelo backend
        setWalkers(Array.isArray(fetchedWalkers) ? fetchedWalkers : (fetchedWalkers.$values || []));
      } catch (error) {
        console.error("Erro ao carregar passeadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalkers();
  }, []);

  return (
    <div className="walkers-container">
      <div className="walkers-top">
        <h1>Passeadores</h1>
        <div className="search-walkers">
          {/* Campo de busca aqui */}
        </div>
      </div>

      <div className="walkers-bottom">
        <div className="walkers-left">
          <img src={passeador1} alt="" />
        </div>
        <div className="walkers-mid">
          {loading ? (
            <p>Carregando passeadores...</p>
          ) : (
            walkers.map((walker) => (
              <Card key={walker.username} walkers={walker} />
            ))
          )}
        </div>
        <div className="walkers-right">
          <img src={passeador2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Passeadores;