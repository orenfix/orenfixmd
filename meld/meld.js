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
		var inr = $("#inr").val();
		var bili = $("#bili").val();
		var creatinine = $("#creatinine").val();
		var sodium = $("#sodium").val();
		var albumin = $("#albumin").val();
		var dialysis = $("#dialysis").prop("checked");
		var sex = $("#sex").prop("checked");

		if (dialysis) { 
			creatinine=4;
			var creatinine3=3;
			}

		if (creatinine>3) { 
			creatinine3=3
		} else {
			creatinine3=creatinine;
		}

		if (sex) { 
			var ifFemale=1;
			} else { 
				ifFemale=0;
			}

		var meld = ((0.957*Math.log(creatinine) + 0.378*Math.log(bili) + 1.12*Math.log(inr) + 0.643).toFixed(1))*10;

		var meldna;
		if (sodium>137) { sodium=137 };
		if (meld<=11) {
			meldna = meld;
		} else {
			meldna = (meld + 1.32*(137-sodium) - (.033*meld*(137-sodium))).toFixed(0);
		}


		var meld3 = (1.33*ifFemale + 4.56*Math.log(bili) + 0.82*(137-sodium) - 0.24*(137-sodium)*Math.log(bili) + 9.09*Math.log(inr) + 11.14*Math.log(creatinine3) + 1.85*(3.5-albumin) - 1.83*(3.5-albumin)*Math.log(creatinine3) + 6).toFixed(0);

/*		var Meld3woAlb = (1.33*ifFemale + 4.56*Math.log(bili) + 0.82*(137-sodium) - 0.24*(137-sodium)*Math.log(bili) + 9.09*Math.log(inr) + 11.14*Math.log(creatinine3) + 6).toFixed(0);
*/
/*
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
*/
		$("#resultMeld3").html(meld3);
		$("#resultMeld3woAlb").html(Meld3woAlb);
		$("#resultMeld").html(meld);
		$("#resultMeldNa").html(meldna);
/*		$("#probability").html(probability+"&#37;"); */
	};

	calculateMeld();

	$("#inputMeld").on("change", function() {
		calculateMeld();
	});
		
	$("#dialysis").change(function() {
		calculateMeld();
	});

	$("#sex").change(function() {
		calculateMeld();
	});

	$("input").blur(function() {
		calculateMeld();
	});
	
	$("#inrButtonPlus").bind("touchend",function(e) {
		e.preventDefault();
		var inr = parseFloat($("#inr").val());
		inr=(inr+.1).toFixed(1);
		$("#inr").val(inr).trigger("blur");
	});

	$("#inrButtonPlus").click(function(e) {
		e.preventDefault();
		var inr = parseFloat($("#inr").val());
		inr=(inr+.1).toFixed(1);
		$("#inr").val(inr).trigger("blur");
	});	

	$("#inrButtonMinus").bind("touchend",function(e) {
		e.preventDefault();
		var inr = parseFloat($("#inr").val());
		inr=(inr-.1).toFixed(1);
		$("#inr").val(inr).trigger("blur");
	});

	$("#inrButtonMinus").click(function(e) {
		e.preventDefault();
		var inr = parseFloat($("#inr").val());
		inr=(inr-.1).toFixed(1);
		$("#inr").val(inr).trigger("blur");
	});

	$("#biliButtonPlus").bind("touchend",function(e) {
		e.preventDefault();
		var bili = parseFloat($("#bili").val());
		bili=(bili+.1).toFixed(1);
		$("#bili").val(bili).trigger("blur");
	});

	$("#biliButtonPlus").click(function(e) {
		e.preventDefault();
		var bili = parseFloat($("#bili").val());
		bili=(bili+.1).toFixed(1);
		$("#bili").val(bili).trigger("blur");
	});

	$("#biliButtonMinus").bind("touchend",function(e) {
		e.preventDefault();
		var bili = parseFloat($("#bili").val());
		bili=(bili-.1).toFixed(1);
		$("#bili").val(bili).trigger("blur");
	});

	$("#biliButtonMinus").click(function(e) {
		e.preventDefault();
		var bili = parseFloat($("#bili").val());
		bili=(bili-.1).toFixed(1);
		$("#bili").val(bili).trigger("blur");
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

	$("#albuminButtonPlus").bind("touchend",function(e) {
		e.preventDefault();
		var albumin = parseFloat($("#albumin").val());
		albumin+=.1;
		$("#albumin").val(albumin).trigger("blur");
	});

	$("#albuminButtonPlus").click(function(e) {
		e.preventDefault();
		var albumin = parseFloat($("#albumin").val());
		albumin+=.1;
		$("#albumin").val(albumin).trigger("blur");
	});

	$("#albuminButtonMinus").bind("touchend",function(e) {
		e.preventDefault();
		var albumin = parseFloat($("#albumin").val());
		albumin-=.1;
		$("#albumin").val(albumin).trigger("blur");
	});

	$("#albuminButtonMinus").click(function(e) {
		e.preventDefault();
		var albumin = parseFloat($("#albumin").val());
		albumin-=.1;
		$("#albumin").val(albumin).trigger("blur");
	});

});
