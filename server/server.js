'use strict';


const fallback = require('express-history-api-fallback');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const Race = require('./race.js');
const fetch = require('node-fetch');


const app = express();


const root = `${__dirname}/public`

app.use(express.static('public'));
app.use(fallback('index.html',{root}));
app.use(bodyParser.json()); 
app.use(session({secret: 'rj3e5s6f', resave: false, saveUninitialized: true}));



var bcrypt = require('bcrypt');
const saltRounds = 10;

let userIsLoggedIn= false;
let stravaToken="";
let db;



app.all('/api/*', (req, res, next) => {
  if (req.method === 'DELETE' || req.method === 'POST' || req.method === 'PUT') {
    if (!userIsLoggedIn) {
      res.status(403).send({
        message: 'You are not authorized to perform the operation',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


app.get('/api/races', (req,res)=>{

  const filter = {};
	
	if (req.query.series) filter.series = req.query.series;
	if (req.query.rank) filter.rank = parseInt(req.query.rank);
	if (req.query.rank_lte || req.query.rank_gte) filter.rank={};
	if (req.query.rank_lte) filter.rank.$lte = parseInt(req.query.rank_lte,10);
  if (req.query.rank_gte) filter.rank.$gte = parseInt(req.query.rank_gte,10);
  
  if (req.query.race_date){
     let requestedYear = parseInt(req.query.race_date);

     filter.race_date= {$gte: new Date(requestedYear+"-01-01T00:00:00.000Z"), $lt: new Date(requestedYear+"-12-31T00:00:00.000Z")};
  }
  


 db.collection('races').find(filter).sort({race_date: -1}).toArray().then(races =>{
 

  const metadata = {total_count: races.length};

  res.json({_metadata: metadata, records: races});	

}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
  });    





});



app.get('/api/stats', (req,res)=>{ 
	
  let filter = {};
  let metadata= {};
  let records=[];
  let currentYearRecords=[];
  let requestedYear=(new Date()).getFullYear();//set requestedYear to current year.

//Get all races
db.collection('races').find().sort({race_date: -1}).toArray().then(races=>{
records=races;
metadata["total_races"]=races.length;

//Count ICUP Races
filter={};
filter.series="Intermountain Cup";
db.collection('races').count(filter).then(totalICupRaces=>{
metadata["icup_races"]=totalICupRaces;

//Count Midweek Races
filter={};
filter.series="Mid-Week";
db.collection('races').count(filter).then(totalMidweekRaces=>{
metadata["midweek_races"]=totalMidweekRaces;

//Count Races Won
filter={};
filter.rank=1;
db.collection('races').count(filter).then(totalRacesWon=>{
metadata["races_won"]=totalRacesWon;

//Count Podiums
filter={};
filter.rank={};
filter.rank.$lte = 3;
filter.rank.$gte = 1;
db.collection('races').count(filter).then(totalPodiums=>{
metadata["races_podiums"]=totalPodiums;


//Count DNFs
filter={};
filter.rank=0;
db.collection('races').count(filter).then(totalRacesDNF=>{
metadata["races_dnf"]=totalRacesDNF;

//Get races from the current year
filter={};
filter.race_date= {$gte: new Date(requestedYear+"-01-01T00:00:00.000Z"), $lt: new Date(requestedYear+"-12-31T00:00:00.000Z")};
db.collection('races').find(filter).sort({race_date: -1}).toArray().then(currentYearRaces =>{

currentYearRecords=currentYearRaces;
metadata["current_year_races"]=currentYearRaces.length;
  
//Count ICUP Races from the current year
filter={};
filter.series="Intermountain Cup";
filter.race_date= {$gte: new Date(requestedYear+"-01-01T00:00:00.000Z"), $lt: new Date(requestedYear+"-12-31T00:00:00.000Z")};
db.collection('races').count(filter).then(currentYearIcupRaces=>{
metadata["current_year_icup_races"]=currentYearIcupRaces;
 

 //Count Mid-week Races from the current year
filter={};
filter.series="Mid-Week";
filter.race_date= {$gte: new Date(requestedYear+"-01-01T00:00:00.000Z"), $lt: new Date(requestedYear+"-12-31T00:00:00.000Z")};
db.collection('races').count(filter).then(currentYearMidweekRaces=>{
metadata["current_year_midweek_races"]=currentYearMidweekRaces;
 

 //Count Races Won from current year
filter={};
filter.rank=1;
filter.race_date= {$gte: new Date(requestedYear+"-01-01T00:00:00.000Z"), $lt: new Date(requestedYear+"-12-31T00:00:00.000Z")};
db.collection('races').count(filter).then(totalRacesWon=>{
metadata["current_year_races_won"]=totalRacesWon;
 

//Count Podiums from current year
filter={};
filter.rank={};
filter.rank.$lte = 3;
filter.rank.$gte = 1;
filter.race_date= {$gte: new Date(requestedYear+"-01-01T00:00:00.000Z"), $lt: new Date(requestedYear+"-12-31T00:00:00.000Z")};
db.collection('races').count(filter).then(totalPodiums=>{
metadata["current_year_races_podiums"]=totalPodiums;


//Count DNFs from current year
filter={};
filter.rank=0;
filter.race_date= {$gte: new Date(requestedYear+"-01-01T00:00:00.000Z"), $lt: new Date(requestedYear+"-12-31T00:00:00.000Z")};
db.collection('races').count(filter).then(totalRacesDNF=>{
metadata["current_year_races_dnf"]=totalRacesDNF;


res.json({_metadata: metadata, records: records, current_year_records: currentYearRecords});   


})  
})  
})  
})  
})  
})  
})  
})  
})  
})
})
}).catch(error=> {
    console.log(error);
		res.status(500).json({message: `Internal Server Error: ${error}`});
});
});// end of API Stats



app.post('/api/races', (req,res)=>{
const newRace = req.body;

const err = Race.validateRace(newRace);
if(err){
	res.status(422).json({message: `Invalid Request: ${err}` });
	return;
}
  db.collection('races').insertOne({ race_name: newRace.race_name, series: newRace.series, race_date: new Date(newRace.race_date), location: newRace.location, time: newRace.time, rank: newRace.rank, category: newRace.category }).then(result =>
    db.collection('races').find({ _id: result.insertedId }).limit(1).next()
  ).then(newRace => {
    res.json(newRace);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});	


app.post('/login', (req, res) => {
const user=req.body;
//if (user.user_name){ console.log(user.user_name);
db.collection('users').find({user_name:user.user_name}).limit(1).next()
.then(loggedInUser=>{
  if(!loggedInUser) res.status(404).json({ message: `No such user: ${raceId}` });
  else{ 
//    console.log("From Database: "+ loggedInUser.user_name+" "+loggedInUser.user_password);
//    console.log("From User: " + user.user_name+" "+ user.user_password);
    bcrypt.compare(user.user_password, loggedInUser.user_password).then(result=>{
//    console.log("Result of Bcrypt: "+result);
    
      req.session.user={user_name: user.user_name, loggedIn: result};
      userIsLoggedIn=true;
      res.json(req.session.user);
    //  res.json({user_name: user.user_name, loggedIn: result});
    
    });

}
}).catch(error => {
   console.log(error);
   res.status(500).json({ message: `Internal Server Error: ${error}` }); 
});


});


app.get('/api/strava/athlete/:id', (req, res) => {
//  console.log(req.params.id);
  let theAthlete=req.params.id;

  fetch(`https://www.strava.com/api/v3/athletes/${theAthlete}/stats?access_token=${stravaToken}`)
  .then(response => {
  if (response.ok) {
      response.json().then(data => {

      res.json(data);

      });
  } else {
      response.json().then(error => {
      alert("No Strava Data Available:" +error.message);
      });
  }
  })
  .catch(err => {
  alert("Error in fetching data from server:", err);
  });  


  });  

app.get('/api/strava/activities/:id', (req, res) => {
//  console.log(req.params.id);
  let theEpoch=req.params.id;
  let raceID=0;
  let sufferScore=0;
 
//  console.log('The Epoch Value is: ' + theEpoch);
  //var beforeEpoch = parseInt(theEpoch)+86401;
  //console.log(beforeEpoch)

  fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${stravaToken}&after=${theEpoch}`)
  .then(response => {
  if (response.ok) {
      response.json().then(data => {
        let loopCount=data.length;
        if (data.length>3) loopCount=3;
//      console.log(data.length);
//      if (data[0]) console.log(data[0].id);else console.log('No Strava Data Available'); 

      for(var i=0; i<loopCount; i++){
        if(data[i].suffer_score>sufferScore){
          sufferScore=data[i].suffer_score;
          raceID=data[i].id;
        }
 
      }  
      res.json(raceID);

      });
  } else {
      response.json().then(error => {
      alert("No Strava Data Available:" +error.message);
      });
  }
  })
  .catch(err => {
  alert("Error in fetching data from server:", err);
  });  


  });  


app.post('/logout', (req, res) => {
  if (req.session) req.session.destroy();
  userIsLoggedIn=false;
  res.json({ status: 'ok' });
});  

app.get('/api/races/:id', (req, res) => {
  
  let raceId;
  try {
    raceId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid race ID format: ${error}` });
    return;
  }

  db.collection('races').find({ _id: raceId }).limit(1)
  .next()
  .then(race => {
    if (!race) res.status(404).json({ message: `No such race: ${raceId}` });
    else res.json(race);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.put('/api/races/:id', (req, res) => {
  let raceId;
  try {
    raceId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid race ID format: ${error}` });
    return;
  }

  const newRace = req.body;
  delete newRace._id;

  const err = Race.validateRace(newRace);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
 
    db.collection('races').updateOne({ _id: raceId }, { race_name: newRace.race_name, series: newRace.series, race_date: new Date(newRace.race_date), location: newRace.location, time: newRace.time, rank: newRace.rank, category: newRace.category }).then(() =>
 
    db.collection('races').find({ _id: raceId }).limit(1)
    .next()
  )
  .then(savedRace => {
    res.json(savedRace);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});


app.delete('/api/races/:id', (req, res) => {
  let raceId;
  try {
    raceId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  db.collection('races').deleteOne({ _id: raceId }).then((deleteResult) => {
    if (deleteResult.result.n === 1) res.json({ status: 'OK' });
    else res.json({ status: 'Warning: object not found' });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});


MongoClient.connect('mongodb://localhost/racing').then(connection => {
	db=connection;


db.collection('users').find({user_name: "reed"}).limit(1).next()
.then(stravaUser=>{
  if(!stravaUser) console.log('No such Token');
  else{ 

stravaToken=stravaUser.strava_token;

}
}).catch(error => {
   console.log(error);
   res.status(500).json({ message: `Internal Server Error: ${error}` }); 
});


app.listen(3000, () => {
 console.log('Server running on port 3000' );
 
});

}).catch(error => {
	
	console.log('ERROR',error);
});
	
	
	
