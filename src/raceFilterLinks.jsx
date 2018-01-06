import React from 'react';

export default class RaceFilterLinks extends React.Component {
  constructor(){
    super();
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilterSeries = this.setFilterSeries.bind(this);
    this.setFilterRank = this.setFilterRank.bind(this);
    this.setFilterCurrentSeason = this.setFilterCurrentSeason.bind(this);
    this.setFilterLastSeason = this.setFilterLastSeason.bind(this);
    this.setFilterPodiums = this.setFilterPodiums.bind(this);
  }
  
 setFilterSeries(e){
   
   e.preventDefault();
//   console.log(e.target.id);
   switch(e.target.id){
   case "N/A": this.props.setFilter('?series=N/A');break;
   case "ICUP": this.props.setFilter('?series=Intermountain Cup');break;
   case "Mid-Week": this.props.setFilter('?series=Mid-Week');break;
   }
 }
    
 setFilterRank(e){
   e.preventDefault();
   this.props.setFilter('?rank=1')
   
 }   
    
 clearFilter(e){
   e.preventDefault();
   this.props.setFilter("");
   
 } 

setFilterCurrentSeason(e){
  e.preventDefault();
//  this.props.setFilter('?race_date=current_season');
let currentYear=(new Date()).getFullYear();
this.props.setFilter('?race_date='+ currentYear)
//this.props.setFilter('{race_date: {$gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2017-12-31T00:00:00.000Z")}}');
}

setFilterLastSeason(e){
  e.preventDefault();
//  this.props.setFilter('?race_date=current_season');
let currentYear=(new Date()).getFullYear();
let lastYear=currentYear-1;
this.props.setFilter('?race_date='+ lastYear)
//this.props.setFilter('{race_date: {$gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2017-12-31T00:00:00.000Z")}}');
}

setFilterPodiums(e){
  e.preventDefault();
  this.props.setFilter('?rank_gte=1&rank_lte=3')
  
}   

  
  
  render() {
    const Separator =() => <span> | </span>;
    
    return (
      <div>
        <a href="#" onClick={this.clearFilter}>All Races</a>
        <Separator />
        <a href="#" onClick={this.setFilterCurrentSeason}>Current Season</a> 
        <Separator />
        <a href="#" onClick={this.setFilterLastSeason}>Last Season</a>
        <Separator />
        <a href="#" id="ICUP" onClick={this.setFilterSeries}>ICUP Races</a>
        <Separator/>
        <a href="#" id="Mid-Week" onClick={this.setFilterSeries}>Mid-Week Races</a>
        <Separator/>
        <a href="#" id="N/A" onClick={this.setFilterSeries}>Non Series Races</a>
        <Separator/>
        <a href="#" onClick={this.setFilterPodiums}>Podiums</a>
        <Separator/>
        <a href="#" onClick={this.setFilterRank}>Races Won</a>

      </div>
            );
  }
}

