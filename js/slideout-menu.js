const slideoutMenu = {
  // DOM ELEMENTS ////////////////////
  navMain: document.querySelector('header nav'),
  hamburger: document.querySelectorAll('#hamburger'),
  slideout: document.getElementById('slideout'),
  navSlideout: document.querySelector('#slideout nav'),
  overlay: document.querySelector('#overlay'),
  logo: document.querySelector('#logo'),

  // FUNCTIONS ////////////////////
  // PRIMARY
  toggleSlideout() {
    this.onOff 
      ? this.slideIn() 
      : this.slideOut();
  },

  toggleResize() {
    if (window.innerWidth > 700) {
      this.slideIn();
      this.onOff = false;
      document.body.removeAttribute('data-slideout');
    }
  },

  // ACTIVATE
  activate() {
    this.hamburger.forEach((el) =>
      el.addEventListener('click', this.toggleSlideout.bind(this))
    );
    window.addEventListener('resize', this.toggleResize.bind(this));
    this.overlay.addEventListener('click', this.slideIn.bind(this));
    this.navMain.addEventListener('click', (e) => {
      if ((e.target === this.navMain) && this.onOff) {
        this.slideIn();
      }
    });
    
    const links = this.navSlideout.querySelectorAll('a');
    const logoElements = this.logo.querySelectorAll('path, svg');
    const allElements = Array.from(links).concat(Array.from(logoElements));
    allElements.forEach((element) => {
      element.addEventListener('click', () => {
        this.slideIn();
      });
    });

    document.addEventListener('keydown', (e) => {
      const lastLink = links[links.length - 1];
      const hamburger = document.getElementById('hamburger');
      if ((e.target === lastLink && e.key === 'Tab' && !e.shiftKey) || (e.target === hamburger && e.key === 'Tab' && e.shiftKey)) {
        this.slideIn();
      }      
    });
  },
  

  // SECONDARY
  slideOut() {
    this.hamburger.forEach((line) => {
      line.dataset.slideout = 'active';
    });
    this.slideout.dataset.slideout = 'active';
    this.navSlideout.dataset.slideout = 'active';
    document.body.dataset.slideout = 'active';
    this.overlay.dataset.slideout = 'active';
    this.onOff = true;
  },

  slideIn() {
    this.hamburger.forEach((line) => {
      line.removeAttribute('data-slideout');
    });
    this.slideout.removeAttribute('data-slideout');
    this.navSlideout.removeAttribute('data-slideout');
    document.body.removeAttribute('data-slideout');
    this.overlay.removeAttribute('data-slideout');
    this.onOff = false;
  },
};

export default slideoutMenu;
