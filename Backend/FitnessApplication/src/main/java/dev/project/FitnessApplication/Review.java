// Review entity class
package dev.project.FitnessApplication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String reviewId;

    private String username;
    private String description;
    private String workoutId;

    public Review(String username, String description, String workoutId, String reviewId) {
        this.reviewId = reviewId;
        this.username = username;
        this.description = description;
        this.workoutId = workoutId;
    }
}
