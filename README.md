#react-drum
In developing state now

----------


##Installing

    npm install react-drum

##Using

    import React from 'react';
    import Drum from 'react-drum';


    class Wrapper extends React.Component {
      render() {
        let options = Array(100).fill().map((x, i) => (
          <div key={i}>{i+1}</div>
        ));
    
        return(
          <Drum toShow={7}>
            {options}
          </Drum>
        )
      }
    }