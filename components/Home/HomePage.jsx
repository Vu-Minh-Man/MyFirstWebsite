function HomePage() {
  return (
    <>
      <h1>My Homepage</h1>
      <p>by Vũ Minh Mẫn</p>
      <p>{process.env.SERVER_URL}</p>
    </>
  );
}

export default HomePage;
