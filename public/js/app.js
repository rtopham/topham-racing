'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raceAdd = require('./raceAdd.jsx');

var _raceAdd2 = _interopRequireDefault(_raceAdd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactRouterDOM = ReactRouterDOM,
    BrowserRouter = _ReactRouterDOM.BrowserRouter,
    Route = _ReactRouterDOM.Route,
    Switch = _ReactRouterDOM.Switch,
    Redirect = _ReactRouterDOM.Redirect,
    Link = _ReactRouterDOM.Link,
    browserHistory = _ReactRouterDOM.browserHistory,
    withRouter = _ReactRouterDOM.withRouter;

var DateInput = function (_React$Component) {
  _inherits(DateInput, _React$Component);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

    _this.state = { value: _this.editFormat(props.value), focused: false, valid: true };
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(DateInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.value !== this.props.value) {
        this.setState({ value: this.editFormat(newProps.value) });
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({ focused: true });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      var value = this.unformat(this.state.value);
      var valid = this.state.value === '' || value != null;
      if (valid !== this.state.valid && this.props.onValidityChange) {
        this.props.onValidityChange(e, valid);
      }
      this.setState({ focused: false, valid: valid });
      if (valid) this.props.onChange(e, value);
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (e.target.value.match(/^[\d-]*$/)) {
        this.setState({ value: e.target.value });
      }
    }
  }, {
    key: 'displayFormat',
    value: function displayFormat(date) {
      return date != null ? date.toDateString() : '';
    }
  }, {
    key: 'editFormat',
    value: function editFormat(date) {
      return date != null ? date.toISOString().substr(0, 10) : '';
    }
  }, {
    key: 'unformat',
    value: function unformat(str) {
      var val = new Date(str);
      return isNaN(val.getTime()) ? null : val;
    }
  }, {
    key: 'render',
    value: function render() {
      var className = !this.state.valid && !this.state.focused ? 'invalid' : null;
      var value = this.state.focused || !this.state.valid ? this.state.value : this.displayFormat(this.props.value);
      return React.createElement('input', {
        type: 'text', size: 20, name: this.props.name, className: className, value: value,
        placeholder: this.state.focused ? 'yyyy-mm-dd' : null,
        onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange
      });
    }
  }]);

  return DateInput;
}(React.Component);

var NumInput = function (_React$Component2) {
  _inherits(NumInput, _React$Component2);

  function NumInput(props) {
    _classCallCheck(this, NumInput);

    var _this2 = _possibleConstructorReturn(this, (NumInput.__proto__ || Object.getPrototypeOf(NumInput)).call(this, props));

    _this2.state = { value: _this2.format(props.value) };
    _this2.onBlur = _this2.onBlur.bind(_this2);
    _this2.onChange = _this2.onChange.bind(_this2);
    return _this2;
  }

  _createClass(NumInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({ value: this.format(newProps.value) });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this.props.onChange(e, this.unformat(this.state.value));
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      if (e.target.value.match(/^\d*$/)) {
        this.setState({ value: e.target.value });
      }
    }
  }, {
    key: 'format',
    value: function format(num) {
      return num != null ? num.toString() : '';
    }
  }, {
    key: 'unformat',
    value: function unformat(str) {
      var val = parseInt(str, 10);
      return isNaN(val) ? null : val;
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('input', _extends({
        type: 'text' }, this.props, { value: this.state.value,
        onBlur: this.onBlur, onChange: this.onChange
      }));
    }
  }]);

  return NumInput;
}(React.Component);

var RaceEditOld = function (_React$Component3) {
  _inherits(RaceEditOld, _React$Component3);

  function RaceEditOld(props, context) {
    _classCallCheck(this, RaceEditOld);

    return _possibleConstructorReturn(this, (RaceEditOld.__proto__ || Object.getPrototypeOf(RaceEditOld)).call(this, props, context));
  }

  _createClass(RaceEditOld, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        ' ',
        React.createElement(
          'p',
          null,
          'This is a placeholder for editing Race ',
          this.props.match.params.id,
          '.'
        ),
        React.createElement(
          Link,
          { to: '/races' },
          'Back to Race List'
        )
      );
    }
  }]);

  return RaceEditOld;
}(React.Component);

