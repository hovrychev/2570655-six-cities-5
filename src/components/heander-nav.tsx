import { Link } from 'react-router-dom';
import { Offers } from '../types/offer.ts';
import {AppRoute, AuthorizationStatus} from '../const.ts';
import {useAppDispatch, useAppSelector} from '../hooks';
import {logoutAction} from '../api/api-requests.ts';

type HeaderNavProps = {
  offers: Offers;
};

export function HeaderNav({offers}: HeaderNavProps) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userEmail);
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;
  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__user-name user__name">{userEmail}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#" onClick={handleSignOut}>
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>)
          : (
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                <div className="header__avatar-wrapper user__avatar-wrapper">
                </div>
                <span className="header__login">Sign in</span>
              </Link>
            </li>
          )}
      </ul>
    </nav>
  );
}
