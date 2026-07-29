function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">C</div>

        <div>
          <h1>CollabBoard</h1>
          <p>Share ideas. Build together.</p>
        </div>
      </div>

      <div className="live-status">
        <span className="live-dot"></span>
        Live Board
      </div>
    </header>
  );
}

export default Header;