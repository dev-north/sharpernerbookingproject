let form = document.querySelector("#user-details");


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

    localStorage.setItem("myObj" , newObj_serialized );
    
}