import { useNavigate, Link} from 'react-router-dom';

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




  


  function Header() {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    };
    const handleLogout = () => {
      localStorage.removeItem("Token");
      //alert("Tokens have been removed");
      navigate('/login')
    }

    return (
      <header>
        <div className="h-container">
          <Logo />

          <nav>
        <ul className="navbar">
          <li ><Link to="/home">Firma</Link></li>
          
          <li ><Link to="/historial">Historial </Link></li>
   
          
          <button className="btn" onClick={handleLogout}>Salir</button>
        </ul>
      </nav>
        </div>
      </header>
    );
  }
  

export default Header;