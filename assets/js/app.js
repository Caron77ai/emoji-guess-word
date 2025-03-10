// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏
    const game = new EmojiIdiomGame();
    
    // 根据当前页面执行不同的初始化
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
      case 'game.html':
        initGamePage(game);
        break;
      case 'levels.html':
        initLevelsPage(game);
        break;
      case 'result.html':
        initResultPage(game);
        break;
      case 'home.html':
      case 'index.html':
        initHomePage(game);
        break;
      case 'profile.html':
        initProfilePage(game);
        break;
      case 'settings.html':
        initSettingsPage(game);
        break;
      case 'splash.html':
        // 2秒后自动跳转到主页
        setTimeout(() => {
          window.location.href = 'home.html';
        }, 2000);
        break;
    }
  });
  
  // 初始化游戏页面
  function initGamePage(game) {
    // 获取选择的关卡
    const selectedLevel = localStorage.getItem('selectedLevel');
    const levelId = selectedLevel ? parseInt(selectedLevel) : game.currentLevel;
    
    // 开始关卡
    const currentIdiom = game.startLevel(levelId);
    
    if (!currentIdiom) {
      alert('无法加载关卡数据');
      window.location.href = 'levels.html';
      return;
    }
    
    // 更新UI
    document.querySelector('.nav-bar .font-semibold').textContent = `第 ${levelId} 关`;
    document.querySelector('.hint-badge').innerHTML = `<i class="fas fa-coins mr-1"></i> ${game.coins}`;
    document.querySelector('.difficulty-badge').innerHTML = `<i class="fas fa-star-half-alt mr-1"></i> ${currentIdiom.difficulty}`;
    
    // 显示Emoji提示
    const emojiContainers = document.querySelectorAll('.emoji-item .emoji');
    currentIdiom.emojis.forEach((emoji, index) => {
      if (emojiContainers[index]) {
        emojiContainers[index].textContent = emoji;
      }
    });
    
    // 初始化答案区域
    const answerBox = document.querySelector('.answer-box');
    answerBox.innerHTML = '';
    
    for (let i = 0; i < currentIdiom.idiom.length; i++) {
      const charBox = document.createElement('div');
      charBox.className = 'answer-char';
      answerBox.appendChild(charBox);
    }
    
    // 初始化虚拟键盘
    initVirtualKeyboard(game, currentIdiom);
    
    // 提交按钮事件
    document.querySelector('.submit-button').addEventListener('click', () => {
      const answerChars = document.querySelectorAll('.answer-char');
      let answer = '';
      
      answerChars.forEach(char => {
        answer += char.textContent;
      });
      
      if (answer.length === currentIdiom.idiom.length) {
        if (game.checkAnswer(answer)) {
          // 答案正确，跳转到结果页
          localStorage.setItem('gameResult', JSON.stringify({
            idiom: currentIdiom.idiom,
            time: 120 - game.timeLeft,
            score: game.score,
            hint: currentIdiom.hint
          }));
          window.location.href = 'result.html';
        } else {
          // 答案错误，显示提示
          showToast('答案不正确，请重试！');
        }
      } else {
        showToast('请填完所有汉字！');
      }
    });
    
    // 提示按钮事件
    document.querySelector('.nav-bar button:last-child').addEventListener('click', () => {
      if (game.useHint()) {
        const answerChars = document.querySelectorAll('.answer-char');
        const hint = game.getHint(answerChars);
        
        if (hint) {
          answerChars[hint.position].textContent = hint.character;
          answerChars[hint.position].classList.add('filled');
        }
        
        // 更新金币显示
        document.querySelector('.hint-badge').innerHTML = `<i class="fas fa-coins mr-1"></i> ${game.coins}`;
      } else {
        showToast('金币不足，无法使用提示！');
      }
    });
    
    // 返回按钮事件
    document.querySelector('.nav-bar button:first-child').addEventListener('click', () => {
      window.location.href = 'levels.html';
    });
  }
  
  // 初始化虚拟键盘
  function initVirtualKeyboard(game, currentIdiom) {
    const keyboard = document.querySelector('.keyboard');
    if (!keyboard) return;
    
    // 清空键盘
    keyboard.innerHTML = '';
    
    // 创建键盘按键
    const keys = generateKeyboardKeys(currentIdiom);
    
    // 创建键盘行
    const rows = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ];
    
    rows.forEach(row => {
      row.className = 'grid grid-cols-7 gap-2 mb-2';
      keyboard.appendChild(row);
    });
    
    // 分配按键到行
    keys.forEach((key, index) => {
      const keyElement = document.createElement('div');
      keyElement.className = key === 'backspace' ? 'key function-key' : 'key';
      
      if (key === 'backspace') {
        keyElement.innerHTML = '<i class="fas fa-backspace"></i>';
      } else {
        keyElement.textContent = key;
      }
      
      // 添加点击事件
      keyElement.addEventListener('click', () => {
        const answerChars = document.querySelectorAll('.answer-char');
        
        if (key === 'backspace') {
          // 删除最后一个已填充的字符
          for (let i = answerChars.length - 1; i >= 0; i--) {
            if (answerChars[i].textContent) {
              answerChars[i].textContent = '';
              answerChars[i].classList.remove('filled');
              break;
            }
          }
        } else {
          // 填充字符
          for (let i = 0; i < answerChars.length; i++) {
            if (!answerChars[i].textContent) {
              answerChars[i].textContent = key;
              answerChars[i].classList.add('filled');
              break;
            }
          }
        }
      });
      
      // 将按键添加到对应行
      const rowIndex = Math.floor(index / 7);
      if (rowIndex < rows.length) {
        rows[rowIndex].appendChild(keyElement);
      }
    });
  }
  
  // 生成键盘按键
  function generateKeyboardKeys(currentIdiom) {
    // 包含成语中的字符
    const idiomChars = currentIdiom.idiom.split('');
    
    // 添加一些额外的常用字符
    const extraChars = ['山', '水', '火', '木', '金', '土', '人', '口', '日', '月', '田', '心'];
    
    // 合并并去重
    let allChars = [...idiomChars];
    
    // 添加额外字符直到达到20个
    for (let i = 0; i < extraChars.length && allChars.length < 20; i++) {
      if (!allChars.includes(extraChars[i])) {
        allChars.push(extraChars[i]);
      }
    }
    
    // 打乱顺序
    allChars = shuffleArray(allChars);
    
    // 添加退格键
    allChars.push('backspace');
    
    return allChars;
  }
  
  // 打乱数组顺序
  function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
  
  // 初始化关卡选择页面
  function initLevelsPage(game) {
    const levelManager = new LevelManager(game);
    
    // 渲染关卡选择
    const levelGrid = document.querySelector('.level-grid');
    if (levelGrid) {
      levelManager.renderLevelSelection(levelGrid);
    }
    
    // 难度选择标签点击事件
    const difficultyTabs = document.querySelectorAll('.difficulty-tab');
    difficultyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // 移除所有标签的active类
        difficultyTabs.forEach(t => t.classList.remove('active'));
        
        // 添加当前标签的active类
        tab.classList.add('active');
        
        // 切换难度
        const difficulty = tab.textContent.trim();
        levelManager.switchDifficulty(difficulty);
        
        // 更新进度条
        updateProgressBar(levelManager, difficulty);
        
        // 重新渲染关卡
        levelManager.renderLevelSelection(levelGrid);
      });
    });
    
    // 初始化进度条
    updateProgressBar(levelManager, levelManager.currentDifficulty);
    
    // 返回按钮事件
    document.querySelector('.nav-bar button').addEventListener('click', () => {
      window.location.href = 'home.html';
    });
  }
  
  // 更新进度条
  function updateProgressBar(levelManager, difficulty) {
    const completedCount = levelManager.getCompletedLevelCount(difficulty);
    const totalCount = levelManager.getLevelCountByDifficulty(difficulty);
    
    const progressText = document.querySelector('.progress-bar + div');
    if (progressText) {
      progressText.textContent = `${completedCount}/${totalCount}`;
    }
    
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
      progressFill.style.width = `${percentage}%`;
    }
  }
  
  // 初始化结果页面
  function initResultPage(game) {
    const resultData = JSON.parse(localStorage.getItem('gameResult') || '{}');
    
    // 更新结果页面UI
    document.querySelector('.result-header p').textContent = `你成功猜出了成语：${resultData.idiom || ''}`;
    
    // 计算用时
    const minutes = Math.floor(resultData.time / 60);
    const seconds = resultData.time % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // 更新用时显示
    document.querySelector('.info-row:nth-child(1) .font-medium').textContent = timeString;
    
    // 更新成语解释
    document.querySelector('.text-gray-700').textContent = resultData.hint || '';
    
    // 下一关按钮事件
    document.querySelector('.primary-button').addEventListener('click', () => {
      window.location.href = 'game.html';
    });
    
    // 返回关卡选择链接事件
    document.querySelector('.text-blue-500').addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'levels.html';
    });
  }
  
  // 初始化主页
  function initHomePage(game) {
    // 更新继续游戏卡片
    const currentIdiom = game.getIdiomByLevel(game.currentLevel);
    
    if (currentIdiom) {
      document.querySelector('.continue-game p').textContent = `第 ${game.currentLevel} 关 - ${currentIdiom.difficulty}`;
    }
    
    // 继续游戏按钮事件
    document.querySelector('.continue-game').addEventListener('click', () => {
      window.location.href = 'game.html';
    });
    
    // 游戏模式卡片事件
    const gameModeCards = document.querySelectorAll('.game-mode-card');
    
    // 经典模式
    gameModeCards[0].addEventListener('click', () => {
      window.location.href = 'levels.html';
    });
    
    // 限时挑战
    gameModeCards[1].addEventListener('click', () => {
      // 可以添加限时挑战模式的逻辑
      alert('限时挑战模式即将推出！');
    });
    
    // 排行榜
    gameModeCards[2].addEventListener('click', () => {
      alert('排行榜功能即将推出！');
    });
    
    // 每日挑战
    gameModeCards[3].addEventListener('click', () => {
      alert('每日挑战功能即将推出！');
    });
    
    // 底部标签栏事件
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems[1].addEventListener('click', () => {
      window.location.href = 'levels.html';
    });
    
    tabItems[3].addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
    
    // 更新进度显示
    document.querySelector('.progress-container .text-sm.font-medium').textContent = `${game.currentLevel - 1}/100`;
    document.querySelector('.progress-fill').style.width = `${(game.currentLevel - 1)}%`;
  }
  
  // 初始化个人中心页面
  function initProfilePage(game) {
    // 更新金币显示
    document.querySelectorAll('.text-2xl.font-bold')[2].textContent = game.coins;
    
    // 更新已解锁关卡数
    document.querySelectorAll('.text-2xl.font-bold')[0].textContent = game.currentLevel - 1;
    
    // 底部标签栏事件
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems[0].addEventListener('click', () => {
      window.location.href = 'home.html';
    });
    
    tabItems[1].addEventListener('click', () => {
      window.location.href = 'levels.html';
    });
  }
  
  // 初始化设置页面
  function initSettingsPage(game) {
    // 返回按钮事件
    document.querySelector('.nav-bar button').addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
    
    // 重置游戏进度
    document.querySelectorAll('.settings-item')[2].addEventListener('click', () => {
      if (confirm('确定要重置游戏进度吗？这将清除所有关卡进度和金币。')) {
        localStorage.removeItem('emojiIdiomGame');
        alert('游戏进度已重置，请重新启动游戏。');
        window.location.href = 'splash.html';
      }
    });
    
    // 退出登录按钮
    document.querySelector('.logout-button').addEventListener('click', () => {
      if (confirm('确定要退出登录吗？')) {
        // 这里可以添加退出登录的逻辑
        window.location.href = 'splash.html';
      }
    });
  }
  
  // 显示提示消息
  function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 2秒后移除
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }