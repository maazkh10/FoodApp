import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function AddRecipe() {
  const { register, handleSubmit } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]));
    }
    setImagePreviews(previews);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
      formData.append("name", data.name);
      formData.append("instructions", data.instructions);
      const response = await axios.post(
        "http://localhost:5000/api/v1/create-recipe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Optionally, you can navigate to a success page or perform other actions upon successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Create a New Recipe
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Fill out the form below to add a new recipe to your collection.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Image upload */}
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="images"
            >
              Recipe Images
            </label>
            <input
              {...register("images", { required: true })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
              id="images"
              type="file"
              multiple
              onChange={handleImageChange} // Handle image preview
            />
            {/* Image previews */}
            <div className="mt-2 flex space-x-2">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Image preview ${index + 1}`}
                  className="h-24 w-24 rounded-md object-cover"
                />
              ))}
            </div>
          </div>
          {/* Recipe name */}
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="name"
            >
              Recipe Name
            </label>
            <input
              {...register("name", { required: true })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
              id="name"
              placeholder="Enter recipe name"
              type="text"
            />
          </div>
          {/* Recipe instructions */}
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="instructions"
            >
              Recipe Instructions
            </label>
            <textarea
              {...register("instructions", { required: true })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
              id="instructions"
              placeholder="Enter recipe instructions"
              rows={6}
            />
          </div>
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-500"
            type="submit"
          >
            Create Recipe
          </Button>
        </form>
      </div>
    </div>
  );
}
