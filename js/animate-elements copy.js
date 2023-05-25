const animateElements = {
  /* DOM ELEMENTS */
  logo: document.getElementById('logo'),
  hamburger: document.querySelectorAll('#hamburger'),
  navMain: document.querySelector('header nav'),
  navSlideout: document.querySelector('#slideout nav'),
  fixedElements: document.querySelectorAll('.b-fixed-element'),

  /* DATA */

  /* FUNCTIONS - PRIMARY */

  /* FUNCTIONS - ACTIVATE */
  activate() {
    this.observeIntersection(this.logo, this.handleIntersection.bind(this, 'logo'));
    this.hamburger.forEach((element) => this.observeIntersection(element, this.handleIntersection.bind(this, 'hamburger')));
    this.observeIntersection(this.navMain, this.handleIntersection.bind(this, 'navMain'));
    this.observeIntersection(this.navSlideout, this.handleIntersection.bind(this, 'navSlideout'));
    this.fixedElements.forEach((element) => this.observeIntersection(element, this.handleIntersection.bind(this, 'fixedElements')));
  },

  /* FUNCTIONS - SECONDARY */
  observeIntersection(element, callback) {
    const options = {
      root: null, // use the viewport as the root
      rootMargin: '0px', // no margin
      threshold: 0.5, // 50% visibility required
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    }, options);

    observer.observe(element);
  },

  handleIntersection(elementName) {
    console.log('Element is visible:', elementName);
    // Perform any desired actions with the visible element
  },
};

export default animateElements;
