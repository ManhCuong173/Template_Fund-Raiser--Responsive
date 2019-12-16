$.fn.rangeslider = function (options) {
  var obj = this;
  var defautValue = obj.attr("value");
  obj.attr("oninput", "updateSlider(this)");
  updateSlider(this);
  return obj;
};

function removeActiveClass(list, className) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    element.classList.remove(`${className}`);
  }
  return list;
}

function scrollToSection(navbarCollapseItems, navbarHeight) {
  navbarCollapseItems.unbind('click').on('click', function () {
    let idDiv = $(this).find('a').attr('href');
    let divs = $(idDiv).offset().top;
    let finalOffset = divs - navbarHeight;
    if (navbarCollapseItems.offset().top == 0) {
      $("html,body").animate({
        scrollTop: finalOffset - navbarHeight
      }, 1500);
    }
    else {
      $("html,body").animate({
        scrollTop: finalOffset
      }, 1500);
    };
  });

}

function chooseImageForScaling(portfolioItems) {
  for (let index = 0; index < portfolioItems.length; index++) {
    const element = portfolioItems[index];
      element.addEventListener('click', function () {
        let imgSrc = element.getElementsByTagName('img')[0].getAttribute('src');
        let darkBackground = document.getElementById('darkBackgroundAndShowImage');
        darkBackground.style.display = 'block';
        darkBackground.getElementsByTagName('img')[0].setAttribute('src', imgSrc)
        darkBackground.addEventListener('click', function () {
          this.style.display = 'none';
        }, false)
      }, false)
  }
}

function updateSlider(passObj) {
  var obj = $(passObj);
  var value = obj.val();
  var min = obj.attr("min");
  var max = obj.attr("max");
  var range = Math.round(max - min);
  var percentage = Math.round((value - min) * 100 / range);
  var barWrapper = $('.bar-wrapper').find(".bar");
  barWrapper.css("marginLeft", percentage + "%");
  var barProcessedDiv = $('.fcontact-notification-bar').find(".thumb-processed-background ");
  barProcessedDiv.css("width", percentage / 3 * 2.5 + "%");
  barWrapper.find(".thumb").text(value * 500);
};

nextParticle = document.all.logo.nextParticle;
nextParticle.width = window.innerWidth;
nextParticle.height = window.innerHeight;

window.onresize = function () {
  nextParticle.width = window.innerWidth;
  nextParticle.height = window.innerHeight;
  nextParticle.start();
};

function chooseProductItem(productItems) {
    let productItemsStorage = productItems;
  productItems.unbind('click').on('click', function() {
    productItemsStorage = removeActiveClass(productItemsStorage, 'portfolioItemActived');
    $(this).addClass('portfolioItemActived');
    $(this).closest('.our-products').find('.product').css('color', '#1a1a1a')
    $(this).closest('.product').css('color', '#FF9051'); 
  })
  
}

