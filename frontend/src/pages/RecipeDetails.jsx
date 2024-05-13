import { Button } from "@/components/ui/button";
import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

export default function RecipesDetails() {
  const location = useLocation();
  const recipe = location.state;
  const { register, handleSubmit, reset } = useForm();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/v1/comment/${recipe._id}`
        );
        console.log(
          "🚀 ~ fetchComments ~ response.data.comments:",
          response.data
        );

        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [recipe._id]);
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/create-comment",
        {
          text: data.comment,
          recipeId: recipe._id,
          author: "Anonymous", // Change to the actual author name
        }
      );
      console.log("Comment added:", response.data);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
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
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {recipe.name}
            </h1>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Preparation Instructions</h2>
              <ol className="space-y-2 list-decimal pl-6">
                <p>{recipe.instructions}</p>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Comments</h2>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Comment</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>New Comment</DialogTitle>
                    <DialogDescription>
                      This comment will be added in comment list
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="comment" className="text-right">
                          Comment
                        </Label>
                        <Input
                          id="comment"
                          className="col-span-3"
                          {...register("comment", { required: true })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-4">
                  {comments?.map((comment) => (
                    <div className="space-y-2 w-full  rounded ">
                      <div className="flex items-center gap-2 w-full px-2 py-1">
                        <h3 className="font-semibold">{comment.author}</h3>
                        <p className="text-xs ml-4 text-zinc-600">
                          {moment(comment.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </p>
                      </div>
                      <p className="px-2">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
