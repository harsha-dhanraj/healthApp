var healthapp = angular.module('healthapp',[]);
healthapp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("Hello world from controller....")
	var refreshDoctorsList = function(){
		$http.get("/doctorslist").then(function(response){		
			console.log("I got the data I wanted");
			$scope.doctors = response.data;
			$scope.doctor = "";
		})
	}

	refreshDoctorsList();

	$scope.addDoctor = function(){
		console.log($scope.doctor);
		$http.post('/doctorslist', $scope.doctor).then(function(response){
			console.log(response);
			refreshDoctorsList();
		})
	}

	$scope.remove = function(id){
		$http.delete('/doctorslist/' + id).then(function(response){
			refreshDoctorsList();
		})
	}

	$scope.edit = function(id){
		$http.get('/doctorslist/' + id).then(function(response){
			console.log(response)
			$scope.doctor = response.data
		})
	}

	$scope.updateDoctor = function(){
		var id = $scope.doctor._id;
		$http.put('/doctorslist/'+ id, $scope.doctor).then(function(response){
			console.log(response);
			refreshDoctorsList();
		})
	}

	$scope.clear = function(){		
		$scope.doctor = ""
	}
	
}]);