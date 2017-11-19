import React from 'react';

import {Form, FormControl, Button} from 'react-bootstrap';

export default class RaceAdd extends React.Component {  
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.raceAdd;
    this.props.createRace({
      series: form.series.value,
      race_name: form.race_name.value,
      race_date: new Date(form.race_date.value).toISOString().slice(0, 10),
      location: form.location.value,
      category: form.category.value,
      time: form.time.value,
      rank: form.rank.value
    });
    form.series.value = "";
    form.race_name.value = "";
    form.race_date.value = "";
    form.category.value = "";
    form.location.value = "";
    form.time.value = "";
    form.rank.value = "";
  }

  render() {
    return (
      <div>
        <Form inline name="raceAdd" onSubmit={this.handleSubmit}>
          <FormControl name="series" placeholder="Series" />
          <FormControl name="race_name" placeholder="Race Name" />
          <FormControl name="race_date" placeholder="Date" />
          <FormControl name="location" placeholder="Location" />
          <FormControl name="category" placeholder="Category" />
          <FormControl name="time" placeholder="Time" />
          <FormControl name="rank" placeholder="Rank" />
          <Button type="submit" bsStyle="primary">Add Race</Button>
        </Form>
      </div>
    );
  }
}