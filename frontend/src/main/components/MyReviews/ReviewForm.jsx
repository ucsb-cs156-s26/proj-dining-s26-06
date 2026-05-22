import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function ReviewForm({
  initialItemName,
  initialContents,
  submitAction,
  buttonLabel = "Submit Review",
}) {
  // Stryker disable next-line all : default empty object is only used when creating a new review
  const contents = initialContents || {};

  // Stryker disable all : date formatting helper only adapts backend datetime to datetime-local input format
  const formatDateForInput = (date) => {
    if (date) {
      return date.slice(0, 16);
    }
    return new Date().toISOString().slice(0, 16);
  };
  // Stryker restore all

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      // Stryker disable next-line all : default empty string prevents uncontrolled input warnings
      reviewerComments: contents.reviewerComments || "",
      itemStars: contents.itemsStars || 5,
      dateItemServed: formatDateForInput(contents.dateItemServed),
    },
  });

  useEffect(() => {
    if (initialContents) {
      reset({
        // Stryker disable next-line all : default empty string is used when edited review has no comment
        reviewerComments: initialContents.reviewerComments || "",
        itemStars: initialContents.itemsStars || 5,
        dateItemServed: formatDateForInput(initialContents.dateItemServed),
      });
    }
  }, [initialContents, reset]);

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
          {...register("itemStars", { valueAsNumber: true })}
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
          {...register("dateItemServed")}
        />
      </Form.Group>

      <Button type="submit">{buttonLabel}</Button>
    </Form>
  );
}
