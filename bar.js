var game = {};
var currentPane = "bar";
var ingredientsTree = {};


function getEl(id){
    return document.getElementById(id);
}


function handleLoad(){
    getEl('nextDistDescBox').innerHTML = DEFAULT_DESC['distributor'];
    getEl('nextRefDescBox').innerHTML = DEFAULT_DESC['reference'];
    getEl('nextVenueDescBox').innerHTML = DEFAULT_DESC['venue'];
    var theTree = getEl('ingredientsTree');
    for (var i = 0; i < INGREDIENTS_SORTED.length; i++){
	var spirit = INGREDIENTS_SORTED[i].name;
	var spiritNode = {};
	spiritNode['div'] = document.createElement("div");
	spiritNode['label'] = document.createElement("div");
	spiritNode['label'].innerHTML = spirit;
	spiritNode['label'].spirit = spirit;
	spiritNode['label'].onclick = function(){ handleIngredientClick(this.spirit); };
	spiritNode['expander'] = document.createElement("span");
	spiritNode['expander'].innerHTML = "+ ";
	spiritNode['label'].insertBefore(spiritNode['expander'], spiritNode['label'].childNodes[0]);
	spiritNode['div'].appendChild(spiritNode['label']);
	spiritNode['childDiv'] = document.createElement("div");
	spiritNode['childDiv'].className = "splitPaneItemsTreeChildren";
	spiritNode['childDiv'].style.display = "none";
	spiritNode['children'] = {};
	for (var j = 0; j < INGREDIENTS_SORTED[i].types.length; j++){
	    var subtype = INGREDIENTS_SORTED[i].types[j].name;
	    var typeNode = {};
	    typeNode['div'] = document.createElement("div");
	    typeNode['label'] = document.createElement("div");
	    typeNode['label'].innerHTML = subtype;
	    typeNode['label'].spirit = spirit;
	    typeNode['label'].subtype = subtype;
	    typeNode['label'].onclick = function(){ handleIngredientClick(this.spirit, this.subtype); };
	    typeNode['expander'] = document.createElement("span");
	    typeNode['expander'].innerHTML = "+ ";
	    typeNode['label'].insertBefore(typeNode['expander'], typeNode['label'].childNodes[0]);
	    typeNode['div'].appendChild(typeNode['label']);
	    typeNode['childDiv'] = document.createElement("div");
	    typeNode['childDiv'].className = "splitPaneItemsTreeChildren";
	    typeNode['childDiv'].style.display = "none";
	    typeNode['children'] = {};
	    for (var k = 0; k < INGREDIENTS_SORTED[i].types[j].brands.length; k++){
		var brand = INGREDIENTS_SORTED[i].types[j].brands[k];
		var brandNode = {};
		brandNode['div'] = document.createElement("div");
		brandNode['label'] = document.createElement("div");
		brandNode['label'].innerHTML = brand;
		brandNode['label'].spirit = spirit;
		brandNode['label'].subtype = subtype;
		brandNode['label'].brand = brand;
		brandNode['label'].onclick = function(){
		    handleIngredientClick(this.spirit, this.subtype, this.brand);
		};
		brandNode['count'] = document.createElement("span");
		brandNode['count'].innerHTML = " (0)";
		brandNode['count'].style.visibility = "hidden";
		brandNode['label'].appendChild(brandNode['count']);
		brandNode['div'].appendChild(brandNode['label']);
		typeNode['childDiv'].appendChild(brandNode['div']);
		typeNode['children'][brand] = brandNode;
	    }
	    typeNode['div'].appendChild(typeNode['childDiv']);
	    spiritNode['childDiv'].appendChild(typeNode['div']);
	    spiritNode['children'][subtype] = typeNode;
	}
	spiritNode['div'].appendChild(spiritNode['childDiv']);
	ingredientsTree[spirit] = spiritNode;
	theTree.appendChild(spiritNode['div']);
    }
/////
//
    newGame();
//
/////
}

function showPane(pane){
    if (pane == currentPane){ return; }
    getEl(currentPane + "PaneBut").classList.remove("buttonSelected");
    getEl(currentPane + "Pane").style.visibility = "hidden";
    currentPane = pane;
    getEl(currentPane + "PaneBut").classList.add("buttonSelected");
    getEl(currentPane + "Pane").style.visibility = "visible";
}

