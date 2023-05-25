import fixedHeader from './fixed-header.js';
import slideoutMenu from './slideout-menu.js';
import demo from './demo.js';

const app = {
  initialize() {
    fixedHeader.activate();
    slideoutMenu.activate();
    demo.activate();
  },
}

document.addEventListener('DOMContentLoaded', app.initialize);