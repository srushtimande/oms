import './App.css';
import Navbar from './navbarComponent/navbar';
import Footer from './footerComponent/footer';
import CreateAdmin from './createAdminComponent/createAdmin';
import Login from './loginComponent/login';
import AdminLogin from './adminLoginComponent/adminLogin';
import Register from './registerComponent/register';
import ViewSongs from './songsComponent/viewSongs';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from './homeComponent/home';
import AudioPlayer from './audioPlayerComponent/audioPlayer';
import NotFound from './NotFoundComponent/NotFound';
import ViewPlaylists from './playlistComponent/viewPlaylist';
import AdminDashboard from './adminDashboardComponent/dashboard';
import ViewProfile from './profileComponent/viewProfile';
import EditProfile from './profileComponent/editProfile';
import ViewSongsFromPlaylist from './playlistComponent/viewSongs';
import AddSong from './adminDashboardComponent/addSong';
import ViewUsers from './adminDashboardComponent/viewUsers';
import DeleteSongs from './adminDashboardComponent/deleteSong';
import GuardedRoute from './guardedRouteCompoenet/guardedRoute';
import GuardedRouteAdmin from './guardedRouteCompoenet/guardedRouteForAdmin';
import GuardedRouteAdminLogged from './guardedRouteCompoenet/guardedRouteForAdmin';
import GuardedRouteLogged from './guardedRouteCompoenet/guardedRoute';
import CreateMusicPlaylist from './playlistComponent/createPlaylist';

const isAutheticated = false;
function App() {
  return (
    <div className="App">
      <div className="header">
        <Navbar/>
      </div>
      <Router>
        <div className="content">
          <Switch>

{/* ------------------------------------------- Unguarded Paths ----------------------------------------------------------------- */} 
            <Route path="/notfound">
              <NotFound/>
            </Route>
            
            <Route path="/home">
              <Home/>
            </Route>
            
            <Route path="/playlist">
              <ViewPlaylists/>
            </Route>
            
            <Route path="/viewSongs">
              <ViewSongs/>
            </Route>
            
            
            <Route path="/register">
              <Register/>
            </Route>
            
            
            <Route path="/viewSongsFromPlaylist">
              <ViewSongsFromPlaylist/>
            </Route>
            
            
{/* ------------------------------------------------ Guarded Paths --------------------------------------------------------------- */}

            <GuardedRoute path="/player" component={AudioPlayer} auth={sessionStorage.getItem("id")? true:false} />

            <GuardedRoute path="/createPlaylist" component={CreateMusicPlaylist} auth={sessionStorage.getItem("id")? true:false} />
            
            <GuardedRouteLogged path="/login" component={Login} auth ={sessionStorage.getItem("id")? false:true}/>
               
            <GuardedRoute path="/profile" component={ViewProfile} auth={sessionStorage.getItem("id")? true:false} />
            
            <GuardedRouteAdmin path="/adminDashboard" component={AdminDashboard} auth={sessionStorage.getItem("Admin_data")? true:false} />
            
            <GuardedRoute path="/editProfile" component={EditProfile} auth={sessionStorage.getItem("id")? true:false} />
            
            <GuardedRouteAdmin path="/adminAddSong" component={AddSong} auth={sessionStorage.getItem("Admin_data")? true:false} />
            
            <GuardedRouteAdminLogged path="/adminLogin" component={AdminLogin} auth={sessionStorage.getItem("Admin_data")? false:true} />
           
            <GuardedRouteAdmin path="/adminDeleteSong" component={DeleteSongs} auth={sessionStorage.getItem("Admin_data")? true:false} />
           
            <GuardedRouteAdmin path="/adminViewUsers" component={ViewUsers} auth={sessionStorage.getItem("Admin_data")? true:false} />
           
            <Route path="/">
              <Home/>
            </Route>

          </Switch>
        </div>
      </Router>
        <Footer/>
    </div>
  );
}

export default App;
