import { useState,useContext } from 'react'
import { Route,Link,Routes } from 'react-router-dom'
import { Auth } from './Global Variable/Auth'
import { createContext } from 'react'
import profilePic from './assets/Picture.png';
import icon1 from './assets/facebook.png'; 
import icon2 from './assets/tiktok.png'; 
import icon3 from './assets/instagram.png'; 
import './App.css'


function HomePage(){ 
const {user} = useContext(Auth);
  return(
    <div className='homepage'>
      {user.isAuth ?  
      <div className='homeInfo'>
          <img src={profilePic} alt="" className='profilePic'/>
                <div>
                    <h1>Hello {user.name}, My Name is Jessel Glenn V. Icatar</h1>
                          <p>I want to be a Front-End Developers or a Software Engineer. I am a hardworking and motivated Computer Science student with
                          a passion for technology, programming, and web development. I
                          enjoy learning new skills, solving problems, and working on digital
                          projects that help improve my creativity and technical abilities. I am
                          adaptable, willing to learn, and capable of working both
                          independently and as part of a team.</p>

                          <div className='icon-area'> 
                            <a href="https://www.facebook.com" target='blank'><img src={icon1} alt=""  className='icon'/></a>
                            <a href="https://www.tiktok.com/@guren_senpai" target='blank'><img src={icon2} alt="" className='icon'/></a>
                            <a href="https://www.instagram.com/michi_senpai/" target='blank'><img src={icon3} alt="" className='icon'/></a>
                           
                          </div>
                           <p>My Socials</p>
                 </div>
      </div> 
      
      : <div>
        <h1>You are not Logged in, Please Login</h1>
        <Link to={'/login'} className='link'>Login</Link> 
        </div>}
    
    </div>
  )
}

function AboutPage(){ 
  return(
    <div>
      <h1>This is the About Page</h1>
    </div>
  )
}


function SkillsPage(){ 
  return(
    <div><h1>This is the Skill Page</h1></div>
  )
}


function LoginPage(){ 
  const [name, setName] = useState(""); 
  const {user, login} = useContext(Auth);
 

  
    function handleSubmit(e){ 
      e.preventDefault(); 
      if(name.trim()){ 
        login(name);
          alert(`Name: ${name}`);
      }
    }

  
  return(
    
    <div>
      <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input type="text" 
          placeholder='Enter Username' 
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>Submit</button>
      </form>
        {user.isAuth && <p>User is Logged in</p>}
    </div>
  )
}






function App() {
  const [user, setUser] = useState({name: "", isAuth: false}); 

  function login(name){ 
    setUser({name: name, isAuth: true});
  }

  function logOut(){ 
    setUser({name: "", isAuth: false});
  }



  return (
    <>
   
     <Auth.Provider value={{user, login, logOut}}>
      <div className='nav-bar'>
      <nav>
        <div className='nav-btn'>

          <Link to={'/'} className='link'>Home</Link>
          <Link to={'/about'} className='link'>About</Link>
          <Link to={'/skill'}className='link'>Skills</Link>   
          <div>
             {!user.isAuth ? <Link to={'/login'} className='link'>Login</Link> : <button onClick={logOut}>Log Out</button>} 
          </div>
          
        </div>

        

      </nav>

      </div>
    

    
    
        <Routes> 
        <Route path='/' element={<HomePage/>}/> 
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/skill' element={<SkillsPage/>} /> 
        <Route path='/login' element={<LoginPage/> } />
      </Routes>

    </Auth.Provider>
    
  
    
      

    </>
  )
}

export default App
