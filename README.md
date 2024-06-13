Built With React
DESIGN USING ANTD, React Bootstrap and CSS
Validation -- React-hook-form
State Management -- Redux

Package install

### `npm i`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---- Logics ----
Employee List:
-- Search by employee name
-- Sort by table values
-- Delete after popup (data delete from the redux)
-- Pagination
-- Using the jsPDF library along with jspdf-autotable to generate and download a PDF file containing employee details

Add Employee:
-- Submit validation
-- Submit only after confirmation popup
-- Add submit data to the 

LOGICS
-- Search by employee name:
function searchByEmpName(employees, query) {
  const lowerCaseQuery = query.toLowerCase();
  return employees.filter(employee => 
    employee.EmpName.toLowerCase().includes(lowerCaseQuery)
  );
}
const query = "john";
const results = searchByEmpName(employees, query);
console.log(results);

-- Sort by employee name:
function sortEmployeesByName(employees) {
  return employees.sort((a, b) => {
    const nameA = a.EmpName.toLowerCase();
    const nameB = b.EmpName.toLowerCase();
    if (nameA < nameB) {
      return -1; 
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0; 
  });
}
const sortedEmployees = sortEmployeesByName(employees);
console.log(sortedEmployees);