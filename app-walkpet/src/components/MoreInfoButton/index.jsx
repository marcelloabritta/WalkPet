import '../MoreInfoButton/style.css'
import { Link } from 'react-router-dom';

const MoreInfo = () => {
    return (
        <div>
            <Link to="/Sobre">
                <button className='more-info-btn'>Clique para saber mais!</button>
            </Link>
        </div>
    )
}

export default MoreInfo
