module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      'c343': '343px',
      'c345':'343px',
      'c481': '481px',
      'c440':'440px'
    },
    maxHeight: {
      'c343': '343px',
      'c345':'343px',
      'c481': '481px'
    },
    extend: {
      height:{
        '1xl':'343px',
        '2xl':'345',
        '3xl':'481',
        'c100':'100px'
      },
      width:{
        '1xl':'343px',
        '2xl':'345',
        '3xl':'481'
      },
    },
  },
  plugins: [],
}