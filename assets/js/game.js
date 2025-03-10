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
  }
  
  // 如果在Node.js环境中，导出类
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EmojiIdiomGame };
  }