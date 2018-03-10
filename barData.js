var DEFAULT_DESC = {
    'distributor':	"Sell more drinks to attract the attention of a better distributor.",
    'reference':	"Buying cocktail references will teach you new drinks, and may even inspire you.",
    'venue':		"Buying a nicer venue will improve your atmosphere and attract more discerning patrons.",
};

var FLAVORS = ["sweet", "sour", "bitter", "savory", "floral", "spicy", "smoky", "dry"];

var INGREDIENTS = {
    "Gin": {
	'description': "Gin is manufactured by infusing a neutral spirit with juniper berries and other " +
			"botanicals.  It is a clear spirit with a clean flavor and herby overtones.  " +
			"If you've ever wanted to drink a Christmas tree, now's your chance.",
	"London Dry": {
	    'description': "If you've only ever tasted one style of gin, this is the style you've tasted",
	    "Bathe & Tubbs'": {
		'price': 7,
		'quality': .65,
		'flavor': {
		    'sweet': 0,
		    'sour': 0,
		    'bitter': .2,
		    'savory': 0,
		    'floral': .3,
		    'spicy': 0,
		    'smoky': 0,
		    'dry': 1
		},
		'abv': 42.5,
		'description': "This compound gin has notes of juniper, municipal tap water, and " +
				'"why am I drinking this crap?"'
	    },
	    "Lakechart's": {
		'price': 10,
		'quality': 1,
		'flavor': {
		    'sweet': 0,
		    'sour': 0,
		    'bitter': .1,
		    'savory': 0,
		    'floral': .2,
		    'spicy': 0,
		    'smoky': 0,
		    'dry': .5
		},
		'abv': 40,
		//description
	    },
	},
	"Genever": {
	    //description
	},
	"Old Tom": {
	    //description
	},
	"New American": {
	    //description
	},
	"Sloe": {
	    //description
	},
    },
    "Rum": {
	//description
	"White": {
	    //description
	},
	"Gold": {
	    //description
	},
	"Aged": {
	    //description
	},
	"Overproof": {
	    //description
	},
	"Agricole": {
	    //description
	},
	"Cachaça": {
	    //description
	},
	"Spiced": {
	    //description
	},
    },
    "Agave": {
	//description
	"Tequila Blanco": {
	    //description
	},
	"Tequila Reposado": {
	    //description
	},
	"Tequila Añejo": {
	    //description
	},
	"Mezcal": {
	    //description
	},
    },
    "Vodka": {
	//description
	//???
    },
    "Whiskey": {
	//description
	"Bourbon": {
	    //description
	},
	"Rye": {
	    //description
	},
	"Scotch/Japanese": {
	    //description
	}
    },
    "Liqueurs": {
	//description
	//...
    },
    "Mixers": {
	//description
	"Carbonated": {
	    //description
	},
	"Juices": {
	    //description
	},
	"Syrups/Cordials": {
	    //description
	}
    }
};

