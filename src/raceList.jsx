import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';
import {Button, Glyphicon, Table, Panel } from 'react-bootstrap';
import {withRouter, BrowserHistory} from 'react-router-dom';


import RaceAdd from './raceAdd.jsx';
import RaceFilterLinks from './raceFilterLinks.jsx';
import RaceFilterForm from './raceFilterForm.jsx';

function RaceRow(props) {
  
 // const borderedstyle = { border: "1px solid silver", padding: 4 };
  const race = props.race;
  if(props.editCol){
  return (
    <tr>
 {/*     <td><Link to={`/races/${race._id}`}>{race._id.substr(-4)}</Link></td>*/}
      <td className="centerthis"><LinkContainer to= {`/races/${race._id}`}>
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
 {/*     <td><Link to={`/races/${race._id}`}>{race._id.substr(-4)}</Link></td>*/}

      <td>{race.series}</td>
      <td>{race.race_name}</td>
      <td className="centerthis">{race.race_date}</td>
      <td className="centerthis">{race.category}</td>
      <td className="centerthis">{race.time}</td>
      <td className="centerthis">{race.rank}</td>
    </tr>
  );

}

function RaceTable(props) {
//    const borderedStyle = { border: "1px solid silver", padding: 6 };
    const raceRows = props.races.map(race => (
      <RaceRow editCol={props.editCol} key={race._id} race={race} />
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
<RaceTable editCol={false} races={props.races} />
</div>
);
}
/*
function AllTimeStats(props){

    return(
        <StatTable stats={props.stats} />
    )

}
*/

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

 /*   this.createRace = this.createRace.bind(this);*/
    this.setFilter = this.setFilter.bind(this);
    
  }
/*
  createRace(newRace) {
    fetch("/api/races", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRace)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(updatedRace => {
            const newRaces = this.state.races.concat(updatedRace);
            this.setState({ races: newRaces });
          });
        } else {
          response.json().then(error => {
            alert("Failed to add issue: " + error.message);
          });
        }
      })
      .catch(err => {
        alert("Error in sending data to server: " + err.message);
      });
  }
*/
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

 

  loadData() {

 //   console.log(`"Looking for LoggedIn: ${this.props.location.routes}`);

    fetch('api/users/me',{headers:  { 'Content-Type': 'application/json' }}).then(response =>{
        if(!response.ok){
           
           return response.json().then(error=> Promise.reject(error));
        }
        
        return response.json().then(data=>{
//        console.log(data);
        this.setState({loggedIn:data.loggedIn});
        
      
        });
 
   
  });




    var totaltime=0;
    fetch(`/api/races${this.props.location.search}`)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
         //   console.log("Total count of records:", data._metadata.total_count);
         //   console.log(data);
            data.records.forEach(race => {
              race.race_date = new Date(race.race_date).toISOString().slice(0, 10);
/*                
                let hms=race.time;
                let a= hms.split(':');
                let seconds = (+a[0]) * 60 *60 + (+a[1]) * 60 + (+a[2]);
                totaltime=totaltime+seconds;
*/


            });

            this.setState({ races: data.records });

            let temp=[];
            temp.push(data.records[0]);
            this.setState({lastRace: temp});


/*
            let hours=Math.floor(totaltime/3600);
            let minutes=Math.floor((totaltime-(hours*3600))/60);
            let seconds=totaltime-hours*3600-minutes*60;

            

            let alltime=Object.assign({}, this.state.allTimeStats);
            alltime.totalRaces=data._metadata.total_count;
            alltime.totalTime=hours +':'+ minutes + ':' + seconds;
            alltime.icupRaces=data._metadata.icup_races;
            alltime.midweekRaces=data._metadata.midweek_races;
            alltime.otherRaces=alltime.totalRaces-alltime.icupRaces-alltime.midweekRaces;
            alltime.wins=data._metadata.races_won;
            alltime.dnfs=data._metadata.races_dnf;
            alltime.podiums=data._metadata.races_podiums;
            this.setState({allTimeStats: alltime})
            console.log(alltime);
 */           

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
//console.log(this.state.races[0]);
//console.log(this.props.loggedIn);

    return (
      <div>
        <LastRace races={this.state.lastRace} /> 
        <hr/>
        <h3>Race History</h3>
        <Panel collapsible header="Filter">
        <RaceFilterForm setFilter={this.setFilter} initFilter={this.props.location.search} />
        </Panel>
        <RaceFilterLinks setFilter={this.setFilter} />
        <hr/>
        <RaceTable editCol={this.props.loggedIn} races={this.state.races} />

   {/*       <hr />
      <RaceAdd createRace={this.createRace} />*/}
      </div>
    );
  }
}

//export default withRouter(RaceListApp);