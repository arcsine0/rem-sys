import './Home.css';

// components
import Test from '../components/Test';

function Home() {
  return (
    <div>
      Hello Home
      <Test name="Test Component" desc="This is a test component" />
    </div>
  );
}

export default Home;