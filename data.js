var data = [
	{ name: "Hollywood Salad", category: "Lighter Side", fat: 17, carbs: 4, protein: 33, calories: 302 },
	{ name: "Champion Pasta", category: "Lighter Side", fat: 6, carbs: 53, protein: 25, calories: 374 },
	{ name: "Mona Lisa Wrap", category: "Lighter Side", fat: 17, carbs: 30, protein: 38, calories: 368 },
	{ name: "Penne Romano", category: "Lighter Side", fat: 4.5, carbs: 42, protein: 36, calories: 367 },
	{ name: "Tucson", category: "Lighter Side", fat: 11, carbs: 44, protein: 27, calories: 391 },

	{ name: "Texas Chicken Nuggets", category: "Warm Ups", fat: 6, carbs: 13, protein: 43, calories: 289 },
	{ name: "Honey BBQ Nuggets", category: "Warm Ups", fat: 6, carbs: 13, protein: 43, calories: 297 },
	{ name: "Teriyaki Chicken Nuggets", category: "Warm Ups", fat: 4, carbs: 14, protein: 44, calories: 285 },
	{ name: "Loaded Baked Potato", category: "Warm Ups", fat: 4, carbs: 38, protein: 7, calories: 209 },
	{ name: "Edamame", category: "Warm Ups", fat: 5, carbs: 10, protein: 11, calories: 121 },
	{ name: "Turkey Chili Cup", category: "Warm Ups", fat: 10, carbs: 38, protein: 23, calories: 337 },

	{ name: "Italiano Salad with Grilled Chicken", category: "Fit Salads", fat: 13, carbs: 17, protein: 48, calories: 395 },
	{ name: "Muscle Maker Caesar Salad", category: "Fit Salads", fat: 20, carbs: 4, protein: 3, calories: 200 },
	{ name: "Mardi Gras Cajun Grilled Chicken Salad", category: "Fit Salads", fat: 29, carbs: 8, protein: 37, calories: 447 },
	{ name: "Lean & Mean Cheeseburger Salad", category: "Fit Salads", fat: 42, carbs: 27, protein: 41, calories: 658 },
	{ name: "Turkey Taco Salad", category: "Fit Salads", fat: 26, carbs: 16, protein: 55, calories: 523 },

	{ name: "MMG Signature Wrap", category: "Muscle Maker Wraps", fat: 28, carbs: 53, protein: 46, calories: 651 },
	{ name: "Rocky Balboa Wrap", category: "Muscle Maker Wraps", fat: 25, carbs: 66, protein: 59, calories: 747 },
	{ name: "BBQ Wrap", category: "Muscle Maker Wraps", fat: 18, carbs: 70, protein: 64, calories: 716 },
	{ name: "Low Carb Caesar Wrap", category: "Muscle Maker Wraps", fat: 31, carbs: 51, protein: 45, calories: 670 },
	{ name: "European Wrap", category: "Muscle Maker Wraps", fat: 12, carbs: 56, protein: 49, calories: 542 },
	{ name: "Yee-ha! Wrap", category: "Muscle Maker Wraps", fat: 30, carbs: 66, protein: 35, calories: 679 },
	{ name: "Santa Fe Wrap", category: "Muscle Maker Wraps", fat: 35, carbs: 77, protein: 42, calories: 788 },
	{ name: "XXL Turkey Burger Wrap", category: "Muscle Maker Wraps", fat: 28, carbs: 64, protein: 36, calories: 598 },
	{ name: "Turkey meatball Parmesan Wrap", category: "Muscle Maker Wraps", fat: 29, carbs: 74, protein: 47, calories: 762 },
	{ name: "Tex-Mex Fajita Wrap", category: "Muscle Maker Wraps", fat: 16, carbs: 60, protein: 49, calories: 607 },

	{ name: "Chicken Breast Signature Sandwich", category: "Sandwiches", fat: 24, carbs: 39, protein: 51, calories: 572 },
	{ name: "Premium Burger Signature Sandwich", category: "Sandwiches", fat: 34, carbs: 39, protein: 51, calories: 665 },

	{ name: "Vegetarian Italiano Salad", category: "Vegetarian", fat: 9, carbs: 17, protein: 14, calories: 213 },
	{ name: "Veggie Wrap", category: "Vegetarian", fat: 13, carbs: 64, protein: 20, calories: 449 },
	{ name: "Penne with Marinara Sauce", category: "Vegetarian", fat: 25, carbs: 66, protein: 13, calories: 343 },
	{ name: "Brown Rice & Beans", category: "Vegetarian", fat: 2, carbs: 55, protein: 6, calories: 261 },
	{ name: "Edamame", category: "Vegetarian", fat: 5, carbs: 10, protein: 11, calories: 121 },

	{ name: "Cajun Chicken & Penne", category: "Power Pasta", fat: 10, carbs: 87, protein: 50, calories: 675 },
	{ name: "Penne & Reduced Fat Vodka Sauce with Chicken", category: "Power Pasta", fat: 8, carbs: 71, protein: 58, calories: 608 },
	{ name: "Sesame Chicken Teriyaki Pasta", category: "Power Pasta", fat: 12, carbs: 82, protein: 67, calories: 740 },

	{ name: "El Mexicana", category: "Guiltless Entrees", fat: 8, carbs: 56, protein: 45, calories: 484 },
	{ name: "Turkey Chili", category: "Guiltless Entrees", fat: 22, carbs: 81, protein: 49, calories: 725 },
	{ name: "Teriyaki Grilled Chicken Stir-Fry", category: "Guiltless Entrees", fat: 11, carbs: 97, protein: 54, calories: 724 },
	{ name: "Arizona", category: "Guiltless Entrees", fat: 25, carbs: 49, protein: 41, calories: 596 },

	{ name: "Godfather", category: "Low Carb Solutions", fat: 12, carbs: 17, protein: 60, calories: 429 },
	{ name: "Tuscany", category: "Low Carb Solutions", fat: 25, carbs: 8, protein: 50, calories: 451 },
	{ name: "Texas", category: "Low Carb Solutions", fat: 10, carbs: 25, protein: 49, calories: 391 },

	{ name: "Turkey Meatballs", category: "Extras", combo: "Muscle Maker Wraps", fat: 8, carbs: 32, protein: 29, calories: 325 },
	{ name: "Pastsa Salad", category: "Extras", combo: "Muscle Maker Wraps", fat: 3, carbs: 43, protein: 8, calories: 237 },
	{ name: "Steamed Broccoli", category: "Extras", combo: "Muscle Maker Wraps", fat: 0, carbs: 5, protein: 2, calories: 24 },
	{ name: "Cucumber Salad", category: "Extras", combo: "Muscle Maker Wraps", fat: 0, carbs: 8, protein: 1, calories: 36 },
	{ name: "Brown Rice", category: "Extras", combo: "Muscle Maker Wraps", fat: 3, carbs: 68, protein: 8, calories: 329 },
	{ name: "Baked Potato", category: "Extras", combo: "Muscle Maker Wraps", fat: 0, carbs: 32, protein: 4, calories: 142 },
	{ name: "Western Potatoes", category: "Extras", combo: "Muscle Maker Wraps", fat: 0, carbs: 32, protein: 3, calories: 138 },
	{ name: "Caesar Salad", category: "Extras", combo: "Muscle Maker Wraps", fat: 4, carbs: 2, protein: 1.5, calories: 53 },
	{ name: "Brown Rice & Beans", category: "Extras", combo: "Muscle Maker Wraps", fat: 2, carbs: 50, protein: 8, calories: 261 },
	{ name: "Savory Spinach", category: "Extras", combo: "Muscle Maker Wraps", fat: 8, carbs: 5, protein: 4, calories: 95 },
	{ name: "Sweet Potato Fries", category: "Extras", combo: "Muscle Maker Wraps", fat: 10, carbs: 31, protein: 2, calories: 243 },
	{ name: "Guacamole", category: "Extras", combo: "Muscle Maker Wraps", fat: 8, carbs: 5, protein: 1, calories: 91 },
	{ name: "Fresh Fish (Tilapia)", category: "Extras", fat: 6, carbs: 0, protein: 59, calories: 290 },
	{ name: "Fresh Shrimp", category: "Extras", fat: 3, carbs: 1, protein: 33, calories: 173 },
	{ name: "USDA Steak", category: "Extras", fat: 9, carbs: 6, protein: 34, calories: 282 },
	{ name: "Grilled Chicken Breast", category: "Extras", fat: 6, carbs: 0, protein: 53, calories: 281 },

	{ name: "Chocolate Peanut Butter Shake", category: "Big Protein Shakes", fat: 11, carbs: 27, protein: 44, calories: 390 },
	{ name: "Fresh Strawberry Banana Shake", category: "Big Protein Shakes", fat: 2, carbs: 53, protein: 43, calories: 392 },
	{ name: "Chocolate Shake", category: "Big Protein Shakes", fat: 3, carbs: 23, protein: 41, calories: 280 },
	{ name: "Vanilla Shake", category: "Big Protein Shakes", fat: 2, carbs: 24, protein: 42, calories: 280 },
	{ name: "Strawberry Shake", category: "Big Protein Shakes", fat: 2, carbs: 24, protein: 42, calories: 280 },
	{ name: "Snappy Apple Shake", category: "Big Protein Shakes", fat: 2, carbs: 80, protein: 42, calories: 390 },
	{ name: "Chocolate Banana Shake", category: "Big Protein Shakes", fat: 3, carbs: 53, protein: 42, calories: 392 },
	{ name: "Tropical Paradise Shake", category: "Big Protein Shakes", fat: 2, carbs: 50, protein: 43, calories: 350 }

	// All Natural Fruit Smoothies

	// No Sugar Added Desserts
];
