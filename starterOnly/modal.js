// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const form = document.querySelector("form");

// DOM Elements from form
const firstName=document.querySelector("#first-name");
const lastName=document.querySelector("#last-name");
const email=document.querySelector("#email");
const birthDate=document.querySelector("#birthdate");
const numberTournaments=document.querySelector("#number-tournaments");
const listLocation=document.querySelectorAll('input[name="location"]');
const terms=document.querySelector("#terms");
const btnSubmit=document.querySelector(".btn-submit");

let fields=[
  {input:firstName, index: 0,regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",isValid:false},
  {input:lastName, index:1, regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",isValid:false},
  {input:email, index:2,regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,msgError:"Veuillez entrer une adresse mail valide.",isValid:false},
  {input:birthDate, index:3,regex:/^(19[0-9]{2}|202[0-3]|20[0-1][0-9])[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  ,msgError:"Veuillez entrer une date de naissance valide.",isValid:false},
  {input:numberTournaments, index:4,regex:/^[0-9]{1,}/,msgError:"Veuillez entrer une valeur numérique.",isValid:false}
  ];
  
function editNav() {
  var x = document.getElementById("myTopnav");
  /*if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }*/
  x.classList.toggle("responsive");
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  document.querySelector(".topnav").classList.toggle("modal-open");
  document.querySelector(".hero-section").classList.toggle("modal-open");
  document.querySelector(".footer").classList.toggle("modal-open");
  document.querySelector("main").classList.toggle("modal-open");
}

// close modal form
function closeModal(){
  for (let i=0;i<formData.length;i++){
    formData[i].removeAttribute("data-error");
    formData[i].removeAttribute("data-error-visible");
  }
  modalbg.style.display = "none";
  document.querySelector(".topnav").classList.toggle("modal-open");
  document.querySelector(".hero-section").classList.toggle("modal-open");
  document.querySelector(".footer").classList.toggle("modal-open");
  document.querySelector("main").classList.toggle("modal-open");
}


function locationIsValid(){
  let checked=false;
  for (let i=0;i<listLocation.length;i++){
    if(listLocation[i].checked){
      checked=true;
    }
  }
  if(!checked){
    formData[5].setAttribute("data-error","Veuillez choisir un tournoi.");
    formData[5].setAttribute("data-error-visible","true");
    return checked;
  }
  else{
    formData[5].removeAttribute("data-error");
    formData[5].removeAttribute("data-error-visible");
    return checked;
  }
}

function termsIsValid(){
  if(!terms.checked){
    formData[6].setAttribute("data-error","Vous devez vérifier que vous acceptez les termes et conditions.");
    formData[6].setAttribute("data-error-visible","true");
    return terms.checked;
  }
  else{
    formData[6].removeAttribute("data-error");
    formData[6].removeAttribute("data-error-visible");
    return terms.checked;
  }
}
// test if all input are valid
function modalIsValid(){
  let cpt=0;
  
  fields.forEach(field => {if(field.regex.test(field.input.value)){
    field.isValid=true;
    cpt++;
  }})
  if(locationIsValid()){
    cpt++;
  }
  if(termsIsValid()){
    cpt++;
  }
  return cpt===7;
}

function displayErrorMsg(){
  fields.forEach(field => {if(!field.isValid){
    formData[field.index].setAttribute("data-error",field.msgError);
    formData[field.index].setAttribute("data-error-visible","true");
  }else{
    formData[field.index].removeAttribute("data-error");
    formData[field.index].removeAttribute("data-error-visible");
  }})
}
function displayConfirmationMsg(){
  document.querySelector(".msg-confirmation").classList.toggle("form-submitted");
  document.querySelector(".button-close").classList.toggle("form-submitted");
  form.style.display="none";
  document.querySelector(".modal-body").classList.toggle("form-submitted");
}

function closeConfirmationMsg(){
  document.querySelector(".msg-confirmation").classList.toggle("form-submitted");
  document.querySelector(".button-close").classList.toggle("form-submitted");
  form.style.display="block";
  document.querySelector(".modal-body").classList.toggle("form-submitted");
  closeModal();
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.addEventListener("click",closeModal);

form.addEventListener("submit",function(e){
  e.preventDefault();
  if(modalIsValid()){
    displayConfirmationMsg();
  }else{
    displayErrorMsg();
  }});

document.querySelector(".button-close").addEventListener("click",closeConfirmationMsg);
