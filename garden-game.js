class SoundSystem {
    static playSound(type) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        const sounds = {
            'success': { freq: 800, duration: 0.1 },
            'error': { freq: 300, duration: 0.2 },
            'click': { freq: 600, duration: 0.05 },
            'evolution': { freq: 1000, duration: 0.3 },
            'water': { freq: 400, duration: 0.15 },
            'liquid': { freq: 700, duration: 0.1 },
            'achievement': { freq: 1200, duration: 0.2 },
            'notification': { freq: 500, duration: 0.08 }
        };

        const sound = sounds[type] || sounds['click'];
        oscillator.frequency.value = sound.freq;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + sound.duration);
    }
}

// ============================================
// نظام تفاعلات السوائل
// ============================================
class LiquidReactionSystem {
    static getReaction(liquid1, liquid2) {
        const reactions = {
            'H-Fire:H-Water': { type: 'neutral', message: 'تفاعل محايد - بخار', effect: 1.0 },
            'H-Fire:H-Ice': { type: 'negative', message: 'تفاعل سلبي - تبريد', effect: 0.7 },
            'H-Fire:H-Nature': { type: 'positive', message: 'تفاعل إيجابي - نمو سريع', effect: 1.5 },
            'H-Water:H-Ice': { type: 'positive', message: 'تفاعل إيجابي - تجميد صحي', effect: 1.3 },
            'H-Water:H-Shadow': { type: 'negative', message: 'تفاعل سلبي - ظلام رطب', effect: 0.8 },
            'H-Light:H-Shadow': { type: 'neutral', message: 'تفاعل محايد - توازن', effect: 1.0 },
            'H-Storm:H-Fire': { type: 'positive', message: 'تفاعل إيجابي - برق قوي', effect: 1.6 },
            'H-Storm:H-Water': { type: 'positive', message: 'تفاعل إيجابي - عاصفة مائية', effect: 1.4 },
            'H-Toxic:H-Nature': { type: 'negative', message: 'تفاعل سلبي - تسمم', effect: 0.5 },
            'H-Metal:H-Fire': { type: 'positive', message: 'تفاعل إيجابي - معدن مشع', effect: 1.5 },
            'H-Void:H-Light': { type: 'neutral', message: 'تفاعل محايد - توازن كوني', effect: 1.0 },
            'H-Mutant:H-Chaos': { type: 'positive', message: 'تفاعل إيجابي - فوضى خلاقة', effect: 1.7 },
            'H-Blessing:H-Curse': { type: 'neutral', message: 'تفاعل محايد - توازن روحي', effect: 1.0 },
            'H-Time:H-Space': { type: 'positive', message: 'تفاعل إيجابي - انفجار كوني', effect: 2.0 },
            'H-Dream:H-Reality': { type: 'neutral', message: 'تفاعل محايد - واقع حلمي', effect: 1.0 }
        };

        const key = `${liquid1}:${liquid2}`;
        const reverseKey = `${liquid2}:${liquid1}`;

        return reactions[key] || reactions[reverseKey] || { type: 'neutral', message: 'تفاعل عادي', effect: 1.0 };
    }
}

// ============================================
// نظام خصائص السوائل المتقدم
// ============================================
class LiquidPropertiesSystem {
    static getProperties(liquidKey) {
        const properties = {
            'H-Fire': { health: 10, growth: 1.3, moisture: -10, defense: 5 },
            'H-Water': { health: 15, growth: 1.0, moisture: 30, defense: 0 },
            'H-Nature': { health: 20, growth: 1.2, moisture: 10, defense: 10 },
            'H-Storm': { health: 5, growth: 1.5, moisture: 5, defense: 15 },
            'H-Ice': { health: 10, growth: 0.8, moisture: 20, defense: 20 },
            'H-Shadow': { health: 0, growth: 1.1, moisture: 5, defense: 5 },
            'H-Light': { health: 25, growth: 1.4, moisture: 0, defense: 10 },
            'H-Toxic': { health: -20, growth: 0.5, moisture: 0, defense: 0 },
            'H-Metal': { health: 30, growth: 0.9, moisture: 0, defense: 30 },
            'H-Void': { health: 0, growth: 1.0, moisture: 0, defense: 0 },
            'H-Mutant': { health: 10, growth: 1.6, moisture: 10, defense: 5 },
            'H-Chaos': { health: 5, growth: 1.7, moisture: 15, defense: 10 },
            'H-Giant': { health: 20, growth: 1.4, moisture: 20, defense: 15 },
            'H-Tiny': { health: 5, growth: 0.9, moisture: 5, defense: 5 },
            'H-Wild': { health: 15, growth: 1.5, moisture: 5, defense: 20 },
            'H-Tame': { health: 25, growth: 1.1, moisture: 15, defense: 10 },
            'H-Radiant': { health: 30, growth: 1.6, moisture: 5, defense: 25 },
            'H-Crystal': { health: 20, growth: 1.2, moisture: 0, defense: 25 },
            'H-Organic': { health: 25, growth: 1.3, moisture: 20, defense: 15 },
            'H-Ethereal': { health: 10, growth: 1.4, moisture: 10, defense: 5 },
            'H-Inferno': { health: 20, growth: 1.8, moisture: -20, defense: 30 },
            'H-Frost': { health: 15, growth: 0.7, moisture: 30, defense: 25 },
            'H-Venom': { health: -30, growth: 0.3, moisture: 5, defense: 0 },
            'H-Blessing': { health: 50, growth: 2.0, moisture: 20, defense: 40 },
            'H-Curse': { health: -50, growth: 0.2, moisture: 0, defense: 0 },
            'H-Time': { health: 0, growth: 2.0, moisture: 0, defense: 0 },
            'H-Space': { health: 0, growth: 1.5, moisture: 0, defense: 0 },
            'H-Dream': { health: 15, growth: 1.4, moisture: 10, defense: 5 },
            'H-Reality': { health: 20, growth: 1.0, moisture: 10, defense: 10 },
            'H-Harmony': { health: 30, growth: 1.3, moisture: 15, defense: 20 },
            'H-Chaos2': { health: 10, growth: 1.9, moisture: 20, defense: 15 }
        };
        return properties[liquidKey] || { health: 0, growth: 1.0, moisture: 0, defense: 0 };
    }
}

