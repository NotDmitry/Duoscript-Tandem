interface JWTPayload {
  userId: string;
  nickname: string;
  creating: number;
  expiration: number;
}
const accessTokenLiveTimeMinutes = 30;
const refreshTokenLiveTimeDays = 7;

const ACCESS_TOKEN_EXPIRY = accessTokenLiveTimeMinutes * 60 * 1000;

const REFRESH_TOKEN_EXPIRY = refreshTokenLiveTimeDays * 24 * 60 * 60 * 1000;
const SECRET = 'mock-secret-key';

function createToken(
  payload: Omit<JWTPayload, 'creating' | 'expiration'>,
  expiresIn: number
): string {
  const now = Date.now();
  const tokenPayload: JWTPayload = {
    ...payload,
    creating: Math.floor(now / 1000),
    expiration: Math.floor((now + expiresIn) / 1000),
  };

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(tokenPayload));

  const signature = btoa(SECRET + encodedPayload);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(parts[1])) as JWTPayload;
    return payload;
  } catch {
    return null;
  }
}

export function createAccessToken(userId: string, nickname: string): string {
  return createToken({ userId, nickname }, ACCESS_TOKEN_EXPIRY);
}

export function createRefreshToken(userId: string, nickname: string): string {
  return createToken({ userId, nickname }, REFRESH_TOKEN_EXPIRY);
}
