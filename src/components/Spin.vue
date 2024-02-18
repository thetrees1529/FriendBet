<template>
<div class="box" id="bar">
    <div v-for="bet in bets" :key="bet.id" :style="{backgroundColor: colours[bet.id], width: `${bet.percentage}%`}" :class="{bet: true, leftBet: bet.id == 0, rightBet: bet.id == bets.length - 1, winner: bet.won}">
        <h3>{{ bet.user.slice(0,6) }}... bet {{ formatUnits(bet.amount.toString()) }}</h3>
        <h3 v-if="bet.won">Winnings: {{ Number(formatUnits(winnings)).toFixed(4) }}</h3>
    </div>
</div>

</template>

<script setup>

import { formatUnits, parseEther } from "ethers"
import { computed, onMounted, ref } from "vue"
defineProps(["bets", "winnings"])
const colours = ["blue", "green", "red", "purple", "orange", "yellow", "pink", "brown"]


</script>

<style scoped>


#bar {
    justify-content: space-between;
    height: 20vh;
    width: 60vw;
}

.bet {
    height: 100%;
    width: 100%;
    color: white;
}

.leftBet {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
}

.rightBet {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
}

.winner {
    border-width: 15px;
    border-color: gold;
    border-style: solid
}

</style>
