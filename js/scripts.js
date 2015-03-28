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
	$('.js-make_app-dropdown').appDropdown();
	$('.js-autorize_lnk').loginPopup();
	$('.js-header_topline').removeTopline();
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


(function($){
	$.fn.appDropdown = function(){
		var that = this;

		that.on('click', dropdown);

		function dropdown(){
			var li = $('li', that).not('.current');

			if(that.hasClass('active')){
				that.removeClass('active');
				li.css('display', 'none');
			} else {
				that.addClass('active');
				li.css('display', 'block');

				li.on('click', function(){
					that.find('li').removeClass('current').css('display', 'none');
					$(this).addClass('current').css('display', 'block').parent('ul').prepend(this);
				});
			}
		}
	}
})(jQuery);

(function($){
	$.fn.loginPopup = function(){
		var $lnk = this,
			$popup = $('#login-popup');

		function swiper(){
			var cont = $('.js-swiper');

			cont.on('click', '.l-swiper_text:not(.current)', function(e){
				var that = $(this),
					circle = $('.l-swiper_circle', cont),
					$data = that.attr('data-change');

				$('.l-swiper_text').removeClass('current');
				that.addClass('current');


				$('.b-price_app-form').removeClass('active');
				$('.b-price_app-form.' + $data).addClass('active');

				if($('.l-swiper_text').first().hasClass('current')){
					circle.css({'left': '4px'}, 200);
				} else if($('.l-swiper_text').last().hasClass('current')){
					circle.css({'left': '29px'}, 200);
				}
			});
		}

		$lnk.on('click', function(e){
			e.preventDefault();


			$.ajax({
				url: $lnk.attr('href'),
				method: 'GET',
		        cache: true,
		        async: true,
		        success: function(html){
		        	var $dialog = $(html),
		        		$page = $('.page-main');

		        	$dialog.appendTo('body');
		        	$page.addClass('popup_open');


		        	$dialog.on('click', function(e){
		        		var targetClass = e.target.getAttribute('data-close-popup');

		        		if(e.target == this || targetClass == 'true'){
		        			destroyPopup();
		        		}
		        	});

		        	$(document).keydown(function(e){
		        		if(+e.which == 27){
		        			destroyPopup();
		        		}
		        	});

		        	function destroyPopup(){
		        		$dialog.remove();
		        		$page.removeClass('popup_open');
		        	}

		        	swiper();
		        }
			});
		});
	}
})(jQuery);


(function($){
	$.fn.removeTopline = function(){
		var cont = this;

		cont.on('click', '.b-header_topline-close', function(e){
			e.stopPropagation();

			cont.remove();
		})
	}
})(jQuery);