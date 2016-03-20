var app = angular.module('myApp', ['ja.qr'])
  .controller('myCtrl', function($scope, datePicker) {
  	var currentTime = new Date().toLocaleDateString('en-US', {  
	    day : 'numeric',
	    month : 'numeric',
	    year : 'numeric'
	})
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
    $scope.further = ""

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
        pdf.text(20,40, 'Dear Patient,');

        pdf.text(20,50, 'As we discussed during our post-operative visit, you underwent general anesthesia (completely asleep');
        pdf.text(20,55, 'for surgery). This required a breathing tube to be placed in your windpipe to deliver oxygen to your');
        pdf.text(20,60, 'lungs, heart, brain and other vital organs. When the breathing tube was inserted, it was difficult to place');
        pdf.text(20,65, 'the breathing tube in your windpipe. This is referred to as a \"Difficult Airway\".');

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
        pdf.text(20,20, "Airway App Data Fields:");

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
  

    