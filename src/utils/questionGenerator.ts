import { Question } from '../types';

const fractions = [
  { num: 1, den: 2 },
  { num: 1, den: 3 },
  { num: 2, den: 3 },
  { num: 1, den: 4 },
  { num: 3, den: 4 },
  { num: 1, den: 5 },
  { num: 2, den: 5 },
  { num: 3, den: 5 },
  { num: 4, den: 5 },
  { num: 1, den: 6 },
  { num: 5, den: 6 },
  { num: 1, den: 8 },
  { num: 3, den: 8 },
  { num: 5, den: 8 },
  { num: 7, den: 8 }
];

const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const simplifyFraction = (num: number, den: number): { num: number; den: number } => {
  const divisor = gcd(Math.abs(num), Math.abs(den));
  return { num: num / divisor, den: den / divisor };
};

const formatFraction = (num: number, den: number): string => {
  if (den === 1) return num.toString();
  if (num === 0) return '0';
  const simplified = simplifyFraction(num, den);
  return `${simplified.num}/${simplified.den}`;
};

const generateAdditionQuestion = (id: number): Question => {
  const frac1 = fractions[Math.floor(Math.random() * fractions.length)];
  const frac2 = fractions[Math.floor(Math.random() * fractions.length)];
  
  const commonDen = lcm(frac1.den, frac2.den);
  const num1 = (frac1.num * commonDen) / frac1.den;
  const num2 = (frac2.num * commonDen) / frac2.den;
  const resultNum = num1 + num2;
  
  const correctAnswer = formatFraction(resultNum, commonDen);
  
  // Generate wrong answers
  const wrongAnswers = [
    formatFraction(resultNum + 1, commonDen),
    formatFraction(Math.max(1, resultNum - 1), commonDen),
    formatFraction(frac1.num + frac2.num, Math.max(frac1.den, frac2.den))
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} + ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `To add fractions, you need a common denominator. The LCD of ${frac1.den} and ${frac2.den} is ${commonDen}.`,
    solution: [
      `Find the LCD (Least Common Denominator) of ${frac1.den} and ${frac2.den}, which is ${commonDen}`,
      `Convert ${formatFraction(frac1.num, frac1.den)} to ${formatFraction(num1, commonDen)} by multiplying by ${commonDen/frac1.den}/${commonDen/frac1.den}`,
      `Convert ${formatFraction(frac2.num, frac2.den)} to ${formatFraction(num2, commonDen)} by multiplying by ${commonDen/frac2.den}/${commonDen/frac2.den}`,
      `Add the numerators: ${num1} + ${num2} = ${resultNum}`,
      `The answer is ${formatFraction(resultNum, commonDen)} = ${correctAnswer}`
    ],
    explanation: "When adding fractions, we need the same denominator. We find the LCD, convert both fractions, then add only the numerators.",
    operation: 'addition'
  };
};

const generateSubtractionQuestion = (id: number): Question => {
  const frac1 = fractions[Math.floor(Math.random() * fractions.length)];
  let frac2 = fractions[Math.floor(Math.random() * fractions.length)];
  
  // Ensure first fraction is larger
  if (frac1.num / frac1.den < frac2.num / frac2.den) {
    [frac1.num, frac1.den, frac2.num, frac2.den] = [frac2.num, frac2.den, frac1.num, frac1.den];
  }
  
  const commonDen = lcm(frac1.den, frac2.den);
  const num1 = (frac1.num * commonDen) / frac1.den;
  const num2 = (frac2.num * commonDen) / frac2.den;
  const resultNum = num1 - num2;
  
  const correctAnswer = formatFraction(resultNum, commonDen);
  
  const wrongAnswers = [
    formatFraction(resultNum + 1, commonDen),
    formatFraction(Math.max(1, resultNum - 1), commonDen),
    formatFraction(Math.abs(frac1.num - frac2.num), Math.max(frac1.den, frac2.den))
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} - ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `To subtract fractions, you need a common denominator. The LCD of ${frac1.den} and ${frac2.den} is ${commonDen}.`,
    solution: [
      `Find the LCD (Least Common Denominator) of ${frac1.den} and ${frac2.den}, which is ${commonDen}`,
      `Convert ${formatFraction(frac1.num, frac1.den)} to ${formatFraction(num1, commonDen)} by multiplying by ${commonDen/frac1.den}/${commonDen/frac1.den}`,
      `Convert ${formatFraction(frac2.num, frac2.den)} to ${formatFraction(num2, commonDen)} by multiplying by ${commonDen/frac2.den}/${commonDen/frac2.den}`,
      `Subtract the numerators: ${num1} - ${num2} = ${resultNum}`,
      `The answer is ${formatFraction(resultNum, commonDen)} = ${correctAnswer}`
    ],
    explanation: "When subtracting fractions, we need the same denominator. We find the LCD, convert both fractions, then subtract only the numerators.",
    operation: 'subtraction'
  };
};

