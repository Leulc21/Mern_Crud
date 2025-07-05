import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <p className="text-gray-700">
        This is where the home page content will be displayed.
      </p>
      <button className="btn btn-primary">Default</button>
    </div>
  );
};

export default HomePage;
