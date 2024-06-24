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
    //const navigate = useNavigate();
    const navigate = useNavigate();
    return (
      <nav>
        <ul className="navbar">
          <li><a href="/Home">Firma</a></li>
          
          <li><a href="/Historial">Historial</a></li>
   
          
          <button className="btn" onClick={handleLogout}>Salir</button>
        </ul>
      </nav>
    );
  }

  
  const handleLogout = () => {
   // const navigate = useNavigate();
    localStorage.removeItem("Token");
    alert("Tokens have been removed");
    navigate('/login')
  };

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