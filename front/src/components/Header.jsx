export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand">Giftoria</a>
        <nav className="main-nav">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
