// Your code here
function createEmployeeRecord (employeeDatailsArray){
    const employeeObject = {
        firstName: employeeDatailsArray[0],
        familyName: employeeDatailsArray[1],
        title: employeeDatailsArray[2],
        payPerHour: employeeDatailsArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeObject;
}

function createEmployeeRecords(arrayOfEmployeeDetailsArrays){
    let index = 0;
    const employeeObjectsArray = [];
    for(const elements of arrayOfEmployeeDetailsArrays){
        const employeeObject = createEmployeeRecord(elements)
        employeeObjectsArray[index] = employeeObject;
        index += 1;
    }
    return employeeObjectsArray;
}

function createTimeInEvent(employeeObject, timeInStamp){
    const extractedHour = timeInStamp.slice(11, timeInStamp.length);
    const extractedDate = timeInStamp.slice(0, 10)
    const timeInObject = {
        type: "TimeIn",
        hour: parseInt(extractedHour, 10),
        date: extractedDate
    };
    employeeObject["timeInEvents"].push(timeInObject);
    return employeeObject; 
}

function createTimeOutEvent(employeeObject, timeOutStamp){
    const extractedHour = timeOutStamp.slice(11, timeOutStamp.length);
    const extractedDate = timeOutStamp.slice(0, 10)
    const timeOutObject = {
        type: "TimeOut",
        hour: parseInt(extractedHour, 10),
        date: extractedDate
    };
    employeeObject["timeOutEvents"].push(timeOutObject);
    return employeeObject; 
}

function hoursWorkedOnDate(employeeObject, timeInStamp){
    let hoursWorked = 0;
    const timeInEventsArray = employeeObject.timeInEvents;
    for(let i = 0; i < timeInEventsArray.length; i++){
        if(timeInEventsArray[i].date === timeInStamp){
            let timeInEventHours = employeeObject.timeInEvents[i].hour;
            let timeOutEventHours = employeeObject.timeOutEvents[i].hour;
            hoursWorked = Math.floor((timeOutEventHours - timeInEventHours) / 100);
        }

    }
    return hoursWorked;
}

function wagesEarnedOnDate(employeeObject, timeInStamp){
    const hoursWorked = hoursWorkedOnDate(employeeObject, timeInStamp);
    const payPerHour = employeeObject.payPerHour;
    const wages = Math.floor(hoursWorked * payPerHour);
    return wages;

}

function allWagesFor(employeeObject){
    const payPerHour = employeeObject.payPerHour;
    let totalWages = 0
    for(let i = 0; i < employeeObject.timeInEvents.length; i++){
        let timeInEventday = employeeObject.timeInEvents[i].date;
        let daysWage = wagesEarnedOnDate(employeeObject, timeInEventday);
        totalWages += daysWage;
    }
    return totalWages;
}

function calculatePayroll(employeeDatailsArray){
    //let employeeDetailsObjectsArray = createEmployeeRecords(employeeDatailsArray);
    let payroll = 0;
    for(let employeeObject of employeeDatailsArray){
        payroll += allWagesFor(employeeObject);  
    }
    return payroll;
}
/*
create a function "createEmployeeRecord" that takes an array argument
the function should return an object with firstName, familyName, title, payperhour, timeIn and timeout events
the fist 4 obect keys have corresponding values stored in the array from index 0 to 3
the last two keys should have empty arrays as their values
---------------------------------------------------------------------------------------------------------------
create a function "createEmployeeRecords" that takes an argument of array of arrays
initialize an empty array "employeeObjectsArray"
loop through the array of arrays to access the individial arrays of employee records
call our createEmployeeRecord function and pass the individial record array to it
store the returned object in a variable
store the object in the "employeeObjectsArray" using a variable as index
increment the variables value by 1
return the array of objects when the loop is done 
*/


