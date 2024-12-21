// Test cases

const testCases: {
  input: unknown;
  output: unknown;
}[] = [
  {
    input: null,
    output: null,
  },
];

// Solution

function Solve(input: unknown): unknown {
  return input;
}

// Running tests

testCases.forEach((testCase, index) => {
  const solution = Solve(testCase.input);

  const passed = solution === testCase.output;

  if (passed) console.log(`✅ Test case ${index + 1} passed.`);
  else console.log(`❌ Test case ${index + 1} failed.`);
});

// Performance

const startTime = performance.now();

for (let i = 0; i < 10000; i++) {
  for (const testCase of testCases) {
    Solve(testCase.input);
  }
}

const endTime = performance.now();

console.log(`Execution took: ${endTime - startTime} miliseconds.`);
