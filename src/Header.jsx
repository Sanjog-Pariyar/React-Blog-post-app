import { Link } from "react-router-dom";
import { BsPhone } from "react-icons/bs";
import { FaTabletAlt, FaLaptop } from "react-icons/fa";
import useWindowSize from "./hooks/useWindowSize";

function Header({ title }) {

    const { width } = useWindowSize();

    return(
        <header>
            <Link to={'/'}>
                <p>{ title }</p>
            </Link>

            {width < 768 ? <h2><BsPhone /></h2> 
                : width < 992 ? <h2><FaTabletAlt /></h2> 
                    : <h2><FaLaptop /></h2>}
            
        </header>
        
    )
}
export default Header;