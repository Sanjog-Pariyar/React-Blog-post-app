import { Link } from "react-router-dom";


function Header({ title }) {
    return(
        <header>
            <p><Link to='/'>{ title }</Link></p>
        </header>
        
    )
}
export default Header;