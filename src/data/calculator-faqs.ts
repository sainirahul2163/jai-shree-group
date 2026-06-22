export type CalculatorFaq = { q: string; a: string };

export const CALCULATOR_FAQS: CalculatorFaq[] = [
  {
    q: "What is open area percentage in perforated sheet?",
    a: "Open area percentage is the ratio of hole area to total sheet area, expressed as a percentage. Higher open area means more flow-through and less material weight.",
  },
  {
    q: "How do I calculate open area for round holes?",
    a: "For round holes in triangular pitch: Open Area % = (0.9069 × d²) / p² × 100, where d = hole diameter and p = pitch distance.",
  },
  {
    q: "What is open area in perforated sheets?",
    a: "Open area is the percentage of a perforated sheet surface that consists of holes versus solid metal. It affects airflow, filtration efficiency, and structural strength.",
  },
  {
    q: "How does hole pitch affect open area?",
    a: "Closer pitch (smaller distance between holes) reduces open area percentage. Triangular staggered pitch typically gives higher open area than rectangular pitch for the same hole size.",
  },
  {
    q: "What open area is best for filtration?",
    a: "Higher open area (typically 40–60%+) allows better flow and is preferred for filtration applications. Lower open area provides greater structural strength.",
  },
  {
    q: "What is the difference between triangular and staggered pitch?",
    a: "Triangular (60° staggered) arranges holes in equilateral triangle pattern. Staggered pitch refers to offset row arrangement. Both affect open area calculation differently.",
  },
  {
    q: "Can Jai Shree Group manufacture to a specific open area?",
    a: "Yes, we manufacture perforated sheets to achieve your required open area percentage by selecting appropriate hole size, pitch, and pattern. Contact us with your specification.",
  },
];

export const calculatorFaqs = CALCULATOR_FAQS.map(({ q, a }) => ({
  question: q,
  answer: a,
}));
