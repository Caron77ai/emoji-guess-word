const idioms = [
    // ========== easy (1-33) ==========
    {
      id: 1,
      difficulty: "easy",
      emojis: ["🧍", "🌳", "⏳", "🐇"],
      answer: "守株待兔",
      points: 100,
      reward: 20,
      hint: "比喻死守狭隘经验，希望不劳而获",
      category: "动物"
    },
    {
      id: 2,
      difficulty: "easy",
      emojis: ["🙈", "👂", "⬇️", "🔔"],
      answer: "掩耳盗铃",
      points: 100,
      reward: 20,
      hint: "比喻自己欺骗自己",
      category: "行为"
    },
    {
      id: 3,
      difficulty: "easy",
      emojis: ["👫", "🐂", "🎻", "🎵"],
      answer: "对牛弹琴",
      points: 100,
      reward: 20,
      hint: "比喻对不懂道理的人讲道理，白费口舌",
      category: "动物"
    },
    {
      id: 4,
      difficulty: "easy",
      emojis: ["🕳️", "⬇️", "🌿", "🐸"],
      answer: "井底之蛙",
      points: 100,
      reward: 20,
      hint: "比喻见识短浅的人",
      category: "动物"
    },
    {
      id: 5,
      difficulty: "easy",
      emojis: ["🍃", "👨", "❤️", "🐉"],
      answer: "叶公好龙",
      points: 100,
      reward: 20,
      hint: "比喻口头上说喜欢某事物，实际上却害怕它",
      category: "人物"
    },
    {
      id: 6,
      difficulty: "easy",
      emojis: ["☠️", "🐑", "🕸", "🏢"],
      answer: "亡羊补牢",
      points: 100,
      reward: 20,
      hint: "比喻出了问题以后想办法补救，可以防止继续受损失",
      category: "动物"
    },
    {
      id: 7,
      difficulty: "easy",
      emojis: ["🎨", "🐉", "✏️", "👁️"],
      answer: "画龙点睛",
      points: 100,
      reward: 20,
      hint: "比喻在关键处加上精彩的一笔，使作品更加生动有力",
      category: "艺术"
    },
    {
      id: 8,
      difficulty: "easy",
      emojis: ["👀", "🍑", "🛑", "🥵"],
      answer: "望梅止渴",
      points: 100,
      reward: 20,
      hint: "比喻用空想安慰自己",
      category: "植物"
    },
    {
      id: 9,
      difficulty: "easy",
      emojis: ["👴", "❌", "🐎", "🔄"],
      answer: "塞翁失马",
      points: 100,
      reward: 20,
      hint: "比喻一时虽然受到损失，也许反而因此能得到好处",
      category: "人物"
    },
    {
      id: 10,
      difficulty: "easy",
      emojis: ["🎨", "🍪", "🔄", "🍽️"],
      answer: "画饼充饥",
      points: 100,
      reward: 20,
      hint: "比喻用空想来安慰自己",
      category: "食物"
    },
    {
      id: 11,
      difficulty: "easy",
      emojis: ["🦊", "🎭", "🐯", "💪"],
      answer: "狐假虎威",
      points: 100,
      reward: 20,
      hint: "比喻依仗他人权势",
      category: "动物"
    },
    {
      id: 12,
      difficulty: "easy",
      emojis: ["🐜", "💪", "⛰️", "↕️"],
      answer: "蚂蚁撼树",
      points: 100,
      reward: 20,
      hint: "比喻力量太小，不自量力",
      category: "动物"
    },
    {
      id: 13,
      difficulty: "easy",
      emojis: ["🐝", "🐜", "💪", "📚"],
      answer: "蚂蚁搬家",
      points: 100,
      reward: 20,
      hint: "比喻虽然力量小，但是团结一致就能成功",
      category: "动物"
    },
    {
      id: 14,
      difficulty: "easy",
      emojis: ["🐝", "🦋", "🌸", "💃"],
      answer: "蝶舞蜂飞",
      points: 100,
      reward: 20,
      hint: "形容春天景象热闹繁荣",
      category: "动物"
    },
    {
      id: 15,
      difficulty: "easy",
      emojis: ["🐎", "👂", "🌊", "💨"],
      answer: "马耳东风",
      points: 100,
      reward: 20,
      hint: "比喻听了也不在意，等于没听见",
      category: "动物"
    },
    {
      id: 16,
      difficulty: "easy",
      emojis: ["🐔", "🐕", "🚫", "🕊️"],
      answer: "鸡犬不宁",
      points: 100,
      reward: 20,
      hint: "形容骚扰得厉害，连鸡狗都不得安宁",
      category: "动物"
    },
    {
      id: 17,
      difficulty: "easy",
      emojis: ["👂", "🐓", "💃", "🕺"],
      answer: "闻鸡起舞",
      points: 100,
      reward: 20,
      hint: "比喻有志者及时奋发",
      category: "行为"
    },
    {
      id: 18,
      difficulty: "easy",
      emojis: ["👐", "⬆️", "💎", "🔮"],
      answer: "掌上明珠",
      points: 100,
      reward: 20,
      hint: "比喻深受宠爱的子女",
      category: "物品"
    },
    {
      id: 19,
      difficulty: "easy",
      emojis: ["🥃", "🏹", "🐍", "👻"],
      answer: "杯弓蛇影",
      points: 100,
      reward: 20,
      hint: "比喻疑神疑鬼，自相惊扰",
      category: "物品"
    },
    {
      id: 20,
      difficulty: "easy",
      emojis: ["👉", "🦌", "✅", "🐎"],
      answer: "指鹿为马",
      points: 100,
      reward: 20,
      hint: "比喻故意颠倒黑白，混淆是非",
      category: "动物"
    },
    {
      id: 21,
      difficulty: "easy",
      emojis: ["🫁", "✅", "🎋", "🎋"],
      answer: "胸有成竹",
      points: 100,
      reward: 20,
      hint: "比喻做事之前已经有了通盘的考虑和把握",
      category: "植物"
    },
    {
      id: 22,
      difficulty: "easy",
      emojis: ["👐", "🌱", "🆘", "📈"],
      answer: "拔苗助长",
      points: 100,
      reward: 20,
      hint: "比喻违反事物发展规律",
      category: "农业"
    },
    {
      id: 23,
      difficulty: "easy",
      emojis: ["🐟", "👀", "🌀", "🔮"],
      answer: "鱼目混珠",
      points: 100,
      reward: 20,
      hint: "比喻用假的冒充真的",
      category: "物品"
    },
    {
      id: 24,
      difficulty: "easy",
      emojis: ["🔪", "🚣", "🙏", "⚔️"],
      answer: "刻舟求剑",
      points: 100,
      reward: 20,
      hint: "比喻拘泥成法不知变通",
      category: "行为"
    },
    {
      id: 25,
      difficulty: "easy",
      emojis: ["👀", "🌸", "🛑", "💧"],
      answer: "望梅止渴",
      points: 100,
      reward: 20,
      hint: "比喻用空想安慰自己",
      category: "植物"
    },
    {
      id: 26,
      difficulty: "easy",
      emojis: ["🙈", "👨", "🤲", "🐘"],
      answer: "盲人摸象",
      points: 100,
      reward: 20,
      hint: "比喻对事物只了解片面，不见全貌",
      category: "行为"
    },
    {
      id: 27,
      difficulty: "easy",
      emojis: ["😊", "➡️", "🙈", "🔪"],
      answer: "笑里藏刀",
      points: 100,
      reward: 20,
      hint: "比喻表面和善，内心却怀有恶意",
      category: "行为"
    },
    {
      id: 28,
      difficulty: "easy",
      emojis: ["🌱", "🔥", "🌸", "👐"],
      answer: "春暖花开",
      points: 100,
      reward: 20,
      hint: "形容春景优美，气候宜人",
      category: "自然"
    },
    {
      id: 29,
      difficulty: "easy",
      emojis: ["🎭", "🌙", "💐", "🌊"],
      answer: "月下花前",
      points: 100,
      reward: 20,
      hint: "形容优美浪漫的环境",
      category: "自然"
    },
    {
      id: 30,
      difficulty: "easy",
      emojis: ["🌳", "🌳", "🐦", "💬"],
      answer: "林林总总",
      points: 100,
      reward: 20,
      hint: "形容事物繁多，各种各样",
      category: "自然"
    },
    {
      id: 31,
      difficulty: "easy",
      emojis: ["🌊", "🌊", "✈️", "⛵"],
      answer: "浪遏飞舟",
      points: 100,
      reward: 20,
      hint: "比喻局势险恶，前进受阻",
      category: "自然"
    },
    {
      id: 32,
      difficulty: "easy",
      emojis: ["🐎", "👂", "🌊", "💨"],
      answer: "马耳东风",
      points: 100,
      reward: 20,
      hint: "比喻听了也不在意，等于没听见",
      category: "动物"
    },
    {
      id: 33,
      difficulty: "easy",
      emojis: ["⚖️", "👣", "☁️", "🎋"],
      answer: "平步青云",
      points: 100,
      reward: 20,
      hint: "比喻突然升到很高的地位",
      category: "自然"
    },
    {
      id: 34,
      difficulty: "medium",
      emojis: ["✋", "🌈", "🧊", "💔"],
      answer: "五彩缤纷",
      points: 150,
      reward: 30,
      hint: "形容色彩繁多，十分绚丽",
      category: "自然"
    },
    {
      id: 35,
      difficulty: "medium",
      emojis: ["🌸", "👍", "🌕", "⭕"],
      answer: "花好月圆",
      points: 150,
      reward: 30,
      hint: "比喻美好圆满的生活",
      category: "自然"
    },
    {
      id: 36,
      difficulty: "medium",
      emojis: ["⛰️", "💍", "🌊", "✋"],
      answer: "山盟海誓",
      points: 150,
      reward: 30,
      hint: "指男女相爱时立下的誓言",
      category: "情感"
    },
    {
      id: 37,
      difficulty: "medium",
      emojis: ["🦟", "✈️", "👉", "💧"],
      answer: "蜻蜓点水",
      points: 150,
      reward: 20,
      hint: "比喻做事肤浅不深入",
      category: "动物"
    },
    {
      id: 38,
      difficulty: "medium",
      emojis: ["🦗", "💪", "🚗", "🛑"],
      answer: "螳臂当车",
      points: 150,
      reward: 20,
      hint: "比喻力量太小，不自量力",
      category: "动物"
    },
    {
      id: 41,
      difficulty: "medium",
      emojis: ["🐔", "🐕", "🚫", "🕊️"],
      answer: "鸡犬不宁",
      points: 100,
      reward: 20,
      hint: "形容骚扰得厉害，连鸡狗都不得安宁",
      category: "动物"
    },
    {
      id: 42,
      difficulty: "medium",
      emojis: ["🌊", "🏙️", "🐚", "🏯"],
      answer: "海市蜃楼",
      points: 100,
      reward: 20,
      hint: "比喻虚无缥缈的事物",
      category: "自然"
    },
    {
      id: 43,
      difficulty: "medium",
      emojis: ["🪞", "🌸", "🌊", "🌙"],
      answer: "镜花水月",
      points: 100,
      reward: 20,
      hint: "比喻虚幻的景象",
      category: "自然"
    },
    {
      id: 44,
      difficulty: "medium",
      emojis: ["🦢", "🧍", "🐔", "👥"],
      answer: "鹤立鸡群",
      points: 100,
      reward: 20,
      hint: "比喻一个人的才能或仪表在一群人里显得很突出",
      category: "动物"
    },
    {
      id: 45,
      difficulty: "medium",
      emojis: ["🐺", "🍽️", "🐯", "🔥"],
      answer: "狼吞虎咽",
      points: 100,
      reward: 20,
      hint: "形容吃东西又猛又急的样子",
      category: "行为"
    },
    {
      id: 46,
      difficulty: "medium",
      emojis: ["🚴", "🐯", "😰", "⬇️"],
      answer: "骑虎难下",
      points: 100,
      reward: 20,
      hint: "比喻事情中途遇到困难，但为形势所迫又无法中止",
      category: "行为"
    },
    {
      id: 47,
      difficulty: "medium",
      emojis: ["🌊", "🏊", "👀", "🐟"],
      answer: "浮光掠影",
      points: 100,
      reward: 20,
      hint: "比喻对事物观察不深入，印象不深刻",
      category: "自然"
    },
    {
      id: 48,
      difficulty: "medium",
      emojis: ["🐝", "🐜", "💪", "📚"],
      answer: "蚂蚁搬家",
      points: 100,
      reward: 20,
      hint: "比喻虽然力量小，但是团结一致就能成功",
      category: "动物"
    },
    {
      id: 49,
      difficulty: "medium",
      emojis: ["🌱", "🔥", "🌸", "👐"],
      answer: "春暖花开",
      points: 100,
      reward: 20,
      hint: "形容春景优美，气候宜人",
      category: "自然"
    },
    {
      id: 50,
      difficulty: "medium",
      emojis: ["🎭", "🌙", "💐", "🌊"],
      answer: "月下花前",
      points: 100,
      reward: 20,
      hint: "形容优美浪漫的环境",
      category: "自然"
    },
    {
      id: 51,
      difficulty: "medium",
      emojis: ["🌳", "🌳", "🐦", "💬"],
      answer: "林林总总",
      points: 100,
      reward: 20,
      hint: "形容事物繁多，各种各样",
      category: "自然"
    },
    {
      id: 52,
      difficulty: "medium",
      emojis: ["🌊", "🌊", "🚣", "⭐"],
      answer: "浪遏飞舟",
      points: 100,
      reward: 20,
      hint: "比喻局势险恶，前进受阻",
      category: "自然"
    },
    {
      id: 53,
      difficulty: "medium",
      emojis: ["🐎", "👂", "🌊", "💨"],
      answer: "马耳东风",
      points: 100,
      reward: 20,
      hint: "比喻听了也不在意，等于没听见",
      category: "动物"
    },
    {
      id: 54,
      difficulty: "medium",
      emojis: ["🪜", "🌥️", "🌈", "🎨"],
      answer: "五彩缤纷",
      points: 150,
      reward: 30,
      hint: "形容色彩繁多，十分绚丽",
      category: "自然"
    },
    {
      id: 55,
      difficulty: "medium",
      emojis: ["🌊", "⛰️", "🌅", "🎨"],
      answer: "山光水色",
      points: 150,
      reward: 30,
      hint: "形容自然景色优美",
      category: "自然"
    },
    {
      id: 56,
      difficulty: "medium",
      emojis: ["🌪️", "🌧️", "⚡", "⛈️"],
      answer: "风雨雷电",
      points: 150,
      reward: 30,
      hint: "形容自然界的各种天气现象",
      category: "自然"
    },
    {
      id: 58,
      difficulty: "medium",
      emojis: ["🐝", "🦋", "🌸", "💃"],
      answer: "蝶舞蜂飞",
      points: 100,
      reward: 20,
      hint: "形容春天景象热闹繁荣",
      category: "动物"
    },
    {
      id: 59,
      difficulty: "medium",
      emojis: ["🌊", "🌊", "🏃", "💨"],
      answer: "波涛汹涌",
      points: 150,
      reward: 30,
      hint: "形容海浪翻滚，气势磅礴",
      category: "自然"
    },
    {
      id: 60,
      difficulty: "medium",
      emojis: ["⛰️", "🗣️", "🌊", "💬"],
      answer: "山呼海应",
      points: 200,
      reward: 40,
      hint: "形容声势浩大，响应群众",
      category: "自然"
    },
    {
      id: 61,
      difficulty: "medium",
      emojis: ["🐉", "🔼", "🐯", "🦘"],
      answer: "龙腾虎跃",
      points: 150,
      reward: 30,
      hint: "形容生气勃勃、充满活力的景象",
      category: "动物"
    },
    {
      id: 62,
      difficulty: "medium",
      emojis: ["🌙", "🈵", "🌇", "🏯"],
      answer: "月满西楼",
      points: 200,
      reward: 40,
      hint: "形容月色美好的夜晚",
      category: "自然"
    },
    {
      id: 63,
      difficulty: "medium",
      emojis: ["🐔", "🐕", "🚫", "🕊️"],
      answer: "鸡犬不宁",
      points: 100,
      reward: 20,
      hint: "形容骚扰得厉害，连鸡狗都不得安宁",
      category: "动物"
    },
    {
      id: 64,
      difficulty: "medium",
      emojis: ["🌊", "🏙️", "🐚", "🏯"],
      answer: "海市蜃楼",
      points: 150,
      reward: 30,
      hint: "比喻虚无缥缈的事物",
      category: "自然"
    },
    {
      id: 65,
      difficulty: "medium",
      emojis: ["🪞", "🌸", "🌊", "🌙"],
      answer: "镜花水月",
      points: 200,
      reward: 40,
      hint: "比喻虚幻的景象",
      category: "自然"
    },
    {
      id: 66,
      difficulty: "medium",
      emojis: ["🦢", "🧍", "🐔", "👥"],
      answer: "鹤立鸡群",
      points: 150,
      reward: 30,
      hint: "比喻一个人的才能或仪表在一群人里显得很突出",
      category: "动物"
    },
    {
      id: 67,
      difficulty: "hard",
      emojis: ["🐺", "🍽️", "🐯", "🔥"],
      answer: "狼吞虎咽",
      points: 200,
      reward: 40,
      hint: "形容吃东西又猛又急的样子",
      category: "行为"
    },
    {
      id: 68,
      difficulty: "hard",
      emojis: ["🚴", "🐯", "😰", "⬇️"],
      answer: "骑虎难下",
      points: 200,
      reward: 40,
      hint: "比喻事情中途遇到困难，但为形势所迫又无法中止",
      category: "行为"
    },
    {
      id: 69,
      difficulty: "hard",
      emojis: ["🌊", "🏊", "👀", "🐟"],
      answer: "浮光掠影",
      points: 200,
      reward: 40,
      hint: "比喻对事物观察不深入，印象不深刻",
      category: "自然"
    },
    {
      id: 70,
      difficulty: "hard",
      emojis: ["🌱", "🔥", "🌸", "👐"],
      answer: "春暖花开",
      points: 150,
      reward: 30,
      hint: "形容春景优美，气候宜人",
      category: "自然"
    },
    {
      id: 71,
      difficulty: "hard",
      emojis: ["🎭", "🌙", "💐", "🌊"],
      answer: "月下花前",
      points: 200,
      reward: 40,
      hint: "形容优美浪漫的环境",
      category: "自然"
    },
    {
      id: 72,
      difficulty: "hard",
      emojis: ["🌳", "🌳", "🐦", "💬"],
      answer: "林林总总",
      points: 150,
      reward: 30,
      hint: "形容事物繁多，各种各样",
      category: "自然"
    },
    {
      id: 73,
      difficulty: "hard",
      emojis: ["🌊", "🌊", "🚣", "⭐"],
      answer: "浪遏飞舟",
      points: 200,
      reward: 40,
      hint: "比喻局势险恶，前进受阻",
      category: "自然"
    },
    {
      id: 74,
      difficulty: "hard",
      emojis: ["🐎", "👂", "🌊", "💨"],
      answer: "马耳东风",
      points: 100,
      reward: 20,
      hint: "比喻听了也不在意，等于没听见",
      category: "动物"
    },
    {
      id: 75,
      difficulty: "hard",
      emojis: ["🌙", "🌸", "🌧️", "💭"],
      answer: "花前月下",
      points: 150,
      reward: 30,
      hint: "形容优美的环境，常用来形容谈情说爱的场景",
      category: "自然"
    },
    {
      id: 76,
      difficulty: "hard",
      emojis: ["🎨", "🦢", "⬇️", "❄️"],
      answer: "雪泥鸿爪",
      points: 200,
      reward: 40,
      hint: "比喻往事遗留下的痕迹",
      category: "自然"
    },
    {
      id: 77,
      difficulty: "hard",
      emojis: ["🌊", "🏃", "🚫", "💤"],
      answer: "川流不息",
      points: 200,
      reward: 40,
      hint: "形容行人、车马等像水流一样连续不断",
      category: "自然"
    },
    {
      id: 78,
      difficulty: "hard",
      emojis: ["🌊", "🌊", "1️⃣", "🌾"],
      answer: "沧海一粟",
      points: 150,
      reward: 30,
      hint: "比喻非常渺小，微不足道",
      category: "自然"
    },
    {
      id: 79,
      difficulty: "hard",
      emojis: ["🛌", "🪵", "👅", "🫁"],
      answer: "卧薪尝胆",
      points: 200,
      reward: 40,
      hint: "比喻忍受艰难困苦，发奋图强",
      category: "历史"
    },
    {
      id: 80,
      difficulty: "hard",
      emojis: ["🌙", "📖", "✏️", "💡"],
      answer: "凿壁偷光",
      points: 200,
      reward: 40,
      hint: "形容勤学苦读",
      category: "行为"
    },
    {
      id: 81,
      difficulty: "hard",
      emojis: ["👉", "🎯", "👥", "🦅"],
      answer: "一箭双雕",
      points: 200,
      reward: 40,
      hint: "比喻一举两得",
      category: "行为"
    },
    {
      id: 82,
      difficulty: "hard",
      emojis: ["👂", "🐓", "💃", "🕺"],
      answer: "闻鸡起舞",
      points: 100,
      reward: 20,
      hint: "比喻有志者及时奋发",
      category: "行为"
    },
    {
      id: 83,
      difficulty: "hard",
      emojis: ["👂", "🐓", "💃", "🕺"],
      answer: "闻鸡起舞",
      points: 100,
      reward: 20,
      hint: "比喻有志者及时奋发",
      category: "行为"
    },
    {
      id: 84,
      difficulty: "hard",
      emojis: ["👐", "⬆️", "💎", "🔮"],
      answer: "掌上明珠",
      points: 100,
      reward: 20,
      hint: "比喻深受宠爱的子女",
      category: "物品"
    },
    {
      id: 85,
      difficulty: "hard",
      emojis: ["🥃", "🏹", "🐍", "👻"],
      answer: "杯弓蛇影",
      points: 150,
      reward: 30,
      hint: "比喻疑神疑鬼，自相惊扰",
      category: "物品"
    },
    {
      id: 86,
      difficulty: "hard",
      emojis: ["👉", "🦌", "✔️", "🐎"],
      answer: "指鹿为马",
      points: 200,
      reward: 40,
      hint: "比喻故意颠倒黑白，混淆是非",
      category: "动物"
    },
    {
      id: 87,
      difficulty: "hard",
      emojis: ["🫁", "✅", "🎋", "🎋"],
      answer: "胸有成竹",
      points: 200,
      reward: 40,
      hint: "比喻做事之前已经有了通盘的考虑和把握",
      category: "植物"
    },
    {
      id: 88,
      difficulty: "hard",
      emojis: ["🚴", "🐯", "😰", "⬇️"],
      answer: "骑虎难下",
      points: 200,
      reward: 40,
      hint: "比喻事情中途遇到困难，但为形势所迫又无法中止",
      category: "行为"
    },
    {
      id: 89,
      difficulty: "hard",
      emojis: ["🫁", "✅", "🎋", "🎋"],
      answer: "胸有成竹",
      points: 150,
      reward: 30,
      hint: "比喻做事之前已经有了通盘的考虑和把握",
      category: "植物"
    },
    {
      id: 90,
      difficulty: "hard",
      emojis: ["👫", "🐂", "🎻", "🎵"],
      answer: "对牛弹琴",
      points: 100,
      reward: 20,
      hint: "比喻对不懂道理的人讲道理，白费口舌",
      category: "动物"
    },
    {
      id: 91,
      difficulty: "hard",
      emojis: ["☠️", "🐑", "🧵", "🏢"],
      answer: "亡羊补牢",
      points: 150,
      reward: 30,
      hint: "比喻出了问题以后想办法补救，可以防止继续受损失",
      category: "动物"
    },
    {
      id: 92,
      difficulty: "hard",
      emojis: ["🎨", "🐉", "✏️", "👁️"],
      answer: "画龙点睛",
      points: 200,
      reward: 40,
      hint: "比喻在关键处加上精彩的一笔，使作品更加生动有力",
      category: "艺术"
    },
    {
      id: 93,
      difficulty: "hard",
      emojis: ["🙈", "👂", "🦹", "🔔"],
      answer: "掩耳盗铃",
      points: 100,
      reward: 20,
      hint: "比喻自欺欺人",
      category: "行为"
    },
    {
      id: 94,
      difficulty: "hard",
      emojis: ["🕳️", "⬇️", "🌀", "🐸"],
      answer: "井底之蛙",
      points: 150,
      reward: 30,
      hint: "比喻见识短浅的人",
      category: "动物"
    },
    {
      id: 96,
      difficulty: "hard",
      emojis: ["🍃", "👨", "❤️", "��"],
      answer: "叶公好龙",
      points: 200,
      reward: 40,
      hint: "比喻表面爱好某事物，实际并不真爱好",
      category: "人物"
    },
    {
      id: 97,
      difficulty: "hard",
      emojis: ["🐟", "👀", "🌀", "🔮"],
      answer: "鱼目混珠",
      points: 150,
      reward: 30,
      hint: "比喻用假的冒充真的",
      category: "物品"
    },
    {
      id: 98,
      difficulty: "hard",
      emojis: ["🔪", "🚣", "🙏", "⚔️"],
      answer: "刻舟求剑",
      points: 200,
      reward: 40,
      hint: "比喻拘泥成法不知变通",
      category: "行为"
    },
    {
      id: 99,
      difficulty: "hard",
      emojis: ["👀", "🌸", "🛑", "💧"],
      answer: "望梅止渴",
      points: 100,
      reward: 20,
      hint: "比喻用空想安慰自己",
      category: "植物"
    },
    {
      id: 100,
      difficulty: "hard",
      emojis: ["🙈", "👨", "🤲", "🐘"],
      answer: "盲人摸象",
      points: 200,
      reward: 40,
      hint: "比喻对事物只了解片面，不见全貌",
      category: "行为"
    },
    {
      id: 101,
      difficulty: "hard",
      emojis: ["😊", "➡️", "🙈", "🔪"],
      answer: "笑里藏刀",
      points: 200,
      reward: 40,
      hint: "比喻表面和善，内心却怀有恶意",
      category: "行为"
    },
    {
      id: 102,
      difficulty: "hard",
      emojis: ["🎨", "🐍", "➕", "🦶"],
      answer: "画蛇添足",
      points: 150,
      reward: 30,
      hint: "比喻做了多余的事，反而不恰当",
      category: "行为"
    }
  ];
  
  // 导出成语数据
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { idioms };
  } else {
    // 在浏览器环境中，将数据添加到全局作用域
    window.idioms = idioms;
  } 