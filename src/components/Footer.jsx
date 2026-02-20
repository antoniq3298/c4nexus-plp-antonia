export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#" onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Contact Us</a>
      </div>
    </footer>
  );
}