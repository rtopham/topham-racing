import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, Panel, Form, Col, Alert, Glyphicon} from 'react-bootstrap';

import DateInput from './dateInput.jsx';
import NumInput from './numInput.jsx';
import StringInput from './stringInput.jsx';
import Toast from './toast.jsx';
import ConfirmDeleteModal from './deleteConfirmModal.jsx';


export default class RaceEdit extends React.Component{
  constructor() {
    super();
    this.state = {
      race: {
        _id: '', series: '', race_name: '', race_date: '', category: '', time: '',
        rank: null, location: '',
      },
      invalidFields: {}, showingValidation: false, toastVisible: false, toastMessage: '', toastType: 'success', isConfirmOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.toggleConfirmDelete=this.toggleConfirmDelete.bind(this);
//    this.deleteRace=this.deleteRace.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadData();
    }
  }

onChange(event, convertedValue) {
    const race = Object.assign({}, this.state.race);
//    console.log(race);
    const value = (convertedValue !== undefined) ?
          convertedValue: event.target.value;
 //   console.log(convertedValue);
    race[event.target.name] = value;
 //   console.log(race);
    this.setState({ race });
  }
/*
  onChange(event,convertedValue){
  console.log('inside onChange');

  }
*/
  
  onValidityChange(event, valid){
    const invalidFields = Object.assign({},this.state.invalidFields);
    if (!valid){
      invalidFields[event.target.name] = true;
    } else{
      delete invalidFields[event.target.name];
    }
    this.setState({invalidFields});
    this.showValidation();
  }

  onDeleteClick() {
      this.setState({isConfirmOpen: true});

    }

/*
deleteRace(){
    
   
    fetch(`/api/races/${this.props.match.params.id}`, {
        method: 'DELETE',
            
        }).then(response=>{
            if(!response.ok) alert('Failed to delete race');
            else{ 
                this.showSuccess('Race deleted!');
  
                }
        });

}

*/

showValidation(){

    this.setState({showingValidation: true});
}

dismissValidation(){

    this.setState({showingValidation: false});
}

showSuccess(message){
    this.setState({toastVisible: true, toastMessage: message, toastType: 'success'});
}

showError(message){
    this.setState({toastVisible: true, toastMessage: message, toastType: 'danger'});
}

dismissToast(){
    this.setState({toastVisible: false});
    if (this.state.toastType=='success') this.props.history.push('/racing/races');
}

toggleConfirmDelete(){
    this.setState({
        isConfirmOpen: !this.state.isConfirmOpen
      });

}


  onSubmit(event) {
    event.preventDefault();
    this.showValidation();

    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }

 
    fetch(`/api/races/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.race),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedRace => {
        //  updatedRace.race_date = new Date(updatedRace.race_date);
          
          this.setState({ race: updatedRace });
          this.showSuccess('Updated race successfully.');
 //         this.props.history.push('/racing/races');
          
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to update race: ${error.message}`);
        });
      }
    }).catch(err => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }


  loadData() {
    fetch(`/api/races/${this.props.match.params.id}`).then(response => {
      if (response.ok) {
        response.json().then(race => {
   //     race.race_date = new Date(race.race_date).toDateString();
   //       race.race_date = race.race_date != null ? new Date(race.race_date) : null;
          race.rank = race.rank != null ? race.rank.toString() : '';
          
          
          this.setState({ race });
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to fetch issue: ${error.message}`);
        });
      }
    }).catch(err => {
      this.showError(`Error in fetching data from server: ${err.message}`);
    });
  }

  render() {
    const race = this.state.race;
    //race.race_date = new Date(race.race_date).toISOString().slice(0, 10);
 //   const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null: (<div className="error"> Please correct invalid fields before submitting.</div>);
    let validationMessage = null;
    if(Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation){
        validationMessage = (<Alert bsStyle="danger" onDismiss = {this.dismissValidation}>
        Please correct invalid fields before submitting.
        </Alert>
        );
    }
 
    return (
      <div>
      <ConfirmDeleteModal show={this.state.isConfirmOpen} race={this.state.race} onHide={this.toggleConfirmDelete} deleteRace={this.deleteRace}/>
      <h1></h1>
      <Panel header = "Edit Race">
        
          
          

          <Form horizontal onSubmit={this.onSubmit}>
          
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
          <FormControl componentClass="select" name="series" value={race.series} onChange={this.onChange}>
            <option value="Intermountain Cup">Intermountain Cup</option>
            <option value="Mid-Week">Mid-Week</option>
            <option value="Utah State Championship Series">USCS</option>
            <option value="USAC">USAC</option>
            <option value="N/A">N/A</option>
            
          </FormControl>
          </Col>
          </FormGroup>



          <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Race Name</Col>
              <Col sm={9}>
              <FormControl componentClass={StringInput} name="race_name" value={race.race_name} onChange={this.onChange} />
              </Col>
              </FormGroup>

         
         
         <FormGroup validationState={this.state.invalidFields.raceDate ? 'error' : null}>
              <Col componentClass={ControlLabel} sm={3}>Date</Col>
              <Col sm={9}>
              <FormControl
                componentClass={DateInput} name="race_date"
                value={race.race_date}
                onChange={this.onChange}
                onValidityChange={this.onValidityChange}
              />
              <FormControl.Feedback />
              </Col>
          </FormGroup>



          <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Category</Col>
              <Col sm={9}>
              <FormControl componentClass={StringInput} name="category" value={race.category} onChange={this.onChange} />
              </Col>
              </FormGroup>

                  
          <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Time</Col>
              <Col sm={9}>
          <FormControl componentClass={StringInput} name="time" value={race.time} onChange={this.onChange} />
          </Col>
          </FormGroup>


          <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Rank</Col>
              <Col sm={9}>
               <FormControl componentClass={NumInput} name="rank" value={race.rank} onChange={this.onChange} />
          </Col>
            </FormGroup>


          <FormGroup>
              <Col componentClass={ControlLabel} sm={3}>Location</Col>
              <Col sm={9}>
           <FormControl componentClass={StringInput} name="location" value={race.location} onChange={this.onChange} />
          </Col>
          </FormGroup>


          <FormGroup>
              <Col smOffset={3} sm={6}>
              <ButtonToolbar>
          <Button bsStyle="primary" type="submit">Submit</Button>
          <LinkContainer to= "/racing/races">
          <Button bsStyle="primary">Back to Races</Button>
          </LinkContainer>
          <Button className="pull-right" bsStyle="danger" onClick={this.onDeleteClick}><Glyphicon glyph="trash" /></Button>
          </ButtonToolbar>
          </Col>
          </FormGroup>
         




         <FormGroup>
             <Col smOffset={3} sm={9}>{validationMessage}</Col>
             </FormGroup>
        </Form>
 {/*       {validationMessage}*/}
        <Toast
            showing={this.state.toastVisible}
            message={this.state.toastMessage}
            onDismiss={this.dismissToast}
            bsStyle={this.state.toastType}
            />
      </Panel>
      
      </div>
    );
  }
}