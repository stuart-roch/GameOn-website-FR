// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");
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

  /*document.querySelector(".topnav").removeAttribute("style");
  document.querySelector(".hero-section").removeAttribute("style");
  document.querySelector("footer").removeAttribute("style");*/
}

function firstNameIsValid(){
  if (!(/^[a-zA-Z]{2,}/.test(firstName.value))) {
    formData[0].setAttribute("data-error","Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    formData[0].setAttribute("data-error-visible","true");
    return false;
  }
  else{
    formData[0].removeAttribute("data-error");
    formData[0].removeAttribute("data-error-visible");
    return true;
  }
}
function lastNameIsValid(){
  if (!(/^[a-zA-Z]{2,}/.test(lastName.value))) {
    formData[1].setAttribute("data-error","Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    formData[1].setAttribute("data-error-visible","true");
    return false;
  }
  else{
    formData[1].removeAttribute("data-error");
    formData[1].removeAttribute("data-error-visible");
    return true;
  }
}

function emailIsValid(){
  if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
    formData[2].setAttribute("data-error","Veuillez entrer une adresse mail valide.");
    formData[2].setAttribute("data-error-visible","true");
    return false;
  }
  else{
    formData[2].removeAttribute("data-error");
    formData[2].removeAttribute("data-error-visible");
    return true;
  }
}

function birthDateIsValid(){
  if(!(/^(19[0-9]{2}|202[0-3]|20[0-1][0-9])[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(birthDate.value))) {
    formData[3].setAttribute("data-error","Veuillez entrer une date de naissance valide.");
    formData[3].setAttribute("data-error-visible","true");
    return false;
  }
  else{
    formData[3].removeAttribute("data-error");
    formData[3].removeAttribute("data-error-visible");
    return true;
  }
}

function numberTournamentsIsValid(){
  if (!(/^[0-9]{1,}/.test(numberTournaments.value))){
    formData[4].setAttribute("data-error","Veuillez entrer une valeur numérique.");
    formData[4].setAttribute("data-error-visible","true");
    return false;
  }
  else{
    formData[4].removeAttribute("data-error");
    formData[4].removeAttribute("data-error-visible");
    return true;
  }
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
  /*if(firstNameIsValid()){
    cpt++;
  }
  if(lastNameIsValid()){
    cpt++;
  }
  if(emailIsValid()){
    cpt++;
  }
  if(birthDateIsValid()){
    cpt++;
  }
  if(numberTournamentsIsValid()){
    cpt++;
  }*/
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
  document.querySelector(".modal-body").innerHTML="<p> Merci pour votre inscription ! </p>";
  document.querySelector(".modal-body").style.textAlign="center";
}
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnClose.addEventListener("click",closeModal);

form.addEventListener("submit",function(e){
  e.preventDefault();
  if(modalIsValid()){
    displayConfirmationMsg();
  }else{
    displayErrorMsg();
  }});
/*btnSubmit.addEventListener("click",function(e){
  e.preventDefault();
})*/
