const validatex = () => {
    const x = document.getElementById("xInput").value;
    const y = document.getElementById("yInput").value;

    if (((x < 1) || (x > 9)) || ((y < 1) || (y > 9)) ) {
        document.getElementById("tooltipy").style.display = "block";
        return false;
    } else {
        document.getElementById("tooltipy").style.display = "none";
        return true;
    }
}

function tableCreate() {
    if(validatex()) {
        const body = document.body;
        const tbl = document.createElement('table');

        tbl.className = "table table-dark table-striped";
        tbl.id = "myTable";
        tbl.style.border = '1px solid black';

        for (let i = 0; i <= document.getElementById("yInput").value; i++) {
            const tr = tbl.insertRow();
            for (let j = 0; j <= document.getElementById("xInput").value; j++) {
                const td = tr.insertCell();
                if (i === 0) {
                    if (j >= 1) {
                        td.appendChild(document.createTextNode(`X= ${j}`));
                    }
                } else {
                    if (j === 0) {
                        td.appendChild(document.createTextNode(`Y= ${i}`));
                    } else {
                        td.appendChild(document.createTextNode(` ${j * i}`));
                    }
                }
                td.style.border = '1px solid black';
            }
        }
        document.getElementById("window").style.display = "block";
        document.getElementById("window").hidden = false;
        document.getElementById("window").appendChild(tbl);
        return true;
    }
    return false;
}
const closePage=()=> {
    const table = document.getElementById("myTable");
    const window = document.getElementById("window");
    window.hidden = true;
    table.parentNode.removeChild(table);
}