var INGREDIENTS_SORTED = [
    {
	'name': "Gin",
	'types': [
	    "London Dry",
	    "Genever",
	    "Old Tom",
	    "New American",
	    "Sloe"
	]
    },
    {
	'name': "Rum",
	'types': [
	    "White",
	    "Gold",
	    "Aged",
	    "Overproof",
	    "Agricole",
	    "Cachaça",
	    "Spiced"
	]
    },
    {
	'name': "Agave",
	'types': [
	    "Tequila Blanco",
	    "Tequila Reposado",
	    "Tequila Añejo",
	    "Mezcal"
	]
    },
    {
	'name': "Vodka",
	'types': [
	]
    },
    {
	'name': "Whiskey",
	'types': [
	    "Bourbon",
	    "Rye",
	    "Scotch/Japanese"
	]
    },
    {
	'name': "Liqueurs",
	'types': [
	]
    },
    {
	'name': "Mixers",
	'types': [
	    "Carbonated",
	    "Juices",
	    "Syrups/Cordials"
	]
    }
];
for (var i = 0; i < INGREDIENTS_SORTED.length; i++){
    var spirit = INGREDIENTS_SORTED[i].name;
    var spiritBrands = 0;
    INGREDIENTS[spirit]['abv'] = {'avg': 0, 'min': 999, 'max': 0};
    INGREDIENTS[spirit]['flavor'] = {};
    for (var fa = 0; fa < FLAVORS.length; fa++){
	INGREDIENTS[spirit]['flavor'][FLAVORS[fa]] = 0;
    }
    for (var j = 0; j < INGREDIENTS_SORTED[i].types.length; j++){
	var subtype = INGREDIENTS_SORTED[i].types[j];
	INGREDIENTS[spirit][subtype]['abv'] = {'avg': 0, 'min': 999, 'max': 0};
	INGREDIENTS[spirit][subtype]['flavor'] = {}
	for (var fa = 0; fa < FLAVORS.length; fa++){
	    INGREDIENTS[spirit][subtype]['flavor'][FLAVORS[fa]] = 0;
	}
	var node = {'name': subtype, 'brands': []};
	for (var name in INGREDIENTS[spirit][subtype]){
	    if ((name == "description") || (name == "flavor") || (name == "abv")){ continue; }
	    if (!INGREDIENTS[spirit][subtype].hasOwnProperty(name)){ continue; }
	    node.brands.push(name);
	    INGREDIENTS[spirit][subtype]['abv']['avg'] += INGREDIENTS[spirit][subtype][name]['abv'];
	    if (INGREDIENTS[spirit][subtype][name]['abv'] < INGREDIENTS[spirit][subtype]['abv']['min']){
		INGREDIENTS[spirit][subtype]['abv']['min'] = INGREDIENTS[spirit][subtype][name]['abv'];
	    }
	    if (INGREDIENTS[spirit][subtype][name]['abv'] > INGREDIENTS[spirit][subtype]['abv']['max']){
		INGREDIENTS[spirit][subtype]['abv']['max'] = INGREDIENTS[spirit][subtype][name]['abv'];
	    }
	    for (var fa = 0; fa < FLAVORS.length; fa++){
		var amt = INGREDIENTS[spirit][subtype][name]['flavor'][FLAVORS[fa]];
		INGREDIENTS[spirit][subtype]['flavor'][FLAVORS[fa]] += amt;
	    }
	}
	node.brands.sort((x, y) => INGREDIENTS[spirit][subtype][x].price - INGREDIENTS[spirit][subtype][y].price);
	INGREDIENTS_SORTED[i].types[j] = node;
	if (node.brands.length > 0){
	    INGREDIENTS[spirit]['abv']['avg'] += INGREDIENTS[spirit][subtype]['abv']['avg'];
	    if (INGREDIENTS[spirit][subtype]['abv']['min'] < INGREDIENTS[spirit]['abv']['min']){
		INGREDIENTS[spirit]['abv']['min'] = INGREDIENTS[spirit][subtype]['abv']['min'];
	    }
	    if (INGREDIENTS[spirit][subtype]['abv']['max'] > INGREDIENTS[spirit]['abv']['max']){
		INGREDIENTS[spirit]['abv']['max'] = INGREDIENTS[spirit][subtype]['abv']['max'];
	    }
	    INGREDIENTS[spirit][subtype]['abv']['avg'] /= node.brands.length;
	    for (var fa = 0; fa < FLAVORS.length; fa++){
		INGREDIENTS[spirit]['flavor'][FLAVORS[fa]] += INGREDIENTS[spirit][subtype]['flavor'][FLAVORS[fa]];
		INGREDIENTS[spirit][subtype]['flavor'][FLAVORS[fa]] /= node.brands.length;
	    }
	    spiritBrands += node.brands.length;
	}
	if (INGREDIENTS[spirit][subtype]['abv']['min'] > 100){ INGREDIENTS[spirit][subtype]['abv']['min'] = 0; }
    }
    if (spiritBrands > 0){
	INGREDIENTS[spirit]['abv']['avg'] /= spiritBrands;
	for (var fa = 0; fa < FLAVORS.length; fa++){
	    INGREDIENTS[spirit]['flavor'][FLAVORS[fa]] /= spiritBrands;
	}
    }
    if (INGREDIENTS[spirit]['abv']['min'] > 100){ INGREDIENTS[spirit]['abv']['min'] = 0; }
}

var CITIES = [
    {
	'name': "Podunk",
	//wealth factor (possibly other modifiers to potential customers)
	'distributors': [
	    {
		'name': "Uncle Steve",
		'unlock': 0,
		'price': 0,
		'factor': 2,
		'description': "Your uncle Steve will run to the corner store and buy a few bottles for you, " +
				"but you'll have to give him some gas money for the trip.",
		'stock': {
		    "Gin": {
			"London Dry": [
			    "Bathe & Tubbs'",
			    "Lakechart's",
			],
		    },
		}
	    }
	],
	//workers
	'venues': [
	    //...
	],
    },
];

var FINAL_MONEY_GOAL = 1e12;

var REFERENCES = [
    {
	'name': "Common Knowledge",
	'cost': 0,
	'unlock': 0,
	'description': "Everyone knows this stuff...",
	'drinks': {
	    'built': {
		"Shot": {
		    'recipe': [
			{
			    'ingredient': ["Gin", "Rum", "Agave", "Vodka", "Whiskey"],
			    'amount':	1
			},
		    ],
		    'description': "Pour contents of bottle into glass. Pour contents of glass into mouth. " +
				    "Repeat until unconscious."
		},
	    },
	}
    },
];

//perks
//achievements

var NEW_GAME_STATE = {
    'money': 0,
    //income
    'stock': {},
    'city': 0,
    'venue': 0,
    'distributor': 0,
    //staff
    'reference': 0,
    //custom drinks
    //perks
    //achievements
};