var RaceEditOld2 = function (_React$Component4) {
  _inherits(RaceEditOld2, _React$Component4);

  function RaceEditOld2() {
    _classCallCheck(this, RaceEditOld2);

    var _this4 = _possibleConstructorReturn(this, (RaceEditOld2.__proto__ || Object.getPrototypeOf(RaceEditOld2)).call(this));

    _this4.state = {
      race: {
        _id: '', series: '', race_name: '', race_date: '', time: '',
        rank: '', location: ''
      }
    };
    _this4.onChange = _this4.onChange.bind(_this4);
    return _this4;
  }

  _createClass(RaceEditOld2, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.match.params.id !== this.props.match.params.id) {
        this.loadData();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var race = Object.assign({}, this.state.race);
      race[event.target.name] = event.target.value;
      this.setState({ race: race });
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var _this5 = this;

      fetch('/api/races/' + this.props.match.params.id).then(function (response) {
        if (response.ok) {
          response.json().then(function (race) {
            race.race_date = new Date(race.race_date).toDateString();
            race.rank = race.rank != null ? race.rank.toString() : '';
            _this5.setState({ race: race });
          });
        } else {
          response.json().then(function (error) {
            alert('Failed to fetch issue: ' + error.message);
          });
        }
      }).catch(function (err) {
        alert('Error in fetching data from server: ' + err.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var race = this.state.race;
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          null,
          'ID: ',
          race._id,
          React.createElement('br', null),
          'Date: ',
          race.race_date,
          React.createElement('br', null),
          'Series: ',
          React.createElement(
            'select',
            { name: 'series', value: race.series, onChange: this.onChange },
            React.createElement(
              'option',
              { value: 'Intermountain Cup' },
              'Intermountain Cup'
            ),
            React.createElement(
              'option',
              { value: 'Mid-Week' },
              'Mid-Week'
            ),
            React.createElement(
              'option',
              { value: 'Utah State Championship Series' },
              'USCS'
            ),
            React.createElement(
              'option',
              { value: 'USAC' },
              'USAC'
            ),
            React.createElement(
              'option',
              { value: 'N/A' },
              'N/A'
            )
          ),
          React.createElement('br', null),
          'Race Name: ',
          React.createElement('input', { name: 'raceName', value: race.race_name, onChange: this.onChange }),
          React.createElement('br', null),
          'Rank: ',
          React.createElement('input', { size: 2, name: 'rank', value: race.rank, onChange: this.onChange }),
          React.createElement('br', null),
          'Time: ',
          React.createElement('input', {
            name: 'raceTime', value: race.time, onChange: this.onChange
          }),
          React.createElement('br', null),
          'Location: ',
          React.createElement('input', { name: 'location', size: 50, value: race.location, onChange: this.onChange }),
          React.createElement('br', null),
          React.createElement(
            'button',
            { type: 'submit' },
            'Submit'
          ),
          React.createElement(
            Link,
            { to: '/races' },
            'Back to issue list'
          )
        )
      );
    }
  }]);

  return RaceEditOld2;
}(React.Component);

