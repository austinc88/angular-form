var app = angular.module('myApp', ['ja.qr'])
  .controller('myCtrl', function($scope, datePicker) {
  	var currentTime = new Date().toLocaleDateString('en-US', {  
	    day : 'numeric',
	    month : 'numeric',
	    year : 'numeric'
	})
    $scope.image = true;
    angular.element(document).ready(function () {
        $scope.imgData  = $('qr').find('img').attr('ng-src');
    });
    $scope.patientname = "";
	  $scope.date = currentTime;
    $scope.institution = "";
    $scope.department = -1;
    $scope.contact = {
    	name : "",
    	tel : "",
    	email : ""
    };
    $scope.indication = "";
    $scope.preop = {
    	mallampati: -1,
    	thyromental: -1,
      mouth: -1,
    	tongue: -1,
    	neck: -1,
    	radiation: -1,
    	congenital: -1,
    	aspiration: -1,
    	bmi: -1
    };
    $scope.bag = -1;
    $scope.att1 = {
    	device: "",
    	comments: "",
    	success: -1
    };
    $scope.att2 = {
    	device: "",
    	comments: "",
    	success: -1
    };
    $scope.att3 = {
    	device: "",
    	comments: "",
    	success: -1
    };
    $scope.further = "";

    $scope.resetPreOP = function() {
      $scope.preop = {
        mallampati: -1,
        thyromental: -1,
        mouth: -1,
        tongue: -1,
        neck: -1,
        radiation: -1,
        congenital: -1,
        aspiration: -1,
        bmi: -1
      };
    };

    $scope.toValue = function() {
      return [$scope.date, $scope.institution, $scope.department, $scope.contact.name, $scope.contact.tel, 
      	$scope.contact.email, $scope.indication, $scope.preop.mallampati, $scope.preop.thyromental, $scope.preop.mouth, $scope.preop.tongue, $scope.preop.neck,
      	$scope.preop.radiation, $scope.preop.congenital, $scope.preop.aspiration, $scope.preop.bmi, $scope.bag, $scope.att1.device,
      	 $scope.att1.comments, $scope.att1.success, $scope.att2.device, $scope.att2.comments, $scope.att2.success, $scope.att3.device, 
      	 $scope.att3.comments, $scope.att3.success, $scope.further].join(',');
    } 

    $scope.generatePDF = function() {
        var pdf = new jsPDF();
        pdf.setFontSize(12);
        pdf.setFont("times");
        pdf.text(20,40, 'Dear ' + $scope.patientname + ',');

        pdf.text(20,50, 'As we discussed during our hospitalization, you needed to have a breathing tube to be placed in your');
        pdf.text(20,55, 'windpipe to deliver oxygen to your lungs, heart, brain and other vital organs. When the breathing tube');
        pdf.text(20,60, 'was inserted, it was difficult to place the breathing tube in your windpipe. This is referred to as a');
        pdf.text(20,65, '\"Difficult Airway\".');

        pdf.text(20,75, 'Now that we know that you have a \"Difficult Airway\", it is important that you do the following to help');
        pdf.text(20,80, 'protect yourself.');    

        pdf.text(20,90, '1. Tell your primary care physician or family doctor that you have a \"Difficult Airway\".'); 
        pdf.text(20,95, '2. Tell your family and others of your choosing that you have a \"Difficult Airway\" in case they need to'); 
        pdf.text(20,100, 'provide this information on your behalf.'); 
        pdf.text(20,105, '3. If you are to have surgery, tell your anesthesiologist that you have a \"Difficult Airway\". Show your');
        pdf.text(20,110, 'anesthesiologists the attached form that contains all the medical details needed to manage your difficult');
        pdf.text(20,115, 'airway.');
        pdf.text(20,120, '4. You are strongly advised to enroll in the The MedicAlert Foundation\'s Registry for Difficult');
        pdf.text(20,125, 'Airway/Intubation.');
        pdf.text(30,135, 'a. Fill out the MedicAlert Foundation application for enrollment and send a copy of the');
        pdf.text(30,140, '\"Difficult Airway\" information form and membership fee along with it.'); 
        pdf.text(30,145, 'b. After you enroll, you will receive an ID number, wallet card with the MedicAlert Foundation'); 
        pdf.text(30,150, 'toll-free phone number, and a custom engraved \"Difficult Airway/I\" metal emblem on a'); 
        pdf.text(30,155, 'necklace or bracelet.'); 
        pdf.text(30,160, 'c. Your \"DIFFICULT AIRWAY\" information will be in the Registry at the MedicAlert Foundation,'); 
        pdf.text(30,165, 'which has safeguards for patient confidentiality.'); 
        pdf.text(30,170, 'd. In an emergency or if you have surgery, your \"DIFFICULT AIRWAY\" information can be'); 
        pdf.text(30,175, 'accessed by your health care provider or any provider 24 hours a day, 7 days a week, at no'); 
        pdf.text(30,180, 'charge.'); 

        pdf.text(20,190, 'I have informed you of your \"Difficult Airway\" because it is extremely important that you are aware of');  
        pdf.text(20,195, 'the difficulties in placing a breathing tube. Please keep this letter in a safe place for future reference.');        
        pdf.text(20,200, 'Or, use the electronic app as an alternative.'); 

        pdf.addPage();

        pdf.setFontSize(16);
        pdf.setFontType("bold");
        pdf.text(20,20, "Difficult Intubation Event Details:");

        pdf.setFontSize(12);
        pdf.setFontType("normal");
        pdf.text(20,30, "Date: " + $scope.date);
        pdf.text(20,35, "Institution: " + ($scope.institution === "" ? "N/A" : $scope.institution));
        var getDepartment = function() {
          var dep = $scope.department;
          if (dep <= -1 || dep > 3)
            return "Undefined";
          else if (dep === 0)
            return "Anesthesia";
          else if (dep === 1)
            return "Emergency";
          else if (dep === 2)
            return "Intensive Care";
          else if (dep === 3)
            return "Other";
        };
        var department = "Department: " + getDepartment();
        pdf.text(20,40, department);

        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(20,50, "Contact");

        pdf.setFontSize(12);
        pdf.setFontType("normal");
        pdf.text(20,55,"Name: "+ ($scope.contact.name === "" ? "N/A" : $scope.contact.name));
        pdf.text(20,60,"Telephone Number: "+ ($scope.contact.tel === "" ? "N/A" : $scope.contact.tel));
        pdf.text(20,65,"Email: "+ ($scope.contact.email === "" ? "N/A" : $scope.contact.email));

        pdf.text(20,75, "Indication for Airway Management: " + ($scope.indication === "" ? "N/A" : $scope.indication));

        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(20,85, "Pre-OP Physical Characteristics:");

        pdf.setFontSize(12);
        pdf.setFontType("normal");

        var getMallampati = function() {
          var mallampati = $scope.preop.mallampati;
          if (mallampati <= -1 || mallampati > 3)
            return "N/A";
          else if (mallampati === 0)
            return "I";
          else if (mallampati === 1)
            return "II";
          else if (mallampati === 2)
            return "III";
          else if (mallampati === 3)
            return "IV";
        };

        var getThyromental = function() {
          if ($scope.preop.thyromental < 0 || $scope.preop.thyromental > 1) {return "N/A"}
          return ($scope.preop.thyromental === 0 ? "Yes" : "No")
        };

        var getMouth = function() {
          if ($scope.preop.mouth < 0 || $scope.preop.mouth > 1) {return "N/A"}
          return ($scope.preop.mouth === 0 ? "Yes" : "No")
        };

        var getTongue = function() {
          if ($scope.preop.tongue < 0 || $scope.preop.tongue > 1) {return "N/A"}
          return ($scope.preop.tongue === 0 ? "Yes" : "No")
        };

        var getNeck = function() {
          if ($scope.preop.neck < 0 || $scope.preop.neck > 1) {return "N/A"}
          return ($scope.preop.neck === 0 ? "Yes" : "No")
        };

        var getRadiation = function() {
          if ($scope.preop.radiation < 0 || $scope.preop.radiation > 1) {return "N/A"}
          return ($scope.preop.radiation === 0 ? "Yes" : "No")
        };

        var getCongenital = function() {
          if ($scope.preop.congenital < 0 || $scope.preop.congenital > 1) {return "N/A"}
          return ($scope.preop.congenital === 0 ? "Yes" : "No")
        };

        var getAspiration = function() {
          if ($scope.preop.aspiration < 0 || $scope.preop.aspiration > 1) {return "N/A"}
          return ($scope.preop.aspiration === 0 ? "Yes" : "No")
        };

        var getBMI = function() {
          if ($scope.preop.bmi < 0 || $scope.preop.bmi > 1) {return "N/A"}
          return ($scope.preop.bmi === 0 ? "Yes" : "No")
        };

        pdf.text(30,90, "Mallampati Score: " + getMallampati());
        pdf.text(30,95, "Thyromental Distance < 6 cm: " + getThyromental());
        pdf.text(30,100, "Mouth Opening < 3  Fingerbreadths: " + getMouth());
        pdf.text(30,105, "Large Tongue: " + getTongue());
        pdf.text(30,110, "Neck Mobility Reduced: " + getNeck());
        pdf.text(30,115, "Radiation/Surgery to Head or Neck: " + getRadiation());
        pdf.text(30,120, "Congenital Abnormality: " + getCongenital());
        pdf.text(30,125, "Increased Aspiration Risk: " + getAspiration());
        pdf.text(30,130, "Raised BMI: " + getBMI());

        var getBag = function() {
          var bag = $scope.bag;
          if (bag <= -1 || bag > 3)
            return "N/A";
          else if (bag === 0)
            return "Easy";
          else if (bag === 1)
            return "With Oropharyngeal Airway";
          else if (bag === 2)
            return "With Nasal Airway";
          else if (bag === 3)
            return "Two person technique";
          else if (bag === 4)
            return "Unsuccessful";
        }

        pdf.text(20,140, "Bag Mask Ventilation: " + getBag());

        pdf.setFontSize(14);
        pdf.setFontType("bold");

        pdf.text(20,150, "Sequence of Events");
        pdf.text(20,160, "Attempt 1");
        pdf.setFontSize(12);
        pdf.setFontType("normal");
        pdf.text(20,165, "Device Used: " + ($scope.att1.device === "" ? "N/A" : $scope.att1.device));
        pdf.text(20,170, "Comments: " + ($scope.att1.comments === "" ? "N/A" : $scope.att1.comments));

        var getAtt1Success = function() {
          if ($scope.att1.success < 0 || $scope.att1.success > 1) {return "N/A"}
          return ($scope.att1.success === 0 ? "Yes" : "No")
        };

        pdf.text(20,175, "Successful: " + getAtt1Success());

        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(20,185, "Attempt 2");
        pdf.setFontSize(12);
        pdf.setFontType("normal");
        pdf.text(20,190, "Device Used: " + ($scope.att2.device === "" ? "N/A" : $scope.att2.device));
        pdf.text(20,195, "Comments: " + ($scope.att2.comments === "" ? "N/A" : $scope.att2.comments));

        var getAtt2Success = function() {
          if ($scope.att2.success < 0 || $scope.att2.success > 1) {return "N/A"}
          return ($scope.att2.success === 0 ? "Yes" : "No")
        };

        pdf.text(20,200, "Successful: " + getAtt2Success());

        pdf.setFontSize(14);
        pdf.setFontType("bold");
        pdf.text(20,210, "Attempt 3");
        pdf.setFontSize(12);
        pdf.setFontType("normal");
        pdf.text(20,215, "Device Used: " + ($scope.att3.device === "" ? "N/A" : $scope.att3.device));
        pdf.text(20,220, "Comments: " + ($scope.att3.comments === "" ? "N/A" : $scope.att3.comments));

        var getAtt3Success = function() {
          if ($scope.att3.success < 0 || $scope.att3.success > 1) {return "N/A"}
          return ($scope.att3.success === 0 ? "Yes" : "No")
        };

        pdf.text(20,225, "Successful: " + getAtt3Success());

        pdf.text(20,235, "Further Comments: " + ($scope.further === "" ? "N/A" : $scope.further));

        var test = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAAXNSR0IArs4c6QAAH1RJREFUeAHtnYGuHDmuQzcP8/+/nBdhVpnT3KJaXd1J5hpsYNeyRFI2C0a5Mzc33/7zn/98//G/X/L5/v0f6W/fvv3swfzP5H8D4rTm5pOe47DPlk8OdclXzFRrDWI61yP1iGO+sKw1t0bFseZiaimfNfIVxxo5DkcMuRU7juI286mP40/97+jd6eM42/z/bYHBxYE48HUdyEH/us8uK48Dawf+IvLda8h0xWGfLW67HqdHvsNwXc9i6hFLbYch/lm80Zv6OD7z0xqI0z6upjjqk8P8lkOc06Lu3Zja7Kl6rkb+xCHOaRV/qqn+1Zx98ka/cii5OHCYAznohz3QbCcOXDnwcHUngK995jXeXi8cbuoz1biOjbZinDbzWw5x5NcaWWNMHGPlcJ/EUYsY5W85xFFP8+zLGvPk63q05uaTXnMUw/U0RscJo3rKfWX+Sa3qO62b63J980anS4njwKEO5KAf+mCzrThAB3LQ6UbiOHCoA/Y7+qf3y+8Y/B7BuHoSt12D46j2Vm+Do7brrzrEka+4zZxain9Xe8snjuthXtdGnNY4dxouT27FDqf9tzjVv5o7rSvs787ljf67HU+/OPAHHMhB/wOmp2Uc+N0O/LarO681vD4xX5vXeRtCTud63HAUwzm1Xb579UhO567GDW6DudJ2OepN+2Fto+Uwmmd/rW3nn9DoXtTSPU+15utIjtb+rfO80f+tTybrigMfdCAH/YNmRioO/FsdsFd3veL8mzawXduvxPH6tu1DDv1UPnFaax4xnbsaJxxrro/LVy/HZ75wk0bV66Ocv7Pz/290S2HCTbW5+/9WqaX7Ye1/mc8z7/LzRn/ucRBx4Ms7kIP+5R9hNhAHnjvwcHXX68Zz+h5BbV5DmC81V3P5X8nZ7+4f5LSff1CP0cRhjR48KvwZ33QNm/m/eT9ubczXHvkctPZJD+5ou/55oztnko8DBzmQg37Qw8xW4oBzIAfdOZN8HDjIgb/4feNP7OtOf+W8+12GepPWVGvvqNW5T41Tf9burIGcd7Wm/bLPhHu35vponnvd9iSHesxPWuQQ5/LE3I3zRr/rXHhx4As5kIP+hR5WlhoH7jrwF68bvDowr+JbHHnkMH+nj2rpvPWprRhXI46Y0nQ1xXX/T4/sr9pcA2NyGBff4VT73Tn7bLXucDbaky79IY557fFJHLWqj+tLnGJY41rzRqcbiePAoQ7koB/6YLOtOEAHHn4yjgW9ErDG68EW5zjKJ44x+2tMHPUYK8fNqeUwr+S5BmozJmarTX5x7miwF/WoxfzUR3HUph7z5DhM4YkjX+MtTnlXc67nE7p39NiXfMa6dlfLG12dyjwOHOhADvqBDzVbigPqwMMPzLirgpI4J4f5it01YuJQY8snjtour2tzHK5FY6fNfHGorRpuTo7qNcflq05+4++O2ofaWnu1x8RnH6erfMdRnNO7k6c2+zN/R3fisI/iXN+80dWpzOPAgQ7koB/4ULOlOKAO5KCrI5nHgQMd+PZjT9+v9qV3ffe9QHHUImfCOQ7zjFXrq/Thurlm7q1i4lgjRzFTrTWI0T5aa8406hoc1ml/mu/6cF1Tzw2fWhpTe9IijhoThzjGquU08kana4njwKEO5KAf+mCzrThAB+xPxhE0xe6qoBzieN1gXjl35tSb+rDGPuQzr/EW5/q4vPbZzqnHtTF/R0s51GZM3NSTNcen1t2Yfaix7en4pUWNCce+xG355FCLfOY1Jj9vdHUn8zhwoAM56Ac+1GwpDqgDDz8Zx+J0PeCVgJxt/K628t16iHOYWrPDMV84arDm8pN21fpDrc5djexzVe8ccdRmvrHPRvILu9FQzrMeV/VNnyveVY7rmXSJu9LpHDW2nC2ue+hI/p3+eaOro5nHgQMdyEE/8KFmS3FAHbj1p+7vXiN0EZs5e27winmXr3qfnPMqVrpcq9Y+2XfTZ+q/4dd6qUHOdi/kTFqsUdvlC7PRVj452z7Ekc9Y+5Djai5fXGrnjU43E8eBQx3IQT/0wWZbcYAO5KDTjcRx4FAH7Hf06e7vvLjDUS1+r2CN2g5TeNa2HPbZxk6beV0P18Y+ytF5Y8l3GO054Vp3GtmzcNRjrLhJ86pGraq/q+f42kfnvTbmnVZjN+MdDXK4nk2/wpCTN/rWteDiwBd2IAf9Cz+8LD0ObB14uLrzqqACvAZorefv8kuHfSa97jmN5FNXOcSxNnGIm2KnwZ6MVcvxFefmkzY5xLEn48JvcRttYqaYa3D9i88a9chn/hMxtdmf+erDOXFcg8sXZqpRg32YzxudbiSOA4c6kIN+6IPNtuIAHXi4urPgrgCFcdcI5RDHmH3uxNrHaUw4rmfCUZsc5qeYnG0f6jk+84XfaG8w7P0s5hombdbIoT4xzGtMnGpNNdXpuWp0/s54pz852nOzti0/b3R1N/M4cKADOegHPtRsKQ6oA/a3wCqQc3dd0KsGcVqjnovJd5jKb7QnLce/w9F1UoN9XF75nJPDfMUb7S1ftV+dax+uzWkphzjyiWOe+Ckmv3BOQ3GT5lVNdTd6yrnS1dykS7280dW5zOPAgQ7koB/4ULOlOKAO5KCrI5nHgQMdePjPa9N93+2d3wO2/AlHPcbsP/GJm2JqU495xpPWVKOG68P8VktxWw3y3l0b+U638lwbOS6vHOLYR2Pitn1U49U5+2y55HDNjEvL4diHmMqrRmPzRm8nMsaBgx3IQT/44WZrcaAdsL/uuQE96hWh8xwV464R5Hwi/mQfaul+3FrvcJxW5dmX2ownvqtRtzDU05rTcHlqKYbaxLm88jknh/mKp5pir+bbtbk+5Ku+4xC3wRBfsfakBmt5o6tzmceBAx3IQT/woWZLcUAdePjJOL7qFfjunFeKScut4dP8O30cZ9oP1+34xJSWw7GPcljbxnf6kPPuGrZad3D0YLtO9pn4xFHb5alV8Sdx1NI+nOeNTjcSx4FDHchBP/TBZltxgA48/Km7u4YUgTUK8OqgGNYYE8c8dbXnhCNvq00O46kPtclhvOUTx7i02Edr3UvzGw4xrfNs3Pah9h2OroMa1Facm5NDLYd/Jb/R1p7kuF4TR2utoboOlzd6O5YxDhzsQA76wQ83W4sD7UAOejuRMQ4c7MBfesff7NV9D9A8tbXWfYipHHGMG1+jclhzHJd/pkdtF0/a5HwSpx44beIcRj2YcNzPNqbenfWwD7WYr5jaWtvMt3y3honvOC6v66U2OYyLQxw18kanG4njwKEO5KAf+mCzrThABx5+Mo6F7ZWAnDvx1EdrTt9dV8hXDGvUJc5hCk8c+Z+Ip75On+sh3+VVhzitbeau54b7Cmbbx+GYr75u34p7ZY1XWNfnCvssN62NfYjLG/2Zq6nHgQMcyEE/4CFmC3HgmQPffrzev1+BeAW4qnfO0Lv8c3R6E/9Pc34u/kkw7YHU7X62uFe1VZfr1lprE9O5Z6NqbTQmjtae9a+666laxLHGvPYjTms93/InXGvV6Hpu+Xmj083EceBQB3LQD32w2VYcoAMPvwWWBb0SuKsDOYpRjca6fNVVozkcJwy1iWNMrU/H2ofrudOLfNV+VY9axaUea8xPPYgj/xMcalPvd/Vh/21PrlNj6mmt54q505ca5OeN3i5njAMHO5CDfvDDzdbiQDuQg95OZIwDBztgv6Prnnnf5/cA4ohhfopVixpam3Suau9qkV/6m/Uo52pdlSNuo/uMQz3XU/OOw/y0ti2OfclhXuMtTnk9J//OHrb87lfjHY7jM68x+2iNc+47b3Q6kzgOHOpADvqhDzbbigN0YP2Tcbwu8EpAsU/H7EntO/2dVulSjzjm2f8TMftMelwDOcwr/w5ONTZzrmHbc6NbGOqR43oS80pMPfLY32EK73DMU7fiSU+xV/M72nmjXzmZXBw4zIEc9MMeaLYTB64csFd3BW+uG9srxYTTvlfzaS1bbWo4DjFX6+gc+ROHuOa+MlJbtVzN5asva1yHarN2J2Yfp01M9XA49lcOaxs+8RpTW7WmWusQ07keqUcc843tkbjO1ThxiMsbnW4kjgOHOpCDfuiDzbbiAB2wPzCjVwV3RSCOcTXZcLiYiaO4d+dcm667tYmpnMM1vsYtZ9JSDeq7mJxJ+10++1CLPR2m8MSRv+VMOFdjT4eZ1sZ1VjxpKLbn5HA9Xb8aidvyHSdv9CuHk4sDhzmQg37YA8124sCVAznoV64kFwcOc+DhX2rh9wDG2z1PHNb4PUK1p1pjqVU5chg3vsaJQ9ydmD21D/WIY145Wxw1GKte11TX4Rpf44RRPfJcPOltOFNPV2NPh3G9n+Wpxz7PeF2fOK7GPPu35tWYN/qVK8nFgcMcyEE/7IFmO3HgyoG/3DWA+SK6KwJxDlN84mreH81PGs3RUTW0XvNJl3ziGKsmOVpzc3ImbfK3HOLIZ6wYrkFr5G1i8qlb3KnW2sR07mqccNr3ij/lqE0txhN/wrHGPpPepjZpsWfe6Bs3g4kDX9yBHPQv/gCz/DiwceDhJ+N4DeBrX4UcjvniUIMx9TRPDa01z+W7fjVSV+vU2+KoQT7zFVOPOJdXvpuTXxhqk6M41hiTTw7zhWeNfMaKUY3GKq7zNZIz4chxOGoRP8XUUv5Uc5qO4/JO55U8tfNGf8W5YOPAF3UgB/2LPrgsOw684sCtH5jhVYbXA+ZrEa7m8tPCyVGc9u06OQ5TWOKaezU6HPN3+pCvfSc9xfacenf4rVMjtWpOPdaYL9y7n402MdqP65lw5JHDvMZbnPLemb+7h7zR33E/3DjwRRzIQf8iDyrLjAPvOJCD/o574caBL+LAtx/r/L5Zq/uOwO8rDlP6xLGfcjY4xagG9Tex6jVn0iWHOOZbp0fiOnd33PYhTvtPtbvruuK5Pi6vGg7HfHF0f6rzyly1yWUf4pgnXmNyWJv45BDHfGm5Wt7odDpxHDjUgRz0Qx9sthUH6MDDX2phQWO9Imi95orhNYIxuROHOMaqpRqNVVznaySHOOYZkzvF1FLcVm/SaM0Js+3TWjpO/Klv60z8xuh4h6Mam7n2cftx+eqhGld9FTPpXfG3OdVlX9byRt86Glwc+MIO5KB/4YeXpceBrQMPf+rOV/1a4FtJ/P1RvrtGNL5GYpivmHrEMa8czifOVKOGi7d84pyW7sdxFOf0XN7pFp7axDFfONZq3h/FdX4aqbXlk6PaWw3yqHeH77SY1/jdPtTj+ivvtPNGp2uJ48ChDuSgH/pgs604QAceru4saOyuBHp1II8c4pgnvmLitObmk15zVJcc1ly+dXr8JI5apf/uenqNz0bXhzximK9Y19115RDHGvPN/dTIPpOmWwP5DlO67+LI13VOfRXbc+qRnzd6O5QxDhzsQA76wQ83W4sD7UAOejuRMQ4c7MDD74yb9sm7v8PxO4HDaH7SvaOn+m7Ovq6PyzvNV/LU5lq2GuQXx2kojvquRi2H0Z7EMVYc+zNmT+YrVj2tX823nKlv624whSVu6k9c96hROcRpjTwXk583unMp+ThwkAM56Ac9zGwlDjgH7F9q4Wu/yLw6sObyyplwbnHsQwy1mK+YHOIYTxzWJg5xjJXD9RDHWDmsbfjEV0y9iU+cavRc+RtOc3skR/Uao+OGQ4zy3XzqTz3imC/dqdZ9iamcajhc5+9yyGecNzrdSBwHDnUgB/3QB5ttxQE68PDrnlm4E+v1RK8vram4zk+j0yoOa9RmftJ2tTv8icO1sadyiGM8cVhzsWppX8dzeepttRyHedev8sRNPYm7o7flU5vrmfjEka8xcdRjTEzxXS1vdHU38zhwoAM56Ac+1GwpDqgD6z911ytCC7l813t0V4quX43kMJ56uhr51cvhuI47HPKneNN/4uvaiL2j7fS2WuQrhzWuk3nlELeNnR7zjEuXfbXWfYmpHHGsMd/cq5E48hl/og97541ONxLHgUMdyEE/9MFmW3GADuSg043EceBQBx7+8xq/OzDWvfO7xBanGm5OPfYhnpjKb3AOU3zqTbjCPvtQq7DUY0wc86rPGjmK45w48omZYnKoNXE+XXN9ubZP9HR9ttpbPte95XAN5NzRyhudbiaOA4c6kIN+6IPNtuIAHXj4++jbK4G7RlB4G1Nr4kw41rgHxpP2FkeNOz0dh3n20Hha51aDmuRM2uQQ5/jMF5ccat2JVZsamz6KcXrEOQx7V0yO1jgnjtrME/9KTA1q543+iovBxoEv6kAO+hd9cFl2HHjFgfVPxlGUVwLGxFTMawRj4jQ/6TVPOZ2vccMv3KRR9Wcf8rc9qUkOtQrDGjmMFaMajVVc53V0ONV1ONXbzCct9p1w7ONw1CJeY+KoxbxyiNPaZk5t1WLNaW0wxc0b3TmYfBw4yIEc9IMeZrYSB5wD335cF753kdcApLv8cyTuZ/KFgNqqNdW6BTGVU43G3Rmp/UldXQv7aI19iXP54k811X9n7vow/45+c7f7bvzd0a3b9a8+rLGv01LOhKOei13/wjvtvNGdm8nHgYMcyEE/6GFmK3HAOZCD7pxJPg4c5MDDX2rhvvSu774XuDy1KqYeY+Wzpho9nzCq15ztOGk7jW1Pp615p8e8ctzamL/DIb9irkFrbr7hbNdGnOq6msvf3Q/1tnt2HN2D03N8zTu9vNGds8nHgYMcyEE/6GFmK3HAOWB/Mk4JekXQes0V464R5H6CQz3Gqs0a10acy5M7xdQqHPXIUxxrm9jpFpfaE459tjhyGJPP/sRUzBo5E461icOa68N86ZLDPopj7VfF2tOtjf0nDPXyRqdriePAoQ7koB/6YLOtOEAHvv2Y/PzJuOka8ED6VrS/P+9yeL1ozR6dtnIcrnVqVA5rG/6k8S6fa5nibR9qcN/Kn2qtQUznrkZqK4e1K27lthziJl3i2FM5xLHGPPkVE6c1N3d6W613+XmjuyeTfBw4yIEc9IMeZrYSB5wDD3+phSC9KvCKoTXyflW87X8Hd2fN73rAdWp/ahPHvHKIY40chyn8uzjy2f9uzLU6bWJ0D+yrONYYuz7EVEw9clxe+b9rzvXkjf67XE+fOPAHHchB/4Pmp3Uc+F0O5KD/LqfTJw78QQfW39E3a+R3gsLz+wv5xDlM4R2OeepWTL1P4Ki/1X6XQ76LuZbCcK+sMe+0pjy1FEftLU41ej7xG1Pj1JM1cqjtMIUnjvyJQ5zjE6Pxr9Rmr7zR6UbiOHCoAznohz7YbCsO0AH7k3F6DeEVgzWXZ5OKHY75wlG75v1RXOen0WkVx+ltOcQ5reqzwRFTHH6oTRzzxFdMnNY4nzSIc7Hrc0fXaVVv6hHHvFvjszz1HPZOn41u9bujzXVu++SNTtcSx4FDHchBP/TBZltxgA48XN1Z0NhdMXh1UAxr1CNOMayRw3jisEYt5qml8cRhjTxqK4Y1cu7E1Fbdqda9iKmcajhc56eRWts+kx5rqtc19uxcj47T9U+Nbg3a3+GmdajGFVZ1yWEtb/Qr95KLA4c5kIN+2APNduLAlQMP/z46AbwCMK8xcbwqKI5z4sgvjKu5PHU1Jkdr2rfrE4c18hm3To+skd/1GompucNVzX3IoR7zjlv5LYc46rk8MRpvOdzDxGGNHPYlhvkpdlrK2WoTR23mS5s19lIcay7OG905k3wcOMiBHPSDHma2EgecAznozpnk48BBDjx8R5/u/pvvC8rfcNRL1ei6y1fd9Wnu1bjhaE9yGCuO/YhjnvEGU/gJN62BvTYxtbSnzltv4jTm7kjtuxrNc+uvOvtsca37q0e3NuanNeSNPrmTWhw4xIEc9EMeZLYRByYHHq7uvK7olUDnLUpO53okhzjGje2RnM7VuOUQRy3mqftKTD3Hm/qQTxzzpTvVXN9NnrqFZ1/WmJ90iSP/DodaE3/qM9Vac+pDPnHMt87VOOGcnstf6W9yXAO180bfuBdMHPjiDuSgf/EHmOXHgY0DH/1HFnlV0OZTTbFX84nvrivU2fLJ0XjTRzmur8sr3825Fod5Jc/1UJv50mON+sQ5DPEVbznEqQbnWxw5LuYeVHeqOT3mVa9rLl919mz8Vd5p5I1O1xLHgUMdyEE/9MFmW3GADtg/dSdoG7vrxcR3V43iOL0tZ8K5NZHj+uvayFFdahDn8sXf4IjZroc9dZ3bOfs6PWJUl5wJN9VU82ru+jB/xevc1J+1rV7r3h3Z845G3uh3XAsnDnwxB3LQv9gDy3LjwB0HctDvuBZOHPhiDtjfGaffCfhdhDWXLx9Yoy/kMz/F1FL+VGtNYiqnGg7X+S3H6RafayCOefbTeOKwRh61HabwxJGv8aSh2GfzqeedPpOeW8udPtRiz0nL4ZinbsWTXmMnfmNqzBudbiSOA4c6kIN+6IPNtuIAHbD/yCJBFfOK4K4UxBRniytsf+5wmluj4xOjMddNPvPKIY415WxwDkPdZzH7Us/lVW+LU96fnHPNug56wJpytjhq3Ik3fRSja+2+iut8jeQQlzc6XUocBw51IAf90AebbcUBOvCXe9UTVDGvAaxt+cSR73QLc4dDbccvDPsyJl/z1GNMjsbEqV5jienc1ej4iqUeOcwXhzXV6LlyOn933PQs7U/2pZb2n2puj6rRuDtazX02sufUhzhq5o1ONxLHgUMdyEE/9MFmW3GADrz999F5VeCVgk00JkdrToMchykt4qiteWqw5vKqPeHYlzjmGbN/5clhjXnytzG1pj7U23KmtalG65PjMI3tcYvbalOPnO73q8c7/cnR9XEPxOWNrk5lHgcOdCAH/cCHmi3FAXUgB10dyTwOHOjAwy+e4P5416887/vEMVaMajSWeeU0Zhq3nC2OvbYc4u7sh3z2r9jVmGdP5XM+4ajnOA5D/N2Y2rpO1qhPnMMUfqpRbxOr1nYN1CaHeWozJqbiDX/i5I2u7mQeBw50IAf9wIeaLcUBdcBe3RXIubtGEFMxryJbDjUcn3niK972cRoT33FcvtbDGrVdvjj8EMf8FN/hOD2uuTDUZo15p/WJPPuwv66NvRTH2p14WkPrTT3Jb/yz8Q6Hmnmj043EceBQB3LQD32w2VYcoAMPV3deN/SqwBoFFMcaOcQxz7i4DufyymH/iaN9m0dO565G8recLY792Id51XI4cjYY4p/FuobGb/s4futcjdRW/lS70qqcajjcJk8trmXiTjjqOY2JT07e6HQjcRw41IEc9EMfbLYVB+jAw9WdBY15jeB1gfGWQy3lUI845icOaxOH2uQw3vKJ2+hWD3LY827MvtRmnrGuQWu9Dmp17mrc4lyfK82r3MSfaldamuMeqMW8cjifcBs9Ykp30uu+E4e1vNHbsYxx4GAHctAPfrjZWhxoB3LQ24mMceBgBx6+o/NOv93zxOF3DIcjRnuyRj7zytnOnQb7TFqOr/mtHnuRQz3miZ/iiX9Hj72ozbzqOhw5GpOjeop9Za5a7LPVUY0r3h3dK53OuZ7bPnmjt5MZ48DBDuSgH/xws7U40A48XN2314Am6/guv/R4RdnqOY7L67q38zt62z1s1jBpcW2MyWGs/cjR2mZO/tRnqrHPVs9xmN/G7EmOyxNT8bS3qdY6E4a1aT2skZM3erucMQ4c7EAO+sEPN1uLA+3Aw9Wdr/0GvDJOfF4jqDlxiHN8YqZ46uO0lbPFuXWQr9qO4/LKp7bjTHnH1z6ThqttNLS/zp02846z6U+dZzH7vKu95bMn42dr7Xre6O1ExjhwsAM56Ac/3GwtDrQDD//IYic/NW6uJXoNIYcxccxPa32XM2m7GnsWZrtW6lGDfOaJ1z7Ebfmq5+bvaju+6zftbcshjv0/oa167PVqrFp8dtRyeWIqJi5vdHUn8zhwoAM56Ac+1GwpDqgDOejqSOZx4EAHPvqf1/Q7hvOL3x0c5pX8tu8rmldYrtv1JOZK4yrntK6wm9ydNThdXZvTZl451CaOeY03uA2mdKf1sC/1thzHZ77ijR77K9/NN7rFzRvdOZh8HDjIgRz0gx5mthIHnAMPV3eCtleC7XWDOGozz/5TTP6Eo/bE2eKchstPayOH/YvDGmPquXxhVI88F9/hOC3NT2tV7Kfm7Mm9MT/1IkdxGw3FUI81xtpnM6eu4qmdN7q6k3kcONCBHPQDH2q2FAfUAXt1V+C7c14jttcN13PiO47mNxobjOrqnPvWWs8V4/oqrvk6OpzqOhz1NpjCU5tx1bYahe2P46h243UkjlrMF2eqqWbPVaPz1Opcj67mtIpHjsMRUxziGOeNXu7kEwcOdyAH/fAHnO3FgXLg24//fW8r+KrXK0FjdJw4U611iOncs1HXdkfjWY+rOvtuezqOy2tfh2NeOW4+rZl6d3Bbvlub5qnHGtemGNbI+ZUx17DtT86dtd3pkzf6HafDiQNfzIEc9C/2wLLcOHDHgRz0O66FEwe+mAP2O/qdfeh3D/ddQnHs5TjETDG1Jy3iJr1Xa1PPV7UmvK6ffbU26TyrUfcZtuvanxqsuXzrvDNS+46OW2dpsea0p/6OP3FcH81Tm3p5o6tTmceBAx3IQT/woWZLcUAdePjJOL72FfjunNq8Uky65BCnfIcjZ8KoXvMmTmN0VA61WXN51SNOa5v5HT7XqT1Yu6P9SQ7XUuukNmsurxzd62ZObeLZn/kpVg61tTbpXNXyRr9yJbk4cJgDOeiHPdBsJw5cOfD/98VMU/8g6SYAAAAASUVORK5CYII='
        pdf.addImage($scope.imgData, 'PNG', 20, 245, 40, 40);
        var dataURI = pdf.output("datauri");
        var output = URL.createObjectURL(dataURI);

        //window.open("http://google.com");
    }

    datePicker.load();
	})
  .factory( "datePicker", function($timeout) {
    return({
        load: load
    });

    function load() {
        // Apply the script inject in the next tick of the event loop. This
        // will give AngularJS time to safely finish its compile and linking.
        $timeout( loadSync, 0, false );
    }
    // Inject script before first script in page.
    function loadSync() {
    	$('.datepicker').pickadate({
		  labelMonthNext: 'Next month',
		  labelMonthPrev: 'Previous month',
		  labelMonthSelect: 'Select a month',
		  labelYearSelect: 'Select a year',
		  monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		  monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		  weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		  weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
		  weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
		  today: 'Today',
		  clear: 'Clear',
		  close: 'Close'
		});

		$('.datepicker').on("dp.change", function() {
		  	$scope.selecteddate = $("#datetimepicker").val();
       		alert("selected date is " + $scope.selecteddate);
		});
    }

  	});
  

    