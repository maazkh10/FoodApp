import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";

export default function Component() {
  const [recipes, setRecipes] = useState([]);
  const getRecipes = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/get-recipes"
    );
    console.log("🚀 ~ getRecipes ~ data:", data);
    setRecipes(data.recipes);
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <div className="container w-full mx-auto px-4 py-8 md:py-12">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Recipes</h1>
        <Link to={"/create-recipe"}>
          <Button className="bg-emerald-600 hover:bg-emerald-500">
            Add New
          </Button>
        </Link>
      </div>
      {recipes.length ? (
        recipes.map((recipe) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Carousel className="w-full max-w-6xl mx-auto">
                <CarouselContent>
                  {recipe.images.map((image) => (
                    <CarouselItem>
                      <img
                        alt="Recipe Image"
                        className="aspect-video object-cover rounded-lg"
                        height={675}
                        src={image}
                        width={1200}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 size-7" />
                <CarouselNext className="right-2 size-7" />
              </Carousel>

              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  Grilled Chicken Salad
                </h2>
                <Link
                  className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-400 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  to={{ pathname: "/recipe-details" }}
                  state={recipe}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center ">
          NO RECIPES FOUND
        </div>
      )}
    </div>
  );
}
