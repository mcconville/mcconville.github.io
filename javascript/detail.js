/*global google Tabletop Showdown*/
/*jslint browser:true*/

function getUrlParameters(parameter, staticURL, decode) {
    /*
     Function: getUrlParameters
     Description: Get the value of URL parameters either from
                  current URL or static URL
     Author: Tirumal
     URL: www.code-tricks.com
    */
    var currLocation = (staticURL.length) ? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        } else {
            returnBool = false;
        }
    }

    if (!returnBool) return false;
}

function renderSelected(project) {

    var selectedProject = getUrlParameters("project", "", true);

    var converter = new Showdown.converter();

    if (project.name === selectedProject) {

        var breadcrumb = document.getElementById("projectname");

        breadcrumb.innerHTML = project.name;

        var pagetitle = document.getElementById('pagetitle');

        //        pagetitle.innerHTML = project.name + " - a project by Anton McConville";

        var view = document.getElementById("phone");

        view.src = "../screens/" + project.view;

        var overviewArea = document.getElementById("overview");

        overviewArea.innerHTML = converter.makeHtml(project.overview);

        var designGoalArea = document.getElementById("designgoal");

        //        designGoalArea.innerHTML = converter.makeHtml(project.goal);

        var technologyArea = document.getElementById("technology");

        technologyArea.innerHTML = converter.makeHtml(project.tech);

        var storyArea = document.getElementById("story");

        storyArea.innerHTML = converter.makeHtml(project.story);

        var site = document.getElementById("site");

        site.href = project.website;

        var repo = document.getElementById("repo");

        repo.href = project.repo;
    }
}

function showInfo(data) {
    var projects = data.projects.elements;
    console.log(projects);
    projects.forEach(renderSelected);

    projects.forEach(function (project) {
        console.log(project);
    });
}

function readGoogleData() {

    var spreadsheet = 'https://docs.google.com/spreadsheets/d/1921mR52Qtwtu0RyHvF3MFyLTR2yekTkoVlEjEWtS0WQ/pubhtml';

    Tabletop.init({
        key: spreadsheet,
        callback: showInfo
    });
}



function readLocalData() {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            console.log(data);

            showInfo(data);
        }
    }

    xmlhttp.open("GET", "../data.json", true);
    xmlhttp.send();
}


window.onload = function () {

    var live = false;

    if (live === true) {
        readLocalData();
    } else {
        readGoogleData()
    }
};
