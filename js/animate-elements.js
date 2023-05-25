const animateElements = {
  /* DOM ELEMENTS */
  logo: document.getElementById('logo'),
  navMain: document.querySelector('header nav'),
  
  hamburger: document.querySelectorAll('#hamburger'), /* as logo */
  navSlideout: document.querySelector('#slideout nav'),
  
  // heroElements: document.querySelectorAll('.b-fixed-element'),
  fixedElements: document.querySelectorAll('.b-fixed-element'),

  // MAIN
  about: document.getElementById('about'),
  approach: document.getElementById('approach'),
  result: document.getElementById('result'),
  
  /* DATA */
  animationList: [],

  /* FUNCTIONS - PRIMARY */
  triggerAnimation() {
    console.log('triggerAnimation');
    if 
  },


  /* FUNCTIONS - ACTIVATE */
  activate() {
    this.observeIntersection(this.logo, this.triggerAnimation.bind(this));
    // this.observeIntersection(this.hamburger, this.triggerAnimation.bind(this));
    // this.observeIntersection(thinavSlideout, this.triggerAnimation.bind(this));
    this.observeIntersection(this.about, this.triggerAnimation.bind(this));
    this.observeIntersection(this.approach, this.triggerAnimation.bind(this));
    this.observeIntersection(this.result, this.triggerAnimation.bind(this));
  },

  /* FUNCTIONS - SECONDARY */
  observeIntersection(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(element);
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  },
};

export default animateElements;
