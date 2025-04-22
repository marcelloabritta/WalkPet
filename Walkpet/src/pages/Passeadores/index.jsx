import React from "react";
import "../Passeadores/style.css";
import Card from "../../components/Card";
import GetWalkers from "../../Hook/GetWalkers";
import { Link } from "react-router-dom";
import passeador1 from "../../assets/passeador1.png";
import passeador2 from "../../assets/passeador2.png";
import { useLocation } from "react-router-dom";

const Passeadores = () => {
  const location = useLocation();
  const walkers = GetWalkers();

  return (
    <div className="walkers-container">
      <div className="walkers-top">
        <h1>Passeadores</h1>

        <div className="search-walkers">

        </div>

      </div>

      <div className="walkers-bottom">

        <div className="walkers-left">
          <img src={passeador1} alt="" />
        </div>
        <div className="walkers-mid">
          {walkers.map((item) => (
            <Card key={item.username} walkers={item}></Card>
          ))}
        </div>
        <div className="walkers-right">
          <img src={passeador2} alt="" />
        </div>
      </div>

    </div>
  );
};

export default Passeadores;
