$.fn.rangeslider = function (options) {
  var obj = this;
  var defautValue = obj.attr("value");
  obj.attr("oninput", "updateSlider(this)");
  updateSlider(this);
  return obj;
};

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
  if (percentage % 2 == 0) barWrapper.find(".thumb").text(value * 500);
};

nextParticle = document.all.logo.nextParticle;
nextParticle.width = window.innerWidth;
nextParticle.height = window.innerHeight;

window.onresize = function() {
  nextParticle.width = window.innerWidth;
  nextParticle.height = window.innerHeight;
  nextParticle.start();
};

$("document").ready(function () {
  var navbar = $('.navbar');
  var ul = $('ul.navbar-nav');
  var navbarHeight = navbar.outerHeight();

  $(window).scroll(function () {
    //Set fixed to navbar section
    if ($(this).scrollTop() >= navbarHeight) {
      navbar.css('position', 'fixed');
      navbar.css('width', '100%');
      navbar.css('zIndex', '1');
      navbar.css('background', '#dee2e6');
      ul.css('background', '#dee2e6');
    }
    else {
      navbar.css('position', 'relative');
      navbar.css('background', '#f5f5f5');
      ul.css('background', '#f5f5f5');
    }

  });

  //Slider for calculating amount of money
  $(".slider").rangeslider();

  // Setting offset element for animation 
  $("html,body").on("click", "a[href^='#']", function (e) {
    e.preventDefault();
    let idDiv = $(this).attr("href");
    let divs = $(idDiv).offset().top;
    let finalOffset = divs - navbarHeight;
    if(navbar.offset().top == 0) {
      $("html,body").animate({
        scrollTop: finalOffset - navbarHeight
      }, 1500);
    }
    else {
      $("html,body").animate({
        scrollTop: finalOffset
      }, 1500);
    }
  })

  //Slider image partner 
  $(".cta-img-container").slick({
    centerMode: true,
    centerPadding: "20px",
    speed: 300,
    slidesToShow: 7,
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
    if(index == 16) index = 8
    if(index == 17) index = 9;
    if(index == 18) index = 10; 
    
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
  $('.cta-img').on('click', function(event) {
    event.preventDefault();
    var domElement = $(this);
    setTimeout(() => {
      window.open(domElement.find('a').attr('href'), '_blank');
    }, 1000);
  })
});



