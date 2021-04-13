// JavaScript source code
angular.module("myapp", ['dndLists' ])
    .controller("myctrl", function ($scope, $http, $locale) {
        $scope.showloading = true;
        $scope.showtask = true;

        $scope.tasksfun = function () {
            $http({
                method: 'GET',
                url: 'https://devza.com/tests/tasks/list',
                headers: { 'AuthToken': '5mtCl7nE9yjExhFKiIg5cVfN9mK3PHDN' }
            }).success(function (response) {
                $scope.tasks = response.tasks;
                $scope.tasks.selected = null;
                $scope.showloading = false;
                $scope.backup = $scope.tasks;
                console.log($scope.tasks);
                $scope.Temp = response.statusText;;
            }).error(function (qwe) {
                var temp = qwe.statusText;
            });
           
        }
       

        $scope.getusers = function () {
            $http({
                method: 'GET',
                url: 'https://devza.com/tests/tasks/listusers',
                headers: { 'AuthToken': '5mtCl7nE9yjExhFKiIg5cVfN9mK3PHDN' }
            }).success(function (response) {
                $scope.users = response.users;
                $scope.showloading = false;
                console.log($scope.users);
                var item = {
                    "id": "14",
                    "name": "Arpit1",
                    "picture": "https://images.generated.photos/e9j7MmGzErA8i3bvDhGiZjsdm3RBYAM3vN2NLeNAL8E/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzA1NTg4MjYuanBn.jpg"}
                $scope.users.push(item);
                $scope.Temp1 = response.statusText;;
            }).error(function (qwe) {
                var temp = qwe.statusText;
            });
            
        }
        $scope.tasksfun();
        $scope.showtasks = function () {
            $scope.showtask = true;
            $scope.showuser = false;
            $scope.createnew = false;
            $scope.edit = false;
        }
        $scope.showusers = function () {
            $scope.showuser = true;
            $scope.showtask = false;
            $scope.createnew = false;
            if (!$scope.users) {
                $scope.showloading = true;
                $scope.getusers();
            }
        }

       
        $scope.edittask = function (x) {
            $scope.showtask = false;
            $scope.edit = true;
            var date;
            var time;
            $scope.task = Object.assign({}, x);
            if ($scope.task.due_date) {
                var datetime = $scope.task.due_date.split(' ');
                date = datetime[0].split('-');
                time = datetime[1].split(':');
                var d = new Date();
                d.setFullYear(date[0], date[1], date[2]);
                d.setHours(time[0],time[1],time[2]);
                
                $scope.task.due_date = d;
            }
            if(!$scope.users)
                $scope.getusers();
            console.log($scope.task);

        }
        $scope.deletetask = function (x) {
            $scope.showloading = true;
            var id = x.id;
            var formData = new FormData();
            formData.append('taskid', id);
            $http({
                method: 'POST',
                url: 'https://devza.com/tests/tasks/delete',
                headers: { 'AuthToken': '5mtCl7nE9yjExhFKiIg5cVfN9mK3PHDN', "Content-Type": undefined },
                data: formData
            }).success(function (response) {
                //$scope.users = response.users;
               // $scope.showloading = false;
                // console.log($scope.users);
                $scope.Temp1 = response.statusText;;
            }).error(function (qwe) {
                var temp = qwe.statusText;
            });
            $scope.tasksfun();
        }

        $scope.createnewtask = function () {
            $scope.task = {};
            $scope.showloading = false;
            $scope.showuser = false;
            $scope.showtask = false;
            $scope.createnew = true;
            $scope.task.assigned_to = '';
            $scope.task.message = '';
            if (!$scope.users)
            $scope.getusers();
        }

        $scope.submit = function () {
            $scope.showloading = true;
            var formData = new FormData();

            formData.append('message', $scope.task.message);
            if ($scope.task.priority) {
                formData.append('priority', $scope.task.priority);
            }
            if ($scope.task.due_date) {
                var date = $scope.task.due_date.getFullYear() + "-" + ($scope.task.due_date.getMonth() + 1) + "-" + $scope.task.due_date.getDate() + " " + $scope.task.due_date.getHours() + ":" + $scope.task.due_date.getMinutes() + ":" + $scope.task.due_date.getSeconds();
                formData.append('due_date', date);
            }
            if ($scope.task.assigned_to) {
                formData.append('assigned_to', $scope.task.assigned_to);
            }
            console.log(formData);
            if ($scope.createnew) {
                $http({
                    method: 'POST',
                    url: 'https://devza.com/tests/tasks/create',
                    headers: {
                        'AuthToken': '5mtCl7nE9yjExhFKiIg5cVfN9mK3PHDN', 'Content-Type': undefined
                    },
                    data: formData
                }).success(function (response) {
                    $scope.showloading = false;
                    // console.log($scope.users);
                    $scope.Temp2 = response.statusText;
                    $scope.tasksfun();
                    $scope.showtask = true;
                    $scope.createnew = false;
                }).error(function (qwe) {
                    var temp = qwe.statusText;
                });
            }

            if ($scope.edit) {
                formData.append('taskid', $scope.task.id);
                $http({
                    method: 'POST',
                    url: ' https://devza.com/tests/tasks/update',
                    headers: {
                        'AuthToken': '5mtCl7nE9yjExhFKiIg5cVfN9mK3PHDN', 'Content-Type': undefined
                    },
                    data: formData
                }).success(function (response) {
                    $scope.showloading = false;
                    // console.log($scope.users);
                    $scope.Temp3 = response.statusText;
                    $scope.tasksfun();
                    $scope.showtask = true;
                    $scope.edit = false;
                }).error(function (qwe) {
                    var temp = qwe.statusText;
                });
            }
           
        }
        $scope.searchitem = function (search) {
            $scope.filteredjson = [];
            var searchlower = search.toLowerCase();
            console.log(searchlower);
            $scope.tasks = $scope.backup;
            if (search) {

                var lista = ["message", "assigned_name"];
                for (var i = 0; i < $scope.tasks.length; i++) {

                    for (var j = 0; j < lista.length; j++) {
                        var key = lista[j];
                        console.log(key);
                        if ($scope.tasks[i] && $scope.tasks[i][key].toString().toLowerCase().includes(search.toLowerCase())) {
                            console.log($scope.tasks[i].key);
                            $scope.filteredjson.push($scope.tasks[i]);
                            break;
                        }
                    }
                }
                console.log($scope.filteredjson);
                $scope.tasks = $scope.filteredjson;
            }
             if (!search ) {
                $scope.tasks = $scope.backup;
            }
        }
        $scope.bolval = true;
        $scope.sorttask = function () {
            if ($scope.bolval == true) {
                $scope.tasks = $scope.tasks.sort(function (a, b) {
                    console.log($scope.tasks);
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(b.due_date) - new Date(a.due_date);

                });
                $scope.bolval = false;
            }
            else {
                $scope.tasks = $scope.tasks.sort(function (a, b) {
                    console.log($scope.tasks);
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return  new Date(b.due_date) - new Date(a.due_date);
                }).reverse();
                $scope.bolval = true;
            }
        }
    });