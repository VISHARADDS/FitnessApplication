package dev.project.FitnessApplication;



import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/workouts")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {

    @Autowired
    private WorkoutService workoutService;

    @GetMapping
    public ResponseEntity<List<Workout>> getAllWorkouts(){
    return  new ResponseEntity<List<Workout>>(workoutService.allWorkouts(), HttpStatus.OK);
    }

    @GetMapping("/{workoutId}")
    public ResponseEntity<Optional<Workout>> getSingleWorkout(@PathVariable String workoutId){
        return  new ResponseEntity<Optional<Workout>>(workoutService.singleWorkout(workoutId), HttpStatus.OK);
    }

    @GetMapping("/get/{username}")
    public ResponseEntity<Optional<Workout>> getSingleWorkoutByUserName(@PathVariable String username){
        return  new ResponseEntity<Optional<Workout>>(workoutService.singleWorkoutByUserName(username), HttpStatus.OK);
    }

    @PostMapping("/addWorkout")
    public ResponseEntity<Workout> addWorkout(@RequestBody Workout workout) {
        Workout savedWorkout = workoutService.addWorkout(workout);
        return new ResponseEntity<>(savedWorkout, HttpStatus.CREATED);
    }


    @PutMapping("/update/{workoutId}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable String workoutId, @RequestBody Workout updatedWorkout) throws ChangeSetPersister.NotFoundException {
        Workout updated = workoutService.updateWorkout(workoutId, updatedWorkout);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{workoutId}")
    public ResponseEntity<?> deleteWorkout(@PathVariable String workoutId) throws ChangeSetPersister.NotFoundException {
        workoutService.deleteWorkout(workoutId);
        return ResponseEntity.ok().build();
    }




    @GetMapping("/reviews/{workoutId}")
    public ResponseEntity<List<Review>>getReviewsByWorkoutId(@PathVariable String workoutId) {
        List<Review> reviews = workoutService.getReviewsByWorkoutId(workoutId);
        if (reviews != null) {
            return ResponseEntity.ok(reviews);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/workoutPlans/{workoutId}")
    public ResponseEntity<List<WorkoutPlan>> getWorkoutPlansByWorkoutId(@PathVariable String workoutId) {
        List<WorkoutPlan> workoutPlans = workoutService.getWorkoutPlansByWorkoutId(workoutId);
        if (workoutPlans != null) {
            return ResponseEntity.ok(workoutPlans);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/deleteAllReviews/{workoutId}")
    public ResponseEntity<?> deleteReviewsByWorkoutId(@PathVariable String workoutId) throws ChangeSetPersister.NotFoundException {
        workoutService.deleteReviewsByWorkoutId(workoutId);
        return ResponseEntity.ok().build();
    }




}
