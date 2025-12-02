export const brokenSnippets = [
  {
    id: "ui",
    title: "Broken Button Component",
    code: `function BrokenButton({ onClick }) {
  return (
    <button onClik={onClick} className="bg-blue-500 text-white px-4 py-2">
      Click Me
    </button>
  );
}

export default BrokenButton;`,
  },
  {
    id: "api",
    title: "Buggy API Handler",
    code: `app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(user); // typo
});`,
  },
  {
    id: "perf",
    title: "Slow Summation Function",
    code: `function sumLargeArray(arr) {
  let result = 0;
  for (let i = 0; i < 100000000; i++) { // unnecessary big loop
    result += arr[i % arr.length];
  }
  return result;
}`,
  },
];
