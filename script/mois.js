"use strict";


let CURRENT_DATE = new Date();
let dat = new Date();
let content = 'Janvier Fevrier Mars Avril Mai Juin Juillet Août Septembre Octobre Novembre Décembre'.split(' ');
let weekDayName = 'DIM LUN MARD MER JEU VEND SAM'.split(' ');
let daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let Day = ['lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'samedi', 'Dimanche'];
let date;
let mois;
let jour;
let annee;
let tabday = [];
let $table;
let cells;
// Renvoie le jour de la semaine auquel le mois commence (ex 0 pour dimanche, 1 pour lundi, etc.)
/**
 * function recupere les premier semaine et jour de la
 * @param {*} dayOfWeek  jour de la semaine
 * @param {*} currentDate  annee courante
 */
export function getCalendarStart(dayOfWeek, currentDate) {
    let date = currentDate - 1;
    let startOffset = (date % 7) - dayOfWeek;
    if (startOffset > 0) {
        startOffset -= 7;
    }
    return Math.abs(startOffset);
}

/**
 * Génére une ligne de tableau utilisée lors du rendu du calendrier
 */
export function getCalendarRow() {
    let $table = $('table');
    let $tr = $('<tr/>');
    for (let i = 0, len = 7; i < len; i++) {
        $tr.append($('<td/>'));
    }
    $table.append($tr);
    return $tr;
}
/**
 * Calendrier de rendu
 * @param {*} startDay 
 * @param {*} totalDays 
 * @param {*} currentDate 
 * @param {*} data 
 */
export function renderCalendar(startDay, totalDays, currentDate, data) {
    let currentRow = 1;
    let currentDay = startDay;
    let $week = getCalendarRow();
    let $day;
    let $journee;
    let i = 1;
    let ess;
    for (; i <= totalDays; i++) {

        $day = $week.find('td').eq(currentDay);
        $day.text(i);
        for (let tes of data) {
            //récupération des valeurs
            date = tes.startdt.split(' ')[0];
            mois = date.split('-')[1];
            jour = date.split('-')[2];
            annee = date.split('-')[0];
            //texte des événements 
            if (annee == $('h3').text().split(' ')[$('h3').text().split(' ').length - 1] &&
                ($('h3').text().split(' ')[$('h3').text().split(' ').length - 2]) == content[parseInt(mois) - 1]) {
                if (parseInt(jour) == parseInt($day.text())) {
                    $($day).addClass('test');
                    $day.append(`<p class="${tes.category}"data-toggle="tooltip" data-placement="top" title="Cliquer pour modifier ou supprimer cet Evenement" data-event-id=${tes.id}> ${tes.name} <br> ${(tes.startdt).substr(11,8)}, ${(tes.enddt).substr(11, 8)} </p>`);
                }
                //test couleur par catégorie
                if (tes.category != "") {
                    $(".Famille").toggleClass('famille');
                    $(".Divertissement").toggleClass('divertissement');
                    $(".Education").toggleClass('education');
                    $(".Loisir").toggleClass('loisir');
                }
            }
        }
        if (i === currentDate) {
            $day.addClass('selected');
        }
        //+1 le lendemain jusqu'au samedi (6), puis réinitialis  a dimanche (0)
        currentDay = ++currentDay % 7;

        // Générer une nouvelle ligne lorsque le jour est samedi, mais uniquement s'il y a
        // jours supplémentaires 
        if (currentDay === 0 && (i + 1 <= totalDays)) {
            $week = getCalendarRow();
            currentRow++;
        }
    }
}

/**
 * function nettoyage  pour le rafraichissement
 * Effacer le calendrier généré
 */
export function clearCalendar() {
    let $trs = $('tr').not(':eq(0)');
    $trs.remove();
    $('.month-year').empty();
}
/**
 * fonction qui injecte les données dans le calendrier
 * @param {*}  données a insérer dans le calendrier
 */
export function myCalendar(data = null) {
    let month = dat.getUTCMonth();
    let day = dat.getUTCDay();
    let year = dat.getUTCFullYear();
    let date = dat.getUTCDate();
    let totalDaysOfMonth = daysOfMonth[month];

    let $h3 = $('<h3>');
    $h3.text(" " + content[month] + ' ' + year);
    $h3.appendTo('.month-year');
    let dateToHighlight = 0;

    // Déterminer si le mois et l'année sont actuels pour la mise en  évidence de la date
    if (CURRENT_DATE.getUTCMonth() === month && CURRENT_DATE.getUTCFullYear() === year) {
        dateToHighlight = date;
    }

    //Obtenir les jours de février, y compris l'année bissextile
    if (month === 1) {
        if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
            totalDaysOfMonth = 29;
        }
    }

    // Obtenir le jour de départ
    renderCalendar(getCalendarStart(day, date), totalDaysOfMonth, dateToHighlight, data);
};
/**
 * fonction genere  le calendrier a jour en fonction de la navigation
 * @param {*}   direction 
 * @param {*}  donnes envoyes
 */
export function navigationHandler(dir, data) {
    dat.setUTCMonth(dat.getUTCMonth() + dir);
    clearCalendar();
    myCalendar(data);
}
