# Instructions on how to start Recipe Search App:

1. Create a file named `.env` to store environment variables.

2. Define the variables. Example show below:

```
REACT_APP_RECIPE_SEARCH_APP_ID=personal_api_id
REACT_APP_RECIPE_SEARCH_APP_KEY=personal_api_key
```

3. Access variables in [searchRecipe.js](/src/state/thunk/searchRecipe.js). Example shown below:

```
const appId = process.env.REACT_APP_RECIPE_SEARCH_APP_ID;
const appKey = process.env.REACT_APP_RECIPE_SEARCH_APP_KEY;
```
