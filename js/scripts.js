$("#phone").mask("+7 (999) 999-9999");
$(".date, .js-date").mask("9999");
$(".js-card_num").mask("9999 9999 9999 9999", {placeholder: ""});
$(".js-card_month").mask("99");
$(".js-card_cvs").mask("999");
$("#children").selectOrDie();
$("#client").selectOrDie({customClass: "client"});

$(function(){
	$('.height-adjustment').heightAdjustment();
	$('.js-mainpromo_slider').mainpromoSlider();
});

(function($) { 
//create closure
	$.fn.heightAdjustment = function(){
		var maxHeight = 0,
			that = this;
		 
		$(".b-mainpromo_descr_cols-order-item", that).each(function(){
		  if ( $(this).height() > maxHeight ) 
		  {
		    maxHeight = $(this).height();
		  }
		});
		 
		$(".b-mainpromo_descr_cols-order-item").height(maxHeight);
	}
//end of closure
})(jQuery);

(function($) { 
//create closure
	$.fn.mainpromoSlider = function(){
		var that = this;
		 
		that.slick({
			infinite: true,
  			speed: 0,
			fade: true,
  			cssEase: 'linear'
		});
	}
//end of closure
})(jQuery);
