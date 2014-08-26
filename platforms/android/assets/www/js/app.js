// app.js
var app = angular.module('myApp', ['ngGrid', 'ionic']);

app.directive('pageHeader', function(){
    return {
        restrict: 'E',
        templateUrl:'html/page-header.html'
    };
});

app.directive('gridContent', function(){
    return {
        restrict: 'E',
        templateUrl:'html/grid-content.html'
    };
});

/** for negative currencies to avoid () format **/
app.filter('customCurrency', ["$filter", function ($filter) {
    return function(amount, currencySymbol){
        var currency = $filter('currency');

        if(amount < 0){
            return currency(amount, currencySymbol).replace("(", "-").replace(")", "");
        }

        return currency(amount, currencySymbol);
    };
}]);

/** Take fractional part out **/
app.filter('nfcurrency', [ '$filter', '$locale', function ($filter, $locale) {
    var currency = $filter('currency'), formats = $locale.NUMBER_FORMATS;
    return function (amount, symbol) {
        var value = currency(amount, symbol);
        return value.replace(new RegExp('\\' + formats.DECIMAL_SEP + '\\d{2}'), '')
    }
}]);

app.controller('MyCtrl',['$scope', '$http', function($scope, $http) {
    $http.get( 'data/package.json').success(function(data) {
        $scope.readData = data;
        console.log("data file read, success" + data.toString());
        $scope.myData = data;
    });

    $scope.directCost = '<div class="ngCellText cellDataCenter" ng-class="col.colIndex()"><span ng-cell-text>{{COL_FIELD | nfcurrency}}</span>' +
                        '<button id="editBtn" class="icon ion-plus  cellButtonRight" ng-click="increment(row)"  ></button>' +
                        '<button id="editBtn" class="icon ion-minus  cellButtonRight" ng-click="decrement(row)"  ></button></div>';

    $scope.currentcyWithPrefix = '<div class="ngCellText cellDataCenter"><span ng-cell-text >{{COL_FIELD | customCurrency}}</span></div>';
    $scope.companyName = '<div class="ngCellText cellDataCenter"><span ng-cell-text >{{COL_FIELD}}</span></div>';

    var updateDifference = function( val, diffCost ){
        val.entity.DirectCost = Math.round((+diffCost));
        val.entity.ProfitOrLoss = Math.round((+val.entity.Revenue) - (+diffCost)  - (+val.entity.InDirectCost));
    };
    $scope.increment = function incr(val){
        var increasedCost, dc = val.entity.DirectCost;

        increasedCost = +dc + (+dc/100);
        updateDifference(val, increasedCost);
    };

    $scope.decrement = function decr(val){
        var reducedCost, dc = val.entity.DirectCost;

        reducedCost = +dc - (+dc/100);
        updateDifference(val, reducedCost);
    };

    $scope.myData = $scope.readData;

    $scope.gridOptions = { data: 'myData',
        columnDefs: [   {field:'Company', displayName:'Company',cellTemplate:$scope.companyName },
                        {field:'Revenue', displayName:'Revenue', cellTemplate:$scope.currentcyWithPrefix, editableCellTemplate:self.editableCellTempate ,enableCellEdit:true},
                        {field:'DirectCost', displayName:'Direct Cost',cellTemplate:$scope.directCost},
                        {field:'InDirectCost', displayName:'InDirect Cost',cellTemplate:$scope.currentcyWithPrefix},
                        {field:'ProfitOrLoss', displayName:'Profit Or Loss',cellTemplate:$scope.currentcyWithPrefix}]};
    $scope.$apply();
}]);