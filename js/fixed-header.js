const fixedHeader = {
  // DOM ELEMENTS ////////////////////
  header: document.getElementById("header"),
  
  // DATA ////////////////////
  prevScrollpos: window.pageYOffset,
  
  // FUNCTIONS ////////////////////
  // PRIMARY
  toggleScroll() {
    const currentScrollpos = window.pageYOffset;
    this.prevScrollpos > currentScrollpos 
      ? this.displayHeader()
      : this.removeHeader();
    this.prevScrollpos = currentScrollpos;
  },

  // ACTIVATE
  activate() {
    window.addEventListener("scroll", () => {
      this.toggleScroll();
    });
  },

  // SECONDARY
  displayHeader() {
    this.header.dataset.header = "active";
  }, 
  
  removeHeader() {
    this.header.removeAttribute('data-header');
  },
};

export default fixedHeader;
