// assets/js/game.js
class EmojiIdiomGame {
    constructor() {
      this.currentLevel = 1;
      this.score = 0;
      this.coins = 100;
      this.timer = null;
      this.timeLeft = 120; // 秒
      this.idioms = [];
      this.loadGame();
    }
    
    // 加载游戏数据
    loadGame() {
      // 从localStorage加载游戏进度
      const savedGame = localStorage.getItem('emojiIdiomGame');
      if (savedGame) {
        const gameData = JSON.parse(savedGame);
        this.currentLevel = gameData.currentLevel || 1;
        this.score = gameData.score || 0;
        this.coins = gameData.coins || 100;
      }
      
      // 加载成语数据
      this.loadIdioms();
    }
    
    // 加载成语数据
    loadIdioms() {
      // 如果在浏览器环境中，idioms变量已经在全局作用域中
      if (typeof idioms !== 'undefined') {
        this.idioms = idioms;
      } else {
        console.error('成语数据未找到');
      }
    }
    
    // 保存游戏进度
    saveGame() {
      const gameData = {
        currentLevel: this.currentLevel,
        score: this.score,
        coins: this.coins
      };
      localStorage.setItem('emojiIdiomGame', JSON.stringify(gameData));
    }
    
    // 开始当前关卡
    startLevel(levelId) {
      // 使用传入的levelId，如果没有则使用当前关卡
      const targetLevelId = levelId ? parseInt(levelId) : this.currentLevel;
      console.log('开始关卡:', targetLevelId);
      
      const currentIdiom = this.getIdiomByLevel(targetLevelId);
      
      if (!currentIdiom) {
        console.error('找不到关卡的成语:', targetLevelId);
        return false;
      }
      
      // 停止之前的计时器
      this.stopTimer();
      
      // 重置时间
      this.timeLeft = 120;
      
      // 开始计时
      this.startTimer();
      
      return currentIdiom;
    }
    
    // 根据关卡获取成语
    getIdiomByLevel(level) {
      // 确保level是数字
      const levelId = parseInt(level);
      console.log('查找关卡ID:', levelId);
      console.log('可用成语数量:', this.idioms.length);
      
      // 查找匹配ID的成语
      const idiom = this.idioms.find(item => item.id === levelId);
      
      if (!idiom) {
        console.error('未找到ID为', levelId, '的成语');
        // 打印所有成语ID以便调试
        console.log('所有成语ID:', this.idioms.map(item => item.id));
      } else {
        console.log('找到成语:', idiom.idiom);
      }
      
      return idiom;
    }
    
    // 开始计时
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--;
        
        // 更新UI上的时间显示
        this.updateTimerDisplay();
        
