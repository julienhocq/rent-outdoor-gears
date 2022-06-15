import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Poppins:wght@300;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700;800&family=PT+Sans:wght@400;700&display=swap');

/* https://www.joshwcomeau.com/css/custom-css-reset/

1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
  /*
    2. Remove default margin
  */
  * {
    margin: 0;
  }
  /*
    3. Allow percentage-based heights in the application
  */
  html, body {
    height: 100%;
    /* font-family: 'PT Sans', sans-serif; */
    font-family:'Inconsolata', monospace;


    /* background-color: #7DE2FE; */
  }
  /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  /*
    6. Improve media defaults
  */
  img, picture, video, canvas, svg {
    /* display: block; */
    max-width: 100%;
  }
  /*
    7. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }
  /*
    8. Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  /*
    9. Create a root stacking context
  */
  #root, #__next {
      // CHANGER LES COULEURS ////**** */
    isolation: isolate;
    --color-primary: #6BBEF2;  
    --color-secondary:#2D9595 ;
    --color-tertiary: #D97652;
    /* --color-light: #E5E5E5;
    --color-complimentary: #DBF2E3;     */
    --color-lightBlue: #E1F3F3;
  }

a:active {
    // CHANGER LA COLOR
    color: #4E4E4E;
}
  
`;
