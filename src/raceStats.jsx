import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';
import {Button, Glyphicon, Table, Panel } from 'react-bootstrap';

function StatTable(props) {
    return (
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              
              <th>Races</th>
              <th>Total Time</th>
              <th className="centerthis">ICUP</th>
              <th className="centerthis">Mid-Week</th>
              <th className="centerthis">Other</th>
              <th className="centerthis">Wins</th>
              <th className="centerthis">Podiums</th>
              <th className="centerthis">DNFs</th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td className="">{props.stats.totalRaces}</td>
          <td className="">{props.stats.totalTime}</td>
          <td className="centerthis">{props.stats.icupRaces}</td>
          <td className="centerthis">{props.stats.midweekRaces}</td>
          <td className="centerthis">{props.stats.otherRaces}</td>
          <td className="centerthis">{props.stats.wins}</td>
          <td className="centerthis">{props.stats.podiums}</td>
          <td className="centerthis">{props.stats.dnfs}</td>
          </tr>
          
          </tbody>
        </Table>
      );


}

function AllTimeStats(props){
    
        return(
            <div>
                <h3>All Time Stats</h3>
            <StatTable stats={props.stats} />
            </div>
        )
    
    }

function YTDStats(props){
        
            return(
                <div>
                    <h3>YTD Stats</h3>
                <StatTable stats={props.stats} />
                </div>
            )
        
        }

export default class RaceStats extends React.Component {
    constructor() {
        super();
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
                     }
                 
                    
        };
 //       this.getTimeString = this.getTimeString.bind(this);
    }

componentDidMount() {
         
    this.loadData();
             }

getTimeString(records){
    var totaltime=0;
    
    records.forEach(race => {
  //    console.log(race);  
        let hms=race.time;
        let a= hms.split(':');
        let seconds = (+a[0]) * 60 *60 + (+a[1]) * 60 + (+a[2]);
        totaltime=totaltime+seconds;
        
    });
    let hoursprefix='';
    let minutesprefix='';
    let secondsprefix='';
    let hours=Math.floor(totaltime/3600);
    let minutes=Math.floor((totaltime-(hours*3600))/60);
    let seconds=totaltime-hours*3600-minutes*60;
    if(hours<10)hoursprefix="0";
    if(minutes<10)minutesprefix="0";
    if(seconds<10)secondsprefix="0";
    return (hoursprefix+hours +':'+ minutesprefix + minutes + ':' + secondsprefix+ seconds)

}

loadData() {

    fetch(`/api/stats${this.props.location.search}`)
        .then(response => {
        if (response.ok) {
            response.json().then(data => {

            data.records.forEach(race => {
                race.race_date = race.race_date = new Date(race.race_date)
                .toISOString()
                .slice(0, 10);
                
             
            });


 
            

            this.setState({ races: data.records });
            let temp=[];
            temp.push(data.records[0]);
            this.setState({lastRace: temp});
      

            let alltime=Object.assign({}, this.state.allTimeStats);
            alltime.totalRaces=data._metadata.total_races;
            alltime.totalTime=this.getTimeString(data.records);
            alltime.icupRaces=data._metadata.icup_races;
            alltime.midweekRaces=data._metadata.midweek_races;
            alltime.otherRaces=alltime.totalRaces-alltime.icupRaces-alltime.midweekRaces;
            alltime.wins=data._metadata.races_won;
            alltime.dnfs=data._metadata.races_dnf;
            alltime.podiums=data._metadata.races_podiums;

            this.setState({allTimeStats: alltime});


            let ytdstats=Object.assign({},this.state.ytdStats);
            ytdstats.totalRaces=data._metadata.current_year_races;
            ytdstats.totalTime=this.getTimeString(data.current_year_records);
            ytdstats.icupRaces=data._metadata.current_year_icup_races;
            ytdstats.midweekRaces=data._metadata.current_year_midweek_races;
            ytdstats.otherRaces=ytdstats.totalRaces-ytdstats.icupRaces-ytdstats.midweekRaces;
            ytdstats.wins=data._metadata.current_year_races_won;
            ytdstats.podiums=data._metadata.current_year_races_podiums;
            ytdstats.dnfs=data._metadata.current_year_races_dnf;


            this.setState({ytdStats: ytdstats});


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
            <YTDStats stats={this.state.ytdStats} /> 
            <AllTimeStats stats={this.state.allTimeStats} /> 
          </div>
        );
      }
    }