var RaceEdit = function (_React$Component5) {
  _inherits(RaceEdit, _React$Component5);

  function RaceEdit() {
    _classCallCheck(this, RaceEdit);

    var _this6 = _possibleConstructorReturn(this, (RaceEdit.__proto__ || Object.getPrototypeOf(RaceEdit)).call(this));

    _this6.state = {
      race: {
        _id: '', series: '', race_name: '', race_date: '', time: '',
        rank: null, location: ''
      },
      invalidFields: {}
    };
    _this6.onChange = _this6.onChange.bind(_this6);
    _this6.onValidityChange = _this6.onValidityChange.bind(_this6);
    return _this6;
  }

  _createClass(RaceEdit, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.match.params.id !== this.props.match.params.id) {
        this.loadData();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event, convertedValue) {
      var race = Object.assign({}, this.state.race);
      var value = convertedValue !== undefined ? convertedValue : event.target.value;
      race[event.target.name] = value;
      this.setState({ race: race });
    }
  }, {
    key: 'onValidityChange',
    value: function onValidityChange(event, valid) {
      var invalidFields = Object.assign({}, this.state.invalidFields);
      if (!valid) {
        invalidFields[event.target.name] = true;
      } else {
        delete invalidFields[even.target.name];
      }
      this.setState({ invalidFields: invalidFields });
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var _this7 = this;

      fetch('/api/races/' + this.props.match.params.id).then(function (response) {
        if (response.ok) {
          response.json().then(function (race) {
            //       race.race_date = new Date(race.race_date).toDateString();
            race.race_date = race.race_date != null ? new Date(race.race_date) : null;

            _this7.setState({ race: race });
          });
        } else {
          response.json().then(function (error) {
            alert('Failed to fetch issue: ' + error.message);
          });
        }
      }).catch(function (err) {
        alert('Error in fetching data from server: ' + err.message);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var race = this.state.race;
      var validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null : React.createElement(
        'div',
        { className: 'error' },
        ' Please correct invalid fields before submitting.'
      );

      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          null,
          'ID: ',
          race._id,
          React.createElement('br', null),
          'Date: ',
          React.createElement(DateInput, {
            name: 'raceDate', value: race.race_date,
            onChange: this.onChange,
            onValidityChange: this.onValidityChange
          }),
          React.createElement('br', null),
          'Series: ',
          React.createElement(
            'select',
            { name: 'series', value: race.series, onChange: this.onChange },
            React.createElement(
              'option',
              { value: 'Intermountain Cup' },
              'Intermountain Cup'
            ),
            React.createElement(
              'option',
              { value: 'Mid-Week' },
              'Mid-Week'
            ),
            React.createElement(
              'option',
              { value: 'Utah State Championship Series' },
              'USCS'
            ),
            React.createElement(
              'option',
              { value: 'USAC' },
              'USAC'
            ),
            React.createElement(
              'option',
              { value: 'N/A' },
              'N/A'
            )
          ),
          React.createElement('br', null),
          'Race Name: ',
          React.createElement('input', { name: 'raceName', value: race.race_name, onChange: this.onChange }),
          React.createElement('br', null),
          'Rank: ',
          React.createElement(NumInput, { size: 5, name: 'rank', value: race.rank, onChange: this.onChange }),
          React.createElement('br', null),
          'Time: ',
          React.createElement('input', {
            name: 'raceTime', value: race.time, onChange: this.onChange
          }),
          React.createElement('br', null),
          'Location: ',
          React.createElement('input', { name: 'location', size: 50, value: race.location, onChange: this.onChange }),
          React.createElement('br', null),
          validationMessage,
          React.createElement(
            'button',
            { type: 'submit' },
            'Submit'
          ),
          React.createElement(
            Link,
            { to: '/races' },
            'Back to issue list'
          )
        )
      );
    }
  }]);

  return RaceEdit;
}(React.Component);

function RaceRow(props) {

  var borderedstyle = { border: "1px solid silver", padding: 4 };
  var race = props.race;
  return React.createElement(
    'tr',
    null,
    React.createElement(
      'td',
      { style: borderedstyle },
      React.createElement(
        Link,
        { to: '/races/' + race._id },
        race._id.substr(-4)
      )
    ),
    React.createElement(
      'td',
      { style: borderedstyle },
      race.series
    ),
    React.createElement(
      'td',
      { style: borderedstyle },
      race.race_name
    ),
    React.createElement(
      'td',
      { style: borderedstyle },
      race.race_date
    ),
    React.createElement(
      'td',
      { style: borderedstyle },
      race.category
    ),
    React.createElement(
      'td',
      { style: borderedstyle },
      race.time
    ),
    React.createElement(
      'td',
      { style: borderedstyle },
      race.rank
    )
  );
}

