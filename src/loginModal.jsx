import React from 'react';
import {withRouter, BrowserHistory} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, Modal, MenuItem, Glyphicon, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Form, Col, Alert } from 'react-bootstrap';

import Toast from './toast.jsx';

class LoginModal extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
        userName: "", loggedIn: false,

        toastVisible: false, toastMessage: '', toastType: 'success',
        };
        
        
        
        this.submit = this.submit.bind(this);
        this.showError = this.showError.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
      }

    showSuccess(message){
      
        this.setState({toastVisible: true, toastMessage: message, toastType: 'success'});
    }

    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
      }
    
    dismissToast(){
 //       var history={BrowserHistory};
        this.setState({toastVisible: false});
        
        if (this.state.toastType=='success') {
            var query='refresh';
            this.props.history.push({pathname: this.props.location.pathname, search: query});
            this.props.history.push('/racing/races');
            this.props.onHide();
        }
        
    }  
    
    submit(e) {
       // e.preventDefault();
       // console.log('getting to submit');

        const form = document.forms.login;
        const userLogin = {
               
                user_name: form.user_name.value,
                user_password: form.user_password.value,
                
        }
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userLogin),
          }).then(response => {
            
            if (response.ok) {
                response.json().then(updatedLogin=>{
               

                //console.log(updatedLogin);
                if(!updatedLogin.loggedIn) this.showError('Invalid Username or Password');
                else{
                this.showSuccess('Logging In');
//                    console.log(updatedLogin);
                }
                this.props.logMeIn({user_name:updatedLogin.user_name, loggedIn: updatedLogin.loggedIn});
 //               console.log(this.state);
                });  
          
            } else {
              response.json().then(error => {
                this.showError(`Invalid Username or Password: ${error.message}`);
              });
            }
          }).catch(err => {
            this.showError(`Error in sending data to server: ${err.message}`);
          });


    }
             



    
      render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
          return null;
        }
        return (
          <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form name="login">
                <FormGroup>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl name="user_name" autoFocus />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" name="user_password" />
                </FormGroup>
    
              </Form>
              <Toast
          showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType}
        />
            </Modal.Body>
            <Modal.Footer>
              <ButtonToolbar>
                <Button type="submit" bsStyle="primary" onClick={this.submit}>Login</Button>
                <Button onClick={this.props.onHide} bsStyle="link">Cancel</Button>
              </ButtonToolbar>
            </Modal.Footer>
        
          </Modal>
        );
      }
    }

    export default withRouter(LoginModal);