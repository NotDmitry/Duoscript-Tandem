import { useAuth } from '@/shared/hooks/useAuth.ts';
import { getUserNameFromLS } from '@/api/auth.api.ts';

const GREETING = 'Hello dear';
const DEFAULT_USERNAME = 'developer';
const APP_DESCRIPTION =
  'Duoscript-Tandem is your best friend during the tough times of preparing\n' +
  'for technical interviews. Its primary aim is to provide you with a\n' +
  'variety of exercises that will aid in the development and enhancement of\n' +
  'your hard-skills. The app contains multiple widgets and a dashboard for\n' +
  'tracking your activity.';
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
  console.log(user, userName);
  console.log(APP_DESCRIPTION);
}

export default Home;
