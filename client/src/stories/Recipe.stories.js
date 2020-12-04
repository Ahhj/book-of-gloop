import React from "react";
import Recipe from "../components/Recipe";
import okonomiyaki from "../assets/images/okonomiyaki.jpg";

export default {
  title: "Recipe",
};

const recipeData = {
  title: "Gloopy stuff",
  tags: ["gloop", "slop"],
  intro: "This is some yummy gloop",
  remarks: "Its real yummy",
  image: okonomiyaki,
  ingredients: "Gloop",
  steps: `
1. Preheat the oven and lightly grease a 13 by 9-inch pan with olive oil.
1. In a large skillet over medium heat, cook the onions and a pinch of salt with the olive oil for about 5-7 minutes.
1. Add the chopped broccoli and bell pepper. Cover the skillet and cook for about 8-9 minutes
1. Meanwhile mix the dry ingredients for the sauce. Warm the oil in a pan and then add the flour and spice mixture. While whisking constantly, cook for about 1 minute. Whisk the tomato paste into the mixture, then slowly pour in the broth while whisking constantly to remove any lumps. Cook, whisking often, for about 5-7 minutes, until the sauce has thickened. Remove from heat, then whisk in the vinegar and season to taste. 
1. Add the cumin and cinnamon and cook for about 30 seconds. Add the spinach, a few handfuls at a time and cook until all of the spinach has wilted.
1. Transfer the contents of the pan to a bowl. Add the drained beans, ¼ cup cheese and a drizzle of enchilada sauce (about 2 tablespoons). Season with ½ teaspoon salt and some freshly ground black pepper, to taste.
1. Assemble the enchiladas: Pour ¼ cup enchilada sauce into your prepared pan and tilt it from side to side until the bottom of the pan is evenly coated. To assemble your first enchilada, spread ½ cup filling mixture down the middle of a tortilla, then snugly wrap the left side over and then the right, to make a wrap. Place it seam-side down against the edge of your pan. Repeat with remaining tortillas and filling.
1. Drizzle the remaining enchilada sauce evenly over the enchiladas, leaving the tips of the enchiladas bare. Sprinkle the remaining shredded cheese evenly over the enchiladas.
1. Bake, uncovered, on the middle rack for 20 minutes. If the cheese on top isn’t golden enough for your liking, carefully transfer the enchiladas to the upper rack of the oven and bake for an additional 3 to 6 minutes, until sufficiently golden and bubbly.
1. Serve with a couple of jalapenos on top and a dollop of sour cream`,
};

export const Default = () => <Recipe {...recipeData} />;
