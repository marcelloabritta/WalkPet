import PrecisoPasseador from "../../components/PrecisoPasseadorButton";
import SouPasseador from "../../components/SouPasseadorButton";
import TimeBtn from "../../components/TimeBtn";
import "../Home/style.css";
import pet from '../../assets/pet.png'
import walkPetTransparent from "../../assets/walkpet_logo_transparent.png";
import walkersMap from '../../assets/walkers-map.png'
import HomeCards from "../../components/HomeCards";
import { useLocation } from "react-router-dom";
import GetWalkers from "../../Hook/GetWalkers";
import { Link } from 'react-router-dom';
import SearchAddress from "../../components/searchAddress";



const Home = () => {


  const location = useLocation();
  const walkers = GetWalkers();

  const walkersComAvaliacoes = walkers.map(walker => {
    const avaliacoesDoWalker = walker.avaliacoes || [];  // Supondo que as avaliações já venham com o walker

    const totalAvaliacoes = avaliacoesDoWalker.length;
    const totalEstrelas = avaliacoesDoWalker.reduce(
      (acc, curr) => acc + (curr.estrelas || 0),
      0
    );
    const averageStars = totalAvaliacoes > 0 ? totalEstrelas / totalAvaliacoes : 0;

    return {
      ...walker,
      avaliacoes: avaliacoesDoWalker,
      averageStars, // Média das estrelas calculada
    };
  });

  const melhoresPasseadores = walkersComAvaliacoes
    .sort((a, b) => b.averageStars - a.averageStars)
    .slice(0, 2);


  return (
    <div className="home-container">

      <div className="home-left">
        <div className="top">
          <div className="top-txt">
            <h1>Encontre o passeador <br />
              Ideal para seu pet</h1>
          </div>
          <div className="top-btn">
            <PrecisoPasseador />
            <SouPasseador />

          </div>

        </div>
        <div className="home-search-walkers">
          <SearchAddress />
          <div className="search-walkers">

          <TimeBtn className="time-wrapper"/>

          <div className="tipo-animal-select">
            <img src={pet} alt="" />
            <select name="Tipo de animal" defaultValue="">
              <option value="" disabled selected>Tipo de animal</option>
              <option value="gato">Gato</option>
              <option value="cachorro">Cachorro</option>
            </select>
          </div>

            <Link to={`/passeadores`}>
            <button className="search-btn">Buscar</button>
            </Link>
          </div>
          <div className="best-walkers"></div>
          <h3>Passeadores em destaque!</h3>
          <div className="home-walkers">
            {melhoresPasseadores.map((item) => (
              <HomeCards key={item.username} walkers={item} className="home-cards"> </HomeCards>
            ))}
          </div>
          <Link to={`/passeadores`}>
            <button className="btn-walker">Ver mais</button>
          </Link>
        </div>
      </div>

      <div className="home-right">
        <img src={walkPetTransparent} alt="" />
        <img src={walkersMap} alt="" />
      </div>
    </div>
  );
};

export default Home;
