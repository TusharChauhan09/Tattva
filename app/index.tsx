import { Redirect } from "expo-router";

export default function Index() {
  // Entry point — redirect to sign-in
  return <Redirect href="/(auth)/sign-in" />;
}
