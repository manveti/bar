var defaultDescs = {
    'distributor':	"Sell more drinks to attract the attention of a better distributor.",
    'reference':	"Buying cocktail references will teach you new drinks, and may even inspire you.",
    'venue':		"Buying a nicer venue will improve your atmosphere and attract more discerning patrons.",
};

var ingredients = {
    "Gin": {
	//description
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
		    'dry': .1
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
    //vodka (???)
    //whiskey (bourbon, rye, scotch/japanese)
    //liqueur (...)
    //mixers (...)
};

var cities = [
    {
	'name': "Poe Dunk",
	//wealth factor (possibly other modifiers to potential customers)
	'distributors': [
	    {
		'name': "Uncle Steve",
		'unlock': 0,
		'cost': 0,
		'factor': 2,
		'description': "Your uncle Steve will run to the corner store and buy a few bottles for you, " +
				"but you'll have to give him some gas money for the trip",
		'stock': {
		    "Gin": {
			"London Dry": [
			    "Lakechart's",
			],
		    },
		}
	    }
	],
	//workers
	//venues
    },
];

var references = [
    {
	'name': "Common Knowledge",
	'cost': 0,
	'description': "Everyone knows this stuff...",
	'drinks': {
	    'built': {
		"Shot": {
		    'recipe': [
			{
			    'ingredient': ["Gin"],
			    'amount':	1
			},
		    ],
		    'description': "Pour contents of bottle into glass. Pour contents of glass into mouth. " +
				    "Repeat until unconscious"
		},
	    },
	}
    }
];

//perks
//achievements