function handleIngredientClick(spirit, subtype, brand){
    var changed = false;
    if (spirit){
	if ((!game.curIngredient) || (spirit != game.curIngredient.spirit)){ changed = true; }
	if (subtype){
	    if ((!game.curIngredient) || (subtype != game.curIngredient.spirit)){ changed = true; }
	    if (brand){
		if ((!game.curIngredient) || (brand != game.curIngredient.brand)){ changed = true; }
		game.curIngredient = {'spirit': spirit, 'subtype': subtype, 'brand': brand};
	    }
	    else{
		if ((game.curIngredient) && (game.curIngredient.brand)){ changed = true; }
		game.curIngredient = {'spirit': spirit, 'subtype': subtype};
		if (ingredientsTree[spirit]['children'][subtype]['expander'].innerHTML == "+ "){
		    ingredientsTree[spirit]['children'][subtype]['childDiv'].style.display = "block";
		    ingredientsTree[spirit]['children'][subtype]['expander'].innerHTML = "- ";
		}
		else{
		    ingredientsTree[spirit]['children'][subtype]['childDiv'].style.display = "none";
		    ingredientsTree[spirit]['children'][subtype]['expander'].innerHTML = "+ ";
		}
	    }
	}
	else{
	    if ((game.curIngredient) && (game.curIngredient.subtype)){ changed = true; }
	    game.curIngredient = {'spirit': spirit};
	    if (ingredientsTree[spirit]['expander'].innerHTML == "+ "){
		ingredientsTree[spirit]['childDiv'].style.display = "block";
		ingredientsTree[spirit]['expander'].innerHTML = "- ";
	    }
	    else{
		ingredientsTree[spirit]['childDiv'].style.display = "none";
		ingredientsTree[spirit]['expander'].innerHTML = "+ ";
	    }
	}
    }
    else{
	if (game.curIngredient){ changed = true; }
	game.curIngredient = null;
    }
    if (changed){
	populateIngredientDetails();
    }
}


function formatNumber(n){
/////
//
    //format n based on settings
    return n.toLocaleString();
//
/////
}

function populateStatBlock(){
    getEl('moneyBox').innerHTML = game.money;
    getEl('moneyProgBar').style.width = `${(game.money * 100) / game.moneyGoal}%`;
    getEl('moneyProgText').innerHTML = `$${formatNumber(game.money)} / $${formatNumber(game.moneyGoal)}`;
    //income, ...
}

function populateBarPane(){
    //...
}

function populateIngredientsTree(){
    //ingredientsTree
}

function populateIngredientDetails(){
    if ((game.curIngredient) && (game.curIngredient.spirit)){
	var itmName, curItem;
	if ((game.curIngredient.subtype) && (game.curIngredient.brand)){
	    itmName = game.curIngredient.brand;
	    curItem = INGREDIENTS[game.curIngredient.spirit][game.curIngredient.subtype][game.curIngredient.brand];
	}
	else if (game.curIngredient.subtype){
	    itmName = game.curIngredient.subtype;
	    curItem = INGREDIENTS[game.curIngredient.spirit][game.curIngredient.subtype];
	}
	else{
	    itmName = game.curIngredient.spirit;
	    curItem = INGREDIENTS[game.curIngredient.spirit];
	}
	getEl('ingredientNameBox').innerHTML = itmName;
	if ((game.curIngredient.subtype) && (game.curIngredient.brand)){
/////
//
	    getEl('ingredientPriceBox').innerHTML = "???"; //curItem.price * distributor factor
	    getEl('ingredientOwnedBox').innerHTML = "???"; //Math.floor(how many bottles owned)
	    getEl('ingredientOpenBox').style.visibility = "inherit"; //hidden if owned is integer
	    getEl('ingredientOpenBar').style.width="100%"; //fractional part of owned
	    getEl('ingredientBuyRegion').style.visibility = "inherit"; //hidden if distributor doesn't sell
	    getEl('ingredientAutoStockRegion').style.visibility = "hidden"; //inherit if can auto-stock
	    getEl('ingredientAutoStockBox').checked = false; //true if auto-stocking
//
/////
	}
	else{
	    getEl('ingredientPriceBox').innerHTML = "n/a";
	    getEl('ingredientOwnedBox').innerHTML = "n/a";
	    getEl('ingredientOpenBox').style.visibility = "hidden";
	    getEl('ingredientOpenBar').style.width = "100%";
	    getEl('ingredientBuyRegion').style.visibility = "hidden";
	    getEl('ingredientAutoStockRegion').style.visibility = "hidden";
	    getEl('ingredientAutoStockBox').checked = false;
	}
	getEl('ingredientSweetBar').style.width = `${curItem.flavor.sweet * 100}%`;
	getEl('ingredientSourBar').style.width = `${curItem.flavor.sour * 100}%`;
	getEl('ingredientBitterBar').style.width = `${curItem.flavor.bitter * 100}%`;
	getEl('ingredientSavoryBar').style.width = `${curItem.flavor.savory * 100}%`;
	getEl('ingredientFloralBar').style.width = `${curItem.flavor.floral * 100}%`;
	getEl('ingredientSpicyBar').style.width = `${curItem.flavor.spicy * 100}%`;
	getEl('ingredientSmokyBar').style.width = `${curItem.flavor.smoky * 100}%`;
	getEl('ingredientDryBar').style.width = `${curItem.flavor.dry * 100}%`;
	getEl('ingredientDescBox').innerHTML = curItem.description || "This item is mysteriously un-described.";
    }
    else{
	getEl('ingredientNameBox').innerHTML = "Water";
	getEl('ingredientPriceBox').innerHTML = "0";
	getEl('ingredientOwnedBox').innerHTML = "As much as you want";
	getEl('ingredientOpenBox').style.visibility = "hidden";
	getEl('ingredientOpenBar').style.width = "100%";
	getEl('ingredientBuyRegion').style.visibility = "hidden";
	getEl('ingredientAutoStockRegion').style.visibility = "hidden";
	getEl('ingredientAutoStockBox').checked = false;
	getEl('ingredientSweetBar').style.width = "0%";
	getEl('ingredientSourBar').style.width = "0%";
	getEl('ingredientBitterBar').style.width = "0%";
	getEl('ingredientSavoryBar').style.width = "0%";
	getEl('ingredientFloralBar').style.width = "0%";
	getEl('ingredientSpicyBar').style.width = "0%";
	getEl('ingredientSmokyBar').style.width = "0%";
	getEl('ingredientDryBar').style.width = "0%";
	getEl('ingredientDescBox').innerHTML = "This stuff covers 2/3 of the planet; you may have seen it before.";
    }
}

