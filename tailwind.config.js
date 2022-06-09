module.exports = {
  content: [
    // "./public/src/*.html",
    "./views/*.handlebars",
    "./views/**/*.handlebars",
    "*.{html,js}",
  ],
  theme: {
    colors: {
      'google-red': '#de5246'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
