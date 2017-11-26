import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';
import {Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import {withRouter, BrowserHistory} from 'react-router-dom';


import RaceFilterLinks from './raceFilterLinks.jsx';
import RaceFilterForm from './raceFilterForm.jsx';

function RaceRow(props) {    
  
  const race = props.race;
  if(props.editCol){
  return (
    <tr>

      <td className="centerthis"><LinkContainer to= {`/racing/races/${race._id}`}>
      <Button bsSize="xsmall" bsStyle="default"><span id="editRace"><Glyphicon glyph="pencil"/></span></Button>
      </LinkContainer></td>
      <td>{race.series}</td>
      <td>{race.race_name}</td>
      <td className="centerthis">{race.race_date}</td>
      <td className="centerthis">{race.category}</td>
      <td className="centerthis">{race.time}</td>
      <td className="centerthis">{race.rank}</td>
    </tr>
  );
}else

return (
    <tr>

      <td>{race.series}</td>
      <td><a href="#" onClick={props.strava} data-race-name={race.race_name} data-race-date={race.race_date}>{race.race_name}</a></td>
      <td className="centerthis">{race.race_date}</td>
      <td className="centerthis">{race.category}</td>
      <td className="centerthis">{race.time}</td>
      <td className="centerthis">{race.rank}</td>
    </tr>
  );

}

function RaceTable(props) {

    const raceRows = props.races.map(race => (
      <RaceRow strava={props.strava} editCol={props.editCol} key={race._id} race={race} />
    ));
   
  if (props.editCol){
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>Series</th>
            <th>Name</th>
            <th className="centerthis">Date</th>
            <th className="centerthis">Category</th>
            <th className="centerthis">Time</th>
            <th className="centerthis">Rank</th>
          </tr>
        </thead>
        <tbody>{raceRows}</tbody>
      </Table>
    );
}else
    return(
        <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            
            <th>Series</th>
            <th>Name</th>
            <th className="centerthis">Date</th>
            <th className="centerthis">Category</th>
            <th className="centerthis">Time</th>
            <th className="centerthis">Rank</th>
          </tr>
        </thead>
        <tbody>{raceRows}</tbody>
      </Table>
    );
    

  }

function LastRace(props){

return(
<div>
<h3>Last Race</h3>
<RaceTable strava={props.strava} editCol={false} races={props.races} />
</div>
);
}

export default class RaceListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { races: [] , 
                   lastRace: [],
                   
                ytdStats:{
                   totalRaces:0,
                   totalTime:"",
                   icupRaces:0,
                   midweekRaces:0,
                   otherRaces:0,
                   wins:0,
                   podiums:0,
                   dnfs:0,
                },
                allTimeStats:{
                    totalRaces:0,
                    totalTime:"",
                    icupRaces:0,
                    midweekRaces:0,
                    otherRaces:0,
                    wins:0,
                    podiums:0,
                    dnfs:0,
                 },
                 
                                  
                
    };


    this.setFilter = this.setFilter.bind(this);
    this.getStravaData = this.getStravaData.bind(this);
    
  }

  componentDidMount() {

  this.loadData();
}
  
  componentDidUpdate(prevProps){
    

    const oldQuery = prevProps.location.search;
    const newQuery = this.props.location.search;
    if(oldQuery === newQuery) {
      return;
    }
    this.loadData();
  }
  
  setFilter(query){
    this.props.history.push({pathname: this.props.location.pathname, search: query});
    
  }

  getStravaData(e){
    
     e.preventDefault();
     let theDate = new  Date(e.currentTarget.dataset.raceDate);
     let theEpoch = theDate.getTime()/1000.0;
     fetch(`/api/strava/activities/${theEpoch}`, {
      headers: { 
     'Content-Type': 'application/json',
     'Accept': 'application/json'
 }
      }).then(response => {
     if (response.ok) {

       response.json().then(raceID => {


//      console.log(data);
window.open(`https://www.strava.com/activities/${raceID}`);  
        

       });
     } else {
       response.json().then(error => {
         //alert("Failed to fetch race ID:" +error.message);
       });
     }
   })
   .catch(err => {
     //alert("Error in fetching data from server:", err);
   });
   
     } 

  loadData() {

    var totaltime=0;
//    console.log(this.props.location);
    fetch(`/api/races${this.props.location.search}`, {
         headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
         }).then(response => {
        if (response.ok) {

          response.json().then(data => {

            data.records.forEach(race => {

              race.race_date = new Date(race.race_date).toISOString().slice(0, 10);
              

            });

            this.setState({ races: data.records });


            let temp=[];
            temp.push(data.records[0]);
            this.setState({lastRace: temp});
         

          });
        } else {
          response.json().then(error => {
            //alert("Failed to fetch issues:" +error.message);
          });
        }
      })
      .catch(err => {
        //alert("Error in fetching data from server:", err);
      });
  }

  render() {


    return (
      <div>
        <LastRace strava={this.getStravaData} races={this.state.lastRace} /> 
        <hr/>
        <h3>Race History</h3>
        <Panel collapsible header="Search Races">
        <RaceFilterForm setFilter={this.setFilter} initFilter={this.props.location.search} />
        </Panel>
        <RaceFilterLinks setFilter={this.setFilter} />
        <hr/>
        <RaceTable strava={this.getStravaData} editCol={this.props.loggedIn} races={this.state.races} />

      </div>
    );
  }
}

//export default withRouter(RaceListApp);