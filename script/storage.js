"use strict";

 const NOM_storage ="user_board_storage";
// //liste des valeurs
  let items;
  let inputChoix;
  let idChoix;
  let val;

//mise a jour et restauration        
document.addEventListener("DOMContentLoaded",()=>{

  document.getElementById(JSON.parse(localStorage.user_board_storage).sliders.idc).checked=true;
 
});
//a la fermerture suavegarde
window.addEventListener("unload",evt=>{
  inputChoix =document.querySelector('input[name=calendrier]:checked').value;
  idChoix = document.querySelector('input[name=calendrier]:checked').id;
//objet storage cree
  var oStorage = {
    sliders: {
      choix:inputChoix,
      idc:idChoix,
    }
   };	
    sauvegardeItem(oStorage);
 });
//sauvegarde  items
 export function sauvegardeItem(items){
  document.getElementById("semaine").checked=false;
    localStorage.setItem(NOM_storage,JSON.stringify(items));
 }

