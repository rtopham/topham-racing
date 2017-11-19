import React from 'react';
import { withRouter } from 'react-router-dom';
import { NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar } from 'react-bootstrap';

import Toast from './toast.jsx';


export class RaceAddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          helpme: false,
          
        };

        
        }

render(){
    return (
        <Modal show={this.props.showing} onHide={this.props.hide}>
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
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button type="button" bsStyle="primary" onClick={this.props.submit}>Submit</Button>
            <Button id="cancelModal" bsStyle="link">Cancel</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default class RaceAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false, toastMessage: '', toastType: 'success',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submit = this.submit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidUpdate(prevProps) {
   // if (prevProps.match.params.id !== this.props.match.params.id) {
  //    this.loadData();
  //  }
  console.log(this.state.showing);
  }


  toggleModal(e){
    
    this.setState({showing: !this.state.showing});
 //   console.log(this.state.showing);
  }

  handleClick(e){
    switch(e.target.id){
        case "addRace": this.setState({showing: true});break;
        case "cancelModal": this.setState({showing: false});break;

    }
 //   if(e.target.id=="addRace") this.setState({showing: true});
 //   if(e.target.id=="cancelModal") this.setState({showing: false});
    console.log('inside tryStuff');
    console.log(e.target.id);
    console.log(e.target.closeLabel);
    
  }

  handleClose(){

    this.setState({showing:false});
  }


  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  submit(e) {
    e.preventDefault();
    console.log('inside Submit');
    this.toggleModal();
    const form = document.forms.raceAdd;
    const newRace = {

        
            series: form.series.value,
            race_name: form.race_name.value,
            race_date: new Date(form.race_date.value).toISOString().slice(0, 10),
            location: form.location.value,
            category: form.category.value,
            time: form.time.value,
            rank: form.rank.value,
    }
          
    fetch('/api/races', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRace),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedRace => {
          this.props.router.push(`/races/${updatedRace._id}`);
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
    return (
      
      <NavItem onClick={this.handleClick}><span id="addRace"><Glyphicon id="addRace" glyph="plus"/>Add Race</span>
      <RaceAddModal showing={this.state.showing} submit={this.submit} hide={this.handleClose}/>
        <Toast
          showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType}
        />
        </NavItem>
        
      
    );
  }



}

//export default withRouter(IssueAddNavItem);