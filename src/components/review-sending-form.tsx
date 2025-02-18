import React, {FormEvent} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../hooks';
import {sendReviewAction} from '../api/api-requests.ts';
import {MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH} from '../const.ts';
import {getIsReviewSending} from '../store/options/selectors.ts';

export function ReviewSendingForm() {
  const dispatch = useAppDispatch();
  const {id: offerId} = useParams<string>();
  const [formData, setFormData] = React.useState({
    review: '',
    rating: 0
  });
  const isValid = formData.rating !== 0 && formData.review.length >= MIN_REVIEW_LENGTH && formData.review.length <= MAX_REVIEW_LENGTH;
  const isReviewSending = useAppSelector(getIsReviewSending);

  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  function renderRatingInput(value: number, title: string) {
    return (
      <>
        <input className="form__rating-input visually-hidden" onChange={handleFieldChange} name="rating" value={value} id={`${value}-stars`} type="radio" />
        <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </>
    );
  }

  function handleFormSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (offerId && formData.rating) {
      dispatch(sendReviewAction({offerId: offerId, comment: formData.review, rating: formData.rating}))
        .then(() => setFormData({rating: 0, review: ''}));
    }
  }

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit} method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {renderRatingInput(5, 'perfect')}
        {renderRatingInput(4, 'good')}
        {renderRatingInput(3, 'not bad')}
        {renderRatingInput(2, 'badly')}
        {renderRatingInput(1, 'terribly')}
      </div>
      <textarea className="reviews__textarea form__textarea" onChange={handleFieldChange} value={formData.review} id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isReviewSending}>Submit</button>
      </div>
    </form>
  );
}
