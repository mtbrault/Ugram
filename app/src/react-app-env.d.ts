/// <reference types="react-scripts" />
declare module 'redux-thunk-actions' {

	export function createActionThunk<Payload = any>(
		type: string,
		action: import('redux-actions').ActionFunction0<Payload>
	): import('redux-actions').ActionFunction0<Payload>

	export function createActionThunk<Arg1, Payload = any>(
		type: string,
		action: import('redux-actions').ActionFunction1<Arg1, Payload>
	): import('redux-actions').ActionFunction1<Arg1, Payload>

	export function createActionThunk<Arg1, Arg2, Payload = any>(
		type: string,
		action: import('redux-actions').ActionFunction2<Arg1, Arg2, Payload>
	): import('redux-actions').ActionFunction2<Arg1, Arg2, Payload>

	export function createActionThunk<Arg1, Arg2, Arg3, Payload = any>(
		type: string,
		action: import('redux-actions').ActionFunction3<Arg1, Arg2, Arg3, Payload>
	): import('redux-actions').ActionFunction3<Arg1, Arg2, Arg3, Payload>
}