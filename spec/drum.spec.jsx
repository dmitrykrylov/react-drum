import React from 'react/addons';
import Drum from '../lib/drum.jsx';

describe('Drum', function() {
  var component;

  beforeEach(function() {
    component = React.addons.TestUtils.renderIntoDocument(
      <Drum/>
    );
  });

  it('should render', function() {
    expect(component.getDOMNode().className).toEqual('drum');
  });
});
