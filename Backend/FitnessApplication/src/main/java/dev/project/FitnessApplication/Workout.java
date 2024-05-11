package dev.project.FitnessApplication;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;


import java.util.ArrayList;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "workouts")
public class Workout {

    @Id
    private ObjectId id;
    private String workoutId;
    private String workoutName;
    private String username;
    private String description;
    private String date;
    private List<String> poster;
    private String link;


    @DocumentReference
    private List<WorkoutPlan> workoutPlansId;

    @DocumentReference
    private List<Review> reviewIds;


    public List<WorkoutPlan> getWorkoutPlans() {
        return this.workoutPlansId;
    }

    public List<Review> getReviews() {
        return this.reviewIds;
    }


}
