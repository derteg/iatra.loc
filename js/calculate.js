var data = {
	income_iatra : 30, // Доходность
	visit_cost : 2000, // Стоимость визита
	inspection_cost : 800, // Стоимость осмотра и все последующие консультации
	emergency_factor : 1.3, // Коэффициент стоимости экстренного вызова
	visits : { // Количество визитов в год (плановые)
		zero: 8, // Ребенок от 0 до 1
		one: 4, // Ребенок от 1 до 3
		three: 2, // Ребенок от 3 до 7
		seven: 2, // Ребенок от 7 до 18
		adult: 2 // от 18 до 54
	},
	urgent_visits : { // Количество визитов в год (неотложные)
		zero: 2, // Ребенок от 0 до 1
		one: 2, // Ребенок от 1 до 3
		three: 4, // Ребенок от 3 до 7
		seven: 1, // Ребенок от 7 до 18
		adult: 0 // от 18 до 54
	},
	people: {}
}

var children, client, adults;
var now_year = new Date().getFullYear();
var min_year = now_year - 18;
var oldest_year = now_year - 54;

$('#client').change( function(){
	client = Number($(this).val());

	$('.children, .spouse').hide();
	$('.me').show();

	if (client == 2) {
		$('.children').fadeIn();
	} else if (client == 3) {
		$('.spouse').fadeIn();
	} else if (client == 4) {
		$('.children, .spouse').fadeIn();
	} else if (client == 5) {
		$('.children').fadeIn();
		$('.me').fadeOut();
	}
});

$('#children').change( function(){
	children = Number($(this).val());
	$('.two_children, .three_children').hide();
	if (children > 1) {
		$('.change').text('детей');
		$('.two_children').show();
	} else {
		$('.change').text('ребенок');
	}
	if (children == 3) {
		$('.three_children').show();
	}
});


$('#form').submit( function(){

	validate();
	return false;
})

$('#form_2').submit(function(){
	console.log(formArr);
	return formArr
});

$('input').focus(function(){
	$(this).removeClass('error');
});


var validate = function() {
	var valid = true;

	$('input').removeClass('error');

	$('input:visible').each(function(){
		if (!$(this).val().length) {
			$(this).addClass('error');
			valid = false;
		} else if ($(this).hasClass('date') && $(this).val().length != 4) {
			$(this).addClass('error');
			valid = false;
		} else if ($(this).val() < oldest_year && $(this).hasClass('adult')) {
			$(this).addClass('error');
			valid = false;
		} else if ($(this).val() > min_year && $(this).hasClass('adult')) {
			$(this).addClass('error');
			valid = false;
		} else if ($(this).val() < min_year && !$(this).hasClass('adult')) {
			$(this).addClass('error');
			valid = false;
		}
	});

	if (valid == true) {
		calculate();
	}
}

var calculate = function() {

	data.people = {
		zero: 0,
		one: 0,
		three: 0,
		seven: 0,
		adult: 0
	}

	$('input.date:visible').each( function(){
		if ($(this).hasClass('adult')) {
			data.people.adult++
		} else {
			age = now_year - $(this).val()
			if (age == 0) {
				data.people.zero++
			} else if (age >= 1 && age < 3) {
				data.people.one++
			} else if (age >= 3 && age < 7) {
				data.people.three++
			} else if (age >= 7 && age < 18) {
				data.people.seven++
			}
		}
	});

	generateTable();
}

