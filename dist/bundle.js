/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiClient.ts":
/*!**************************!*\
  !*** ./src/apiClient.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.fetchTeams = fetchTeams;\nexports.fetchPlayersByTeam = fetchPlayersByTeam;\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n/**\n * Fetches a list of teams with caching and error handling.\n * This function retrieves team data from the specified API endpoint, applying caching\n * for performance optimization and error handling to ensure stability.\n *\n * @returns {Promise<Team[]>} - A promise that resolves to an array of `Team` objects.\n * If an error occurs during fetching, the function logs the error and returns an empty array.\n *\n * @example\n * // Fetch teams and handle the returned data\n * const teams = await fetchTeams();\n *\n **/\nfunction fetchTeams() {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const response = yield fetch(`${constants_1.BASE_URL}/teams`, {\n                method: \"GET\",\n                headers: constants_1.HEADERS,\n            });\n            if (!response.ok)\n                throw new Error(\"Failed to fetch teams data\");\n            const data = yield response.json();\n            return data.data.filter((team) => team.division !== '');\n        }\n        catch (error) {\n            console.error(\"Error fetching teams:\", error);\n            return [];\n        }\n    });\n}\n/**\n * Fetches a list of players by team ID with caching and error handling.\n * This function fetches players associated with a given team ID, supporting\n * pagination and caching for performance optimization.\n *\n * @param {number} teamId - The ID of the team whose players are being fetched.\n * @param {number} [pageSize=25] - The number of players to fetch per page (default is 25).\n *\n * @returns {Promise<Player[]>} - A promise that resolves to an array of `Player` objects.\n * If an error occurs during fetching, it logs the error and returns an empty array.\n *\n * @example\n * // Fetch players for team ID 1 with default page size (25)\n * const players = await fetchPlayersByTeam(1);\n *\n * // Fetch players for team ID 1 with a custom page size\n * const players = await fetchPlayersByTeam(1, 50);\n *\n **/\nfunction fetchPlayersByTeam(teamId_1) {\n    return __awaiter(this, arguments, void 0, function* (teamId, pageSize = 25) {\n        try {\n            const response = yield fetch(`${constants_1.BASE_URL}/players?team_ids[]=${teamId}&per_page=${pageSize}`, {\n                method: \"GET\",\n                headers: constants_1.HEADERS,\n            });\n            if (!response.ok)\n                throw new Error(\"Failed to fetch players data\");\n            const data = yield response.json();\n            return data.data;\n        }\n        catch (error) {\n            console.error(`Error fetching players for team ${teamId}:`, error);\n            return [];\n        }\n    });\n}\n\n\n//# sourceURL=webpack:///./src/apiClient.ts?");

/***/ }),

