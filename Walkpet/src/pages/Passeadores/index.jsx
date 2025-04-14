import React from "react";
import "../Passeadores/style.css";
import Card from "../../components/Card";
import GetWalkers from "../../Hook/GetWalkers";
import { Link } from "react-router-dom";
import walkPetTransparent from "../../assets/walkpet_logo_transparent.png";
import { useLocation } from "react-router-dom";

const Passeadores = () => {
  const location = useLocation();
  const walkers = GetWalkers(); 

  return (
    <div className="walkers-container">
      <div className="walkers-top">
        <div className="breadcrumb">
          <Link className="breadcrumb-text" to="/">
            <h3>Home</h3>
          </Link>
          <Link className="breadcrumb-text" to="/passeadores">
            <span>
              <span>&gt;</span> Passeadores
            </span>
          </Link>
        </div>
        <img src={walkPetTransparent} alt="WalkPet" />
      </div>
      <div className="walkers-bottom">
        {walkers.map((item) => (
          <Card key={item.username} walkers={item}></Card>
        ))}
      </div>
    </div>
  );
};

export default Passeadores;
