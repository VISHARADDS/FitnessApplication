package dev.project.FitnessApplication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "Meals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Meals {

    @Id
    private ObjectId mealId;

    private String mealRef;

    private String mealName;

    private String mealDescription;

    private String mealImage;

    private String mealBudget;

    private String mealType;

    private String postedDate;

    private String postedTime;

    @DocumentReference
    private List<Comments> commentIds;




}
