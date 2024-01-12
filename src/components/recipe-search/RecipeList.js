import { useSelector } from "react-redux";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const recipesWithDetails = useSelector((state) => state.recipesWithDetails);

  return (
    <div data-testid="recipe-list" className="recipe-list">
      {recipesWithDetails.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
