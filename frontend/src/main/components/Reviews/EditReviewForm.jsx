import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

export default function EditReviewForm({ initialItemName, submitAction, oldReview }) {
    const [comments, setComments] = useState(oldReview.comments);
    const [stars, setStars] = useState(oldReview.stars);
    const [dateServed, setDateServed] = useState(oldReview.dateItemServed);


    const handleSubmit = (e) => {
        e.preventDefault();
        submitAction({
            reviewerComments: comments,
            itemsStars: stars,
            dateItemServed: dateServed,
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="review-item-name">Item Name</Form.Label>
                <Form.Control
                    id="edit-review-for-item-name"
                    type="text"
                    value={initialItemName}
                    disabled
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="edit-review-comments">Edit Review Comment</Form.Label>
                <Form.Control
                    id="edit-review-comments"
                    as="textarea"
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="review-stars">Edit Stars (1 to 5)</Form.Label>
                <Form.Select
                    id="review-stars"
                    value={stars}
                    onChange={(e) => setStars(Number(e.target.value))}
                    >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option
                            key={num}
                            value={num}
                        >{num}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="review-date">
                    Date and Time item was served
                </Form.Label>
                <Form.Control
                    id="review-date"
                    type="datetime-local"
                    value={dateServed}
                    onChange={(e) => setDateServed(e.target.value)}
                />
            </Form.Group>
            <Button
                type="submit"
                >Submit Edited Review
            </Button>
        </Form>
    );
}
