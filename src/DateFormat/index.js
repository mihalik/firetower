import React from "react";
import PropTypes from "prop-types";
import tinytime from "tinytime";

export const formatDate = (date, dateOnly) => {
  const jsd = new Date(date);
  return tinytime(
    dateOnly ? "{Mo}/{DD}/{YY}" : "{Mo}/{DD}/{YY} {h}:{mm}{a}"
  ).render(jsd);
};

export default class DateFormat extends React.Component {
  static propTypes = {
    date: PropTypes.number,
    dateOnly: PropTypes.bool,
  };

  render() {
    const {date, dateOnly} = this.props;
    return <span>{formatDate(date, dateOnly)}</span>;
  }
}
