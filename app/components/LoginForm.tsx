import React, { useState } from 'react';
import { Button, Input, Flex, Alert, Heading, Text } from 'minerva-ui';
import createUser from 'app/users/mutations/createUser';

const EXAMPLE_TASKS = [
  'Talk to Sabel',
  'Check Your Bonus Nook Miles',
  'Buy Fake Art',
  'Find Your Fossils',
  'Invite Elijah Wood',
  'Shake Your Trees',
];

const getRandomTask = () => {
  return EXAMPLE_TASKS[Math.floor(Math.random() * EXAMPLE_TASKS.length)];
};

const task = getRandomTask();

// const FeatureCard = ({ title, children, ...props }) => {
//   return (
//     <Box p={4}>
//       <Text fontFamily="BalooBold" fontSize="lg">
//         {title}
//       </Text>
//       <Text fontSize="md">{children}</Text>
//     </Box>
//   );
// };

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
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

      if (process.env.NODE_ENV !== 'production') {
        // when developing locally, just go to the token route instead of sending an email
        window.location.href = res.url;
      }
      setSuccess('Check Your Email For a Link To Sign In');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Flex alignItems="center" flexDirection="column" textAlign="center">
        <Heading
          as="h1"
          fontFamily="BalooBold"
          // @ts-ignore
          fontSize={['2rem', '3rem']}
          my={6}
        >
          Never Forget To {task} Again
        </Heading>
        <Heading as="h2" fontSize="20px" my={6}>
          Froggy Chores is a simple daily task tracker for Animal Crossing.
        </Heading>
        <Flex
          as="form"
          width="100%"
          maxWidth="400px"
          onSubmit={handleSubmit}
          flexDirection="column"
          px={2}
          py={2}
        >
          <Input
            // @ts-ignore
            appearance="none"
            placeholder="Email Address"
            // radiusBottom={0}
            paddingRight={2}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            mt={2}
            // radiusTop={0}

            // radiusRight="10px"
            // radiusBottom="10px"
            minWidth="100px"
            isLoading={isLoading}
          >
            Get Started
          </Button>
        </Flex>
        {success && (
          <Alert status="success">
            <Text as="span">{success}</Text>
          </Alert>
        )}
      </Flex>
      {/* <Flex flexWrap="wrap">
        <FeatureCard title="Get Started Quickly">
          You'll be set with several pre-defined tasks to start tracking right
          away
        </FeatureCard>
        <FeatureCard title="Create Custom Tasks">
          Create your own custom tasks to check on daily
        </FeatureCard>
        <FeatureCard title="Track Your Villagers">
          Add Your Villagers And Track Who You've Talked To
        </FeatureCard>
      </Flex> */}
    </>
  );
}