const LIQUIDS = {
    // السوائل الأساسية
    'H-Fire': { name: 'سائل النار', emoji: '🔥', color: '#ff4500', traits: ['ناري', 'حار', 'عدواني'], rarity: 'common', description: 'يزيد النمو والدفاع' },
    'H-Water': { name: 'سائل الماء', emoji: '💧', color: '#1e90ff', traits: ['مائي', 'بارد', 'هادئ'], rarity: 'common' },
    'H-Nature': { name: 'سائل الطبيعة', emoji: '🌿', color: '#228b22', traits: ['طبيعي', 'متوازن', 'صحي'], rarity: 'common' },
    'H-Storm': { name: 'سائل العاصفة', emoji: '⚡', color: '#ffd700', traits: ['كهربائي', 'عنيف', 'سريع'], rarity: 'rare' },
    'H-Ice': { name: 'سائل الجليد', emoji: '❄️', color: '#00ced1', traits: ['جليدي', 'متجمد', 'بطيء'], rarity: 'rare' },
    'H-Shadow': { name: 'سائل الظل', emoji: '🌑', color: '#2f4f4f', traits: ['ظلامي', 'غامض', 'ليلي'], rarity: 'rare' },
    'H-Light': { name: 'سائل النور', emoji: '✨', color: '#ffff00', traits: ['نوراني', 'ساحر', 'مشع'], rarity: 'rare' },
    'H-Toxic': { name: 'سائل السم', emoji: '☠️', color: '#9932cc', traits: ['سام', 'خطير', 'متحول'], rarity: 'epic' },
    'H-Metal': { name: 'سائل المعدن', emoji: '⚙️', color: '#a9a9a9', traits: ['معدني', 'صلب', 'ثقيل'], rarity: 'epic' },
    'H-Void': { name: 'سائل العدم', emoji: '🌌', color: '#000000', traits: ['فراغي', 'غريب', 'غامض'], rarity: 'legendary' },
    'H-Mutant': { name: 'سائل التحول', emoji: '🧬', color: '#ff1493', traits: ['متحول', 'عشوائي', 'غير متوقع'], rarity: 'epic' },
    'H-Chaos': { name: 'سائل الفوضى', emoji: '🌀', color: '#ff69b4', traits: ['فوضوي', 'عنيف', 'غير منتظم'], rarity: 'legendary' },
    'H-Giant': { name: 'سائل العملاق', emoji: '📏', color: '#ff8c00', traits: ['ضخم', 'عملاق', 'كبير'], rarity: 'rare' },
    'H-Tiny': { name: 'سائل الحجم الصغير', emoji: '🤏', color: '#87ceeb', traits: ['صغير', 'مصغر', 'ضئيل'], rarity: 'rare' },
    'H-Wild': { name: 'سائل المتوحش', emoji: '🐺', color: '#8b4513', traits: ['متوحش', 'عدواني', 'شرس'], rarity: 'epic' },
    'H-Tame': { name: 'سائل التدجين', emoji: '🐕', color: '#daa520', traits: ['مروض', 'هادئ', 'ودود'], rarity: 'rare' },
    'H-Radiant': { name: 'سائل الإشعاع', emoji: '☢️', color: '#00ff00', traits: ['مشع', 'مضيء', 'قوي'], rarity: 'epic' },
    'H-Crystal': { name: 'سائل البلورة', emoji: '💎', color: '#00ffff', traits: ['بلوري', 'براق', 'نقي'], rarity: 'epic' },
    'H-Organic': { name: 'سائل العضوي', emoji: '🧫', color: '#90ee90', traits: ['عضوي', 'حي', 'متطور'], rarity: 'rare' },
    'H-Ethereal': { name: 'سائل الأثير', emoji: '👻', color: '#dda0dd', traits: ['أثيري', 'غامض', 'خفيف'], rarity: 'epic' },
    'H-Inferno': { name: 'سائل الجحيم', emoji: '🔥🌋', color: '#ff0000', traits: ['جحيمي', 'محترق', 'مدمر'], rarity: 'legendary' },
    'H-Frost': { name: 'سائل الصقيع', emoji: '❄️⛄', color: '#b0e0e6', traits: ['متجمد', 'بارد جداً', 'ناعم'], rarity: 'epic' },
    'H-Venom': { name: 'سائل السم القاتل', emoji: '🐍', color: '#32cd32', traits: ['سام', 'قاتل', 'خطير'], rarity: 'legendary' },
    'H-Blessing': { name: 'سائل البركة', emoji: '🙏', color: '#ffd700', traits: ['مبارك', 'مقدس', 'قوي'], rarity: 'legendary' },
    'H-Curse': { name: 'سائل اللعنة', emoji: '😈', color: '#8b0000', traits: ['ملعون', 'مظلم', 'شرير'], rarity: 'legendary' },
    'H-Time': { name: 'سائل الزمن', emoji: '⏳', color: '#ffa500', traits: ['زمني', 'سريع', 'متغير'], rarity: 'legendary' },
    'H-Space': { name: 'سائل الفضاء', emoji: '🌌', color: '#4b0082', traits: ['فضائي', 'واسع', 'غامض'], rarity: 'legendary' },
    'H-Dream': { name: 'سائل الحلم', emoji: '💭', color: '#9370db', traits: ['حلمي', 'سحري', 'خيالي'], rarity: 'epic' },
    'H-Reality': { name: 'سائل الواقع', emoji: '👁️', color: '#696969', traits: ['واقعي', 'حقيقي', 'ثابت'], rarity: 'epic' },
    'H-Harmony': { name: 'سائل الانسجام', emoji: '☮️', color: '#20b2aa', traits: ['منسجم', 'متوازن', 'سلمي'], rarity: 'epic' },
    'H-Chaos2': { name: 'سائل الفوضى المطلقة', emoji: '💥', color: '#ff00ff', traits: ['فوضوي تماماً', 'عشوائي', 'مجنون'], rarity: 'legendary' }
};

// ============================================
// 2. تعريف أنواع النباتات
// ============================================

const PLANT_TYPES = {
    'Qity': { name: 'يونيتي', emoji: '🌱', baseExp: 100, traits: [], rarity: 'common' },
    'Flame-Sprout': { name: 'براعم الجحيم', emoji: '🔥🌱', baseExp: 150, traits: ['ناري'], rarity: 'common' },
    'Water-Sprout': { name: 'براعم الماء', emoji: '💧🌱', baseExp: 150, traits: ['مائي'], rarity: 'common' },
    'Nature-Sprout': { name: 'براعم الطبيعة', emoji: '🌿🌱', baseExp: 150, traits: ['طبيعي'], rarity: 'common' },
    'Flame-Flower': { name: 'زهرة اللهب', emoji: '🔥🌸', baseExp: 200, traits: ['ناري', 'جميل'], rarity: 'uncommon' },
    'Water-Flower': { name: 'زهرة الماء', emoji: '💧🌸', baseExp: 200, traits: ['مائي', 'جميل'], rarity: 'uncommon' },
    'Nature-Flower': { name: 'زهرة الطبيعة', emoji: '🌿🌸', baseExp: 200, traits: ['طبيعي', 'جميل'], rarity: 'uncommon' },
    'Steam-Flower': { name: 'زهرة البخار', emoji: '💨🌸', baseExp: 250, traits: ['ناري', 'مائي'], rarity: 'rare' },
    'Lightning-Flower': { name: 'زهرة البرق', emoji: '⚡🌸', baseExp: 300, traits: ['كهربائي', 'سريع'], rarity: 'rare' },
    'Shadow-Flower': { name: 'زهرة الظل', emoji: '🌑🌸', baseExp: 300, traits: ['ظلامي', 'غامض'], rarity: 'rare' },
    'Light-Flower': { name: 'زهرة النور', emoji: '✨🌸', baseExp: 300, traits: ['نوراني', 'مشع'], rarity: 'rare' },
    'Twilight-Flower': { name: 'زهرة الشفق', emoji: '🌅🌸', baseExp: 350, traits: ['نوراني', 'ظلامي'], rarity: 'epic' },
    'Crystal-Flower': { name: 'زهرة البلورة', emoji: '💎🌸', baseExp: 350, traits: ['بلوري', 'براق'], rarity: 'epic' },
    'Cosmic-Flower': { name: 'زهرة الكون', emoji: '🌌✨🌸', baseExp: 500, traits: ['فراغي', 'نوراني'], rarity: 'legendary' },
    'Inferno-Rose': { name: 'وردة الجحيم', emoji: '🔥🌹', baseExp: 400, traits: ['جحيمي', 'محترق'], rarity: 'epic' },
    'Frost-Rose': { name: 'وردة الصقيع', emoji: '❄️🌹', baseExp: 400, traits: ['متجمد', 'بارد'], rarity: 'epic' },
    'Eternal-Rose': { name: 'الوردة الأبدية', emoji: '👑🌹', baseExp: 600, traits: ['أسطوري', 'أبدي'], rarity: 'legendary' }
};

// ============================================
// 3. نظام اللعبة الرئيسي
// ============================================

class GardenGame {
    constructor() {
        this.plants = [];
        this.coins = 100;
        this.level = 1;
        this.discoveredPlants = new Set(['Qity']);
        this.selectedLiquids = [];
        this.currentPlant = null;
        this.plantSlots = 8;
        this.gameTime = 0;
        this.weather = 'sunny';
        this.gardens = [{ name: 'الحديقة الرئيسية', id: 1, plants: [] }];
        this.currentGarden = 0;
        this.achievements = new Map();
        this.statistics = {
            plantsCreated: 0,
            plantsEvolved: 0,
            liquidsUsed: 0,
            coinsEarned: 0,
            coinsSpent: 0,
            timePlayedSeconds: 0
        };

    // If true, loading a save will restore plants in gardens.
    // Default: false so the game starts with empty plant slots even if a previous save exists.
    // You can set this to true if you want to resume exactly from a save that includes plants.
    this.restorePlants = false;

    this.initializeAchievements();
        this.setupEventListeners();
        this.startGameLoop();
        this.loadGame();
        this.render();
    }

