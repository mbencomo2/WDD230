const lazyLoader =  {
  init() {
    const imagesToLoad = document.querySelectorAll("img[data-src]");

    const options = {
      threshold: .4,
    }

    const loadImages = (image) => {
      image.setAttribute("src", image.getAttribute("data-src"));
      image.onload = () => {
        image.removeAttribute("data-src");
      };
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            loadImages(item.target);
            observer.unobserve(item.target);
          }
        });
      }, options);
      imagesToLoad.forEach((img) => {
        observer.observe(img);
      });
    } else {
      imagesToLoad.forEach((img) => {
        loadImages(img);
      });
    }
  }
}

export default lazyLoader;