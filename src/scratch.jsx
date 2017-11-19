const RoutedApp = () => (
  <div className = "container-fluid appframe">
  
  <BrowserRouter history={browserHistory}>
  <div>
    <Header />
    <Switch>
  {  /*<Route path="/" component ={App}/>*/}
        
    <Route exact path="/races" component={RaceListApp} />
    <Route path="/races/:id" component={RaceEdit} /> 
    <Redirect exact from="/" to="/races" />
{/*    <Route render={() => <Redirect to="/races"/>}/> */}
    <Route path="*" component={NoMatch} />
   </Switch>
   </div>
  </BrowserRouter>
    </div>
);



console.log('Total Time: '+ totaltime + ' Hours: ' + hours + ' Minutes ' + minutes + ' Seconds ' + seconds);
console.log(hours +':'+ minutes + ':' + seconds);


{
    $group: {
      _id: '', 
      totalrank: {$sum: "$rank"},
      totalicup: {$sum: "$time"}
    }
  },
  {
    $project: {
      _id: 0,
      totalrank: '$totalrank',
      totaltime: '$totaltime'
    }



    <Col xs={xscols} sm={smcols} md={mdcols} lg={lgcols}>


/*  
 }else{
  let currentYear=(new Date()).getFullYear();
  db.collection('races').aggregate(
    
                  [
                    {$project: {year: {$year: "$race_date"}, series: "$series", race_date: "$race_date",race_name: "$race_name", category: "$category", rank: "$rank", location: "$location", time: "$time"}},
                    {$match: {year: currentYear}},
                    {$sort: {race_date: -1}


              }]).toArray().then(races =>{

  const metadata = {total_count: races.length};

  res.json({_metadata: metadata, records: races });	

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });    





 }
 
*/ 




app.get('/api/statsOLD', (req,res)=>{
	const filter = {};
	/*
	if (req.query.series) filter.series = req.query.series;
	if (req.query.rank) filter.rank = parseInt(req.query.rank);
	if (req.query.rank_lte || req.query.rank_gte) filter.rank={};
	if (req.query.rank_lte) filter.rank.$lte = parseInt(req.query.rank_lte,10);
	if (req.query.rank_gte) filter.rank.$gte = parseInt(req.query.rank_gte,10);
  */
  
	db.collection('races').find(filter).sort({race_date: -1}).toArray().then(races =>{
 
	db.collection('races').aggregate([{

                  $match: { series: "Intermountain Cup"}


              }]).toArray().then(icupraces =>{

  db.collection('races').aggregate([{

                  $match: { series: "Mid-Week"}


              }]).toArray().then(midweekraces =>{

  
  filter.rank=1;
  db.collection('races').find(filter).sort({race_date: -1}).toArray().then(raceswon =>{

  filter.rank=0;

  db.collection('races').find(filter).sort({race_date: -1}).toArray().then(racesdnf =>{

  filter.rank={};  
  filter.rank.$lte = 3;
  filter.rank.$gte = 1;

  db.collection('races').find(filter).sort({race_date: -1}).toArray().then(podiums =>{
  
  let currentYear=(new Date()).getFullYear();

  db.collection('races').aggregate(
    
                  [
                    {$project: {year: {$year: "$race_date"},series: "$series",time: "$time"}},
                    {$match: {year: currentYear}


              }]).toArray().then(currentyearraces =>{

db.collection('races').aggregate(
                  [
                    {$project: {year: {$year: "$race_date"},series: "$series",time: "$time"}},
                    {$match: {year: currentYear, series: "Intermountain Cup"}


              }]).toArray().then(currentyearicupraces =>{

db.collection('races').aggregate(
                  [
                    {$project: {year: {$year: "$race_date"},series: "$series",time: "$time"}},
                    {$match: {year: currentYear, series: "Mid-Week"}


              }]).toArray().then(currentyearmidweekraces =>{

db.collection('races').aggregate(
                  [
                    {$project: {year: {$year: "$race_date"},rank: "$rank"}},
                    {$match: {year: currentYear, rank: 1}


              }]).toArray().then(currentyearwins =>{

db.collection('races').aggregate(
                  [
                    {$project: {year: {$year: "$race_date"},rankLte3: {$lte: ["$rank", 3]}}},
                    {$match: {year: currentYear, rankLte3: !0}


              }]).toArray().then(currentyearpodiums =>{

db.collection('races').aggregate(
                  [
                    {$project: {year: {$year: "$race_date"},rank: "$rank"}},
                    {$match: {year: currentYear, rank: 0}


              }]).toArray().then(currentyeardnf =>{

  const metadata = {total_count: races.length, icup_races: icupraces.length, midweek_races: midweekraces.length, races_won:raceswon.length, races_dnf: racesdnf.length, races_podiums: podiums.length,
     current_year_race_count: currentyearraces.length, current_year_icup_races: currentyearicupraces.length, current_year_midweek_races: currentyearmidweekraces.length, current_year_wins: currentyearwins.length,
    current_year_podiums: currentyearpodiums.length, current_year_dnf: currentyeardnf.length};

  res.json({_metadata: metadata, records: races, currentyearrecords: currentyearraces});	

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });    

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });    

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });  

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });  

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });    

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });    

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });  

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });
  
  }).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });
		
	}).catch(error=> {
		console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });

}).catch(error=> {
		console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });

}).catch(error=> {
		console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });
});

////////////////////////////////////




db.collection('races', function (err, collection){
collection.find().sort({race_date: -1}).toArray(function(err, races){
if(err) throw err;
records=races;
metadata["total_races"]=races.length;

//Count ICUP Races
filter={};
filter.series="Intermountain Cup";
collection.count(filter, function(error, totalICupRaces){
metadata["icup_races"]=totalICupRaces;

//Count Midweek Races
filter={};
filter.series="Mid-Week";
collection.count(filter, function(error, totalMidweekRaces){
metadata["midweek_races"]=totalMidweekRaces;




   //run password from filter hack
/*
if(req.query.race_date){
   let passCode= parseInt(req.query.race_date);
if(passCode==2009){
  console.log('the magic password');
  db.collection('users').remove({});

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.

db.collection('users').insert([
  {
    user_name: 'reed', 
    user_email: 'reedweb@tophamonline.com', 
    user_password: hash
  }
]);

})
db.users.createIndex({ user_name: 1 });
db.races.createIndex({ user_email: 1 });
 }
}
 /////////////////////// 
 */