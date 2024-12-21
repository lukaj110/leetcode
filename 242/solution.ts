// Test cases

type InputType = [string, string];

const testCases: {
  input: InputType;
  output: boolean;
}[] = [
  {
    input: ["anagram", "nagaram"],
    output: true,
  },
  {
    input: ["rat", "car"],
    output: false,
  },
];

// Solution

function Solve(input: InputType): boolean {
  const s = input[0];
  const t = input[1];

  if (s.length !== t.length) return false;

  const charCount = new Map<string, number>();

  for (let i = 0; i < s.length; i++) {
    charCount.set(s[i], (charCount.get(s[i]) || 0) + 1);
    charCount.set(t[i], (charCount.get(t[i]) || 0) - 1);
  }

  for (const count of charCount.values()) {
    if (count !== 0) return false;
  }

  return true;
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
