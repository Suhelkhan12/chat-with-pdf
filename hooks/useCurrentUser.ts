import { currentUser } from "@clerk/nextjs/server";

export default async function useCurrentUser() {
  const user = await currentUser();
  return user;
}
