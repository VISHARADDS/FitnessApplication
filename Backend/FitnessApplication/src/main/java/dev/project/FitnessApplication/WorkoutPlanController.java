package dev.project.FitnessApplication;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/workout/plan")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutPlanController {
    @Autowired
    private WorkoutPlanService workoutPlanService;

    @PostMapping("/addPlan")
    public ResponseEntity<WorkoutPlan> createWorkoutPlan(@RequestBody Map<String,String> payload) {
        return new ResponseEntity<WorkoutPlan>(workoutPlanService.createWorkoutPlan(payload.get("name"),payload.get("time"),payload.get("equipment"),payload.get("workoutId"),payload.get("sets"),payload.get("rep"), payload.get("exerciseId")), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{exerciseId}")
    public ResponseEntity<String> deleteWorkoutPlan(@PathVariable String exerciseId) {
        workoutPlanService.deleteWorkoutPlanByExerciseId(exerciseId);
        return new ResponseEntity<>("Plan deleted successfully", HttpStatus.OK);
    }



    @PutMapping("/update/{planId}")
    public ResponseEntity<WorkoutPlan> updateWorkoutPlan(@PathVariable String planId, @RequestBody Map<String, String> payload) {
        try {
            WorkoutPlan updatedPlan = workoutPlanService.updateWorkoutPlan(planId, payload.get("name"), payload.get("time"),payload.get("rep"), payload.get("equipment"),payload.get("sets"));
            return ResponseEntity.ok(updatedPlan);
        } catch (ChangeSetPersister.NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }




}
