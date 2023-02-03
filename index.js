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

const axiosI = axios.create({
    baseURL: "https://crudcrud.com/api/83294fade41b46758a06b2756b1e01ec"
  });


axiosI.interceptors.request.use(config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
}, error=>{
  return Promise.reject(error);
})

function storeDetails(e){
    e.preventDefault();
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");

    axiosI.post(
        "/users",{
            username: name.value,
            useremail:email.value
        }
    )
    .then(res=>{
        refreshUserList();
        console.log(res);
    })
    .catch(err=>console.error(err));

}

function refreshUserList(){
    users.innerHTML="";
    let userList = [];
    axiosI.get("/users")
    .then(res=>{
        userList = res.data;
    })
    .catch(err=>console.error(err));
    userList.forEach((user)=>{
        o = JSON.parse(user);
        li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(btndelete);
        li.appendChild(btnEdit);
        li.appendChild(document.createTextNode(`${o.username} || ${o.useremail}`));
        users.appendChild(li.cloneNode(true));
    })

}

function listAction(e){
    if (e.target.classList.contains("delete")){
        let selectedUser = e.target.parentElement;
        const userData = selectedUser.textContent.substring(5);
        
        let key = userData.split(" || ")[1];
        localStorage.removeItem(key);
        refreshUserList();
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