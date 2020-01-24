import { handleActions } from 'redux-actions';

const initialState = {
	value: '',
}

export const TEST = 'TEST';

const SUCCEEDED = 'SUCCEEDED';
const FAILED = 'FAILED';

export default handleActions(
	{
		[`${TEST}_${SUCCEEDED}`]: (state, { payload }) => ({ ...state, value: 'Succès' }),
		[`${TEST}_${FAILED}`]: (state, { payload }) => ({ ...state, value: 'Erreur' }),
	},
	initialState,
);