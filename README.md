# drum

Get the AMD module located at `drum.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'Drum': 'drum'
  }
});

require(['react', 'Drum'], function(React, Drum) {

  React.render(React.createElement(Drum), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
