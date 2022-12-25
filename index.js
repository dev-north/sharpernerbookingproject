let form = document.querySelector("#user-details");
let users = document.querySelector("#items");

form.addEventListener("submit",storeDetails);
users.addEventListener("click",listAction);

let btnEdit = document.createElement("button");
btnEdit.className = "btn btn-success btn-sm float-right edit";
btnEdit.appendChild(document.createTextNode("Edit"));

let btndelete = document.createElement("button");
btndelete.className = "btn btn-danger btn-sm float-right delete";
btndelete.appendChild(document.createTextNode("X"));



function storeDetails(e){
    e.preventDefault();
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");


    let newObj = {
        username : name.value,
        useremail : email.value
    }
    newObj_serialized = JSON.stringify(newObj);
    localStorage.setItem(email.value , newObj_serialized );
    refreshUserList(newObj);

}

function refreshUserList(o){
    li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(btndelete);
    li.appendChild(btnEdit);
    li.appendChild(document.createTextNode(`${o.username} || ${o.useremail}`));
    users.appendChild(li);

}

function listAction(e){
    if (e.target.classList.contains("delete")){
        let selectedUser = e.target.parentElement;
        const userData = selectedUser.textContent.substring(5);
        
        let key = userData.split(" || ")[1];

        localStorage.removeItem(key);
    }
    else if(e.target.classList.contains("edit")){
        let selectedUser = e.target.parentElement;
        const userData = selectedUser.textContent.substring(5);                    
        let key = userData.split(" || ")[1];
        let name = document.querySelector("#name");
        let email = document.querySelector("#email");
        let userObj = JSON.parse(localStorage.getItem(key));
        name.value = userObj.username;
        email.value = userObj.useremail;

    }
}