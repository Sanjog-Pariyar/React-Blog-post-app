import { Link } from "react-router-dom";

function Missing() {
    return(
        <>
            <h2>Page not found</h2>
            <p><Link to={'/'}>Go to homepage</Link></p>
        </>
        
    )
}

export default Missing;