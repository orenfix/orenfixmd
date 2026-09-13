$(document).ready(function() {
	function calculate() {
		var initial = Number($("input[name='initial']:checked").val());
		var max = Number($("input[name='max']:checked").val());
		var last = Number($("input[name='last']:checked").val());
		var waitTime = $("input[name='waitTime']:checked").val();
		if (waitTime!=1) { waitTime=0 };
		var afp = $("input[name='afp']:checked").val();
		if (afp!=1) { afp=0 };
		var treatment = $("input[name='treatment']:checked").val();
		if (treatment!=1) { treatment=0 };

		initial=initial.toString();
		max=max.toString();
		last=last.toString();
		treatment=treatment.toString();
		waitTime=waitTime.toString();
		afp=afp.toString();

		var imlCode = initial + max + last;
		var awa = treatment + waitTime + afp;
		$('#imlCode').html(imlCode);
		$('#awa').html(awa);

		var y = 0;
		for ( y in data ) {
			if ( imlCode == data[y].iml && awa == data[y].awa ) {
				var Yr1 = ((data[y].Yr1)*100).toFixed(0);
				var Yr2 = ((data[y].Yr2)*100).toFixed(0);
				var Yr3 = ((data[y].Yr3)*100).toFixed(0);
				$('#Yr1').html(Yr1 + '%').css('color','rgb(65,96,255)');
				$('#Yr2').html(Yr2 + '%').css('color','rgb(65,96,255)');
				$('#Yr3').html(Yr3 + '%').css('color','rgb(65,96,255)');
				$('#error').html('');
				break;
				} else if (max < initial || max < last) {
					$('#Yr1').html('N/A').css('color','red');
					$('#Yr2').html('N/A').css('color','red');
					$('#Yr3').html('N/A').css('color','red');
					$('#error').html('Max cannot be less than Initial or Last');
				} else {
					$('#Yr1').html('N/A').css('color','red');
					$('#Yr2').html('N/A').css('color','red');
					$('#Yr3').html('N/A').css('color','red');
					$('#error').html('Insufficient data to predict');
				}
			}
	};

	$(":radio").change(function() {
		calculate();
	});

	$(":checkbox").change(function() {
		calculate();
	});


	$("#iml").css("display","none");

/***** Turn this on to toggle codes
	$("#risk").click(function() {
		$("#iml").toggle(200,"linear");
	});
*****/

	$( ".selector" ).pagecontainer({
  		defaults: true
	});

	calculate();

});