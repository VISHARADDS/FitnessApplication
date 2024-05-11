package dev.project.FitnessApplication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Comments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comments {

    @Id
    private ObjectId commentId;

    private String commentBody;

    private String author;

    private String mealRef;

    public Comments(String commentBody, String author, String mealRef) {
    }
}
