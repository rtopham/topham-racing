'use strict';

const validRaceStatus = {
  New: true,
  Recorded: true,
};

const raceFieldType = {
  series: 'required',
  race_name: 'required',
  race_date: 'required',
  location: 'optional',
  category: 'required',
  time: 'required',
  rank: 'required',
};

function convertRace(race){
//you could manipulate the race object here if you wanted before saving to database.
  return race;
}

function validateRace(race) {
  const errors = [];

  Object.keys(raceFieldType).forEach(field =>{
     if (raceFieldType[field] === 'required' && !race[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

 /* if (!validRaceStatus[race.status]) {
    errors.push(`${race.status} is not a valid status.`);
  }
*/
  return (errors.length ? errors.join('; '): null);
}

module.exports = {
  validateRace: validateRace,
  convertRace: convertRace
};