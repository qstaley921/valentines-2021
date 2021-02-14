
const bodyNode = document.querySelector('body');

const onResize = () => {
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;
  return { width, height };
}

const genSVG = (width, height) => {
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 144">
            <defs>
              <style>  
                .cls-1{fill:#fff3df;}.cls-2{fill:#181c26;}.cls-3{fill:#f2c9bb;}.cls-4{fill:#d9a9c8;}.cls-5{fill:#8c7288;}
              </style>
            </defs>
            <rect class="cls-1" width="216" height="144"/>
            <polygon class="cls-2" points="212.7 144 104.7 144 0 75.5 0 75.4 6.6 76.5 6.6 76.5 212.7 144"/>
            <polygon class="cls-3" points="0 75.4 108 144 216 144 0 75.4"/>
            <polygon class="cls-4" points="0 75.4 216 144 216 137.1 0 75.4"/>
            <polygon class="cls-5" points="0 75.4 216 137.1 216 111.8 0 75.4"/>
          </svg>`;
}

window.addEventListener('resize', () => {
  console.log(`The width is ${onResize().width}`);
  console.log(`The height is ${onResize().height}`);
});