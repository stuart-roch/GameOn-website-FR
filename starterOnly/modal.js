// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const form = document.querySelector("form");

// DOM Elements du formulaire
const firstName=document.querySelector("#first-name");
const lastName=document.querySelector("#last-name");
const email=document.querySelector("#email");
const birthDate=document.querySelector("#birthdate");
const numberTournaments=document.querySelector("#number-tournaments");
const listLocation=document.querySelectorAll('input[name="location"]');
const terms=document.querySelector("#terms");
const btnSubmit=document.querySelector(".btn-submit");

// Liste d'objet modélisant les champs texte du formulaire pour leur validation et leur place dans le formulaire
let fields=[
  {input:firstName, index: 0,regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",isValid:false},
  {input:lastName, index:1, regex:/^[a-zA-Z]{2,}/,msgError:"Veuillez entrer 2 caractères ou plus pour le champ du nom.",isValid:false},
  {input:email, index:2,regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,msgError:"Veuillez entrer une adresse mail valide.",isValid:false},
  {input:birthDate, index:3,regex:/^(19[0-9]{2}|202[0-3]|20[0-1][0-9])[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
  ,msgError:"Veuillez entrer une date de naissance valide.",isValid:false},
  {input:numberTournaments, index:4,regex:/^[0-9]{1,}/,msgError:"Veuillez entrer une valeur numérique.",isValid:false}
  ];
  
// Modifie la class de l'HTMLElement du menu pour modifier son apparence en responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
}

/*
  Lance le formulaire d'inscription et modifie la class des éléments HTML en arrière plan 
  quand le formulaire est ouvert
*/
function launchModal() {
  modalbg.style.display = "block";
  document.querySelector(".topnav").classList.toggle("modal-open");
  document.querySelector(".hero-section").classList.toggle("modal-open");
  document.querySelector(".footer").classList.toggle("modal-open");
  document.querySelector("main").classList.toggle("modal-open");
}

/*  
  Ferme le formulaire d'inscription, reset ses champs, les messages d'erreurs 
  et modifie la class des éléments HTML en arrière plan quand le formulaire est fermé
*/
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
  form.reset();
}

/*
  Indique si le champ location vérifie la condition de validation,
  affiche le message d'erreur s'il ne vérifie pas la condition
  et le supprime dès que le champ est valide
  return {boolean}
*/
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

/*
  Indique si le champ terms vérifie la condition de validation,
  affiche le message d'erreur s'il ne vérifie pas la condition
  et le supprime dès que le champ est valide
  return {boolean}
*/
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

/* 
  Affiche les messages d'erreurs des champs textes du formulaire s'ils sont invalides
  et les supprimes dès qu'ils sont valides
*/
function displayErrorMsg(){
  fields.forEach(field => {if(!field.isValid){
    formData[field.index].setAttribute("data-error",field.msgError);
    formData[field.index].setAttribute("data-error-visible","true");
  }else{
    formData[field.index].removeAttribute("data-error");
    formData[field.index].removeAttribute("data-error-visible");
  }})
}

/*
  Indique si les champs du formulaire sont valides
  et affiche le message d'erreur correspondant à chaque champ en cas d'invalidité
  return {boolean}
*/
function modalIsValid(){
  let cpt=0; // compteur de champ valide
  //Vérifie si les champs texte du formulaire sont valides
  fields.forEach(field => {if(field.regex.test(field.input.value)){
    field.isValid=true;
    cpt++;
  }else{
    field.isValid=false;
  }})
  displayErrorMsg();
  if(locationIsValid()){
    cpt++;
  }
  if(termsIsValid()){
    cpt++;
  }
  return cpt===7;
}

/*
  Affiche un message de confirmation à la place du formulaire avec un bouton pour le fermer
*/
function displayConfirmationMsg(){
  document.querySelector(".msg-confirmation").classList.toggle("form-submitted");
  document.querySelector(".button-close").classList.toggle("form-submitted");
  form.style.display="none";
  document.querySelector(".modal-body").classList.toggle("form-submitted");
}
/*
  Ferme le message de confirmation
*/
function closeConfirmationMsg(){
  document.querySelector(".msg-confirmation").classList.toggle("form-submitted");
  document.querySelector(".button-close").classList.toggle("form-submitted");
  form.style.display="block";
  document.querySelector(".modal-body").classList.toggle("form-submitted");
  closeModal();
}

/*
  Crée un message avec les données envoyées par le formulaire
  param {event} e
  return {string}
*/
function displayFormDataSubmitted(e){
  return "Données envoyées par le formulaire : \nPrénom : " + e.target.elements["first-name"].value
  + "\nNom : " + e.target.elements["last-name"].value 
  + "\nEmail : " + e.target.elements["email"].value
  + "\nDate de naissance : " + e.target.elements["birthdate"].value
  + "\nNombre de tournois participés : " + e.target.elements["number-tournaments"].value
  + "\nLieu prochain tournoi : " + e.target.elements["location"].value 
  + "\nTerms : " + e.target.elements["terms"].value
  + "\nNewsletter : " + e.target.elements["newsletter"].value
}

// Evenement de lancement du formulaire
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Evenement de fermeture du formulaire
modalClose.addEventListener("click",closeModal);
// Evenement de vérification des champs du formulaire
form.addEventListener("submit",function(e){
  e.preventDefault();
  if(modalIsValid()){
    displayConfirmationMsg();
    console.log(displayFormDataSubmitted(e))
  }});
// Evenement de fermeture du message de confirmation
document.querySelector(".button-close").addEventListener("click",closeConfirmationMsg);
