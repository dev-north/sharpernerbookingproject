let form = document.querySelector("#user-details");


form.addEventListener("submit",storeDetails);





function storeDetails(e){
    e.preventDefault();
    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    localStorage.setItem(email.value,name.value);
}