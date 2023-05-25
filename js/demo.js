import demoControllerHTML from './demoControllerHTML.js';

const demo = {  
  /* DOM ELEMENTS */
  demoContainer: document.getElementById('demo-container'),
  presentationContainer: document.getElementById('presentation-container'),
  presentationWrapper: document.getElementById('presentation-wrapper'),
  presentationWrapperJsActive: null,
  presentationContent: document.getElementById('presentation-content'),
  controllerInput: null,
  controllerLabel: null,
  
  /* DATA */
  demoViewport: {
    min: 320,
    max: 1040,
  },

  controller: {
    min: 210,
  },

  /* FUNCTIONS - PRIMARY */
  initializeDemoAppearance() {
    this.demoContainer.dataset.wrapper = 'gutterless';
    this.presentationContainer.dataset.js = 'active';
    this.presentationWrapper.dataset.js = 'active';
    this.presentationWrapperJsActive = document.querySelector('#presentation-wrapper[data-js="active"]')
    this.presentationContent.dataset.js = 'active';
    this.addController()
    this.controllerLabel = document.querySelector('.b-controller span span');
  },

  calculateViewportWidth() {
    const clampedViewportWidth = Math.max(Math.min(window.innerWidth, this.demoViewport.max), this.demoViewport.min);
    const range = this.demoViewport.max - this.demoViewport.min;
    const normalizedViewportWidth = (clampedViewportWidth - this.demoViewport.min) / range;
    return {
      clampedViewportWidth,
      normalizedViewportWidth
    };
  },

  enablePresentationScaling() {
    const { normalizedViewportWidth } = this.calculateViewportWidth();
    const minTransform = 0.3;
    const maxTransform = 1;
    const newTransform = minTransform + normalizedViewportWidth * (maxTransform - minTransform);
    this.presentationWrapper.style.setProperty('--transform', newTransform);
  },

  screenResize() {    
    const clampedValueFluid = Math.min(
      Math.max(this.controllerInput.value, this.controller.min), 
      parseInt(getComputedStyle(this.presentationContent).getPropertyValue('max-inline-size'))
    );    
    this.presentationWrapper.style.setProperty('inline-size', `${this.controllerInput.value}px`);
    this.presentationWrapper.style.setProperty('--fluid-screen', `${clampedValueFluid}px`);
    this.controllerLabel.textContent = `${this.controllerInput.value}`;
  },

  animateDemoViewport() {
    const startValue = parseInt(this.controllerInput.value);
    const endValue = parseInt(getComputedStyle(this.presentationWrapperJsActive).getPropertyValue('max-inline-size'));
    const duration = 2000;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;
      this.controllerInput.value = Math.round(currentValue);
      this.screenResize();
      if (progress < 1) window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);
  },  

  // FUNCTIONS - ACTIVATE
  activate() {
    this.enablePresentationScaling();
    this.initializeDemoAppearance();
    this.screenResize();
    window.addEventListener('resize', this.enablePresentationScaling.bind(this)); 
    this.controllerInput.addEventListener('input', this.screenResize.bind(this)); 

    this.observeIntersection(demo.controllerLabel, demo.animateDemoViewport.bind(demo));
  },

  // FUNCTIONS - SECONDARY
  addController() {
    const max = parseInt(getComputedStyle(this.presentationWrapperJsActive).getPropertyValue('max-inline-size'));    const val = this.controller.min; /* Animation Start Value */
    const controllerHTML = demoControllerHTML(this.controller.min, max, val);
    this.demoContainer.insertAdjacentHTML('beforeend', controllerHTML);
    this.controllerInput = document.getElementById('controller-input');
  },

  observeIntersection(element, callback) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(element);
        }
      });
    });
  
    observer.observe(element);
  }
};

export default demo;