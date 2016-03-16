var app = angular.module('myApp', ['ja.qr'])
  .controller('myCtrl', function($scope, datePicker) {
  	var currentTime = new Date().toLocaleDateString('en-US', {  
	    day : 'numeric',
	    month : 'numeric',
	    year : 'numeric'
	}).split(' ').join('-');
	$scope.date = currentTime;
    $scope.institution = "";
    $scope.department = -1;
    $scope.contact = {
    	name : "",
    	tel : "",
    	email : "",
    	indication : ""
    };
    $scope.preop = {
    	mallampati: -1,
    	thyromental: -1,
    	tongue: -1,
    	neck: -1,
    	radiation: -1,
    	congenital: -1,
    	aspiration: -1,
    	bmi: -1,
    	bag: -1
    };
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
      	$scope.contact.email, $scope.contact.indication, $scope.preop.mallampati, $scope.preop.thyromental, $scope.preop.tongue, $scope.preop.neck,
      	$scope.preop.radiation, $scope.preop.congenital, $scope.preop.aspiration, $scope.preop.bmi, $scope.preop.bag, $scope.att1.device,
      	 $scope.att1.comments, $scope.att1.success, $scope.att2.device, $scope.att2.comments, $scope.att2.success, $scope.att3.device, 
      	 $scope.att3.comments, $scope.att3.success, $scope.further].join(',');
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
  

    