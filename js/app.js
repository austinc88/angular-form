var app = angular.module('myApp', ['ja.qr'])
  .controller('myCtrl', function($scope, datePicker) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.toValue = function() {
      return $scope.firstName + " " + $scope.lastName;
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
    }

  	});
  

    