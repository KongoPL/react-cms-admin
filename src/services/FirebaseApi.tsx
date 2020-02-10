import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase/app';

export default class FirebaseApi
{
	private static auth;
	private static firestore;

	static init(config): Promise<any>
	{
		firebase.initializeApp(config);

		FirebaseApi.auth = firebase.auth();
		FirebaseApi.firestore = firebase.firestore();

		return FirebaseApi.auth.signInAnonymously();
	}

	static getCollection(path: string)
	{
		return FirebaseApi.firestore.collection(path);
	}
}
