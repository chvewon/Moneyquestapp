import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Star, Trophy, Target, ShoppingCart, PiggyBank, Heart, Home, Book, Award, ChevronRight, CheckCircle, Circle, Plus, Minus } from '@expo/vector-icons';

const Moneyquest = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userProgress, setUserProgress] = useState({
    totalStars: 0,
    completedModules: [],
    completedLessons: [],
    currentLevel: 1,
    badges: [],
    savingsGoal: { target: 20, current: 0, item: 'New Toy' },
    dailyStreak: 0
  });
  const [selectedModule, setSelectedModule] = useState(null);
  const [gameState, setGameState] = useState({});

  // Save progress to memory
  const saveProgress = (newProgress) => {
    setUserProgress(newProgress);
  };

  const modules = [
    {
      id: 'basics',
      title: 'Money Basics',
      icon: '💰',
      color: 'bg-blue-400',
      lessons: ['What is Money?', 'Needs vs Wants', 'Banks Keep Money Safe'],
      completed: userProgress.completedModules.includes('basics')
    },
    {
      id: 'saving',
      title: 'Saving Money',
      icon: '🌱',
      color: 'bg-green-400',
      lessons: ['Why Save Money?', 'Setting Goals', 'Piggy Bank vs Bank Account', 'Money Trees Grow'],
      completed: userProgress.completedModules.includes('saving')
    },
    {
      id: 'spending',
      title: 'Smart Spending',
      icon: '🛒',
      color: 'bg-orange-400',
      lessons: ['Smart Choices', 'Plan vs Impulse', 'Comparing Prices', 'Shopping Smart'],
      completed: userProgress.completedModules.includes('spending')
    },
    {
      id: 'budgeting',
      title: 'Budgeting',
      icon: '🏺',
      color: 'bg-purple-400',
      lessons: ['What is a Budget?', '3 Jars Method', 'Spend Save Share', 'Allowance Planning'],
      completed: userProgress.completedModules.includes('budgeting')
    }
  ];

  // Comprehensive lesson content for ALL modules
  const allLessonContent = {
    // MONEY BASICS MODULE
    'What is Money?': {
      emoji: '💰',
      content: [
        { text: "Money is something special we use to buy things we need and want!", emoji: '🤔' },
        { text: "Long ago, people traded things like apples for bread. That was hard work!", emoji: '🍎🍞' },
        { text: "Now we use coins and bills to make trading much easier!", emoji: '🪙💵' },
        { text: "Money helps us get food, clothes, toys, and everything else!", emoji: '🛒' },
        { text: "We can earn money by doing chores or helping others!", emoji: '✨' }
      ],
      quiz: {
        question: "What do we use money for?",
        options: ["To buy things we need", "To make paper airplanes", "To feed our pets"],
        correct: 0
      }
    },
    'Needs vs Wants': {
      emoji: '🤷‍♀️',
      content: [
        { text: "NEEDS are things we must have to live and be healthy!", emoji: '❤️' },
        { text: "Food, water, a home, and clothes are all needs!", emoji: '🏠🍎👕' },
        { text: "WANTS are things that would be fun to have but we don't need them!", emoji: '🎮' },
        { text: "Toys, candy, and video games are wants - they're nice but not necessary!", emoji: '🍭🧸' },
        { text: "Smart money users buy needs first, then wants if they have money left!", emoji: '🧠' }
      ],
      quiz: {
        question: "Which of these is a NEED?",
        options: ["A warm jacket", "A new video game", "Ice cream"],
        correct: 0
      }
    },
    'Banks Keep Money Safe': {
      emoji: '🏦',
      content: [
        { text: "Banks are like super safe treasure chests for your money!", emoji: '🗝️' },
        { text: "They keep your money protected from getting lost or stolen!", emoji: '🛡️' },
        { text: "Banks have thick walls, cameras, and guards to keep money safe!", emoji: '👮‍♂️' },
        { text: "You can put money IN the bank (deposit) or take money OUT (withdraw)!", emoji: '💰' },
        { text: "Banks even pay you a little extra money for keeping your money there!", emoji: '🎁' }
      ],
      quiz: {
        question: "Why do people put money in banks?",
        options: ["To keep it safe", "To make it disappear", "To change the color"],
        correct: 0
      }
    },

    // SAVING MONEY MODULE
    'Why Save Money?': {
      emoji: '🐷',
      content: [
        { text: "Saving means keeping some money for later instead of spending it all now!", emoji: '💪' },
        { text: "When we save, we can buy bigger and better things in the future!", emoji: '🎁' },
        { text: "Saving helps us be ready for surprises - like if our bike breaks!", emoji: '🚲' },
        { text: "It feels amazing to reach a savings goal you worked hard for!", emoji: '🎉' },
        { text: "The more you save, the more choices you have later!", emoji: '🌟' }
      ],
      quiz: {
        question: "Why is saving money a good idea?",
        options: ["To buy bigger things later", "To make money disappear", "To have less money"],
        correct: 0
      }
    },
    'Setting Goals': {
      emoji: '🎯',
      content: [
        { text: "A savings goal is something special you want to buy in the future!", emoji: '🎁' },
        { text: "Pick something you really want - like a new bike or video game!", emoji: '🚲🎮' },
        { text: "Figure out how much it costs and write it down!", emoji: '📝' },
        { text: "Decide how much money you can save each week!", emoji: '📅' },
        { text: "Watch your money grow until you reach your goal! It's like magic!", emoji: '✨' }
      ],
      quiz: {
        question: "What's the first step in setting a savings goal?",
        options: ["Pick something you want to buy", "Spend all your money", "Hide your money"],
        correct: 0
      }
    },
    'Piggy Bank vs Bank Account': {
      emoji: '🐷🏦',
      content: [
        { text: "A piggy bank is a fun way to save money at home!", emoji: '🏠' },
        { text: "You can see your coins and bills growing in your piggy bank!", emoji: '👀' },
        { text: "A bank account is like a piggy bank at the real bank!", emoji: '🏦' },
        { text: "Banks keep your money extra safe and give you a little extra money too!", emoji: '🛡️' },
        { text: "You can start with a piggy bank and move to a bank account when you're ready!", emoji: '⬆️' }
      ],
      quiz: {
        question: "What's special about bank accounts?",
        options: ["They give you extra money for saving", "They make money disappear", "They only work on weekends"],
        correct: 0
      }
    },
    'Money Trees Grow': {
      emoji: '🌳',
      content: [
        { text: "When you save money, it's like planting a seed that grows into a tree!", emoji: '🌱' },
        { text: "The longer you save, the bigger your money tree grows!", emoji: '🌳' },
        { text: "Banks help your money tree grow by adding extra money (interest)!", emoji: '💰' },
        { text: "Even small amounts of money can grow big over time!", emoji: '📈' },
        { text: "The secret is to be patient and keep adding to your savings!", emoji: '⏰' }
      ],
      quiz: {
        question: "How do money trees grow bigger?",
        options: ["By saving money over time", "By spending money quickly", "By hiding money under your bed"],
        correct: 0
      }
    },

    // SMART SPENDING MODULE
    'Smart Choices': {
      emoji: '🧠',
      content: [
        { text: "Smart spending means thinking before you buy something!", emoji: '🤔' },
        { text: "Ask yourself: Do I really need this or just want it?", emoji: '❓' },
        { text: "Will this make me happy for a long time or just today?", emoji: '😊' },
        { text: "Do I have enough money left for things I really need?", emoji: '💭' },
        { text: "Smart spenders take time to think and make good choices!", emoji: '✅' }
      ],
      quiz: {
        question: "What should you do before buying something?",
        options: ["Think about if you really need it", "Buy it immediately", "Ask a stranger"],
        correct: 0
      }
    },
    'Plan vs Impulse': {
      emoji: '📝⚡',
      content: [
        { text: "Planning means deciding what to buy BEFORE you go shopping!", emoji: '📋' },
        { text: "Make a list of things you need so you don't forget!", emoji: '✏️' },
        { text: "Impulse buying is when you see something and buy it right away!", emoji: '⚡' },
        { text: "Impulse buying can use up money you need for important things!", emoji: '😱' },
        { text: "Smart kids plan their purchases and stick to their list!", emoji: '🎯' }
      ],
      quiz: {
        question: "What's better for smart spending?",
        options: ["Planning what to buy first", "Buying everything you see", "Never buying anything"],
        correct: 0
      }
    },
    'Comparing Prices': {
      emoji: '🏷️',
      content: [
        { text: "Different stores can sell the same thing for different prices!", emoji: '🏪' },
        { text: "Smart shoppers compare prices to find the best deal!", emoji: '🔍' },
        { text: "Sometimes the same toy costs $10 at one store and $8 at another!", emoji: '💰' },
        { text: "You can save money by checking a few stores before buying!", emoji: '💡' },
        { text: "The money you save can go toward other things you want!", emoji: '🎁' }
      ],
      quiz: {
        question: "Why should you compare prices?",
        options: ["To find the best deal and save money", "To confuse the store owners", "To waste time"],
        correct: 0
      }
    },
    'Shopping Smart': {
      emoji: '🛍️',
      content: [
        { text: "Smart shoppers bring a list and stick to it!", emoji: '📝' },
        { text: "They compare prices and look for sales and discounts!", emoji: '🏷️' },
        { text: "They think about quality - will this last a long time?", emoji: '💪' },
        { text: "They ask: Is this the best use of my money right now?", emoji: '🤔' },
        { text: "Smart shopping helps your money go further!", emoji: '🚀' }
      ],
      quiz: {
        question: "What do smart shoppers always bring?",
        options: ["A shopping list", "A pet", "A friend's money"],
        correct: 0
      }
    },

    // BUDGETING MODULE
    'What is a Budget?': {
      emoji: '📊',
      content: [
        { text: "A budget is a plan for how to use your money!", emoji: '📋' },
        { text: "It helps you decide how much to spend, save, and share!", emoji: '⚖️' },
        { text: "Think of it like dividing up your Halloween candy!", emoji: '🍬' },
        { text: "Some for now, some for later, and some to share with friends!", emoji: '👫' },
        { text: "Budgets help make sure you have money for everything important!", emoji: '✅' }
      ],
      quiz: {
        question: "What is a budget?",
        options: ["A plan for using your money", "A type of candy", "A new video game"],
        correct: 0
      }
    },
    '3 Jars Method': {
      emoji: '🏺🏺🏺',
      content: [
        { text: "The 3 jars method is a super easy way to manage your money!", emoji: '💡' },
        { text: "Get three jars and label them: SPEND, SAVE, and SHARE!", emoji: '🏷️' },
        { text: "When you get money, divide it between the three jars!", emoji: '💰' },
        { text: "This helps you remember to spend some, save some, and share some!", emoji: '🎯' },
        { text: "It's like having three piggy banks with different jobs!", emoji: '🐷' }
      ],
      quiz: {
        question: "What are the three jars for?",
        options: ["Spend, Save, and Share", "Red, Blue, and Green", "Big, Medium, and Small"],
        correct: 0
      }
    },
    'Spend Save Share': {
      emoji: '💸💰❤️',
      content: [
        { text: "SPEND money is for things you need and want right now!", emoji: '🛒' },
        { text: "SAVE money is for bigger things you want in the future!", emoji: '🎁' },
        { text: "SHARE money is for helping others and giving to good causes!", emoji: '🤝' },
        { text: "Try to put the same amount in each jar to stay balanced!", emoji: '⚖️' },
        { text: "This helps you be smart with money and kind to others!", emoji: '🌟' }
      ],
      quiz: {
        question: "What is SHARE money for?",
        options: ["Helping others and giving to good causes", "Buying more toys", "Hiding under your bed"],
        correct: 0
      }
    },
    'Allowance Planning': {
      emoji: '💵📅',
      content: [
        { text: "An allowance is money you get regularly for doing chores!", emoji: '🧹' },
        { text: "Plan what to do with your allowance before you get it!", emoji: '📝' },
        { text: "Maybe $2 for spending, $2 for saving, and $1 for sharing!", emoji: '💰' },
        { text: "Stick to your plan and watch your money grow!", emoji: '📈' },
        { text: "Planning ahead helps you make smart money choices!", emoji: '🧠' }
      ],
      quiz: {
        question: "When should you plan how to use your allowance?",
        options: ["Before you get it", "After you spend it all", "Never"],
        correct: 0
      }
    }
  };

  const LessonDetailScreen = ({ lesson, moduleId }) => {
    const currentLesson = allLessonContent[lesson];
    const [currentStep, setCurrentStep] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);

    const handleQuizAnswer = (selectedAnswer) => {
      if (selectedAnswer === currentLesson.quiz.correct) {
        setQuizComplete(true);
        const newProgress = {
          ...userProgress,
          totalStars: userProgress.totalStars + 5,
          completedLessons: [...new Set([...userProgress.completedLessons, lesson])]
        };
        saveProgress(newProgress);
      }
    };

    if (showQuiz) {
      return (
        <div className="p-4 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
          <div className="flex items-center mb-6">
            <button onClick={() => setShowQuiz(false)} className="text-blue-600 text-2xl mr-3">←</button>
            <h2 className="text-xl font-bold text-blue-800">Quick Quiz!</h2>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🤓</div>
            <h3 className="text-lg font-bold text-blue-800 mb-4">{currentLesson.quiz.question}</h3>
          </div>

          {!quizComplete ? (
            <div className="space-y-4">
              {currentLesson.quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  className="w-full bg-white hover:bg-blue-50 text-blue-800 font-bold py-4 px-6 rounded-2xl text-lg border-2 border-blue-200"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-600 mb-4">Awesome job!</h3>
              <p className="text-lg text-blue-700 mb-6">You earned 5 stars! ⭐⭐⭐⭐⭐</p>
              <button
                onClick={() => setCurrentScreen('module')}
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-bold py-3 px-6 rounded-2xl text-lg"
              >
                Back to Lessons
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="p-4 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
        <div className="flex items-center mb-6">
          <button onClick={() => setCurrentScreen('module')} className="text-blue-600 text-2xl mr-3">←</button>
          <h2 className="text-xl font-bold text-blue-800">{lesson}</h2>
        </div>

        <div className="text-center mb-6">
          <div className="text-8xl mb-4">{currentLesson.emoji}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 border-4 border-blue-200">
          <div className="text-center">
            <div className="text-4xl mb-4">{currentLesson.content[currentStep].emoji}</div>
            <p className="text-lg text-blue-800 font-semibold leading-relaxed">
              {currentLesson.content[currentStep].text}
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          {currentLesson.content.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full mx-1 ${
                idx === currentStep ? 'bg-blue-500' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`flex-1 py-3 px-6 rounded-2xl text-lg font-bold ${
              currentStep === 0
                ? 'bg-gray-300 text-gray-500'
                : 'bg-blue-400 hover:bg-blue-500 text-white'
            }`}
          >
            ← Previous
          </button>
          
          {currentStep < currentLesson.content.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl text-lg"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setShowQuiz(true)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-2xl text-lg"
            >
              🧠 Quiz Time!
            </button>
          )}
        </div>
      </div>
    );
  };

  // GAMES FOR EACH MODULE
  const NeedsVsWantsGame = () => {
    const [items] = useState([
      { name: 'Food', type: 'need', emoji: '🍎' },
      { name: 'Video Game', type: 'want', emoji: '🎮' },
      { name: 'House', type: 'need', emoji: '🏠' },
      { name: 'Candy', type: 'want', emoji: '🍭' },
      { name: 'Clothes', type: 'need', emoji: '👕' },
      { name: 'Toy Car', type: 'want', emoji: '🚗' },
      { name: 'Medicine', type: 'need', emoji: '💊' },
      { name: 'Ice Cream', type: 'want', emoji: '🍦' }
    ]);
    const [sortedItems, setSortedItems] = useState({ needs: [], wants: [] });
    const [score, setScore] = useState(0);

    const handleDrop = (item, category) => {
      const newSorted = { ...sortedItems };
      newSorted[category].push(item);
      setSortedItems(newSorted);
      
      if ((category === 'needs' && item.type === 'need') || 
          (category === 'wants' && item.type === 'want')) {
        setScore(score + 1);
      }
    };

    return (
      <div className="p-4 bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentScreen('module')} className="text-blue-600 text-2xl mr-3">←</button>
          <h2 className="text-2xl font-bold text-blue-800">Needs vs Wants Game</h2>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🎯</div>
          <p className="text-lg text-blue-700">Drag items to the right box!</p>
          <div className="text-yellow-600 font-bold text-xl">⭐ Score: {score}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-200 p-4 rounded-2xl border-4 border-green-300">
            <h3 className="text-xl font-bold text-green-800 text-center mb-3">📦 NEEDS</h3>
            <div className="min-h-20 space-y-2">
              {sortedItems.needs.map((item, idx) => (
                <div key={idx} className="bg-green-300 p-2 rounded-xl text-center">
                  {item.emoji} {item.name}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-pink-200 p-4 rounded-2xl border-4 border-pink-300">
            <h3 className="text-xl font-bold text-pink-800 text-center mb-3">🎈 WANTS</h3>
            <div className="min-h-20 space-y-2">
              {sortedItems.wants.map((item, idx) => (
                <div key={idx} className="bg-pink-300 p-2 rounded-xl text-center">
                  {item.emoji} {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {items.filter(item => 
            !sortedItems.needs.includes(item) && !sortedItems.wants.includes(item)
          ).map((item, idx) => (
            <div key={idx} className="flex space-x-2">
              <button
                onClick={() => handleDrop(item, 'needs')}
                className="flex-1 bg-green-100 hover:bg-green-200 p-3 rounded-xl border-2 border-green-300 text-center font-semibold"
              >
                {item.emoji} {item.name} → NEEDS
              </button>
              <button
                onClick={() => handleDrop(item, 'wants')}
                className="flex-1 bg-pink-100 hover:bg-pink-200 p-3 rounded-xl border-2 border-pink-300 text-center font-semibold"
              >
                {item.emoji} {item.name} → WANTS
              </button>
            </div>
          ))}
        </div>

        {sortedItems.needs.length + sortedItems.wants.length === items.length && (
          <div className="mt-6 text-center">
            <div className="text-6xl mb-2">🎉</div>
            <p className="text-xl font-bold text-green-600">Great job!</p>
            <button 
              onClick={() => {
                const newProgress = {
                  ...userProgress,
                  totalStars: userProgress.totalStars + score
                };
                saveProgress(newProgress);
                setCurrentScreen('module');
              }}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-bold py-3 px-6 rounded-2xl text-lg"
            >
              ⭐ Collect {score} Stars!
            </button>
          </div>
        )}
      </div>
    );
  };

  const SavingsTreeGame = () => {
    const [treeLevel, setTreeLevel] = useState(1);
    const [savedAmount, setSavedAmount] = useState(0);
    const treeEmojis = ['🌱', '🌿', '🌳', '🌲'];
    const treeMessages = [
      "Your money seed is planted!",
      "Your savings are sprouting!",
      "Your money tree is growing!",
      "Your money tree is mighty!"
    ];

    const addMoney = (amount) => {
      const newAmount = savedAmount + amount;
      setSavedAmount(newAmount);
      const newLevel = Math.min(Math.floor(newAmount / 5) + 1, 4);
      setTreeLevel(newLevel);
    };

    return (
      <div className="p-4 bg-gradient-to-b from-green-100 to-green-200 min-h-screen">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentScreen('module')} className="text-green-600 text-2xl mr-3">←</button>
          <h2 className="text-2xl font-bold text-green-800">Money Tree Game</h2>
        </div>

        <div className="text-center mb-6">
          <div className="text-8xl mb-4">{treeEmojis[treeLevel - 1]}</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">{treeMessages[treeLevel - 1]}</h3>
          <p className="text-lg text-green-700">Saved: ${savedAmount}</p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => addMoney(1)}
            className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-2xl text-lg"
          >
            💰 Save $1
          </button>
          <button
            onClick={() => addMoney(5)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg"
          >
            💵 Save $5
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 text-center">
          <h4 className="font-bold text-green-800 mb-2">🌳 Tree Growth Chart</h4>
          <p className="text-sm text-green-700">$0-4: Seed 🌱 | $5-9: Sprout 🌿 | $10-14: Tree 🌳 | $15+: Mighty Tree 🌲</p>
        </div>

        {treeLevel === 4 && (
          <div className="mt-6 text-center">
            <div className="text-6xl mb-2">🎉</div>
            <p className="text-xl font-bold text-green-600">Your money tree is fully grown!</p>
            <button 
              onClick={() => {
                const newProgress = {
                  ...userProgress,
                  totalStars: userProgress.totalStars + 20
                };
                saveProgress(newProgress);
                setCurrentScreen('module');
              }}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-bold py-3 px-6 rounded-2xl text-lg"
            >
              ⭐ Collect 20 Stars!
            </button>
          </div>
        )}
      </div>
    );
  };

  const ShoppingGame = () => {
    const [budget] = useState(10);
    const [spent, setSpent] = useState(0);
    const [cart, setCart] = useState([]);
    const [items] = useState([
      { name: 'Apple', price: 1, emoji: '🍎' },
      { name: 'Toy Car', price: 3, emoji: '🚗' },
      { name: 'Book', price: 2, emoji: '📚' },
      { name: 'Candy', price: 1, emoji: '🍭' },
      { name: 'Puzzle', price: 4, emoji: '🧩' },
      { name: 'Pencil', price: 1, emoji: '✏️' }
    ]);

    const addToCart = (item) => {
      if (spent + item.price <= budget) {
        setCart([...cart, item]);
        setSpent(spent + item.price);
      }
    };

    const removeFromCart = (itemToRemove) => {
      const itemIndex = cart.findIndex(item => item.name === itemToRemove.name);
      if (itemIndex > -1) {
        const newCart = [...cart];
        newCart.splice(itemIndex, 1);
        setCart(newCart);
        setSpent(spent - itemToRemove.price);
      }
    };

    return (
      <div className="p-4 bg-gradient-to-b from-orange-100 to-orange-200 min-h-screen">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentScreen('module')} className="text-orange-600 text-2xl mr-3">←</button>
          <h2 className="text-2xl font-bold text-orange-800">Shopping Challenge</h2>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🛍️</div>
          <p className="text-lg text-orange-700">Budget: ${budget}</p>
          <p className="text-lg text-orange-700">Spent: ${spent}</p>
          <p className="text-lg font-bold text-green-600">Left: ${budget - spent}</p>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-6">
          <h3 className="font-bold text-orange-800 mb-3">🛒 Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty!</p>
          ) : (
            <div className="space-y-2">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-orange-100 p-2 rounded-xl">
                  <span>{item.emoji} {item.name} - ${item.price}</span>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-orange-800">🏪 Store Items</h3>
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => addToCart(item)}
              disabled={spent + item.price > budget}
              className={`w-full p-3 rounded-xl border-2 font-semibold ${
                spent + item.price > budget
                  ? 'bg-gray-200 text-gray-500 border-gray-300'
                  : 'bg-white hover:bg-orange-50 text-orange-800 border-orange-200'
              }`}
            >
              {item.emoji} {item.name} - ${item.price}
              {spent + item.price > budget && ' (Can\'t afford)'}
            </button>
          ))}
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => {
              const newProgress = {
                ...userProgress,
                totalStars: userProgress.totalStars + 15
              };
              saveProgress(newProgress);
              setCurrentScreen('module');
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg"
          >
            ✅ Complete Shopping (+15 Stars)
          </button>
        )}
      </div>
    );
  };

  const JarsGame = () => {
    const [allowance, setAllowance] = useState(9);
    const [jars, setJars] = useState({ spend: 0, save: 0, share: 0 });
    const [isComplete, setIsComplete] = useState(false);

    const addToJar = (jarType, amount) => {
      if (allowance >= amount) {
        setJars({ ...jars, [jarType]: jars[jarType] + amount });
        setAllowance(allowance - amount);
        
        if (allowance - amount === 0) {
          setIsComplete(true);
        }
      }
    };

    const resetJar = (jarType) => {
      setAllowance(allowance + jars[jarType]);
      setJars({ ...jars, [jarType]: 0 });
      setIsComplete(false);
    };

    return (
      <div className="p-4 bg-gradient-to-b from-purple-100 to-purple-200 min-h-screen">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentScreen('module')} className="text-purple-600 text-2xl mr-3">←</button>
          <h2 className="text-2xl font-bold text-purple-800">3 Jars Challenge</h2>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🏺</div>
          <p className="text-lg text-purple-700">Divide your $9 allowance!</p>
          <p className="text-xl font-bold text-green-600">Money left: ${allowance}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-200 p-4 rounded-2xl border-4 border-blue-300 text-center">
            <div className="text-3xl mb-2">💸</div>
            <h3 className="font-bold text-blue-800 mb-2">SPEND</h3>
            <p className="text-2xl font-bold text-blue-700 mb-3">${jars.spend}</p>
            <button
              onClick={() => addToJar('spend', 1)}
              disabled={allowance < 1}
              className="bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300 text-white px-3 py-1 rounded-xl mb-2 w-full"
            >
              +$1
            </button>
            <button
              onClick={() => resetJar('spend')}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-xl text-xs w-full"
            >
              Reset
            </button>
          </div>

          <div className="bg-green-200 p-4 rounded-2xl border-4 border-green-300 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-bold text-green-800 mb-2">SAVE</h3>
            <p className="text-2xl font-bold text-green-700 mb-3">${jars.save}</p>
            <button
              onClick={() => addToJar('save', 1)}
              disabled={allowance < 1}
              className="bg-green-400 hover:bg-green-500 disabled:bg-gray-300 text-white px-3 py-1 rounded-xl mb-2 w-full"
            >
              +$1
            </button>
            <button
              onClick={() => resetJar('save')}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-xl text-xs w-full"
            >
              Reset
            </button>
          </div>

          <div className="bg-pink-200 p-4 rounded-2xl border-4 border-pink-300 text-center">
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="font-bold text-pink-800 mb-2">SHARE</h3>
            <p className="text-2xl font-bold text-pink-700 mb-3">${jars.share}</p>
            <button
              onClick={() => addToJar('share', 1)}
              disabled={allowance < 1}
              className="bg-pink-400 hover:bg-pink-500 disabled:bg-gray-300 text-white px-3 py-1 rounded-xl mb-2 w-full"
            >
              +$1
            </button>
            <button
              onClick={() => resetJar('share')}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-xl text-xs w-full"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-4">
          <h4 className="font-bold text-purple-800 mb-2">💡 Smart Tip</h4>
          <p className="text-purple-700">Try to put equal amounts in each jar for balanced money habits!</p>
        </div>

        {isComplete && (
          <div className="text-center">
            <div className="text-6xl mb-2">🎉</div>
            <p className="text-xl font-bold text-green-600 mb-4">Great budgeting!</p>
            <button
              onClick={() => {
                const newProgress = {
                  ...userProgress,
                  totalStars: userProgress.totalStars + 25
                };
                saveProgress(newProgress);
                setCurrentScreen('module');
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-bold py-3 px-6 rounded-2xl text-lg"
            >
              ⭐ Collect 25 Stars!
            </button>
          </div>
        )}
      </div>
    );
  };

  const SavingsTracker = () => {
    const progress = (userProgress.savingsGoal.current / userProgress.savingsGoal.target) * 100;
    
    return (
      <div className="p-4 bg-gradient-to-b from-green-100 to-green-200 min-h-screen">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentScreen('home')} className="text-green-600 text-2xl mr-3">←</button>
          <h2 className="text-2xl font-bold text-green-800">Savings Goal Tracker</h2>
        </div>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">My Goal: {userProgress.savingsGoal.item}</h3>
          <p className="text-lg text-green-700">${userProgress.savingsGoal.current} / ${userProgress.savingsGoal.target}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6">
          <div className="w-full bg-gray-200 rounded-full h-8 mb-4">
            <div 
              className="bg-green-500 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500"
              style={{ width: `${Math.max(progress, 10)}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>
          
          <div className="text-center">
            {progress < 100 ? (
              <p className="text-lg text-green-700">Keep saving! You're doing great! 💪</p>
            ) : (
              <div>
                <p className="text-xl font-bold text-green-600 mb-2">🎉 Goal Reached!</p>
                <p className="text-lg text-green-700">You're a savings superstar!</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              const newProgress = {
                ...userProgress,
                savingsGoal: {
                  ...userProgress.savingsGoal,
                  current: Math.min(userProgress.savingsGoal.current + 1, userProgress.savingsGoal.target)
                }
              };
              saveProgress(newProgress);
            }}
            className="w-full bg-green-400 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-2xl text-lg"
          >
            💰 Add $1 to Savings
          </button>
          
          <button
            onClick={() => {
              const newProgress = {
                ...userProgress,
                savingsGoal: {
                  ...userProgress.savingsGoal,
                  current: Math.min(userProgress.savingsGoal.current + 5, userProgress.savingsGoal.target)
                }
              };
              saveProgress(newProgress);
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg"
          >
            💵 Add $5 to Savings
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="text-4xl mb-2">🌱</div>
          <p className="text-green-700">Watch your money tree grow as you save!</p>
        </div>
      </div>
    );
  };

  const ModuleScreen = () => (
    <div className="p-4 bg-gradient-to-b from-purple-100 to-purple-200 min-h-screen">
      <div className="flex items-center mb-6">
        <button onClick={() => setCurrentScreen('home')} className="text-purple-600 text-2xl mr-3">←</button>
        <h2 className="text-2xl font-bold text-purple-800">{selectedModule.title}</h2>
      </div>

      <div className="text-center mb-6">
        <div className="text-8xl mb-4">{selectedModule.icon}</div>
        <p className="text-lg text-purple-700">Learn about {selectedModule.title.toLowerCase()}!</p>
      </div>

      <div className="space-y-4 mb-8">
        {selectedModule.lessons.map((lesson, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentScreen('lesson');
              setGameState({ currentLesson: lesson, moduleId: selectedModule.id });
            }}
            className="w-full bg-white rounded-2xl p-4 border-4 border-purple-200 hover:bg-purple-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-2xl mr-3">📚</div>
                <h3 className="font-bold text-purple-800">{lesson}</h3>
              </div>
              <ChevronRight className="text-purple-600" />
            </div>
          </button>
        ))}
      </div>

      {/* Module-specific games */}
      {selectedModule.id === 'basics' && (
        <button
          onClick={() => setCurrentScreen('needsVsWantsGame')}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-lg mb-4"
        >
          🎮 Play Needs vs Wants Game!
        </button>
      )}

      {selectedModule.id === 'saving' && (
        <button
          onClick={() => setCurrentScreen('savingsTreeGame')}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg mb-4"
        >
          🌳 Play Money Tree Game!
        </button>
      )}

      {selectedModule.id === 'spending' && (
        <button
          onClick={() => setCurrentScreen('shoppingGame')}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl text-lg mb-4"
        >
          🛍️ Play Shopping Game!
        </button>
      )}

      {selectedModule.id === 'budgeting' && (
        <button
          onClick={() => setCurrentScreen('jarsGame')}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-2xl text-lg mb-4"
        >
          🏺 Play 3 Jars Game!
        </button>
      )}

      <button
        onClick={() => {
          const newProgress = {
            ...userProgress,
            completedModules: [...new Set([...userProgress.completedModules, selectedModule.id])],
            totalStars: userProgress.totalStars + 10
          };
          saveProgress(newProgress);
          setCurrentScreen('home');
        }}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-800 font-bold py-4 px-6 rounded-2xl text-lg"
      >
        ✅ Complete Module (+10 Stars)
      </button>
    </div>
  );

  const HomeScreen = () => (
    <div className="p-4 bg-gradient-to-b from-yellow-100 to-orange-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-orange-800 mb-2">💰 MoneyQuest</h1>
        <div className="flex items-center justify-center space-x-4 text-lg">
          <div className="flex items-center bg-yellow-300 px-3 py-1 rounded-full">
            <Star className="w-5 h-5 text-yellow-600 mr-1" />
            <span className="font-bold text-yellow-800">{userProgress.totalStars}</span>
          </div>
          <div className="flex items-center bg-blue-300 px-3 py-1 rounded-full">
            <Trophy className="w-5 h-5 text-blue-600 mr-1" />
            <span className="font-bold text-blue-800">Level {userProgress.currentLevel}</span>
          </div>
        </div>
      </div>

      {/* Character Guide */}
      <div className="bg-white rounded-2xl p-4 mb-6 border-4 border-orange-200">
        <div className="flex items-center">
          <div className="text-4xl mr-4">🦸‍♂️</div>
          <div>
            <h3 className="font-bold text-orange-800">Money Hero says:</h3>
            <p className="text-orange-700">"Great job learning about money! Keep going!"</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setCurrentScreen('savings')}
          className="bg-green-400 hover:bg-green-500 text-white p-4 rounded-2xl text-center font-bold"
        >
          <PiggyBank className="w-8 h-8 mx-auto mb-2" />
          Savings Goal
        </button>
        <button className="bg-purple-400 hover:bg-purple-500 text-white p-4 rounded-2xl text-center font-bold">
          <Target className="w-8 h-8 mx-auto mb-2" />
          Daily Challenge
        </button>
      </div>

      {/* Learning Modules */}
      <h2 className="text-xl font-bold text-orange-800 mb-4">📚 Learning Adventures</h2>
      <div className="space-y-3 mb-6">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => {
              setSelectedModule(module);
              setCurrentScreen('module');
            }}
            className={`w-full ${module.color} hover:opacity-90 text-white p-4 rounded-2xl flex items-center justify-between font-bold`}
          >
            <div className="flex items-center">
              <div className="text-3xl mr-4">{module.icon}</div>
              <div className="text-left">
                <h3 className="text-lg">{module.title}</h3>
                <p className="text-sm opacity-90">{module.lessons.length} lessons</p>
              </div>
            </div>
            <div className="flex items-center">
              {module.completed ? (
                <CheckCircle className="w-6 h-6 text-green-200" />
              ) : (
                <Circle className="w-6 h-6 text-white" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Master Badge */}
      {userProgress.completedModules.length === modules.length && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-2xl text-center border-4 border-yellow-300">
          <div className="text-6xl mb-2">🏆</div>
          <h3 className="text-xl font-bold text-white mb-2">Money Master Badge Earned!</h3>
          <p className="text-yellow-100">You've completed all modules! You're a money expert!</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'module' && <ModuleScreen />}
      {currentScreen === 'lesson' && <LessonDetailScreen lesson={gameState.currentLesson} moduleId={gameState.moduleId} />}
      {currentScreen === 'needsVsWantsGame' && <NeedsVsWantsGame />}
      {currentScreen === 'savingsTreeGame' && <SavingsTreeGame />}
      {currentScreen === 'shoppingGame' && <ShoppingGame />}
      {currentScreen === 'jarsGame' && <JarsGame />}
      {currentScreen === 'savings' && <SavingsTracker />}
    </div>
  );
};

export default Moneyquest;