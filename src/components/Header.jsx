import { useNavigate} from 'react-router-dom';

function Logo() {
    return (
      <div>
        <a href="#">
          <div className="logo-wrap">
            <div 
              id="logo" 
              className='logo' 
              alt="Brand logo"
              >
             
            </div>
          </div>
        </a> 
      </div>
    );
  }
  
  function Navbar() {
    const navigate = useNavigate();
    return (
      <nav>
        <ul className="navbar">
          <li><a href="/Home">Firma</a></li>
          <li><a href="/Multiple">Carga Multiple</a></li> 
          <li><a href="/Historial">Historial</a></li>
   
          
          <button className="btn">Log out</button>
        </ul>
      </nav>
    );
  }
  
  function Header() {
    return (
      <header>
        <div className="h-container">
          <Logo />
          <Navbar />
        </div>
      </header>
    );
  }
  

export default Header;