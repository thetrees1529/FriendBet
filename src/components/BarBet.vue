<template>
    <div id="main" v-if="canRender" class="box">
        <div>
            <p>
                Make a bet, winner takes all. Good luck!
            </p>
            <p>
                Beware of min and max bet and max bets in total as stated in config below.
            </p>
            <button v-if="!showConfig" @click="showConfig = true">show config</button>
            <div v-else>
                <button @click="showConfig = false">hide config</button>
                <h2>Config</h2>
                <div>
                    Fee: {{ config.feePercentage }}%
                    Min Bet: {{ formatUnits(config.minBet.toString()) }} <br>
                    Max Bet: {{ formatUnits(config.maxBet.toString()) }} <br>
                    Duration: {{ config.duration }} secs <br>
                    Max Bets: {{ config.maxBets }}
                </div>
            </div>
            <div v-if="currentSpin">
                <h2>Current Game</h2>
                <div v-if="!currentSpin.finalised">
                <p v-if="currentSpin.readyToSpin">Ready to <button @click="spin">spin</button></p>
                <p v-else-if="!currentSpin.vrfRequested">Ends in {{ currentSpin.endsIn }} secs</p>
                <p v-else>Waiting for result... (usually less than 30 secs)</p>
                </div>
                <div v-else>Winner found</div>
                <Spin v-if="currentSpin" :bets="currentSpin.bets" :winnings="currentSpin.winnings"></Spin>
            </div>
            <div v-else>
                <p>No games yet</p>
            </div>
            <div v-if="currentSpin ? (currentSpin.bets.length < config.maxBets && currentSpin.endsIn > 0) || currentSpin.finalised : true">
                <h3>Place a bet: </h3>
                <input type="text" v-model="betAmount">
                <button @click="placeBet">Bet</button>
            </div><br>
            <button v-if="!showPrevious" @click="showPrevious = true">show previous rounds</button>
            <div v-else>
                <button @click="showPrevious = false">hide previous rounds</button>
                <Spin v-for="spin in spins.slice(0, spins.length - 1)" :key="spin.id" :bets="spin.bets" :winnings="spin.winnings"></Spin>
            </div>
        </div>
    </div>
    <div v-else class="box">
        <p>loading...</p>
    </div>
</template>

<script setup>
import { getContract } from "../web3/wallet.js"
import { computed, onUnmounted, ref, watch } from "vue"
import { formatUnits, parseEther } from "ethers"
import Spin from "./Spin.vue"
const canRender = ref()
const showPrevious = ref()
const config = ref()
const showConfig = ref()
const spins = ref([])
const betAmount = ref()


const currentSpin = computed(() => {
    if(spins.value && spins.value.length > 0) {
        return spins.value[spins.value.length - 1]
    }
})

function getSpin(data) {
    const res = {}
    res.bets = data.bets
    .map((bet, i) => {
        const totalBets = data.bets.reduce((acc, bet) => acc + Number(bet.amount), 0)
        const percentage = Math.ceil(Number(bet.amount) * 100 / totalBets)
        return {
            id: i,
            user: bet.user,
            amount: bet.amount,
            percentage: percentage,
            won: data.finalised ? data.winningBet == i : false
        }
    })
    res.vrfRequested = data.vrfRequested,
    res.finalised = data.finalised,
    res.winningBet = data.winningBet
    res.endsIn = Number(data.createdAt + config.value.duration) - Math.floor(Date.now() / 1000)
    res.readyToSpin = res.endsIn <= 0 && !data.vrfRequested
    res.winnings = data.winnings
    return res
}

async function spin() {
    try {
        console.log(currentSpin.value)
        const contract = await getContract()
        const {weth} = await contract.quoteVrfRequest()
        await contract.spin({value: currentSpin.value.bets.length > 1 ? weth * BigInt(2) : BigInt(0), gasLimit: 500000})
    } catch(e) {
        console.log("failed to spin because", e)
    }
}

async function placeBet() {
    try {
        const contract = await getContract()
        await contract.bet({value: parseEther(betAmount.value)})
    } catch(e) {
        console.log("failed to place bet because", e)
    }
}

async function update() {
    try {
        const contract = await getContract()
        config.value = await contract.config()
        const createdSpins = await contract.createdSpins()
        const start = Math.max(Number(createdSpins) - 10, 0)
        if(createdSpins > 0) spins.value = (await contract.getSpins(start, createdSpins)).map(getSpin)
        canRender.value = true
    } catch(e) {
        console.log("failed to render because", e)
        canRender.value = false
    }
}

update()
const updater = setInterval(update, 2000)
onUnmounted(() => clearInterval(updater))


const colours = ["blue", "green", "red", "purple", "orange", "yellow", "pink", "brown", "black", "grey"]
</script>

<style scoped>

#main {
    justify-content: center;
}

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
