$(document).ready(function() {
	var tabs = $("#inputMeld input");
	var tabslength = tabs.length;
	for (var i=1;i<tabslength;i++) {
		tabs.attr("tabIndex",i);
	}
	
	tabs.keyup(function(e) {
    	if(e.keyCode == 13) {
    		e.preventDefault();
    		var tabindex = $(this).attr("tabindex");
    		tabindex++;
	  		$("[tabindex=" + tabindex + "]").focus();
	  		return false;
    	}
	});

	function calculateMeld() {
		var inrMeld = $("#inrMeld").val();
		var biliMeld = $("#biliMeld").val();
		var creatinine = $("#creatinine").val();
		var sodium = $("#sodium").val();
		var dialysis = $("#dialysis").prop("checked");
		var equation = $("#equation").prop("checked");

		if (dialysis) { creatinine=4 };

		var meld = ((0.957*Math.log(creatinine) + 0.378*Math.log(biliMeld) + 1.12*Math.log(inrMeld) + 0.643).toFixed(1))*10;
		if (meld>40) { meld=40 };

/*
		var meldna;
		if (equation) {  //SRTR or UNOS
			if (sodium>137) { sodium=137 };
			if (meld<=11) {
				meldna = meld;
				} else {
				meldna = (meld + 1.32*(137-sodium) - (.033*meld*(137-sodium))).toFixed(0);
			}
		} else { //NEJM
			meldna = (meld - sodium - (.025*meld*(140-sodium)) + 140).toFixed(0);
		}
*/

		var meldna;
		if (sodium>137) { sodium=137 };
		if (meld<=11) {
			meldna = meld;
		} else {
			meldna = (meld + 1.32*(137-sodium) - (.033*meld*(137-sodium))).toFixed(0);
		}
		
		var probability;
		if (meldna>31) {
			probability = 81;
			} else if (meldna>26) {
				probability = 27;
			} else if (meldna>22) {
				probability = 13;
			} else if (meldna>20) {
				probability = 7;
			} else if (meldna>18) {
				probability = 4;
			} else if (meldna>16) {
				probability = 3;
			} else if (meldna>14) {
				probability = 2;
			} else {
				probability = 1;
			}

		$("#resultMeld").html(meld);
		$("#resultMeldNa").html(meldna);
		$("#probability").html(probability+"&#37;");
	};

	calculateMeld();

	$("#inputMeld").on("change", function() {
		calculateMeld();
	});
		
	$("#dialysis").change(function() {
		calculateMeld();
	});

	$("#equation").change(function() {
		calculateMeld();
	});

	$("input").blur(function() {
		calculateMeld();
	});
	
	$("#inrButtonPlus").bind("touchend",function(e) {
		e.preventDefault();
		var inrMeld = parseFloat($("#inrMeld").val());
		inrMeld=(inrMeld+.1).toFixed(1);
		$("#inrMeld").val(inrMeld).trigger("blur");
	});

	$("#inrButtonPlus").click(function(e) {
		e.preventDefault();
		var inrMeld = parseFloat($("#inrMeld").val());
		inrMeld=(inrMeld+.1).toFixed(1);
		$("#inrMeld").val(inrMeld).trigger("blur");
	});	

	$("#inrButtonMinus").bind("touchend",function(e) {
		e.preventDefault();
		var inrMeld = parseFloat($("#inrMeld").val());
		inrMeld=(inrMeld-.1).toFixed(1);
		$("#inrMeld").val(inrMeld).trigger("blur");
	});

	$("#inrButtonMinus").click(function(e) {
		e.preventDefault();
		var inrMeld = parseFloat($("#inrMeld").val());
		inrMeld=(inrMeld-.1).toFixed(1);
		$("#inrMeld").val(inrMeld).trigger("blur");
	});

	$("#biliButtonPlus").bind("touchend",function(e) {
		e.preventDefault();
		var biliMeld = parseFloat($("#biliMeld").val());
		biliMeld=(biliMeld+.1).toFixed(1);
		$("#biliMeld").val(biliMeld).trigger("blur");
	});

	$("#biliButtonPlus").click(function(e) {
		e.preventDefault();
		var biliMeld = parseFloat($("#biliMeld").val());
		biliMeld=(biliMeld+.1).toFixed(1);
		$("#biliMeld").val(biliMeld).trigger("blur");
	});

	$("#biliButtonMinus").bind("touchend",function(e) {
		e.preventDefault();
		var biliMeld = parseFloat($("#biliMeld").val());
		biliMeld=(biliMeld-.1).toFixed(1);
		$("#biliMeld").val(biliMeld).trigger("blur");
	});

	$("#biliButtonMinus").click(function(e) {
		e.preventDefault();
		var biliMeld = parseFloat($("#biliMeld").val());
		biliMeld=(biliMeld-.1).toFixed(1);
		$("#biliMeld").val(biliMeld).trigger("blur");
	});

	$("#creatinineButtonPlus").bind("touchend",function(e) {
		e.preventDefault();
		var creatinine = parseFloat($("#creatinine").val());
		creatinine=(creatinine+.01).toFixed(2);
		$("#creatinine").val(creatinine).trigger("blur");
	});

	$("#creatinineButtonPlus").click(function(e) {
		e.preventDefault();
		var creatinine = parseFloat($("#creatinine").val());
		creatinine=(creatinine+.01).toFixed(2);
		$("#creatinine").val(creatinine).trigger("blur");
	});

	$("#creatinineButtonMinus").bind("touchend",function(e) {
		e.preventDefault();
		var creatinine = parseFloat($("#creatinine").val());
		creatinine=(creatinine-.01).toFixed(2);
		$("#creatinine").val(creatinine).trigger("blur");
	});

	$("#creatinineButtonMinus").click(function(e) {
		e.preventDefault();
		var creatinine = parseFloat($("#creatinine").val());
		creatinine=(creatinine-.01).toFixed(2);
		$("#creatinine").val(creatinine).trigger("blur");
	});

	$("#sodiumButtonPlus").bind("touchend",function(e) {
		e.preventDefault();
		var sodium = parseFloat($("#sodium").val());
		sodium+=1;
		$("#sodium").val(sodium).trigger("blur");
	});

	$("#sodiumButtonPlus").click(function(e) {
		e.preventDefault();
		var sodium = parseFloat($("#sodium").val());
		sodium+=1;
		$("#sodium").val(sodium).trigger("blur");
	});

	$("#sodiumButtonMinus").bind("touchend",function(e) {
		e.preventDefault();
		var sodium = parseFloat($("#sodium").val());
		sodium-=1;
		$("#sodium").val(sodium).trigger("blur");
	});

	$("#sodiumButtonMinus").click(function(e) {
		e.preventDefault();
		var sodium = parseFloat($("#sodium").val());
		sodium-=1;
		$("#sodium").val(sodium).trigger("blur");
	});

});