        if (this.timeLeft <= 0) {
          this.stopTimer();
          this.handleTimeUp();
        }
      }, 1000);
    }
    
    // 停止计时
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
    
    // 更新计时器显示
    updateTimerDisplay() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      const timerElement = document.querySelector('.time-badge');
      if (timerElement) {
        timerElement.innerHTML = `<i class="far fa-clock mr-1"></i> ${timeString}`;
      }
    }
    
    // 处理时间用完的情况
    handleTimeUp() {
      alert('时间到！');
      // 可以在这里添加更多逻辑，比如显示失败页面
    }
    
    // 检查答案
    checkAnswer(answer) {
      // 获取当前选择的关卡ID
      const selectedLevel = localStorage.getItem('selectedLevel');
      const levelId = selectedLevel ? parseInt(selectedLevel) : this.currentLevel;
      
      const currentIdiom = this.getIdiomByLevel(levelId);
      
      if (!currentIdiom) {
        return false;
      }
      
      if (answer === currentIdiom.idiom) {
        // 答案正确
        this.stopTimer();
        this.calculateScore();
        
        // 如果当前关卡等于游戏进度，则更新进度
        if (levelId === this.currentLevel) {
          this.currentLevel++;
          this.saveGame();
        }
        
        // 关卡成功完成，显示成功界面
        this.showSuccessScreen();
        
        // 可以在这里添加一些奖励逻辑
        this.updatePlayerScore();
        
        // 延迟后进入下一关或返回关卡选择界面
        setTimeout(() => {
          // 可以选择自动进入下一关
          const nextLevelId = this.currentLevel;
          if (nextLevelId <= 102) {
            this.loadLevel(nextLevelId);
          } else {
            // 所有关卡都完成了，返回关卡选择界面
            window.location.href = 'levels.html';
          }
          
          // 或者显示一个选择界面，让玩家决定
          // this.showLevelCompleteOptions();
        }, 2000);
        
        return true;
      }
      return false;
    }
    
    // 计算得分
    calculateScore() {
      // 基础分数
      let baseScore = 100;
      
      // 根据剩余时间增加分数
      const timeBonus = Math.floor(this.timeLeft / 10);
      
      // 总分
      const totalScore = baseScore + timeBonus;
      
      this.score += totalScore;
      this.coins += Math.floor(totalScore / 10);
      
      return {
        baseScore,
        timeBonus,
        totalScore
      };
    }
    
    // 使用提示
    useHint() {
      if (this.coins >= 30) {
        this.coins -= 30;
        this.saveGame();
        return true;
      }
      return false;
    }
    
    // 获取提示
    getHint(answerBoxes) {
      // 获取当前选择的关卡ID
      const selectedLevel = localStorage.getItem('selectedLevel');
      const levelId = selectedLevel ? parseInt(selectedLevel) : this.currentLevel;
      
      const currentIdiom = this.getIdiomByLevel(levelId);
      
      if (!currentIdiom) {
        return null;
      }
      
      // 找到第一个空的答案框
      for (let i = 0; i < answerBoxes.length; i++) {
        if (!answerBoxes[i].textContent.trim()) {
          return {
            position: i,
            character: currentIdiom.idiom[i]
          };
        }
      }
      
      return null;
    }
    
    // 显示成功界面
    showSuccessScreen() {
      // 实现显示成功界面的逻辑
    }
    
    // 更新玩家得分
    updatePlayerScore() {
      // 实现更新玩家得分的逻辑
    }
    
    // 加载关卡
    loadLevel(levelId) {
      // 根据关卡ID获取对应的成语数据
      const levelData = this.getLevelData(levelId);
      
      if (!levelData) {
        console.error(`关卡 ${levelId} 的数据不存在`);
        return;
      }
      
      // 设置当前游戏状态
      this.currentGameState = {
        levelId: levelId,
        idiom: levelData.idiom,
        emojis: levelData.emojis,
        hint: levelData.hint,
        attempts: 0,
        maxAttempts: 5,  // 最大尝试次数
        completed: false
      };
      
      // 更新UI显示
      this.updateGameUI();
      
      // 可能需要重置一些游戏状态
      this.resetGameState();
    }
    
    // 获取关卡数据的函数
    getLevelData(levelId) {
      // 这里需要根据你的数据结构来实现
      // 假设idioms是一个包含所有成语数据的数组
      return this.idioms.find(item => item.id === levelId);
    }
    
    // 更新游戏UI
    updateGameUI() {
      // 实现更新游戏UI的逻辑
    }
    
    // 重置游戏状态
    resetGameState() {
      // 实现重置游戏状态的逻辑
    }
  }
  
  // 如果在Node.js环境中，导出类
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmojiIdiomGame };
  }

// 游戏初始化函数
function initGame() {
    // 获取当前应该玩的关卡
    const currentLevel = getCurrentLevel();
    
    // 从URL参数中获取指定的关卡ID（如果有）
    const urlParams = new URLSearchParams(window.location.search);
    const levelParam = urlParams.get('level');
    
    // 如果URL中指定了关卡，并且该关卡已解锁，则加载指定关卡
    // 否则加载当前应该玩的关卡
    let levelToLoad = currentLevel;
    
    if (levelParam) {
        const requestedLevel = parseInt(levelParam);
        // 检查请求的关卡是否已解锁
        if (isLevelUnlocked(requestedLevel)) {
            levelToLoad = requestedLevel;
        } else {
            // 如果请求的关卡未解锁，显示提示
            showMessage('该关卡尚未解锁，将加载当前关卡');
        }
    }
    
    // 加载对应关卡的数据
    loadLevel(levelToLoad);
}

// 获取当前关卡
function getCurrentLevel() {
    // 从localStorage读取当前关卡
    const savedLevel = localStorage.getItem('emojiIdiomCurrentLevel');
    if (savedLevel) {
        return parseInt(savedLevel);
    }
    
    // 如果没有保存的当前关卡，则根据已完成的关卡计算
    const completedLevels = getCompletedLevels();
    if (completedLevels.length > 0) {
        // 当前关卡是最后一个已完成关卡的下一关
        const maxCompletedLevel = Math.max(...completedLevels);
        return maxCompletedLevel + 1;
    }
    
    // 如果没有已完成的关卡，则从第一关开始
    return 1;
}

