import React from 'react';
import {withRouter, BrowserHistory} from 'react-router-dom';
import {Modal, Form, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Col, Alert, Glyphicon} from 'react-bootstrap';

import Toast from './toast.jsx';

class ConfirmDeleteModal extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
        toastVisible: false, toastMessage: '', toastType: 'success',
        };
        
        
        
//        this.submit = this.submit.bind(this);
        this.showError = this.showError.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.dismissToast = this.dismissToast.bind(this);
        this.deleteRace = this.deleteRace.bind(this);
      }

    showSuccess(message){

        this.setState({toastVisible: true, toastMessage: message, toastType: 'success'});
    }

    showError(message) {
        this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
      }
    
    dismissToast(){
 
        this.setState({toastVisible: false});
        
        if (this.state.toastType=='success') {
            var query='refresh';
            this.props.history.push({pathname: this.props.location.pathname, search: query});
            this.props.history.push('/races');
            
        }
        //this.props.onHide();
    }  

    deleteRace(){
         
      fetch(`/api/races/${this.props.race._id}`, {
          method: 'DELETE',
              
          }).then(response=>{
              if(response.ok){
    
                 this.showSuccess('Race deleted!');
              }
              
              else{ 
                response.json().then(error => {
                this.showError(`Failed to update race: ${error.message}`);
                
                  
                });
              }
          }).catch(err => {
             this.showError(`Error in sending data to server: ${err.message}`);
          });
      
    }
  /*  
    submit(e) {
        e.preventDefault();
 
        



        
      }
*/


    
      render() {
        // Render nothing if the "show" prop is false
        const race=this.props.race;
        if(!this.props.show) {
          return null;
        }
        return (
          <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Delete This Race?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal name="deleteRace">
                <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>ID</Col>
                <Col sm={9}>
                <FormControl.Static> 
                {race._id}
                </FormControl.Static>
                </Col>
                </FormGroup>

                <FormGroup>
                <Col componentClass={ControlLabel} sm={3}>Series</Col>
                <Col sm={9}>
                <FormControl.Static>
                  {race.series}
                </FormControl.Static>
                 </Col>
                </FormGroup>

              <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Race</Col>
              <Col sm={9}>
              <FormControl.Static> 
              {race.race_name}
              </FormControl.Static>
              </Col>
              </FormGroup>

              <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Date</Col>
              <Col sm={9}>
              <FormControl.Static> 
              {race.race_date}
              </FormControl.Static>
              </Col>
              </FormGroup>

              <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Category</Col>
              <Col sm={9}>
              <FormControl.Static> 
              {race.category}
              </FormControl.Static>
              </Col>
              </FormGroup>

              <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Time</Col>
              <Col sm={9}>
              <FormControl.Static> 
              {race.time}
              </FormControl.Static>
              </Col>
              </FormGroup>

              <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Rank</Col>
              <Col sm={9}>
              <FormControl.Static> 
              {race.rank}
              </FormControl.Static>
              </Col>
              </FormGroup>
   
              <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Location</Col>
              <Col sm={9}>
              <FormControl.Static> 
              {race.location}
              </FormControl.Static>
              </Col>
              </FormGroup>

              </Form>
        
            </Modal.Body>
            <Modal.Footer>
              <ButtonToolbar>
                <Button type="button" bsStyle="primary" onClick={this.deleteRace}>Delete</Button>
                <Button onClick={this.props.onHide} bsStyle="link">Cancel</Button>
              </ButtonToolbar>
            </Modal.Footer>
            <Toast
            showing={this.state.toastVisible}
            message={this.state.toastMessage}
            onDismiss={this.dismissToast}
            bsStyle={this.state.toastType}
            />
          </Modal>
        );
      }
    }

export default withRouter(ConfirmDeleteModal);