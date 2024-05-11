package dev.project.FitnessApplication;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/addReview")
    public ResponseEntity<Review> createReview(@RequestBody Map<String,String>payload) {
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("username"),payload.get("description"),payload.get("workoutId"), payload.get("reviewId")), HttpStatus.CREATED);
    }


    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<String> deleteReviewAndRemoveFromWorkout(@PathVariable String reviewId) {
        reviewService.deleteReviewAndRemoveFromWorkout(reviewId);
        return new ResponseEntity<>("Review deleted successfully", HttpStatus.OK);
    }



    @GetMapping("/get/{reviewId}")
    public ResponseEntity<Optional<Review>> getSingleReview(@PathVariable String reviewId){
        return  new ResponseEntity<Optional<Review>>(reviewService.singleReview(reviewId), HttpStatus.OK);
    }


}
