$(document).ready(function() {

//MELD-Na CALCULATOR	
	$("#buttonMeld").click(function() {
		$("#outputMeld").addClass("border");
		var inrMeld = parseFloat($("#inrMeld").val());
		var biliMeld = parseFloat($("#biliMeld").val());
		var creatinineMeld = parseFloat($("#creatinineMeld").val());
		var sodiumMeld = parseFloat($("#sodiumMeld").val());
		var dialysis = $("input[name='dialysis']:checked").val();
		var equation = $("input[name='equation']:checked").val();
		if (inrMeld<1) { inrMeld=1 };
		if (biliMeld<1) { biliMeld=1 };
		if (creatinineMeld<1) { creatinineMeld=1 };
		if (creatinineMeld>4) { creatinineMeld=4 };
		if (sodiumMeld<125) { sodiumMeld=125 };
		if (dialysis == "yes") { creatinineMeld=4 };
		var meld = ((0.957*Math.log(creatinineMeld) + 0.378*Math.log(biliMeld) + 1.12*Math.log(inrMeld) + 0.643).toFixed(1))*10;
		if (meld>40) { meld=40 };

		var meldna;
		if (equation=="SRTR") {  //SRTR or UNOS
			if (sodiumMeld>137) { sodiumMeld=137 };
			if (meld<=11) {
				meldna = meld;
				} else {
				meldna = (meld + 1.32*(137-sodiumMeld) - (.033*meld*(137-sodiumMeld))).toFixed(0);
				}
			} else { //NEJM
				if (sodiumMeld>140) { sodiumMeld=140 };
			meldna = (meld - sodiumMeld - (.025*meld*(140-sodiumMeld)) + 140).toFixed(0);
			}

		if (isNaN(inrMeld) || isNaN(biliMeld) || isNaN(creatinineMeld) || isNaN(sodiumMeld)) { 
			$("#inputMeld input[type='number']").css({"border":"none"});
			$("#resultMeld").html("Enter a value").css({"color":"red"});
			$("#resultMeldNa").html("");
			$("#outputMeld").removeClass("border");
			if (isNaN(inrMeld)) { $("#inrMeld").css({"border":"2px solid red"}); }
			if (isNaN(biliMeld)) { $("#biliMeld").css({"border":"2px solid red"}); }
			if (isNaN(creatinineMeld)) { $("#creatinineMeld").css({"border":"2px solid red"}); }
			if (isNaN(sodiumMeld)) { $("#sodiumMeld").css({"border":"2px solid red"}); }
			} else { 
				$("#inputMeld input[type='number']").css({"border":"none"});
				$("#resultMeld").html("<b><small>MELD: </b>" + meld + "</small>").css({"color":"black"});
				$("#resultMeldNa").html("<b>MELD-Na: </b>" + meldna);
			}
	});


//BMI CALCULATOR
//TOGGLE INCHES DISPLAY OFF WHEN CM IS CHOSEN
	function height() {
		if ($("input[name='heightUnits']:checked").val()=="cm") {
			$("#toggleFt").css("display","none");
			$("#toggleCm").css("display","block");
			$("#heightFt").val(NaN);
			$("#heightIn").val(NaN);
			$("#heightFt").css({"border":"none"}); 
			$("#heightIn").css({"border":"none"}); 
			$("#heightCm").css({"border":"none"}); 
				} else {
					$("#toggleFt").css("display","block");
					$("#toggleCm").css("display","none");
					$("#heightCm").val(NaN);
					$("#heightFt").css({"border":"none"}); 
					$("#heightIn").css({"border":"none"}); 
					$("#heightCm").css({"border":"none"}); 
				}
	};

	height();

	$("input[name='heightUnits']").on("click",height);


	$("#buttonBmi").click(function() {
		$("#outputBmi").addClass("border");
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
				var height = (parseInt($("#heightCm").val()))/100;
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

	//Put BMI result into NAFLD Fibrosis Score calculator
		$("#bmiNafld").val(bmi);		

		if (isNaN(weight) || weight==0 || isNaN(height) || height==0) { 
			$("#inputBmi input[type='number']").css({"border":"none"});
			$("#resultBmi").html("Enter a value").css({"color":"red"});
			$("#category").html("");
			$("#outputBmi").removeClass("border");
			
			if (isNaN(weight) || weight==0) { 
				$("#weight").css({"border":"2px solid red"}); 
				$("#normal").css("display","block");
				$("#normal").html("<i>Normal weight for this height is " + idealMinLb + "-" + idealMaxLb + " lb (" + idealMinKg + "-" + idealMaxKg + " kg)<i>");
			}
			if (isNaN(height) || height==0) { 
				$("#heightFt").css({"border":"2px solid red"}); 
				$("#heightIn").css({"border":"2px solid red"}); 
				$("#heightCm").css({"border":"2px solid red"}); 
				$("#normal").css("display","none");
				}
			} else {
				$("#inputBmi input[type='number']").css({"border":"none"});
				$("#resultBmi").html("<b>BMI: </b>" + bmi + " kg/m" + '2'.sup()).css({"color":"black"});
				if (bmi<18.5) {
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
				$("#normal").css("display","block");
				$("#normal").html("<i>Normal weight is " + idealMinLb + "-" + idealMaxLb + " lb (" + idealMinKg + "-" + idealMaxKg + " kg)<i>");
			}
	});
	
//CTP CALCULATOR	
	$("#buttonCtp").click(function() {
		$("#outputCtp").addClass("border");
		var encephalopathy = parseInt($("select[name='encephalopathy'] :selected").val());
		var ascites = parseInt($("select[name='ascites'] :selected").val());
		var biliCtp = parseInt($("select[name='biliCtp'] :selected").val());
		var albCtp = parseInt($("select[name='albCtp'] :selected").val());
		var inrCtp = parseInt($("select[name='inrCtp'] :selected").val());
		var ctpScore = encephalopathy + ascites + biliCtp + albCtp + inrCtp;
		var ctpClass;
		if (ctpScore<7) {
			ctpClass="A";
			} else if (ctpScore<10) {
			ctpClass="B";
			} else {
			ctpClass="C";
			}
		$("#resultCtpScore").html("<b>CTP Score: </b>" + ctpScore);
		$("#resultCtpClass").html("<b>CTP Class: </b>" + ctpClass);
	});
	
//DF CALCULATOR	
	$("#buttonDf").click(function() {
		$("#outputDf").addClass("border");
		var ptDf = parseFloat($("#ptDf").val());
		var control = parseFloat($("#control").val());
		var biliDf = parseFloat($("#biliDf").val());
		var df = (4.6*(ptDf-control) + biliDf).toFixed(0);
		
		if (isNaN(ptDf) || isNaN(control) || isNaN(biliDf)) { 
			$("#inputDf input[type='number']").css({"border":"none"});
			$("#resultDf").html("Enter a value").css({"color":"red"});
			$("#outputDf").removeClass("border");
			if (isNaN(ptDf)) { $("#ptDf").css({"border":"2px solid red"}); }
			if (isNaN(control)) { $("#control").css({"border":"2px solid red"}); }
			if (isNaN(biliDf)) { $("#biliDf").css({"border":"2px solid red"}); }
			} else { 
				$("#inputDf input[type='number']").css({"border":"none"});
				$("#resultDf").html("<b>Discriminant Function: </b>" + df).css({"color":"black"});
			}
	});

//LILLE MODEL CALCULATOR	
	$("#buttonLille").click(function() {
		$("#outputLille").addClass("border");

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

		var r = 3.19 - (0.101*ageLille) + (0.147*albuminSI) + (0.0165*biliEvolution) - (0.206*renal) - (0.0065*bili0SI) - (0.0096*ptLille); 
		var lille = (Math.exp(-r) / ( Math.exp(-r) + 1)).toFixed(3);

		if (lille <0.45) { var riskLille = 85; } else { riskLille = 25; }

		if (isNaN(ageLille) || isNaN(albuminG_dL) || isNaN(bili0Mg_dL) || isNaN(bili7Mg_dL) || isNaN(creatinineMg_dL) || isNaN(ptLille)) { 
			$("#inputLille input[type='number']").css({"border":"none"});
			$("#resultLille").html("Enter a value").css({"color":"red"});
			$("#riskLille").css("display", "none");
			$("#outputLille").removeClass("border");
			if (isNaN(ageLille)) { $("#ageLille").css({"border":"2px solid red"}); }
			if (isNaN(albuminG_dL)) { $("#albuminG_dL").css({"border":"2px solid red"}); }
			if (isNaN(bili0Mg_dL)) { $("#bili0Mg_dL").css({"border":"2px solid red"}); }
			if (isNaN(bili7Mg_dL)) { $("#bili7Mg_dL").css({"border":"2px solid red"}); }
			if (isNaN(creatinineMg_dL)) { $("#creatinineMg_dL").css({"border":"2px solid red"}); }
			if (isNaN(ptLille)) { $("#ptLille").css({"border":"2px solid red"}); }
			} else { 
				$("#inputLille input[type='number']").css({"border":"none"});
				$("#resultLille").html("<b>Lille Model: </b>" + lille).css({"color":"black"});
				$("#riskLille").css("display", "block");
				$("#riskLille").html("<b>Predicted 6-month survival: </b>" + riskLille + "&#37;").css({"color":"black"});
		}
	});

//APRI
	$("#buttonApri").click(function() {
		$("#outputApri").addClass("border");
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
			$("#inputApri input[type='number']").css({"border":"none"});
			$("#resultApri").html("Enter a value").css({"color":"red"});
			$("#riskApri").css("display", "none");
			$("#outputApri").removeClass("border");
			if (isNaN(astApri)) { $("#astApri").css({"border":"2px solid red"}); }
			if (isNaN(astulnApri)) { $("#astulnApri").css({"border":"2px solid red"}); }
			if (isNaN(pltApri)) { $("#pltApri").css({"border":"2px solid red"}); }
			} else { 
				$("#inputApri input[type='number']").css({"border":"none"});
				$("#resultApri").html("<b>APRI: </b>" + apri).css({"color":"black"});
				$("#riskApri").css("display", "block");
				$("#riskApri").html("<b>APRI Prediction: </b>" + apriRisk).css({"color":"black"});
			}

	});


//FIB4
	$("#buttonFib4").click(function() {
		$("#outputFib4").addClass("border");
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
			$("#inputFib4 input[type='number']").css({"border":"none"});
			$("#resultFib4").html("Enter a value").css({"color":"red"});
			$("#riskFib4").css("display", "none");
			$("#outputFib4").removeClass("border");
			if (isNaN(ageFib4)) { $("#ageFib4").css({"border":"2px solid red"}); }
			if (isNaN(astFib4)) { $("#astFib4").css({"border":"2px solid red"}); }
			if (isNaN(altFib4)) { $("#altFib4").css({"border":"2px solid red"}); }
			if (isNaN(pltFib4)) { $("#pltFib4").css({"border":"2px solid red"}); }
			} else { 
				$("#inputFib4 input[type='number']").css({"border":"none"});
				$("#resultFib4").html("<b>FIB4: </b>" + fib4).css({"color":"black"});
				$("#riskFib4").css("display", "block");
				$("#riskFib4").html("<b>FIB4 Prediction: </b>" + fib4Risk).css({"color":"black"});
			}
	});

//NAFLD FIBROSIS SCORE
	$("#buttonNafld").click(function() {
		$("#outputNafld").addClass("border");
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
			$("#inputNafld input[type='number']").css({"border":"none"});
			$("#resultNafld").html("Enter a value").css({"color":"red"});
			$("#fibrosis").css("display", "none");
			$("#outputNafld").removeClass("border");
			if (isNaN(ageNafld)) { $("#ageNafld").css({"border":"2px solid red"}); }
			if (isNaN(bmiNafld)) { $("#bmiNafld").css({"border":"2px solid red"}); }
			if (isNaN(astNafld)) { $("#astNafld").css({"border":"2px solid red"}); }
			if (isNaN(altNafld)) { $("#altNafld").css({"border":"2px solid red"}); }
			if (isNaN(pltNafld)) { $("#pltNafld").css({"border":"2px solid red"}); }
			if (isNaN(albuminNafld)) { $("#albuminNafld").css({"border":"2px solid red"}); }
			} else { 
				$("#inputNafld input[type='number']").css({"border":"none"});
				$("#resultNafld").html("<b>NAFLD Fibrosis Score: </b>" + nafld).css({"color":"black"});
				$("#fibrosis").css("display", "block");
				$("#fibrosis").html("<b>Fibrosis prediction: </b>" + fibrosis).css({"color":"black"});
		}
	});

