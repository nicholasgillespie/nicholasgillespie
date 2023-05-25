const animateElements = {
  /* DOM ELEMENTS */
  logo: document.getElementById('logo'),
  hamburger: document.querySelectorAll('#hamburger'),
  navMain: document.querySelector('header nav'),
  
  navSlideout: document.querySelector('#slideout nav'),
  fixedElements: document.querySelectorAll('.b-fixed-element'),

  /* DATA */
  animationList: [],

  /* FUNCTIONS - PRIMARY */
applyAnimations() {
  this.addAnimation(this.logo, 'fade-in', 0);
  this.addAnimation(this.hamburger[0], 'fade-in', 0);

  const navMainElements = Array.from(this.navMain.querySelectorAll('li'));
  navMainElements.push(this.navMain.querySelector('a.button'));
  navMainElements.forEach((li, index) => {
    this.addAnimation(li, 'slide-down', 100 * (index + 1));
  });

  const divElements = Array.from(document.querySelectorAll('#hero div > *'));
  divElements.forEach((element, index) => {
    this.addAnimation(element, 'slide-up', 100 * (index + navMainElements.length + 2));
  });

  const fixedElements = Array.from(this.fixedElements);
  fixedElements.forEach((element, index) => {
    this.addAnimation(element, 'fade-in', 100 * (index + navMainElements.length + divElements.length + 3));
  });

  this.animationList.forEach((item) => {
    item.element.style.animationDelay = `${item.delay}ms`;
    item.element.classList.add(item.effect);
  });
},


  /* FUNCTIONS - ACTIVATE */
  activate() {
    this.applyAnimations();
  },

  /* FUNCTIONS - SECONDARY */
  addAnimation(element, effect, delay = 0) {
    this.animationList.push({ element, effect, delay });
  },
};

export default animateElements;
