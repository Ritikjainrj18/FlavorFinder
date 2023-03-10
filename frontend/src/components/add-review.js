import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";
import { useParams ,useLocation} from "react-router-dom";

const AddReview = props => {
  let initialReviewState = ""
  const params=useParams()
  let editing = false;
  const { state} = useLocation()

  if (state && state.currentReview==="editreview") {
    editing = true;
    initialReviewState = state.currentReview.text
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    var data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: params.id
    };
    console.log(data)
    console.log(editing)
    if (editing) {
      data.review_id = state.review._id 
      console.log(data)
      RestaurantDataService.updateReview(data)
        .then(response => {
          setSubmitted(true);
          state.currentReview="editreview"
          // console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  return (
    <div>
      {props.user ? (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/restaurants/" + params.id} className="btn btn-success">
              Back to Restaurant
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">{ editing ? "Edit" : "Create" } Review</label>
              <input
                type="text"
                className="form-control"
                id="text"
                required
                value={review}
                onChange={handleInputChange}
                name="text"
              />
            </div>
            <button onClick={saveReview} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

      ) : (
      <div>
        Please log in.
      </div>
      )}

    </div>
  );
};

export default AddReview;