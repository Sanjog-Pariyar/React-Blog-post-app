import { useStoreState } from "easy-peasy";

function Footer() {

    const postCount = useStoreState((state) => state.postCount);

    return(
        <footer>
            <section className="footer-section">
                <p>{postCount} Blog Posts</p>
            </section>
        </footer>
    )
}

export default Footer;