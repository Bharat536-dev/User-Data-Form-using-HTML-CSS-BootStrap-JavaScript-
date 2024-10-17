
let formData = {
    name:"",
    email: "",
    status:"Active",
    gender:"Male"
};

let nameEl = document.getElementById("name");
let nameErrMsgEl = document.getElementById("nameErrMsg");

let emailEl = document.getElementById("email");
let emailErrMsgEl = document.getElementById("emailErrMsg");

let workingStatusEl = document.getElementById("status");
workingStatusEl.addEventListener("change",function(event){
    formData.status = event.target.value;
    console.log(formData);
});

let genderMaleEl = document.getElementById("genderMale");
genderMaleEl.addEventListener("change",function(event){
    formData.gender = event.target.value;
    console.log(formData);
});

let genderFemaleEl = document.getElementById("genderFemale");
genderFemaleEl.addEventListener("change",function(event){
    formData.gender = event.target.value;
    console.log(formData);
});

nameEl.addEventListener("change",function(event){
    if(event.target.value ===""){
        nameErrMsgEl.textContent = "Required*";
    }
    else{
        nameErrMsgEl.textContent = "";
    }
    
    formData.name = event.target.value;
});

emailEl.addEventListener("change",function(event){
    if(event.target.value ===""){
        emailErrMsgEl.textContent = "Required*";
    }
    else{
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;
});

function validateFormData(formData){
    let {name,email} = formData;
    if(name===""){
        nameErrMsgEl.textContent = "Required*";
    }
    if(email===""){
        emailErrMsgEl.textContent = "Required*";
    }
}

function submitFormData(formData){
    let options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:"Bearer 43e6fc4164abf709871d892c29aea15a18eac03c29017d345a769e1d88410fe2"
        },
        body:JSON.stringify(formData)
    };
    
    let url = "https://gorest.co.in/public-api/users";
    
    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        console.log(jsonData);
        if(jsonData.code===422){
            if(jsonData.data[0].message==="has already been taken"){
                emailErrMsgEl.textContent="Email already exits!!";
            }
        }
    });
}

let myFormEl = document.getElementById("myForm");
myFormEl.addEventListener("submit",function(event){
    event.preventDefault();
    validateFormData(formData);
    submitFormData(formData);
})