var RaceFilterOld = function (_React$Component6) {
  _inherits(RaceFilterOld, _React$Component6);

  function RaceFilterOld() {
    _classCallCheck(this, RaceFilterOld);

    return _possibleConstructorReturn(this, (RaceFilterOld.__proto__ || Object.getPrototypeOf(RaceFilterOld)).apply(this, arguments));
  }

  _createClass(RaceFilterOld, [{
    key: 'render',

    /*  constructor(){
        super();
        this.clearFilter = this.clearFilter.bind(this);
        this.setFilterSeries = this.setFilterSeries.bind(this);
      
     SetFilterSeries(e){
       e.preventDefault();
       this.props.setFilter({series: 'Intermountain Cup'})
       
     }
      }
      */
    value: function render() {
      var Separator = function Separator() {
        return React.createElement(
          'span',
          null,
          ' | '
        );
      };

      return React.createElement(
        'div',
        null,
        React.createElement(
          Link,
          { to: '/races' },
          'All Races'
        ),
        React.createElement(Separator, null),
        React.createElement(
          Link,
          { to: { pathname: '/races', search: '?series=N/A' } },
          'Non Series Races'
        ),
        React.createElement(Separator, null),
        React.createElement(
          Link,
          { to: '/races?rank=1' },
          'Races Won'
        )
      );
    }
  }]);

  return RaceFilterOld;
}(React.Component);

var RaceFilterForm = function (_React$Component7) {
  _inherits(RaceFilterForm, _React$Component7);

  function RaceFilterForm(props) {
    _classCallCheck(this, RaceFilterForm);

    var _this9 = _possibleConstructorReturn(this, (RaceFilterForm.__proto__ || Object.getPrototypeOf(RaceFilterForm)).call(this, props));

    _this9.state = {
      series: props.initFilter.series || '',
      rank_gte: props.initFilter.rank_gte || '',
      rank_lte: props.initFilter.rank_lte || '',
      changed: false
    };
    _this9.onChangeSeries = _this9.onChangeSeries.bind(_this9);
    _this9.onChangeRankGte = _this9.onChangeRankGte.bind(_this9);
    _this9.onChangeRankLte = _this9.onChangeRankLte.bind(_this9);
    _this9.applyFilter = _this9.applyFilter.bind(_this9);
    _this9.resetFilter = _this9.resetFilter.bind(_this9);
    _this9.clearFilter = _this9.clearFilter.bind(_this9);
    return _this9;
  }

  _createClass(RaceFilterForm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        series: newProps.initFilter.series || '',
        rank_gte: newProps.initFilter.rank_gte || '',
        rank_lte: newProps.initFilter.rank_lte || '',
        changed: false
      });
    }
  }, {
    key: 'onChangeSeries',
    value: function onChangeSeries(e) {
      this.setState({ series: e.target.value, changed: true });
    }
  }, {
    key: 'onChangeRankGte',
    value: function onChangeRankGte(e) {
      var rankString = e.target.value;
      if (rankString.match(/^\d*$/)) {
        this.setState({ rank_gte: e.target.value, changed: true });
      }
    }
  }, {
    key: 'onChangeRankLte',
    value: function onChangeRankLte(e) {
      var rankString = e.target.value;
      if (rankString.match(/^\d*$/)) {
        this.setState({ rank_lte: e.target.value, changed: true });
      }
    }
  }, {
    key: 'applyFilter',
    value: function applyFilter() {

      var newFilter = "?";
      if (this.state.series) newFilter = newFilter + "series=" + this.state.series;
      if (this.state.rank_gte) {
        if (this.state.series) newFilter = newFilter + "&";
        newFilter = newFilter + "rank_gte=" + this.state.rank_gte;
      }
      if (this.state.rank_lte) {
        if (this.state.series || this.state.rank_gte) newFilter = newFilter + "&";
        newFilter = newFilter + "rank_lte=" + this.state.rank_lte;
      }
      this.props.setFilter(newFilter);
    }
  }, {
    key: 'clearFilter',
    value: function clearFilter() {
      this.props.setFilter("");
    }
  }, {
    key: 'resetFilter',
    value: function resetFilter() {
      this.setState({
        series: this.props.initFilter.series || '',
        rank_gte: this.props.initFilter.rank_gte || '',
        rank_lte: this.props.initFilter.rank_lte || '',
        changed: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        'Series:',
        React.createElement(
          'select',
          { value: this.state.series, onChange: this.onChangeSeries },
          React.createElement(
            'option',
            { value: '' },
            '(Any)'
          ),
          React.createElement(
            'option',
            { value: 'Intermountain Cup' },
            'Intermountain Cup'
          ),
          React.createElement(
            'option',
            { value: 'Mid-Week' },
            'Mid-Week'
          ),
          React.createElement(
            'option',
            { value: 'Utah State Championship Series' },
            'USCS'
          ),
          React.createElement(
            'option',
            { value: 'USAC' },
            'USAC'
          ),
          React.createElement(
            'option',
            { value: 'N/A' },
            'N/A'
          )
        ),
        '\xA0Rank between:',
        React.createElement('input', { size: 5, value: this.state.rank_gte, onChange: this.onChangeRankGte }),
        '\xA0-\xA0',
        React.createElement('input', { size: 5, value: this.state.rank_lte, onChange: this.onChangeRankLte }),
        React.createElement(
          'button',
          { onClick: this.applyFilter },
          'Apply'
        ),
        React.createElement(
          'button',
          { onClick: this.resetFilter, disabled: !this.state.changed },
          'Reset'
        ),
        React.createElement(
          'button',
          { onClick: this.clearFilter },
          'Clear'
        )
      );
    }
  }]);

  return RaceFilterForm;
}(React.Component);

