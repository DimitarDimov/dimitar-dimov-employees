const fs = require("fs");
var buffer = fs.readFileSync("./file.txt");
var lines = buffer.toString().split("\n");
class Employee {
  constructor(empId, projectId, dateFrom, dateTo) {
    this.empId = empId;
    this.projectId = projectId;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
function changeDate() {
  var d = new Date();
  d.setUTCHours(0);
  d.setUTCMinutes(0);
  d.setUTCSeconds(0);
  d.setUTCMilliseconds(0);
  return d;
}
var employees = [];
var line;
for (line = 0; line < lines.length; line++) {
  var lineToString = lines[line];
  var commaIndexes = [];
  var i;
  for (i = 0; i < lineToString.length; i++) {
    if (lineToString[i] === ",") {
      commaIndexes.push(i);
    }
  }
  lineToString
    .substring(commaIndexes[2] + 2, commaIndexes[2] + 12)
    .replace(/\r?\n?/g, "") === "NULL"
    ? changeDate()
    : new Date(
        lineToString
          .substring(commaIndexes[2] + 2, commaIndexes[2] + 12)
          .replace(/\r?\n?/g, "")
      );
  employees.push(
    new Employee(
      parseInt(lineToString.substring(0, commaIndexes[0])),
      parseInt(lineToString.substring(commaIndexes[0] + 2, commaIndexes[1])),
      new Date(
        lineToString
          .substring(commaIndexes[1] + 2, commaIndexes[2])
          .replace(/\r?\n?/g, "")
      ),
      lineToString
        .substring(commaIndexes[2] + 2, commaIndexes[2] + 12)
        .replace(/\r?\n?/g, "") === "NULL"
        ? changeDate()
        : new Date(
            lineToString
              .substring(commaIndexes[2] + 2, commaIndexes[2] + 12)
              .replace(/\r?\n?/g, "")
          )
    )
  );
}
var tempObj = { id1: 0, id2: 0, maxDays: 0 };
function findMaxWorkedTogether() {
  var i, j, projStart, projEnd, projDays;
  for (i = 0; i < employees.length - 1; i++) {
    for (var j = i + 1; j < employees.length; j++) {
      if (employees[i].projectId == employees[j].projectId) {
        projStart =
          employees[i].dateFrom >= employees[j].dateFrom
            ? employees[i].dateFrom
            : employees[j].dateFrom;
        projEnd =
          employees[i].dateTo <= employees[j].dateTo
            ? employees[i].dateTo
            : employees[j].dateTo;
        projDays = (projEnd - projStart) / (1000 * 60 * 60 * 24);
        if (
          projDays <= 0 &&
          (employees[i].dateFrom.getTime() === employees[j].dateTo.getTime() ||
            employees[i].dateTo.getTime() === employees[j].dateFrom.getTime())
        )
          projDays = 1;
        if (projDays > tempObj.maxDays) {
          tempObj.id1 = employees[i].empId;
          tempObj.id2 = employees[j].empId;
          tempObj.maxDays = projDays;
        }
      }
    }
  }
  console.log(tempObj.id1, tempObj.id2);
}

findMaxWorkedTogether();
