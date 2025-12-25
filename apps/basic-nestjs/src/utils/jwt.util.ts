import { createSigner } from 'fast-jwt';

// JWT Payload interface
export interface JwtTokenPayload {
  user?: {
    role?: string;
    id?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Gets the JWT secret key from environment variables
 * @throws Error if JWT_SECRET is not configured
 * @returns The JWT secret key
 */
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      'JWT_SECRET environment variable is not set. Please configure it in your environment variables.',
    );
  }

  return secret;
}

/**
 * Generates a JWT token
 * @param payload - The payload to encode in the JWT
 * @param expiresIn - Token expiration time (e.g., '1h', '7d', '30m'). Default: '1h'
 * @returns A signed JWT token string
 * @throws Error if JWT_SECRET is not configured
 */
export function generateJwtToken(
  payload: JwtTokenPayload,
  expiresIn: string = '1h',
): string {
  const secretKey = getJwtSecret();

  const signer = createSigner({
    key: secretKey,
    algorithm: 'HS256',
    expiresIn,
  });

  return signer(payload);
}

/**
 * Helper function to generate a token with user roles
 * @param role - User role (admin, user, guest)
 * @param userId - User ID
 * @param expiresIn - Token expiration time. Default: '1h'
 * @returns A signed JWT token string
 * @throws Error if JWT_SECRET is not configured
 */
export function generateUserToken(
  role: 'admin' | 'user' | 'guest',
  userId: string,
  expiresIn: string = '1h',
): string {
  return generateJwtToken(
    {
      user: {
        role,
        id: userId,
      },
    },
    expiresIn,
  );
}