    initializeAchievements() {
        this.achievements.set('first_plant', {
            name: 'البداية الخضراء',
            description: 'زرع أول نبتة',
            icon: '🌱',
            unlocked: false,
            reward: 10
        });
        this.achievements.set('first_evolution', {
            name: 'التطور الأول',
            description: 'اكتشف أول تطور للنبتة',
            icon: '✨',
            unlocked: false,
            reward: 25
        });
        this.achievements.set('collector', {
            name: 'جامع النباتات',
            description: 'اكتشف 20 نوع مختلف من النباتات',
            icon: '📚',
            unlocked: false,
            reward: 50
        });
        this.achievements.set('liquid_master', {
            name: 'سيد السوائل',
            description: 'استخدم 20 نوع مختلف من سوائل H',
            icon: '💧',
            unlocked: false,
            reward: 100
        });
        this.achievements.set('legendary_hunter', {
            name: 'صياد الأسطورة',
            description: 'اكتشف نبتة أسطورية',
            icon: '👑',
            unlocked: false,
            reward: 200
        });
        this.achievements.set('world_explorer', {
            name: 'مستكشف العالم',
            description: 'أنشئ 5 حدائق مختلفة',
            icon: '🗺️',
            unlocked: false,
            reward: 150
        });
        this.achievements.set('wealthy', {
            name: 'الثروة',
            description: 'اجمع 5000 عملة',
            icon: '💰',
            unlocked: false,
            reward: 100
        });
        this.achievements.set('breeder', {
            name: 'مربي النباتات',
            description: 'تكاثر 10 نباتات',
            icon: '🧬',
            unlocked: false,
            reward: 150
        });
    }

