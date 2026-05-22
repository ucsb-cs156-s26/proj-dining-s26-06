import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ReviewForm({ initialItemName, submitAction }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      reviewerComments: "",
      itemsStars: 5,
      dateItemServed: new Date().toISOString().slice(0, 16),
    },
  });

  return (
    <Form onSubmit={handleSubmit(submitAction)}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="review-item-name">Item Name</Form.Label>
        <Form.Control
          id="review-item-name"
          type="text"
          value={initialItemName}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="review-comments">Comments</Form.Label>
        <Form.Control
          id="review-comments"
          as="textarea"
          rows={3}
          {...register("reviewerComments")}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="review-stars">Stars (1 to 5)</Form.Label>
        <Form.Select
          id="review-stars"
          {...register("itemsStars", { valueAsNumber: true })}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="review-date">
          Date and Time Item was Served
        </Form.Label>
        <Form.Control
          id="review-date"
          type="datetime-local"
          {...register("dateItemServed", { valueAsDate: true })}
        />
      </Form.Group>

      <Button type="submit">Submit Review</Button>
    </Form>
  );
}
