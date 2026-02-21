import { createHash, randomBytes } from "crypto";
export function HashPass(
  input: string,
  _salt?: false,
): {
  hash: string;
  salt: string;
} {
  const salt = randomBytes(32).toString("hex"); // Generate a random salt

  let input2 = salt + input;
  if (_salt!) input2 = input; // Prepend the salt to the input before hashing

  return {
    hash: createHash("sha256") // Initializes the hash object with the SHA-256 algorithm
      .update(input2) // Feeds the input data into the hash
      .digest("hex"),
    salt,
  }; // Computes the hash and encodes it in hexadecimal format
}