    setupEventListeners() {
        document.getElementById('addPlantBtn').addEventListener('click', () => this.addPlant());

        Object.keys(LIQUIDS).forEach(liquidKey => {
            const btn = document.createElement('button');
            btn.className = 'liquid-btn';
            btn.innerHTML = `${LIQUIDS[liquidKey].emoji}<br>${LIQUIDS[liquidKey].name}`;
            btn.addEventListener('click', () => this.toggleLiquidSelection(liquidKey));
            document.getElementById('liquidsGrid').appendChild(btn);
        });

        document.getElementById('mixBtn').addEventListener('click', () => {
            if (this.selectedLiquids.length > 0) {
                this.showNotification(`تم خلط ${this.selectedLiquids.length} سوائل! 🧪`, 'success');
            }
        });

        document.getElementById('clearMixBtn').addEventListener('click', () => this.clearMixing());
        document.getElementById('journalBtn').addEventListener('click', () => this.showJournal());
        document.getElementById('achievementsBtn').addEventListener('click', () => this.showAchievements());
        document.getElementById('statsBtn').addEventListener('click', () => this.showStatistics());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());
        document.getElementById('worldBtn').addEventListener('click', () => this.showWorld());
        document.getElementById('tradeBtn').addEventListener('click', () => this.showShop());

        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('show');
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        });

        document.getElementById('soundToggle').addEventListener('change', (e) => {
            // تفعيل/إيقاف الصوت
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            if (confirm('هل تريد فعلاً إعادة تعيين اللعبة؟')) {
                localStorage.clear();
                location.reload();
            }
        });
    }

    addPlant() {
        if (this.gardens[this.currentGarden].plants.length >= this.plantSlots) {
            this.showNotification('لا توجد مساحة كافية!', 'error');
            return;
        }

        const plant = {
            id: Date.now(),
            type: 'Qity',
            exp: 0,
            health: 100,
            moisture: 50,
            traits: [],
            liquidHistory: [],
            age: 0,
            sprite: PLANT_TYPES['Qity'].emoji,
            lastWatered: Date.now()
        };

        this.gardens[this.currentGarden].plants.push(plant);
        this.statistics.plantsCreated++;
        this.showNotification('تم إضافة نبتة جديدة! 🌱', 'success');
        this.checkAchievement('first_plant');
        this.render();
    }

    toggleLiquidSelection(liquidKey) {
        const index = this.selectedLiquids.indexOf(liquidKey);
        if (index > -1) {
            this.selectedLiquids.splice(index, 1);
        } else {
            if (this.selectedLiquids.length < 3) {
                this.selectedLiquids.push(liquidKey);
            } else {
                this.showNotification('يمكنك اختيار 3 سوائل كحد أقصى', 'warning');
            }
        }
        this.render();
    }

    clearMixing() {
        this.selectedLiquids = [];
        this.render();
    }

    waterPlant(plantId, withLiquid = false) {
        const plant = this.gardens[this.currentGarden].plants.find(p => p.id === plantId);
        if (!plant) return;

        plant.moisture = Math.min(100, plant.moisture + 30);
        plant.health = Math.min(100, plant.health + 5);
        plant.lastWatered = Date.now();

        if (withLiquid && this.selectedLiquids.length > 0) {
            const expGain = 20 * this.selectedLiquids.length;
            plant.exp += expGain;
            plant.liquidHistory.push(...this.selectedLiquids);
            this.statistics.liquidsUsed += this.selectedLiquids.length;

            this.showNotification(`+${expGain} خبرة! 📈`, 'info');

            if (plant.exp >= PLANT_TYPES[plant.type].baseExp) {
                this.evolvePlant(plantId);
            }
        } else {
            this.showNotification('تم سقي النبتة بماء نقي 💧', 'success');
        }

        this.render();
    }

    evolvePlant(plantId) {
        const plant = this.gardens[this.currentGarden].plants.find(p => p.id === plantId);
        if (!plant) return;

        // حساب التطور بناءً على السوائل المستخدمة
        let newPlantType = this.calculateEvolution(plant.type, plant.liquidHistory);
        
        plant.type = newPlantType;
        plant.exp = 0;
        plant.sprite = PLANT_TYPES[newPlantType]?.emoji || '🌱';

        this.showNotification(`H++ - تطور النبتة! ✨`, 'success');
        this.discoveredPlants.add(newPlantType);
        this.statistics.plantsEvolved++;
        this.checkAchievement('first_evolution');
        this.checkAchievement('collector');

        this.render();
    }

    calculateEvolution(currentType, liquidHistory) {
        if (liquidHistory.length === 0) return currentType;

        const liquidCounts = {};
        liquidHistory.forEach(l => {
            liquidCounts[l] = (liquidCounts[l] || 0) + 1;
        });

        const dominantLiquid = Object.keys(liquidCounts).reduce((a, b) => 
            liquidCounts[a] > liquidCounts[b] ? a : b
        );

        // جدول التطور
        const evolutionMap = {
            'Qity': {
                'H-Fire': 'Flame-Sprout',
                'H-Water': 'Water-Sprout',
                'H-Nature': 'Nature-Sprout'
            },
            'Flame-Sprout': {
                'H-Fire': 'Flame-Flower',
                'H-Water': 'Steam-Flower',
                'H-Storm': 'Lightning-Flower'
            },
            'Water-Sprout': {
                'H-Water': 'Water-Flower',
                'H-Fire': 'Steam-Flower',
                'H-Ice': 'Frost-Rose'
            },
            'Nature-Sprout': {
                'H-Nature': 'Nature-Flower',
                'H-Light': 'Light-Flower'
            },
            'Flame-Flower': {
                'H-Shadow': 'Twilight-Flower',
                'H-Inferno': 'Inferno-Rose'
            },
            'Water-Flower': {
                'H-Shadow': 'Twilight-Flower',
                'H-Ice': 'Frost-Rose'
            },
            'Nature-Flower': {
                'H-Light': 'Light-Flower',
                'H-Crystal': 'Crystal-Flower'
            },
            'Twilight-Flower': {
                'H-Void': 'Cosmic-Flower',
                'H-Light': 'Light-Flower'
            },
            'Crystal-Flower': {
                'H-Void': 'Cosmic-Flower',
                'H-Blessing': 'Eternal-Rose'
            }
        };

        return evolutionMap[currentType]?.[dominantLiquid] || currentType;
    }

    removePlant(plantId) {
        this.gardens[this.currentGarden].plants = this.gardens[this.currentGarden].plants.filter(p => p.id !== plantId);
        this.showNotification('تم إزالة النبتة', 'info');
        this.render();
    }

    showPlantModal(plantId) {
        const plant = this.gardens[this.currentGarden].plants.find(p => p.id === plantId);
        if (!plant) return;

        this.currentPlant = plant;
        const modal = document.getElementById('plantModal');
        const plantType = PLANT_TYPES[plant.type];

        document.getElementById('plantName').textContent = plantType.name;
        document.getElementById('plantSprite').textContent = plant.sprite;
        document.getElementById('healthBar').style.width = plant.health + '%';
        document.getElementById('expBar').style.width = (plant.exp / PLANT_TYPES[plant.type].baseExp * 100) + '%';
        document.getElementById('moistureBar').style.width = plant.moisture + '%';

        const traitsDiv = document.getElementById('plantTraits');
        traitsDiv.innerHTML = '';
        plant.traits.forEach(trait => {
            const traitEl = document.createElement('span');
            traitEl.className = 'trait';
            traitEl.textContent = trait;
            traitsDiv.appendChild(traitEl);
        });

        document.getElementById('waterBtn').onclick = () => {
            this.waterPlant(plant.id, false);
            modal.classList.remove('show');
        };

        document.getElementById('applyLiquidBtn').onclick = () => {
            if (this.selectedLiquids.length === 0) {
                this.showNotification('اختر سائل H أولاً', 'warning');
                return;
            }
            this.waterPlant(plant.id, true);
            this.clearMixing();
            modal.classList.remove('show');
        };

        document.getElementById('removeBtn').onclick = () => {
            if (confirm('هل تريد فعلاً إزالة هذه النبتة؟')) {
                this.removePlant(plant.id);
                modal.classList.remove('show');
            }
        };

        modal.classList.add('show');
    }

    showJournal() {
        const modal = document.getElementById('journalModal');
        const journalGrid = document.getElementById('journalGrid');
        journalGrid.innerHTML = '';

        this.discoveredPlants.forEach(plantType => {
            const plant = PLANT_TYPES[plantType];
            if (plant) {
                const entry = document.createElement('div');
                entry.className = 'journal-entry';
                entry.innerHTML = `
                    <div class="journal-sprite">${plant.emoji}</div>
                    <div class="journal-name">${plant.name}</div>
                `;
                journalGrid.appendChild(entry);
            }
        });

        modal.classList.add('show');
    }

    showAchievements() {
        const modal = document.getElementById('achievementsModal');
        const achievementsList = document.getElementById('achievementsList');
        achievementsList.innerHTML = '';

        this.achievements.forEach((achievement, key) => {
            const item = document.createElement('div');
            item.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <div class="achievement-title">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            `;
            achievementsList.appendChild(item);
        });

        modal.classList.add('show');
    }

    showStatistics() {
        const modal = document.getElementById('statsModal');
        const statsContent = document.getElementById('statsContent');
        
        const timeHours = Math.floor(this.statistics.timePlayedSeconds / 3600);
        const timeMinutes = Math.floor((this.statistics.timePlayedSeconds % 3600) / 60);

        statsContent.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color);">
                    <strong>🌱 النباتات المنشأة:</strong> ${this.statistics.plantsCreated}
                </div>
                <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color);">
                    <strong>✨ النباتات المتطورة:</strong> ${this.statistics.plantsEvolved}
                </div>
                <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color);">
                    <strong>💧 السوائل المستخدمة:</strong> ${this.statistics.liquidsUsed}
                </div>
                <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color);">
                    <strong>💰 العملات المكتسبة:</strong> ${this.statistics.coinsEarned}
                </div>
                <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color);">
                    <strong>💸 العملات المنفقة:</strong> ${this.statistics.coinsSpent}
                </div>
                <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color);">
                    <strong>⏱️ وقت اللعب:</strong> ${timeHours}س ${timeMinutes}د
                </div>
            </div>
        `;

        modal.classList.add('show');
    }

    showSettings() {
        document.getElementById('settingsModal').classList.add('show');
    }

    showWorld() {
        const modal = document.getElementById('worldModal');
        const worldContent = document.getElementById('worldContent');
        
        worldContent.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 10px; position: relative; z-index: 1;">
                <h3 style="color: var(--primary-color); margin-bottom: 10px;">🏰 حدائقك</h3>
                ${this.gardens.map((garden, index) => `
                    <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color); cursor: pointer;" onclick="game.switchGarden(${index})">
                        <strong>${garden.name}</strong> - ${garden.plants.length} نبتة
                    </div>
                `).join('')}
                <button class="btn btn-primary" onclick="game.createNewGarden()">➕ إنشاء حديقة جديدة</button>
            </div>
        `;

        modal.classList.add('show');
    }

    showShop() {
        const modal = document.getElementById('shopModal');
        const shopContent = document.getElementById('shopContent');
        
        const items = [
            { name: 'بذرة نادرة', price: 50, emoji: '🌰' },
            { name: 'سائل H نادر', price: 100, emoji: '💧' },
            { name: 'سماد خاص', price: 75, emoji: '🥗' },
            { name: 'أداة ذهبية', price: 200, emoji: '🏆' }
        ];

        shopContent.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; position: relative; z-index: 1;">
                ${items.map(item => `
                    <div style="background: rgba(255,255,255,0.4); padding: 15px; border-radius: 8px; border: 2px solid var(--border-color); text-align: center;">
                        <div style="font-size: 2rem;">${item.emoji}</div>
                        <strong>${item.name}</strong><br>
                        <span style="color: #ff9800;">💰 ${item.price}</span><br>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="game.buyItem('${item.name}', ${item.price})">شراء</button>
                    </div>
                `).join('')}
            </div>
        `;

        modal.classList.add('show');
    }

    switchGarden(index) {
        this.currentGarden = index;
        document.getElementById('worldModal').classList.remove('show');
        this.render();
    }

    createNewGarden() {
        if (this.gardens.length >= 10) {
            this.showNotification('لا يمكنك إنشاء أكثر من 10 حدائق', 'warning');
            return;
        }

        const gardenName = prompt('أدخل اسم الحديقة الجديدة:');
        if (gardenName) {
            this.gardens.push({
                name: gardenName,
                id: this.gardens.length + 1,
                plants: []
            });
            this.showNotification(`تم إنشاء حديقة "${gardenName}"! 🌳`, 'success');
            this.showWorld();
        }
    }

    buyItem(itemName, price) {
        if (this.coins >= price) {
            this.coins -= price;
            this.statistics.coinsSpent += price;
            this.showNotification(`تم شراء ${itemName}! 🎉`, 'success');
            this.render();
        } else {
            this.showNotification('ليس لديك عملات كافية!', 'error');
        }
    }

    checkAchievement(achievementKey) {
        const achievement = this.achievements.get(achievementKey);
        if (achievement && !achievement.unlocked) {
            let shouldUnlock = false;

            switch(achievementKey) {
                case 'first_plant':
                    shouldUnlock = this.statistics.plantsCreated > 0;
                    break;
                case 'first_evolution':
                    shouldUnlock = this.statistics.plantsEvolved > 0;
                    break;
                case 'collector':
                    shouldUnlock = this.discoveredPlants.size >= 20;
                    break;
                case 'liquid_master':
                    const usedLiquids = new Set();
                    this.gardens.forEach(g => {
                        g.plants.forEach(p => {
                            p.liquidHistory.forEach(l => usedLiquids.add(l));
                        });
                    });
                    shouldUnlock = usedLiquids.size >= 20;
                    break;
                case 'legendary_hunter':
                    shouldUnlock = this.discoveredPlants.has('Cosmic-Flower') || 
                                  this.discoveredPlants.has('Eternal-Rose');
                    break;
                case 'world_explorer':
                    shouldUnlock = this.gardens.length >= 5;
                    break;
                case 'wealthy':
                    shouldUnlock = this.coins >= 5000;
                    break;
            }

            if (shouldUnlock) {
                achievement.unlocked = true;
                this.coins += achievement.reward;
                this.showNotification(`🏆 إنجاز: ${achievement.name}! +${achievement.reward} عملة`, 'success');
            }
        }
    }

    showNotification(message, type = 'info') {
        const notificationsContainer = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        notificationsContainer.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInLeft 0.3s reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    saveGame() {
        const gameData = {
            plants: this.gardens,
            coins: this.coins,
            level: this.level,
            discoveredPlants: Array.from(this.discoveredPlants),
            achievements: Array.from(this.achievements.entries()),
            statistics: this.statistics,
            currentGarden: this.currentGarden
        };
        localStorage.setItem('gardenHGameData', JSON.stringify(gameData));
    }

    loadGame() {
        const saveData = localStorage.getItem('gardenHGameData');
        if (saveData) {
            const data = JSON.parse(saveData);
            // Load gardens metadata but avoid restoring actual plants unless restorePlants is true.
            if (this.restorePlants && data.plants) {
                this.gardens = data.plants;
            } else if (data.plants) {
                // map saved gardens to keep names/ids but clear plants so player starts fresh
                this.gardens = data.plants.map(g => ({ name: g.name || 'الحديقة', id: g.id || Date.now(), plants: [] }));
                // Ensure at least one garden exists
                if (this.gardens.length === 0) this.gardens = [{ name: 'الحديقة الرئيسية', id: 1, plants: [] }];
            }
            this.coins = data.coins || 100;
            this.level = data.level || 1;
            this.discoveredPlants = new Set(data.discoveredPlants || ['Qity']);
            this.statistics = data.statistics || this.statistics;
            this.currentGarden = data.currentGarden || 0;
            if (data.achievements) {
                data.achievements.forEach(([key, value]) => {
                    this.achievements.set(key, value);
                });
            }
        }
    }

    render() {
        const currentGardenData = this.gardens[this.currentGarden];
        
        document.getElementById('coins').textContent = this.coins;
        document.getElementById('level').textContent = this.level;
        document.getElementById('discovered').textContent = this.discoveredPlants.size + '/100';
        document.getElementById('gardens').textContent = this.gardens.length;

        const gardenGrid = document.getElementById('gardenGrid');
        gardenGrid.innerHTML = '';

        currentGardenData.plants.forEach(plant => {
            const slot = document.createElement('div');
            slot.className = 'plant-slot';
            slot.innerHTML = `<div class="plant-sprite">${plant.sprite}</div>`;
            slot.addEventListener('click', () => this.showPlantModal(plant.id));
            gardenGrid.appendChild(slot);
        });

        for (let i = currentGardenData.plants.length; i < this.plantSlots; i++) {
            const slot = document.createElement('div');
            slot.className = 'plant-slot empty';
            slot.innerHTML = '➕';
            slot.addEventListener('click', () => this.addPlant());
            gardenGrid.appendChild(slot);
        }

        document.querySelectorAll('.liquid-btn').forEach((btn, index) => {
            const liquidKey = Object.keys(LIQUIDS)[index];
            if (this.selectedLiquids.includes(liquidKey)) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });

        const selectedLiquidsDiv = document.getElementById('selectedLiquids');
        if (this.selectedLiquids.length === 0) {
            selectedLiquidsDiv.innerHTML = '<p class="empty-text">اختر السوائل للخلط...</p>';
        } else {
            selectedLiquidsDiv.innerHTML = this.selectedLiquids.map(liquid => `
                <div class="selected-liquid-tag">
                    ${LIQUIDS[liquid].emoji} ${LIQUIDS[liquid].name}
                    <span class="remove">✕</span>
                </div>
            `).join('');

            document.querySelectorAll('.selected-liquid-tag .remove').forEach((removeBtn, index) => {
                removeBtn.addEventListener('click', () => {
                    this.selectedLiquids.splice(index, 1);
                    this.render();
                });
            });
        }

        this.saveGame();
    }

    startGameLoop() {
        setInterval(() => {
            this.gameTime = (this.gameTime + 0.01) % 2;
            this.statistics.timePlayedSeconds++;

            const timeDisplay = document.getElementById('timeDisplay');
            if (this.gameTime < 1) {
                timeDisplay.textContent = '⏰ الوقت: نهار';
            } else {
                timeDisplay.textContent = '🌙 الوقت: ليل';
            }

            if (Math.random() < 0.01) {
                const weathers = ['sunny', 'cloudy', 'rainy', 'stormy'];
                this.weather = weathers[Math.floor(Math.random() * weathers.length)];
            }

            const weatherDisplay = document.getElementById('weatherDisplay');
            const weatherEmojis = {
                'sunny': '☀️ مشمس',
                'cloudy': '☁️ غائم',
                'rainy': '🌧️ ممطر',
                'stormy': '⛈️ عاصف'
            };
            weatherDisplay.textContent = '🌤️ الطقس: ' + weatherEmojis[this.weather];

            this.gardens[this.currentGarden].plants.forEach(plant => {
                if (this.weather === 'rainy') {
                    plant.moisture = Math.min(100, plant.moisture + 2);
                } else if (this.weather === 'sunny') {
                    plant.moisture = Math.max(0, plant.moisture - 1);
                }

                if (plant.moisture < 20) {
                    plant.health = Math.max(0, plant.health - 0.5);
                }
            });

            this.render();
        }, 1000);
    }
}

// ============================================
// 4. نظام التكاثر والتناسل
// ============================================

class BreedingSystem {
    static canBreed(plant1, plant2) {
        return plant1.type !== 'Qity' && plant2.type !== 'Qity';
    }

    static breed(plant1, plant2) {
        const traits1 = new Set(plant1.traits);
        const traits2 = new Set(plant2.traits);
        const combinedTraits = [...traits1, ...traits2];
        
        const liquidHistory = [...plant1.liquidHistory, ...plant2.liquidHistory];
        
        return {
            id: Date.now(),
            type: plant1.type,
            exp: 0,
            health: 75,
            moisture: 50,
            traits: combinedTraits.slice(0, 5),
            liquidHistory: liquidHistory,
            age: 0,
            sprite: plant1.sprite,
            lastWatered: Date.now()
        };
    }
}

// ============================================
// 5. نظام الاقتصاد والتجارة
// ============================================

class EconomySystem {
    static calculatePlantValue(plant) {
        let value = 10;
        value += plant.traits.length * 5;
        if (plant.type !== 'Qity') value += 20;
        return value;
    }

    static sellPlant(plant) {
        return this.calculatePlantValue(plant);
    }

    static getPriceMultiplier(rarity) {
        const multipliers = {
            'common': 1,
            'uncommon': 1.5,
            'rare': 2.5,
            'epic': 4,
            'legendary': 8
        };
        return multipliers[rarity] || 1;
    }
}

// ============================================
// 6. نظام الاستراتيجية والحروب
// ============================================

class StrategicSystem {
    constructor() {
        this.alliances = [];
        this.rivalries = [];
        this.territories = [];
    }

    createAlliance(garden1, garden2) {
        this.alliances.push({
            id: Date.now(),
            members: [garden1, garden2],
            strength: 0,
            createdAt: Date.now()
        });
    }

    startWar(garden1, garden2) {
        const strength1 = garden1.plants.length;
        const strength2 = garden2.plants.length;
        
        return strength1 > strength2 ? garden1 : garden2;
    }

    claimTerritory(garden, territory) {
        this.territories.push({
            owner: garden,
            name: territory,
            resources: Math.floor(Math.random() * 100) + 50
        });
    }
}

// ============================================
// 7. نظام التربة والتغذية
// ============================================

class SoilSystem {
    constructor() {
        this.soilTypes = {
            'rich': { name: 'تربة غنية', bonus: 1.5, cost: 100 },
            'sandy': { name: 'تربة رملية', bonus: 1.0, cost: 50 },
            'clay': { name: 'تربة طينية', bonus: 1.2, cost: 75 },
            'volcanic': { name: 'تربة بركانية', bonus: 2.0, cost: 200 }
        };
    }

    getGrowthBonus(soilType) {
        return this.soilTypes[soilType]?.bonus || 1;
    }
}

// ============================================
// 8. نظام الموسم والمناخ المتقدم
// ============================================

class SeasonSystem {
    constructor() {
        this.seasons = ['spring', 'summer', 'autumn', 'winter'];
        this.currentSeason = 0;
        this.seasonDuration = 3600; // 1 ساعة = موسم واحد
        this.seasonTimer = 0;
    }

    getCurrentSeason() {
        return this.seasons[this.currentSeason];
    }

    getSeasonBonus(plant) {
        const bonuses = {
            'spring': 1.3,
            'summer': 1.5,
            'autumn': 1.2,
            'winter': 0.8
        };
        return bonuses[this.getCurrentSeason()] || 1;
    }

    updateSeason() {
        this.seasonTimer++;
        if (this.seasonTimer >= this.seasonDuration) {
            this.currentSeason = (this.currentSeason + 1) % 4;
            this.seasonTimer = 0;
        }
    }
}

// ============================================
// 9. نظام الأمراض والآفات المتقدم
// ============================================

class DiseaseSystem {
    constructor() {
        this.diseases = [
            { name: 'الصدأ', damage: 10, chance: 0.05 },
            { name: 'الذبول', damage: 15, chance: 0.03 },
            { name: 'العفن', damage: 20, chance: 0.02 }
        ];
    }

    infect(plant) {
        const disease = this.diseases[Math.floor(Math.random() * this.diseases.length)];
        if (Math.random() < disease.chance) {
            plant.health -= disease.damage;
            return disease;
        }
        return null;
    }

    cure(plant, cost) {
        plant.health = Math.min(100, plant.health + 50);
        return cost;
    }
}

// ============================================
// 10. نظام البحث والتطوير
// ============================================

class ResearchSystem {
    constructor() {
        this.researches = [
            { name: 'تحسين النمو', cost: 500, bonus: 1.2, duration: 3600 },
            { name: 'مقاومة الأمراض', cost: 750, bonus: 0.5, duration: 3600 },
            { name: 'زيادة الإنتاجية', cost: 600, bonus: 1.5, duration: 3600 },
            { name: 'التطور السريع', cost: 1000, bonus: 2, duration: 3600 }
        ];
        this.activeResearches = [];
    }

    startResearch(researchIndex) {
        const research = this.researches[researchIndex];
        this.activeResearches.push({
            ...research,
            startTime: Date.now(),
            progress: 0
        });
        return research.cost;
    }
}

// ============================================
// 11. نظام التصدير والاستيراد
// ============================================

class TradeSystem {
    constructor() {
        this.marketPrices = {};
        this.updateMarketPrices();
    }

    updateMarketPrices() {
        Object.keys(PLANT_TYPES).forEach(plantType => {
            this.marketPrices[plantType] = Math.floor(Math.random() * 100) + 50;
        });
    }

    exportPlant(plant) {
        const basePrice = EconomySystem.calculatePlantValue(plant);
        return Math.floor(basePrice * (this.marketPrices[plant.type] / 100));
    }

    importPlant(plantType) {
        return this.marketPrices[plantType] || 50;
    }
}

// تهيئة الأنظمة الإضافية
const breedingSystem = new BreedingSystem();
const soilSystem = new SoilSystem();
const seasonSystem = new SeasonSystem();
const diseaseSystem = new DiseaseSystem();
const researchSystem = new ResearchSystem();
const tradeSystem = new TradeSystem();

// إضافة دالة التكاثر إلى فئة اللعبة
GardenGame.prototype.breedPlants = function(plantId1, plantId2) {
    const plant1 = this.gardens[this.currentGarden].plants.find(p => p.id === plantId1);
    const plant2 = this.gardens[this.currentGarden].plants.find(p => p.id === plantId2);
    
    if (!plant1 || !plant2) return false;
    if (!BreedingSystem.canBreed(plant1, plant2)) {
        this.showNotification('لا يمكن تكاثر هذه النباتات', 'warning');
        return false;
    }

    const offspring = BreedingSystem.breed(plant1, plant2);
    this.gardens[this.currentGarden].plants.push(offspring);
    this.statistics.plantsCreated++;
    this.showNotification('تم التكاثر بنجاح! 🧬', 'success');
    this.render();
    return true;
};

// إضافة دالة البيع
GardenGame.prototype.sellPlant = function(plantId) {
    const plant = this.gardens[this.currentGarden].plants.find(p => p.id === plantId);
    if (!plant) return false;

    const price = EconomySystem.sellPlant(plant);
    this.coins += price;
    this.statistics.coinsEarned += price;
    this.removePlant(plantId);
    this.showNotification(`تم بيع النبتة بـ ${price} عملة! 💰`, 'success');
    return true;
};

// تهيئة اللعبة
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new GardenGame();
});