var RaceFilterLinks = function (_React$Component8) {
  _inherits(RaceFilterLinks, _React$Component8);

  function RaceFilterLinks() {
    _classCallCheck(this, RaceFilterLinks);

    var _this10 = _possibleConstructorReturn(this, (RaceFilterLinks.__proto__ || Object.getPrototypeOf(RaceFilterLinks)).call(this));

    _this10.clearFilter = _this10.clearFilter.bind(_this10);
    _this10.setFilterSeries = _this10.setFilterSeries.bind(_this10);
    _this10.setFilterRank = _this10.setFilterRank.bind(_this10);
    return _this10;
  }

  _createClass(RaceFilterLinks, [{
    key: 'setFilterSeries',
    value: function setFilterSeries(e) {
      e.preventDefault();
      this.props.setFilter('?series=N/A');
    }
  }, {
    key: 'setFilterRank',
    value: function setFilterRank(e) {
      e.preventDefault();
      this.props.setFilter('?rank=1');
    }
  }, {
    key: 'clearFilter',
    value: function clearFilter(e) {
      e.preventDefault();
      this.props.setFilter("");
    }
  }, {
    key: 'render',
    value: function render() {
      var Separator = function Separator() {
        return React.createElement(
          'span',
          null,
          ' | '
        );
      };

      return React.createElement(
        'div',
        null,
        React.createElement(
          'a',
          { href: '#', onClick: this.clearFilter },
          'All Races'
        ),
        React.createElement(Separator, null),
        React.createElement(
          'a',
          { href: '#', onClick: this.setFilterSeries },
          'Non Series Races'
        ),
        React.createElement(Separator, null),
        React.createElement(
          'a',
          { href: '#', onClick: this.setFilterRank },
          'Races Won'
        )
      );
    }
  }]);

  return RaceFilterLinks;
}(React.Component);

function RaceTable(props) {
  var borderedStyle = { border: "1px solid silver", padding: 6 };
  var raceRows = props.races.map(function (race) {
    return React.createElement(RaceRow, { key: race._id, race: race });
  });

  return React.createElement(
    'table',
    { style: { borderCollapse: "collapse" } },
    React.createElement(
      'thead',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          { style: borderedStyle },
          'Id'
        ),
        React.createElement(
          'th',
          { style: borderedStyle },
          'Series'
        ),
        React.createElement(
          'th',
          { style: borderedStyle },
          'Name'
        ),
        React.createElement(
          'th',
          { style: borderedStyle },
          'Date'
        ),
        React.createElement(
          'th',
          { style: borderedStyle },
          'Category'
        ),
        React.createElement(
          'th',
          { style: borderedStyle },
          'Time'
        ),
        React.createElement(
          'th',
          { style: borderedStyle },
          'Rank'
        )
      )
    ),
    React.createElement(
      'tbody',
      null,
      raceRows
    )
  );
}

