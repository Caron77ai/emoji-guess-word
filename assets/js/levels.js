// assets/js/levels.js
class LevelManager {
    constructor(game) {
      this.game = game;
      this.currentDifficulty = '全部'; // 默认显示全部关卡
      this.difficulties = ['全部', '初级', '中级', '高级'];
    }
    
    // 获取当前难度的所有关卡
    getLevelsByDifficulty(difficulty) {
      if (difficulty === '全部') {
        return this.game.idioms;
      }
      return this.game.idioms.filter(idiom => idiom.difficulty === difficulty);
    }
    
    // 获取当前难度的关卡数量
    getLevelCountByDifficulty(difficulty) {
      return this.getLevelsByDifficulty(difficulty).length;
    }
    
    // 获取已完成的关卡数量
    getCompletedLevelCount(difficulty) {
      const currentLevel = this.game.currentLevel;
      let count = 0;
      
      this.getLevelsByDifficulty(difficulty).forEach(idiom => {
        if (idiom.id < currentLevel) {
          count++;
        }
      });
      
      return count;
    }
    
    // 切换难度
    switchDifficulty(difficulty) {
      if (this.difficulties.includes(difficulty)) {
        this.currentDifficulty = difficulty;
        return true;
      }
      return false;
    }
    
    // 获取关卡状态（已完成、当前、锁定）
    getLevelStatus(levelId) {
      if (levelId < this.game.currentLevel) {
        return 'completed';
      } else if (levelId === this.game.currentLevel) {
        return 'current';
      } else {
        return 'locked';
      }
    }
    
    // 渲染关卡选择界面
    renderLevelSelection(container) {
      // 获取所有关卡，按ID排序
      const allLevels = this.game.idioms.sort((a, b) => a.id - b.id);
      
      // 根据当前难度过滤关卡
      let levels = allLevels;
      if (this.currentDifficulty !== '全部') {
        levels = allLevels.filter(level => level.difficulty === this.currentDifficulty);
      }
      
      container.innerHTML = '';
      
      levels.forEach(level => {
        const status = this.getLevelStatus(level.id);
        
        const levelElement = document.createElement('div');
        levelElement.className = `level-item level-${status}`;
        
        if (status === 'locked') {
          levelElement.innerHTML = `<i class="fas fa-lock text-gray-400 mr-1"></i> ${level.id}`;
        } else {
          levelElement.textContent = level.id;
          
          if (status === 'completed') {
            const checkElement = document.createElement('div');
            checkElement.className = 'level-check';
            checkElement.innerHTML = '<i class="fas fa-check"></i>';
            levelElement.appendChild(checkElement);
          }
        }
        
        // 添加点击事件
        if (status !== 'locked') {
          levelElement.addEventListener('click', () => {
            localStorage.setItem('selectedLevel', level.id);
            window.location.href = 'game.html';
          });
        } else {
          levelElement.addEventListener('click', () => {
            alert('此关卡尚未解锁，请先完成前面的关卡！');
          });
        }
        
        container.appendChild(levelElement);
      });
    }
  }
  
  // 如果在Node.js环境中，导出类
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LevelManager };
  }