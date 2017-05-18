// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/,
      'app.js': /^app/
    }
  },
  stylesheets: { joinTo: 'app.css' }
};

exports.npm = {
  styles: { bootstrap: [ 'dist/css/bootstrap.css' ]}
}

exports.plugins = {
  babel: { presets: ['latest', 'react'] }
};
