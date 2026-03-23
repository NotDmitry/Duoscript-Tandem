import { useAuth } from '@/shared/hooks/useAuth.ts';
import { getUserNameFromLS } from '@/api/auth.api.ts';

const GREETING = 'Hello dear';
const DEFAULT_USERNAME = 'developer';

const images = [
  {
    link: 'src/assets/images/Landing_Example_1.jpg',
    alt: 'Dashboard example',
  },
  {
    link: 'src/assets/images/Landing_Example_2.jpg',
    alt: 'Quiz task example',
  },
];

function Home() {
  const { user } = useAuth();
  const userName: string =
    user !== null ? getUserNameFromLS() : DEFAULT_USERNAME;
  console.log(GREETING, DEFAULT_USERNAME, images);
  return <div>Home page</div>;
  console.log(user, userName);
}

export default Home;
