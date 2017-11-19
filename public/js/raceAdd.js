"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RaceAdd = function (_React$Component) {
  _inherits(RaceAdd, _React$Component);

  function RaceAdd() {
    _classCallCheck(this, RaceAdd);

    var _this = _possibleConstructorReturn(this, (RaceAdd.__proto__ || Object.getPrototypeOf(RaceAdd)).call(this));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(RaceAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
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
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "raceAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "series", placeholder: "Series" }),
          React.createElement("input", { type: "text", name: "race_name", placeholder: "Race Name" }),
          React.createElement("input", { type: "text", name: "race_date", placeholder: "Date" }),
          React.createElement("input", { type: "text", name: "location", placeholder: "Location" }),
          React.createElement("input", { type: "text", name: "category", placeholder: "Category" }),
          React.createElement("input", { type: "text", name: "time", placeholder: "Time" }),
          React.createElement("input", { type: "text", name: "rank", placeholder: "Rank" }),
          React.createElement(
            "button",
            null,
            "Add Race"
          )
        )
      );
    }
  }]);

  return RaceAdd;
}(React.Component);

exports.default = RaceAdd;