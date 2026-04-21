import { foodService } from "@/modules/food/food.service";
import { data } from "autoprefixer";
import { useState } from "react";

export const useFood = () => {
  const [foods, setFoods] = useState("");
  /**
   * Fetches all food items from the service and stores them in the hook's local `foods` state.
   *
   * Logs an error message to the console if the fetch fails.
   */
  async function allFoods() {
    try {
      const data = await foodService.getAllFoods();
      setFoods(data);
    } catch (error) {
      console.log("something went wrong while getting all foods");
    }
  }
  const foodById = async (id) => {
    try {
      const food = await foodService.getAllFoods(id);
      return food;
    } catch (error) {
      console.log("something goes wrong ");
    }
  };
  const createFood = async (foods) => {
    try {
      const foods = await foodService.createFood(data);
      return foods;
    } catch (error) {
      console.log("something goes wrong while creating food " + error);
    }
  };
  return {
    foodById,
    allFoods,
    createFood,
    foods,
  };
};
