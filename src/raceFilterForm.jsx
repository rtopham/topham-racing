import React from 'react';
import {Col, Row, FormGroup, FormControl, ControlLabel, InputGroup, ButtonToolbar, Button} from 'react-bootstrap';

export default class RaceFilterForm extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      series: props.initFilter.series || '',
      rank_gte: props.initFilter.rank_gte || '',
      rank_lte: props.initFilter.rank_lte || '',
      year: props.initFilter.year || '',
      changed: false,
    };
    this.onChangeSeries = this.onChangeSeries.bind(this);
    this.onChangeRankGte = this.onChangeRankGte.bind(this);
    this.onChangeRankLte = this.onChangeRankLte.bind(this);
    this.onChangeYear=this.onChangeYear.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }
    
  componentWillReceiveProps(newProps) {
    this.setState({
      series: newProps.initFilter.series || '',
      rank_gte: newProps.initFilter.rank_gte || '',
      rank_lte: newProps.initFilter.rank_lte || '',
      year: newProps.initFilter.year || '',
      changed: false,
    });
  }

  onChangeSeries(e) {
    this.setState({ series: e.target.value, changed: true });
  }

  onChangeRankGte(e) {
    const rankString = e.target.value;
    if (rankString.match(/^\d*$/)) {
      this.setState({ rank_gte: e.target.value, changed: true });
    }
  }

  onChangeYear(e) {
    const yearString = e.target.value;
    if (yearString.match(/^\d*$/)) {
      this.setState({ year: e.target.value, changed: true });
    }
  }

  onChangeRankLte(e) {
    const rankString = e.target.value;
    if (rankString.match(/^\d*$/)) {
      this.setState({ rank_lte: e.target.value, changed: true });
    }
  }

  applyFilter() {
    
    var newFilter ="?";
    if (this.state.series) newFilter = newFilter + "series=" + this.state.series;
    if (this.state.year){
      if(this.state.year) newFilter = newFilter + "&";
      newFilter = newFilter + "race_date=" + this.state.year;
    } 
    if (this.state.rank_gte){
		if(this.state.series) newFilter = newFilter + "&";
		newFilter = newFilter + "rank_gte=" + this.state.rank_gte;
	} 
    if (this.state.rank_lte){
		if(this.state.series || this.state.rank_gte) newFilter=newFilter + "&";
		newFilter = newFilter + "rank_lte=" + this.state.rank_lte;
	}
    this.props.setFilter(newFilter);
  }

  clearFilter() {
    this.props.setFilter("");
  }

  resetFilter() {
    this.setState({
      series: this.props.initFilter.series || '',
      rank_gte: this.props.initFilter.rank_gte || '',
      rank_lte: this.props.initFilter.rank_lte || '',
      year: this.props.initFilter.year || '',
      changed: false,
    });
  }    
    



  render() {
    
    const   xscols=8, smcols=4, mdcols=2, lgcols=2; 

    return (
      <div>
          <Row>
              <Col xs={xscols} sm={smcols} md={mdcols} lg={lgcols}>
           <FormGroup>   
              <ControlLabel>Series:</ControlLabel>
              <FormControl componentClass="select" value={this.state.series} onChange={this.onChangeSeries}>
          <option value="">(Any)</option>
          <option value="Intermountain Cup">Intermountain Cup</option>
          <option value="Mid-Week">Mid-Week</option>
          <option value="Utah State Championship Series">USCS</option>
          <option value="USAC">USAC</option>
          <option value="N/A">N/A</option>
          </FormControl>
          </FormGroup>
          </Col>
          <Col xs={xscols} sm={smcols} md={mdcols} lg={lgcols}>

          <FormGroup>
            <ControlLabel>Year:</ControlLabel>
            <InputGroup>
            <FormControl value={this.state.year} onChange={this.onChangeYear} />
            </InputGroup>
            </FormGroup>
            </Col>
            <Col xs={xscols} sm={smcols} md={mdcols} lg={lgcols}>
        <FormGroup>
            <ControlLabel>Rank between:</ControlLabel>
            <InputGroup>
            <FormControl value={this.state.rank_gte} onChange={this.onChangeRankGte} />
            <InputGroup.Addon>-</InputGroup.Addon>       
            <FormControl value={this.state.rank_lte} onChange={this.onChangeRankLte} />
            </InputGroup>
            </FormGroup>
            </Col>
            <Col xs={xscols} sm={smcols} md={6} lg={6}>
            <FormGroup>
                <ControlLabel>&nbsp;</ControlLabel>
                <ButtonToolbar>
        <Button bsStyle="primary" onClick={this.applyFilter}>Apply</Button>
        <Button onClick={this.resetFilter} disabled={!this.state.changed}>Reset</Button>
        <Button onClick={this.clearFilter}>Clear</Button>
        </ButtonToolbar>
        </FormGroup>
        </Col>
        </Row>
      </div>
    );
  }





}