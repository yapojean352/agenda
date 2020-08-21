"use strict";
import {
    semaineNav
} from "./semaine.js";
import {} from "./storage.js";
import {
    myCalendar,
    navigationHandler
} from "./mois.js";

//semaineNav
let weekDayName = 'DIM LUN MARD MER JEU VEND SAM'.split(' ');
const BASE_API = "https://e1995685.webdev.cmaisonneuve.qc.ca/agendax/event";
//fonction chargement

//fonction chargement
$(() => {
    console.log("jQuery party");

    $.getJSON(BASE_API, (data) => {
        let items = "";
        let table;
        let cells;
        let i = 0;
        items += `<table id="grille">`;
        if (document.getElementById('mois').checked == true) {
            for (let d of weekDayName) {
                items += `<th>${d}</th>`;
            }
        }
        items += `</table>`;
        $("#app").append(items);
        $('.prev-week').click(function () {
            if (document.getElementById('semaine').checked == true) {
                semaineNav(--i, data);
            }
            if (document.getElementById('mois').checked == true) {
                navigationHandler(-1, data);
                table = $("#grille");
                cells = table.find("td.test").find("p");
            }

        });
        $('.next-week').click(function () {
            if (document.getElementById('semaine').checked == true) {
                semaineNav(++i, data);
            }
            if (document.getElementById('mois').checked == true) {
                navigationHandler(1, data);
                table = $("#grille");
                cells = table.find("td.test").find("p");
            }


        });
        if (document.getElementById('semaine').checked == true) {
            semaineNav(0, data);
        }
        if (document.getElementById('mois').checked == true) {
            myCalendar(data);
        }
        table = $("#grille");
        cells = table.find("td.test").find("p");
        table.on({
            "mousedown": evt => {
                //récuperer les données de l'événement au click
                $.getJSON(BASE_API + "/" + $(evt.target).data("event-id"), (data) => {
                    if (evt.target.tagName == "P") {
                        $("#cadreM").append(`<div id='contenu'><button class="suppr">Supprimer l'evenement</button> <button class="fermer">Fermer</button> 
          <form id="Form">
          <div class="form-group">
          
          <input class="form-control" type="hidden" name="eventid" value="${data[0].id}">
          <h3 class="modal-title">Modification d'un événement</h3>
          <input class="form-control" type="text" name="evname" value="${data[0].name}">
          <br> Date Debut actuel<strong>${data[0].startdt}</strong>
          <input class="form-control" type="datetime-local" name="eventstart" value="${data[0].startdt}">
          <br>Date Fin actuel<strong>${data[0].enddt} </strong>
          <input class="form-control" type="datetime-local" name="eventend" value="${data[0].enddt}">
          <select name="categorie" id="category"class="form-control">
                        <option value="${data[0].category}" selected >${data[0].category}</option>
                        <option value="Quotidien" >Quotidien</option>
                        <option value="Famille" >Famille</option>
                        <option value="Education">Education</option>
                        <option value="Sport">Sport</option>
                        <option value="Festive">Festive</option>
                        <option value="Sante">Sante</option>
                        <option value="Environnement">Environnement</option>
                        <option value="Reunions">Reunions</option>
                        <option value="Loisirs">Loisirs</option>

                      </select>
                      </div>
           </form><button id="modifier">Modifier</button ></div>`);

                        //event du bouton modifier
                        $("#modifier")
                            .click(() => {
                                const API_MODIFIER = BASE_API + "/" + $("input[name=eventid]").val();
                                $.ajax({
                                    url: API_MODIFIER,
                                    type: "put",
                                    data: JSON.stringify({
                                        "name": $("input[name=evname]").val(),
                                        "startdt": $("input[name=eventstart]").val(),
                                        "enddt": $("input[name=eventend]").val(),
                                        "category": $("select[name=categorie]").val(),
                                    }),
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    dataType: 'json',
                                    complete: (data) => {
                                        console.log("Evenement mis a jour", data);
                                        location.reload();
                                    }
                                });

                            });
                        $(".suppr").click((evt) => {
                            const API_SUPPRIMER = BASE_API + "/" + +$("input[name=eventid]").val();
                            $.ajax({
                                url: API_SUPPRIMER,
                                type: "delete",
                                data: '',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                dataType: 'json',
                                complete: (data) => {
                                    console.log("Evenement supprimé", data);
                                    location.reload();
                                }
                            });
                        });
                        $(".fermer").click((evt) => {
                            location.reload();

                        });
                        $("#ok").click((evt) => {
                            location.reload();

                        });
                    }
                });
            }

        });

    });

    // Ajout d'événement
    $("#btnAjoutEvent").click(evt => {
        // Event data

        let eventData = {
            name: $("input[name=eventname]").val(),
            startdt: $("input[name=eventstartdate]").val(),
            enddt: $("input[name=eventenddate]").val(),
            category: $("select[name=category]").val(),
        }
        console.log("Ajouter evenement", eventData);
        const API_AJOUTER = BASE_API;
        $.ajax({
            url: API_AJOUTER,
            type: "post",
            data: JSON.stringify(eventData),
            headers: {
                "Content-Type": "application/json"
            },
            dataType: 'json',
            complete: (data) => {
                console.log("Evenement ajouté", data);
                location.reload();
            }
        });
    });
});
