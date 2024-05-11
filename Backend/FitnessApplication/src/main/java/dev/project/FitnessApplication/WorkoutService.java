package dev.project.FitnessApplication;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    public List<Workout> allWorkouts(){
        return workoutRepository.findAll();
    }

    public Optional<Workout> singleWorkout(String workoutId){
        return workoutRepository.findByWorkoutId(workoutId);
    }

    public void deleteWorkout(String workoutId) throws ChangeSetPersister.NotFoundException {
        Optional<Workout> workoutOptional = workoutRepository.findByWorkoutId(workoutId);
        if (workoutOptional.isPresent()) {
            Workout workout = workoutOptional.get();
            // Delete associated workout plans
            workoutPlanRepository.deleteByWorkoutId(workoutId);
            // Delete associated reviews
            reviewRepository.deleteByWorkoutId(workoutId);
            // Delete the workout
            workoutRepository.delete(workout);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }

//    public void deleteWorkout(String workoutId) throws ChangeSetPersister.NotFoundException {
//        Optional<Workout> workout = workoutRepository.findByWorkoutId(workoutId);
//        if (workout.isPresent()) {
//            workoutRepository.delete(workout.get());
//        } else {
//            throw new ChangeSetPersister.NotFoundException();
//        }
//    }

    public Workout updateWorkout(String workoutId, Workout updatedWorkout) throws ChangeSetPersister.NotFoundException {
        Optional<Workout> existingWorkoutOptional = workoutRepository.findByWorkoutId(workoutId);

        if (existingWorkoutOptional.isPresent()) {

            Workout existingWorkout = existingWorkoutOptional.get();
            existingWorkout.setWorkoutName(updatedWorkout.getWorkoutName());
            existingWorkout.setDescription(updatedWorkout.getDescription());
            existingWorkout.setLink(updatedWorkout.getLink());
            existingWorkout.setPoster(updatedWorkout.getPoster());


            return workoutRepository.save(existingWorkout);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }
//workout plans by id
    public List<WorkoutPlan> getWorkoutPlansByWorkoutId(String workoutId) {
        Optional<Workout> workoutOptional = workoutRepository.findByWorkoutId(workoutId);
        return workoutOptional.map(Workout::getWorkoutPlans).orElse(null);
    }

    //Reviews by id
    public List<Review> getReviewsByWorkoutId(String workoutId) {
        Optional<Workout> workoutOptional = workoutRepository.findByWorkoutId(workoutId);
        return workoutOptional.map(Workout::getReviews).orElse(null);
    }

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;



    public Workout addWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }


    @Autowired
    private ReviewRepository reviewRepository;

    public void deleteReviewsByWorkoutId(String workoutId) throws ChangeSetPersister.NotFoundException {
        Optional<Workout> workoutOptional = workoutRepository.findByWorkoutId(workoutId);
        if (workoutOptional.isPresent()) {
            Workout workout = workoutOptional.get();
            workout.getReviewIds().clear(); // Clear the list of review IDs
            workoutRepository.save(workout);

            // Delete associated reviews from reviews collection
            reviewRepository.deleteByWorkoutId(workoutId);
        } else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }


    public Optional<Workout> singleWorkoutByUserName(String username) {
        return workoutRepository.findByUsername(username);
    }
}