/***/ "./src/calculateRounds.ts":
/*!********************************!*\
  !*** ./src/calculateRounds.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.countDraftRounds = countDraftRounds;\n/**\n * Counts the number of players drafted in each round.\n * This function processes an array of `Player` objects and aggregates the count of players\n * by draft round. Only 1st and 2nd rounds are counted by their actual round numbers,\n * while other rounds or `null` values are grouped under `\"null\"`.\n *\n * @param {Player[]} players - An array of `Player` objects to be analyzed.\n *\n * @returns {Record<string, number>} - A record object with keys representing draft rounds\n * (`\"1\"`, `\"2\"`, or `\"null\"`) and values representing the count of players drafted in each round.\n *\n * @example\n * // Example usage of countDraftRounds\n * const players: Player[] = [\n *   { draft_round: 1 },\n *   { draft_round: 2 },\n *   { draft_round: null },\n *   { draft_round: 3 }\n * ];\n *\n * const draftCounts = countDraftRounds(players);\n * console.log(draftCounts); // Output: { \"1\": 1, \"2\": 1, \"null\": 2 }\n *\n */\nfunction countDraftRounds(players) {\n    return players.reduce((acc, player) => {\n        // Aggregate only 1st and 2nd rounds, others as \"null\"\n        const round = player.draft_round !== null && player.draft_round < 3\n            ? player.draft_round.toString()\n            : \"null\";\n        acc[round] = (acc[round] || 0) + 1;\n        return acc;\n    }, {});\n}\n\n\n//# sourceURL=webpack:///./src/calculateRounds.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HEADERS = exports.BASE_URL = exports.CACHE_EXPIRATION_MS = void 0;\n// CACHE Expiration time to expire data in localStorage\nexports.CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // Cache expiration time of 1 day\n// Base URL and headers for the API\nexports.BASE_URL = \"https://api.balldontlie.io/v1\";\nexports.HEADERS = {\n    Authorization: \"4600d34f-8ea0-4140-a11e-a69e86ad8821\",\n};\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst apiClient_1 = __webpack_require__(/*! ./apiClient */ \"./src/apiClient.ts\");\nconst calculateRounds_1 = __webpack_require__(/*! ./calculateRounds */ \"./src/calculateRounds.ts\");\nconst storage_1 = __webpack_require__(/*! ./storage */ \"./src/storage.ts\");\n/**\n * Main function that fetches and displays draft information for a specified team.\n * It checks for a team name passed as a command-line argument, fetches the team\n * data, retrieves the players for that team, and displays draft round counts.\n *\n * @example\n * // Run in a Node.js environment\n * node index.js \"Golden State Warriors\"\n */\nfunction main() {\n    return __awaiter(this, void 0, void 0, function* () {\n        let teamName = \"Golden State Warriors\"; // Default team name\n        // Check if a team name was passed as an argument\n        if (process.argv && process.argv.length > 2) {\n            const args = process.argv.slice(2);\n            teamName = args[0];\n        }\n        // Fetch teams and find the requested team by name\n        const teams = yield (0, apiClient_1.fetchTeams)();\n        const team = teams.find((t) => t.full_name.toLowerCase() === teamName.toLowerCase());\n        if (!team) {\n            console.error(\"Team not found\");\n            return;\n        }\n        // Fetch players and count draft rounds for the selected team\n        const players = yield (0, storage_1.fetchPlayersByTeamWithCache)(team.id);\n        const draftRounds = (0, calculateRounds_1.countDraftRounds)(players);\n        console.log(`Team Name: ${team.full_name}`);\n        console.log('Draft Rounds:', draftRounds);\n    });\n}\n/**\n * Handles the change event for the HTML <select> element when a team is selected.\n * This function retrieves the selected team's players and calculates the count of\n * players by draft round, then displays the draft statistics in the HTML.\n *\n * @param {Event} event - The change event triggered by selecting a new team.\n *\n * @example\n * <select id=\"nba-teams\" onchange=\"handleSelectChange(event)\"></select>\n */\nfunction handleSelectChange(event) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const target = event.target;\n        const team = JSON.parse(target.value);\n        // Fetch players and count draft rounds for the selected team\n        const players = yield (0, storage_1.fetchPlayersByTeamWithCache)(team.id);\n        const draftRounds = (0, calculateRounds_1.countDraftRounds)(players);\n        // Display the team's draft statistics in the HTML output container\n        displayTeamDraftStats(team, draftRounds);\n    });\n}\n/**\n * Initializes the HTML <select> element with NBA teams and sets up the\n * event listener for team selection changes. This function fetches all\n * available teams, populates the <select> element with them, and prepares\n * the element for interaction.\n *\n * @example\n * <select id=\"nba-teams\"></select>\n */\nfunction initHTML() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const selectElement = document.getElementById('nba-teams');\n        if (selectElement) {\n            selectElement.addEventListener(\"change\", handleSelectChange);\n            // Fetch teams and populate the <select> element with options\n            const teams = yield (0, apiClient_1.fetchTeams)();\n            teams.forEach((team) => {\n                const option = document.createElement('option');\n                option.value = JSON.stringify(team); // Store the team as JSON\n                option.textContent = team.full_name; // Display team name\n                selectElement.appendChild(option);\n            });\n        }\n    });\n}\n/**\n * Displays the selected team's draft statistics in a specified HTML container.\n * This function updates the content of the output container with the team name\n * and draft rounds information.\n *\n * @param {Team} team - The team object containing team information.\n * @param {Record<string, number>} draftRounds - An object mapping draft rounds\n *        to the count of players drafted in each round.\n *\n * @example\n * <div id=\"output\"></div>\n * displayTeamDraftStats(team, draftRounds);\n */\nfunction displayTeamDraftStats(team, draftRounds) {\n    const outputContainer = document.getElementById(\"output\");\n    if (outputContainer) {\n        outputContainer.innerHTML = `\n      <p>Team Name: ${team.full_name}</p>\n      <p>Draft Rounds: ${JSON.stringify(draftRounds)}</p>\n    `;\n    }\n}\n// Run the script in Node.js or in a browser environment\nif (typeof process !== 'undefined' && typeof process.argv !== 'undefined') {\n    main().catch(console.error);\n}\nif (typeof document !== 'undefined') {\n    initHTML();\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/storage.ts":
/*!************************!*\
  !*** ./src/storage.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.fetchTeamWithCache = fetchTeamWithCache;\nexports.fetchPlayersByTeamWithCache = fetchPlayersByTeamWithCache;\nexports.saveToLocalStorage = saveToLocalStorage;\nexports.loadFromLocalStorage = loadFromLocalStorage;\nconst apiClient_1 = __webpack_require__(/*! ./apiClient */ \"./src/apiClient.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nconst teamCache = new Map();\nconst playerCache = new Map();\n/**\n * Fetches a team by name with caching support.\n * If the team data is already cached, it returns the cached team.\n * Otherwise, it fetches all teams from the API, caches them, and returns the requested team.\n *\n * @param {string} teamName - The name of the team to fetch.\n * @returns {Promise<Team | undefined>} - A promise that resolves to the `Team` object, or `undefined` if the team is not found.\n *\n * @example\n * const team = await fetchTeamWithCache(\"Golden State Warriors\");\n */\nfunction fetchTeamWithCache(teamName) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (teamCache.has(teamName)) {\n            return teamCache.get(teamName);\n        }\n        const teams = yield (0, apiClient_1.fetchTeams)();\n        teams.forEach(team => teamCache.set(team.full_name, team));\n        return teamCache.get(teamName);\n    });\n}\n/**\n * Fetches players for a specific team by team ID with caching support.\n * If the player data for the team is cached, it returns the cached players.\n * Otherwise, it fetches the players from the API, caches them, and returns the result.\n *\n * @param {number} teamId - The ID of the team whose players are to be fetched.\n * @returns {Promise<Player[]>} - A promise that resolves to an array of `Player` objects.\n *\n * @example\n * const players = await fetchPlayersByTeamWithCache(1);\n */\nfunction fetchPlayersByTeamWithCache(teamId) {\n    return __awaiter(this, void 0, void 0, function* () {\n        if (playerCache.has(teamId)) {\n            return playerCache.get(teamId);\n        }\n        const players = yield (0, apiClient_1.fetchPlayersByTeam)(teamId);\n        playerCache.set(teamId, players);\n        return players;\n    });\n}\n/**\n * Saves data to Local Storage with an expiration timestamp.\n * This utility function allows for caching data in Local Storage with a defined expiration period.\n *\n * @param {string} key - The key under which the data will be stored.\n * @param {any} data - The data to store in Local Storage.\n *\n * @example\n * saveToLocalStorage(\"teamData\", teamData);\n */\nfunction saveToLocalStorage(key, data) {\n    const cacheItem = {\n        data,\n        timestamp: Date.now(),\n    };\n    localStorage.setItem(key, JSON.stringify(cacheItem));\n}\n/**\n * Loads data from Local Storage, checking if the cached data has expired.\n * If the data is expired, it removes the entry from Local Storage and returns `null`.\n *\n * @param {string} key - The key of the data to retrieve from Local Storage.\n * @returns {any | null} - The cached data if it exists and hasn't expired, or `null` if expired or missing.\n *\n * @example\n * const teamData = loadFromLocalStorage(\"teamData\");\n */\nfunction loadFromLocalStorage(key) {\n    const cacheItem = localStorage.getItem(key);\n    if (!cacheItem)\n        return null;\n    const { data, timestamp } = JSON.parse(cacheItem);\n    if (Date.now() - timestamp > constants_1.CACHE_EXPIRATION_MS) {\n        localStorage.removeItem(key); // Clear expired cache\n        return null;\n    }\n    return data;\n}\n\n\n//# sourceURL=webpack:///./src/storage.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;