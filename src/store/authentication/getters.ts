/**
 * Internal dependencies.
 */
import { ApplicationState } from '@/store';

export const isLoggedIn = (state: ApplicationState) => state.authentication.isLoggedIn;
export const getAuthToken = (state: ApplicationState) => state.authentication.authToken;
export const getUserData = (state: ApplicationState) => state.authentication.userData;
