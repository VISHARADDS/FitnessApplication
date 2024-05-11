package dev.project.FitnessApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/meals")
public class MealController {

    @Autowired
    private MealsService mealsService;

    @GetMapping
    public ResponseEntity<List<Meals>> allMeals(){
        return new ResponseEntity<List<Meals>>(mealsService.allMeals(), HttpStatus.OK);
    }

    @GetMapping("/{mealRef}")
    public ResponseEntity<Optional<Meals>> getSingleMeal(@PathVariable String mealRef){
        return new ResponseEntity<Optional<Meals>>(mealsService.singleMeal(mealRef), HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Meals> addMeal(@RequestBody Meals meal){
        Meals addedMeal = mealsService.addMeal(meal);
        return new ResponseEntity<>(addedMeal, HttpStatus.CREATED);
    }

    @PutMapping("/{mealRef}")
    public ResponseEntity<Meals> updateMeal(@PathVariable String mealRef, @RequestBody Meals updatedMeal){
        updatedMeal.setMealRef(mealRef);
        Meals meals = mealsService.updateMeal(updatedMeal);
        return new ResponseEntity<>(meals, HttpStatus.OK);
    }

    @DeleteMapping("/{mealRef}")
    public ResponseEntity<Void> deleteMealByMealRef(@PathVariable String mealRef){
        mealsService.deleteMealByMealRef(mealRef);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
