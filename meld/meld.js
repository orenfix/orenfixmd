$(document).ready(function() {

$(".ui-slider-handle, .ui-btn").attr("tabindex", "-1");

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

		$("#resultMeld3").html(meld3);
		$("#resultMeld").html(meld);
		$("#resultMeldNa").html(meldna);
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
