package dev.project.FitnessApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MealsService {

    @Autowired
    private MealsRepository mealsRepository;

    //fetch all meals
    public List<Meals> allMeals(){
        return mealsRepository.findAll();

    }

    //fetch meal by mealRef
    public Optional<Meals> singleMeal(String mealRef){
        return mealsRepository.findMealsByMealRef(mealRef);
    }

    //insert meal
    public Meals addMeal(Meals meal){
        return mealsRepository.save(meal);
    }

    //delete meal
    public void deleteMealByMealRef(String mealRef){
        mealsRepository.deleteByMealRef(mealRef);
    }

    //update meal
    public Meals updateMeal(Meals meal){
        return mealsRepository.save(meal);
    }



}