//NAFLD ACTIVITY SCORE
	$("#buttonNas").click(function() {
		$("#outputNas").addClass("border");
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
	});


//PCRS CALCULATOR
	$("#buttonPcrs").click(function() {
		$("#outputPcrs").addClass("border");
		var tumorSize = parseInt($("input[name='tumorSize']:checked").val());
		var bothLobes = parseInt($("input[name='bothLobes']:checked").val());
		var macroInvasion = parseInt($("input[name='macroInvasion']:checked").val());
		var tumorGrade = parseInt($("input[name='tumorGrade']:checked").val());

		var pcrs = tumorSize + bothLobes + macroInvasion + tumorGrade;

		if (pcrs<=0) {
			var riskPcrs = "Low";
			} else if (pcrs>=3) {
				riskPcrs = "High";
			} else {
				riskPcrs = "Medium";
			}

		$("#resultPcrs").html("<b>PCRS: </b>" + pcrs);
		$("#riskPcrs").html("<b>Risk of HCC recurrence: </b>" + riskPcrs);
	});

//RETREAT CALCULATOR	
	$("#buttonRetreat").click(function() {
		$("#outputRetreat").addClass("border");
		var afp = parseFloat($("#afp").val());
		var microInvasion = $("input[name='microInvasion']:checked").val();
		var tumorNumber = parseFloat($("#tumorNumber").val());
		var largestTumor = parseFloat($("#largestTumor").val());
		var retreat;
		var surveillance;

		if (tumorNumber==0 && isNaN(largestTumor)) {
			largestTumor=0;
		}

		var tumorSum = tumorNumber+largestTumor;

		if (afp<21) {
			retreat=0;
			} else if (afp<100) {
			retreat=1;
			} else if (afp<1000) {
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
			$("#inputRetreat input[type='number']").css({"border":"none"});
			$("#resultRetreat").html("You can't measure a tumor that isn't there!").css({"color":"red"});
			$("#recRetreat").html("");
			$("#outputRetreat").removeClass("border");
			$("#largestTumor").css({"border":"2px solid red"});
			} else if (isNaN(afp) || isNaN(tumorNumber) || (afp<0) || (tumorNumber<0) || (tumorNumber>0 && isNaN(largestTumor)) || (tumorNumber>0 && largestTumor==0) || (largestTumor<0)) {
				$("#inputRetreat input[type='number']").css({"border":"none"});
				$("#resultRetreat").html("Enter a value").css({"color":"red"});
				$("#recRetreat").html("");
				$("#outputRetreat").removeClass("border");
				if (isNaN(afp) || (afp<0)) { $("#afp").css({"border":"2px solid red"}); }
				if (isNaN(tumorNumber) || (tumorNumber<0)) { $("#tumorNumber").css({"border":"2px solid red"}); }
				if ((tumorNumber>0 && isNaN(largestTumor)) || (tumorNumber>0 && largestTumor==0) || (largestTumor<0)) { $("#largestTumor").css({"border":"2px solid red"}); }
				} else { 
					$("#inputRetreat input[type='number']").css({"border":"none"});
					$("#resultRetreat").html("<b>RETREAT score: </b>" + retreat).css({"color":"black"});
					$("#recRetreat").html("<br/><b>Surveillance recommendation: </b><br>" + surveillance).css({"color":"black"});
				}
	});
	

