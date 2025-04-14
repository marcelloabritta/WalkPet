import blueDog from "../../assets/blue-dog.png";
import walkPetTransparent from "../../assets/walkpet_logo_transparent.png";
import MoreInfo from "../../components/MoreInfoButton";
import blueCat from "../../assets/blue-cat.png";
import "../Home/style.css";
import ContactBtn from "../../components/ContactButton";
import PrecisoPasseador from "../../components/PrecisoPasseadorButton";
import SouPasseador from "../../components/SouPasseadorButton";
import whiteCat from "../../assets/white-cat.png";
import blueWhiteCat from "../../assets/blue-white-cat.png";
import SearchWalkers from "../../components/searchWalkers";

const Home = () => {
  return (
    <div className="main-container">
      <div className="top-container">
        <div className="left">
          <h2>
            Procurando por um <br /> <span>passeador na sua área?</span>
          </h2>
          <img src={blueDog} alt="cachorro" />
        </div>
        <div className="mid">
          <img src={walkPetTransparent} alt="walkpet logo" />
        </div>
        <div className="right">
          <h3>Você encontra aqui!</h3>
          <MoreInfo />
          <img src={blueCat} alt="gato" />
        </div>
      </div>
      <hr />
      <div className="bottom-container">
        <div className="left">
          <img src={whiteCat} alt="" />
          <PrecisoPasseador />
        </div>
        <div className="mid">
          <SearchWalkers className={"input-wrapper"} />
          <SouPasseador />
        </div>
        <div className="right">
          <img src={blueWhiteCat} alt="gato" />
          <ContactBtn />
        </div>
      </div>
    </div>
  );
};

export default Home;
