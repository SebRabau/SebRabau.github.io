var rankMap = new Map();
var rankArr = [];
var attended = [];

//Team Types
var lowRank = [];
var medRank = [];
var highRank = [];
var unknown = [];

//Display
var displayCounter = 0;
var displayType = "";

//Rank Limits
var low = 2300;
var med = 3000;

function makeSimilar() {
    displayCounter = 0;
    
    makeLists();
    
    var counter = Math.floor(lowRank.length / 6);
    for(var i=0; i<counter; i++) {
        console.log("Displaying Low");
        displayType = "Low";
        displayCounter++;
        var prod = teamify(lowRank);
        lowRank = prod[0];
        display(prod[1]);
    }
    
    counter = Math.floor(medRank.length / 6);
    for(var i=0; i<counter; i++) {
        console.log("Displaying Med");
        displayType = "Medium";
        displayCounter++;
        var prod = teamify(medRank);
        medRank = prod[0];
        display(prod[1]);
    }
    
    counter = Math.floor(highRank.length / 6);
    for(var i=0; i<counter; i++) {
        console.log("Displaying High");        
        displayType = "High";
        displayCounter++;
        var prod = teamify(highRank);
        highRank = prod[0];
        display(prod[1]);
    }
}

function makeMixed() {
    displayCounter = 0;
    makeLists();
}

function makeLists() {
    clearLists();
    
    var spreadsheet = document.getElementById("spreadsheet");
    var attendance = document.getElementById("attendance");
    
    //Sort out spreadsheet lines
    var spreadLines = spreadsheet.value.split("\n");
    
    for(var i=0; i<spreadLines.length; i++) {
        var words = spreadLines[i].split('\t');
        if(words[4] == "") {
            words[4] = "0";
        }
        var node = [words[0], words[4]];        
        rankArr.push(node);
        
        rankMap.set(words[0], words[4]);
    }
    
    //Test sorting
    rankArr = rankArr.sort(Comparator);
    
    //Sort out attendance lines
    var attendLines = attendance.value.split("\n");
    
    for(var i=0; i<attendLines.length; i++) {
        var words = attendLines[i].split('\t');
        
        if(words[0].charAt(0) != '#' && words[1] == "attended") {
            attended.push(words[0]);
        }        
    }
    
    //Separate players in attendance
    for(var i=0; i<attended.length; i++) {
        var sr = parseInt(rankMap.get(attended[i]));
        if(sr < low) {
            lowRank.push([attended[i], sr]);
        } else if(sr < med) {
            medRank.push([attended[i], sr]);
        } else if(sr >= med) {
            highRank.push([attended[i], sr]);
        } else {
            unknown.push([attended[i], sr]);
        }
    }
    /*
    //TEST MAP
    for(var [key, value] of rankMap.entries()) {        
        console.log(key+" -> "+value);
    }
    
    console.log(attended);
    console.log(rankArr);
    console.log(lowRank);
    console.log(medRank);
    console.log(highRank);
    console.log(unknown);*/
}

function clearLists() {
    rankMap.clear();
    rankArr = [];
    attended = [];
    lowRank = [];
    medRank = [];
    highRank = [];
    unknown = [];
    
    document.getElementById("team1").innerHTML = "";
    document.getElementById("team2").innerHTML = "";
    document.getElementById("team3").innerHTML = "";
    document.getElementById("team4").innerHTML = "";
    document.getElementById("team5").innerHTML = "";
    document.getElementById("team6").innerHTML = "";
    document.getElementById("team7").innerHTML = "";
    document.getElementById("team8").innerHTML = "";
}

function teamify(players) {
    var team = [];
    //var sorted = players.sort(Comparator);
    var sorted = shuffle(players);
    
    team[0] = sorted[0];
    team[1] = sorted[1];
    team[2] = sorted[2];
    team[3] = sorted[sorted.length-1];
    team[4] = sorted[sorted.length-2];
    team[5] = sorted[sorted.length-3];
    
    sorted.pop();
    sorted.pop();
    sorted.pop();
    sorted.shift();
    sorted.shift();
    sorted.shift();
    
    return [sorted, team];
}

function display(team) {
    var div;
    
    switch(displayCounter) {
        case 1:
            div = document.getElementById("team1");
            break;
        case 2:
            div = document.getElementById("team2");
            break;
        case 3:
            div = document.getElementById("team3");
            break;
        case 4:
            div = document.getElementById("team4");
            break;
        case 5:
            div = document.getElementById("team5");
            break;
        case 6:
            div = document.getElementById("team6");
            break;
        case 7:
            div = document.getElementById("team7");
            break;
        case 8:
            div = document.getElementById("team8");
            break;
        default:
            alert("invalid team numbers");
            break;
    }
    
    div.innerHTML = displayType+" Rank Team: "+team[0]+" "+team[1]+" "+team[2]+" "+team[3]+" "+team[4]+" "+team[5]+" -> AVG Team SR: "+powerCalc(team);
    console.log("Team "+displayCounter+": "+team.toString() + " Total team power: "+powerCalc(team));
}

function Comparator(a, b) {
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function powerCalc(team) {
    var pow = 0;
    
    for(var i=0; i<team.length; i++) {
        pow += team[i][1];
    }
    
    return pow/6;
}

function setRankLimits() {
    low = parseInt(document.getElementById("low").value);
    med = parseInt(document.getElementById("med").value);
}