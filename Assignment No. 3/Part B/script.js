let complaints = [];
let id = 1;

function addComplaint() {
    let name = document.getElementById("name").value;
    let text = document.getElementById("complaint").value;

    if (name == "" || text == "") {
        alert("Enter all details");
        return;
    }

    let c = {
        id: id,
        name: name,
        text: text,
        status: "Pending"
    };

    complaints.push(c);
    id++;

    document.getElementById("name").value = "";
    document.getElementById("complaint").value = "";

    display();
}

function display() {
    let table = document.getElementById("complaintTable");
    table.innerHTML = "";

    let pending = 0;
    let resolved = 0;

    for (let i = 0; i < complaints.length; i++) {
        let c = complaints[i];

        if (c.status == "Pending") pending++;
        else resolved++;

        let row = table.insertRow();

        row.insertCell(0).innerHTML = c.id;
        row.insertCell(1).innerHTML = c.name;
        row.insertCell(2).innerHTML = c.text;
        row.insertCell(3).innerHTML = c.status;

        let action = row.insertCell(4);

        action.innerHTML =
            "<button onclick='resolve(" + i + ")'>Resolve</button>" +
            "<button onclick='removeComplaint(" + i + ")'>Delete</button>";
    }

    document.getElementById("total").innerHTML = complaints.length;
    document.getElementById("pending").innerHTML = pending;
    document.getElementById("resolved").innerHTML = resolved;
}

function resolve(i) {
    complaints[i].status = "Resolved";
    display();
}

function removeComplaint(i) {
    complaints.splice(i, 1);
    display();
}