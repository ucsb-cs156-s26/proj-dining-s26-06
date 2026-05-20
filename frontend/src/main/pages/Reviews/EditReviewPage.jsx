import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import {useParams, useNavigate, Navigate} from "react-router";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ReviewForm from "main/components/MyReviews/ReviewForm";
import { useBackend } from "main/utils/useBackend";

export default function EditReviewPage() {
    const {id} = useParams();
    const {
        data: review,
        _error,
        _status,
    } = useBackend(
        // Stryker disable next-line all : don't test internal caching of react query
        [`/api/reviews/{id}`],
        {
            // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
            method: "GET",
            url: `/api/reviews`,
            params: {
                id,
            },
        },
    );

    const objectToAxiosPutParams = (review) => ({
        url: "/api/reviews/reviewer",
        method: "PUT",
        params: {
            id: review.id,
        },
        data: {
            itemStars: review.itemStars,
            reviewerComments: review.reviewerComments,
            dateItemServed: review.dateItemServed,
        },
    });

    const onSuccess = (review) => {
        toast(
            `Review for ${review.menuItem} updated successfully`,
        );
    };

    const submitEditedReview = async (formData) => {
        try {
            await axios.put("api/reviews/put", {
                params: {
                    itemId: id,
                    reviewerComments: editedReview.comments,
                },
            });
            toast(`Review edited for ${itemName}`);
            navigate(-1);
        } catch (err) {
            toast.error(
                `Error updating review: ${err.response?.data?.error || err.message}`,
            );
        }
    };


    const onSubmit = async (data) => {
        mutation.mutate(data);
    };
/*
    if(isSuccess) {
        return <Navigate to="/myreviews"/>;
    } */

    return (
            <BasicLayout>
                <div className="pt-2">
                    <h1>Edit review with id {id}</h1>
                    <p>Coming soon!</p>
                </div>
            </BasicLayout>

    )


}

