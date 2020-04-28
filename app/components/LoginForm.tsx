import React, { useState } from "react";
import { Button, Input, Flex, Alert } from "minerva-ui";
import createUser from "app/users/mutations/createUser";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  // const router = useRouter()

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search)
  //   const token: string = params.get('token')

  //   async function fetchUser() {
  //     // const user = await getCurrentUser(token)
  //     const res = await axios.post(`/api/auth?token=${token}`)
  //     // router.push('/');
  //   }

  //   if (token) {
  //     fetchUser()
  //   }
  // }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await createUser({ data: { email } });

      if (process.env.NODE_ENV !== "production") {
        // when developing locally, just go to the token route instead of sending an email
        window.location.href = res.url;
      }
      setSuccess(
        "Great, you've just been emailed a link you can use to sign in"
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Flex alignItems="center" flexDirection="column">
      <Flex as="form" maxWidth="600px" onSubmit={handleSubmit} px={2} py={6}>
        <Input
          // @ts-ignore
          appearance="none"
          placeholder="Email Address"
          radiusRight={0}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Button
          type="submit"
          radiusLeft={0}
          minWidth="80px"
          isLoading={isLoading}
        >
          Log In
        </Button>
      </Flex>
      {success && <Alert status="success">{success}</Alert>}
    </Flex>
  );
}
