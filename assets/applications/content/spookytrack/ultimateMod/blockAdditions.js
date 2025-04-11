const modVersion = "10.31.2024";
const modName = "SpookyTrack by cwcinc and Shovelfish"

const lbVersion = "0.4.1";

var moddedEnvironment = {
	skyColor: {
		horizon: {	// Horizon color of sky gradient (default 255 255 255)
			r: 0,
			g: 0,
			b: 0
		},
		zenith: {	// Top color of sky gradient (default 5 140 255)
			r: 30,
			g: 10,
			b: 0
		}
	},
	skyLight: {
		lightColor: {
			r: 141,	// default 59
			g: 100,	// default 97
			b: 60	// default 141
		},
		groundColor: {
			r: 195,	// default 178
			g: 170,	// default 192
			b: 130	// default 195
		},
		intensity: 6	// default 4.7
	},
	sun: {
		size: 50/1000,	// size of the sun (default 1/1000)
		intensity: 10000,	// intensity of the sun (default 60000000000)
		color: {
			r: 20,	// default 20
			g: 5,	// default 20
			b: 0	// default 19
		}
	},
	sunLight: {
		color: {
			r: 255,	// default 255
			g: 100,	// default 255
			b: 0	// default 255
		},
		intensity: 1	// default 4.7
	},
	fog: {
		color: {
			r: 0,	// default 103
			g: 0,	// default 169
			b: 0	// default 169
		},
		density: 0.005	// default 0.001
	},
	mountains: {
		color: {
			r: 100,	// default 53
			g: 100,	// default 86
			b: 80	// default 56
		}
	},
	ground: {
		color: {
			r: 50,	// default 53
			g: 50,	// default 86
			b: 50	// default 56
		}
	}
}