var generateTable = function() {
	var total_visits = data.visits.adult;
	var total_emergency_visits = data.urgent_visits.adult;
	var total_inspection = data.visits.adult;

	$('.tariffs table .generated').remove();

	if (data.people.adult > 1) {
		$('.tariffs table').prepend('<tr class="generated"><td>Супруг(а)</td><td class="number"><span class="changable visits">' + data.visits.adult + '</span></div><div class="arrows"><div class="top"></div><div class="bot"></div></div></td><td class="number"><span class="changable urgent">' + data.urgent_visits.adult + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td></tr>')
		total_emergency_visits = total_emergency_visits + data.urgent_visits.adult;
		total_inspection = total_inspection + data.visits.adult;
	}
	if (data.people.adult > 0) {
		$('.tariffs table').prepend('<tr class="generated"><td>Вы</td><td class="number"><span class="changable visits">' + data.visits.adult + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td><td class="number"><span class="changable urgent">' + data.urgent_visits.adult + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td></tr>')
	}
	if (data.people.seven > 0) {
		total_visits = data.visits.seven;
		for (var i = 0; i < data.people.seven; i++) {
			$('.tariffs table').prepend('<tr class="generated"><td>Ребенок от 7 до 8 лет</td><td class="number"><span class="changable visits">' + data.visits.seven + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td><td class="number"><span class="changable urgent">' + data.urgent_visits.seven + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td></tr>')
			total_emergency_visits = total_emergency_visits + data.urgent_visits.seven;
			total_inspection = total_inspection + data.visits.seven;
		}
	}
	if (data.people.three > 0) {
		 total_visits = data.visits.three;
		for (var i = 0; i < data.people.three; i++) {
			$('.tariffs table').prepend('<tr class="generated"><td>Ребенок от 3 до 7 лет</td><td class="number"><span class="changable visits">' + data.visits.three + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td><td class="number"><span class="changable urgent">' + data.urgent_visits.three + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td></tr>')
			total_emergency_visits = total_emergency_visits + data.urgent_visits.three;
			total_inspection = total_inspection + data.visits.three;
		}
	}
	if (data.people.one > 0) {
		total_visits = data.visits.one;
		for (var i = 0; i < data.people.one; i++) {
			$('.tariffs table').prepend('<tr class="generated"><td>Ребенок от 1 до 3 лет</td><td class="number"><span class="changable visits">' + data.visits.one + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td><td class="number"><span class="changable urgent">' + data.urgent_visits.one + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td></tr>')
			total_emergency_visits = total_emergency_visits + data.urgent_visits.one;
			total_inspection = total_inspection + data.visits.one;
		}
	}
	if (data.people.zero > 0) {
		total_visits = data.visits.zero;
		for (var i = 0; i < data.people.zero; i++) {
			$('.tariffs table').prepend('<tr class="generated"><td>Ребенок от 0 до 1 года</td><td class="number"><span class="changable visits">' + data.visits.zero + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td><td class="number"><span class="changable urgent">' + data.urgent_visits.zero + '</span><div class="arrows"><div class="top"></div><div class="bot"></div></div></td></tr>')
			total_emergency_visits = total_emergency_visits + data.urgent_visits.zero;
			total_inspection = total_inspection + data.visits.zero;
		}
	}

	$('.arrows .top').click(function(){
		var num = $(this).parent().parent().find('.changable').text();
		$(this).parent().parent().find('.changable').text(Number(num) + 1)
		recount();
	})

	$('.arrows .bot').click(function(){
		var num = $(this).parent().parent().find('.changable').text();
		if (Number(num) !=  0) {
			$(this).parent().parent().find('.changable').text(Number(num) - 1)
			recount();
		}
	})

	var total_price = Math.round(((data.visit_cost * total_visits) + (data.inspection_cost * total_inspection) + ((data.visit_cost * data.emergency_factor) * total_emergency_visits) + (total_emergency_visits * data.inspection_cost))/(1-(1*data.income_iatra/100)));
    var total_price_month = Math.round((total_price/12)*0.7);

	$('.tariffs table .total_visits').text(total_visits);
	$('.tariffs table .total_emergency_visits').text(total_emergency_visits);
	$('.tariffs table .total_inspection').text(total_inspection);
	$('.tariffs table .total_price').text(total_price);
    $('.tariffs table .month').text(total_price_month);
	$('.tariffs').fadeIn('200');

	var recount = function() {
		total_visits = data.visits.adult;
		total_inspection = 0;
		total_emergency_visits = 0;
		$(".tariffs .changable.visits").each(function(){
			if (Number($(this).text()) > total_visits) {
				total_visits = Number($(this).text());
			}
			total_inspection = total_inspection + Number($(this).text());
		});

		$(".tariffs .changable.urgent").each(function(){
			total_emergency_visits = total_emergency_visits + Number($(this).text());
		});

		total_price = Math.round(((data.visit_cost * total_visits) + (data.inspection_cost * total_inspection) + ((data.visit_cost * data.emergency_factor) * total_emergency_visits) + (total_emergency_visits * data.inspection_cost))/(1-(1*data.income_iatra/100)));
		total_price_month = Math.round((total_price/12)*0.7);

		$('.tariffs table .total_visits').text(total_visits);
		$('.tariffs table .total_emergency_visits').text(total_emergency_visits);
		$('.tariffs table .total_inspection').text(total_inspection);
		$('.tariffs table .total_price').text(total_price);
		$('.tariffs table .month').text(total_price_month);
	}
}

$('#change_visits').click(function(){
	$('.tariffs .content table .arrows div').show();
	return false;
});