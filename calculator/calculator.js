$(document).ready(function() {


//BMI CALCULATOR

//TOGGLE INCHES DISPLAY OFF WHEN CM IS CHOSEN
	function height() {
		if ($("input[name='heightUnits']:checked").val()=="cm") {
			$("#heightIn").attr("disabled",true);
			$(".ui-input-text").has("#heightIn").css("display","none");
			$("#heightFt").attr("placeholder","cm");
			$("#heightIn").attr("placeholder","");
//			$("#heightFt").val(NaN);
			$("#heightIn").val("");
			$("#heightFt").removeClass("error");  
			$("#heightIn").removeClass("error");   
				} else {
					$("#heightIn").attr("disabled",false);
					$(".ui-input-text").has("#heightIn").css("display","block");
					$("#heightFt").attr("placeholder","feet");
					$("#heightIn").attr("placeholder","in");
					$("#heightFt").removeClass("error");  
					$("#heightIn").removeClass("error");  
				}
	};

	$("input[name='weightUnits']").change(function() {
		var weightUnits = $("input[name='weightUnits']:checked").val();
		if (weightUnits=="kg") {
			$("input[name='weight']").attr("placeholder","kg");
			} else {
				$("input[name='weight']").attr("placeholder","lb");
			}
	});


	function weight() {
		$("#weight").removeClass("error");  
	};

	height();

	$("input[name='heightUnits']").on("click",function() {
		height();
		weight();
		$("#heightFt").val("");
		$("#heightIn").val("");
		$("#outputBmi").css("display","none");
	});

	$("input[name='weightUnits']").on("click",function() {
		height();
		weight();
		$("#weight").val("");
		$("#outputBmi").css("display","none");
	});

	$("#buttonBmi").click(calculateBmi);
	$("#buttonReverseBmi").click(calculateReverseBmi);

	function calculateBmi() {
		$("#outputBmi").css("display","block");
		$("#outputReverseBmi").css("display","none");
		
		var weightUnits = $("input[name='weightUnits']:checked").val();
		if (weightUnits=="kg") {
			var weight = (parseFloat($("#weight").val()));
			} else {
				var weight = (parseFloat($("#weight").val())/2.2);
			}
		
		var heightUnits = $("input[name='heightUnits']:checked").val();
		if (heightUnits=="ft") {
			var heightFt = parseInt($("#heightFt").val());
			if (isNaN(heightFt)) { heightFt=0 };
			var heightIn = parseInt($("#heightIn").val());
			if (isNaN(heightIn)) { heightIn=0 };
			var height = (heightFt*12 + heightIn)*.0254;
			} else {
				var height = (parseInt($("#heightFt").val()))/100; //Use Ft input box for Cm when Cm is checked
			}

		var height2 = (Math.pow(height,2));
		var bmi = (weight/height2).toFixed(2);
		var idealLb = ((weight-height2*25)*2.2).toFixed(0);
		var idealKg = (weight-height2*25).toFixed(0);
		var obeseLb = ((weight-height2*30)*2.2).toFixed(0);
		var obeseKg = (weight-height2*30).toFixed(0);
		var morbidLb = ((weight-height2*40)*2.2).toFixed(0);
		var morbidKg = (weight-height2*40).toFixed(0);

		var idealMinLb = ((height2*18.5)*2.2).toFixed(0);
		var idealMinKg = (height2*18.5).toFixed(0);
		var idealMaxLb = ((height2*25)*2.2).toFixed(0);
		var idealMaxKg = (height2*25).toFixed(0);
		var Bmi30Lb = ((height2*30)*2.2).toFixed(0);
		var Bmi30Kg = (height2*30).toFixed(0);
		var Bmi40Lb = ((height2*40)*2.2).toFixed(0);
		var Bmi40Kg = (height2*40).toFixed(0);

		$("#bmiNafld").val(bmi);  //Put BMI result into NAFLD Fibrosis Score calculator	

		if (isNaN(weight) || weight==0 || isNaN(height) || height==0) {
			$("#bmi input[type='number']").removeClass("error"); 
			$("#category").html("");
			}
			if ((isNaN(weight) || weight==0) && (isNaN(height) || height==0)) { 
				$("#inputBmi input[type='number']").addClass("error");
				$("#outputBmi").removeClass("border blueborder");
				$("#resultBmi").html("Enter a value").css({"color":"red"});
				$("#normal").css("display","none");
				
			} else if (isNaN(weight) || weight==0) { 
				$("#outputBmi").addClass("border blueborder");
				$("#resultBmi").html("");
				$("#normal").css("display","block");
				$("#normal").html("<i>Normal weight for this height is " + idealMinLb + "-" + idealMaxLb + " lb<br/>(" + idealMinKg + "-" + idealMaxKg + " kg)<i>");
			
			} else if (isNaN(height) || height==0) { 
				$("#heightFt").addClass("error");
				$("#heightIn").addClass("error");
				$("#heightCm").addClass("error");
				$("#outputBmi").removeClass("border blueborder");
				$("#resultBmi").html("Enter a value").css({"color":"red"});
				$("#normal").css("display","none");

			} else {
				$("#bmi input[type='number']").removeClass("error"); 
				$("#outputBmi").addClass("border blueborder");
				$("#resultBmi").html("<b>BMI: </b>" + bmi + " kg/m" + '2'.sup()).css({"color":"black"});
/*				if (bmi<18.5) {
					$("#category").html("<b>Underweight</b>");
				} else if (bmi <25) {
					$("#category").html("<b>Normal weight</b>");
				} else if (bmi <30) {
					$("#category").html("<b>Overweight</b><br>Lose at least " + idealLb + " lb (" + idealKg + " kg) to reach normal weight (<i>" + idealMaxLb + " lb/" + idealMaxKg + " kg)</i>");
				} else if (bmi<40) {
					$("#category").html("<b>Obese</b><br>Lose at least " + obeseLb + " lb (" + obeseKg + " kg) to reach BMI of 30 kg/m" + '2'.sup() + " (<i>" + Bmi30Lb + " lb/" + Bmi30Kg + " kg)</i><br>Lose at least " + idealLb + " lb (" + idealKg + " kg) to reach normal weight (<i>" + idealMaxLb + " lb/" + idealMaxKg + " kg)</i>");
				} else {
					$("#category").html("<b>Morbidly obese</b><br>Lose at least " + morbidLb + " lb (" + morbidKg + " kg) to reach BMI of 40 kg/m" + '2'.sup() + " (<i>" + Bmi40Lb + " lb/" + Bmi40Kg + " kg)</i><br>Lose at least " + obeseLb + " lb (" + obeseKg + " kg) to reach BMI of 30 kg/m" + '2'.sup() + " (<i>" + Bmi30Lb + " lb/" + Bmi30Kg + " kg)</i><br>Lose at least " + idealLb + " lb (" + idealKg + " kg) to reach normal weight (<i>" + idealMaxLb + " lb/" + idealMaxKg + " kg)</i>");
				}
*/
				if (bmi<18.5) {
					$("#category").html("<b>Underweight</b>");
				} else if (bmi <25) {
					$("#category").html("<b>Normal weight</b>");
				} else if (bmi <30) {
					$("#category").html("<b>Overweight</b>");
				} else if (bmi<40) {
					$("#category").html("<b>Obese</b>");
				} else {
					$("#category").html("<b>Morbidly obese</b>");
				}

				$("#normal").css("display","block");
				$("#normal").html("<i>Normal weight is " + idealMinLb + "-" + idealMaxLb + " lb (" + idealMinKg + "-" + idealMaxKg + " kg)<i>");
			}
			return height2;
		};


	//REVERSE BMI CALCULATOR

		function calculateReverseBmi() {
			height2 = calculateBmi();
			var goalBmi = (parseFloat($("#goalBmi").val()));
			var targetWeight_kg = (goalBmi*height2).toFixed(1);
			var targetWeight_lb = (targetWeight_kg*2.2).toFixed(1);

			if (isNaN(goalBmi) || goalBmi==0 || isNaN(height2) || height2==0) { 
				$("#bmi input[type='number']").removeClass("error");
				$("#outputBmi").css("display","none");
				$("#outputReverseBmi").css("display","block");
				$("#outputReverseBmi").removeClass("border blueborder");
				$("#resultReverseBmi").html("Enter a value").css({"color":"red"});

				if (isNaN(goalBmi) || goalBmi==0) {
					$("#goalBmi").addClass("error");
				}

				if (isNaN(height2) || height2==0) {
					$("#heightFt").addClass("error");
					$("#heightIn").addClass("error");
					$("#heightCm").addClass("error");
				}

			} else {
				$("#bmi input[type='number']").removeClass("error");
				$("#outputBmi").css("display","none");
				$("#outputReverseBmi").css("display","block");
				$("#outputReverseBmi").addClass("border blueborder");
				$("#resultReverseBmi").html("<b>Target weight: </b>" + targetWeight_lb + " lb (" + targetWeight_kg + " kg)").css({"color":"black"});
			}
		};
	

//CTP CALCULATOR	

	calculateCtp();
	
	function calculateCtp() {
		var encephalopathy = parseInt($("input[name='encephalopathy']:checked").val());
		var ascites = parseInt($("input[name='ascites']:checked").val());
		var biliCtp = parseInt($("input[name='biliCtp']:checked").val());
		var albCtp = parseInt($("input[name='albCtp']:checked").val());
		var inrCtp = parseInt($("input[name='inrCtp']:checked").val());
		var ctpScore = encephalopathy + ascites + biliCtp + albCtp + inrCtp;
		var ctpClass;
		if (ctpScore<7) {
			ctpClass="A";
			} else if (ctpScore<10) {
			ctpClass="B";
			} else {
			ctpClass="C";
			}
		$("#resultCtp").html("<b>CTP Score: </b>" + ctpScore + "<b>&nbsp; &nbsp; &nbsp; Class: </b>" + ctpClass);
		if (ctpClass=="A") {
			$("#outputCtp").removeClass("redborder blueborder").addClass("border greenborder");
		} else if (ctpClass=="B") {
			$("#outputCtp").removeClass("greenborder redborder").addClass("border blueborder");
		} else {
			$("#outputCtp").removeClass("greenborder blueborder").addClass("border redborder");
		}
	};

	$("#encephalopathy, #ascites, #biliCtp, #albCtp, #inrCtp").change(function() {
		calculateCtp();
	});


//AUDIT-C CALCULATOR	

	function calculateAuditC() {
		var auditc1 = parseInt($("input[name='audit-c-1']:checked").val());
		var auditc2 = parseInt($("input[name='audit-c-2']:checked").val());
		var auditc3 = parseInt($("input[name='audit-c-3']:checked").val());

		if (auditc1==0 || isNaN(auditc1)) {
			$("input[name='audit-c-2']").prop("checked",false);
			$("input[name='audit-c-3']").prop("checked",false);
			$("#audit-c-2and3").css("display","none")
		} else {
			$("#audit-c-2and3").css("display","block")
		}

		var auditcsex = $("input[name='audit-c-sex']:checked").val();
		var auditc2 = parseInt($("input[name='audit-c-2']:checked").val());
		var auditc3 = parseInt($("input[name='audit-c-3']:checked").val());
	//	if (isNaN(auditc1)) { auditc1=0; }
		if (isNaN(auditc2)) { auditc2=0; }
		if (isNaN(auditc3)) { auditc3=0; }
		
		var auditScore = auditc1 + auditc2 + auditc3;
		if (isNaN(auditScore)) {
			$("#resultAuditC").html("");
		} else {
			$("#resultAuditC").html("<b>AUDIT-C: </b>" + auditScore + "<br><br>");
		};

		var auditRecommendation = ", optimal for identifying hazardous drinking or active alcohol use disorders.<br/><br/>Consider follow-up with a more in-depth risk assessment to confirm unhealthy alcohol use (eg, AUDIT) and determine the next steps of care, such as brief behavioral counseling interventions to reduce unhealthy alcohol use.";

		if (auditc1 == 0) {
			$("#outputAuditC").removeClass("redborder").addClass("border greenborder");
			$("#riskAuditC").html("Screening complete");
		} else if ((auditScore < 3) || ((auditScore == 3) && (auditcsex == "male"))) {
			$("#outputAuditC").removeClass("redborder").addClass("border greenborder");
			$("#riskAuditC").html("No problem alcohol use identified");
		} else if ((auditcsex == "male") && (auditScore > 3)) {
			$("#outputAuditC").removeClass("greenborder").addClass("border redborder");
			$("#riskAuditC").html("In men, a score of &ge;4 is considered positive" + auditRecommendation);
		} else if ((auditcsex == "female") && (auditScore > 2)) {
			$("#outputAuditC").removeClass("greenborder").addClass("border redborder");
			$("#riskAuditC").html("In women, a score of &ge;3 is considered positive" + auditRecommendation);
		} else if (isNaN(auditcsex)) {
			if (auditScore == 3) {
				$("#outputAuditC").removeClass("greenborder").addClass("border redborder");
				$("#riskAuditC").html("In women, a score of &ge;3 is considered positive" + auditRecommendation);
			} else if (auditScore > 3) {
				$("#outputAuditC").removeClass("greenborder").addClass("border redborder");
				$("#riskAuditC").html("In women, a score of &ge;3 is considered positive, and in men, a score of &ge;4 is considered positive" + auditRecommendation);
			}
		}

		if  ((((auditcsex !== "male") && (auditScore == 3)) || (auditScore > 3)) && ((auditc2 == 0) && (auditc3 == 0))) {
			var disclaimer = "If the score for Questions 2 and 3 is 0, the patient’s drinking may not necessarily exceed the low risk drinking limits";
			$("#disclaimerAuditC").html("<br><small><i>" + disclaimer + "</i></small>");
		} else {
			$("#disclaimerAuditC").html("");
		}
	};

	$("#audit-c-sex, #audit-c-1, #audit-c-2, #audit-c-3").change(function() {
		calculateAuditC();
		$("input[name='audit-c-2']").checkboxradio("refresh");
		$("input[name='audit-c-3']").checkboxradio("refresh");
	});

//DF CALCULATOR	

	$("#buttonDf").click(function() {
		var ptDf = parseFloat($("#ptDf").val());
		var control = parseFloat($("#control").val());
		var biliDf = parseFloat($("#biliDf").val());
		var df = (4.6*(ptDf-control) + biliDf).toFixed(0);
		
		if (isNaN(ptDf) || isNaN(control) || isNaN(biliDf)) { 
			$("#inputDf input[type='number']").removeClass("error");
			if (isNaN(ptDf)) { $("#ptDf").addClass("error"); }
			if (isNaN(control)) { $("#control").addClass("error"); }
			if (isNaN(biliDf)) { $("#biliDf").addClass("error"); }
			$("#outputDf").removeClass("border greenborder redborder");
			$("#resultDf").html("Enter a value").css({"color":"red"});
			
			} else { 
				$("#inputDf input[type='number']").removeClass("error");
				$("#resultDf").html("<b>Discriminant Function: </b>" + df).css({"color":"black"});
				if (df<32) {
					$("#outputDf").removeClass("redborder").addClass("border greenborder");
				} else {
					$("#outputDf").removeClass("greenborder").addClass("border redborder");
				}
			}
	});


//LILLE MODEL CALCULATOR	

	$("#buttonLille").click(function() {
		var ageLille = parseInt($("#ageLille").val());
		var albuminG_dL = parseFloat($("#albuminG_dL").val());
		var bili0Mg_dL = parseFloat($("#bili0Mg_dL").val());
		var bili7Mg_dL = parseFloat($("#bili7Mg_dL").val());
		var creatinineMg_dL = parseFloat($("#creatinineMg_dL").val());
		var ptLille = parseFloat($("#ptLille").val());

		var albuminSI = albuminG_dL*10;
		var bili0SI = bili0Mg_dL*17.1;
		var bili7SI = bili7Mg_dL*17.1;
		var biliEvolution = bili0SI - bili7SI;
		var creatinineSI = creatinineMg_dL*88.4;
		if (creatinineSI < 115) { var renal = 0; } else { renal = 1; }

		function calculateLille(ageLille,albuminSI,biliEvolution,renal,bili0SI,ptLille) {
			r = 3.19 - (0.101*ageLille) + (0.147*albuminSI) + (0.0165*biliEvolution) - (0.206*renal) - (0.0065*bili0SI) - (0.0096*ptLille); 
			return (Math.exp(-r) / ( Math.exp(-r) + 1)).toFixed(3);
		}

		function reverseLille(ageLille, albuminSI, renal, bili0SI, ptLille) {
			var biliEvolution = (0.2007 - 3.19 + (0.101 * ageLille) - (0.147 * albuminSI) + (0.206 * renal) + (0.0065 * bili0SI) + (0.0096 * ptLille))/0.0165;
			bili7SI = bili0SI-biliEvolution;
			bili7Mg_dL = bili7SI/17.1-0.1;
			return bili7Mg_dL.toFixed(1);
		}

		if (isNaN(ageLille) || isNaN(albuminG_dL) || isNaN(bili0Mg_dL) || isNaN(creatinineMg_dL) || isNaN(ptLille)) { 
			$("#inputLille input[type='number']").removeClass("error purpleborder");
			if (isNaN(ageLille)) { $("#ageLille").addClass("error"); }
			if (isNaN(albuminG_dL)) { $("#albuminG_dL").addClass("error"); }
			if (isNaN(bili0Mg_dL)) { $("#bili0Mg_dL").addClass("error"); }
			if (isNaN(creatinineMg_dL)) { $("#creatinineMg_dL").addClass("error"); }
			if (isNaN(ptLille)) { $("#ptLille").addClass("error"); }
			$("#outputLille").removeClass("border greenborder redborder purpleborder");
			$("#resultLille").html("Enter a value").css({"color":"red"});
			$("#riskLille").css("display", "none");
			
			} else if (isNaN(bili7Mg_dL)) {
				var bili7Mg_dL = reverseLille(ageLille, albuminSI, renal, bili0SI, ptLille);
				$("#inputLille input[type='number']").removeClass("error");
				$("#bili7Mg_dL").addClass("border purpleborder").val(bili7Mg_dL);
				$("#outputLille").removeClass("greenborder redborder").addClass("border purpleborder");
				$("#riskLille").css("display", "none");
				$("#resultLille").html("Day 4 or 7 bilirubin must be<b> &le;" + (bili7Mg_dL) + " mg/dL</b> for a favorable prognosis (Lille &lt;0.45)").css({"color":"black"});
			
			} else { 
				var lille = calculateLille(ageLille,albuminSI,biliEvolution,renal,bili0SI,ptLille);
				if (lille <0.45) { var riskLille = 85; } else { riskLille = 25; }
				$("#inputLille input[type='number']").removeClass("error purpleborder");
				$("#resultLille").html("<b>Lille Model: </b>" + lille).css({"color":"black"});
				$("#riskLille").css("display", "block");
				$("#riskLille").html("<b>Predicted 6-month survival: </b>" + riskLille + "&#37;").css({"color":"black"});
				if (lille<0.45) {
					$("#outputLille").removeClass("noborder redborder purpleborder").addClass("border greenborder");
				} else {
					$("#outputLille").removeClass("noborder greenborder purpleborder").addClass("border redborder");
				}
		};
	});


//APRI

	$("#buttonApri").click(function() {
		var astApri = parseFloat($("#astApri").val());
		var astulnApri = parseFloat($("#astulnApri").val());
		var pltApri = parseFloat($("#pltApri").val());
		var apri = (((astApri/astulnApri)/pltApri)*100).toFixed(2)

		var apriRisk = "";
		if (apri <= .5) { apriRisk = "Low risk of significant fibrosis and cirrhosis";
			} else if (apri <=1) { 
				apriRisk = "Low risk of cirrhosis, indeterminate risk of significant fibrosis"; 
			} else if (apri > 2) { 
				apriRisk = "High risk of significant fibrosis and cirrhosis"; 
			} else if (apri > 1.5) { 
				apriRisk = "High risk of significant fibrosis, indeterminate risk of cirrhosis"; 
			} else apriRisk = "Indeterminate risk of significant fibrosis and cirrhosis"; 

		if (isNaN(astApri) || isNaN(astulnApri) || isNaN(pltApri)) { 
			$("#inputApri input[type='number']").removeClass("error");
			if (isNaN(astApri)) { $("#astApri").addClass("error"); }
			if (isNaN(astulnApri)) { $("#astulnApri").addClass("error"); }
			if (isNaN(pltApri)) { $("#pltApri").addClass("error"); }
			$("#outputApri").removeClass("border blueborder");
			$("#resultApri").html("Enter a value").css({"color":"red"});
			$("#riskApri").css("display", "none");
			
			} else { 
				$("#inputApri input[type='number']").removeClass("error");
				$("#outputApri").addClass("border blueborder");
				$("#resultApri").html("<b>APRI: </b>" + apri).css({"color":"black"});
				$("#riskApri").css("display", "block");
				$("#riskApri").html("<b>APRI Prediction: </b>" + apriRisk).css({"color":"black"});
			}
	});


//FIB4

	$("#buttonFib4").click(function() {
		var ageFib4 = parseFloat($("#ageFib4").val());
		var astFib4 = parseFloat($("#astFib4").val());
		var altFib4 = parseFloat($("#altFib4").val());
		var pltFib4 = parseFloat($("#pltFib4").val());
		var fib4 = ((ageFib4*astFib4)/(pltFib4*(Math.pow(altFib4,.5)))).toFixed(2)

		var fib4Risk = "";
		if (fib4 <1.3) { fib4Risk = "No or moderate fibrosis";
			} else if (fib4 >2.67) { 
				fib4Risk = "Extensive fibrosis or cirrhosis";
			} else fib4Risk = "Indeterminate risk of fibrosis/cirrhosis"; 

		if (isNaN(ageFib4) || isNaN(astFib4) || isNaN(altFib4)|| isNaN(pltFib4)) { 
			$("#inputFib4 input[type='number']").removeClass("error");
			if (isNaN(ageFib4)) { $("#ageFib4").addClass("error"); }
			if (isNaN(astFib4)) { $("#astFib4").addClass("error"); }
			if (isNaN(altFib4)) { $("#altFib4").addClass("error"); }
			if (isNaN(pltFib4)) { $("#pltFib4").addClass("error"); }
			$("#outputFib4").removeClass("border greenborder redborder blueborder");
			$("#resultFib4").html("Enter a value").css({"color":"red"});
			$("#riskFib4").css("display", "none");
			
			} else { 
				$("#inputFib4 input[type='number']").removeClass("error");
				$("#resultFib4").html("<b>FIB4: </b>" + fib4).css({"color":"black"});
				$("#riskFib4").css("display", "block");
				$("#riskFib4").html(fib4Risk).css({"color":"black"});
			if (fib4<1.3) {
					$("#outputFib4").removeClass("redborder blueborder").addClass("border greenborder");
				} else if (fib4>2.67) {
					$("#outputFib4").removeClass("greenborder blueborder").addClass("border redborder");
				} else {
					$("#outputFib4").removeClass("greenborder redborder").addClass("border blueborder");
				}
		};
	});


//NAFLD FIBROSIS SCORE

	$("#buttonNafld").click(function() {
		var ageNafld = parseInt($("#ageNafld").val());
		var bmiNafld = parseFloat($("#bmiNafld").val());
		var diabetes = $("input[name='diabetes']:checked").val();
		var astNafld = parseFloat($("#astNafld").val());
		var altNafld = parseFloat($("#altNafld").val());
		var pltNafld = parseFloat($("#pltNafld").val());
		var albuminNafld = parseFloat($("#albuminNafld").val());

		var nafld = (-1.675 + .037*ageNafld + .094*bmiNafld + 1.13*diabetes + .99*(astNafld/altNafld) - .013*pltNafld - .66*albuminNafld).toFixed(3);
		if (nafld<-1.455) {
			var fibrosis = "F0-F2";
			} else if (nafld>.676) {
				fibrosis = "F3-F4";
			} else {
				fibrosis = "Indeterminate";
			}

		if (isNaN(ageNafld) || isNaN(bmiNafld) || isNaN(astNafld) || isNaN(altNafld) || isNaN(pltNafld) || isNaN(albuminNafld)) {
			$("#inputNafld input[type='number']").removeClass("error");
			if (isNaN(ageNafld)) { $("#ageNafld").addClass("error"); }
			if (isNaN(bmiNafld)) { $("#bmiNafld").addClass("error"); }
			if (isNaN(astNafld)) { $("#astNafld").addClass("error"); }
			if (isNaN(altNafld)) { $("#altNafld").addClass("error"); }
			if (isNaN(pltNafld)) { $("#pltNafld").addClass("error"); }
			if (isNaN(albuminNafld)) { $("#albuminNafld").addClass("error"); }
			$("#outputNafld").removeClass("border greenborder redborder blueborder");
			$("#resultNafld").html("Enter a value").css({"color":"red"});
			$("#fibrosis").css("display", "none");
			
			} else { 
				$("#inputNafld input[type='number']").removeClass("error");
				$("#resultNafld").html("<b>NAFLD Fibrosis Score: </b>" + nafld).css({"color":"black"});
				$("#fibrosis").css("display", "block");
				$("#fibrosis").html(fibrosis).css({"color":"black"});
				if (nafld<-1.455) {
					$("#outputNafld").removeClass("redborder blueborder").addClass("border greenborder");
				} else if (nafld>.676) {
					$("#outputNafld").removeClass("greenborder blueborder").addClass("border redborder");
				} else {
					$("#outputNafld").removeClass("greenborder redborder").addClass("border blueborder");
				}
		}
	});


//NAFLD ACTIVITY SCORE

	calculateNas();

	function calculateNas() {
		var steatosis = parseInt($("select[name='steatosis'] :selected").val());
		var lobular = parseInt($("select[name='lobular'] :selected").val());
		var ballooning = parseInt($("select[name='ballooning'] :selected").val());

		var nas = steatosis + lobular + ballooning;
		if (nas<=2) {
			var activity = "Not diagnostic of NASH";
			} else if (nas>=5) {
				activity = "Diagnostic of NASH";
			} else {
				activity = "Borderline";
			}

		$("#resultNas").html("<b>NAFLD Activity Score: </b>" + nas);
		$("#activity").html(activity);
		if (nas<=2) {
			$("#outputNas").removeClass("redborder blueborder").addClass("border greenborder");
		} else if (nas>=5) {
			$("#outputNas").removeClass("greenborder blueborder").addClass("border redborder");
		} else {
			$("#outputNas").removeClass("greenborder redborder").addClass("border blueborder");
		}
	};

	$("#steatosis, #lobular, #ballooning").change(function() {
		calculateNas();
	});


//RETREAT CALCULATOR

	$("#buttonRetreat").click(function() {
		var afpRetreat = parseFloat($("#afpRetreat").val());
		var microInvasion = $("input[name='microInvasion']:checked").val();
		var tumorNumber = parseFloat($("#tumorNumber").val());
		var largestTumor = parseFloat($("#largestTumor").val());
		var retreat;
		var surveillance;

		if (tumorNumber==0 && isNaN(largestTumor)) {
			largestTumor=0;
		}

		var tumorSum = tumorNumber+largestTumor;

		if (afpRetreat<21) {
			retreat=0;
			} else if (afpRetreat<100) {
			retreat=1;
			} else if (afpRetreat<1000) {
			retreat=2;
			} else {
			retreat=3;
		}
		if (microInvasion=="no") {
			retreat+=0;
			} else {
			retreat+=2;
		}
		if (tumorSum==0) {
			retreat+=0;
			} else if (tumorSum<5) {
			retreat+=1;
			} else if (tumorSum<10) {
			retreat+=2;
			} else {
			retreat+=3;
		}

		if (retreat==0) {
			surveillance="No HCC surveillance required.";
			} else if (retreat<4) {
			surveillance="MRI abdomen with contrast, non-contrast CT chest, and serum AFP every 6 months for 3 years, then AFP alone every 6 months until 5 years post-transplantation"
			} else if (retreat<5) {
			surveillance="MRI abdomen with contrast, non-contrast CT chest, and serum AFP every 6 months for 5 years<br/><br/>Consider adding mTOR inhibitor to immunosuppression regimen"
			} else {
			surveillance="MRI abdomen with contrast, non-contrast CT chest, and serum AFP every 3 months for 2 years, then every 6 months until 5 years post-transplantation<br/><br/>Consider adding mTOR inhibitor to immunosuppression regimen"
		}

		if (tumorNumber==0 && largestTumor>0) {
			$("#inputRetreat input[type='number']").removeClass("error");
			$("#largestTumor").addClass("error");
			$("#outputRetreat").removeClass("border blueborder");
			$("#resultRetreat").html("You can't measure a tumor that isn't there!").css({"color":"red"});
			$("#recRetreat").html("");
			
			} else if (isNaN(afpRetreat) || isNaN(tumorNumber) || (afpRetreat<0) || (tumorNumber<0) || (tumorNumber>0 && isNaN(largestTumor)) || (tumorNumber>0 && largestTumor==0) || (largestTumor<0)) {
				$("#inputRetreat input[type='number']").removeClass("error");
				if (isNaN(afpRetreat) || (afpRetreat<0)) { $("#afpRetreat").addClass("error"); }
				if (isNaN(tumorNumber) || (tumorNumber<0)) { $("#tumorNumber").addClass("error"); }
				if ((tumorNumber>0 && isNaN(largestTumor)) || (tumorNumber>0 && largestTumor==0) || (largestTumor<0)) { $("#largestTumor").addClass("error"); }
				$("#outputRetreat").removeClass("border blueborder");
				$("#resultRetreat").html("Enter a value").css({"color":"red"});
				$("#recRetreat").html("");
				
				} else { 
					$("#inputRetreat input[type='number']").removeClass("error");
					$("#outputRetreat").addClass("border blueborder");
					$("#resultRetreat").html("<b>RETREAT score: </b>" + retreat).css({"color":"black"});
					$("#recRetreat").html("<br/><b>Surveillance recommendation: </b><br>" + surveillance).css({"color":"black"});
				}
	});
	
//GALAD CALCULATOR

	$("#buttonGalad").click(function() {
		var sexGalad = $("input[name='sexGalad']:checked").val();
		var ageGalad = parseFloat($("#ageGalad").val());
		var afpGalad = parseFloat($("#afpGalad").val());
		var afpl3Galad = parseFloat($("#afpl3Galad").val());
		var dcpGalad = parseFloat($("#dcpGalad").val());


//		GALAD Score = -10.08 + 0.09 x A + 1.67 x G + 2.34 log10(AF) + 0.04 x L + 1.33 x log10(D)
		var galad = (-10.08 + 0.09 * ageGalad + 1.67 * sexGalad + 2.34 * Math.log10(afpGalad) + 0.04 * afpl3Galad + 1.33 * Math.log10(dcpGalad)).toFixed(2);

//		Probability of concurrent HCC in this CLD patient = exp(Z) / (1 + exp(Z))
		var probGalad = Math.round((1 / (1 + Math.exp(-galad)))*100);

		var recGalad;
		if (galad<-1.36) {
			recGalad="Normal";
			$("#outputGalad").removeClass("redborder blueborder").addClass("border greenborder");
			} else {
			recGalad="Abnormal";
			$("#outputGalad").removeClass("greenborder blueborder").addClass("border redborder");
		}
		

		if (isNaN(ageGalad) || isNaN(afpGalad) || isNaN(afpl3Galad) || isNaN(dcpGalad) || (afpGalad<=0) || (afpl3Galad<=0) || (dcpGalad<=0)) {
				$("#inputGalad input[type='number']").removeClass("error");
				if (isNaN(ageGalad) || (ageGalad<=0)) { $("#ageGalad").addClass("error"); }
				if (isNaN(afpGalad) || (afpGalad<=0)) { $("#afpGalad").addClass("error"); }
				if (isNaN(afpl3Galad) || (afpl3Galad<=0)) { $("#afpl3Galad").addClass("error"); }
				if (isNaN(dcpGalad) || (dcpGalad<=0)) { $("#dcpGalad").addClass("error"); }
				$("#outputGalad").removeClass("border greenborder redborder blueborder");
				$("#resultGalad").html("Enter a value").css({"color":"red"});
				$("#probGalad").html("");
				} else { 
					$("#inputGalad input[type='number']").removeClass("error");
					$("#outputGalad").addClass("border blueborder");
					$("#resultGalad").html("<b>GALAD: </b>" + galad + "<b> (" + recGalad + ")</b>").css({"color":"black"});
					$("#probGalad").html("<b>Probability of HCC: </b>" + probGalad +"%").css({"color":"black"});
				}
	});


//LAD SCORE CALCULATOR

	$("#buttonLad").click(function() {
		var afpLad = parseFloat($("#afpLad").val());
		var afpl3Lad = parseFloat($("#afpl3Lad").val());
		var dcpLad = parseFloat($("#dcpLad").val());
		var lad =  (-0.3695 + 0.6915 * Math.log10(afpLad) + 0.0414 * afpl3Lad + 1.180 * Math.log10(dcpLad)).toFixed(3);
		var recLad;

		if (lad<0.927) {
			recLad="Continue regular HCC surveillance (eg, AFP, AFP-L3%, and DCP every 3 months, MRI abdomen every 3 months, CT chest every 3-6 months, yearly pelvic imaging)";
			} else {
			recLad="If no viable tumor on MRI or nothing to treat per multidisciplinary hepatobiliary tumor board discussion, then obtain MRI abdomen in 1-2 months and consider full staging scans (CT chest and/or pelvic imaging)<br/><br/>If MRI with indeterminate findings, discuss consideration of additional locoregional therapy at multidisciplinary hepatobiliary tumor board"
		}
			
		if (isNaN(afpLad) || isNaN(afpl3Lad) || isNaN(dcpLad) || (afpLad<=0) || (afpl3Lad<=0) || (dcpLad<=0)) {
				$("#inputLad input[type='number']").removeClass("error");
				if (isNaN(afpLad) || (afpLad<=0)) { $("#afpLad").addClass("error"); }
				if (isNaN(afpl3Lad) || (afpl3Lad<=0)) { $("#afpl3Lad").addClass("error"); }
				if (isNaN(dcpLad) || (dcpLad<=0)) { $("#dcpLad").addClass("error"); }
				$("#outputLad").removeClass("border blueborder");
				$("#resultLad").html("Enter a value").css({"color":"red"});
				$("#recLad").html("");
				
				} else { 
					$("#inputLad input[type='number']").removeClass("error");
					$("#outputLad").addClass("border blueborder");
					$("#resultLad").html("<b>LAD score: </b>" + lad).css({"color":"black"});
					$("#recLad").html("<br/><b>Recommendation: </b>" + recLad).css({"color":"black"});
				}
	});


//TRANSFER VALUES FROM ONE CALCULATOR TO ANOTHER

	//BILI
	//MELD, DF, Lille (Day 0), CTP
	$("#biliMeld").blur(function() {
		var biliMeld = $("#biliMeld").val();
		$("#biliDf").val(biliMeld);
		$("#bili0Mg_dL").val(biliMeld);
		if (biliMeld<2) {
			$("#biliCtp").val("1").change();
			} else if (biliMeld>3) {
			$("#biliCtp").val("3").change();
			} else {
			$("#biliCtp").val("2").change();
		}
	});
	
	$("#biliDf").blur(function() {
		var biliDf = $("#biliDf").val();
		$("#biliMeld").val(biliDf);
		$("#bili0Mg_dL").val(biliDf);
		if (biliDf<2) {
			$("#biliCtp").val("1").change();
			} else if (biliDf>3) {
			$("#biliCtp").val("3").change();
			} else {
			$("#biliCtp").val("2").change();
		}
	});

	$("#bili0Mg_dL").blur(function() {
		var bili0Mg_dL = $("#bili0Mg_dL").val();
		$("#biliMeld").val(bili0Mg_dL);
		$("#biliDf").val(bili0Mg_dL);
		if (bili0Mg_dL<2) {
			$("#biliCtp").val("1").change();
			} else if (bili0Mg_dL>3) {
			$("#biliCtp").val("3").change();
			} else {
			$("#biliCtp").val("2").change();
		}
	});

	//PT/INR	
	//From MELD, Lille, CTP, DF
	$("#inrMeld").blur(function() {
		var inrMeld = $("#inrMeld").val();
		$("#ptLille").val(inrMeld);
		if (inrMeld<1.7) {
			$("#inrCtp").val("1").change();
			} else if (inrMeld>2.3) {
			$("#inrCtp").val("3").change();
			} else {
			$("#inrCtp").val("2").change();
		}
	});

	$("#ptLille").blur(function() {
		var ptLille = $("#ptLille").val();
		if (ptLille < 10) { 
			$("#inrMeld").val(ptLille);
			if (ptLille<1.7) {
				$("#inrCtp").val("1").change();
					} else if (ptLille>2.3) {
					$("#inrCtp").val("3").change();
					} else {
					$("#inrCtp").val("2").change();
			}
			} else {
				$("#ptDf").val(ptLille);
		}
	});

	$("#ptDf").blur(function() {
		var ptDf = $("#ptDf").val();
		$("#ptLille").val(ptDf);
	});

	//ALBUMIN
	//From NFS, Lille, CTP
	$("#albuminNafld").blur(function() {
		var albuminNafld = $("#albuminNafld").val();
		$("#albuminG_dL").val(albuminNafld);
		if (albuminNafld<2.8) {
			$("#albCtp").val("3").change();
			} else if (albuminNafld>3.5) {
			$("#albCtp").val("1").change();
			} else {
			$("#albCtp").val("2").change();
		}
	});

	$("#albuminG_dL").blur(function() {
		var albuminG_dL = $("#albuminG_dL").val();
		$("#albuminNafld").val(albuminG_dL);
		if (albuminG_dL<2.8) {
			$("#albCtp").val("3").change();
			} else if (albuminG_dL>3.5) {
			$("#albCtp").val("1").change();
			} else {
			$("#albCtp").val("2").change();
		}
	});

	//CREATININE
	//From MELD, Lille
	$("#creatinineMeld").blur(function() {
		var creatinineMeld = $("#creatinineMeld").val();
		$("#creatinineMg_dL").val(creatinineMeld);
	});

	$("#creatinineMg_dL").blur(function() {
		var creatinineMg_dL = $("#creatinineMg_dL").val();
		$("#creatinineMeld").val(creatinineMg_dL);
	});	

	//AGE
	//From NFS, Lille, Fib4, GALAD
	$("#ageNafld").blur(function() {
		var ageNafld = $("#ageNafld").val();
		$("#ageLille").val(ageNafld);
		$("#ageFib4").val(ageNafld);
		$("#ageGalad").val(ageNafld);
	});

	$("#ageLille").blur(function() {
		var ageLille = $("#ageLille").val();
		$("#ageNafld").val(ageLille);
		$("#ageFib4").val(ageLille);
		$("#ageGalad").val(ageLille);
	});
	$("#ageFib4").blur(function() {
		var ageFib4 = $("#ageFib4").val();
		$("#ageNafld").val(ageFib4);
		$("#ageLille").val(ageFib4);
		$("#ageGalad").val(ageFib4);
	});

	$("#ageGalad").blur(function() {
		var ageGalad = $("#ageGalad").val();
		$("#ageLille").val(ageGalad);
		$("#ageFib4").val(ageGalad);
		$("#ageNafld").val(ageGalad);
	});

/*
	//SEX
	//From AUDIT-C, GALAD
	$('input[name="audit-c-sex"]').on('change', function() {
		if (this.value == "male") {
			$("#sexGalad-m").prop('checked',true);
			$('#sexGalad').controlgroup('refresh');
		} else if (this.value == "female") {
			$("#sexGalad-f").prop('checked',true);
			$('#sexGalad').controlgroup('refresh');
		}
	});

	$('input[name="sexGalad"]').on('change', function() {
		if (this.value == "1") {
			$("#audit-c-sex-m").prop('checked',true);
			$('#audit-c-sex').controlgroup('refresh');
		} else if (this.value == "0") {
			$("#audit-c-sex-f").prop('checked',true);
			$('#audit-c-sex').controlgroup('refresh');
		}
	});
*/
	
	//AST
	//From APRI, Fib4, NFS
	$("#astApri").blur(function() {
		var astApri = $("#astApri").val();
		$("#astFib4").val(astApri);
		$("#astNafld").val(astApri);
	});

	$("#astFib4").blur(function() {
		var astFib4 = $("#astFib4").val();
		$("#astApri").val(astFib4);
		$("#astNafld").val(astFib4);
	});

	$("#astNafld").blur(function() {
		var astNafld = $("#astNafld").val();
		$("#astFib4").val(astNafld);
		$("#astApri").val(astNafld);
	});

	//ALT
	//From Fib4, NFS
	$("#altFib4").blur(function() {
		var altFib4 = $("#altFib4").val();
		$("#altNafld").val(altFib4);
	});

	$("#altNafld").blur(function() {
		var altNafld = $("#altNafld").val();
		$("#altFib4").val(altNafld);
	});

	//PLATELETS
	//From APRI, Fib4, NFS
	$("#pltApri").blur(function() {
		var pltApri = $("#pltApri").val();
		$("#pltFib4").val(pltApri);
		$("#pltNafld").val(pltApri);
	});

	$("#pltFib4").blur(function() {
		var pltFib4 = $("#pltFib4").val();
		$("#pltApri").val(pltFib4);
		$("#pltNafld").val(pltFib4);
	});

	$("#pltNafld").blur(function() {
		var pltNafld = $("#pltNafld").val();
		$("#pltApri").val(pltNafld);
		$("#pltFib4").val(pltNafld);
	});

	//AFP
	//From RETREAT, GALAD, LAD
	$("#afpRetreat").blur(function() {
		var afpRetreat = $("#afpRetreat").val();
		$("#afpGalad").val(afpRetreat);
		$("#afpLad").val(afpRetreat);
	});

	$("#afpGalad").blur(function() {
		var afpGalad = $("#afpGalad").val();
		$("#afpRetreat").val(afpGalad);
		$("#afpLad").val(afpGalad);
	});

	//AFP-L3%
	//From GALAD, LAD
	$("#afpl3Galad").blur(function() {
		var afpl3Galad = $("#afpl3Galad").val();
		$("#afpl3Lad").val(afpl3Galad);
	});

	$("#afpl3Lad").blur(function() {
		var afpl3Lad = $("#afpl3Lad").val();
		$("#afpl3Galad").val(afpl3Lad);
	});

	//DCP
	//From GALAD, LAD
	$("#dcpGalad").blur(function() {
		var dcpGalad = $("#dcpGalad").val();
		$("#dcpLad").val(dcpGalad);
	});

	$("#dcpLad").blur(function() {
		var dcpLad = $("#dcpLad").val();
		$("#dcpGalad").val(dcpLad);
	});

});