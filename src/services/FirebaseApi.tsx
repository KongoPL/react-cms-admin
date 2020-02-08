import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase/app';
import ENV from 'env.json';

export default class FirebaseApi
{
	static config = ENV.firebase;

	static doStuff()
	{
		firebase.initializeApp(FirebaseApi.config);

		const auth = firebase.auth(),
			db = firebase.firestore();

		auth.signInAnonymously().then(() => {
			db.collection('test').doc('joey').set({
				id: 'joey',
				some: 'data'
			});
		})
	}
}