// ============================================
// 12. نظام الإشعارات المتقدم
// ============================================

class NotificationSystem {
    static notify(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.getElementById('notifications').appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideInLeft 0.3s reverse';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// ============================================
// 13. نظام الحفظ والتحميل المتقدم
// ============================================

class SaveSystem {
    static save(game) {
        const data = {
            version: '1.0',
            timestamp: Date.now(),
            game: {
                plants: game.gardens,
                coins: game.coins,
                level: game.level,
                discoveredPlants: Array.from(game.discoveredPlants),
                achievements: Array.from(game.achievements.entries()),
                statistics: game.statistics,
                currentGarden: game.currentGarden
            }
        };
        localStorage.setItem('gardenHGameData', JSON.stringify(data));
        return true;
    }

    static load() {
        const data = localStorage.getItem('gardenHGameData');
        return data ? JSON.parse(data) : null;
    }

    static clear() {
        localStorage.removeItem('gardenHGameData');
        return true;
    }
}

// ============================================
// 14. نظام الإحصائيات المتقدم
// ============================================

class AdvancedStatistics {
    constructor() {
        this.hourlyData = [];
        this.dailyData = [];
        this.weeklyData = [];
    }

    recordHourlyData(data) {
        this.hourlyData.push({
            timestamp: Date.now(),
            data: data
        });
    }

    getAverageGrowthRate() {
        if (this.hourlyData.length === 0) return 0;
        return this.hourlyData.length / 24;
    }

    getMostPopularLiquid(liquidHistory) {
        const counts = {};
        liquidHistory.forEach(l => {
            counts[l] = (counts[l] || 0) + 1;
        });
        return Object.keys(counts).reduce((a, b) => 
            counts[a] > counts[b] ? a : b
        );
    }
}

// ============================================
// 15. نظام الأحداث الخاصة
// ============================================

class SpecialEventsSystem {
    constructor() {
        this.events = [
            { name: 'موسم الحصاد', bonus: 1.5, duration: 3600 },
            { name: 'المطر الذهبي', bonus: 2.0, duration: 1800 },
            { name: 'الكسوف', bonus: 0.5, duration: 900 },
            { name: 'الاحتفال السنوي', bonus: 1.8, duration: 7200 }
        ];
        this.activeEvents = [];
    }

    startRandomEvent() {
        const event = this.events[Math.floor(Math.random() * this.events.length)];
        this.activeEvents.push({
            ...event,
            startTime: Date.now()
        });
        return event;
    }

    getActiveEventBonus() {
        let bonus = 1;
        this.activeEvents.forEach(event => {
            if (Date.now() - event.startTime < event.duration * 1000) {
                bonus *= event.bonus;
            }
        });
        return bonus;
    }
}

// ============================================
// 16. نظام التحديات
// ============================================

class ChallengeSystem {
    constructor() {
        this.challenges = [
            { name: 'تطوير 5 نباتات', target: 5, reward: 100, progress: 0 },
            { name: 'جمع 1000 عملة', target: 1000, reward: 200, progress: 0 },
            { name: 'اكتشاف 10 نباتات', target: 10, reward: 150, progress: 0 },
            { name: 'استخدام 15 سائل H', target: 15, reward: 120, progress: 0 },
            { name: 'إنشاء 3 حدائق', target: 3, reward: 180, progress: 0 }
        ];
    }

    updateProgress(type, value) {
        this.challenges.forEach(challenge => {
            if (challenge.name.includes(type)) {
                challenge.progress = Math.min(challenge.target, challenge.progress + value);
            }
        });
    }

    getCompletedChallenges() {
        return this.challenges.filter(c => c.progress >= c.target);
    }
}

// ============================================
// 17. نظام الشراكات والتعاون
// ============================================

class PartnershipSystem {
    constructor() {
        this.partners = [
            { name: 'المزارع الحكيم', bonus: 1.2, cost: 100 },
            { name: 'الساحر النباتي', bonus: 1.5, cost: 200 },
            { name: 'الكيميائي الماهر', bonus: 1.3, cost: 150 },
            { name: 'الحارس الأسطوري', bonus: 2.0, cost: 500 }
        ];
        this.activePartners = [];
    }

    activatePartner(partnerIndex) {
        const partner = this.partners[partnerIndex];
        this.activePartners.push(partner);
        return partner.cost;
    }

    getTotalBonus() {
        return this.activePartners.reduce((sum, p) => sum * p.bonus, 1);
    }
}

// ============================================
// 18. نظام الألعاب الصغيرة
// ============================================

class MiniGamesSystem {
    static playGuessingGame() {
        const number = Math.floor(Math.random() * 100) + 1;
        return number;
    }

    static playMemoryGame() {
        const sequence = [];
        for (let i = 0; i < 5; i++) {
            sequence.push(Math.floor(Math.random() * 4));
        }
        return sequence;
    }

    static playSpinWheel() {
        const rewards = [10, 25, 50, 100, 200, 500];
        return rewards[Math.floor(Math.random() * rewards.length)];
    }
}

// ============================================
// 19. نظام الرتب والألقاب
// ============================================

class RankSystem {
    constructor() {
        this.ranks = [
            { name: 'المبتدئ', minExp: 0, icon: '🌱' },
            { name: 'الهاوي', minExp: 500, icon: '🌿' },
            { name: 'الخبير', minExp: 2000, icon: '🌳' },
            { name: 'الماجستير', minExp: 5000, icon: '🌲' },
            { name: 'الأسطورة', minExp: 10000, icon: '👑' }
        ];
        this.currentRank = 0;
    }

    updateRank(totalExp) {
        for (let i = this.ranks.length - 1; i >= 0; i--) {
            if (totalExp >= this.ranks[i].minExp) {
                this.currentRank = i;
                break;
            }
        }
    }

    getCurrentRank() {
        return this.ranks[this.currentRank];
    }
}

// ============================================
// 20. نظام المتاحف والمعارض
// ============================================

class MuseumSystem {
    constructor() {
        this.exhibits = [];
        this.maxExhibits = 20;
    }

    addExhibit(plant) {
        if (this.exhibits.length < this.maxExhibits) {
            this.exhibits.push({
                plant: plant,
                addedDate: Date.now(),
                visitors: 0
            });
            return true;
        }
        return false;
    }

    getExhibitValue(plant) {
        return EconomySystem.calculatePlantValue(plant) * 2;
    }

    getTotalValue() {
        return this.exhibits.reduce((sum, e) => 
            sum + this.getExhibitValue(e.plant), 0
        );
    }
}

// ============================================
// 21. نظام الخريطة والاستكشاف
// ============================================

class ExplorationSystem {
    constructor() {
        this.locations = [
            { name: 'الغابة المسحورة', discovered: false, reward: 100 },
            { name: 'جبال الكريستال', discovered: false, reward: 150 },
            { name: 'الصحراء الذهبية', discovered: false, reward: 120 },
            { name: 'الوادي المخفي', discovered: false, reward: 200 },
            { name: 'جزيرة الأسرار', discovered: false, reward: 250 }
        ];
    }

    exploreLocation(index) {
        if (index < this.locations.length) {
            this.locations[index].discovered = true;
            return this.locations[index].reward;
        }
        return 0;
    }

    getDiscoveredCount() {
        return this.locations.filter(l => l.discovered).length;
    }
}

// ============================================
// 22. نظام الهدايا والمكافآت
// ============================================

class RewardSystem {
    static dailyReward() {
        const rewards = [50, 75, 100, 150, 200];
        return rewards[Math.floor(Math.random() * rewards.length)];
    }

    static weeklyReward() {
        const rewards = [500, 750, 1000, 1500];
        return rewards[Math.floor(Math.random() * rewards.length)];
    }

    static loginBonus(daysInARow) {
        return 10 * daysInARow;
    }
}

// تهيئة الأنظمة الإضافية
const advancedStats = new AdvancedStatistics();
const specialEvents = new SpecialEventsSystem();
const challenges = new ChallengeSystem();
const partnerships = new PartnershipSystem();
const rankSystem = new RankSystem();
const museum = new MuseumSystem();
const exploration = new ExplorationSystem();

// إضافة دوال إضافية إلى فئة اللعبة
GardenGame.prototype.getGameStats = function() {
    return {
        totalPlants: this.gardens.reduce((sum, g) => sum + g.plants.length, 0),
        totalCoins: this.coins,
        discoveredPlants: this.discoveredPlants.size,
        gardens: this.gardens.length,
        level: this.level,
        rank: rankSystem.getCurrentRank()
    };
};

GardenGame.prototype.claimDailyReward = function() {
    const reward = RewardSystem.dailyReward();
    this.coins += reward;
    this.showNotification(`🎁 مكافأة يومية: +${reward} عملة!`, 'success');
    return reward;
};

GardenGame.prototype.startSpecialEvent = function() {
    const event = specialEvents.startRandomEvent();
    this.showNotification(`⚡ حدث خاص: ${event.name}! +${(event.bonus - 1) * 100}% مكافأة!`, 'info');
    return event;
};

// ============================================
// نظام تسميات النباتات الديناميكي
// ============================================
class PlantNamingSystem {
    static generateName(baseName, appliedLiquids) {
        if (!appliedLiquids || appliedLiquids.length === 0) {
            return baseName;
        }
        
        const liquidNames = appliedLiquids.map(liquid => {
            const liquidMap = {
                'H-Fire': 'ناري',
                'H-Water': 'مائي',
                'H-Nature': 'طبيعي',
                'H-Storm': 'عاصفي',
                'H-Ice': 'جليدي',
                'H-Shadow': 'ظلامي',
                'H-Light': 'نوراني',
                'H-Toxic': 'سام',
                'H-Metal': 'معدني',
                'H-Void': 'فراغي',
                'H-Mutant': 'متحول',
                'H-Chaos': 'فوضوي',
                'H-Giant': 'عملاق',
                'H-Tiny': 'مصغر',
                'H-Wild': 'متوحش',
                'H-Tame': 'مروض',
                'H-Radiant': 'مشع',
                'H-Crystal': 'بلوري',
                'H-Organic': 'عضوي',
                'H-Ethereal': 'أثيري',
                'H-Inferno': 'جحيمي',
                'H-Frost': 'متجمد',
                'H-Venom': 'سام قاتل',
                'H-Blessing': 'مبارك',
                'H-Curse': 'ملعون',
                'H-Time': 'زمني',
                'H-Space': 'فضائي',
                'H-Dream': 'حلمي',
                'H-Reality': 'واقعي',
                'H-Harmony': 'منسجم',
                'H-Chaos2': 'فوضوي مطلق'
            };
            return liquidMap[liquid] || liquid;
        });
        
        return `${baseName} ${liquidNames.join('/')}`;
    }
}

// نظام تأثيرات السوائل المرئية
class LiquidEffectSystem {
    static showLiquidEffect(liquidKey, plantElement) {
        const effects = {
            'H-Fire': { color: '#ff4500', message: '🔥 يزيد النمو والدفاع!' },
            'H-Water': { color: '#1e90ff', message: '💧 يزيد الرطوبة والصحة!' },
            'H-Nature': { color: '#228b22', message: '🌿 نمو متوازن وصحي!' },
            'H-Storm': { color: '#ffd700', message: '⚡ نمو سريع جداً!' },
            'H-Ice': { color: '#87ceeb', message: '❄️ دفاع قوي وتجميد!' },
            'H-Light': { color: '#ffff00', message: '✨ صحة عالية جداً!' },
            'H-Toxic': { color: '#800080', message: '☠️ خطر! قد يسبب ضرراً!' },
            'H-Metal': { color: '#c0c0c0', message: '⚙️ دفاع معدني قوي!' },
            'H-Blessing': { color: '#ffd700', message: '🙏 بركة عظيمة!' },
            'H-Curse': { color: '#000000', message: '😈 لعنة! احذر!' }
        };
        
        const effect = effects[liquidKey] || { color: '#90ee90', message: '💧 تم تطبيق السائل!' };
        
        if (plantElement) {
            plantElement.style.boxShadow = `0 0 20px ${effect.color}`;
            setTimeout(() => {
                plantElement.style.boxShadow = '';
            }, 1000);
        }
        
        return effect;
    }
}

// نظام الخصائص المتقدم للنباتات
class PlantStatsSystem {
    static calculateStats(basePlant, appliedLiquids) {
        let stats = {
            health: 50,
            growth: 1.0,
            moisture: 50,
            defense: 10,
            rarity: 'common'
        };
        
        if (!appliedLiquids || appliedLiquids.length === 0) {
            return stats;
        }
        
        appliedLiquids.forEach(liquidKey => {
            const props = LiquidPropertiesSystem.getProperties(liquidKey);
            stats.health += props.health;
            stats.growth *= props.growth;
            stats.moisture += props.moisture;
            stats.defense += props.defense;
        });
        
        if (stats.health > 100 || stats.defense > 50) {
            stats.rarity = 'legendary';
        } else if (stats.health > 80 || stats.growth > 1.5) {
            stats.rarity = 'epic';
        } else if (stats.health > 60 || stats.defense > 30) {
            stats.rarity = 'rare';
        } else if (stats.health > 40) {
            stats.rarity = 'uncommon';
        }
        
        stats.health = Math.max(1, Math.min(200, stats.health));
        stats.moisture = Math.max(0, Math.min(100, stats.moisture));
        stats.defense = Math.max(0, Math.min(100, stats.defense));
        
        return stats;
    }
}

// نظام مؤشرات الخصائص
class PropertyIndicatorSystem {
    static getIndicator(stat, value) {
        if (value > 80) return '⭐⭐⭐';
        if (value > 60) return '⭐⭐';
        if (value > 40) return '⭐';
        return '○';
    }
}

// نظام تنبيهات الخطر
class DangerAlertSystem {
    static checkDanger(plant) {
        if (plant.health < 20) return { level: 'critical', message: '⚠️ صحة حرجة!' };
        if (plant.health < 40) return { level: 'warning', message: '⚠️ صحة منخفضة!' };
        if (plant.moisture < 10) return { level: 'warning', message: '💧 رطوبة منخفضة!' };
        return { level: 'safe', message: '✅ آمن' };
    }
}

// نظام التلميحات الديناميكية
class HintSystem {
    static getHint(liquidKey) {
        const hints = {
            'H-Fire': 'تلميح: يعمل بشكل أفضل مع الطبيعة والعاصفة',
            'H-Water': 'تلميح: يعمل بشكل أفضل مع الجليد والطبيعة',
            'H-Nature': 'تلميح: يعمل بشكل أفضل مع جميع السوائل',
            'H-Storm': 'تلميح: يعمل بشكل أفضل مع النار والماء',
            'H-Ice': 'تلميح: يعمل بشكل أفضل مع الماء والطبيعة',
            'H-Light': 'تلميح: يعمل بشكل أفضل مع الظل والنور',
            'H-Blessing': 'تلميح: يعطي أفضل النتائج! استخدمه بحكمة',
            'H-Curse': 'تلميح: قد يسبب ضرراً! استخدمه بحذر',
            'H-Time': 'تلميح: يسرع النمو بشكل كبير جداً!',
            'H-Space': 'تلميح: يعطي خصائص فريدة وغريبة'
        };
        return hints[liquidKey] || 'تلميح: جرب هذا السائل مع سوائل أخرى';
    }
}

// نظام الألوان الديناميكية
class ColorSystem {
    static getPlantColor(stats) {
        if (stats.health > 100) return '#ff1493';
        if (stats.defense > 50) return '#8b4513';
        if (stats.growth > 1.5) return '#00ff00';
        if (stats.moisture > 70) return '#1e90ff';
        return '#90ee90';
    }
}

// نظام الرسائل الذكية
class SmartMessageSystem {
    static getMessage(action, data) {
        const messages = {
            'apply_liquid': `تم تطبيق ${data.liquid}! ${data.effect}`,
            'evolution': `تطور! ${data.newName} ظهر! 🎉`,
            'reaction_positive': `تفاعل إيجابي! ${data.message} +${Math.round((data.effect - 1) * 100)}%`,
            'reaction_negative': `تفاعل سلبي! ${data.message} -${Math.round((1 - data.effect) * 100)}%`,
            'reaction_neutral': `تفاعل محايد! ${data.message}`,
            'danger': `⚠️ تحذير: ${data.message}`,
            'success': `✅ نجاح: ${data.message}`
        };
        return messages[action] || 'تم إجراء العملية';
    }
}

// نظام الإحصائيات الفورية
class InstantStatsSystem {
    static formatStats(plant) {
        return `الصحة: ${plant.stats.health}/200 | النمو: ${(plant.stats.growth * 100).toFixed(0)}% | الرطوبة: ${plant.stats.moisture}/100 | الدفاع: ${plant.stats.defense}/100`;
    }
}

// نظام التنبؤ
class PredictionSystem {
    static predictResult(plant, liquid) {
        const props = LiquidPropertiesSystem.getProperties(liquid);
        const newHealth = plant.stats.health + props.health;
        
        let prediction = 'محايد';
        if (newHealth > plant.stats.health + 10) prediction = 'إيجابي جداً';
        else if (newHealth > plant.stats.health) prediction = 'إيجابي';
        else if (newHealth < plant.stats.health - 10) prediction = 'سلبي جداً';
        else if (newHealth < plant.stats.health) prediction = 'سلبي';
        
        return prediction;
    }
}

// نظام التصنيفات
class RankingSystem {
    static getRank(stats) {
        const score = stats.health + (stats.growth * 50) + stats.defense;
        if (score > 300) return 'أسطوري';
        if (score > 250) return 'ملحمي';
        if (score > 200) return 'نادر';
        if (score > 150) return 'غير عادي';
        return 'عادي';
    }
}

// نظام التوصيات
class RecommendationSystem {
    static recommend(plant) {
        const stats = plant.stats;
        if (stats.health < 40) return 'ننصح باستخدام سائل النور أو البركة';
        if (stats.defense < 20) return 'ننصح باستخدام سائل المعدن أو الجليد';
        if (stats.moisture < 30) return 'ننصح باستخدام سائل الماء أو الطبيعة';
        if (stats.growth < 1.2) return 'ننصح باستخدام سائل العاصفة أو التحول';
        return 'النبات في حالة ممتازة! استمر في العناية به';
    }
}

// نظام الفلترة
class FilteringSystem {
    static filterByRarity(plants, rarity) {
        return plants.filter(p => p.stats.rarity === rarity);
    }
    
    static filterByHealth(plants, minHealth) {
        return plants.filter(p => p.stats.health >= minHealth);
    }
}

// نظام الترتيب
class SortingSystem {
    static sortByHealth(plants) {
        return [...plants].sort((a, b) => b.stats.health - a.stats.health);
    }
    
    static sortByGrowth(plants) {
        return [...plants].sort((a, b) => b.stats.growth - a.stats.growth);
    }
}

// نظام الخلفية الديناميكية
class BackgroundSystem {
    static updateBackground(weather) {
        const backgrounds = {
            'sunny': 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
            'rainy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'stormy': 'linear-gradient(135deg, #434343 0%, #000000 100%)',
            'snowy': 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
        };
        document.body.style.background = backgrounds[weather] || backgrounds['sunny'];
    }
}

// نظام الإنجازات الديناميكية
class DynamicAchievementSystem {
    static checkAchievements(game) {
        const achievements = [];
        
        if (game.gardens.reduce((sum, g) => sum + g.plants.length, 0) > 50) {
            achievements.push('مجمع النباتات - لديك أكثر من 50 نبتة!');
        }
        
        if (game.coins > 10000) {
            achievements.push('الملياردير - لديك أكثر من 10000 عملة!');
        }
        
        const legendaryPlants = game.gardens.reduce((sum, g) => 
            sum + g.plants.filter(p => p.stats.rarity === 'legendary').length, 0
        );
        if (legendaryPlants > 5) {
            achievements.push('صياد الأساطير - لديك أكثر من 5 نباتات أسطورية!');
        }
        
        return achievements;
    }
}

// تهيئة الأنظمة الجديدة
const plantNamingSystem = PlantNamingSystem;
const liquidEffectSystem = LiquidEffectSystem;
const plantStatsSystem = PlantStatsSystem;