var moddedBlocks = {
	categories: ["Spooky", "Zones"],
	modelPaths: [
		"ultimateMod/models/spookyTrack.glb",
		"ultimateMod/models/hayBales.glb",
		"ultimateMod/models/polySpiders.glb",
		"ultimateMod/models/cobblestone.glb",
		"ultimateMod/models/zones.glb"
	],
    blocks: [
		{name: "CandyCorn", category: "Spooky", blenderSceneName: "Spooky", id: 230},
		{name: "CandyCornCluster", category: "Spooky", blenderSceneName: "Spooky", id: 231},
		{name: "CandyCornTriple", category: "Spooky", blenderSceneName: "Spooky", id: 232},
		{name: "Grave1", category: "Spooky", blenderSceneName: "Spooky", id: 233},
		{name: "Grave1Double", category: "Spooky", blenderSceneName: "Spooky", id: 234},
		{name: "Grave2", category: "Spooky", blenderSceneName: "Spooky", id: 235},
		{name: "Grave2Double", category: "Spooky", blenderSceneName: "Spooky", id: 236},
		{name: "JackOLanternAngry", category: "Spooky", blenderSceneName: "Spooky", id: 237},
		{name: "JackOLanternAngryBig", category: "Spooky", blenderSceneName: "Spooky", id: 238},
		{name: "JackOLanternSmile", category: "Spooky", blenderSceneName: "Spooky", id: 239},
		{name: "JackOLanternSmileBig", category: "Spooky", blenderSceneName: "Spooky", id: 240},
		{name: "Lollipop", category: "Spooky", blenderSceneName: "Spooky", id: 241},
		{name: "LollipopGate", category: "Spooky", blenderSceneName: "Spooky", id: 242, isSpooky:true},
		{name: "Pumpkin", category: "Spooky", blenderSceneName: "Spooky", id: 243},
		{name: "PumpkinBig", category: "Spooky", blenderSceneName: "Spooky", id: 244},
		{name: "PumpkinTall", category: "Spooky", blenderSceneName: "Spooky", id: 245},
		{name: "PumpkinTrio", category: "Spooky", blenderSceneName: "Spooky", id: 246},
		{name: "DeadTree1", category: "Spooky", blenderSceneName: "Spooky", id: 248},
		{name: "DeadTree2", category: "Spooky", blenderSceneName: "Spooky", id: 249},
		{name: "DeadTree3", category: "Spooky", blenderSceneName: "Spooky", id: 250},
		{name: "DeadTree4", category: "Spooky", blenderSceneName: "Spooky", id: 260},
		{name: "DeadTreeBig1", category: "Spooky", blenderSceneName: "Spooky", id: 261},
		{name: "DeadTreeBig2", category: "Spooky", blenderSceneName: "Spooky", id: 262},
		{name: "DeadTreeBig3", category: "Spooky", blenderSceneName: "Spooky", id: 263},
		{name: "DeadTreeBig4", category: "Spooky", blenderSceneName: "Spooky", id: 264},
		{name: "DeadTreeBig5", category: "Spooky", blenderSceneName: "Spooky", id: 265},
		{name: "Eye1", category: "Spooky", blenderSceneName: "Spooky", id: 251},
		{name: "Eye2", category: "Spooky", blenderSceneName: "Spooky", id: 252},
		{name: "Mushroom1", category: "Spooky", blenderSceneName: "Spooky", id: 253},
		{name: "Mushroom2", category: "Spooky", blenderSceneName: "Spooky", id: 254},
		{name: "MushroomRed1", category: "Spooky", blenderSceneName: "Spooky", id: 258},
		{name: "MushroomRed2", category: "Spooky", blenderSceneName: "Spooky", id: 259},

		{name: "HayBale", category: "Spooky", blenderSceneName: "HayBales", id: 255},
		{name: "HayBaleTriple", category: "Spooky", blenderSceneName: "HayBales", id: 256},
		{name: "HayBaleStack", category: "Spooky", blenderSceneName: "HayBales", id: 257},

		{name: "Spider", category: "Spooky", blenderSceneName: "Spiders", id: 266},
		{name: "SpiderBig", category: "Spooky", blenderSceneName: "Spiders", id: 267},
		{name: "SpiderPile", category: "Spooky", blenderSceneName: "Spiders", id: 268},

		{name: "Boggy", category: "Spooky", blenderSceneName: "Spooky", id: 247},
		{name: "BoggyBig", category: "Spooky", blenderSceneName: "Spooky", id: 270},
		{name: "Cauldron", category: "Spooky", blenderSceneName: "Spooky", id: 271},
		{name: "CauldronGoopGreen", category: "Spooky", blenderSceneName: "Spooky", id: 272},
		{name: "CauldronGoopPurple", category: "Spooky", blenderSceneName: "Spooky", id: 273},
		{name: "FenceCorner", category: "Spooky", blenderSceneName: "Spooky", id: 274},
		{name: "FenceFull", category: "Spooky", blenderSceneName: "Spooky", id: 275},
		{name: "FenceGate", category: "Spooky", blenderSceneName: "Spooky", id: 276},
		{name: "FenceGate2", category: "Spooky", blenderSceneName: "Spooky", id: 277},
		{name: "FenceHalf", category: "Spooky", blenderSceneName: "Spooky", id: 278},
		{name: "FenceTee", category: "Spooky", blenderSceneName: "Spooky", id: 288},

		{name: "CornLight", category: "Spooky", blenderSceneName: "Spooky", id: 279},
		{name: "CornMazeSingle", category: "Spooky", blenderSceneName: "Spooky", id: 280},

		{name: "CobbleStraight", category: "Spooky", blenderSceneName: "Cobblestone", id: 281},
		{name: "CobbleCheckpoint", category: "Spooky", blenderSceneName: "Cobblestone", id: 283, isCheckpoint: true},
		//{name: "CobbleFinish", category: "Spooky", blenderSceneName: "Cobblestone", id: 285}
		//{name: "CobbleStart", category: "Spooky", blenderSceneName: "Cobblestone", id: 284}

		{name: "CheckpointZone", category: "Zones", blenderSceneName: "Zones", id: 286, isCheckpoint: true},
		{name: "FinishZone", category: "Zones", blenderSceneName: "Zones", id: 287, isFinish: true},

		// next id: 283
	]
};

const rgbDecimal = (rgb) => {
	return (rgb.r << 16) + (rgb.g << 8) + (rgb.b);
}