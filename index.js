let form = document.querySelector("#user-details");
let users = document.querySelector("#items");

form.addEventListener("submit",storeDetails);





function storeDetails(e){
    e.preventDefault();
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");


    let newObj = {
        username : name.value,
        useremail : email.value
    }
    newObj_serialized = JSON.stringify(newObj);
    let key = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

    localStorage.setItem(key , newObj_serialized );

}

function refreshUserList(){
    for (let i = 0; i < localStorage.length; i++) {
        let userAdded = false;
        const user = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let li = document.createElement("li");
        li.className = "list-group-item";
        let text = `${user.username} || ${user.useremail}`;
        let addedUsers = document.querySelectorAll(".list-group-item");
        addedUsers.forEach( addedUser => {
            if (addedUser.textContent === text){
                userAdded = true;
            }
        });
        if (!userAdded){
            
        li.appendChild(document.createTextNode(text));
        users.appendChild(li);
        }
    }
}