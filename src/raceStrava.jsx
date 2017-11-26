import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import { LinkContainer} from 'react-router-bootstrap';
import {Button, Glyphicon, Table, Panel } from 'react-bootstrap';

function StravaTable(props) {
    return (
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              
              <th className="centerthis">Rides</th>
              <th className="centerthis">Distance</th>
              <th className="centerthis">Time</th>
              <th className="centerthis">Moving Time</th>
              <th className="centerthis">Elevation</th>
            </tr>
          </thead>
          <tbody className="strava">
          <tr>
          <td className="centerthis">{props.stats.totalRides}</td>
          <td className="centerthis">{props.stats.totalDistance} mi</td>
          <td className="centerthis">{props.stats.totalTime} hrs</td>
          <td className="centerthis">{props.stats.totalMovingTime} hrs</td>
          <td className="centerthis">{props.stats.totalElevation} ft</td>
          
          </tr>
          
          </tbody>
        </Table>
      );





}

function AllTimeStats(props){
    
        return(
            <div>
                <h3>All Time Strava Stats (since 2012)</h3>
            <StravaTable stats={props.stats} />
            </div>
        )
    
    }

function RecentStats(props){
        
            return(
                <div>
                    <h3>Recent Strava Stats (last 28 days)</h3>
                <StravaTable stats={props.stats} />
                </div>
            )
        
        }

function YTDStats(props){
    
        return(
            <div>
                <h3>YTD Strava Stats</h3>
            <StravaTable stats={props.stats} />
            </div>
        )
    
    }

function StravaWidgets(){
return(

<div> 
<h1></h1>   
<iframe height='454' width='930' frameBorder='0' allowTransparency='true' scrolling='no' src='https://www.strava.com/athletes/292385/latest-rides/beab763db7c16d93be7e3428be95f35258a2ce41'></iframe>
<iframe height='160' width='930' frameBorder='0' allowTransparency='true' scrolling='no' src='https://www.strava.com/athletes/292385/activity-summary/beab763db7c16d93be7e3428be95f35258a2ce41'></iframe>
</div>
)
}



export default class RaceStrava extends React.Component {
    constructor() {
        super();
        this.state = { races: [] , 
                       lastRace: [],

                    ytdStats:{
                       totalRides:0,
                       totalDistance:0,
                       totalTime:"",
                       totalMovingTime:"",
                       totalElevation:0,
                       
                    },

                    recentStats:{
                        totalRides:0,
                        totalDistance:0,
                        totalTime:"",
                        totalMovingTime:"",
                        totalElevation:0,
                        
                     },

                    allTimeStats:{
                        totalRides:0,
                        totalDistance:0,
                        totalTime:"",
                        totalMovingTime:"",
                        totalElevation:0,
                     }
                 
                    
        };
 //       this.getTimeString = this.getTimeString.bind(this);
    }

componentDidMount() {

         
    this.loadData();
             }

getTimeString(seconds){
let hours = (seconds/3600);
return hours.toLocaleString('en', {maximumFractionDigits:1})

}

getMilesString(meters){

    let miles = (meters/ 1609.34);
    return miles.toLocaleString('en', {maximumFractionDigits:1})
    

}

getElevationString(meters){
    
        let feet = (meters * 3.28084);
        return feet.toLocaleString('en', {maximumFractionDigits:0})
        
    
    }


loadData() {
    
        fetch(`/api/strava/athlete/292385`)
        .then(response => {
        if (response.ok) {
            response.json().then(data => {
                    
            let recent=Object.assign({}, this.state.recentStats);
            recent.totalRides=data.recent_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
            recent.totalDistance=this.getMilesString(data.recent_ride_totals.distance);
            recent.totalTime=this.getTimeString(data.recent_ride_totals.elapsed_time);
            recent.totalMovingTime=this.getTimeString(data.recent_ride_totals.moving_time);
            recent.totalElevation=this.getElevationString(data.recent_ride_totals.elevation_gain);
          
            this.setState({recentStats: recent});
          
     
            let alltime=Object.assign({}, this.state.allTimeStats);
            alltime.totalRides=data.all_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
            alltime.totalDistance=this.getMilesString(data.all_ride_totals.distance);
            alltime.totalTime=this.getTimeString(data.all_ride_totals.elapsed_time);
            alltime.totalMovingTime=this.getTimeString(data.all_ride_totals.moving_time);
            alltime.totalElevation=this.getElevationString(data.all_ride_totals.elevation_gain);
    
            this.setState({allTimeStats: alltime});
    
    
            let ytdstats=Object.assign({},this.state.ytdStats);
            ytdstats.totalRides=data.ytd_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
            ytdstats.totalDistance=this.getMilesString(data.ytd_ride_totals.distance);
            ytdstats.totalTime=this.getTimeString(data.ytd_ride_totals.elapsed_time);
            ytdstats.totalMovingTime=this.getTimeString(data.ytd_ride_totals.moving_time);
            ytdstats.totalElevation=this.getElevationString(data.ytd_ride_totals.elevation_gain);
    
            this.setState({ytdStats: ytdstats});
            
    
            });
        } else {
            response.json().then(error => {
            //alert("Failed to fetch stats:" +error.message);
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
           <StravaWidgets />
           <RecentStats stats={this.state.recentStats} /> 
           <YTDStats stats={this.state.ytdStats} /> 
           <AllTimeStats stats={this.state.allTimeStats}/>
           
          </div>
        );
      }
    }