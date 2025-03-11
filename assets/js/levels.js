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

document.addEventListener('DOMContentLoaded', function() {
    const difficultyTabs = document.getElementById('difficulty-tabs');
    const levelsContainer = document.getElementById('levels-container');
    const difficultyText = document.getElementById('difficulty-text');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');

    // 修改难度映射表
    const difficultyNames = {
        'easy': '初级',      // 修改为与idioms数据中一致的难度名称
        'medium': '中级',
        'hard': '高级'
    };

    // 从 localStorage 获取游戏进度
    const gameProgress = JSON.parse(localStorage.getItem('emojiIdiomGame') || '{}');
    
    // 修改根据难度过滤成语的函数
    function getIdiomsByDifficulty(difficulty) {
        // 根据关卡ID范围确定难度
        switch(difficulty) {
            case 'easy':
                return idioms.filter(idiom => idiom.id >= 1 && idiom.id <= 33);
            case 'medium':
                return idioms.filter(idiom => idiom.id >= 34 && idiom.id <= 66);
            case 'hard':
                return idioms.filter(idiom => idiom.id >= 67 && idiom.id <= 102);
            default:
                return [];
        }
    }

    // 更新关卡显示函数
    function updateLevels(difficulty) {
        const difficultyIdioms = getIdiomsByDifficulty(difficulty);
        const completedLevels = gameProgress[difficulty] || [];
        
        // 调试输出
        console.log('当前难度:', difficulty);
        console.log('过滤后的成语:', difficultyIdioms);
        
        // 更新进度显示
        const total = getDifficultyTotal(difficulty);
        const completed = completedLevels.length;
        
        if (progressText && progressBar) {
            progressText.textContent = `${completed}/${total}`;
            progressBar.style.width = `${(completed / total) * 100}%`;
        }
        
        // 更新难度文本
        if (difficultyText) {
            difficultyText.textContent = difficultyNames[difficulty];
        }

        // 清空并重新生成关卡格子
        if (levelsContainer) {
            levelsContainer.innerHTML = '';
            
            // 获取难度对应的起始ID
            const startId = getDifficultyStartId(difficulty);
            
            // 生成关卡格子
            for (let i = 0; i < getDifficultyTotal(difficulty); i++) {
                const levelId = startId + i;
                const levelNumber = i + 1;
                const isCompleted = completedLevels.includes(levelId);
                const isCurrentLevel = completedLevels.length === i;
                
                const levelDiv = document.createElement('div');
                levelDiv.className = `level-item ${
                    isCompleted ? 'level-completed' : 
                    isCurrentLevel ? 'level-current' : 
                    'level-locked'
                }`;
                
                if (isCompleted) {
                    levelDiv.innerHTML = `
                        ${levelNumber}
                        <div class="level-check">
                            <i class="fas fa-check"></i>
                        </div>
                    `;
                } else if (isCurrentLevel) {
                    levelDiv.textContent = levelNumber;
                } else {
                    levelDiv.innerHTML = `<i class="fas fa-lock text-gray-400 mr-1"></i> ${levelNumber}`;
                }
                
                // 添加点击事件
                if (isCurrentLevel || isCompleted) {
                    levelDiv.addEventListener('click', () => {
                        window.location.href = `game.html?level=${levelId}`;
                    });
                }
                
                levelsContainer.appendChild(levelDiv);
            }
        }
    }

    // 获取难度对应的起始ID
    function getDifficultyStartId(difficulty) {
        switch(difficulty) {
            case 'easy': return 1;
            case 'medium': return 34;
            case 'hard': return 67;
            default: return 1;
        }
    }

    // 获取难度对应的关卡总数
    function getDifficultyTotal(difficulty) {
        switch(difficulty) {
            case 'easy': return 33;    // 1-33
            case 'medium': return 33;  // 34-66
            case 'hard': return 36;    // 67-102
            default: return 0;
        }
    }

    // 添加难度切换事件
    if (difficultyTabs) {
        difficultyTabs.addEventListener('click', (e) => {
            const tab = e.target.closest('.difficulty-tab');
            if (!tab) return;
            
            // 更新选中状态
            document.querySelectorAll('.difficulty-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 更新关卡显示
            updateLevels(tab.dataset.difficulty);
        });
    }

    // 初始显示初级难度
    updateLevels('easy');
});

levelsManager.completeLevel('beginner', 1); // 完成初级第1关

const progress = levelsManager.progress;

const isUnlocked = levelsManager.progress[difficulty].highestUnlocked >= levelNumber;

// 关卡管理类
class LevelsManager {
    constructor() {
        // 初始化存储键
        this.STORAGE_KEYS = {
            PROGRESS: 'emojiIdiomProgress',  // 统一的进度存储键
            CURRENT_LEVEL: 'emojiIdiomCurrentLevel'  // 当前关卡存储键
        };
        
        // 难度范围定义
        this.difficultyRanges = {
            'easy': { start: 1, end: 33 },
            'medium': { start: 34, end: 66 },
            'hard': { start: 67, end: 102 }
        };
        
        // 难度名称映射
        this.difficultyNames = {
            'easy': '初级难度',
            'medium': '中级难度',
            'hard': '高级难度'
        };
        
        // 难度顺序
        this.difficultyOrder = ['easy', 'medium', 'hard'];
        
        // 迁移旧数据（如果存在）
        this.migrateOldData();
        
        // 加载用户进度
        this.progress = this.loadProgress();
        this.currentLevel = this.loadCurrentLevel();
    }
    
    // 迁移旧数据到新格式
    migrateOldData() {
        // 检查是否有旧格式的数据
        const oldProgress = localStorage.getItem('emojiIdiomGame');
        const oldCompletedLevels = localStorage.getItem('completedLevels');
        
        if (!localStorage.getItem(this.STORAGE_KEYS.PROGRESS) && (oldProgress || oldCompletedLevels)) {
            console.log('检测到旧格式数据，开始迁移...');
            
            let newProgress = {
                easy: [],
                medium: [],
                hard: []
            };
            
            // 处理旧的emojiIdiomGame格式
            if (oldProgress) {
                try {
                    const oldData = JSON.parse(oldProgress);
                    if (oldData && typeof oldData === 'object') {
                        if (Array.isArray(oldData.easy)) newProgress.easy = oldData.easy;
                        if (Array.isArray(oldData.medium)) newProgress.medium = oldData.medium;
                        if (Array.isArray(oldData.hard)) newProgress.hard = oldData.hard;
                    }
                } catch (e) {
                    console.error('解析旧进度数据失败:', e);
                }
            }
            
            // 处理旧的completedLevels格式
            if (oldCompletedLevels) {
                try {
                    const completedLevels = JSON.parse(oldCompletedLevels);
                    if (Array.isArray(completedLevels)) {
                        completedLevels.forEach(levelId => {
                            const difficulty = this.getLevelDifficulty(levelId);
                            if (!newProgress[difficulty].includes(levelId)) {
                                newProgress[difficulty].push(levelId);
                            }
                        });
                    }
                } catch (e) {
                    console.error('解析旧完成关卡数据失败:', e);
                }
            }
            
            // 保存新格式数据
            localStorage.setItem(this.STORAGE_KEYS.PROGRESS, JSON.stringify(newProgress));
            console.log('数据迁移完成');
        }
    }
    
    // 加载用户进度
    loadProgress() {
        const savedProgress = localStorage.getItem(this.STORAGE_KEYS.PROGRESS);
        if (savedProgress) {
            try {
                return JSON.parse(savedProgress);
            } catch (e) {
                console.error('解析进度数据失败:', e);
            }
        }
        // 默认进度为空对象
        return {
            'easy': [],
            'medium': [],
            'hard': []
        };
    }
    
    // 加载当前关卡
    loadCurrentLevel() {
        const savedLevel = localStorage.getItem(this.STORAGE_KEYS.CURRENT_LEVEL);
        return savedLevel ? parseInt(savedLevel) : 1; // 默认从第1关开始
    }
    
    // 保存进度
    saveProgress() {
        localStorage.setItem(this.STORAGE_KEYS.PROGRESS, JSON.stringify(this.progress));
    }
    
    // 保存当前关卡
    saveCurrentLevel() {
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_LEVEL, this.currentLevel.toString());
    }
    
    // 获取关卡所属的难度
    getLevelDifficulty(levelId) {
        for (const [difficulty, range] of Object.entries(this.difficultyRanges)) {
            if (levelId >= range.start && levelId <= range.end) {
                return difficulty;
            }
        }
        return 'easy'; // 默认返回初级
    }
    
    // 获取难度的第一个关卡ID
    getFirstLevelOfDifficulty(difficulty) {
        return this.difficultyRanges[difficulty].start;
    }
    
    // 获取难度的最后一个关卡ID
    getLastLevelOfDifficulty(difficulty) {
        return this.difficultyRanges[difficulty].end;
    }
    
    // 获取下一个难度
    getNextDifficulty(difficulty) {
        const index = this.difficultyOrder.indexOf(difficulty);
        if (index < this.difficultyOrder.length - 1) {
            return this.difficultyOrder[index + 1];
        }
        return null; // 没有下一个难度了
    }
    
    // 完成关卡
    completeLevel(levelId) {
        const difficulty = this.getLevelDifficulty(levelId);
        
        // 检查关卡是否已完成
        if (this.isLevelCompleted(levelId)) {
            return false; // 已完成，无需再次完成
        }
        
        // 检查关卡是否可以完成（必须是当前关卡或已解锁）
        if (!this.isLevelUnlocked(levelId)) {
            return false; // 关卡未解锁，不能完成
        }
        
        // 添加到已完成列表
        if (!this.progress[difficulty].includes(levelId)) {
            this.progress[difficulty].push(levelId);
        }
        
        // 更新当前关卡为下一关
        if (levelId < this.getLastLevelOfDifficulty(difficulty)) {
            // 如果不是当前难度的最后一关，则下一关是当前关卡+1
            this.currentLevel = levelId + 1;
        } else {
            // 如果是当前难度的最后一关，则下一关是下一个难度的第一关
            const nextDifficulty = this.getNextDifficulty(difficulty);
            if (nextDifficulty) {
                this.currentLevel = this.getFirstLevelOfDifficulty(nextDifficulty);
            } else {
                // 如果没有下一个难度了，则保持在最后一关
                this.currentLevel = levelId;
            }
        }
        
        // 保存进度
        this.saveProgress();
        this.saveCurrentLevel();
        
        // 清除旧格式数据
        this.clearOldData();
        
        return true;
    }
    
    // 清除旧格式数据
    clearOldData() {
        localStorage.removeItem('emojiIdiomGame');
        localStorage.removeItem('completedLevels');
    }
    
    // 检查关卡是否已完成
    isLevelCompleted(levelId) {
        const difficulty = this.getLevelDifficulty(levelId);
        return this.progress[difficulty].includes(levelId);
    }
    
    // 检查难度是否解锁
    isDifficultyUnlocked(difficulty) {
        if (difficulty === 'easy') return true;
        
        const difficultyIndex = this.difficultyOrder.indexOf(difficulty);
        if (difficultyIndex <= 0) return true; // 初级始终解锁
        
        // 获取前一个难度
        const prevDifficulty = this.difficultyOrder[difficultyIndex - 1];
        const prevDifficultyLastLevel = this.getLastLevelOfDifficulty(prevDifficulty);
        
        // 检查前一个难度的最后一关是否已完成
        return this.isLevelCompleted(prevDifficultyLastLevel);
    }
    
    // 检查关卡是否已解锁
    isLevelUnlocked(levelId) {
        // 第一关默认解锁
        if (levelId === 1) return true;
        
        const difficulty = this.getLevelDifficulty(levelId);
        
        // 检查难度是否解锁
        if (!this.isDifficultyUnlocked(difficulty)) {
            return false; // 难度未解锁，所有关卡都未解锁
        }
        
        // 如果是难度的第一关
        if (levelId === this.getFirstLevelOfDifficulty(difficulty)) {
            return true; // 难度已解锁，第一关自动解锁
        }
        
        // 否则检查前一关是否已完成
        return this.isLevelCompleted(levelId - 1);
    }
    
    // 获取关卡状态
    getLevelStatus(levelId) {
        if (this.isLevelCompleted(levelId)) {
            return 'completed';
        } else if (levelId === this.currentLevel) {
            return 'current';
        } else if (this.isLevelUnlocked(levelId)) {
            return 'unlocked';
        } else {
            return 'locked';
        }
    }
    
    // 获取难度的完成进度
    getDifficultyProgress(difficulty) {
        const range = this.difficultyRanges[difficulty];
        const total = range.end - range.start + 1;
        
        // 计算已完成的关卡数
        let completed = 0;
        for (let levelId = range.start; levelId <= range.end; levelId++) {
            if (this.isLevelCompleted(levelId)) {
                completed++;
            }
        }
        
        return {
            completed,
            total,
            percentage: (completed / total) * 100
        };
    }
    
    // 初始化关卡选择页面
    initLevelsPage() {
        const difficultyTabs = document.getElementById('difficulty-tabs');
        const levelsContainer = document.getElementById('levels-container');
        const difficultyText = document.getElementById('difficulty-text');
        const progressText = document.getElementById('progress-text');
        const progressBar = document.getElementById('progress-bar');
        
        if (!difficultyTabs || !levelsContainer) return;
        
        // 默认显示当前关卡所在的难度
        let initialDifficulty = this.getLevelDifficulty(this.currentLevel);
        
        // 更新难度标签状态
        const updateTabsState = (difficulty) => {
            const tabs = difficultyTabs.querySelectorAll('.difficulty-tab');
            tabs.forEach(tab => {
                tab.classList.toggle('active', tab.dataset.difficulty === difficulty);
            });
        };
        
        // 渲染关卡选择界面
        const renderLevelSelection = (difficulty) => {
            const range = this.difficultyRanges[difficulty];
            levelsContainer.innerHTML = '';
            
            // 添加难度锁定提示（如果未解锁）
            const difficultyUnlocked = this.isDifficultyUnlocked(difficulty);
            if (!difficultyUnlocked) {
                const warningDiv = document.createElement('div');
                warningDiv.className = 'col-span-4 text-center py-4 mb-4 bg-yellow-50 rounded-lg border border-yellow-200';
                
                // 确定提示信息
                let message = '';
                if (difficulty === 'medium') {
                    message = '完成所有初级关卡后解锁中级难度';
                } else if (difficulty === 'hard') {
                    message = '完成所有中级关卡后解锁高级难度';
                }
                
                warningDiv.innerHTML = `
                    <div class="flex items-center justify-center text-yellow-600">
                        <i class="fas fa-lock text-yellow-500 mr-2"></i>
                        <p>${message}</p>
                    </div>
                `;
                
                levelsContainer.appendChild(warningDiv);
            }
            
            // 生成关卡格子
            for (let levelId = range.start; levelId <= range.end; levelId++) {
                const status = this.getLevelStatus(levelId);
                
                const levelDiv = document.createElement('div');
                levelDiv.className = `level-item level-${status} level-animation`;
                
                // 设置动画延迟，创造波浪效果
                const index = levelId - range.start;
                levelDiv.style.animationDelay = `${index * 0.03}s`;
                
                if (status === 'completed') {
                    levelDiv.innerHTML = `
                        ${levelId}
                        <div class="level-check">
                            <i class="fas fa-check"></i>
                        </div>
                    `;
                } else if (status === 'current') {
                    levelDiv.innerHTML = `
                        <span class="relative">
                            ${levelId}
                            <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </span>
                    `;
                } else if (status === 'unlocked') {
                    levelDiv.textContent = levelId;
                } else {
                    // 为第一关添加特殊提示
                    let tooltipText = '请先完成前面的关卡';
                    if (levelId === range.start) {
                        if (difficulty === 'medium') {
                            tooltipText = '请先完成所有初级关卡';
                        } else if (difficulty === 'hard') {
                            tooltipText = '请先完成所有中级关卡';
                        }
                    }
                    
                    levelDiv.innerHTML = `
                        <i class="fas fa-lock text-gray-400 mr-1"></i> ${levelId}
                        <div class="tooltip">${tooltipText}</div>
                    `;
                }
                
                // 添加点击事件
                if (status === 'completed' || status === 'current' || status === 'unlocked') {
                    levelDiv.addEventListener('click', () => {
                        // 添加点击效果
                        levelDiv.classList.add('scale-95');
                        setTimeout(() => {
                            window.location.href = `game.html?level=${levelId}`;
                        }, 200);
                    });
                } else {
                    levelDiv.addEventListener('click', () => {
                        // 添加提示效果
                        levelDiv.classList.add('shake');
                        setTimeout(() => {
                            levelDiv.classList.remove('shake');
                            
                            // 确定提示信息
                            let message = '请先完成前面的关卡！';
                            
                            if (levelId === range.start) {
                                if (difficulty === 'medium') {
                                    message = '请先完成所有初级关卡以解锁中级难度！';
                                } else if (difficulty === 'hard') {
                                    message = '请先完成所有中级关卡以解锁高级难度！';
                                }
                            }
                            
                            alert(message);
                        }, 500);
                    });
                }
                
                levelsContainer.appendChild(levelDiv);
            }
            
            // 更新进度显示
            const progress = this.getDifficultyProgress(difficulty);
            if (progressText) {
                progressText.textContent = `${progress.completed}/${progress.total}`;
            }
            if (progressBar) {
                progressBar.style.width = `${progress.percentage}%`;
            }
            if (difficultyText) {
                difficultyText.textContent = this.difficultyNames[difficulty];
            }
        };
        
        // 添加难度切换事件
        difficultyTabs.addEventListener('click', (e) => {
            const tab = e.target.closest('.difficulty-tab');
            if (!tab) return;
            
            const difficulty = tab.dataset.difficulty;
            updateTabsState(difficulty);
            renderLevelSelection(difficulty);
        });
        
        // 初始化显示
        updateTabsState(initialDifficulty);
        renderLevelSelection(initialDifficulty);
        
        // 调试输出
        console.log('当前进度:', this.progress);
        console.log('当前关卡:', this.currentLevel);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.levelsManager = new LevelsManager();
    
    // 如果在关卡选择页面，初始化页面
    if (document.getElementById('levels-container')) {
        window.levelsManager.initLevelsPage();
    }
});

// 游戏完成关卡时调用示例
// levelsManager.completeLevel(1); // 完成第1关