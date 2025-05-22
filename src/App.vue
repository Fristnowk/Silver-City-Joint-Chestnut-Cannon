<template>
  <div class="container">
    <h2>计算超量与融合怪兽阶级</h2>

    <!-- 输入双方手卡数量 -->
    <label for="handCards">双方场上·手卡数量：</label>
    <input type="number" id="handCards" v-model.number="input.handCards" />

    <!-- 输入对方怪兽星级（用空格分隔） -->
    <label for="opponentMonsterLevels">对方怪兽星级（用空格分隔）：</label>
    <input
      type="text"
      id="opponentMonsterLevels"
      v-model.trim="input.opponentMonsterLevels"
    />

    <!-- 显示计算结果 -->
    <div class="results" v-if="results.calculated">
      <div
        v-for="(result, index) in results.list"
        :key="index"
        class="result-item"
      >
        <p>怪兽 (星级: {{ results.levels[index] }}):</p>
        <ul>
          <li>需要舍弃的超量怪兽阶级: {{ result.XYZLevel }}</li>
          <li>需要舍弃的融合怪兽阶级: {{ result.FusionLevel }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

// 输入数据
const input = reactive({
  handCards: 0, // 双方手卡数量
  opponentMonsterLevels: '', // 对方怪兽星级（用空格分隔）
});

// 计算结果
const results = reactive({
  calculated: false,
  list: [], // 存储每个怪兽的计算结果
  levels: [], // 新增字段，用于保存解析出的星级数组
});

watch(
  () => [input.handCards, input.opponentMonsterLevels],
  ([newHandCards, newOpponentMonsterLevels]) => {
    if (newHandCards !== undefined && newOpponentMonsterLevels !== '') {
      const levels = newOpponentMonsterLevels.split(/\s+/).map(Number);

      // 更新 results.levels，供模板使用
      results.levels = levels;

      // 清空之前的计算结果
      results.list = [];

      // 遍历每个星级进行计算
      levels.forEach((level) => {
        const XYZLevel = newHandCards - level;
        const FusionLevel = level - XYZLevel;

        results.list.push({
          XYZLevel: XYZLevel,
          FusionLevel: FusionLevel,
        });
      });

      results.calculated = true;
    }
  },
  { deep: true },
);
</script>

<style scoped>
.container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

label {
  display: block;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 5px;
  margin-top: 5px;
}

.results {
  margin-top: 20px;
  font-weight: bold;
}

.result-item {
  margin-top: 10px;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
}
</style>
