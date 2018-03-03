var currentPane = "bar";

function showPane(pane){
    if (pane == currentPane){ return; }
    document.getElementById(currentPane + "PaneBut").classList.remove("buttonSelected");
    document.getElementById(currentPane + "Pane").style.visibility = "hidden";
    currentPane = pane;
    document.getElementById(currentPane + "PaneBut").classList.add("buttonSelected");
    document.getElementById(currentPane + "Pane").style.visibility = "visible";
}
