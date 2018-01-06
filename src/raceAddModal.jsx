import React from 'react';
import {withRouter, BrowserHistory} from 'react-router-dom';
import {Navbar, Nav, NavItem, NavDropdown, Modal, MenuItem, Glyphicon, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Form, Col, Alert } from 'react-bootstrap';

import Toast from './toast.jsx';

class RaceAddModal extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
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
            
        }
        this.props.onHide();
    }  
    
    submit(e) {
        e.preventDefault();
        

        const form = document.forms.raceAdd;
        const newRace = {
    
            
                
                race_name: form.race_name.value,
                series: form.series.value,
                race_date: new Date(form.race_date.value).toISOString().slice(0, 10),// "new Date('"+form.race_date.value+"')",//form.race_date.value'2007-05-05')form.race_date.value,// new Date(form.race_date.value).toISOString(),
                location: form.location.value,
                time: form.time.value,
                rank: parseInt(form.rank.value),
                category: form.category.value,
                
        }
             
        fetch('/api/races', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRace),
        }).then(response => {
          
          if (response.ok) {
              response.json().then(updatedRace=>{
              this.showSuccess('Race Added');
  //            this.props.history.push(`/racing/races/${updatedRace._id}`);
              });  
        
          } else {
            response.json().then(error => {
              this.showError(`Failed to add race: ${error.message}`);
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
              <Modal.Title>Add Race</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form name="raceAdd">
                <FormGroup>
                  <ControlLabel>Series</ControlLabel>
                  <FormControl name="series" autoFocus />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Race Name</ControlLabel>
                  <FormControl name="race_name" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Date</ControlLabel>
                  <FormControl name="race_date" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Location</ControlLabel>
                  <FormControl name="location" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Category</ControlLabel>
                  <FormControl name="category" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Time</ControlLabel>
                  <FormControl name="time" />
                </FormGroup>              
                <FormGroup>
                  <ControlLabel>Rank</ControlLabel>
                  <FormControl name="rank" />
                </FormGroup>
    
              </Form>
              <Toast
          showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType}
        />
            </Modal.Body>
            <Modal.Footer>
              <ButtonToolbar>
                <Button type="button" bsStyle="primary" onClick={this.submit}>Submit</Button>
                <Button onClick={this.props.onHide} bsStyle="link">Cancel</Button>
              </ButtonToolbar>
            </Modal.Footer>
        
          </Modal>
        );
      }
    }

    export default withRouter(RaceAddModal);