import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link,
  browserHistory,
  withRouter,
} from 'react-router-dom'

import {Navbar, Nav, NavItem, NavDropdown, Modal, MenuItem, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import RaceListApp from './raceList.jsx';
import RaceStats from './raceStats.jsx';
import RaceStrava from './raceStrava.jsx';
import RaceEdit from './raceEdit.jsx';
import RaceAddModal from './raceAddModal.jsx';
import LoginModal from './loginModal.jsx';
import Banner from './banner.jsx';

const contentNode = document.getElementById("main");
const NoMatch = () => <p>Page Not Found</p>;



function Header(props) {
  let addRaceButton;
  let loginMenuItem;
  let loggedin=props.loggedIn;
  if(loggedin) addRaceButton = (<NavItem onClick={props.toggleRaceAddModal}><span id="addRace">Welcome {props.user.user_name} | <Glyphicon id="addRace" glyph="plus"/>Add Race</span></NavItem>);else addRaceButton = "";
  if(loggedin) loginMenuItem = (<MenuItem onClick={props.logMeOut}>Logout</MenuItem>); else loginMenuItem =(<MenuItem onClick={props.toggleLoginModal} >Login</MenuItem>);
  return(
  <div>
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>Topham Racing</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/">
        <NavItem>Races</NavItem>
      </LinkContainer>
      <LinkContainer to="/racing/stats">
        <NavItem>Stats</NavItem>
      </LinkContainer>
      <LinkContainer to="/racing/strava">
        <NavItem>Strava</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
    
    {addRaceButton}
            
      <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
        {loginMenuItem}
      </NavDropdown>
    </Nav>
  </Navbar>
  <Banner />
  </div>
  );
}

const Footer = (props)=>{
return(
  <div>
    <hr/>
    <h6 className="centerthis">Race a bike. Improve your life</h6>
    <hr/>
    </div>
)

}



class RoutedApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false,
                   isLoginModalOpen: false,
                   user: {loggedIn: false, user_name: ""}
    };

   this.toggleModal=this.toggleModal.bind(this);
   this.toggleLoginModal=this.toggleLoginModal.bind(this);
   this.logMeOut=this.logMeOut.bind(this);
   this.logMeIn=this.logMeIn.bind(this);

    }

 toggleModal(){
      this.setState({
        isOpen: !this.state.isOpen
      });
  }

  
 toggleLoginModal(){
    this.setState({
      isLoginModalOpen: !this.state.isLoginModalOpen
    });
}

logMeIn(loggedInUser){
  //console.log('Inside LogMeIN');
this.setState({user:loggedInUser});
}

logMeOut(){
  fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }).then(response => {
    
    if (response.ok) {
        response.json().then(updatedLogin=>{
       alert('Logged Out');
       let newUser= {loggedIn: false, user_name: ""}
       this.setState({user: newUser});

//        this.setState({userName:updatedLogin.user_name, loggedIn: updatedLogin.loggedIn});
//        console.log(updatedLogin);
        });  
  
    } else {
      response.json().then(error => {
        this.showError(`Unable to Log Out: ${error.message}`);
      });
    }
  }).catch(err => {
    this.showError(`Error in sending data to server: ${err.message}`);
  });


}



  render() {
    return(
  <div className = "container-fluid appframe">
 
  <BrowserRouter history={browserHistory}>
  <div>
    <Header loggedIn={this.state.user.loggedIn} user={this.state.user} toggleLoginModal={this.toggleLoginModal} toggleRaceAddModal = {this.toggleModal} logMeOut={this.logMeOut} />
    <RaceAddModal show={this.state.isOpen} onHide={this.toggleModal}/>
    <LoginModal logMeIn={this.logMeIn} show={this.state.isLoginModalOpen} onHide={this.toggleLoginModal}/>
    
    <Switch>
  
        
 { /*  <Route exact path="/races" loggedIn={"Hey there partner"} component={RaceListApp} />*/}
 <Route exact path="/racing/races" render={props => <RaceListApp loggedIn={this.state.user.loggedIn} {...props} />} />

    <Route exact path="/racing/stats" component={RaceStats} />
    <Route exact path="/racing/strava" component={RaceStrava} />
    <Route path="/racing/races/:id" component={RaceEdit} /> 
    <Redirect exact from="/racing" to="/racing/races" />
    <Redirect exact from="/" to="/racing/races" />

    <Route path="*" component={NoMatch} />
   </Switch>
   <Footer user={this.state.user} />
   </div>
  </BrowserRouter>
    </div>
    );
}
}

//ReactDOM.render(<RaceListApp />, contentNode);

ReactDOM.render(<RoutedApp/>, contentNode);