//TRANSFER VALUES FROM ONE CALCULATOR TO ANOTHER

	//BILI
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
	$("#creatinineMeld").blur(function() {
		var creatinineMeld = $("#creatinineMeld").val();
		$("#creatinineMg_dL").val(creatinineMeld);
	});

	$("#creatinineMg_dL").blur(function() {
		var creatinineMg_dL = $("#creatinineMg_dL").val();
		$("#creatinineMeld").val(creatinineMg_dL);
	});	

	//AGE
	$("#ageNafld").blur(function() {
		var ageNafld = $("#ageNafld").val();
		$("#ageLille").val(ageNafld);
		$("#ageFib4").val(ageNafld);
	});

	$("#ageLille").blur(function() {
		var ageLille = $("#ageLille").val();
		$("#ageNafld").val(ageLille);
		$("#ageFib4").val(ageLille);
	});
	$("#ageFib4").blur(function() {
		var ageFib4 = $("#ageFib4").val();
		$("#ageNafld").val(ageFib4);
		$("#ageLille").val(ageFib4);
	});

	//AST
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
	$("#altFib4").blur(function() {
		var altFib4 = $("#altFib4").val();
		$("#altNafld").val(altFib4);
	});

	$("#altNafld").blur(function() {
		var altNafld = $("#altNafld").val();
		$("#altFib4").val(altNafld);
	});

	//PLATELETS
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


});