package dev.project.FitnessApplication;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "workout_plan")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutPlan {

    @Id
    private ObjectId id;
    private String name;
    private String time;
    private String sets;
    private String rep;
    private String equipment;
    private String workoutId;
    @Indexed(unique = true) // Ensure exerciseId is unique
    private String exerciseId;

    public WorkoutPlan(String name, String time, String equipment, String workoutId,String sets,String rep,String exerciseId) {
        this.name = name;
        this.sets = sets;
        this.time = time;
        this.rep = rep;
        this.equipment = equipment;
        this.workoutId = workoutId;
        this.exerciseId = exerciseId;
    }
}
