module.exports = {
    content: [
      '../../templates/**/*.html',   // fichiers Django HTML
      '../../**/templates/**/*.html',
      './templates/**/*.html',
      './static/src/**/*.js',       // si tu as des fichiers JS
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  