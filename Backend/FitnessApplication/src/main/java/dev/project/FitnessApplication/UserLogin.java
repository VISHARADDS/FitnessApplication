package dev.project.FitnessApplication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class UserLogin {

    @Id
    private ObjectId id;
    private String userName;
    private String email;
    private String password;
    private String profilePicture;
    private List<Workout> workoutList;
    private List<Workout> mealList;


}