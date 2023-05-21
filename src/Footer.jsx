function Footer() {
    const today = new Date()
    return(
        <footer>
            <section className="footer-section">
                <p>Copyright &copy; {today.getFullYear()}</p>
            </section>
        </footer>
    )
}

export default Footer;