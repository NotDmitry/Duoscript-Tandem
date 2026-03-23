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
  console.log(GREETING, DEFAULT_USERNAME, images);
  return <div>Home page</div>;
}

export default Home;
