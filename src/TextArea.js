import React from 'react';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.c = props.className;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    var value = event.target.value;

    if (this.lineCount(value) > 3) {
      return;
    }

    this.setState({value: value});
  }

  lineCount(val) {
    var lines = val.split('\n');
    var count = lines.length;

    lines.forEach((line) => {
      count += Math.floor(line.length / 21);
    });

    return count;
  }

  render() {
    return (
      <textarea wrap="hard"
                rows="3"
                columns="5"
                className={this.props.className}
                value={this.state.value}
                onChange={this.handleChange} />
    );
  }
}

export default TextArea;
