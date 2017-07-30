import React from 'react';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loader"><span className="hidden">Loading</span></div>
    );
  }
};
