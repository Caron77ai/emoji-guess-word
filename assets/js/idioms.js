// 成语数据
const idioms = [
    {
        id: 1,
        difficulty: "初级难度",
        emojis: ["🐱", "🐟", "🔥", "🍜"],
        answer: "猫鼠同眠",
        points: 100,
        reward: 20
    },
    {
        id: 2,
        difficulty: "初级难度",
        emojis: ["👁️", "👁️", "👄", "👁️"],
        answer: "眉目传情",
        points: 100,
        reward: 20
    },
    {
        id: 3,
        difficulty: "初级难度",
        emojis: ["🧍", "🌳", "⏱️", "🐇"],
        answer: "守株待兔",
        points: 100,
        reward: 20
    },
    {
        id: 4,
        difficulty: "中级难度",
        emojis: ["🌊", "🐉", "🚪", "🏠"],
        answer: "水到渠成",
        points: 150,
        reward: 30
    },
    {
        id: 5,
        difficulty: "中级难度",
        emojis: ["🐎", "🏃", "🔥", "💨"],
        answer: "马到成功",
        points: 150,
        reward: 30
    }
    // 可以继续添加更多成语
];

// 确保idioms变量在全局作用域中可用
window.idioms = idioms; 