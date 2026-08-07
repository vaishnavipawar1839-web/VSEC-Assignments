// Select Button
const addBtn = document.getElementById("addBtn");

// Select Table Body
const tableBody = document.getElementById("tableBody");

// Add Record Button
addBtn.addEventListener("click", function () {

    // Get Input Values
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();

    let os = Number(document.getElementById("sub1").value);
    let dbms = Number(document.getElementById("sub2").value);
    let cn = Number(document.getElementById("sub3").value);

    // Check Empty Fields
    if (name === "" || roll === "" ||
        isNaN(os) || isNaN(dbms) || isNaN(cn)) {

        alert("Please fill all fields.");
        return;
    }

    // Check Marks Range
    if (os < 0 || os > 100 ||
        dbms < 0 || dbms > 100 ||
        cn < 0 || cn > 100) {

        alert("Marks should be between 0 and 100.");
        return;
    }

    // Calculate Total
    let total = os + dbms + cn;

    // Calculate Percentage
    let percentage = (total / 300) * 100;

    // Calculate Grade
    let grade = "";

    if (percentage >= 90) {
        grade = "A+";
    }
    else if (percentage >= 75) {
        grade = "A";
    }
    else if (percentage >= 60) {
        grade = "B";
    }
    else if (percentage >= 40) {
        grade = "C";
    }
    else {
        grade = "Fail";
    }

    // Create New Row
    let row = tableBody.insertRow();

    row.innerHTML = `
        <td>${roll}</td>
        <td>${name}</td>
        <td>${os}</td>
        <td>${dbms}</td>
        <td>${cn}</td>
        <td>${total}</td>
        <td>${percentage.toFixed(2)}%</td>
        <td>${grade}</td>
        <td>
            <button class="deleteBtn">Delete</button>
        </td>
    `;

    // Delete Record
    row.querySelector(".deleteBtn").addEventListener("click", function () {
        row.remove();
    });

    // Clear Input Fields
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("sub1").value = "";
    document.getElementById("sub2").value = "";
    document.getElementById("sub3").value = "";

});