import { google } from '$lib/server/oauth';
import type { RequestEvent } from './$types';
import type { OAuth2Tokens } from 'arctic';
import { createProviderAccount, findUserByProvider } from '$lib/features/user/queries';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';

interface GoogleUser {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
	locale: string;
}

export async function GET(event: RequestEvent): Promise<Response> {
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');

	if (storedState === null || codeVerifier === null || code === null || state === null) {
		return new Response('Please restart the process.', {
			status: 400
		});
	}

	if (storedState !== state) {
		return new Response('Please restart the process.', {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch {
		return new Response('Please restart the process.', {
			status: 400
		});
	}

	const googleAccessToken = tokens.accessToken();

	const userRequest = new Request('https://openidconnect.googleapis.com/v1/userinfo');
	userRequest.headers.set('Authorization', `Bearer ${googleAccessToken}`);
	const userResponse = await fetch(userRequest);
	const userResult: GoogleUser = await userResponse.json();

	const existingUser = await findUserByProvider({
		providerId: userResult.sub,
		providerName: 'google'
	});

	if (existingUser !== null) {
		const token = generateSessionToken();
		const session = await createSession(token, existingUser.id);
		setSessionTokenCookie(event, token, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	const user = await createProviderAccount({
		providerId: userResult.sub,
		providerName: 'google',
		username: userResult.name,
		email: userResult.email
	});

	const token = generateSessionToken();
	const session = await createSession(token, user.id);
	setSessionTokenCookie(event, token, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