/*
class RaceAdd extends React.Component {
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
        <form name="raceAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="series" placeholder="Series" />
          <input type="text" name="race_name" placeholder="Race Name" />
          <input type="text" name="race_date" placeholder="Date" />
          <input type="text" name="location" placeholder="Location" />
          <input type="text" name="category" placeholder="Category" />
          <input type="text" name="time" placeholder="Time" />
          <input type="text" name="rank" placeholder="Rank" />
          <button>Add Race</button>
        </form>
      </div>
    );
  }
}
*/
/*uncomment for Codepen
const races = [
  {id: 1, race_name: 'Snowbird', series: "Intermountain Cup", race_date: new Date('2017-07-25').toISOString().slice(0, 10), category: 'Expert 50+', time: '00:57:22', rank: 4,
  },
 {id: 2, race_name: 'Solitude', series: "Mid-Week", race_date: new Date('2017-08-15').toISOString().slice(0, 10), category: 'Expert 35+', time: '00:33:21', rank: 2,
  },
  
  ];
*/

var RaceListApp = function (_React$Component9) {
  _inherits(RaceListApp, _React$Component9);

  function RaceListApp() {
    _classCallCheck(this, RaceListApp);

    var _this11 = _possibleConstructorReturn(this, (RaceListApp.__proto__ || Object.getPrototypeOf(RaceListApp)).call(this));

    _this11.state = { races: [] };

    _this11.createRace = _this11.createRace.bind(_this11);
    _this11.setFilter = _this11.setFilter.bind(_this11);
    return _this11;
  }

  _createClass(RaceListApp, [{
    key: 'createRace',
    value: function createRace(newRace) {
      var _this12 = this;

      fetch("/api/races", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRace)
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (updatedRace) {
            var newRaces = _this12.state.races.concat(updatedRace);
            _this12.setState({ races: newRaces });
          });
        } else {
          response.json().then(function (error) {
            alert("Failed to add issue: " + error.message);
          });
        }
      }).catch(function (err) {
        alert("Error in sending data to server: " + err.message);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var oldQuery = prevProps.location.search;
      var newQuery = this.props.location.search;
      if (oldQuery === newQuery) {
        return;
      }
      this.loadData();
    }
  }, {
    key: 'setFilter',
    value: function setFilter(query) {
      this.props.history.push({ pathname: this.props.location.pathname, search: query });
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var _this13 = this;

      /*uncomment for codepen  
      setTimeout(() => {
      this.setState({races:races});
      },500);
      */

      /*comment the followin out for Codepen*/
      fetch('/api/races' + this.props.location.search).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            //   console.log("Total count of records:", data._metadata.total_count);
            //   console.log(data);
            data.records.forEach(function (race) {
              race.race_date = race.race_date = new Date(race.race_date).toISOString().slice(0, 10);
            });

            _this13.setState({ races: data.records });
          });
        } else {
          response.json().then(function (error) {
            //alert("Failed to fetch issues:" +error.message);
          });
        }
      }).catch(function (err) {
        //alert("Error in fetching data from server:", err);
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(RaceFilterForm, { setFilter: this.setFilter, initFilter: this.props.location.search }),
        React.createElement(RaceFilterLinks, { setFilter: this.setFilter }),
        React.createElement('hr', null),
        React.createElement(RaceTable, { races: this.state.races }),
        React.createElement('hr', null),
        React.createElement(_raceAdd2.default, { createRace: this.createRace })
      );
    }
  }]);

  return RaceListApp;
}(React.Component);

var contentNode = document.getElementById("main");
var NoMatch = function NoMatch() {
  return React.createElement(
    'p',
    null,
    'Page Not Found'
  );
};
/*
const App = (props) => (
  <div>
/*<div className ="header">
  <h1>Topham Racing</h1>
  </div>
  
  <div className ="contents">
    <RaceListApp />
    </div>
  
  <div className ="footer">
    This is the footer.
    </div>
/*</div>


);
*/

var RoutedApp = function RoutedApp() {
  return React.createElement(
    'div',
    { className: 'appframe' },
    React.createElement(
      'h1',
      null,
      'Topham Racing5'
    ),
    React.createElement(
      BrowserRouter,
      { history: browserHistory },
      React.createElement(
        Switch,
        null,
        React.createElement(Route, { exact: true, path: '/races', component: RaceListApp }),
        React.createElement(Route, { path: '/races/:id', component: RaceEdit }),
        React.createElement(Redirect, { exact: true, from: '/', to: '/races' }),
        React.createElement(Route, { path: '*', component: RaceListApp })
      )
    )
  );
};

//ReactDOM.render(<RaceListApp />, contentNode);

ReactDOM.render(React.createElement(RoutedApp, null), contentNode);