$("document").ready(function () {
  var navbar = $('.navbar');
  var ul = $('ul.navbar-nav');
  var navbarHeight = navbar.outerHeight();
  var productSection = $('.our-products');
  let navbarItems = navbar.find('ul.navbar-nav .nav-item');
  let navbarItemsGetByJS = document.getElementsByClassName('nav-item');

  let serviceSectionOffsetTop = $('.our-services').offset().top;
  let productSectionOffsetTop = productSection.offset().top;
  let technologySectionOffsetTop = $('.section-technology').offset().top;
  let aboutusSectionOffsetTop = $('.our-activities').offset().top;
  let contactFormOffsetTop = $('#footer').offset().top;

  if(navigator.userAgent.search("Firefox") > -1 && $(window).width() < 768 && $(window).width() >= 768) {
    serviceSectionOffsetTop -= 400;
    productSectionOffsetTop -= 400;
    technologySectionOffsetTop -= 400;
    aboutusSectionOffsetTop -= 400;
    contactFormOffsetTop -= 600;
  };
  //Filter type of product showing
  let productEachSection = productSection.find('.product');
  let portfolioSection = $('.portfolio');
  let portfolioItems = $('.portfolio .item');

  chooseImageForScaling(portfolioItems);

  productEachSection.unbind('click').bind('click', function (e) {
    portfolioSection.addClass('scrollDown');

    let dataFilter = $(this).data('filter');
    if (dataFilter == '*') {
      grid.filter('.item');
    } else {
      dataFilter = dataFilter.split('.')[1];
      grid.filter(`.${dataFilter}`);
    }

    let portfolioSectionHeight = $('.allProducts').height();  
    technologySectionOffsetTop += portfolioSectionHeight;
    aboutusSectionOffsetTop += portfolioSectionHeight;
    contactFormOffsetTop += portfolioSectionHeight;
  });

  $(window).scroll(function () {
    //Set fixed to navbar section
    if ($(this).scrollTop() >= navbarHeight) {
      navbar.css('position', 'fixed');
      navbar.css('width', '100%');
      navbar.css('zIndex', '1000');
      navbar.css('background', '#dee2e6');
      ul.css('background', '#dee2e6');
    }
    if ($(this).scrollTop() < navbarHeight) {
      navbar.css('position', 'relative');
      navbar.css('background', '#f5f5f5');
      ul.css('background', '#f5f5f5');
    }
    
    //Set active class to each section in navbar 
    if($(this).scrollTop() < serviceSectionOffsetTop) {
      removeActiveClass(navbarItems, 'active')
      navbarItemsGetByJS[0].classList.add('active');
    }
    else if($(this).scrollTop() > serviceSectionOffsetTop && $(this).scrollTop() <= productSectionOffsetTop) {
      removeActiveClass(navbarItems, 'active')
      navbarItemsGetByJS[1].classList.add('active');
    }
    else if($(this).scrollTop() >= productSectionOffsetTop && $(this).scrollTop() <= technologySectionOffsetTop) {
      removeActiveClass(navbarItems, 'active')
      navbarItemsGetByJS[2].classList.add('active');
    }
    else if($(this).scrollTop() > technologySectionOffsetTop && $(this).scrollTop() <= aboutusSectionOffsetTop) {
      removeActiveClass(navbarItems, 'active')
      navbarItemsGetByJS[3].classList.add('active');
    }
    else if($(this).scrollTop() > aboutusSectionOffsetTop && $(this).scrollTop() <= contactFormOffsetTop) {
      removeActiveClass(navbarItems, 'active')
      navbarItemsGetByJS[4].classList.add('active');
    }
    else {
      removeActiveClass(navbarItems, 'active')
      navbarItemsGetByJS[5].classList.add('active');
    }
  });

  //Slider for calculating amount of money
  $(".slider").rangeslider();

  // Scroll to sections position from navbar 
  scrollToSection(navbarItems, navbarHeight);

  //Slider image partner 
  $(".cta-img-container").slick({
    centerMode: true,
    centerPadding: "20px",
    speed: 300,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: false,
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 340,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });


  $('.slick-slider').on('click', '.slick-slide', function (e) {
    e.stopPropagation();
    var index = $(this).index();
    if (index == 12) index = 6;
    if (index == 13) index = 7;
    if (index == 14) index = 8;

    if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
      $('.slick-slider').slick('slickGoTo', index);
    }
  });



  //Submit form 
  $("#submit").on('click', function (e) {
    var form = $("form")[0];
    name = $("#fname").val();
    email = $("#femail").val();
    phonenumber = $("#fphonenumber").val();
    comment = $("#comment").val();

    if (!name || !email || !phonenumber || !comment) {
      e.preventDefault();
      alertify.error("You need to complete fill in this form");
      return;
    }
  });

  //Handle Slider Image 
  $('.cta-img').on('click', function (event) {
    event.preventDefault();
    var domElement = $(this);
    setTimeout(() => {
      window.open(domElement.find('a').attr('href'), '_blank');
    }, 1000);
  })

  //MuuriJS Actived
  var grid = new Muuri('.grid', {
    dragAxis: 'xy',
    // Default show animation
    showDuration: 300,
    showEasing: 'ease',
    showEasing: 'ease',

    // Default hide animation
    hideDuration: 300,
    hideEasing: 'ease',
  });

  //Active product item 
  let productItems = productSection.find('.product-info')
  chooseProductItem(productItems);
});



