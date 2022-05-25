$(document).ready(function(){
  AOS.init();
  $(".decrypted-1").hide();
  $(".decrypted-2").hide();
  $(".decrypted-3").hide();
  $(".decrypted-4").hide();

  flushResize();

  $(window).resize(function(){
    flushResize();
  });

  var starry = $(".starry img");
  if(starry[0]) {
    starry.first().css('transition', '5s');
    starry.first().css('opacity', '1');
  }

  $('.colorCarousel').carousel({
    interval: 3000
  })

  $('.carousel.carouselForward .carousel-item').each(function(){
      var next = $(this).next();
      if (!next.length) {
      next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
      
      for (var i=0;i<8;i++) {
          next=next.next();
          if (!next.length) {
            next = $(this).siblings(':first');
          }
          
          next.children(':first-child').clone().appendTo($(this));
        }
  });

  $('.carousel.carouselBackward .carousel-item').each(function(){
      var prev = $(this).prev();
      if (!prev.length) {
      prev = $(this).siblings(':last');
      }
      prev.children(':last-child').clone().prependTo($(this));
      
      for (var i=0;i<8;i++) {
          prev=prev.prev();
          if (!prev.length) {
            prev = $(this).siblings(':last');
          }
          
          prev.children(':last-child').clone().prependTo($(this));
        }
  });
});

function startdecrypt(decrypted, encrypted) {
    // Original text, split into an array and reversed (for faster pop())
    var originalText = decrypted.text().split('').reverse();
    var decryptedText = "";
    var i = 0;

    decrypted.text("");

    var shuffleInterval = setInterval(function(){

      // Generate random strings. You can modify the generator function range
      // (Math.random()*(to-from+1)+from);
      var shuffledText = '';
      var j = originalText.length;
      while(j--) {
        shuffledText += String.fromCharCode((Math.random()*94+33) | 0);
        if(j%32){
          shuffledText += " ";
          j--
        }
      };
      // You can also use this generator to use only the remaining letters
      // while(j--) shuffledText += originalText[(Math.random()*j) | 0];

      // On every 10 cycles, remove a character from the original text to the decoded text
      if(i++ % 2 === 0) decryptedText += originalText.pop();

      // Display
      decrypted.text(decryptedText);
      decrypted.show();
      encrypted.text(shuffledText);

      // Stop when done
      if(!shuffledText.length) clearInterval(shuffleInterval);

      flushResize();

    // 50ms looks more dramatic
  },5);
    
  if(decrypted.attr('class') == 'decrypted-2'){
    $('#shop-button').show();
  }
    
  if(decrypted.attr('class') == 'decrypted-4'){
    $('#seed-cta').show();
  }
}

function flushResize(){
    var height = $("#info").height();
    var margin = height * 0.05;
    $(".image-container").height(height - margin);
}