function populateStockPane(){
    populateIngredientsTree();
    populateIngredientDetails();
    var curDist = CITIES[game.city].distributors[game.distributor], nextDist = null;
    if (game.nextDistributor >= 0){
	nextDist = CITIES[game.city].distributors[game.nextDistributor];
    }
    getEl('curDistBox').innerHTML = curDist.name;
    getEl('curDistDescBox').innerHTML = curDist.description;
    //nextDistBox
    //distProgBar
    //nextDistDescBox
    //...
}

function populateDrinksPane(){
    //...
}

function populateStaffPane(){
    //...
}

function populateLocationsPane(){
    //...
}

function populatePerksPane(){
    //...
}

function populateAchievementsPane(){
    //...
}

function populateOptionsPane(){
    //...
}

function showGame(){
    populateStatBlock();
    populateBarPane();
    populateStockPane();
    populateDrinksPane();
    populateStaffPane();
    populateLocationsPane();
    populatePerksPane();
    populateAchievementsPane();
    populateOptionsPane();
}


function updateDistributor(populate){
    //figure out new ingredients tree based on game.distributor
    if (game.distributor + 1 < CITIES[game.city].distributors.length){
	game.nextDistributor = game.distributor + 1;
    }
    else{
	game.nextDistributor = -1;
    }
    //...
    if (populate){
	//populate distributor-related stuff
    }
}

function updateReference(populate){
    //figure out new drinks tree based on game.reference
    //figure out next reference based on game.reference and REFERENCES
}

function updateLocation(populate){
    //figure out new venue improvements based on game.city and game.venue
    if (game.venue + 1 < CITIES[game.city].venues.length){
	game.nextCity = game.city;
	game.nextVenue = game.venue + 1;
    }
    else if (game.city + 1 < CITIES.length){
	game.nextCity = game.city + 1;
	game.nextVenue = 0;
    }
    else{
	game.nextCity = -1;
	game.nextVenue = -1;
    }
    if ((game.nextCity >= 0) && (game.nextVenue >= 0)){
	game.moneyGoal = CITIES[game.nextCity].venues[game.nextVenue].cost;
    }
    else{
	game.moneyGoal = FINAL_MONEY_GOAL;
    }
    //...
    if (populate){
	//populate location-related stuff
    }
}

function newGame(){
    game = JSON.parse(JSON.stringify(NEW_GAME_STATE));
    updateDistributor();
    updateReference();
    updateLocation();
    showGame();
}

//loadGame, saveGame
