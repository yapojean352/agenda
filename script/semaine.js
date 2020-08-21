"use strict";

let CURRENT_DATE = new Date();
let dat = new Date();
let content = 'Janvier Février Mars Avril Mai Juin Juillet Août Septembre Octobre Novembre Decembre'.split(' ');
let weekDayName = 'DIM LUN MARD MER JEU VEND SAM'.split(' ');
let daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let Day = ['lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'samedi', 'Dimanche'];
let dateDebut;
let heureDebut;
let dateFin;
let heureFin;
let jourDebut;
let moisDebut;
let anneeDebut;
let mois;
let jour;
let annee;
let tabday = [];
let $table;
let cible;
let cells;
let j, k, l, c, d, crr, doc, nds, lnk, lnl, newMon;

Number.prototype.twoDigits = function () {
    return this < 10 ? '0' + this : '' + this
}
/**
 *  aaaammjj avec un vrai mois
 * 
 * @param {*} d  date
 */
export function dateToStr(d) {
    return d.getFullYear() + (d.getMonth() + 1).twoDigits() + d.getDate().twoDigits();
}
/**
 * fonction d'affichage des semaines
 * @param {*} w  indice
 * @param {*} crrDay  jour courant
 * @param {*} newMon  mois actu
 */
function displayWeek(w, crrDay, newMon) {

    lnk = lnl = '';
    crr = new Date(newMon);
    crr.setDate(crr.getDate() + (typeof (w) == "undefined" ? 0 : 7 * w));
    newMon = new Date(crr);
    $("div#cadreS").innerHTML = "";
    // Semaine
    let obj = document.createElement("tr")
    obj.id = "tr1";
    let objheure = document.createElement("th")

    for (let das of weekDayName) {
        d = crr.getDay();
        if (d < 10) {
            c = l = "";
            if (d == 0) c = ' class="der"';
            if (crr.valueOf() == crrDay.valueOf()) l = ' class="crr"';
            let objth = document.createElement("th");
            objth.id = "day" + crr.getDay();
            objth.className = "day";
            j = weekDayName[crr.getDay()] + " " + crr.getDate();
            k = dateToStr(crr);
            objth.innerHTML = '<span>' + lnk + j + lnl + '</span><br><span>' + content[crr.getMonth()] + ' ' + crr.getFullYear() +
                '</span><hr><div id="cnt"' + crr.getDay() + 1 + '">&nbsp;</div>';
            $(objheure).text("Horaire");
            $(obj).append(objth);
        }
        crr.setDate(crr.getDate() + 1);

    }
    $(".month-year").append("Semaine de " + lnk + j + lnl);
    $(obj).prepend(objheure);
    $("table#grille").prepend(obj);
}
/**
 * fonction de rafraichissement de la page
 */
function clearWeek() {
    let $trs = $('tr').eq(0);
    $trs.remove();
    $('.month-year').empty();
}
/**
 * fonction de la navigation 
 * @param {*} w  indice de navigation
 * @param {*} data donnees venant du serveur en Json
 */
export function semaineNav(w, data) {
    let crrDays = new Date(),
        crrMons, newMons;
    crrDays.setHours(12, 0, 0, 0);
    crrMons = new Date(crrDays);
    while (crrMons.getDay() != 1) crrMons.setDate(crrMons.getDate() - 1);
    newMons = new Date(crrMons); //alert("ok "+crrDay.toLocaleString())
    cleartd();
    getSemaineRow();
    clearWeek();
    displayWeek(w, crrDays, newMons);
    renderSemaine(data);

}

/**
 * Génére une ligne de tableau utilisée lors du rendu du calendrier
 */
function getSemaineRow() {
    let $table = $('table');
    let $ro;
    for (let j = -1; j < 24; j++) {
        $ro = getRowSemaine(j);
        $table.append($ro);
    }
}


/**
 * Calendrier de rendu avec les données par semaine

 * @param {*} data 
 */
export default function renderSemaine(data) {
    let selection = {
        debut: {
            l: 0,
            c: 0
        },
        fin: {
            l: 0,
            c: 0
        }

    };

    //récuperation des valeurs de la navigation
    //jours
    let jour1 = $($("#day1").find("span:first")).text().split(" ")[1];
    let jour2 = $($("#day2").find("span:first")).text().split(" ")[1];
    let jour3 = $($("#day3").find("span:first")).text().split(" ")[1];
    let jour4 = $($("#day4").find("span:first")).text().split(" ")[1];
    let jour5 = $($("#day5").find("span:first")).text().split(" ")[1];
    let jour6 = $($("#day6").find("span:first")).text().split(" ")[1];
    let jour7 = $($("#day0").find("span:first")).text().split(" ")[1];
    //mois

    let mois1 = $($("#day1").find("span:last")).text().split(" ")[0];
    let mois2 = $($("#day2").find("span:last")).text().split(" ")[0];
    let mois3 = $($("#day3").find("span:last")).text().split(" ")[0];
    let mois4 = $($("#day4").find("span:last")).text().split(" ")[0];
    let mois5 = $($("#day5").find("span:last")).text().split(" ")[0];
    let mois6 = $($("#day6").find("span:last")).text().split(" ")[0];
    let mois7 = $($("#day0").find("span:last")).text().split(" ")[0];
    //année
    let annee1 = $($("#day1").find("span:last")).text().split(" ")[1];
    let annee2 = $($("#day2").find("span:last")).text().split(" ")[1];
    let annee3 = $($("#day3").find("span:last")).text().split(" ")[1];
    let annee4 = $($("#day4").find("span:last")).text().split(" ")[1];
    let annee5 = $($("#day5").find("span:last")).text().split(" ")[1];
    let annee6 = $($("#day6").find("span:last")).text().split(" ")[1];
    let annee7 = $($("#day0").find("span:last")).text().split(" ")[1];
    let col;
    //constrction du jour
    jour1 = (jour1) < 10 ? "0" + (jour1) : (jour1);
    jour2 = (jour2) < 10 ? "0" + (jour2) : (jour2);
    jour3 = (jour3) < 10 ? "0" + (jour3) : (jour3);
    jour4 = (jour4) < 10 ? "0" + (jour4) : (jour4);
    jour5 = (jour5) < 10 ? "0" + (jour5) : (jour5);
    jour6 = (jour6) < 10 ? "0" + (jour6) : (jour6);
    jour7 = (jour7) < 10 ? "0" + (jour7) : (jour7);
    console.log(jour1);
    console.log(jour2);

    //construction du mois 
    mois1 = (content.indexOf(mois1) + 1) < 10 ? "0" + (content.indexOf(mois1) + 1) : (content.indexOf(mois1) + 1);
    mois2 = (content.indexOf(mois2) + 1) < 10 ? "0" + (content.indexOf(mois2) + 1) : (content.indexOf(mois2) + 1);
    mois3 = (content.indexOf(mois3) + 1) < 10 ? "0" + (content.indexOf(mois3) + 1) : (content.indexOf(mois3) + 1);
    mois4 = (content.indexOf(mois4) + 1) < 10 ? "0" + (content.indexOf(mois4) + 1) : (content.indexOf(mois4) + 1);
    mois5 = (content.indexOf(mois5) + 1) < 10 ? "0" + (content.indexOf(mois5) + 1) : (content.indexOf(mois5) + 1);
    mois6 = (content.indexOf(mois6) + 1) < 10 ? "0" + (content.indexOf(mois6) + 1) : (content.indexOf(mois6) + 1);
    mois7 = (content.indexOf(mois7) + 1) < 10 ? "0" + (content.indexOf(mois7) + 1) : (content.indexOf(mois7) + 1);

    $(".heure").find("TD").each((i, val) => {
        for (let inf of data) {

            //récuperation des valeurs debut
            dateDebut = inf.startdt.split(' ')[0];
            heureDebut = inf.startdt.split(' ')[1];

            moisDebut = dateDebut.split('-')[1];
            jourDebut = dateDebut.split('-')[2];
            //  console.log("jour debut",jourDebut);
            anneeDebut = dateDebut.split('-')[0];
            //récuperation des valeurs fin 
            dateFin = inf.enddt.split(' ')[0];
            heureFin = inf.enddt.split(' ')[1];
            //   console.log(jour);
            mois = dateFin.split('-')[1];
            jour = dateFin.split('-')[2];
            annee = dateFin.split('-')[0];

            //test de controle dses données
            if ($(val).find("span:first").text() === heureDebut.split(":")[0] && (moisDebut == mois1 || moisDebut == mois2 || moisDebut == mois3 || mois == mois4 ||
                    moisDebut == mois5 || moisDebut == mois6 || moisDebut == mois7) &&
                (jourDebut == jour1 || jourDebut == jour2 || jourDebut == jour3 || jourDebut == jour4 || jourDebut == jour5 || jourDebut == jour6 || jourDebut == jour7) &&
                (anneeDebut == annee1 || anneeDebut == annee2 || anneeDebut == annee3 || anneeDebut == annee4 || anneeDebut == annee5 || anneeDebut == annee6 || anneeDebut ==
                    annee7)) {

                $(val).nextAll().each((i, v) => {
                    //  console.log("jr",$($($(v).parent()).siblings().get(0)).find("#day0").find("span:first").text().split(" ")[1]);
                    let j1 = $($($(v).parent()).siblings().get(0)).find("#day1").find("span:first").text().split(" ")[1];
                    let j2 = $($($(v).parent()).siblings().get(0)).find("#day2").find("span:first").text().split(" ")[1];
                    let j3 = $($($(v).parent()).siblings().get(0)).find("#day3").find("span:first").text().split(" ")[1];
                    let j4 = $($($(v).parent()).siblings().get(0)).find("#day4").find("span:first").text().split(" ")[1];
                    let j5 = $($($(v).parent()).siblings().get(0)).find("#day5").find("span:first").text().split(" ")[1];
                    let j6 = $($($(v).parent()).siblings().get(0)).find("#day6").find("span:first").text().split(" ")[1];
                    let j7 = $($($(v).parent()).siblings().get(0)).find("#day0").find("span:first").text().split(" ")[1];

                    let m1 = $($($(v).parent()).siblings().get(0)).find("#day1").find("span:last").text().split(" ")[0];
                    let m2 = $($($(v).parent()).siblings().get(0)).find("#day2").find("span:last").text().split(" ")[0];
                    let m3 = $($($(v).parent()).siblings().get(0)).find("#day3").find("span:last").text().split(" ")[0];
                    let m4 = $($($(v).parent()).siblings().get(0)).find("#day4").find("span:last").text().split(" ")[0];
                    let m5 = $($($(v).parent()).siblings().get(0)).find("#day5").find("span:last").text().split(" ")[0];
                    let m6 = $($($(v).parent()).siblings().get(0)).find("#day6").find("span:last").text().split(" ")[0];
                    let m7 = $($($(v).parent()).siblings().get(0)).find("#day0").find("span:last").text().split(" ")[0];

                    let anne1 = $($($(v).parent()).siblings().get(0)).find("#day1").find("span:last").text().split(" ")[1];
                    let anne2 = $($($(v).parent()).siblings().get(0)).find("#day2").find("span:last").text().split(" ")[1];
                    let anne3 = $($($(v).parent()).siblings().get(0)).find("#day3").find("span:last").text().split(" ")[1];
                    let anne4 = $($($(v).parent()).siblings().get(0)).find("#day4").find("span:last").text().split(" ")[1];
                    let anne5 = $($($(v).parent()).siblings().get(0)).find("#day5").find("span:last").text().split(" ")[1];
                    let anne6 = $($($(v).parent()).siblings().get(0)).find("#day6").find("span:last").text().split(" ")[1];
                    let anne7 = $($($(v).parent()).siblings().get(0)).find("#day0").find("span:last").text().split(" ")[1];
                    //controle des mjour
                    j1 = (j1) < 10 ? "0" + (j1) : (j1);
                    j2 = (j2) < 10 ? "0" + (j2) : (j2);
                    j3 = (j3) < 10 ? "0" + (j3) : (j3);
                    j4 = (j4) < 10 ? "0" + (j4) : (j4);
                    j5 = (j5) < 10 ? "0" + (j5) : (j5);
                    j6 = (j6) < 10 ? "0" + (j6) : (j6);
                    j7 = (j7) < 10 ? "0" + (j7) : (j7);

                    m1 = (content.indexOf(m1) + 1) < 10 ? "0" + (content.indexOf(m1) + 1) : (content.indexOf(m1) + 1);
                    m2 = (content.indexOf(m2) + 1) < 10 ? "0" + (content.indexOf(m2) + 1) : (content.indexOf(m2) + 1);
                    m3 = (content.indexOf(m3) + 1) < 10 ? "0" + (content.indexOf(m3) + 1) : (content.indexOf(m3) + 1);
                    m4 = (content.indexOf(m4) + 1) < 10 ? "0" + (content.indexOf(m4) + 1) : (content.indexOf(m4) + 1);
                    m5 = (content.indexOf(m5) + 1) < 10 ? "0" + (content.indexOf(m5) + 1) : (content.indexOf(m5) + 1);
                    m6 = (content.indexOf(m6) + 1) < 10 ? "0" + (content.indexOf(m6) + 1) : (content.indexOf(m6) + 1);
                    m7 = (content.indexOf(m7) + 1) < 10 ? "0" + (content.indexOf(m7) + 1) : (content.indexOf(m7) + 1);
                    selection.fin.c = $(v).index();
                    //séléction de la cible
                    if ((selection.fin.c == $($($(v).parent()).siblings().get(0)).find("#day6").index() && m6 == moisDebut && anne6 == anneeDebut &&
                            jourDebut == j6 &&
                            $(val).find("span:first").text() === heureDebut.split(":")[0])) {
                        v.classList.add("selected");

                        $(v).append(`<p class="${inf.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${inf.id}> ${inf.name} <br> ${(inf.startdt).substr(11,8)} ,${(inf.enddt).substr(11, 8)}
            </p>`);



                    }
                    if ((selection.fin.c == $($($(v).parent()).siblings().get(0)).find("#day0").index() && m7 == moisDebut && anne7 == anneeDebut &&
                            jourDebut == j7 &&
                            $(val).find("span:first").text() == heureDebut.split(":")[0])) {
                        v.classList.add("selected");

                        $(v).append(`<p class="${inf.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${inf.id}> ${inf.name} <br> ${(inf.startdt).substr(11,8)} , ${(inf.enddt).substr(11, 8)}
            </p>`);
                    }
                    if ((selection.fin.c == $($($(v).parent()).siblings().get(0)).find("#day5").index() && m5 == moisDebut && anne5 == anneeDebut &&
                            jourDebut == j5 &&
                            $(val).find("span:first").text() == heureDebut.split(":")[0])) {
                        v.classList.add("selected");
                        $(v).append(`<p class="${inf.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${inf.id}> ${inf.name} <br> ${(inf.startdt).substr(11,8)} , ${(inf.enddt).substr(11, 8)}
            </p>`);
                    }
                    if ((selection.fin.c == $($($(v).parent()).siblings().get(0)).find("#day4").index() && m4 == moisDebut && anne4 == anneeDebut &&
                            jourDebut == j4 &&
                            $(val).find("span:first").text() == heureDebut.split(":")[0])) {
                        v.classList.add("selected");
                        $(v).append(`<p class="${inf.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${inf.id}> ${inf.name} <br> ${(inf.startdt).substr(11,8)} , ${(inf.enddt).substr(11, 8)}
            </p>`);
                    }
                    if ((selection.fin.c == $($($(v).parent()).siblings().get(0)).find("#day3").index() && m3 == moisDebut && anne3 == anneeDebut &&
                            jourDebut == j3 &&
                            $(val).find("span:first").text() == heureDebut.split(":")[0])) {
                        v.classList.add("selected");
                        $(v).append(`<p class="${inf.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${inf.id}> ${inf.name} <br> ${(inf.startdt).substr(11,8)} , ${(inf.enddt).substr(11, 8)}
            </p>`);

                    }
                    if ((selection.fin.c == $($($(v).parent()).siblings().get(0)).find("#day2").index() && m2 == moisDebut && anne2 == anneeDebut &&
                            jourDebut == j2 &&
                            $(val).find("span:first").text() == heureDebut.split(":")[0])) {
                        v.classList.add("selected");
                       $(v).append(`<p class="${inf.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${inf.id}> ${inf.name} <br> ${(inf.startdt).substr(11,8)} , ${(inf.enddt).substr(11, 8)}
            </p>`);
                    }
                    if ((selection.fin.c == $($($(v).parent()).siblings().get(0)).find("#day1").index() && m1 == moisDebut && anne1 == anneeDebut &&
                            jourDebut == j1 &&
                            $(val).find("span:first").text() == heureDebut.split(":")[0])) {
                        v.classList.add("selected");
                        $(v).append(`<p class="${inf.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${inf.id}> ${inf.name} <br> ${(inf.startdt).substr(11,8)} , ${(inf.enddt).substr(11, 8)}
            </p>`);
                    }
                });
            }


        }

    });

}
/**
 * function construction des heures
 * param heure heure creer
 */

export function getRowSemaine(heure) {
    let row;
    return row = `<tr class="heure"><td><span>${heure<10? "0": ''}${heure}</span>H<br><span>${heure+1<10? "0": ''}${heure+1 == 24? "00":heure+1}</span>H</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`
}
/**
 * function nettoyage  pour le rafraichissement
 * Effacer le calendrier généré
 */
export function cleartd() {
    let $tds = $('td');
    $tds.remove();
}
