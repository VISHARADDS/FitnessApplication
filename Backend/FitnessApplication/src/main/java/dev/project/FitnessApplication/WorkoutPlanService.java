package dev.project.FitnessApplication;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;


    @Autowired
    private MongoTemplate mongoTemplate;

    public WorkoutPlan createWorkoutPlan(String name,String time,String equipment,String workoutId,String sets,String rep,String exerciseId) {
        WorkoutPlan workoutPlan = workoutPlanRepository.insert(new WorkoutPlan(name,time,equipment,workoutId,sets,rep,exerciseId));

        mongoTemplate.update(Workout.class)
                .matching(Criteria.where("workoutId").is(workoutId))
                .apply(new Update().push("workoutPlansId").value(workoutPlan))
                .first();

        return workoutPlan;
    }

    @Autowired
    private WorkoutRepository workoutRepository;



    public void deleteWorkoutPlanByExerciseId(String exerciseId) {
        Optional<WorkoutPlan> optionalWorkoutPlan = workoutPlanRepository.findByExerciseId(exerciseId);
        optionalWorkoutPlan.ifPresent(workoutPlan -> {
            workoutPlanRepository.delete(workoutPlan);
          
        });
    }




    public WorkoutPlan updateWorkoutPlan(String planId, String name, String time, String equipment, String sets, String rep) throws ChangeSetPersister.NotFoundException {
        Optional<WorkoutPlan> optionalWorkoutPlan = workoutPlanRepository.findById(new ObjectId(planId));
        if (((Optional<?>) optionalWorkoutPlan).isPresent()) {
            WorkoutPlan workoutPlan = optionalWorkoutPlan.get();
            workoutPlan.setName(name);
            workoutPlan.setTime(time);
            workoutPlan.setSets(sets);
            workoutPlan.setEquipment(equipment);
            return workoutPlanRepository.save(workoutPlan);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }


}
