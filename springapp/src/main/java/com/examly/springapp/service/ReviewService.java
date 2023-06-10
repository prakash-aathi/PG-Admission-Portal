package com.examly.springapp.service;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repo;

    public ReviewModel addTask(ReviewModel mod) {
        try {
            return repo.save(mod);
        } catch (Exception e) {
            return null;
        }   
    }

    public List<ReviewModel> getTask() {
        return repo.findAll();
    }

    public boolean deleteTask(String id) {
        try {
            Long reviewId = Long.parseLong(id); // Convert the String ID to Long
            Optional<ReviewModel> optionalReview = repo.findById(reviewId);
            if (optionalReview.isPresent()) {
                repo.deleteById(reviewId);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }
}