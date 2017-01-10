import React from 'react';
import Drum from './drum';


class Demo extends React.Component {

  constructor() {
    super();
    this.state = {offset: 0}
  }

  syncDrums(e) {
    this.setState({offset: e.offset})
  }

  render() {
    let { offset } = this.state;

    let options = Array(50).fill().map((x, i) => (
      <div key={i}>{i+1}</div>
    ))

    return(
      <div style={{display: 'flex'}}>
        <Drum 
          onOffsetChange={::this.syncDrums} 
          offset={offset}
        >
          {options}
        </Drum>
        <Drum 
          onOffsetChange={::this.syncDrums} 
          offset={offset}
        >
          {options}
        </Drum>
        <Drum 
          onOffsetChange={::this.syncDrums} 
          offset={offset}
        >
          {options}
        </Drum>
      </div>
    )
  }
}


ReactDOM.render(React.createElement(Demo), document.getElementById('main'));