// 获取已完成的关卡
function getCompletedLevels() {
    const completedLevels = [];
    
    // 尝试读取新格式的进度数据
    const progressData = localStorage.getItem('emojiIdiomProgress');
    if (progressData) {
        try {
            const progress = JSON.parse(progressData);
            if (progress && typeof progress === 'object') {
                if (Array.isArray(progress.easy)) completedLevels.push(...progress.easy);
                if (Array.isArray(progress.medium)) completedLevels.push(...progress.medium);
                if (Array.isArray(progress.hard)) completedLevels.push(...progress.hard);
            }
        } catch (e) {
            console.error('解析进度数据失败:', e);
        }
    }
    
    // 尝试读取旧格式的进度数据
    if (completedLevels.length === 0) {
        const oldProgress = localStorage.getItem('emojiIdiomGame');
        if (oldProgress) {
            try {
                const progress = JSON.parse(oldProgress);
                if (progress && typeof progress === 'object') {
                    Object.values(progress).forEach(arr => {
                        if (Array.isArray(arr)) completedLevels.push(...arr);
                    });
                }
            } catch (e) {
                console.error('解析旧格式进度数据失败:', e);
            }
        }
        
        const oldCompletedLevels = localStorage.getItem('completedLevels');
        if (oldCompletedLevels) {
            try {
                const levels = JSON.parse(oldCompletedLevels);
                if (Array.isArray(levels)) {
                    completedLevels.push(...levels);
                }
            } catch (e) {
                console.error('解析旧格式完成关卡数据失败:', e);
            }
        }
    }
    
    return completedLevels;
}

// 检查关卡是否已解锁
function isLevelUnlocked(levelId) {
    // 第一关默认解锁
    if (levelId === 1) return true;
    
    // 获取已完成的关卡
    const completedLevels = getCompletedLevels();
    
    // 如果前一关已完成，则当前关卡解锁
    return completedLevels.includes(levelId - 1);
}

// 完成关卡
function completeLevel(levelId) {
    // 获取关卡所属的难度
    const difficulty = getLevelDifficulty(levelId);
    
    // 从localStorage读取进度数据
    let progress = {
        easy: [],
        medium: [],
        hard: []
    };
    
    const progressData = localStorage.getItem('emojiIdiomProgress');
    if (progressData) {
        try {
            const savedProgress = JSON.parse(progressData);
            if (savedProgress && typeof savedProgress === 'object') {
                if (Array.isArray(savedProgress.easy)) progress.easy = savedProgress.easy;
                if (Array.isArray(savedProgress.medium)) progress.medium = savedProgress.medium;
                if (Array.isArray(savedProgress.hard)) progress.hard = savedProgress.hard;
            }
        } catch (e) {
            console.error('解析进度数据失败:', e);
        }
    }
    
    // 如果关卡尚未完成，添加到已完成列表
    if (!progress[difficulty].includes(levelId)) {
        progress[difficulty].push(levelId);
        
        // 保存进度
        localStorage.setItem('emojiIdiomProgress', JSON.stringify(progress));
        
        // 更新当前关卡为下一关
        const nextLevel = levelId + 1;
        localStorage.setItem('emojiIdiomCurrentLevel', nextLevel.toString());
        
        return true;
    }
    
    return false;
}

// 获取关卡所属的难度
function getLevelDifficulty(levelId) {
    if (levelId >= 1 && levelId <= 33) {
        return 'easy';
    } else if (levelId >= 34 && levelId <= 66) {
        return 'medium';
    } else if (levelId >= 67 && levelId <= 102) {
        return 'hard';
    }
    return 'easy'; // 默认返回初级
}

// 当页面加载完成时初始化游戏
document.addEventListener('DOMContentLoaded', function() {
    // 确保levelsManager已经初始化
    if (typeof levelsManager === 'undefined') {
        // 如果levelsManager未定义，可能需要等待它加载
        console.error('levelsManager未定义，请确保levels.js已正确加载');
        return;
    }
    
    // 初始化游戏
    initGame();
    
    // 绑定UI事件
    bindGameEvents();
});

// 在游戏中完成关卡时调用
function completeCurrentLevel() {
    const levelId = getCurrentLevelId(); // 获取当前关卡ID
    
    if (window.levelsManager) {
        if (levelsManager.completeLevel(levelId)) {
            // 关卡成功完成，显示成功界面
            showSuccessScreen();
            
            // 可以在这里添加一些奖励逻辑
            updatePlayerScore();
            
            // 延迟后进入下一关或返回关卡选择界面
            setTimeout(() => {
                // 可以选择自动进入下一关
                const nextLevelId = levelsManager.currentLevel;
                if (nextLevelId <= 102) {
                    loadLevel(nextLevelId);
                } else {
                    // 所有关卡都完成了，返回关卡选择界面
                    window.location.href = 'levels.html';
                }
            }, 2000);
        } else {
            // 关卡已完成过或不是当前关卡
            showMessage('这关已经完成过了！');
        }
    } else {
        console.error('levelsManager未定义，请确保levels.js已正确加载');
    }
}