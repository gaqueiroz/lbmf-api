interface IBasicAuthenticationTokenCredentials {
  username: string;
  password: string;
}

export function decodeBasicAuthenticationToken(
  basicAuthenticationToken: string
): IBasicAuthenticationTokenCredentials {
  const encodedCredentials = basicAuthenticationToken.replace('Basic ', '');

  const decodedCredentials = Buffer.from(
    encodedCredentials,
    'base64'
  ).toString();

  const [username, password] = decodedCredentials.split(':');

  return { username, password };
}