const generateMultiplicationQuestion = (id: number): Question => {
  const frac1 = fractions[Math.floor(Math.random() * fractions.length)];
  const frac2 = fractions[Math.floor(Math.random() * fractions.length)];
  
  const resultNum = frac1.num * frac2.num;
  const resultDen = frac1.den * frac2.den;
  
  const correctAnswer = formatFraction(resultNum, resultDen);
  
  const wrongAnswers = [
    formatFraction(frac1.num + frac2.num, frac1.den + frac2.den),
    formatFraction(resultNum, frac1.den * frac2.den + 1),
    formatFraction(resultNum + 1, resultDen)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `To multiply fractions, multiply the numerators together and the denominators together: (${frac1.num} × ${frac2.num}) / (${frac1.den} × ${frac2.den}).`,
    solution: [
      `Multiply the numerators: ${frac1.num} × ${frac2.num} = ${resultNum}`,
      `Multiply the denominators: ${frac1.den} × ${frac2.den} = ${resultDen}`,
      `The result is ${resultNum}/${resultDen}`,
      `Simplify if possible: ${formatFraction(resultNum, resultDen)}`
    ],
    explanation: "When multiplying fractions, we multiply straight across - numerator times numerator, denominator times denominator. Then we simplify the result.",
    operation: 'multiplication'
  };
};

const generateDivisionQuestion = (id: number): Question => {
  const frac1 = fractions[Math.floor(Math.random() * fractions.length)];
  const frac2 = fractions[Math.floor(Math.random() * fractions.length)];
  
  const resultNum = frac1.num * frac2.den;
  const resultDen = frac1.den * frac2.num;
  
  const correctAnswer = formatFraction(resultNum, resultDen);
  
  const wrongAnswers = [
    formatFraction(frac1.num * frac2.num, frac1.den * frac2.den),
    formatFraction(resultNum, resultDen + 1),
    formatFraction(resultNum + 1, resultDen)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} ÷ ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `To divide fractions, multiply by the reciprocal: ${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.den, frac2.num)}.`,
    solution: [
      `To divide by a fraction, multiply by its reciprocal`,
      `The reciprocal of ${formatFraction(frac2.num, frac2.den)} is ${formatFraction(frac2.den, frac2.num)}`,
      `So we calculate: ${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.den, frac2.num)}`,
      `Multiply numerators: ${frac1.num} × ${frac2.den} = ${resultNum}`,
      `Multiply denominators: ${frac1.den} × ${frac2.num} = ${resultDen}`,
      `The answer is ${formatFraction(resultNum, resultDen)} = ${correctAnswer}`
    ],
    explanation: "To divide fractions, we multiply by the reciprocal (flip the second fraction). This is because division is the opposite of multiplication.",
    operation: 'division'
  };
};

export const generateQuestions = (level: number): Question[] => {
  const questions: Question[] = [];
  const questionsPerLevel = 10;
  
  for (let i = 0; i < questionsPerLevel; i++) {
    let question: Question;
    
    switch (level) {
      case 1:
        question = generateAdditionQuestion(i + 1);
        break;
      case 2:
        question = generateSubtractionQuestion(i + 1);
        break;
      case 3:
        question = generateMultiplicationQuestion(i + 1);
        break;
      case 4:
        question = generateDivisionQuestion(i + 1);
        break;
      default:
        question = generateAdditionQuestion(i + 1);
    }
    
    questions.push(question);
  }
  
  return questions;
};