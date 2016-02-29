var employeeList = [];
var j=0

// found function numberWithCommas on stackoverflow.com
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function totalMonthlyPay() {
  var totalPay = 0;
  for (var i=0; i<employeeList.length; i++){
    totalPay+=parseInt(employeeList[i].salary);
  }
  // round to 2 decimals
  totalPay=Math.round((parseInt(totalPay)/12+0.00001)*100)/100;

  $('.total-pay').text(numberWithCommas(totalPay));
}

function deleteEmployee() {
  // This is 2nd approach
  // var emplID = $(this).parent().data('emplID');

  //get emplID data from DOM employee class element
  var emplID = $(this).closest('tr').data('emplID');
  for (i=0; i<employeeList.length; i++){
    if(emplID==employeeList[i].employeeid){

      employeeList.splice(i, 1);
      totalMonthlyPay();
    }
  }

  $(this).closest('tr').remove();
}

//add employee to DOM
function addEmployee(employee) {
  //2nd approach
  // $(".container").append('<div class="employee"></div>');
  // var $el = $(".container").children().last();
  // $el.append('<p>'+employee.firstname+'</p>');
  // $el.append('<p>'+employee.lastname+'</p>');
  // $el.append('<p>'+employee.employeeid+'</p>');
  // $el.append('<p>'+employee.jobtitle+'</p>');
  // $el.append('<p>$'+numberWithCommas(employee.salary)+'</p>');
  // $el.append('<button class="delete">Delete</button>');
  // $el.data('emplID', employee.employeeid);

  $("tbody").append('<tr class="employee"></tr>');
  var $el = $("tbody").children().last();
  j++;
  $el.append('<td>'+j+'</td>');
  $el.append('<td>'+employee.firstname+'</td>');
  $el.append('<td>'+employee.lastname+'</td>');
  $el.append('<td>'+employee.employeeid+'</td>');
  $el.append('<td>'+employee.jobtitle+'</td>');
  $el.append('<td>$'+numberWithCommas(employee.salary)+'</td>');
  $el.append('<td><button class="delete">Delete</button></td>');
  $el.data('emplID', employee.employeeid);
  totalMonthlyPay();
}

$(document).ready(function () {
  $('#employeeForm').on('submit', function (event) {
    event.preventDefault();
    var employee = {};

    //collect data from filled fields
    $.each($('#employeeForm').serializeArray(), function (i, field) {
      employee[field.name] = field.value;

    });

    //clear fields after submit
    $('#employeeForm').find('input[type=text]').val('');
    $('#employeeForm').find('input[type=number]').val('');

    $("#firstname").trigger("focus");
    employeeList.push(employee);

    addEmployee(employee);

  });

  $('.container').on('click', '.delete', deleteEmployee);
});
